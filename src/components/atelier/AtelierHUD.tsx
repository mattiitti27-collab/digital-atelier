import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useAtelierStore, Phase, MaterialType,
  templates, palettes, typographyPairs, animationStyles, layoutStyles,
} from '@/stores/atelierStore';

const allPhases: { id: Phase; label: string; number: string }[] = [
  { id: 'identity', label: 'IDENTITÀ', number: '01' },
  { id: 'template', label: 'ARCHETIPO', number: '02' },
  { id: 'essence', label: 'ESSENZA', number: '03' },
  { id: 'palette', label: 'CROMIA', number: '04' },
  { id: 'typography', label: 'TIPOGRAFIA', number: '05' },
  { id: 'animations', label: 'DINAMICA', number: '06' },
  { id: 'layout', label: 'ARCHITETTURA', number: '07' },
  { id: 'arsenal', label: 'ARSENALE', number: '08' },
  { id: 'signature', label: 'FIRMA', number: '09' },
];

const materials: { id: MaterialType; name: string; subtitle: string; color: string }[] = [
  { id: 'obsidian', name: 'OSSIDIANA LIQUIDA', subtitle: 'Nero assoluto · Riflessi fluidi', color: '#1a1a1a' },
  { id: 'frosted-glass', name: 'VETRO SMERIGLIATO', subtitle: 'Trasparenza · Rifrazione', color: '#e0e0e0' },
  { id: 'gold', name: 'ORO CHAMPAGNE', subtitle: 'Metallo caldo · Riflessi nobili', color: '#d4a574' },
  { id: 'marble', name: 'MARMO DI CARRARA', subtitle: 'Venature classiche · Eternità', color: '#f5f5f0' },
  { id: 'carbon', name: 'FIBRA DI CARBONIO', subtitle: 'Trama tecnica · Performance', color: '#2a2a2a' },
  { id: 'holographic', name: 'OLOGRAFICO', subtitle: 'Iridescenza · Futuro', color: '#c084fc' },
];

const phaseTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function ProceedButton({ onClick, label = 'PROCEDI →' }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      onClick={onClick}
      className="text-[10px] tracking-[0.3em] uppercase py-3 px-6 transition-all duration-300"
      style={{ border: '1px solid rgba(212,165,116,0.3)', color: '#d4a574' }}
      whileHover={{ background: 'rgba(212,165,116,0.08)' }}
    >
      {label}
    </motion.button>
  );
}

function PhaseHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
        FASE {number} — {title}
      </p>
      {subtitle && (
        <h2 className="text-xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          {subtitle}
        </h2>
      )}
    </div>
  );
}

