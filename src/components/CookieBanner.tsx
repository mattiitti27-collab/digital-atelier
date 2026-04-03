import { useState, useEffect } from 'react';

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
      className="fixed bottom-6 left-6 z-[100] max-w-sm rounded-2xl border border-border p-5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Utilizziamo cookie per migliorare la tua esperienza. Scegli le tue preferenze.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => accept('all')}
          className="flex-1 rounded-lg bg-foreground text-background text-xs font-medium py-2.5 px-4 transition-opacity hover:opacity-80"
        >
          Accetta
        </button>
        <button
          onClick={() => accept('necessary')}
          className="flex-1 rounded-lg border border-border text-foreground text-xs font-medium py-2.5 px-4 transition-opacity hover:opacity-80"
        >
          Necessari
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
