// NEXUS RPG v3.0 - Ultimate Multiplayer Cloud Server
// Features: Full Epic RPG Engine, Multiplayer Friends, Coin Transfers, Leaderboard, Anti-Sleep Dual-Layer Storage

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DB_FILE = path.join(__dirname, 'nexus_rpg.db');
const BACKUP_JSON_FILE = path.join(__dirname, 'nexus_data_backup.json');

// ---------------------------------------------------------------------------
// 1. Database & Persistence Layer
// ---------------------------------------------------------------------------
let db;
try {
  db = new DatabaseSync(DB_FILE);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      username      TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      salt          TEXT NOT NULL,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS saves (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER UNIQUE NOT NULL,
      save_data   TEXT NOT NULL,
      updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS friends (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL,
      friend_name TEXT NOT NULL COLLATE NOCASE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, friend_name)
    );
  `);
} catch (e) {
  console.warn('SQLite init warning, using memory fallback:', e.message);
}

// Memory Store Mirror (Anti Data-Loss on Ephemeral Cloud)
let memoryStore = { users: {}, saves: {}, friends: {} };
if (fs.existsSync(BACKUP_JSON_FILE)) {
  try {
    memoryStore = JSON.parse(fs.readFileSync(BACKUP_JSON_FILE, 'utf8'));
    if (!memoryStore.users) memoryStore.users = {};
    if (!memoryStore.saves) memoryStore.saves = {};
    if (!memoryStore.friends) memoryStore.friends = {};
  } catch (err) {
    console.error('Backup JSON parse error:', err);
  }
}

function persistBackup() {
  try {
    fs.writeFileSync(BACKUP_JSON_FILE, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch (e) {
    console.error('Backup write error:', e);
  }
}

// ---------------------------------------------------------------------------
// 2. Auth & Stateless Tokens
// ---------------------------------------------------------------------------
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPassword(password, salt, storedHash) {
  try {
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
  } catch {
    return false;
  }
}

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'nexus-rpg-ultimate-secret-2026';

function generateAuthToken(userId, username) {
  const payload = `${userId}:${username}:${Date.now()}`;
  const sig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64');
}

function verifyAuthToken(token) {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 4) return null;
    const [userId, username, timeStr, sig] = parts;
    const payload = `${userId}:${username}:${timeStr}`;
    const expectedSig = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    if (sig !== expectedSig) return null;
    return { userId: Number(userId), username };
  } catch {
    return null;
  }
}

function getAuth(req) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const verified = verifyAuthToken(token);
    if (verified) return verified;
  }
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const matches = cookieHeader.match(/nexus_token=([^;]+)/);
    if (matches && matches[1]) {
      const verified = verifyAuthToken(matches[1]);
      if (verified) return verified;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// 3. MIME Types & Helpers
// ---------------------------------------------------------------------------
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function sendJSON(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    ...headers
  });
  res.end(JSON.stringify(data));
}

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// 4. API Request Handler
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // GET /api/session
  if (method === 'GET' && pathname === '/api/session') {
    const auth = getAuth(req);
    if (auth) {
      return sendJSON(res, 200, { loggedIn: true, username: auth.username, userId: auth.userId });
    }
    return sendJSON(res, 200, { loggedIn: false, username: null });
  }

  // POST /api/register
  if (method === 'POST' && pathname === '/api/register') {
    try {
      const { username, password, characterName } = await parseJSONBody(req);
      const cleanUser = (username || '').trim().toLowerCase();

      if (!cleanUser || cleanUser.length < 3 || cleanUser.length > 20) {
        return sendJSON(res, 400, { success: false, error: 'Username must be 3-20 characters' });
      }
      if (!password || password.length < 4) {
        return sendJSON(res, 400, { success: false, error: 'Password must be at least 4 characters' });
      }

      let existing = null;
      if (db) {
        try { existing = db.prepare('SELECT id FROM users WHERE username = ?').get(cleanUser); } catch {}
      }
      if (!existing && memoryStore.users[cleanUser]) existing = memoryStore.users[cleanUser];

      if (existing) {
        return sendJSON(res, 409, { success: false, error: 'Username already taken' });
      }

      const { hash, salt } = hashPassword(password);
      let userId = Date.now();

      if (db) {
        try {
          const insertStmt = db.prepare('INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)');
          const resDb = insertStmt.run(cleanUser, hash, salt);
          userId = Number(resDb.lastInsertRowid);
        } catch {}
      }

      memoryStore.users[cleanUser] = { id: userId, username: cleanUser, password_hash: hash, salt };
      persistBackup();

      const token = generateAuthToken(userId, cleanUser);
      return sendJSON(res, 201, {
        success: true,
        token,
        username: cleanUser,
        characterName: characterName || cleanUser
      }, {
        'Set-Cookie': `nexus_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
      });
    } catch (err) {
      console.error('Register error:', err);
      return sendJSON(res, 500, { success: false, error: 'Server error during registration' });
    }
  }

  // POST /api/login
  if (method === 'POST' && pathname === '/api/login') {
    try {
      const { username, password, fallbackVault } = await parseJSONBody(req);
      const cleanUser = (username || '').trim().toLowerCase();

      let user = null;
      if (db) {
        try { user = db.prepare('SELECT id, username, password_hash, salt FROM users WHERE username = ?').get(cleanUser); } catch {}
      }
      if (!user && memoryStore.users[cleanUser]) user = memoryStore.users[cleanUser];

      // Self-Healing Vault: Jika server baru restart dan user belum ada di DB,
      // tetapi client membawa data akun yang sah dari vault lokal mereka:
      if (!user && fallbackVault && fallbackVault.password === password) {
        const { hash, salt } = hashPassword(password);
        let userId = Date.now();
        if (db) {
          try {
            const insertStmt = db.prepare('INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)');
            const resDb = insertStmt.run(cleanUser, hash, salt);
            userId = Number(resDb.lastInsertRowid);
          } catch {}
        }
        memoryStore.users[cleanUser] = { id: userId, username: cleanUser, password_hash: hash, salt };

        if (fallbackVault.gameState) {
          const dataStr = typeof fallbackVault.gameState === 'string' ? fallbackVault.gameState : JSON.stringify(fallbackVault.gameState);
          if (db) {
            try {
              db.prepare('INSERT INTO saves (user_id, save_data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(user_id) DO UPDATE SET save_data = excluded.save_data').run(userId, dataStr);
            } catch {}
          }
          memoryStore.saves[cleanUser] = { userId, saveData: dataStr, updatedAt: Date.now() };
        }
        persistBackup();

        const token = generateAuthToken(userId, cleanUser);
        return sendJSON(res, 200, {
          success: true,
          token,
          username: cleanUser,
          rehydrated: true
        }, {
          'Set-Cookie': `nexus_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
        });
      }

      if (!user) {
        return sendJSON(res, 401, { success: false, error: 'Username not found' });
      }

      const valid = verifyPassword(password, user.salt, user.password_hash);
      if (!valid) {
        return sendJSON(res, 401, { success: false, error: 'Incorrect password' });
      }

      const token = generateAuthToken(user.id, user.username);
      return sendJSON(res, 200, {
        success: true,
        token,
        username: user.username
      }, {
        'Set-Cookie': `nexus_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
      });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: 'Server error during login' });
    }
  }

  // POST /api/rehydrate (Pemulihan akun instan dari vault client saat server restart)
  if (method === 'POST' && pathname === '/api/rehydrate') {
    try {
      const { username, password, characterName, gameState } = await parseJSONBody(req);
      const cleanUser = (username || '').trim().toLowerCase();
      if (!cleanUser || !password) {
        return sendJSON(res, 400, { success: false, error: 'Invalid rehydrate payload' });
      }

      let user = null;
      if (db) {
        try { user = db.prepare('SELECT id, username, password_hash, salt FROM users WHERE username = ?').get(cleanUser); } catch {}
      }
      if (!user && memoryStore.users[cleanUser]) user = memoryStore.users[cleanUser];

      let userId;
      if (!user) {
        // Buat ulang akun di server
        const { hash, salt } = hashPassword(password);
        userId = Date.now();
        if (db) {
          try {
            const insertStmt = db.prepare('INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)');
            const resDb = insertStmt.run(cleanUser, hash, salt);
            userId = Number(resDb.lastInsertRowid);
          } catch {}
        }
        memoryStore.users[cleanUser] = { id: userId, username: cleanUser, password_hash: hash, salt };
      } else {
        userId = user.id;
      }

      // Restore save data
      if (gameState) {
        const dataStr = typeof gameState === 'string' ? gameState : JSON.stringify(gameState);
        if (db) {
          try {
            db.prepare(`
              INSERT INTO saves (user_id, save_data, updated_at)
              VALUES (?, ?, CURRENT_TIMESTAMP)
              ON CONFLICT(user_id) DO UPDATE SET save_data = excluded.save_data
            `).run(userId, dataStr);
          } catch {}
        }
        memoryStore.saves[cleanUser] = { userId, saveData: dataStr, updatedAt: Date.now() };
      }
      persistBackup();

      const token = generateAuthToken(userId, cleanUser);
      return sendJSON(res, 200, {
        success: true,
        token,
        username: cleanUser,
        characterName: characterName || cleanUser
      }, {
        'Set-Cookie': `nexus_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
      });
    } catch (err) {
      console.error('Rehydrate error:', err);
      return sendJSON(res, 500, { success: false, error: 'Rehydrate failed' });
    }
  }

  // POST /api/logout
  if (method === 'POST' && pathname === '/api/logout') {
    return sendJSON(res, 200, { success: true }, {
      'Set-Cookie': `nexus_token=; Path=/; HttpOnly; Max-Age=0`
    });
  }

  // POST /api/save
  if (method === 'POST' && pathname === '/api/save') {
    const auth = getAuth(req);
    if (!auth) return sendJSON(res, 401, { success: false, error: 'Unauthorized' });

    try {
      const { gameState } = await parseJSONBody(req);
      if (!gameState) return sendJSON(res, 400, { success: false, error: 'Missing gameState' });

      const dataStr = typeof gameState === 'string' ? gameState : JSON.stringify(gameState);

      if (db) {
        try {
          db.prepare(`
            INSERT INTO saves (user_id, save_data, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id) DO UPDATE SET
              save_data = excluded.save_data,
              updated_at = CURRENT_TIMESTAMP
          `).run(auth.userId, dataStr);
        } catch {}
      }

      memoryStore.saves[auth.username] = {
        userId: auth.userId,
        saveData: dataStr,
        updatedAt: Date.now()
      };
      persistBackup();

      return sendJSON(res, 200, { success: true });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: 'Failed to write cloud save' });
    }
  }

  // GET /api/load
  if (method === 'GET' && pathname === '/api/load') {
    const auth = getAuth(req);
    if (!auth) return sendJSON(res, 401, { success: false, error: 'Unauthorized' });

    try {
      let rawData = null;
      if (db) {
        try {
          const row = db.prepare('SELECT save_data FROM saves WHERE user_id = ?').get(auth.userId);
          if (row && row.save_data) rawData = row.save_data;
        } catch {}
      }

      if (!rawData && memoryStore.saves[auth.username]) {
        rawData = memoryStore.saves[auth.username].saveData;
      }

      let parsedState = null;
      if (rawData) {
        try { parsedState = JSON.parse(rawData); } catch {}
      }

      return sendJSON(res, 200, { success: true, gameState: parsedState });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: 'Failed to load cloud save' });
    }
  }

  // -------------------------------------------------------------
  // MULTIPLAYER FEATURES: PLAYERS, FRIENDS, & COIN TRANSFER
  // -------------------------------------------------------------

  // GET /api/players (Leaderboard & Player Discovery)
  if (method === 'GET' && pathname === '/api/players') {
    try {
      const players = [];
      const userList = Object.keys(memoryStore.users);

      for (const u of userList) {
        const saveInfo = memoryStore.saves[u];
        let pData = { username: u, characterName: u, level: 1, gold: 0, area: 'Area 1' };
        if (saveInfo && saveInfo.saveData) {
          try {
            const st = JSON.parse(saveInfo.saveData);
            pData.characterName = st.characterName || u;
            pData.level = st.level || 1;
            pData.gold = st.gold || 0;
            pData.area = st.currentArea || 'Area 1';
          } catch {}
        }
        players.push(pData);
      }

      // Sort by level desc, then gold desc
      players.sort((a, b) => b.level - a.level || b.gold - a.gold);
      return sendJSON(res, 200, { success: true, players: players.slice(0, 30) });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: 'Failed to get player leaderboard' });
    }
  }

  // GET /api/friends (Get My Friend List)
  if (method === 'GET' && pathname === '/api/friends') {
    const auth = getAuth(req);
    if (!auth) return sendJSON(res, 401, { success: false, error: 'Unauthorized' });

    try {
      const userFriends = memoryStore.friends[auth.username] || [];
      const detailed = userFriends.map(fName => {
        const saveInfo = memoryStore.saves[fName];
        let fData = { username: fName, characterName: fName, level: 1, gold: 0 };
        if (saveInfo && saveInfo.saveData) {
          try {
            const st = JSON.parse(saveInfo.saveData);
            fData.characterName = st.characterName || fName;
            fData.level = st.level || 1;
            fData.gold = st.gold || 0;
          } catch {}
        }
        return fData;
      });
      return sendJSON(res, 200, { success: true, friends: detailed });
    } catch {
      return sendJSON(res, 500, { success: false, error: 'Failed to retrieve friends' });
    }
  }

  // POST /api/friends/add (Add Friend by Username)
  if (method === 'POST' && pathname === '/api/friends/add') {
    const auth = getAuth(req);
    if (!auth) return sendJSON(res, 401, { success: false, error: 'Unauthorized' });

    try {
      const { targetUsername } = await parseJSONBody(req);
      const cleanTarget = (targetUsername || '').trim().toLowerCase();

      if (!cleanTarget) return sendJSON(res, 400, { success: false, error: 'Target username is required' });
      if (cleanTarget === auth.username) return sendJSON(res, 400, { success: false, error: 'You cannot add yourself as friend' });

      // Verify target user exists
      if (!memoryStore.users[cleanTarget]) {
        return sendJSON(res, 404, { success: false, error: `Pemain @${cleanTarget} tidak ditemukan!` });
      }

      if (!memoryStore.friends[auth.username]) memoryStore.friends[auth.username] = [];
      if (!memoryStore.friends[auth.username].includes(cleanTarget)) {
        memoryStore.friends[auth.username].push(cleanTarget);
        persistBackup();
      }

      return sendJSON(res, 200, { success: true, message: `Berhasil menambahkan @${cleanTarget} ke daftar teman!` });
    } catch {
      return sendJSON(res, 500, { success: false, error: 'Failed to add friend' });
    }
  }

  // POST /api/transfer (Send Coins to Another Hero)
  if (method === 'POST' && pathname === '/api/transfer') {
    const auth = getAuth(req);
    if (!auth) return sendJSON(res, 401, { success: false, error: 'Unauthorized' });

    try {
      const { recipient, amount } = await parseJSONBody(req);
      const cleanTarget = (recipient || '').trim().toLowerCase();
      const sendAmt = Math.floor(Number(amount));

      if (!cleanTarget) return sendJSON(res, 400, { success: false, error: 'Nama penerima koin diperlukan' });
      if (cleanTarget === auth.username) return sendJSON(res, 400, { success: false, error: 'Tidak bisa mengirim koin ke diri sendiri' });
      if (isNaN(sendAmt) || sendAmt <= 0) return sendJSON(res, 400, { success: false, error: 'Jumlah koin tidak valid' });

      // Check recipient existence
      if (!memoryStore.users[cleanTarget]) {
        return sendJSON(res, 404, { success: false, error: `Penerima @${cleanTarget} tidak ditemukan!` });
      }

      // Check sender save data
      const senderSave = memoryStore.saves[auth.username];
      if (!senderSave || !senderSave.saveData) {
        return sendJSON(res, 400, { success: false, error: 'Data karakter Anda belum tersimpan' });
      }

      let senderState = JSON.parse(senderSave.saveData);
      if (senderState.gold < sendAmt) {
        return sendJSON(res, 400, { success: false, error: `Gold tidak cukup! Saldo Anda: ${senderState.gold} 💰` });
      }

      // Deduct from sender
      senderState.gold -= sendAmt;
      senderSave.saveData = JSON.stringify(senderState);
      if (db) {
        try {
          db.prepare('UPDATE saves SET save_data = ? WHERE user_id = ?').run(senderSave.saveData, auth.userId);
        } catch {}
      }

      // Credit to recipient
      let recipientSave = memoryStore.saves[cleanTarget];
      let recipientState = { gold: 100 };
      if (recipientSave && recipientSave.saveData) {
        try { recipientState = JSON.parse(recipientSave.saveData); } catch {}
      }
      recipientState.gold = (recipientState.gold || 0) + sendAmt;

      // Add transfer notification to recipient log if not present
      if (!recipientState.pendingNotifications) recipientState.pendingNotifications = [];
      recipientState.pendingNotifications.push(`🎁 <strong>KIRIMAN KOIN:</strong> Anda menerima <strong>+${sendAmt} 💰</strong> dari <strong>@${auth.username}</strong>!`);

      const recDataStr = JSON.stringify(recipientState);
      const recUserId = memoryStore.users[cleanTarget].id;

      if (db) {
        try {
          db.prepare(`
            INSERT INTO saves (user_id, save_data, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id) DO UPDATE SET save_data = excluded.save_data
          `).run(recUserId, recDataStr);
        } catch {}
      }

      memoryStore.saves[cleanTarget] = {
        userId: recUserId,
        saveData: recDataStr,
        updatedAt: Date.now()
      };

      persistBackup();

      return sendJSON(res, 200, {
        success: true,
        remainingGold: senderState.gold,
        message: `Berhasil mentransfer ${sendAmt} 💰 kepada @${cleanTarget}!`
      });
    } catch (err) {
      console.error('Transfer error:', err);
      return sendJSON(res, 500, { success: false, error: 'Gagal melakukan transfer koin' });
    }
  }

  // -------------------------------------------------------------
  // Static Assets
  // -------------------------------------------------------------
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('File Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`⚔️  NEXUS RPG v3.0 MULTIPLAYER ONLINE`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`👥 Multiplayer: Friend System & Coin Transfer Active`);
  console.log(`===============================================`);
});
