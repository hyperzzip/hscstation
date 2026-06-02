// Header + Search + SideMenu
const { useState, useEffect, useRef } = React;

function Header({ title, showBack, onBack, onMenu, onSearch, query, setQuery, theme }) {
  return (
    <div className="hsc-header" style={{ background: theme.primary }}>
      <div className="hsc-header-row">
        {showBack ? (
          <button className="hsc-icon-btn" onClick={onBack} aria-label="Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        ) : (
          <div className="hsc-logo-wrap">
            <img src="assets/logo-hsc-station.png" alt="HSC" className="hsc-logo-img"/>
            <div className="hsc-logo-text">
              <div className="hsc-logo-name">HSC Station</div>
              <div className="hsc-logo-tag">Cho bữa cơm Việt thêm ngon</div>
            </div>
          </div>
        )}
        <div className="hsc-header-spacer"/>
        <button className="hsc-icon-btn" onClick={onMenu} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      {showBack && (
        <div className="hsc-header-title">{title}</div>
      )}
      <div className="hsc-search-wrap">
        <svg className="hsc-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          className="hsc-search-input"
          placeholder="Tìm kiếm sản phẩm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="hsc-search-btn" style={{ background: theme.primaryDark }} onClick={onSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>
    </div>
  );
}

function SideMenu({ open, onClose, onPickCategory, currentCategory, viewMode, setViewMode, theme, onHome }) {
  return (
    <>
      <div className={`hsc-overlay ${open ? "open" : ""}`} onClick={onClose}/>
      <aside className={`hsc-sidemenu ${open ? "open" : ""}`}>
        <div className="hsc-sm-section">
          <div className="hsc-sm-header" style={{ borderColor: theme.primary, color: theme.primary }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Hiển thị sản phẩm
          </div>
          <button className={`hsc-sm-radio ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
            <span className={`hsc-radio-dot ${viewMode === "grid" ? "on" : ""}`} style={{ borderColor: theme.primary, background: viewMode === "grid" ? theme.primary : "transparent" }}/>
            <span>Dạng ô</span>
          </button>
          <button className={`hsc-sm-radio ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
            <span className={`hsc-radio-dot ${viewMode === "list" ? "on" : ""}`} style={{ borderColor: theme.primary, background: viewMode === "list" ? theme.primary : "transparent" }}/>
            <span>Dạng dòng <em>(Dành cho kết nối chậm)</em></span>
          </button>
        </div>

        <button className="hsc-sm-link" style={{ borderColor: theme.primary, color: theme.primary }} onClick={onHome}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          <span style={{ textDecoration: "underline" }}>Trang chủ</span>
        </button>

        <div className="hsc-sm-cat-header" style={{ borderColor: theme.primary, color: theme.primary }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          Danh mục
        </div>
        <div className="hsc-sm-categories">
          {window.HSC_DATA.CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`hsc-sm-cat ${currentCategory === cat.id ? "active" : ""}`}
              style={{ color: theme.primary }}
              onClick={() => onPickCategory(cat.id)}
            >
              <span className="hsc-cat-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

window.Header = Header;
window.SideMenu = SideMenu;
