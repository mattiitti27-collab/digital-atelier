import { motion } from 'framer-motion';

const FOOTER_HEIGHT = 520;

const FooterReveal = () => {
  return (
    <>
      {/* Spacer so content scrolls past and reveals the fixed footer */}
      <div style={{ height: FOOTER_HEIGHT }} />

      <footer
        className="fixed bottom-0 left-0 right-0 z-0 flex flex-col items-center justify-center px-8 md:px-16"
        style={{
          height: FOOTER_HEIGHT,
          background: '#050505',
        }}
      >
        {/* Brand */}
        <motion.p
          className="text-base md:text-lg tracking-[0.45em] uppercase mb-14"
          style={{ color: '#d4a574', fontFamily: 'var(--font-display)', fontWeight: 400 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          INTINIWEBATELIER
        </motion.p>

        {/* Main info grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center max-w-4xl w-full mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Column 1 — About */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(212,165,116,0.55)' }}
            >
              Sartoria Digitale
            </p>
            <p
              className="text-sm leading-[1.8]"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Siti web su misura e di altissimo lusso per clienti esclusivi.
            </p>
          </div>

          {/* Column 2 — Contatti */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(212,165,116,0.55)' }}
            >
              Contatti
            </p>
            <p
              className="text-sm leading-[2]"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              <a
                href="https://wa.me/393345415707"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#d4a574')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                +39 334 541 5707 · WhatsApp
              </a>
              <br />
              Torino, Italia
            </p>
          </div>

          {/* Column 3 — Dati Legali */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(212,165,116,0.55)' }}
            >
              Dati Legali
            </p>
            <p
              className="text-sm leading-[2]"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Mattia Intini
              <br />
              Libero Professionista
              <br />
              P.IVA 13419790012
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom bar */}
        <motion.div
          className="pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            © {new Date().getFullYear()} INTINIWEBATELIER · All Rights Reserved
          </p>
        </motion.div>
      </footer>
    </>
  );
};

export default FooterReveal;
