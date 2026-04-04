import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = (type: 'all' | 'necessary') => {
    localStorage.setItem('cookie-consent', type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed z-[90] max-w-xs rounded-xl p-5"
      style={{
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        left: 'calc(24px + env(safe-area-inset-left, 0px))',
        background: 'rgba(10,10,10,0.7)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        className="text-[11px] leading-[1.7] mb-3"
        style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
      >
        Utilizziamo cookie tecnici per il funzionamento del sito. Per maggiori informazioni consulta la nostra{' '}
        <Link to="/cookie-policy" className="underline" style={{ color: '#d4a574' }}>Cookie Policy</Link>.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => accept('all')}
          className="flex-1 rounded-md text-[10px] tracking-[0.15em] uppercase py-2.5 px-4 transition-all duration-300"
          style={{
            background: 'transparent',
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.1)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
          }}
        >
          Accetta Tutti
        </button>
        <button
          onClick={() => accept('necessary')}
          className="flex-1 rounded-md text-[10px] tracking-[0.15em] uppercase py-2.5 px-4 transition-all duration-300"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
          }}
        >
          Solo Necessari
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
