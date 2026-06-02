// Pages: Home (categories grid) and CategoryList (products)
function HomePage({ onPickCategory, theme, mascotMode }) {
  const cats = window.HSC_DATA.CATEGORIES;
  const featuredCats = ["khuyenmai", "hot", "moive"];
  const featured = cats.filter(c => featuredCats.includes(c.id));
  const others = cats.filter(c => !featuredCats.includes(c.id));

  return (
    <div className="hsc-home">
      {mascotMode !== "off" && (
        <div className="hsc-hero" style={{ background: `linear-gradient(135deg, ${theme.primaryLight} 0%, #fff 100%)` }}>
          <div className="hsc-hero-text">
            <div className="hsc-hero-eyebrow" style={{ color: theme.primaryDark }}>HSC STATION · SINCE 2017</div>
            <div className="hsc-hero-title">Cho bữa cơm Việt<br/>thêm ngon</div>
            <div className="hsc-hero-sub">Chuỗi thực phẩm Việt tại Fukuoka</div>
          </div>
          <img src="assets/mascot-cogai.png" alt="Mascot" className="hsc-hero-mascot"/>
        </div>
      )}

      <div className="hsc-section-title">
        <span className="hsc-section-bar" style={{ background: theme.primary }}/>
        Danh mục nổi bật
      </div>
      <div className="hsc-feature-grid">
        {featured.map(c => (
          <button
            key={c.id}
            className="hsc-feature-card"
            style={{ background: theme.primaryLight, borderColor: theme.primary }}
            onClick={() => onPickCategory(c.id)}
          >
            <div className="hsc-feature-icon">{c.icon}</div>
            <div className="hsc-feature-name" style={{ color: theme.primaryDark }}>{c.name}</div>
          </button>
        ))}
      </div>

      <div className="hsc-section-title">
        <span className="hsc-section-bar" style={{ background: theme.primary }}/>
        Tất cả danh mục
      </div>
      <div className="hsc-cat-list">
        {others.map(c => (
          <button
            key={c.id}
            className="hsc-cat-item"
            onClick={() => onPickCategory(c.id)}
          >
            <span className="hsc-cat-item-icon">{c.icon}</span>
            <span className="hsc-cat-item-name">{c.name}</span>
            <span className="hsc-cat-item-arrow" style={{ color: theme.primary }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryPage({ categoryId, products, viewMode, onPickProduct, theme, query }) {
  const cat = window.HSC_DATA.CATEGORIES.find(c => c.id === categoryId);
  const filtered = products.filter(p => {
    const matchCat = !categoryId || p.category.includes(categoryId);
    const q = (query || "").toLowerCase().trim();
    const matchQ = !q || p.name.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className={`hsc-catpage ${viewMode === "list" ? "list" : "grid"}`}>
      <div className="hsc-catpage-meta">
        <span style={{ color: theme.primaryDark }}>
          {cat ? cat.icon + " " + cat.name : "Tất cả sản phẩm"}
        </span>
        <span className="hsc-catpage-count">{filtered.length} sản phẩm</span>
      </div>
      {filtered.length === 0 ? (
        <div className="hsc-empty">
          <img src="assets/mascot-cogai.png" alt="" className="hsc-empty-mascot"/>
          <div className="hsc-empty-text">Chưa có sản phẩm phù hợp</div>
        </div>
      ) : viewMode === "list" ? (
        <div className="hsc-prod-rows">
          {filtered.map(p => <ProductRow key={p.id} product={p} onClick={onPickProduct}/>)}
        </div>
      ) : (
        <div className="hsc-prod-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} onClick={onPickProduct}/>)}
        </div>
      )}
    </div>
  );
}

window.HomePage = HomePage;
window.CategoryPage = CategoryPage;
