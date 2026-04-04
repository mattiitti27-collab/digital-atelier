import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EasterPopupProps {
  onGetDiscount: () => void;
}

const EasterPopup = ({ onGetDiscount }: EasterPopupProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('easter26_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('easter26_dismissed', '1');
  };

  const handleGetDiscount = () => {
    close();
    onGetDiscount();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={close}
          />
          <motion.div
            className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(145deg, rgba(15,12,8,0.98), rgba(10,8,5,0.98))',
              border: '1px solid rgba(212,165,116,0.2)',
              boxShadow: '0 0 80px rgba(212,165,116,0.08)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <X size={16} />
            </button>

            <div className="text-5xl mb-5">🐣</div>

            <h2
              className="text-xl md:text-2xl mb-3"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#d4a574' }}
            >
              Sorpresa di Pasqua!
            </h2>

            <p
              className="text-sm md:text-base mb-3 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
            >
              Festeggia il nostro lancio con un <strong style={{ color: '#d4a574' }}>Bonus esclusivo</strong>.
            </p>

            <div
              className="inline-block px-5 py-2.5 rounded-lg mb-4"
              style={{
                background: 'rgba(212,165,116,0.08)',
                border: '1px solid rgba(212,165,116,0.25)',
              }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Usa il codice
              </p>
              <p className="text-2xl font-bold tracking-widest" style={{ color: '#d4a574', fontFamily: 'var(--font-display)' }}>
                EASTER26
              </p>
            </div>

            <p
              className="text-xs mb-6 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}
            >
              quando ci contatti per ottenere un ulteriore <strong style={{ color: '#d4a574' }}>25% di sconto</strong> sui nostri servizi.
              <br />
              <span className="text-[10px] tracking-wider uppercase mt-2 inline-block" style={{ color: 'rgba(212,165,116,0.5)' }}>
                Offerta valida solo fino all'8 Aprile 2026
              </span>
            </p>

            <motion.button
              onClick={handleGetDiscount}
              className="w-full py-4 rounded-full text-[10px] tracking-[0.3em] uppercase min-h-[48px]"
              style={{
                background: 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.08))',
                border: '1px solid rgba(212,165,116,0.5)',
                color: '#d4a574',
                boxShadow: '0 0 30px rgba(212,165,116,0.1)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(212,165,116,0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              Ottieni lo sconto
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterPopup;
