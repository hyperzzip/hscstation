// Header, Footer, Drawer for HSC Station catalog
const { useState, useEffect, useRef } = React;

function HSCHeader({ title = "HSC Station", showBack = false, onBack, onMenu, search, onSearch, headerColor = "#2e7d32" }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: headerColor, color: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px 8px" }}>
        {showBack ? (
          <button onClick={onBack} aria-label="Quay lại" style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, width: 36, height: 36, color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 3 }}>
            <img src="assets/logo-hsc-station.png" alt="HSC" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}
        <h1 style={{ fontSize: 17, fontWeight: 700, margin: 0, flex: 1, lineHeight: 1.2, letterSpacing: 0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h1>
        <button onClick={onMenu} aria-label="Menu" style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 8, width: 36, height: 36, color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
      <div style={{ padding: "0 14px 12px" }}>
        <div style={{ position: "relative" }}>
          <input
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              width: "100%", height: 40, borderRadius: 999, border: "none", padding: "0 44px 0 18px",
              fontSize: 14, backgroundColor: "white", color: "#333", outline: "none", boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
          <div style={{ position: "absolute", right: 4, top: 4, width: 32, height: 32, borderRadius: 999, backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", color: headerColor }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HSCFooter({ headerColor = "#2e7d32" }) {
  return (
    <footer style={{ backgroundColor: headerColor, color: "white", padding: "18px 16px 22px", marginTop: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "stretch" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 56, height: 56, borderRadius: 10, background: "white", padding: 4, flexShrink: 0 }}>
            <img src="assets/logo-hsc-station.png" alt="HSC Station" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.3 }}>HSC STATION</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>CHO BỮA CƠM VIỆT THÊM NGON</div>
            <div style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>Since 2017</div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.2)" }} />

        <div style={{ fontSize: 12, lineHeight: 1.7 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ flexShrink: 0 }}>📍</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Trụ sở chính</div>
              <div style={{ opacity: 0.9 }}>811-0101 福岡県糟屋郡新宮町原上1720-2</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ flexShrink: 0 }}>📍</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Chi nhánh Hakozaki</div>
              <div style={{ opacity: 0.9 }}>812-0053 福岡市東区箱崎2-34-20</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
            <span style={{ flexShrink: 0 }}>📍</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Chi nhánh Fukkodai</div>
              <div style={{ opacity: 0.9 }}>811-0121 福岡県糟屋郡新宮町美咲2-7-1</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", fontSize: 12 }}>
          <a href="#" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "rgba(255,255,255,0.15)", borderRadius: 999 }}>
            <span>📞</span> 059-4414-099
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "rgba(255,255,255,0.15)", borderRadius: 999 }}>
            <span>📘</span> HSC Station
          </a>
        </div>

        <div style={{ textAlign: "center", fontSize: 10, opacity: 0.65, marginTop: 4 }}>
          © 2026 HSC Station · Cho bữa cơm Việt thêm ngon
        </div>
      </div>
    </footer>
  );
}

function HSCDrawer({ open, onClose, layout, onLayoutChange, categories, activeCategory, onCategorySelect, onHome, headerColor = "#2e7d32" }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100,
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 200ms",
        }}
      />
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "82%", maxWidth: 320, zIndex: 101,
          backgroundColor: "#f7f7f7",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1)",
          display: "flex", flexDirection: "column",
          boxShadow: "-2px 0 20px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ background: headerColor, color: "white", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "white", padding: 3 }}>
            <img src="assets/logo-hsc-station.png" alt="HSC" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>HSC STATION</div>
            <div style={{ fontSize: 10, opacity: 0.85 }}>Cho bữa cơm Việt thêm ngon</div>
          </div>
          <button onClick={onClose} aria-label="Đóng" style={{ background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 6, width: 32, height: 32, color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ background: "white", borderRadius: 10, padding: "10px 12px", marginBottom: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#333", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <span>👁️</span> Hiển thị sản phẩm
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { id: "grid", label: "Dạng ô" },
                  { id: "list", label: "Dạng dòng", sub: "(Dành cho kết nối chậm)" },
                ].map((opt) => (
                  <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: layout === opt.id ? "#e8f5e9" : "transparent", cursor: "pointer", border: `1px solid ${layout === opt.id ? headerColor : "transparent"}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${layout === opt.id ? headerColor : "#bbb"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {layout === opt.id && <div style={{ width: 10, height: 10, borderRadius: 999, background: headerColor }} />}
                    </div>
                    <div style={{ fontSize: 13, color: "#333" }}>
                      {opt.label}
                      {opt.sub && <div style={{ fontSize: 10, color: "#888", marginTop: 1 }}>{opt.sub}</div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => { onHome(); onClose(); }}
              style={{ width: "100%", background: "white", border: "none", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.04)", color: headerColor, fontWeight: 700, fontSize: 14 }}
            >
              <span style={{ fontSize: 18 }}>🏠</span>
              <span style={{ textDecoration: "underline" }}>Trang chủ</span>
            </button>

            <div style={{ background: "white", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "12px 14px", color: headerColor, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #f0f0f0" }}>
                <span>🏷️</span> Danh mục
              </div>
              <div>
                {categories.map((cat, i) => (
                  <button
                    key={cat.id}
                    onClick={() => { onCategorySelect(cat); onClose(); }}
                    style={{
                      width: "100%", textAlign: "left", border: "none", background: activeCategory === cat.id ? "#e8f5e9" : "white",
                      padding: "12px 14px", fontSize: 13, color: activeCategory === cat.id ? headerColor : "#333",
                      fontWeight: activeCategory === cat.id ? 700 : 500, cursor: "pointer",
                      borderBottom: i === categories.length - 1 ? "none" : "1px solid #f5f5f5",
                      display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { HSCHeader, HSCFooter, HSCDrawer });
