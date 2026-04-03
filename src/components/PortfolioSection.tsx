import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import ripetiamoImg from '@/assets/projects/ripetiamo-bg.jpg';
import monacoImg from '@/assets/projects/monaco-bg.jpg';
import intiniJournalImg from '@/assets/projects/intini-journal-bg.png';
import marchettiImg from '@/assets/projects/marchetti-bg.png';
import lumiereImg from '@/assets/projects/lumiere-bg.jpg';
import yachtImg from '@/assets/projects/yacht-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  url: string;
  image: string;
  isActive: boolean;
}

const projects: Project[] = [
  {
    title: 'Ripetiamo Online',
    subtitle: 'EdTech & E-Learning Platform',
    url: 'https://www.ripetiamo.online',
    image: ripetiamoImg,
    isActive: true,
  },
  {
    title: 'Intini Journal Suite',
    subtitle: 'Professional Trading Journal',
    url: 'https://intinijournalsuite.vercel.app',
    image: intiniJournalImg,
    isActive: true,
  },
  {
    title: 'Monaco Luxury Experience',
    subtitle: 'Premium Brand Demo',
    url: 'https://intinimonacodemo.vercel.app',
    image: monacoImg,
    isActive: false,
  },
  {
    title: 'Marchetti Concessionario',
    subtitle: 'Automotive Dealership',
    url: 'https://marchetticoncessionario.vercel.app',
    image: marchettiImg,
    isActive: false,
  },
  {
    title: 'Lumière',
    subtitle: 'Luxury Wellness & Spa',
    url: 'https://lumieredemo.vercel.app',
    image: lumiereImg,
    isActive: false,
  },
  {
    title: 'Yacht Charter',
    subtitle: 'Premium Maritime Experience',
    url: 'https://yachtcharter.vercel.app',
    image: yachtImg,
    isActive: false,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  const statusLabel = project.isActive ? t.portfolio.active : t.portfolio.demo;
  const statusColor = project.isActive ? '#22c55e' : '#ef4444';

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className="group relative block overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16/10' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-[-20px] transition-transform duration-700 ease-out parallax-card-img"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.08)' : 'scale(1.02)',
        }}
      />
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.75) 100%)'
            : 'linear-gradient(180deg, rgba(5,5,5,0.15) 0%, rgba(5,5,5,0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none"
        style={{
          border: `1px solid ${hovered ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered
            ? '0 0 40px rgba(212,165,116,0.08), inset 0 0 60px rgba(212,165,116,0.03)'
            : 'none',
        }}
      />
      <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10 flex items-center gap-2">
        <span
          className="block w-2 h-2 rounded-full"
          style={{
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}, 0 0 16px ${statusColor}80`,
            animation: 'pulse-led 2s ease-in-out infinite',
          }}
        />
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
        >
          {statusLabel}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-9 z-10">
        <h3
          className="text-xl md:text-3xl lg:text-4xl mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase mb-4 md:mb-6"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(220,218,214,0.5)' }}
        >
          {project.subtitle}
        </p>
        <div
          className="transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          <span
            className="inline-block px-6 py-2.5 md:px-8 md:py-3 text-[10px] tracking-[0.3em] uppercase rounded-sm"
            style={{
              border: '1px solid rgba(212,165,116,0.4)',
              color: '#d4a574',
              background: 'rgba(212,165,116,0.06)',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {t.portfolio.cta}
          </span>
        </div>
      </div>
    </a>
  );
};

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', end: 'top 55%', scrub: 1 },
          }
        );
      }
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 },
          }
        );
        const images = cardsRef.current.querySelectorAll('.parallax-card-img');
        images.forEach((img) => {
          gsap.to(img, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-20 md:py-44 px-4 md:px-16 lg:px-24">
      <div ref={headingRef} className="max-w-5xl mx-auto text-center mb-12 md:mb-28">
        <p
          className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4 md:mb-5"
          style={{ fontFamily: 'var(--font-body)', color: 'rgba(212,165,116,0.5)' }}
        >
          {t.portfolio.label}
        </p>
        <h2
          className="text-3xl md:text-6xl lg:text-7xl mb-4 md:mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          {t.portfolio.title}
        </h2>
        <p
          className="text-xs md:text-base max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
            lineHeight: 1.8,
          }}
        >
          {t.portfolio.subtitle}
        </p>
      </div>
      <div
        ref={cardsRef}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
      <style>{`
        @keyframes pulse-led {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection;
