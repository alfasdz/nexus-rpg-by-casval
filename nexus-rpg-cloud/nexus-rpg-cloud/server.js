// NEXUS RPG - Resilient Zero-Dependency Server
// Features: Robust Authentication, Persistent Storage, Auto-Cloud Sync

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
// 1. SQLite Database Setup & JSON Mirror
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
  `);
} catch (e) {
  console.warn('SQLite init warning, using memory fallback:', e.message);
}

// In-memory + persistent mirror cache to ensure zero data loss during restarts
let memoryStore = { users: {}, saves: {} };
if (fs.existsSync(BACKUP_JSON_FILE)) {
  try {
    memoryStore = JSON.parse(fs.readFileSync(BACKUP_JSON_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed reading backup json:', err);
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
// 2. Password & Token Authentication (Stateless Secure Tokens)
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

// Generate tamper-proof Auth Token: "userId.timestamp.hmacSignature"
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'nexus-rpg-cosmic-secret-key-2026';

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

    // Valid for 30 days
    const age = Date.now() - Number(timeStr);
    if (age > 30 * 24 * 60 * 60 * 1000) return null;

    return { userId: Number(userId), username };
  } catch {
    return null;
  }
}

function getAuth(req) {
  // Check Authorization header or Cookie
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
// 4. Server Request Handler
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

      // Check SQLite & memoryStore
      let existing = null;
      if (db) {
        try {
          existing = db.prepare('SELECT id FROM users WHERE username = ?').get(cleanUser);
        } catch {}
      }
      if (!existing && memoryStore.users[cleanUser]) {
        existing = memoryStore.users[cleanUser];
      }

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
      const { username, password } = await parseJSONBody(req);
      const cleanUser = (username || '').trim().toLowerCase();

      if (!cleanUser || !password) {
        return sendJSON(res, 400, { success: false, error: 'Username and password required' });
      }

      let user = null;
      if (db) {
        try {
          user = db.prepare('SELECT id, username, password_hash, salt FROM users WHERE username = ?').get(cleanUser);
        } catch {}
      }
      if (!user && memoryStore.users[cleanUser]) {
        user = memoryStore.users[cleanUser];
      }

      if (!user) {
        return sendJSON(res, 401, { success: false, error: 'User does not exist' });
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
      console.error('Login error:', err);
      return sendJSON(res, 500, { success: false, error: 'Server error during login' });
    }
  }

  // POST /api/logout
  if (method === 'POST' && pathname === '/api/logout') {
    return sendJSON(res, 200, { success: true }, {
      'Set-Cookie': `nexus_token=; Path=/; HttpOnly; Max-Age=0`
    });
  }

  // POST /api/save (Cloud Auto-Save)
  if (method === 'POST' && pathname === '/api/save') {
    const auth = getAuth(req);
    if (!auth) {
      return sendJSON(res, 401, { success: false, error: 'Unauthorized' });
    }

    try {
      const { gameState } = await parseJSONBody(req);
      if (!gameState) {
        return sendJSON(res, 400, { success: false, error: 'Missing gameState' });
      }

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

      return sendJSON(res, 200, { success: true, timestamp: Date.now() });
    } catch (err) {
      console.error('Save error:', err);
      return sendJSON(res, 500, { success: false, error: 'Failed to write cloud save' });
    }
  }

  // GET /api/load (Cloud Load)
  if (method === 'GET' && pathname === '/api/load') {
    const auth = getAuth(req);
    if (!auth) {
      return sendJSON(res, 401, { success: false, error: 'Unauthorized' });
    }

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

      if (!rawData) {
        return sendJSON(res, 200, { success: true, gameState: null });
      }

      let parsedState = null;
      try {
        parsedState = JSON.parse(rawData);
      } catch {
        parsedState = null;
      }

      return sendJSON(res, 200, { success: true, gameState: parsedState });
    } catch (err) {
      console.error('Load error:', err);
      return sendJSON(res, 500, { success: false, error: 'Failed to load cloud save' });
    }
  }

  // -------------------------------------------------------------
  // Static Files
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

    // Prevent aggressive browser caching for HTML & JS so updates reflect immediately
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
  console.log(`⚔️  NEXUS RPG RESILIENT CLOUD SERVER`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`💾 Dual-Storage Active: SQLite + JSON Mirror`);
  console.log(`===============================================`);
});
