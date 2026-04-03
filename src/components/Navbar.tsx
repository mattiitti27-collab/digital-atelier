import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'I Nostri Lavori', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contatti', href: '#contatti' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5,5,5,0.85)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-16 py-5">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="text-sm tracking-[0.4em] uppercase"
          style={{ color: '#d4a574', fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          INTINIWEBATELIER
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="text-xs tracking-[0.25em] uppercase transition-colors duration-300"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4a574')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px]"
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

      {/* Mobile menu */}
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
                onClick={() => scrollTo(item.href)}
                className="text-xs tracking-[0.3em] uppercase"
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
