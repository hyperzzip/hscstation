// HSC Station — Language Context
// Provides: LanguageProvider, useLanguage()
// Must be loaded BEFORE components.jsx and app.jsx

const { useState, useContext, createContext } = React;

const _defaultLang = { lang: 'vi', t: k => k, changeLang: () => {}, getCatName: c => c.name };
const LanguageContext = createContext(_defaultLang);

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('hsc-lang') || 'vi'
  );

  // t(key) or t(key, ...args) — args forwarded if translation value is a function
  const t = (key, ...args) => {
    const T = window.HSC_TRANSLATIONS;
    if (!T) return key;
    const dict = T[lang] || T.vi;
    const val = dict[key] !== undefined ? dict[key] : (T.vi[key] !== undefined ? T.vi[key] : key);
    return typeof val === 'function' ? val(...args) : val;
  };

  // Returns category name in current language
  const getCatName = (cat) => {
    const T = window.HSC_TRANSLATIONS;
    if (!T) return cat.name;
    const cats = (T[lang] || T.vi).categories || {};
    return cats[cat.id] || cat.name;
  };

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('hsc-lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang, getCatName }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

Object.assign(window, { LanguageProvider, useLanguage });
