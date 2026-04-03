import { motion } from 'framer-motion';
import {
  useAtelierStore,
  templates, palettes, typographyPairs, layoutStyles,
} from '@/stores/atelierStore';

const templateLayouts: Record<string, React.FC<{ colors: string[]; typo: { displayFont: string; bodyFont: string }; brandName: string }>> = {
  maison: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid ${colors[2]}22` }}>
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <div className="flex gap-3">
          {['Portfolio', 'About', 'Contact'].map((l) => (
            <span key={l} className="text-[6px] tracking-[0.15em] uppercase" style={{ color: colors[3] }}>{l}</span>
          ))}
        </div>
      </div>
      {/* Hero full-bleed */}
      <div className="flex-1 flex items-center px-8">
        <div className="flex-1">
          <div className="w-16 h-[2px] mb-3" style={{ background: colors[3] }} />
          <p className="text-[14px] leading-tight mb-2" style={{ color: colors[4], fontFamily: typo.displayFont }}>Crafting Digital<br/>Masterpieces</p>
          <p className="text-[6px] leading-relaxed max-w-[120px]" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Un portfolio narrativo con scroll immersivo e galleria full-bleed</p>
          <div className="mt-3 px-3 py-1 inline-block rounded-sm text-[5px] tracking-[0.2em] uppercase" style={{ background: colors[3], color: colors[0] }}>Esplora</div>
        </div>
        <div className="w-[80px] h-[90px] rounded-lg" style={{ background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})` }} />
      </div>
      {/* Bottom cards */}
      <div className="flex gap-2 px-6 pb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-10 rounded" style={{ background: `${colors[i + 1]}30` }} />
        ))}
      </div>
    </div>
  ),
  vitrine: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid ${colors[2]}22` }}>
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <div className="flex gap-3">
          {['Shop', 'Collection', 'Cart'].map((l) => (
            <span key={l} className="text-[6px] tracking-[0.15em] uppercase" style={{ color: colors[3] }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-[70px] h-[70px] rounded-full mx-auto mb-3" style={{ background: `radial-gradient(circle, ${colors[2]}, ${colors[1]})`, boxShadow: `0 10px 30px ${colors[3]}20` }} />
          <p className="text-[12px] tracking-[0.2em] uppercase mb-1" style={{ color: colors[4], fontFamily: typo.displayFont }}>Product Name</p>
          <p className="text-[6px]" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Luxury Edition · Limited</p>
          <div className="mt-3 px-4 py-1 inline-block rounded-full text-[5px] tracking-[0.2em] uppercase" style={{ border: `1px solid ${colors[3]}`, color: colors[3] }}>Add to Cart</div>
        </div>
      </div>
    </div>
  ),
  salon: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="px-6 py-3">
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <p className="text-[16px] leading-tight mb-2" style={{ color: colors[4], fontFamily: typo.displayFont }}>Let's Create<br/>Something Bold.</p>
        <p className="text-[6px] max-w-[140px] mb-4" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Landing page conversazionale con form immersivo e CTA magnetica</p>
        <div className="w-[120px] rounded-lg p-2" style={{ background: `${colors[1]}40`, border: `1px solid ${colors[2]}30` }}>
          <div className="h-2 rounded mb-1" style={{ background: `${colors[2]}30` }} />
          <div className="h-2 rounded mb-1" style={{ background: `${colors[2]}30` }} />
          <div className="h-2 rounded" style={{ background: colors[3] }} />
        </div>
      </div>
    </div>
  ),
  galleria: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="px-6 py-3 flex justify-between items-center">
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <span className="text-[6px]" style={{ color: colors[3] }}>01 / 04</span>
      </div>
      <div className="flex-1 flex items-center gap-2 px-4 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[80%] rounded-lg shrink-0" style={{ width: i === 1 ? 80 : 50, background: `linear-gradient(180deg, ${colors[i % 4 + 1]}60, ${colors[(i + 1) % 4 + 1]}30)`, opacity: i === 1 ? 1 : 0.5 }} />
        ))}
      </div>
      <div className="flex justify-center gap-1 pb-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-4 h-[2px] rounded" style={{ background: i === 1 ? colors[3] : `${colors[3]}30` }} />
        ))}
      </div>
    </div>
  ),
  attico: ({ colors, typo, brandName }) => (
    <div className="h-full flex" style={{ background: colors[0] }}>
      <div className="w-[60px] py-4 px-2 flex flex-col gap-2" style={{ background: `${colors[1]}80`, borderRight: `1px solid ${colors[2]}20` }}>
        <span className="text-[6px] tracking-[0.2em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <div className="flex-1 flex flex-col gap-1 mt-2">
          {['Dashboard', 'Progetti', 'Team', 'Settings'].map((l, i) => (
            <div key={l} className="px-1 py-0.5 rounded text-[5px]" style={{ background: i === 0 ? `${colors[3]}20` : 'transparent', color: i === 0 ? colors[3] : `${colors[4]}40` }}>{l}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        <p className="text-[8px] mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>Dashboard</p>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-8 rounded" style={{ background: `${colors[i % 3 + 1]}20`, border: `1px solid ${colors[2]}15` }} />
          ))}
        </div>
      </div>
    </div>
  ),
  bespoke: ({ colors, typo, brandName }) => (
    <div className="h-full relative overflow-hidden" style={{ background: colors[0] }}>
      <div className="absolute top-3 left-5">
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[18px] leading-none" style={{ color: colors[4], fontFamily: typo.displayFont }}>∞</p>
        <p className="text-[6px] tracking-[0.3em] uppercase mt-2" style={{ color: colors[3] }}>Su Misura</p>
      </div>
      <div className="absolute w-[60px] h-[60px] rounded-full top-4 right-8 opacity-20" style={{ background: `radial-gradient(circle, ${colors[3]}, transparent)` }} />
      <div className="absolute w-[40px] h-[40px] rounded-lg bottom-6 left-10 rotate-12 opacity-15" style={{ background: colors[2] }} />
    </div>
  ),
};

const defaultLayout = templateLayouts.maison;

const LiveSitePreview = () => {
  const brandName = useAtelierStore((s) => s.brandName) || 'YOUR BRAND';
  const template = useAtelierStore((s) => s.template) || 'maison';
  const palette = useAtelierStore((s) => s.palette);
  const typography = useAtelierStore((s) => s.typography);

  const colors = palettes.find((p) => p.id === palette)?.colors || palettes[0].colors;
  const typo = typographyPairs.find((t) => t.id === typography) || typographyPairs[0];
  const templateName = templates.find((t) => t.id === template)?.name || 'LA MAISON';

  const TemplateComponent = templateLayouts[template] || defaultLayout;

  return (
    <motion.div
      className="fixed left-1/2 top-1/2 -translate-x-[60%] -translate-y-1/2 z-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Device frame */}
      <div className="relative" style={{ perspective: '1200px' }}>
        <motion.div
          animate={{ rotateY: [0, 2, 0, -2, 0], rotateX: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Outer frame glow */}
          <div className="absolute -inset-2 rounded-2xl opacity-20 blur-xl" style={{ background: `linear-gradient(135deg, ${colors[3]}, transparent)` }} />
          
          {/* MacBook-style frame */}
          <div className="rounded-xl overflow-hidden" style={{
            width: 380,
            height: 240,
            background: '#111',
            padding: 3,
            boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-1">
                <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-[6px] h-[6px] rounded-full" style={{ background: '#28c840' }} />
              </div>
              <div className="flex-1 mx-2 h-[14px] rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="text-[5px] tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.25)' }}>www.{brandName.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
            </div>
            {/* Site content */}
            <div className="rounded-b-lg overflow-hidden" style={{ height: 'calc(100% - 26px)' }}>
              <TemplateComponent colors={colors} typo={{ displayFont: typo.displayFont, bodyFont: typo.bodyFont }} brandName={brandName} />
            </div>
          </div>

          {/* Stand reflection */}
          <div className="mx-auto mt-1" style={{ width: 60, height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', borderRadius: 2 }} />
        </motion.div>

        {/* Template label */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center"
          key={template}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,165,116,0.5)' }}>{templateName}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveSitePreview;
