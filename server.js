const express = require('express');
const fs      = require('fs');
const path    = require('path');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const app    = express();
const PORT   = process.env.PORT || 3000;
const DATA   = path.join(__dirname, 'data');
const USERS  = path.join(__dirname, 'users.json');
const SECRET = process.env.JWT_SECRET || 'fc-dev-secret-change-in-prod';

app.use(express.json());
app.use(express.static(__dirname));

// ── User store helpers ──
function loadUsers() {
  try { return JSON.parse(fs.readFileSync(USERS, 'utf8')); }
  catch { return []; }
}
function saveUsers(users) {
  fs.writeFileSync(USERS, JSON.stringify(users, null, 2), 'utf8');
}

// ── Per-user data dir ──
function userDir(userId) {
  return path.join(DATA, userId);
}
function ensureUserDir(userId) {
  const dir = userDir(userId);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// ── JWT middleware ──
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, SECRET);
    // block path traversal: only allow safe chars in userId
    if (!/^[a-z0-9_-]+$/i.test(payload.userId)) throw new Error('bad id');
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ' });
  }
}

// ── Auth routes ──
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password)
      return res.status(400).json({ error: 'Thiếu thông tin' });
    if (username.trim().length < 3)
      return res.status(400).json({ error: 'Tên đăng nhập tối thiểu 3 ký tự' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Mật khẩu tối thiểu 6 ký tự' });

    const users = loadUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
      return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' });

    const id           = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ id, username: username.trim(), passwordHash });
    saveUsers(users);
    ensureUserDir(id);

    const token = jwt.sign({ userId: id }, SECRET, { expiresIn: '7d' });
    res.json({ token, username: username.trim() });
  } catch (e) {
    console.error('register error:', e);
    res.status(500).json({ error: 'Lỗi server: ' + e.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password)
      return res.status(400).json({ error: 'Thiếu thông tin' });

    const users = loadUsers();
    const user  = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)  return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username });
  } catch (e) {
    console.error('login error:', e);
    res.status(500).json({ error: 'Lỗi server: ' + e.message });
  }
});

// ── Topic routes (all require auth) ──
app.get('/api/topics', requireAuth, (req, res) => {
  try {
    const dir    = ensureUserDir(req.userId);
    const topics = fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); }
        catch { return null; }
      })
      .filter(t => t && t.id && Array.isArray(t.cards))
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    res.json(topics);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/topics/:id', requireAuth, (req, res) => {
  const file = path.join(userDir(req.userId), req.params.id + '.json');
  try {
    res.json(JSON.parse(fs.readFileSync(file, 'utf8')));
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/topics/:id', requireAuth, (req, res) => {
  const topic = req.body;
  if (!topic.id || !Array.isArray(topic.cards))
    return res.status(400).json({ error: 'Invalid topic' });
  try {
    const dir = ensureUserDir(req.userId);
    fs.writeFileSync(path.join(dir, topic.id + '.json'), JSON.stringify(topic, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/topics/:id', requireAuth, (req, res) => {
  const file = path.join(userDir(req.userId), req.params.id + '.json');
  try {
    fs.unlinkSync(file);
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

app.use((err, req, res, next) => {
  console.error('express error:', err);
  res.status(500).json({ error: err.message });
});

process.on('uncaughtException',  err => console.error('uncaughtException:', err));
process.on('unhandledRejection', err => console.error('unhandledRejection:', err));

app.listen(PORT, () => console.log(`FlashCard Pro → http://localhost:${PORT}`));