// ─── PHASE 1: IDENTITY ───
function IdentityPhase() {
  const brandName = useAtelierStore((s) => s.brandName);
  const tagline = useAtelierStore((s) => s.tagline);
  const setBrandName = useAtelierStore((s) => s.setBrandName);
  const setTagline = useAtelierStore((s) => s.setTagline);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="01" title="L'IDENTITÀ" subtitle="Incidi il tuo Brand" />

      <div className="relative">
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
          NOME DEL BRAND
        </label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value.toUpperCase())}
          placeholder="IL TUO BRAND"
          maxLength={20}
          className="w-full bg-transparent text-white text-lg tracking-[0.15em] py-3 border-b outline-none transition-all duration-500 placeholder:text-white/10"
          style={{ borderColor: brandName ? '#d4a574' : 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-display)' }}
        />
        <span className="absolute right-0 bottom-4 text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
          {brandName.length}/20
        </span>
      </div>

      <div>
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
          TAGLINE / CLAIM
        </label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="La tua promessa in una frase..."
          maxLength={60}
          className="w-full bg-transparent text-white text-sm py-3 border-b outline-none transition-all duration-500 placeholder:text-white/10"
          style={{ borderColor: tagline ? '#d4a574' : 'rgba(255,255,255,0.08)' }}
        />
      </div>

      {brandName.length >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ProceedButton onClick={() => setPhase('template')} />
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── PHASE 2: TEMPLATE ───
function TemplatePhase() {
  const template = useAtelierStore((s) => s.template);
  const setTemplate = useAtelierStore((s) => s.setTemplate);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="02" title="L'ARCHETIPO" subtitle="Scegli il tuo Template" />

      <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {templates.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => { setTemplate(t.id); setExpanded(expanded === t.id ? null : t.id); }}
            className="w-full text-left p-3 rounded-lg transition-all duration-500"
            style={{
              background: template === t.id ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${template === t.id ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            {/* Preview bar */}
            <div className="w-full h-1 rounded-full mb-2 opacity-60" style={{ background: t.previewGradient }} />

            <p className="text-[10px] tracking-[0.2em] mb-1" style={{ color: template === t.id ? '#d4a574' : 'rgba(255,255,255,0.4)' }}>
              {t.name}
            </p>

            <AnimatePresence>
              {expanded === t.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-[8px] leading-relaxed mt-1 mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {t.description}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {t.tags.map((tag) => (
                      <span key={tag} className="text-[7px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(212,165,116,0.1)', color: '#d4a574', border: '1px solid rgba(212,165,116,0.15)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {template && <ProceedButton onClick={() => setPhase('essence')} />}
    </motion.div>
  );
}

// ─── PHASE 3: ESSENCE (Materials) ───
function EssencePhase() {
  const material = useAtelierStore((s) => s.material);
  const setMaterial = useAtelierStore((s) => s.setMaterial);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="03" title="L'ESSENZA" subtitle="Materiali dell'Anima" />

      <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {materials.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMaterial(m.id)}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-500 text-left"
            style={{
              background: material === m.id ? 'rgba(255,255,255,0.04)' : 'transparent',
              border: `1px solid ${material === m.id ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="w-7 h-7 rounded-full border border-white/10 shrink-0"
              style={{
                background: m.id === 'obsidian' ? 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)'
                  : m.id === 'frosted-glass' ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))'
                  : m.id === 'gold' ? 'radial-gradient(circle at 30% 30%, #e8c99b, #8a6d3b)'
                  : m.id === 'marble' ? 'radial-gradient(circle at 30% 30%, #f5f5f0, #d0d0c8)'
                  : m.id === 'carbon' ? 'repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 4px)'
                  : 'linear-gradient(135deg, #ff6b6b, #c084fc, #60a5fa)',
                boxShadow: material === m.id ? `0 0 15px ${m.color}33` : 'none',
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] tracking-[0.2em]" style={{ color: material === m.id ? '#ffffff' : 'rgba(255,255,255,0.35)' }}>{m.name}</p>
              <p className="text-[7px] tracking-[0.15em] mt-0.5" style={{ color: 'rgba(255,255,255,0.18)' }}>{m.subtitle}</p>
            </div>
            {material === m.id && <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4a574' }} layoutId="matInd" />}
          </motion.button>
        ))}
      </div>

      <ProceedButton onClick={() => setPhase('palette')} />
    </motion.div>
  );
}

// ─── PHASE 4: PALETTE ───
function PalettePhase() {
  const palette = useAtelierStore((s) => s.palette);
  const setPalette = useAtelierStore((s) => s.setPalette);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="04" title="LA CROMIA" subtitle="Palette Cromatica" />

      <div className="space-y-1.5 max-h-[310px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {palettes.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => setPalette(p.id)}
            className="w-full p-3 rounded-lg text-left transition-all duration-500"
            style={{
              background: palette === p.id ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${palette === p.id ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              {/* Color swatches */}
              <div className="flex gap-0.5">
                {p.colors.map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-sm border border-white/5" style={{ background: c }} />
                ))}
              </div>
              {palette === p.id && <motion.div className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: '#d4a574' }} layoutId="palInd" />}
            </div>
            <p className="text-[9px] tracking-[0.2em]" style={{ color: palette === p.id ? '#ffffff' : 'rgba(255,255,255,0.35)' }}>{p.name}</p>
            <p className="text-[7px] tracking-[0.1em] mt-0.5" style={{ color: 'rgba(255,255,255,0.18)' }}>{p.mood}</p>
          </motion.button>
        ))}
      </div>

      <ProceedButton onClick={() => setPhase('typography')} />
    </motion.div>
  );
}

// ─── PHASE 5: TYPOGRAPHY ───
function TypographyPhase() {
  const typography = useAtelierStore((s) => s.typography);
  const setTypography = useAtelierStore((s) => s.setTypography);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="05" title="LA TIPOGRAFIA" subtitle="Voce Visiva" />

      <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {typographyPairs.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => setTypography(t.id)}
            className="w-full p-3 rounded-lg text-left transition-all duration-500"
            style={{
              background: typography === t.id ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${typography === t.id ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-sm mb-0.5 tracking-wide" style={{ fontFamily: t.displayFont, color: typography === t.id ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
              {t.display}
            </p>
            <p className="text-[8px] tracking-[0.1em]" style={{ fontFamily: t.bodyFont, color: 'rgba(255,255,255,0.2)' }}>
              {t.body} — {t.preview}
            </p>
          </motion.button>
        ))}
      </div>

      <ProceedButton onClick={() => setPhase('animations')} />
    </motion.div>
  );
}

// ─── PHASE 6: ANIMATIONS ───
function AnimationsPhase() {
  const animationStyle = useAtelierStore((s) => s.animationStyle);
  const setAnimationStyle = useAtelierStore((s) => s.setAnimationStyle);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="06" title="LA DINAMICA" subtitle="Stile Animazione" />

      <div className="space-y-1.5 max-h-[310px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {animationStyles.map((a) => (
          <motion.button
            key={a.id}
            onClick={() => setAnimationStyle(a.id)}
            className="w-full p-3 rounded-lg text-left transition-all duration-500"
            style={{
              background: animationStyle === a.id ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${animationStyle === a.id ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-[9px] tracking-[0.2em]" style={{ color: animationStyle === a.id ? '#d4a574' : 'rgba(255,255,255,0.35)' }}>
                {a.name}
              </p>
              <span className="text-[7px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)' }}>
                {a.intensity}
              </span>
            </div>
            <p className="text-[7px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.18)' }}>
              {a.description}
            </p>
          </motion.button>
        ))}
      </div>

      <ProceedButton onClick={() => setPhase('layout')} />
    </motion.div>
  );
}

// ─── PHASE 7: LAYOUT ───
function LayoutPhase() {
  const layoutStyle = useAtelierStore((s) => s.layoutStyle);
  const setLayoutStyle = useAtelierStore((s) => s.setLayoutStyle);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="07" title="L'ARCHITETTURA" subtitle="Struttura Spaziale" />

      <div className="space-y-1.5 max-h-[310px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {layoutStyles.map((l) => (
          <motion.button
            key={l.id}
            onClick={() => setLayoutStyle(l.id)}
            className="w-full p-3 rounded-lg text-left transition-all duration-500"
            style={{
              background: layoutStyle === l.id ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${layoutStyle === l.id ? 'rgba(212,165,116,0.25)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-3">
              {/* Column preview icon */}
              <div className="w-8 h-6 rounded border border-white/10 flex items-center justify-center gap-[1px] shrink-0" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {l.columns === '1' && <div className="w-5 h-3 rounded-sm" style={{ background: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.15)' }} />}
                {l.columns === '2' && <>{[0, 1].map((i) => <div key={i} className="w-2 h-3 rounded-sm" style={{ background: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.15)' }} />)}</>}
                {l.columns === '2-3' && <>{[0, 1, 2].map((i) => <div key={i} className="h-3 rounded-sm" style={{ width: i === 0 ? 3 : 2, background: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.15)' }} />)}</>}
                {l.columns === '3-4' && <>{[0, 1, 2, 3].map((i) => <div key={i} className="w-1 h-3 rounded-sm" style={{ background: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.15)' }} />)}</>}
                {l.columns === 'H' && <div className="w-5 h-2 rounded-sm" style={{ background: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.15)' }} />}
                {l.columns === '∞' && <span className="text-[8px]" style={{ color: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.2)' }}>∞</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] tracking-[0.2em]" style={{ color: layoutStyle === l.id ? '#d4a574' : 'rgba(255,255,255,0.35)' }}>{l.name}</p>
                <p className="text-[7px] leading-relaxed mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.18)' }}>{l.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <ProceedButton onClick={() => setPhase('arsenal')} />
    </motion.div>
  );
}

// ─── PHASE 8: ARSENAL (Modules) ───
function ArsenalPhase() {
  const modules = useAtelierStore((s) => s.modules);
  const toggleModule = useAtelierStore((s) => s.toggleModule);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const activeCount = modules.filter((m) => m.active).length;
  const totalPrice = modules.filter((m) => m.active).reduce((sum, m) => sum + m.price, 0);

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="08" title="L'ARSENALE" subtitle="Moduli d'Élite" />

      <div className="flex items-center justify-between">
        <p className="text-[9px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {activeCount} ATTIVATI
        </p>
        <p className="text-[9px] font-mono" style={{ color: '#d4a574' }}>
          +€{totalPrice.toLocaleString()}
        </p>
      </div>

      <div className="space-y-1 max-h-[260px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {modules.map((mod) => (
          <motion.button
            key={mod.id}
            onClick={() => toggleModule(mod.id)}
            className="w-full flex items-center gap-2.5 p-2.5 rounded-lg transition-all duration-500 text-left"
            style={{
              background: mod.active ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${mod.active ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: mod.active ? 'rgba(212,165,116,0.08)' : 'rgba(255,255,255,0.02)' }}
          >
            <div className="w-7 h-3.5 rounded-full relative shrink-0 transition-colors duration-500"
              style={{ background: mod.active ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.06)', border: `1px solid ${mod.active ? 'rgba(212,165,116,0.5)' : 'rgba(255,255,255,0.1)'}` }}>
              <motion.div className="absolute top-0.5 w-2 h-2 rounded-full"
                style={{ background: mod.active ? '#d4a574' : 'rgba(255,255,255,0.2)' }}
                animate={{ left: mod.active ? '12px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[8px] tracking-[0.15em]" style={{ color: mod.active ? '#d4a574' : 'rgba(255,255,255,0.3)' }}>{mod.name}</p>
                <span className="text-[7px] font-mono shrink-0 ml-2" style={{ color: 'rgba(255,255,255,0.2)' }}>€{mod.price.toLocaleString()}</span>
              </div>
              <p className="text-[7px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.12)' }}>{mod.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <ProceedButton onClick={() => setPhase('budget')} />
    </motion.div>
  );
}

// ─── PHASE 9: BUDGET ───
function BudgetPhase() {
  const budgetRange = useAtelierStore((s) => s.budgetRange);
  const setBudgetRange = useAtelierStore((s) => s.setBudgetRange);
  const timeline = useAtelierStore((s) => s.timeline);
  const setTimeline = useAtelierStore((s) => s.setTimeline);
  const notes = useAtelierStore((s) => s.notes);
  const setNotes = useAtelierStore((s) => s.setNotes);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const modules = useAtelierStore((s) => s.modules);

  const modulesTotal = modules.filter((m) => m.active).reduce((sum, m) => sum + m.price, 0);
  const basePrice = 5000;
  const estimatedTotal = basePrice + modulesTotal;

  const timelines = [
    { id: '4-weeks', label: '4 SETTIMANE', desc: 'Fast-track · Priorità assoluta' },
    { id: '8-weeks', label: '8 SETTIMANE', desc: 'Standard · Ritmo ottimale' },
    { id: '12-weeks', label: '12+ SETTIMANE', desc: 'Meticoloso · Perfezione artigianale' },
  ];

  return (
    <motion.div className="space-y-5" {...phaseTransition}>
      <PhaseHeader number="09" title="L'INVESTIMENTO" subtitle="Budget & Tempistiche" />

      {/* Price estimate HUD */}
      <div className="p-3 rounded-xl" style={{ background: 'rgba(212,165,116,0.04)', border: '1px solid rgba(212,165,116,0.1)' }}>
        <div className="flex items-end justify-between mb-2">
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>STIMA PROGETTO</span>
          <span className="text-xl font-light" style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}>
            €{estimatedTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-[7px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <span>Base: €{basePrice.toLocaleString()}</span>
          <span>Moduli: +€{modulesTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Budget slider */}
      <div>
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
          IL TUO BUDGET — €{budgetRange.toLocaleString()}
        </label>
        <input
          type="range"
          min={5000}
          max={50000}
          step={500}
          value={budgetRange}
          onChange={(e) => setBudgetRange(Number(e.target.value))}
          className="w-full h-[2px] appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #d4a574 ${((budgetRange - 5000) / 45000) * 100}%, rgba(255,255,255,0.08) ${((budgetRange - 5000) / 45000) * 100}%)`,
            accentColor: '#d4a574',
          }}
        />
        <div className="flex justify-between text-[7px] mt-1" style={{ color: 'rgba(255,255,255,0.15)' }}>
          <span>€5.000</span>
          <span>€50.000</span>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>TEMPISTICA</label>
        <div className="space-y-1">
          {timelines.map((t) => (
            <motion.button
              key={t.id}
              onClick={() => setTimeline(t.id)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all"
              style={{
                background: timeline === t.id ? 'rgba(212,165,116,0.06)' : 'transparent',
                border: `1px solid ${timeline === t.id ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.04)'}`,
              }}
            >
              <div>
                <p className="text-[9px] tracking-[0.15em]" style={{ color: timeline === t.id ? '#d4a574' : 'rgba(255,255,255,0.3)' }}>{t.label}</p>
                <p className="text-[7px] mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>{t.desc}</p>
              </div>
              {timeline === t.id && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4a574' }} />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>NOTE AGGIUNTIVE</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Descrivi la tua visione, riferimenti, ispirazioni..."
          rows={3}
          className="w-full bg-transparent text-white text-[10px] p-3 rounded-lg border outline-none resize-none placeholder:text-white/10"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        />
      </div>

      <ProceedButton onClick={() => setPhase('signature')} />
    </motion.div>
  );
}

// ─── PHASE 10: SIGNATURE ───
function SignaturePhase() {
  const setPhase = useAtelierStore((s) => s.setPhase);
  const brandName = useAtelierStore((s) => s.brandName);
  const tagline = useAtelierStore((s) => s.tagline);
  const template = useAtelierStore((s) => s.template);
  const material = useAtelierStore((s) => s.material);
  const palette = useAtelierStore((s) => s.palette);
  const typography = useAtelierStore((s) => s.typography);
  const animationStyle = useAtelierStore((s) => s.animationStyle);
  const layoutStyle = useAtelierStore((s) => s.layoutStyle);
  const modules = useAtelierStore((s) => s.modules);
  const budgetRange = useAtelierStore((s) => s.budgetRange);
  const timeline = useAtelierStore((s) => s.timeline);
  const activeModules = modules.filter((m) => m.active);
  const modulesTotal = activeModules.reduce((sum, m) => sum + m.price, 0);

  const templateLabel = templates.find((t) => t.id === template)?.name || '—';
  const materialLabel = materials.find((m) => m.id === material)?.name || '—';
  const paletteLabel = palettes.find((p) => p.id === palette)?.name || '—';
  const typoLabel = typographyPairs.find((t) => t.id === typography)?.display || '—';
  const animLabel = animationStyles.find((a) => a.id === animationStyle)?.name || '—';
  const layoutLabel = layoutStyles.find((l) => l.id === layoutStyle)?.name || '—';

  const rows = [
    ['BRAND', brandName || '—'],
    ['TAGLINE', tagline || '—'],
    ['ARCHETIPO', templateLabel],
    ['MATERIALE', materialLabel],
    ['CROMIA', paletteLabel],
    ['TIPOGRAFIA', typoLabel],
    ['ANIMAZIONE', animLabel],
    ['LAYOUT', layoutLabel],
    ['BUDGET', `€${budgetRange.toLocaleString()}`],
    ['TIMELINE', timeline ? timeline.replace('-', ' ').toUpperCase() : '—'],
  ];

  return (
    <motion.div className="space-y-4" {...phaseTransition}>
      <PhaseHeader number="10" title="LA FIRMA" subtitle="Riepilogo Creazione" />

      <div className="p-3 rounded-xl space-y-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        {rows.map(([label, value], i) => (
          <div key={i}>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</span>
              <span className="text-[9px] tracking-[0.1em] text-right max-w-[55%] truncate">{value}</span>
            </div>
            {i < rows.length - 1 && <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.03)' }} />}
          </div>
        ))}
      </div>

      {/* Modules summary */}
      {activeModules.length > 0 && (
        <div className="p-3 rounded-xl" style={{ background: 'rgba(212,165,116,0.03)', border: '1px solid rgba(212,165,116,0.08)' }}>
          <p className="text-[7px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            MODULI ({activeModules.length}) — +€{modulesTotal.toLocaleString()}
          </p>
          {activeModules.map((m) => (
            <p key={m.id} className="text-[8px] tracking-[0.1em] py-0.5" style={{ color: '#d4a574' }}>◆ {m.name}</p>
          ))}
        </div>
      )}

      <motion.button
        onClick={() => setPhase('finale')}
        className="w-full py-4 text-[11px] tracking-[0.3em] uppercase rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))',
          border: '1px solid rgba(212,165,116,0.3)',
          color: '#d4a574',
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        INIZIALIZZA PROGETTO
      </motion.button>
    </motion.div>
  );
}

// ─── FINALE OVERLAY ───
function FinaleOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.95) 0%, rgba(0,0,0,0.98) 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="text-center max-w-lg mx-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="w-16 h-[1px] mx-auto mb-10"
          style={{ background: 'linear-gradient(90deg, transparent, #d4a574, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
        />
        <h2 className="text-3xl md:text-4xl font-light mb-6 leading-[1.2]" style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}>
          La Tua Visione è Pronta.
        </h2>
        <p className="text-[11px] tracking-[0.1em] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Un'opera di questo calibro richiede una direzione artistica dedicata.
        </p>
        <p className="text-sm mb-10" style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}>
          Il valore di partenza per le nostre creazioni su misura è di <strong>5.000€</strong>.
        </p>
        <motion.a
          href="mailto:info@intinisystem.digital?subject=Richiesta%20Accesso%20-%20L'Atelier"
          className="inline-block px-10 py-4 text-[10px] tracking-[0.35em] uppercase transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.05))',
            border: '1px solid rgba(212,165,116,0.4)',
            color: '#d4a574',
          }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(212,165,116,0.15)' }}
          whileTap={{ scale: 0.98 }}
        >
          RICHIEDI ACCESSO E CALL PRIVATA
        </motion.a>
        <p className="text-[8px] tracking-[0.2em] uppercase mt-8" style={{ color: 'rgba(255,255,255,0.12)' }}>
          INTINI SYSTEM DIGITAL · MONACO · DUBAI · MILANO
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── NAV ───
function PhaseNav() {
  const phase = useAtelierStore((s) => s.phase);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <div className="fixed top-6 left-6 z-30">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: '#d4a574' }}>
        INTINI SYSTEM DIGITAL
      </p>
      <div className="space-y-0.5">
        {allPhases.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => setPhase(p.id)}
            className="flex items-center gap-2 py-1 w-full text-left"
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span className="text-[8px] font-mono w-4 transition-colors duration-300"
              style={{ color: phase === p.id ? '#d4a574' : 'rgba(255,255,255,0.12)' }}>
              {p.number}
            </span>
            <span className="text-[8px] tracking-[0.2em] transition-colors duration-300"
              style={{ color: phase === p.id ? '#ffffff' : 'rgba(255,255,255,0.15)' }}>
              {p.label}
            </span>
            {phase === p.id && (
              <motion.div className="h-[1px] flex-1 ml-1" style={{ background: 'linear-gradient(90deg, #d4a574, transparent)' }} layoutId="phaseIndicator" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN HUD ───
interface AtelierHUDProps {
  locked?: boolean;
  onUnlockClick?: () => void;
}

const AtelierHUD = ({ locked = false, onUnlockClick }: AtelierHUDProps) => {
  const phase = useAtelierStore((s) => s.phase);

  if (phase === 'finale' && !locked) return <FinaleOverlay />;

  return (
    <>
      <PhaseNav />

      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 w-[330px]"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative p-5 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10,10,10,0.75)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            maxHeight: '80vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {locked && (
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl cursor-pointer"
              style={{ background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onUnlockClick}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="1" className="mb-3 opacity-60">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#d4a574' }}>SBLOCCA PER CONFIGURARE</p>
              <p className="text-[8px] tracking-[0.15em] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>€9,90 · ACCESSO SINGOLO</p>
            </motion.div>
          )}

          <div style={{ filter: locked ? 'blur(2px)' : 'none', pointerEvents: locked ? 'none' : 'auto' }}>
            <AnimatePresence mode="wait">
              {phase === 'identity' && <IdentityPhase key="identity" />}
              {phase === 'template' && <TemplatePhase key="template" />}
              {phase === 'essence' && <EssencePhase key="essence" />}
              {phase === 'palette' && <PalettePhase key="palette" />}
              {phase === 'typography' && <TypographyPhase key="typography" />}
              {phase === 'animations' && <AnimationsPhase key="animations" />}
              {phase === 'layout' && <LayoutPhase key="layout" />}
              {phase === 'arsenal' && <ArsenalPhase key="arsenal" />}
              {phase === 'budget' && <BudgetPhase key="budget" />}
              {phase === 'signature' && <SignaturePhase key="signature" />}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom HUD */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: locked ? '#666' : '#d4a574' }} />
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {locked ? 'MODALITÀ ANTEPRIMA' : 'CANVAS ATTIVO'}
          </span>
        </div>
        <div className="w-[1px] h-3" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>INTINI.SYS.DIG v4.0</span>
      </div>
    </>
  );
};

export default AtelierHUD;
