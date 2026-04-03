import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const FooterReveal = () => {
  const { t } = useLanguage();

  return (
    <footer
      className="relative z-10 flex flex-col items-center justify-center px-4 md:px-16 py-16 md:py-28"
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <motion.p
        className="text-sm md:text-lg tracking-[0.45em] uppercase mb-10 md:mb-14"
        style={{ color: '#d4a574', fontFamily: 'var(--font-display)', fontWeight: 400 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        INTINI WEB ATELIER
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center max-w-3xl w-full mb-10 md:mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <div>
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4" style={{ color: 'rgba(212,165,116,0.55)' }}>
            {t.footer.sartoria}
          </p>
          <p className="text-xs md:text-sm leading-[1.8]" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            {t.footer.sartoriaDesc}
            <br />
            <a
              href="mailto:intiniwebatelier@gmail.com"
              className="transition-colors duration-300 mt-2 inline-block"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#d4a574')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              intiniwebatelier@gmail.com
            </a>
          </p>
        </div>

        <div>
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4" style={{ color: 'rgba(212,165,116,0.55)' }}>
            {t.footer.contatti}
          </p>
          <p className="text-xs md:text-sm leading-[2]" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
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

        <div>
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4" style={{ color: 'rgba(212,165,116,0.55)' }}>
            {t.footer.datiLegali}
          </p>
          <p className="text-xs md:text-sm leading-[2]" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            Mattia Intini
            <br />
            {t.footer.libero}
            <br />
            P.IVA 13419790012
          </p>
        </div>
      </motion.div>

      <div className="w-full max-w-3xl mx-auto" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      <motion.div
        className="pt-6 md:pt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
          © {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterReveal;
