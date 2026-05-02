// ===== FlashCard Pro — Shared Utilities =====

const COLOR_PALETTES = [
  { name: "Instagram",    c1: "#833ab4", c2: "#fd1d1d", c3: "#fcb045" },
  { name: "Tinder",       c1: "#fd297b", c2: "#ff655b", c3: "#ff9242" },
  { name: "Bình Minh",    c1: "#f12711", c2: "#f5af19", c3: "#ffd700" },
  { name: "Dâu Xoài",    c1: "#ee0979", c2: "#ff6a00", c3: "#feca57" },
  { name: "Hoàng Hôn",   c1: "#FF416C", c2: "#ff8c42", c3: "#ffd166" },
  { name: "Đại Dương",   c1: "#1a6fe8", c2: "#1289A7", c3: "#12CBC4" },
  { name: "Điện Tím",    c1: "#5865F2", c2: "#8360c3", c3: "#c084fc" },
  { name: "Bắc Cực",     c1: "#1FA2FF", c2: "#12D8FA", c3: "#A6FFCB" },
  { name: "Nhiệt Đới",   c1: "#11998e", c2: "#38ef7d", c3: "#d4fc79" },
  { name: "Hoa Anh Đào", c1: "#f72585", c2: "#b5179e", c3: "#7209b7" },
  { name: "Tím Mộng Mơ", c1: "#7b2ff7", c2: "#c471ed", c3: "#f64f59" },
  { name: "Hổ Phách",    c1: "#f6d365", c2: "#fda085", c3: "#f5576c" },
  { name: "Rừng Xanh",   c1: "#134E5E", c2: "#71B280", c3: "#38ef7d" },
  { name: "Thiên Hà",    c1: "#2c3e50", c2: "#4568DC", c3: "#B06AB3" },
  { name: "Ngọc Bích",   c1: "#0bab64", c2: "#1289A7", c3: "#4568DC" },
  { name: "Hồng Ngọc",   c1: "#f43b47", c2: "#e91e63", c3: "#9c27b0" },
  { name: "Xoài Chín",   c1: "#fc4a1a", c2: "#f7b733", c3: "#ffd166" },
  { name: "Cực Quang",   c1: "#00C9FF", c2: "#92FE9D", c3: "#1de9b6" },
];

// ===== API helpers =====

async function getTopics() {
  const res = await fetch('/api/topics');
  return res.ok ? res.json() : [];
}

async function getTopicById(id) {
  const res = await fetch('/api/topics/' + id);
  return res.ok ? res.json() : null;
}

async function saveTopic(topic) {
  await fetch('/api/topics/' + topic.id, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(topic),
  });
}

async function deleteTopicById(id) {
  await fetch('/api/topics/' + id, { method: 'DELETE' });
}

// ===== Misc helpers =====

function generateId(name) {
  const d = new Date();
  const date = d.getFullYear().toString()
    + String(d.getMonth() + 1).padStart(2, '0')
    + String(d.getDate()).padStart(2, '0');
  const slug = name
    ? name.toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        || 'topic'
    : Math.random().toString(36).substr(2, 6);
  return date + '_' + slug;
}

function randomPalette(excludeName) {
  const pool = excludeName
    ? COLOR_PALETTES.filter(p => p.name !== excludeName)
    : COLOR_PALETTES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getGradient(palette, deg) {
  const d  = deg || 135;
  const c3 = palette.c3 || palette.c2;
  return `linear-gradient(${d}deg, ${palette.c1}, ${palette.c2}, ${c3})`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===== Parse word list =====

function _toJsonArray(text) {
  const fixed  = text.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  const parsed = JSON.parse(fixed);
  if (!Array.isArray(parsed)) return null;
  return parsed
    .map(item => ({
      w:   (item.w   || item.word         || '').trim(),
      ipa: (item.ipa || item.pronunciation || '').trim(),
      m:   (item.m   || item.meaning      || '').trim(),
    }))
    .filter(c => c.w);
}

function parseWordList(text) {
  text = (text || '').trim();
  if (!text) return [];
  if (text.startsWith('[')) {
    try { const r = _toJsonArray(text); if (r && r.length) return r; } catch (_) {}
  }
  return text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && !l.startsWith('//'))
    .map(l => {
      const parts = l.split(/\s*\|\s*|\t/).map(p => p.trim());
      if (parts.length >= 3) return { w: parts[0], ipa: parts[1], m: parts[2] };
      if (parts.length === 2) return { w: parts[0], ipa: '',       m: parts[1] };
      return null;
    })
    .filter(c => c && c.w);
}
