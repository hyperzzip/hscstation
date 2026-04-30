// HSC Station — Data loader
// Đổi SHEET_CSV_URL thành link Publish CSV của mày
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpwVYEioxBunimO1J0p5Ez1knU6-JxhANC3SkJniQGguCK56gzZpTYhPpzzwkX4zVLTgnDl5HS3BOn/pub?gid=534929420&single=true&output=csv";

window.HSC_CATEGORIES = [
  { id: "hot",         name: "Hàng hot",                 icon: "🔥" },
  { id: "khuyenmai",   name: "Khuyến mại",               icon: "🎁" },
  { id: "moive",       name: "Hàng mới về",              icon: "🆕" },
  { id: "thitdonglanh",name: "Thịt đông lạnh",           icon: "🥩" },
  { id: "thuyhaisan",  name: "Thủy hải sản",             icon: "🐟" },
  { id: "chebien",     name: "Thực phẩm chế biến sẵn",   icon: "🍱" },
  { id: "nongsandl",   name: "Nông sản đông lạnh",       icon: "🥬" },
  { id: "nongsantuoi", name: "Nông sản tươi",            icon: "🥕" },
  { id: "bunmymien",   name: "Bún mỳ miến",              icon: "🍜" },
  { id: "giavi",       name: "Gia vị",                   icon: "🧂" },
  { id: "dokho",       name: "Nguyên liệu, đồ khô",      icon: "🌾" },
  { id: "banhkeo",     name: "Bánh kẹo",                 icon: "🍬" },
  { id: "douong",      name: "Đồ uống",                  icon: "🥤" },
  { id: "xachtay",     name: "Hàng xách tay",            icon: "✈️" },
  { id: "giadung",     name: "Đồ gia dụng",              icon: "🍳" },
];

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map(line => {
    const vals = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { vals.push(cur); cur = ""; }
      else { cur += ch; }
    }
    vals.push(cur);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] || "").trim(); });
    return obj;
  }).filter(r => r.id && r.name);
}

function rowToProduct(r) {
  const ph = (label, bg = "#e8f5e9", fg = "#2e7d32") => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='${bg}'/><text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-size='18' font-weight='600' fill='${fg}'>${label.slice(0,12)}</text></svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  };
  const bool = v => v === "TRUE" || v === "true" || v === "1";
  const num  = v => parseFloat(v) || 0;
  return {
    id:          r.id,
    name:        r.name,
    category:    r.category ? r.category.split(",").map(s => s.trim()) : [],
    priceJPY:    num(r.priceJPY),
    priceSale:   r.priceSale ? num(r.priceSale) : null,
    unit:        r.unit || "cái",
    spec:        r.spec || "",
    image:       r.image || ph(r.name),
    sale:        bool(r.sale),
    hot:         bool(r.hot),
    isNew:       bool(r.isNew),
    available:   bool(r.available),
    promoNote:   r.promoNote || "",
    description: r.description || "",
  };
}

window.HSC_loadProducts = async function() {
  try {
    const res = await fetch(SHEET_CSV_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const text = await res.text();
    const rows = parseCSV(text);
    return rows.map(rowToProduct);
  } catch (e) {
    console.warn("HSC: Không tải được sheet, dùng data rỗng.", e);
    return [];
  }
};
