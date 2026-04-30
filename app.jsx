// HSC Station — Main App (async sheet fetch)
const { useState, useEffect, useMemo } = React;
const CATEGORIES = window.HSC_CATEGORIES;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "themeColor": "green",
  "showMascot": true,
  "defaultLayout": "list",
  "showHeroBanner": true,
  "fontScale": 1
}/*EDITMODE-END*/;

const THEMES = {
  green:     { primary: "#2e7d32", primaryDark: "#1b5e20", primaryLight: "#43a047", accent: "#fdd835", saleBadge: "#e53935" },
  red:       { primary: "#d32f2f", primaryDark: "#b71c1c", primaryLight: "#e53935", accent: "#fdd835", saleBadge: "#c2185b" },
  greenWarm: { primary: "#2e7d32", primaryDark: "#1b5e20", primaryLight: "#43a047", accent: "#ff6f00", saleBadge: "#e53935" },
};

// ── Loading screen ─────────────────────────────────────
function LoadingScreen({ theme }) {
  return (
    <div className="hsc-loading">
      <img src="assets/mascot-cogai.png" alt="" className="hsc-loading-mascot" />
      <div className="hsc-loading-dots">
        <span style={{ background: theme.primary }} />
        <span style={{ background: theme.primary }} />
        <span style={{ background: theme.primary }} />
      </div>
      <p>Đang tải sản phẩm...</p>
    </div>
  );
}

