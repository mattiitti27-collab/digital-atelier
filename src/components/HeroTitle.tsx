import { useLanguage } from '@/i18n/LanguageContext';

interface HeroTitleProps {
  visible: boolean;
  onContact?: () => void;
}

const HeroTitle = ({ visible, onContact }: HeroTitleProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto">
      <h1
        className="text-foreground leading-[1.1] mb-6 md:mb-8"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 7vw, 6rem)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.2s ease 0.3s',
        }}
      >
        {t.hero.title}
      </h1>

      <p
        className="text-[10px] md:text-base tracking-widest uppercase mt-2 max-w-lg mx-auto text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.35)',
          lineHeight: '1.8',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.2s ease 0.8s',
        }}
      >
        {t.hero.subtitle}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 md:mt-8">
        <button
          onClick={() => {
            const footer = document.querySelector('#contatti');
            if (footer) {
              const y = footer.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: y, behavior: 'smooth' });
              setTimeout(() => onContact?.(), 1200);
            } else {
              onContact?.();
            }
          }}
          className="w-fit px-3 md:px-4 py-2 md:py-2.5 text-[8px] md:text-[10px] tracking-[0.15em] uppercase transition-all duration-500 rounded-full min-h-[44px]"
          style={{
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            background: 'rgba(212,165,116,0.04)',
            backdropFilter: 'blur(10px)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 1.2s, background 0.3s, border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.12)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.04)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {t.hero.cta1}
        </button>
        <button
          onClick={() => {
            const el = document.querySelector('#portfolio');
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="w-fit px-3 md:px-4 py-2 md:py-2.5 text-[8px] md:text-[10px] tracking-[0.15em] uppercase transition-all duration-500 rounded-full min-h-[44px]"
          style={{
            border: '1px solid rgba(212,165,116,0.35)',
            color: '#d4a574',
            background: 'rgba(212,165,116,0.04)',
            backdropFilter: 'blur(10px)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease 1.5s, background 0.3s, border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.12)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.6)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212,165,116,0.04)';
            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {t.hero.cta2}
        </button>
      </div>
    </div>
  );
};

export default HeroTitle;
