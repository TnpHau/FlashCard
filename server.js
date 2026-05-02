const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = 3000;
const DATA = path.join(__dirname, 'data');

app.use(express.json());
app.use(express.static(__dirname));

// GET /api/topics — trả về tất cả topic trong data/
app.get('/api/topics', (req, res) => {
  try {
    const topics = fs.readdirSync(DATA)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        try { return JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8')); }
        catch { return null; }
      })
      .filter(t => t && t.id && Array.isArray(t.cards))
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    res.json(topics);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/topics/:id
app.get('/api/topics/:id', (req, res) => {
  const file = path.join(DATA, req.params.id + '.json');
  try {
    res.json(JSON.parse(fs.readFileSync(file, 'utf8')));
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

// POST /api/topics/:id — tạo hoặc cập nhật
app.post('/api/topics/:id', (req, res) => {
  const topic = req.body;
  if (!topic.id || !Array.isArray(topic.cards))
    return res.status(400).json({ error: 'Invalid topic' });
  try {
    fs.writeFileSync(path.join(DATA, topic.id + '.json'), JSON.stringify(topic, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/topics/:id
app.delete('/api/topics/:id', (req, res) => {
  const file = path.join(DATA, req.params.id + '.json');
  try {
    fs.unlinkSync(file);
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(PORT, () => console.log(`FlashCard Pro → http://localhost:${PORT}`));
