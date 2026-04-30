// Main HSC Station App - Mobile catalog
const { useState, useEffect, useMemo, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "themeColor": "green",
  "showMascot": true,
  "defaultLayout": "grid",
  "showHeroBanner": true,
  "fontScale": 1
}/*EDITMODE-END*/;

const THEMES = {
  green: { primary: "#2e7d32", primaryDark: "#1b5e20", primaryLight: "#43a047", accent: "#fdd835", saleBadge: "#e53935" },
  red: { primary: "#d32f2f", primaryDark: "#b71c1c", primaryLight: "#e53935", accent: "#fdd835", saleBadge: "#c2185b" },
  greenWarm: { primary: "#2e7d32", primaryDark: "#1b5e20", primaryLight: "#43a047", accent: "#ff6f00", saleBadge: "#e53935" },
};

function formatYen(n) {
  return "¥" + n.toLocaleString("ja-JP");
}

// ====== Header ======
function Header({ title, onBack, onMenu, theme, showSearch = true, search, setSearch }) {
  return (
    <div className="hsc-header" style={{ background: theme.primary }}>
      <div className="hsc-header-top">
        {onBack ? (
          <button className="hsc-iconbtn" onClick={onBack} aria-label="Back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        ) : (
          <div className="hsc-header-logo">
            <img src="assets/logo-hsc-horizontal.png" alt="HSC Station" />
          </div>
        )}
        <div className="hsc-header-title">{title}</div>
        <button className="hsc-iconbtn" onClick={onMenu} aria-label="Menu">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
      {showSearch && (
        <div className="hsc-search-wrap">
          <input
            type="search"
            className="hsc-search"
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="hsc-search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </span>
        </div>
      )}
    </div>
  );
}

