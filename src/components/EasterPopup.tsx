import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EasterPopupProps {
  onGetDiscount: () => void;
}

const EasterPopup = ({ onGetDiscount }: EasterPopupProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('easter26_v2_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('easter26_v2_dismissed', '1');
  };

  const handleGetDiscount = () => {
    close();
    setTimeout(() => onGetDiscount(), 300);
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
          {/* Overlay - clicking closes */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={close}
          />
          {/* Popup - rimpicciolito */}
          <motion.div
            className="relative z-10 w-full max-w-xs p-5 md:p-6 rounded-xl text-center"
            style={{
              background: 'linear-gradient(145deg, rgba(15,12,8,0.98), rgba(10,8,5,0.98))',
              border: '1px solid rgba(212,165,116,0.2)',
              boxShadow: '0 0 60px rgba(212,165,116,0.08)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-3 right-3 min-h-[40px] min-w-[40px] flex items-center justify-center"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <X size={14} />
            </button>

            <div className="text-3xl mb-3">🐣</div>

            <h2
              className="text-lg md:text-xl mb-2"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: '#d4a574' }}
            >
              Sorpresa di Pasqua!
            </h2>

            <p
              className="text-xs md:text-sm mb-2 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
            >
              Festeggia il nostro lancio con un <strong style={{ color: '#d4a574' }}>Bonus esclusivo</strong>.
            </p>

            <div
              className="inline-block px-4 py-2 rounded-lg mb-3"
              style={{
                background: 'rgba(212,165,116,0.08)',
                border: '1px solid rgba(212,165,116,0.25)',
              }}
            >
              <p className="text-[9px] tracking-[0.3em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Usa il codice
              </p>
              <p className="text-xl font-bold tracking-widest" style={{ color: '#d4a574', fontFamily: 'var(--font-display)' }}>
                EASTER26
              </p>
            </div>

            <p
              className="text-[10px] mb-4 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}
            >
              per ottenere un ulteriore <strong style={{ color: '#d4a574' }}>25% di sconto</strong> sui nostri servizi.
              <br />
              <span className="text-[9px] tracking-wider uppercase mt-1 inline-block" style={{ color: 'rgba(212,165,116,0.5)' }}>
                Offerta valida fino all'8 Aprile 2026
              </span>
            </p>

            {/* CTA button - funzionante */}
            <motion.button
              onClick={handleGetDiscount}
              className="w-full py-3 rounded-full text-[9px] tracking-[0.25em] uppercase min-h-[44px]"
              style={{
                background: 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.08))',
                border: '1px solid rgba(212,165,116,0.5)',
                color: '#d4a574',
                boxShadow: '0 0 30px rgba(212,165,116,0.1)',
                cursor: 'pointer',
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
