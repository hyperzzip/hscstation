// Product list/grid + product modal
function formatYen(n) {
  return "¥" + n.toLocaleString("ja-JP");
}

function SaleBadge() {
  return (
    <div className="hsc-sale-ribbon">
      <span>SALE</span>
    </div>
  );
}

function HotBadge() {
  return <div className="hsc-hot-badge">HOT</div>;
}

function NewBadge() {
  return <div className="hsc-new-badge">MỚI</div>;
}

function ProductRow({ product, onClick }) {
  return (
    <button className="hsc-prod-row" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} className="hsc-prod-row-img"/>
      <div className="hsc-prod-row-name">{product.name}</div>
      <div className="hsc-prod-row-price" style={{ color: product.sale ? "#1976d2" : "#222" }}>
        {formatYen(product.priceJPY)}
      </div>
      {product.sale && <SaleBadge/>}
    </button>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <button className="hsc-prod-card" onClick={() => onClick(product)}>
      <div className="hsc-prod-card-imgwrap">
        <img src={product.image} alt={product.name} className="hsc-prod-card-img"/>
        {product.sale && <SaleBadge/>}
        {product.hot && !product.sale && <HotBadge/>}
        {product.isNew && !product.sale && !product.hot && <NewBadge/>}
        {!product.available && (
          <div className="hsc-soldout-overlay">HẾT HÀNG</div>
        )}
      </div>
      <div className="hsc-prod-card-body">
        <div className="hsc-prod-card-name">{product.name}</div>
        <div className="hsc-prod-card-price" style={{ color: product.sale ? "#1976d2" : "#222" }}>
          {formatYen(product.priceJPY)}<span className="hsc-prod-card-unit">/{product.unit}</span>
        </div>
      </div>
    </button>
  );
}

function ProductModal({ product, onClose, theme, onPickCategory }) {
  if (!product) return null;
  const cats = window.HSC_DATA.CATEGORIES.filter(c => product.category.includes(c.id));

  return (
    <div className="hsc-modal-backdrop" onClick={onClose}>
      <div className="hsc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hsc-modal-header" style={{ background: theme.primary }}>
          <div className="hsc-modal-title">{product.name}</div>
          <button className="hsc-modal-close" onClick={onClose} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="hsc-modal-body">
          <div className="hsc-modal-imgwrap">
            <img src={product.image} alt={product.name} className="hsc-modal-img"/>
          </div>
          <div className="hsc-modal-info">
            <div className="hsc-modal-cats">
              <span className="hsc-modal-cats-label">Danh mục:</span>
              {cats.map(c => (
                <button key={c.id} className="hsc-cat-chip" style={{ background: theme.primaryLight, color: theme.primaryDark }} onClick={() => onPickCategory(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>
            <h2 className="hsc-modal-name" style={{ color: theme.primaryDark }}>{product.name}</h2>
            <div className="hsc-modal-price" style={{ color: "#1976d2" }}>
              {formatYen(product.priceJPY)}<span className="hsc-modal-unit">/{product.unit}</span>
            </div>
            {product.promoNote && (
              <div className="hsc-modal-promo" style={{ borderColor: "#d32f2f", color: "#d32f2f" }}>
                <span className="hsc-promo-stars">⭐⭐</span>
                <span>{product.promoNote}</span>
              </div>
            )}
            {!product.available ? (
              <div className="hsc-modal-soldout">HẾT HÀNG</div>
            ) : (
              <div className="hsc-modal-instock" style={{ background: theme.primaryLight, color: theme.primaryDark }}>CÒN HÀNG</div>
            )}
            {product.spec && (
              <div className="hsc-modal-spec"><strong>Quy cách:</strong> {product.spec}</div>
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

window.ProductRow = ProductRow;
window.ProductCard = ProductCard;
window.ProductModal = ProductModal;
window.formatYen = formatYen;
