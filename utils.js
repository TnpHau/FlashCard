// ===== FlashCard Pro — Shared Utilities =====

const STORAGE_KEY = 'flashcard_pro_topics';

// 3-colour palettes — c1 → c2 → c3 gradient
const COLOR_PALETTES = [
  { name: 'Instagram',   c1: '#833ab4', c2: '#fd1d1d', c3: '#fcb045' },  // tím – đỏ – vàng
  { name: 'Tinder',      c1: '#fd297b', c2: '#ff655b', c3: '#ff9242' },  // hồng – san hô – cam
  { name: 'Bình Minh',   c1: '#f12711', c2: '#f5af19', c3: '#ffd700' },  // đỏ – vàng cam – vàng
  { name: 'Dâu Xoài',    c1: '#ee0979', c2: '#ff6a00', c3: '#feca57' },  // đỏ hồng – cam – vàng
  { name: 'Hoàng Hôn',   c1: '#FF416C', c2: '#ff8c42', c3: '#ffd166' },  // hồng – cam – vàng nhạt
  { name: 'Đại Dương',   c1: '#1a6fe8', c2: '#1289A7', c3: '#12CBC4' },  // xanh dương – teal – cyan
  { name: 'Điện Tím',    c1: '#5865F2', c2: '#8360c3', c3: '#c084fc' },  // chàm – tím – violet nhạt
  { name: 'Bắc Cực',     c1: '#1FA2FF', c2: '#12D8FA', c3: '#A6FFCB' },  // xanh – cyan – bạc hà
  { name: 'Nhiệt Đới',   c1: '#11998e', c2: '#38ef7d', c3: '#d4fc79' },  // xanh lá – xanh mint – vàng chanh
  { name: 'Hoa Anh Đào', c1: '#f72585', c2: '#b5179e', c3: '#7209b7' },  // hồng – tím hồng – tím đậm
  { name: 'Tím Mộng Mơ', c1: '#7b2ff7', c2: '#c471ed', c3: '#f64f59' },  // tím đậm – tím nhạt – đỏ hồng
  { name: 'Hổ Phách',    c1: '#f6d365', c2: '#fda085', c3: '#f5576c' },  // vàng – đào – hồng đỏ
  { name: 'Rừng Xanh',   c1: '#134E5E', c2: '#71B280', c3: '#38ef7d' },  // xanh đậm – xanh lá – bạc hà
  { name: 'Thiên Hà',    c1: '#2c3e50', c2: '#4568DC', c3: '#B06AB3' },  // đêm – xanh – tím
  { name: 'Ngọc Bích',   c1: '#0bab64', c2: '#1289A7', c3: '#4568DC' },  // lục – teal – lam
  { name: 'Hồng Ngọc',   c1: '#f43b47', c2: '#e91e63', c3: '#9c27b0' },  // đỏ – hồng – tím
  { name: 'Xoài Chín',   c1: '#fc4a1a', c2: '#f7b733', c3: '#ffd166' },  // cam đỏ – vàng – vàng nhạt
  { name: 'Cực Quang',   c1: '#00C9FF', c2: '#92FE9D', c3: '#1de9b6' },  // cyan – xanh lá – teal
];

