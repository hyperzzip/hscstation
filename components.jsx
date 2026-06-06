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
  return "¥" + Math.round(n).toLocaleString("ja-JP");
}
function formatYenTax(n) {
  return formatYen(n) + "(税込)";
}
function calcDiscount(original, sale) {
  if (!original || !sale || sale >= original) return 0;
  return Math.round((1 - sale / original) * 100);
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
            <img src="data:image/png;base64,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" alt="HSC Station" />
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
            placeholder="Tìm theo tên hoặc mã vạch"
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
        <img src="./assets/mascot-cogai.png" alt="" />
      </div>
      <div className="hsc-footer-info">
        <div className="hsc-footer-title">HSC STATION</div>
        <div className="hsc-footer-tag">Cho bữa cơm Việt thêm ngon · Since 2017</div>
        <div className="hsc-footer-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z"/><circle cx="12" cy="9" r="3"/></svg>
          <span>Trụ sở: 〒811-0101 福岡県糟屋郡新宮町原上 1720-2</span>
        </div>
        <div className="hsc-footer-social">
          <a href="https://www.facebook.com/Hscstation2017" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            <span>Facebook</span>
          </a>
          <a href="https://www.tiktok.com/@hscstation" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1.84-.08z"/></svg>
            <span>TikTok</span>
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
      <div className="hsc-prod-row-price">
        {p.sale && p.priceSale ? (
          <>
            <span className="hsc-price-original">{formatYen(p.priceJPY)}</span>
            <span className="hsc-price-sale">{formatYenTax(p.priceSale)}</span>
            <span className="hsc-price-discount">-{calcDiscount(p.priceJPY, p.priceSale)}%</span>
          </>
        ) : (
          <span style={{ color: theme.primary }}>{formatYenTax(p.priceJPY)}</span>
        )}
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
        <div className="hsc-prod-card-price">
          {p.sale && p.priceSale ? (
            <>
              <span className="hsc-price-original">{formatYen(p.priceJPY)}</span>
              <span className="hsc-price-sale">{formatYenTax(p.priceSale)}</span>
              <span className="hsc-price-discount">-{calcDiscount(p.priceJPY, p.priceSale)}%</span>
            </>
          ) : (
            <span style={{ color: theme.primary }}>{formatYenTax(p.priceJPY)}<small>/{p.unit}</small></span>
          )}
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
            <div className="hsc-modal-price">
              {product.sale && product.priceSale ? (
                <>
                  <span className="hsc-price-original" style={{ fontSize: '16px' }}>{formatYen(product.priceJPY)}</span>
                  <span className="hsc-price-sale" style={{ fontSize: '24px' }}>{formatYenTax(product.priceSale)}</span>
                  <span className="hsc-price-discount">-{calcDiscount(product.priceJPY, product.priceSale)}%</span>
                </>
              ) : (
                <span style={{ color: theme.primary }}>{formatYenTax(product.priceJPY)}<small>/{product.unit}</small></span>
              )}
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
            {product.expiryDate && (
              <div className="hsc-modal-expiry">
                <b>Hạn sử dụng:</b> {product.expiryDate}
              </div>
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

Object.assign(window, { Header, Footer, SideDrawer, ProductCardRow, ProductCardGrid, ProductModal, formatYen, formatYenTax, calcDiscount, THEMES });