// ====== Footer ======
function Footer({ theme }) {
  return (
    <footer className="hsc-footer" style={{ background: theme.primary }}>
      <div className="hsc-footer-mascot">
        <img src="assets/mascot-cogai.png" alt="" />
      </div>
      <div className="hsc-footer-info">
        <div className="hsc-footer-title">HSC STATION</div>
        <div className="hsc-footer-tag">Cho bữa cơm Việt thêm ngon · Since 2017</div>
        <div className="hsc-footer-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></svg>
          <span>Trụ sở: 〒811-0101 福岡県糟屋郡新宮町原上 1720-2</span>
        </div>
        <div className="hsc-footer-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></svg>
          <span>CN Hakozaki: 〒812-0053 福岡市東区箱崎 2-34-20</span>
        </div>
        <div className="hsc-footer-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></svg>
          <span>CN Fukkodai: 〒811-0121 福岡県糟屋郡新宮町美咲 2-7-1</span>
        </div>
        <div className="hsc-footer-social">
          <a href="#" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            <span>HSC Station</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ====== Side Drawer ======
function SideDrawer({ open, onClose, categories, currentCat, onSelectCat, layout, setLayout, theme }) {
  return (
    <>
      <div className={`hsc-drawer-mask ${open ? "is-open" : ""}`} onClick={onClose} />
      <aside className={`hsc-drawer ${open ? "is-open" : ""}`}>
        <div className="hsc-drawer-section">
          <div className="hsc-drawer-section-title" style={{ color: theme.primary }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
            Hiển thị sản phẩm
          </div>
          <button className={`hsc-drawer-radio ${layout === "grid" ? "is-on" : ""}`} onClick={() => setLayout("grid")} style={layout === "grid" ? { borderColor: theme.primary } : {}}>
            <span className={`hsc-radio-dot ${layout === "grid" ? "is-on" : ""}`} style={layout === "grid" ? { borderColor: theme.primary } : {}}>
              {layout === "grid" && <span style={{ background: theme.primary }} />}
            </span>
            <span>Dạng ô</span>
          </button>
          <button className={`hsc-drawer-radio ${layout === "list" ? "is-on" : ""}`} onClick={() => setLayout("list")} style={layout === "list" ? { borderColor: theme.primary } : {}}>
            <span className={`hsc-radio-dot ${layout === "list" ? "is-on" : ""}`} style={layout === "list" ? { borderColor: theme.primary } : {}}>
              {layout === "list" && <span style={{ background: theme.primary }} />}
            </span>
            <span>
              Dạng dòng
              <small>(Dành cho kết nối chậm)</small>
            </span>
          </button>
        </div>

        <button className="hsc-drawer-link" style={{ background: theme.primary }} onClick={() => { onSelectCat(null); onClose(); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m3 12 9-9 9 9"/><path d="M5 10v10h14V10"/></svg>
          <span>Trang chủ</span>
        </button>

        <div className="hsc-drawer-cat-header" style={{ background: theme.primary }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
          <span>Danh mục</span>
        </div>
        <div className="hsc-drawer-cats">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`hsc-drawer-cat ${currentCat === c.id ? "is-active" : ""}`}
              onClick={() => { onSelectCat(c.id); onClose(); }}
              style={currentCat === c.id ? { color: theme.primaryDark, fontWeight: 700 } : {}}
            >
              <span className="hsc-cat-emoji">{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

// ====== Product cards ======
function SaleRibbon() {
  return <div className="hsc-sale-ribbon">SALE</div>;
}

function ProductCardRow({ p, onOpen, theme }) {
  return (
    <button className="hsc-prod-row" onClick={() => onOpen(p)}>
      <div className="hsc-prod-row-img">
        <img src={p.image} alt={p.name} loading="lazy" />
      </div>
      <div className="hsc-prod-row-name">{p.name}</div>
      <div className="hsc-prod-row-price" style={{ color: theme.primary }}>
        {formatYen(p.priceSale || p.priceJPY)}
      </div>
      {p.sale && <SaleRibbon />}
      {!p.available && <span className="hsc-row-out">Hết</span>}
    </button>
  );
}

function ProductCardGrid({ p, onOpen, theme }) {
  return (
    <button className="hsc-prod-card" onClick={() => onOpen(p)}>
      <div className="hsc-prod-card-img">
        <img src={p.image} alt={p.name} loading="lazy" />
        {p.sale && <SaleRibbon />}
        {p.hot && <span className="hsc-card-badge hsc-badge-hot">HOT</span>}
        {p.isNew && <span className="hsc-card-badge hsc-badge-new">MỚI</span>}
        {!p.available && <div className="hsc-card-out"><span>Hết hàng</span></div>}
      </div>
      <div className="hsc-prod-card-body">
        <div className="hsc-prod-card-name">{p.name}</div>
        <div className="hsc-prod-card-price" style={{ color: theme.primary }}>
          {formatYen(p.priceSale || p.priceJPY)}
          <small>/{p.unit}</small>
        </div>
      </div>
    </button>
  );
}

// ====== Product Detail Modal ======
function ProductModal({ product, onClose, categories, theme }) {
  if (!product) return null;
  const cats = product.category.map((cid) => categories.find((c) => c.id === cid)).filter(Boolean);
  return (
    <div className="hsc-modal-mask" onClick={onClose}>
      <div className="hsc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hsc-modal-head" style={{ background: theme.primary }}>
          <div className="hsc-modal-head-title">{product.name}</div>
          <button className="hsc-iconbtn" onClick={onClose} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="hsc-modal-body">
          <div className="hsc-modal-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="hsc-modal-info">
            <div className="hsc-modal-cats">
              <span className="hsc-modal-cats-label">Danh mục:</span>
              {cats.map((c) => (
                <span key={c.id} className="hsc-modal-cat-chip">{c.name}</span>
              ))}
            </div>
            <div className="hsc-modal-name" style={{ color: theme.primaryDark }}>{product.name}</div>
            <div className="hsc-modal-price" style={{ color: theme.primary }}>
              {formatYen(product.priceSale || product.priceJPY)}
              <small>/{product.unit}</small>
            </div>
            {product.promoNote && (
              <div className="hsc-promo-note" style={{ borderColor: theme.saleBadge, color: theme.saleBadge }}>
                <span className="hsc-promo-stars">⭐</span>
                <em>{product.promoNote}</em>
              </div>
            )}
            {product.available ? (
              <div className="hsc-modal-stock hsc-instock" style={{ background: theme.primary }}>CÒN HÀNG</div>
            ) : (
              <div className="hsc-modal-stock hsc-outstock">HẾT HÀNG</div>
            )}
            {product.spec && (
              <div className="hsc-modal-spec"><b>Quy cách:</b> {product.spec}</div>
            )}
            {product.description && (
              <div className="hsc-modal-desc">{product.description}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Header, Footer, SideDrawer, ProductCardRow, ProductCardGrid, ProductModal, formatYen, THEMES });
