// Side menu drawer + product list + product modal
const { useState: useStateP, useEffect: useEffectP, useMemo, useRef: useRefP } = React;

function SideMenu({ open, onClose, accentBg, accentFg, displayMode, onDisplayMode, onSelectCategory, currentScreen, onGoHome }) {
  const { CATEGORIES } = window.HSC_DATA;
  return (
    <>
      <div
        className={`hsc-menu-backdrop ${open ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`hsc-menu ${open ? "open" : ""}`}>
        <div className="hsc-menu-section">
          <div className="hsc-menu-section-title" style={{ borderColor: accentBg, color: accentBg }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Hiển thị sản phẩm</span>
          </div>
          <label className="hsc-menu-radio">
            <input
              type="radio"
              checked={displayMode === "grid"}
              onChange={() => onDisplayMode("grid")}
            />
            <span className="hsc-radio-dot" style={{ borderColor: accentBg }}>
              {displayMode === "grid" && <span style={{ background: accentBg }} />}
            </span>
            <span>Dạng ô</span>
          </label>
          <label className="hsc-menu-radio">
            <input
              type="radio"
              checked={displayMode === "row"}
              onChange={() => onDisplayMode("row")}
            />
            <span className="hsc-radio-dot" style={{ borderColor: accentBg }}>
              {displayMode === "row" && <span style={{ background: accentBg }} />}
            </span>
            <span>Dạng dòng <em>(Dành cho kết nối chậm)</em></span>
          </label>
        </div>

        <button
          className={`hsc-menu-item ${currentScreen === "home" ? "active" : ""}`}
          onClick={() => { onGoHome(); onClose(); }}
          style={{ borderColor: accentBg, color: accentBg }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
          <span><u>Trang chủ</u></span>
        </button>

        <div className="hsc-menu-section-title hsc-menu-cat-head" style={{ borderColor: accentBg, color: accentBg }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          <span>Danh mục</span>
        </div>
        <div className="hsc-menu-cats">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className="hsc-menu-cat"
              onClick={() => { onSelectCategory(c.id); onClose(); }}
              style={{ color: accentBg }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductRow({ product, onClick, accentBg }) {
  return (
    <button className="hsc-prow" onClick={onClick}>
      <div className="hsc-prow-img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="hsc-prow-name">{product.name}</div>
      <div className="hsc-prow-price" style={{ color: accentBg }}>
        ¥{product.priceJPY.toLocaleString()}
      </div>
      {product.sale && <div className="hsc-ribbon">SALE</div>}
    </button>
  );
}

function ProductCard({ product, onClick, accentBg }) {
  return (
    <button className="hsc-pcard" onClick={onClick}>
      <div className="hsc-pcard-img">
        <img src={product.image} alt={product.name} />
        {product.sale && <div className="hsc-ribbon">SALE</div>}
        {product.hot && !product.sale && <div className="hsc-ribbon hot">HOT</div>}
        {product.isNew && !product.sale && !product.hot && <div className="hsc-ribbon new">MỚI</div>}
      </div>
      <div className="hsc-pcard-body">
        <div className="hsc-pcard-name">{product.name}</div>
        <div className="hsc-pcard-price" style={{ color: accentBg }}>
          ¥{product.priceJPY.toLocaleString()}
          <span className="hsc-pcard-unit">/{product.unit}</span>
        </div>
      </div>
    </button>
  );
}

function ProductModal({ product, onClose, onCategoryClick, accentBg, accentFg }) {
  const { CATEGORIES } = window.HSC_DATA;
  if (!product) return null;
  const cats = product.category.map((id) => CATEGORIES.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="hsc-modal-wrap" onClick={onClose}>
      <div className="hsc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hsc-modal-head" style={{ background: accentBg, color: accentFg }}>
          <span className="hsc-modal-title">{product.name}</span>
          <button onClick={onClose} aria-label="Close" className="hsc-modal-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="hsc-modal-body">
          <div className="hsc-modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="hsc-modal-info">
            <div className="hsc-modal-cats">
              <span className="hsc-modal-label">Danh mục:</span>
              {cats.map((c) => (
                <button
                  key={c.id}
                  className="hsc-cat-chip"
                  style={{ background: accentBg, color: accentFg }}
                  onClick={() => { onCategoryClick(c.id); onClose(); }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <h2 className="hsc-modal-name" style={{ color: accentBg }}>{product.name}</h2>
            <div className="hsc-modal-price">
              <span style={{ color: accentBg }}>¥{product.priceJPY.toLocaleString()}</span>
              <span className="hsc-modal-unit">/{product.unit}</span>
            </div>
            {product.promoNote && (
              <div className="hsc-modal-promo" style={{ borderColor: accentBg, color: accentBg }}>
                <span className="hsc-modal-promo-icon">⭐</span>
                <span>{product.promoNote}</span>
              </div>
            )}
            {product.description && (
              <div className="hsc-modal-desc">{product.description}</div>
            )}
            <div className={`hsc-modal-stock ${product.available ? "in" : "out"}`} style={product.available ? { background: accentBg, color: accentFg } : null}>
              {product.available ? "CÒN HÀNG" : "HẾT HÀNG"}
            </div>
            {product.spec && (
              <div className="hsc-modal-spec">
                <span className="hsc-modal-label">Quy cách:</span> {product.spec}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

window.HSCSideMenu = SideMenu;
window.HSCProductRow = ProductRow;
window.HSCProductCard = ProductCard;
window.HSCProductModal = ProductModal;