// ── Home screen ─────────────────────────────────────────
function HomeScreen({ products, theme, onSelectCat, onOpenProduct, showHero }) {
  const hotProducts = products.filter(p => p.hot).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 8);
  const saleCount   = products.filter(p => p.sale).length;

  return (
    <div className="hsc-home">
      {showHero && (
        <div className="hsc-hero" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)` }}>
          <div className="hsc-hero-text">
            <div className="hsc-hero-eyebrow">SINCE 2017 · FUKUOKA</div>
            <div className="hsc-hero-title">Cho bữa cơm Việt thêm ngon</div>
            <div className="hsc-hero-sub">Thực phẩm Việt Nam chính gốc — giao tận nơi tại Nhật</div>
            <button className="hsc-hero-cta" style={{ color: theme.primaryDark }} onClick={() => onSelectCat("khuyenmai")}>
              Xem khuyến mại 🎁
            </button>
          </div>
          <div className="hsc-hero-mascot">
            <img src="assets/mascot-cogai.png" alt="" />
          </div>
        </div>
      )}

      {saleCount > 0 && (
        <div className="hsc-promo-strip" onClick={() => onSelectCat("khuyenmai")}>
          <div className="hsc-promo-icon">🎁</div>
          <div className="hsc-promo-strip-text">
            <b>Đang có khuyến mại</b>
            <small>{saleCount} sản phẩm SALE — bấm để xem</small>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      )}

      <div className="hsc-section">
        <div className="hsc-section-head"><h2>Danh mục hàng hóa</h2></div>
        <div className="hsc-cat-grid">
          {CATEGORIES.slice(0, 8).map(c => (
            <button key={c.id} className="hsc-cat-tile" onClick={() => onSelectCat(c.id)}>
              <div className="hsc-cat-tile-icon" style={{ background: theme.primary + "18", color: theme.primary }}>{c.icon}</div>
              <div className="hsc-cat-tile-name">{c.name}</div>
            </button>
          ))}
        </div>
        <button className="hsc-see-all" onClick={() => onSelectCat("__all_cats__")} style={{ color: theme.primary }}>
          Xem tất cả danh mục
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {hotProducts.length > 0 && (
        <div className="hsc-section">
          <div className="hsc-section-head">
            <h2>🔥 Hàng hot</h2>
            <button className="hsc-section-more" onClick={() => onSelectCat("hot")} style={{ color: theme.primary }}>Tất cả</button>
          </div>
          <div className="hsc-hscroll">
            {hotProducts.map(p => (
              <div key={p.id} className="hsc-hscroll-item">
                <ProductCardGrid p={p} onOpen={onOpenProduct} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      )}

      {newProducts.length > 0 && (
        <div className="hsc-section">
          <div className="hsc-section-head">
            <h2>🆕 Hàng mới về</h2>
            <button className="hsc-section-more" onClick={() => onSelectCat("moive")} style={{ color: theme.primary }}>Tất cả</button>
          </div>
          <div className="hsc-hscroll">
            {newProducts.map(p => (
              <div key={p.id} className="hsc-hscroll-item">
                <ProductCardGrid p={p} onOpen={onOpenProduct} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Category / search screen ────────────────────────────
function CategoryScreen({ products, catId, search, layout, theme, onOpenProduct, onSelectCat }) {
  if (catId === "__all_cats__") {
    return (
      <div className="hsc-allcats">
        <div className="hsc-section-head" style={{ padding: "16px" }}>
          <h2 style={{ textAlign: "center", width: "100%" }}>Danh mục hàng hóa</h2>
        </div>
        <div className="hsc-allcats-list">
          {CATEGORIES.map(c => (
            <button key={c.id} className="hsc-allcats-row" onClick={() => onSelectCat(c.id)}>
              <span className="hsc-cat-emoji">{c.icon}</span>
              <span className="hsc-allcats-name">{c.name}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const filtered = useMemo(() => {
    let list = products;
    if (catId) list = list.filter(p => p.category.includes(catId));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [products, catId, search]);

  if (filtered.length === 0) return (
    <div className="hsc-empty">
      <div className="hsc-empty-mascot"><img src="assets/mascot-cogai.png" alt="" /></div>
      <h3>Chưa có sản phẩm phù hợp</h3>
      <p>Thử tìm từ khóa khác hoặc xem danh mục khác nha</p>
    </div>
  );

  return (
    <div className="hsc-catpage">
      {layout === "list" ? (
        <div className="hsc-list">
          {filtered.map(p => <ProductCardRow key={p.id} p={p} onOpen={onOpenProduct} theme={theme} />)}
        </div>
      ) : (
        <div className="hsc-grid">
          {filtered.map(p => <ProductCardGrid key={p.id} p={p} onOpen={onOpenProduct} theme={theme} />)}
        </div>
      )}
    </div>
  );
}

// ── Root App ────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = THEMES[tweaks.themeColor] || THEMES.green;

  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [currentCat, setCurrentCat] = useState(null);
  const [search, setSearch]         = useState("");
  const [layout, setLayout]         = useState(tweaks.defaultLayout);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);

  useEffect(() => {
    window.HSC_loadProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hsc-primary",      theme.primary);
    root.style.setProperty("--hsc-primary-dark",  theme.primaryDark);
    root.style.setProperty("--hsc-primary-light", theme.primaryLight);
    root.style.setProperty("--hsc-accent",        theme.accent);
    root.style.setProperty("--hsc-sale",          theme.saleBadge);
    root.style.setProperty("--hsc-font-scale",    tweaks.fontScale);
  }, [tweaks.themeColor, tweaks.fontScale]);

  useEffect(() => { setLayout(tweaks.defaultLayout); }, [tweaks.defaultLayout]);

  const cat = CATEGORIES.find(c => c.id === currentCat);
  const headerTitle = currentCat === "__all_cats__" ? "Tất cả danh mục"
                    : cat ? cat.name : "HSC Station";
  const isHome = currentCat === null;

  return (
    <div className="hsc-app">
      <Header
        title={headerTitle}
        onBack={isHome ? null : () => { setCurrentCat(null); setSearch(""); }}
        onMenu={() => setDrawerOpen(true)}
        theme={theme}
        search={search}
        setSearch={setSearch}
      />

      <main className="hsc-main">
        {loading ? (
          <LoadingScreen theme={theme} />
        ) : isHome ? (
          <HomeScreen products={products} theme={theme} onSelectCat={setCurrentCat} onOpenProduct={setProductModal} showHero={tweaks.showHeroBanner} />
        ) : (
          <CategoryScreen products={products} catId={currentCat} search={search} layout={layout} theme={theme} onOpenProduct={setProductModal} onSelectCat={setCurrentCat} />
        )}
      </main>

      <Footer theme={theme} />

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} categories={CATEGORIES} currentCat={currentCat} onSelectCat={setCurrentCat} layout={layout} setLayout={setLayout} theme={theme} />
      <ProductModal product={productModal} onClose={() => setProductModal(null)} categories={CATEGORIES} theme={theme} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Giao diện">
          <TweakRadio label="Màu chủ đạo" value={tweaks.themeColor}
            options={[{ value:"green",label:"Xanh lá" },{ value:"greenWarm",label:"Xanh+cam" },{ value:"red",label:"Đỏ" }]}
            onChange={v => setTweak("themeColor", v)} />
          <TweakRadio label="Layout mặc định" value={tweaks.defaultLayout}
            options={[{ value:"grid",label:"Dạng ô" },{ value:"list",label:"Dạng dòng" }]}
            onChange={v => setTweak("defaultLayout", v)} />
          <TweakToggle label="Banner trang chủ" value={tweaks.showHeroBanner} onChange={v => setTweak("showHeroBanner", v)} />
          <TweakSlider label="Cỡ chữ" value={tweaks.fontScale} min={0.85} max={1.2} step={0.05} onChange={v => setTweak("fontScale", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