const JOBS_SEED = [
  { w: "Solicitor", ipa: "/səˈlɪsɪtə/", m: "Người cố vấn pháp luật" },
  { w: "Prison officer", ipa: "/ˈprɪzn ˈɒfɪsə/", m: "Công an trại giam" },
  { w: "Security officer", ipa: "/sɪˈkjʊərɪti ˈɒfɪsə/", m: "Nhân viên an ninh" },
  { w: "Customs officer", ipa: "/ˈkʌstəmz ˈɒfɪsə/", m: "Nhân viên hải quan" },
  { w: "Policewoman", ipa: "/pəˈliːsˌwʊmən/", m: "Cảnh sát nữ" },
  { w: "Detective", ipa: "/dɪˈtɛktɪv/", m: "Thám tử" },
  { w: "Lawyer", ipa: "/ˈlɔːjə/", m: "Luật sư" },
  { w: "Police officer", ipa: "/pəˈliːs ˈɒfɪsə/", m: "Cảnh sát" },
  { w: "Bodyguard", ipa: "/ˈbɒdiɡɑːd/", m: "Vệ sĩ" },
  { w: "Judge", ipa: "/dʒʌdʒ/", m: "Quan tòa" },
  { w: "Forensic scientist", ipa: "/fəˈrɛnsɪk ˈsaɪəntɪst/", m: "Pháp y" },
  { w: "Barrister", ipa: "/ˈbærɪstə/", m: "Luật sư bào chữa" },
  { w: "Magistrate", ipa: "/ˈmædʒɪstreɪt/", m: "Quan tòa sơ thẩm" },
  { w: "Web developer", ipa: "/web dɪˈveləpə/", m: "Lập trình web" },
  { w: "Database administrator", ipa: "/ˈdeɪtəbeɪs ədˈmɪnɪstreɪtə/", m: "Quản trị CSDL" },
  { w: "Web designer", ipa: "/web dɪˈzaɪnə/", m: "Thiết kế web" },
  { w: "Software engineer", ipa: "/ˈsɒftweə ˌendʒɪˈnɪə/", m: "Kỹ sư phần mềm" },
  { w: "Programmer", ipa: "/ˈprəʊɡræmə/", m: "Lập trình viên" },
  { w: "Software developer", ipa: "/ˈsɒftweə dɪˈveləpə/", m: "Phát triển phần mềm" },
  { w: "Accountant", ipa: "/əˈkaʊntənt/", m: "Kế toán" },
  { w: "Economist", ipa: "/ɪˈkɒnəmɪst/", m: "Nhà kinh tế" },
  { w: "Investment analyst", ipa: "/ɪnˈvestmənt ˈænəlɪst/", m: "Phân tích đầu tư" },
  { w: "Businessman", ipa: "/ˈbɪznɪsmən/", m: "Doanh nhân" },
  { w: "Businesswoman", ipa: "/ˈbɪznɪswʊmən/", m: "Nữ doanh nhân" },
  { w: "Financial adviser", ipa: "/faɪˈnænʃəl ədˈvaɪzə/", m: "Cố vấn tài chính" },
  { w: "Personal assistant", ipa: "/ˈpɜːsnl əˈsɪstənt/", m: "Trợ lý cá nhân" },
  { w: "Director", ipa: "/dɪˈrektə/", m: "Giám đốc" },
  { w: "Sales representative", ipa: "/seɪlz ˌreprɪˈzentətɪv/", m: "Đại diện bán hàng" },
  { w: "Secretary", ipa: "/ˈsekrətri/", m: "Thư ký" },
  { w: "Manager", ipa: "/ˈmænɪdʒə/", m: "Quản lý" },
  { w: "Receptionist", ipa: "/rɪˈsepʃənɪst/", m: "Lễ tân" },
  { w: "Office worker", ipa: "/ˈɒfɪs ˈwɜːkə/", m: "Nhân viên văn phòng" },
  { w: "Customer service representative", ipa: "/ˈkʌstəmə ˈsɜːvɪs/", m: "CSKH" },
  { w: "Marketing director", ipa: "/ˈmɑːkɪtɪŋ dɪˈrektə/", m: "Giám đốc marketing" },
  { w: "Doctor", ipa: "/ˈdɒktə/", m: "Bác sĩ" },
  { w: "Nurse", ipa: "/nɜːs/", m: "Y tá" },
  { w: "Dentist", ipa: "/ˈdentɪst/", m: "Nha sĩ" },
  { w: "Pharmacist", ipa: "/ˈfɑːməsɪst/", m: "Dược sĩ" },
  { w: "Surgeon", ipa: "/ˈsɜːdʒən/", m: "Bác sĩ phẫu thuật" },
  { w: "Psychiatrist", ipa: "/saɪˈkaɪətrɪst/", m: "Bác sĩ tâm thần" },
  { w: "Physiotherapist", ipa: "/ˌfɪziəˈθerəpɪst/", m: "Vật lý trị liệu" },
  { w: "Teacher", ipa: "/ˈtiːtʃə/", m: "Giáo viên" },
  { w: "Lecturer", ipa: "/ˈlektʃərə/", m: "Giảng viên" },
  { w: "Translator", ipa: "/trænsˈleɪtə/", m: "Phiên dịch" },
  { w: "Teaching assistant", ipa: "/ˈtiːtʃɪŋ əˈsɪstənt/", m: "Trợ giảng" },
  { w: "Engineer", ipa: "/ˌendʒɪˈnɪə/", m: "Kỹ sư" },
  { w: "Electrician", ipa: "/ɪˌlektrɪʃən/", m: "Thợ điện" },
  { w: "Mechanic", ipa: "/mɪˈkænɪk/", m: "Thợ sửa máy" },
  { w: "Plumber", ipa: "/ˈplʌmə/", m: "Thợ sửa ống nước" },
  { w: "Carpenter", ipa: "/ˈkɑːpɪntə/", m: "Thợ mộc" },
  { w: "Bricklayer", ipa: "/ˈbrɪkleɪə/", m: "Thợ xây" },
  { w: "Architect", ipa: "/ˈɑːkɪtekt/", m: "Kiến trúc sư" },
  { w: "Chef", ipa: "/ʃef/", m: "Đầu bếp" },
  { w: "Cook", ipa: "/kʊk/", m: "Nấu ăn" },
  { w: "Waiter", ipa: "/ˈweɪtə/", m: "Phục vụ nam" },
  { w: "Waitress", ipa: "/ˈweɪtrəs/", m: "Phục vụ nữ" },
  { w: "Bartender", ipa: "/ˈbɑːtendə/", m: "Pha chế rượu" },
  { w: "Barista", ipa: "/bəˈriːstə/", m: "Pha cà phê" },
  { w: "Actor", ipa: "/ˈæktə/", m: "Diễn viên" },
  { w: "Actress", ipa: "/ˈæktrəs/", m: "Diễn viên nữ" },
  { w: "Singer", ipa: "/ˈsɪŋə/", m: "Ca sĩ" },
  { w: "Musician", ipa: "/mjuˈzɪʃən/", m: "Nhạc sĩ" },
  { w: "Photographer", ipa: "/fəˈtɒɡrəfə/", m: "Nhiếp ảnh" },
  { w: "Designer", ipa: "/dɪˈzaɪnə/", m: "Thiết kế" },
  { w: "Pilot", ipa: "/ˈpaɪlət/", m: "Phi công" },
  { w: "Driver", ipa: "/ˈdraɪvə/", m: "Tài xế" },
  { w: "Flight attendant", ipa: "/flaɪt əˈtendənt/", m: "Tiếp viên hàng không" },
  { w: "Scientist", ipa: "/ˈsaɪəntɪst/", m: "Nhà khoa học" },
  { w: "Biologist", ipa: "/baɪˈɒlədʒɪst/", m: "Sinh học" },
  { w: "Physicist", ipa: "/ˈfɪzɪsɪst/", m: "Vật lý" },
  { w: "Astronomer", ipa: "/əˈstrɒnəmə/", m: "Thiên văn" },
  { w: "Researcher", ipa: "/rɪˈsɜːtʃə/", m: "Nhà nghiên cứu" },
  { w: "Cleaner", ipa: "/ˈkliːnə/", m: "Dọn vệ sinh" },
  { w: "Factory worker", ipa: "/ˈfæktəri ˈwɜːkə/", m: "Công nhân" },
  { w: "Gardener", ipa: "/ˈɡɑːdnə/", m: "Làm vườn" },
  { w: "Cashier", ipa: "/kæˈʃɪə/", m: "Thu ngân" },
  { w: "Shop assistant", ipa: "/ʃɒp əˈsɪstənt/", m: "Bán hàng" },
  { w: "Store manager", ipa: "/stɔː ˈmænɪdʒə/", m: "Quản lý cửa hàng" },
  { w: "Politician", ipa: "/ˌpɒlɪˈtɪʃən/", m: "Chính trị gia" },
  { w: "Housewife", ipa: "/ˈhaʊswaɪf/", m: "Nội trợ" },
  { w: "Burglar", ipa: "/ˈbɜːɡlə/", m: "Kẻ trộm" },
  { w: "Thief", ipa: "/θiːf/", m: "Kẻ cắp" },
  { w: "Smuggler", ipa: "/ˈsmʌɡlə/", m: "Buôn lậu" },
  { w: "Pickpocket", ipa: "/ˈpɪkpɒkɪt/", m: "Móc túi" },
];

