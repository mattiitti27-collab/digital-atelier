import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, t, toggleLang } = useLanguage();

  const NAV_ITEMS = [
    { label: t.nav.chiSiamo, href: '#chi-siamo' },
    { label: t.nav.lavori, href: '#portfolio' },
    { label: t.nav.atelier, href: '/atelier', isRoute: true },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contatti, href: '#contatti' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (item: typeof NAV_ITEMS[0]) => {
    setMobileOpen(false);
    if ('isRoute' in item && item.isRoute) {
      navigate(item.href);
    } else {
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          height: '180%',
          background: scrolled
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 22%, rgba(0,0,0,0.52) 46%, rgba(0,0,0,0.28) 68%, rgba(0,0,0,0.08) 88%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.05) 85%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 md:px-16 py-4 md:py-6">
        <button
          onClick={() => {
            const el = document.querySelector('#hero');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase"
          style={{ color: '#d4a574', fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          INTINI WEB ATELIER
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="text-xs tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4a574')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={toggleLang}
            className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full transition-all duration-300"
            style={{
              border: '1px solid rgba(212,165,116,0.3)',
              color: '#d4a574',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,165,116,0.08)';
              e.currentTarget.style.borderColor = 'rgba(212,165,116,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)';
            }}
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
            style={{
              border: '1px solid rgba(212,165,116,0.3)',
              color: '#d4a574',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
          >
            {lang === 'it' ? 'EN' : 'IT'}
          </button>
          <button
            className="flex flex-col gap-[5px]"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#d4a574',
                transform: mobileOpen ? 'rotate(45deg) translateY(3px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#d4a574',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#d4a574',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-3px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center gap-8 pb-10"
            style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="text-xs tracking-[0.3em] uppercase min-h-[44px] flex items-center"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
