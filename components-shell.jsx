// HSC Station — main app components
// Mobile-first catalog inspired by Thái Dương Mart

const { useState, useEffect, useMemo, useRef } = React;

// ---------- Format currency JPY ----------
const fmtJPY = (n) => "¥" + Number(n || 0).toLocaleString("ja-JP");

// ---------- Header ----------
function Header({ title, onBack, onMenu, palette }) {
  return (
    <header className="hsc-header" style={{ background: palette.headerBg, color: palette.headerFg }}>
      <div className="hsc-header-row">
        {onBack ? (
          <button className="hsc-icon-btn" onClick={onBack} aria-label="Quay lại">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M14 8l-4 4 4 4" /></svg>
          </button>
        ) : (
          <div className="hsc-logo-wrap">
            <div className="hsc-logo-mark" style={{ background: palette.logoBg }}>
              <span className="hsc-logo-text">HSC</span>
            </div>
            <div className="hsc-logo-name">HSC Station</div>
          </div>
        )}
        <div className="hsc-header-title">{title}</div>
        <button className="hsc-icon-btn" onClick={onMenu} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
        </button>
      </div>
    </header>
  );
}

// ---------- Search bar ----------
function SearchBar({ value, onChange, palette }) {
  return (
    <div className="hsc-search-wrap" style={{ background: palette.headerBg }}>
      <div className="hsc-search">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="hsc-search-btn" style={{ color: palette.headerBg }} aria-label="Tìm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
        </button>
      </div>
    </div>
  );
}

// ---------- Footer ----------
function Footer({ palette }) {
  return (
    <footer className="hsc-footer" style={{ background: palette.headerBg, color: palette.headerFg }}>
      <div className="hsc-footer-inner">
        <img src="assets/mascot-cogai.png" alt="" className="hsc-footer-mascot" />
        <div className="hsc-footer-info">
          <div className="hsc-footer-title">HSC STATION</div>
          <div className="hsc-footer-sub">Cho bữa cơm Việt thêm ngon — Since 2017</div>
          <div className="hsc-footer-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z" /><circle cx="12" cy="9" r="3" /></svg>
            <span>Trụ sở: 811-0101 福岡県糟屋郡新宮町原上1720-2</span>
          </div>
          <div className="hsc-footer-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z" /><circle cx="12" cy="9" r="3" /></svg>
            <span>CN Hakozaki: 812-0053 福岡市東区箱崎2-34-20</span>
          </div>
          <div className="hsc-footer-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 22s-8-7.5-8-13a8 8 0 1 1 16 0c0 5.5-8 13-8 13z" /><circle cx="12" cy="9" r="3" /></svg>
            <span>CN Fukkodai: 811-0121 福岡県糟屋郡新宮町美咲2-7-1</span>
          </div>
          <div className="hsc-footer-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-2.9h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z" /></svg>
            <a href="#" style={{ color: palette.headerFg, textDecoration: "underline" }}>Facebook: HSC Station</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.HSC = window.HSC || {};
Object.assign(window.HSC, { fmtJPY, Header, SearchBar, Footer });