// ===== Storage helpers =====

function getTopics() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveTopics(topics) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
}

function getTopicById(id) {
  return getTopics().find(t => t.id === id) || null;
}

function generateId() {
  return 'tp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// ===== Color helpers =====

function randomPalette(excludeName) {
  const pool = excludeName
    ? COLOR_PALETTES.filter(p => p.name !== excludeName)
    : COLOR_PALETTES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ===== Parse word list =====
// Supports:
//   • Strict JSON array:          [{"w":"...","ipa":"...","m":"..."}]
//   • JS object literal (no quotes on keys): [{w:"...",ipa:"...",m:"..."}]
//   • "word | ipa | meaning" per line
//   • "word | meaning" per line (no IPA)

function _toJsonArray(text) {
  // Add double-quotes around bare identifier keys:  w:  →  "w":
  const fixed = text.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  const parsed = JSON.parse(fixed);
  if (!Array.isArray(parsed)) return null;
  return parsed.map(item => ({
    w:   (item.w   || item.word          || '').trim(),
    ipa: (item.ipa || item.pronunciation || '').trim(),
    m:   (item.m   || item.meaning       || '').trim(),
  })).filter(c => c.w);
}

function parseWordList(text) {
  text = (text || '').trim();
  if (!text) return [];

  // Try JSON / JS object literal array
  if (text.startsWith('[')) {
    try {
      const result = _toJsonArray(text);
      if (result && result.length) return result;
    } catch (_) {}
  }

  // Line-by-line (pipe or tab separated)
  return text.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#') && !l.startsWith('//'))
    .map(l => {
      const parts = l.split(/\s*\|\s*|\t/).map(p => p.trim());
      if (parts.length >= 3) return { w: parts[0], ipa: parts[1], m: parts[2] };
      if (parts.length === 2) return { w: parts[0], ipa: '', m: parts[1] };
      return null;
    })
    .filter(c => c && c.w);
}

// ===== Seed default data (runs once on first visit) =====

function seedIfEmpty() {
  let topics = getTopics();
  if (topics.length === 0) {
    topics = [{
      id: generateId(),
      name: 'Công việc & Nghề nghiệp',
      palette: { name: 'Điện Tím', c1: '#5865F2', c2: '#8360c3', c3: '#c084fc' },
      cards: JOBS_SEED,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }];
    saveTopics(topics);
  }
  return topics;
}

// ===== Gradient helper (supports 2-colour legacy + 3-colour) =====

function getGradient(palette, deg) {
  const d  = deg || 135;
  const c3 = palette.c3 || palette.c2;
  return `linear-gradient(${d}deg, ${palette.c1}, ${palette.c2}, ${c3})`;
}

// ===== HTML escape =====

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
