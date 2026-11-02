// NEXUS RPG - Zero-dependency High-Performance Backend
// Powered by Node.js native modules: node:http, node:sqlite, node:crypto, node:fs, node:path

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DB_FILE = path.join(__dirname, 'nexus_rpg.db');

// ---------------------------------------------------------------------------
// 1. SQLite Database Initialization
// ---------------------------------------------------------------------------
const db = new DatabaseSync(DB_FILE);

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

// ---------------------------------------------------------------------------
// 2. Authentication & Security (scrypt password hashing)
// ---------------------------------------------------------------------------
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPassword(password, salt, storedHash) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

// In-memory active session map: token -> { userId, username, expiresAt }
const sessions = new Map();

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length === 2) {
      cookies[parts[0].trim()] = parts[1].trim();
    }
  });
  return cookies;
}

function getSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.nexus_session;
  if (!token) return null;

  const session = sessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return { token, ...session };
}

// ---------------------------------------------------------------------------
// 3. MIME types for Static Serving
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

// ---------------------------------------------------------------------------
// 4. Request Dispatcher & API Handlers
// ---------------------------------------------------------------------------
function sendJSON(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...headers
  });
  res.end(JSON.stringify(data));
}

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // GET /api/session
  if (method === 'GET' && pathname === '/api/session') {
    const session = getSession(req);
    if (session) {
      return sendJSON(res, 200, { loggedIn: true, username: session.username });
    }
    return sendJSON(res, 200, { loggedIn: false, username: null });
  }

  // POST /api/register
  if (method === 'POST' && pathname === '/api/register') {
    try {
      const { username, password, characterName } = await parseJSONBody(req);

      if (!username || typeof username !== 'string' || username.length < 3 || username.length > 20) {
        return sendJSON(res, 400, { success: false, error: 'Username must be 3-20 characters' });
      }
      if (!password || typeof password !== 'string' || password.length < 4) {
        return sendJSON(res, 400, { success: false, error: 'Password must be at least 4 characters' });
      }

      const stmtCheck = db.prepare('SELECT id FROM users WHERE username = ?');
      const existing = stmtCheck.get(username);
      if (existing) {
        return sendJSON(res, 409, { success: false, error: 'Username is already taken' });
      }

      const { hash, salt } = hashPassword(password);
      const insertUser = db.prepare('INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)');
      const result = insertUser.run(username, hash, salt);

      const sessionToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      sessions.set(sessionToken, {
        userId: Number(result.lastInsertRowid),
        username,
        expiresAt
      });

      return sendJSON(res, 201, {
        success: true,
        username,
        characterName: characterName || username
      }, {
        'Set-Cookie': `nexus_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
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
      if (!username || !password) {
        return sendJSON(res, 400, { success: false, error: 'Username and password required' });
      }

      const stmt = db.prepare('SELECT id, username, password_hash, salt FROM users WHERE username = ?');
      const user = stmt.get(username);
      if (!user) {
        return sendJSON(res, 401, { success: false, error: 'Invalid username or password' });
      }

      const valid = verifyPassword(password, user.salt, user.password_hash);
      if (!valid) {
        return sendJSON(res, 401, { success: false, error: 'Invalid username or password' });
      }

      const sessionToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
      sessions.set(sessionToken, {
        userId: Number(user.id),
        username: user.username,
        expiresAt
      });

      return sendJSON(res, 200, { success: true, username: user.username }, {
        'Set-Cookie': `nexus_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
      });
    } catch (err) {
      console.error('Login error:', err);
      return sendJSON(res, 500, { success: false, error: 'Server error during login' });
    }
  }

  // POST /api/logout
  if (method === 'POST' && pathname === '/api/logout') {
    const session = getSession(req);
    if (session) {
      sessions.delete(session.token);
    }
    return sendJSON(res, 200, { success: true }, {
      'Set-Cookie': `nexus_session=; Path=/; HttpOnly; Max-Age=0`
    });
  }

  // POST /api/save (Cloud Save)
  if (method === 'POST' && pathname === '/api/save') {
    const session = getSession(req);
    if (!session) {
      return sendJSON(res, 401, { success: false, error: 'Unauthorized' });
    }

    try {
      const { gameState } = await parseJSONBody(req);
      if (!gameState) {
        return sendJSON(res, 400, { success: false, error: 'Missing gameState' });
      }

      const saveDataStr = typeof gameState === 'string' ? gameState : JSON.stringify(gameState);

      const upsertStmt = db.prepare(`
        INSERT INTO saves (user_id, save_data, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET
          save_data = excluded.save_data,
          updated_at = CURRENT_TIMESTAMP
      `);
      upsertStmt.run(session.userId, saveDataStr);

      return sendJSON(res, 200, { success: true });
    } catch (err) {
      console.error('Save error:', err);
      return sendJSON(res, 500, { success: false, error: 'Failed to write cloud save' });
    }
  }

  // GET /api/load (Cloud Load)
  if (method === 'GET' && pathname === '/api/load') {
    const session = getSession(req);
    if (!session) {
      return sendJSON(res, 401, { success: false, error: 'Unauthorized' });
    }

    try {
      const getStmt = db.prepare('SELECT save_data FROM saves WHERE user_id = ?');
      const row = getStmt.get(session.userId);

      if (!row || !row.save_data) {
        return sendJSON(res, 200, { success: true, gameState: null });
      }

      let parsedState;
      try {
        parsedState = JSON.parse(row.save_data);
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
  // STATIC ASSETS
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

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`⚔️  NEXUS RPG ONLINE SERVER RUNNING`);
  console.log(`🌐 Local URL : http://localhost:${PORT}`);
  console.log(`💾 Database  : SQLite native (${DB_FILE})`);
  console.log(`===============================================`);
});
