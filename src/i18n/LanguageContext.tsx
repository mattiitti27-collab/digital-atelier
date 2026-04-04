import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type Lang } from './translations';

type Translations = (typeof translations)[Lang];

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  langChosen: boolean;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('iwa_lang') : null;
  const [lang, setLangState] = useState<Lang>((stored as Lang) || 'en');
  const [langChosen, setLangChosen] = useState(!!stored);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setLangChosen(true);
    localStorage.setItem('iwa_lang', l);
  }, []);

  const toggleLang = useCallback(() => {
    const langs: Lang[] = ['it', 'en', 'fr', 'de'];
    const idx = langs.indexOf(lang);
    const next = langs[(idx + 1) % langs.length];
    setLang(next);
  }, [lang, setLang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, langChosen, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
