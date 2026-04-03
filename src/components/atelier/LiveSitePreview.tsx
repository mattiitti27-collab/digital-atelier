import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import {
  useAtelierStore,
  templates, palettes, typographyPairs,
} from '@/stores/atelierStore';

// ─── Template Layouts ───
type TemplateProps = { colors: string[]; typo: { displayFont: string; bodyFont: string }; brandName: string };

const templateLayouts: Record<string, React.FC<TemplateProps>> = {
  maison: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid ${colors[2]}22` }}>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <div className="flex gap-4">
          {['Portfolio', 'About', 'Contact'].map((l) => (
            <span key={l} className="text-[8px] tracking-[0.15em] uppercase" style={{ color: colors[3] }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center px-10">
        <div className="flex-1">
          <div className="w-20 h-[2px] mb-4" style={{ background: colors[3] }} />
          <p className="text-[22px] leading-tight mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>Crafting Digital<br/>Masterpieces</p>
          <p className="text-[9px] leading-relaxed max-w-[200px]" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Un portfolio narrativo con scroll immersivo e galleria full-bleed</p>
          <div className="mt-4 px-5 py-2 inline-block rounded-sm text-[7px] tracking-[0.2em] uppercase" style={{ background: colors[3], color: colors[0] }}>Esplora</div>
        </div>
        <div className="w-[140px] h-[160px] rounded-xl" style={{ background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})` }} />
      </div>
      <div className="flex gap-3 px-8 pb-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-16 rounded-lg" style={{ background: `${colors[i + 1]}30` }} />
        ))}
      </div>
    </div>
  ),
  vitrine: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid ${colors[2]}22` }}>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <div className="flex gap-4">
          {['Shop', 'Collection', 'Cart'].map((l) => (
            <span key={l} className="text-[8px] tracking-[0.15em] uppercase" style={{ color: colors[3] }}>{l}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-[120px] h-[120px] rounded-full mx-auto mb-5" style={{ background: `radial-gradient(circle, ${colors[2]}, ${colors[1]})`, boxShadow: `0 15px 40px ${colors[3]}20` }} />
          <p className="text-[18px] tracking-[0.2em] uppercase mb-2" style={{ color: colors[4], fontFamily: typo.displayFont }}>Product Name</p>
          <p className="text-[8px]" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Luxury Edition · Limited</p>
          <div className="mt-4 px-6 py-2 inline-block rounded-full text-[7px] tracking-[0.2em] uppercase" style={{ border: `1px solid ${colors[3]}`, color: colors[3] }}>Add to Cart</div>
        </div>
      </div>
    </div>
  ),
  salon: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="px-6 py-3">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <p className="text-[24px] leading-tight mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>Let's Create<br/>Something Bold.</p>
        <p className="text-[9px] max-w-[220px] mb-6" style={{ color: colors[3], fontFamily: typo.bodyFont }}>Landing page conversazionale con form immersivo</p>
        <div className="w-[180px] rounded-xl p-4" style={{ background: `${colors[1]}40`, border: `1px solid ${colors[2]}30` }}>
          <div className="h-3 rounded mb-2" style={{ background: `${colors[2]}30` }} />
          <div className="h-3 rounded mb-2" style={{ background: `${colors[2]}30` }} />
          <div className="h-3 rounded" style={{ background: colors[3] }} />
        </div>
      </div>
    </div>
  ),
  galleria: ({ colors, typo, brandName }) => (
    <div className="h-full flex flex-col" style={{ background: colors[0] }}>
      <div className="px-6 py-3 flex justify-between items-center">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        <span className="text-[8px]" style={{ color: colors[3] }}>01 / 04</span>
      </div>
      <div className="flex-1 flex items-center gap-3 px-6 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[80%] rounded-xl shrink-0" style={{ width: i === 1 ? 140 : 80, background: `linear-gradient(180deg, ${colors[i % 4 + 1]}60, ${colors[(i + 1) % 4 + 1]}30)`, opacity: i === 1 ? 1 : 0.5 }} />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pb-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-6 h-[2px] rounded" style={{ background: i === 1 ? colors[3] : `${colors[3]}30` }} />
        ))}
      </div>
    </div>
  ),
  attico: ({ colors, typo, brandName }) => (
    <div className="h-full flex" style={{ background: colors[0] }}>
      <div className="w-[80px] py-5 px-3 flex flex-col gap-2" style={{ background: `${colors[1]}80`, borderRight: `1px solid ${colors[2]}20` }}>
        <span className="text-[8px] tracking-[0.2em] uppercase mb-3" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
        {['Dashboard', 'Progetti', 'Team', 'Settings'].map((l, i) => (
          <div key={l} className="px-2 py-1 rounded text-[7px]" style={{ background: i === 0 ? `${colors[3]}20` : 'transparent', color: i === 0 ? colors[3] : `${colors[4]}40` }}>{l}</div>
        ))}
      </div>
      <div className="flex-1 p-6">
        <p className="text-[12px] mb-4" style={{ color: colors[4], fontFamily: typo.displayFont }}>Dashboard</p>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-lg" style={{ background: `${colors[i % 3 + 1]}20`, border: `1px solid ${colors[2]}15` }} />
          ))}
        </div>
      </div>
    </div>
  ),
  bespoke: ({ colors, typo, brandName }) => (
    <div className="h-full relative overflow-hidden" style={{ background: colors[0] }}>
      <div className="absolute top-4 left-6">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: colors[4], fontFamily: typo.displayFont }}>{brandName}</span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[32px] leading-none" style={{ color: colors[4], fontFamily: typo.displayFont }}>∞</p>
        <p className="text-[8px] tracking-[0.3em] uppercase mt-3" style={{ color: colors[3] }}>Su Misura</p>
      </div>
      <div className="absolute w-[80px] h-[80px] rounded-full top-6 right-10 opacity-20" style={{ background: `radial-gradient(circle, ${colors[3]}, transparent)` }} />
      <div className="absolute w-[50px] h-[50px] rounded-xl bottom-8 left-12 rotate-12 opacity-15" style={{ background: colors[2] }} />
    </div>
  ),
};

const defaultLayout = templateLayouts.maison;

const LiveSitePreview = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const brandName = useAtelierStore((s) => s.brandName) || 'YOUR BRAND';
  const template = useAtelierStore((s) => s.template) || 'maison';
  const palette = useAtelierStore((s) => s.palette);
  const typography = useAtelierStore((s) => s.typography);

  const colors = palettes.find((p) => p.id === palette)?.colors || palettes[0].colors;
  const typo = typographyPairs.find((t) => t.id === typography) || typographyPairs[0];
  const templateName = templates.find((t) => t.id === template)?.name || 'LA MAISON';
  const TemplateComponent = templateLayouts[template] || defaultLayout;

  const isDesktop = viewMode === 'desktop';
  const frameWidth = isDesktop ? 680 : 280;
  const frameHeight = isDesktop ? 420 : 500;

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
      {/* Viewport toggle */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setViewMode('desktop')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[8px] tracking-[0.2em] uppercase transition-all"
          style={{
            background: isDesktop ? 'rgba(212,165,116,0.12)' : 'transparent',
            border: `1px solid ${isDesktop ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.06)'}`,
            color: isDesktop ? '#d4a574' : 'rgba(255,255,255,0.25)',
          }}
          whileHover={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <Monitor size={12} />
          Desktop
        </motion.button>
        <motion.button
          onClick={() => setViewMode('mobile')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[8px] tracking-[0.2em] uppercase transition-all"
          style={{
            background: !isDesktop ? 'rgba(212,165,116,0.12)' : 'transparent',
            border: `1px solid ${!isDesktop ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.06)'}`,
            color: !isDesktop ? '#d4a574' : 'rgba(255,255,255,0.25)',
          }}
          whileHover={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <Smartphone size={12} />
          Mobile
        </motion.button>

        <div className="w-[1px] h-4 mx-1" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <motion.span
          key={templateName}
          className="text-[8px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(212,165,116,0.5)' }}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {templateName}
        </motion.span>
      </div>

      {/* Browser frame */}
      <motion.div
        className="relative"
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Glow */}
        <div className="absolute -inset-4 rounded-3xl opacity-15 blur-2xl pointer-events-none" style={{ background: `linear-gradient(135deg, ${colors[3]}, transparent, ${colors[2]})` }} />

        <motion.div
          className="rounded-xl overflow-hidden"
          layout
          style={{
            width: frameWidth,
            height: frameHeight,
            background: '#111',
            padding: 3,
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex gap-1">
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-[7px] h-[7px] rounded-full" style={{ background: '#28c840' }} />
            </div>
            <div className="flex-1 mx-3 h-[16px] rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <span className="text-[7px] tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                www.{brandName.toLowerCase().replace(/\s/g, '')}.com
              </span>
            </div>
          </div>

          {/* Site content with transition */}
          <div className="rounded-b-lg overflow-hidden" style={{ height: 'calc(100% - 30px)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${template}-${palette}-${typography}`}
                className="h-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TemplateComponent colors={colors} typo={{ displayFont: typo.displayFont, bodyFont: typo.bodyFont }} brandName={brandName} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stand */}
        <div className="mx-auto mt-1" style={{ width: isDesktop ? 80 : 40, height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', borderRadius: 2 }} />
      </motion.div>
    </div>
  );
};

export default LiveSitePreview;
