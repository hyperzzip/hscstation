// Header, search bar, footer cho HSC Station
const { useState, useEffect, useRef } = React;

function Header({ title, onBack, onMenu, accentBg, accentFg }) {
  return (
    <div className="hsc-header" style={{ background: accentBg, color: accentFg }}>
      <div className="hsc-header-row">
        {onBack ? (
          <button className="hsc-icon-btn" onClick={onBack} aria-label="Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        ) : (
          <div className="hsc-brand">
            <img src="assets/logo-hsc-station.png" alt="HSC" />
            <span>HSC Station</span>
          </div>
        )}
        <h1 className="hsc-header-title">{title}</h1>
        <button className="hsc-icon-btn" onClick={onMenu} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder = "Tìm kiếm sản phẩm" }) {
  return (
    <div className="hsc-search">
      <div className="hsc-search-inner">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <button aria-label="Search" className="hsc-search-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7"/>
            <path d="M21 21l-4.3-4.3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function Footer({ accentBg, accentFg }) {
  return (
    <div className="hsc-footer" style={{ background: accentBg, color: accentFg }}>
      <div className="hsc-footer-logo">
        <img src="assets/mascot-cogai.png" alt="HSC mascot" />
      </div>
      <div className="hsc-footer-info">
        <div className="hsc-footer-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>〒811-0101 福岡県糟屋郡新宮町原上1720-2</span>
        </div>
        <div className="hsc-footer-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>092-XXXX-XXX</span>
        </div>
        <div className="hsc-footer-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
          <a href="#" target="_blank" rel="noopener">HSC Station</a>
        </div>
      </div>
    </div>
  );
}

window.HSCHeader = Header;
window.HSCSearchBar = SearchBar;
window.HSCFooter = Footer;
