import { motion } from 'framer-motion';

const FOOTER_HEIGHT = 420;

const FooterReveal = () => {
  return (
    <>
      {/* Spacer so content scrolls past and reveals the fixed footer */}
      <div style={{ height: FOOTER_HEIGHT }} />

      <footer
        className="fixed bottom-0 left-0 right-0 z-0 flex flex-col items-center justify-center px-6 py-12 md:py-16"
        style={{
          height: FOOTER_HEIGHT,
          background: '#050505',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Brand */}
        <motion.p
          className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-10"
          style={{ color: '#d4a574', fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          INTINIWEBATELIER
        </motion.p>

        {/* Main info grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center md:text-left max-w-3xl w-full mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Column 1 — About */}
          <div>
            <p
              className="text-[8px] tracking-[0.25em] uppercase mb-3"
              style={{ color: 'rgba(212,165,116,0.6)' }}
            >
              Sartoria Digitale
            </p>
            <p
              className="text-[9px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}
            >
              Siti web su misura e di altissimo lusso per clienti esclusivi.
            </p>
          </div>

          {/* Column 2 — Contatti */}
          <div>
            <p
              className="text-[8px] tracking-[0.25em] uppercase mb-3"
              style={{ color: 'rgba(212,165,116,0.6)' }}
            >
              Contatti
            </p>
            <p className="text-[9px] leading-loose" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <a href="https://wa.me/393345415707" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a574] transition-colors">
                +39 334 541 5707 · WhatsApp
              </a>
              <br />
              Torino, Italia
            </p>
          </div>

          {/* Column 3 — Dati Legali */}
          <div>
            <p
              className="text-[8px] tracking-[0.25em] uppercase mb-3"
              style={{ color: 'rgba(212,165,116,0.6)' }}
            >
              Dati Legali
            </p>
            <p className="text-[9px] leading-loose" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Mattia Intini
              <br />
              Libero Professionista
              <br />
              P.IVA 13419790012
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="pt-6 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
            INTINIWEBATELIER · © {new Date().getFullYear()} · ALL RIGHTS RESERVED
          </p>
        </motion.div>
      </footer>
    </>
  );
};

export default FooterReveal;
