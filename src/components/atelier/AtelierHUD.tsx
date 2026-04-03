import { motion, AnimatePresence } from 'framer-motion';
import { useAtelierStore, Phase, MaterialType } from '@/stores/atelierStore';

const phases: { id: Phase; label: string; number: string }[] = [
  { id: 'identity', label: 'IDENTITÀ', number: '01' },
  { id: 'essence', label: 'ESSENZA', number: '02' },
  { id: 'arsenal', label: 'ARSENALE', number: '03' },
  { id: 'signature', label: 'FIRMA', number: '04' },
];

const materials: { id: MaterialType; name: string; subtitle: string; color: string }[] = [
  { id: 'obsidian', name: 'OSSIDIANA LIQUIDA', subtitle: 'Nero assoluto · Riflessi fluidi', color: '#1a1a1a' },
  { id: 'frosted-glass', name: 'VETRO SMERIGLIATO', subtitle: 'Trasparenza · Rifrazione', color: '#e0e0e0' },
  { id: 'gold', name: 'ORO CHAMPAGNE', subtitle: 'Metallo caldo · Riflessi nobili', color: '#d4a574' },
];

function PhaseNav() {
  const phase = useAtelierStore((s) => s.phase);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <div className="fixed top-8 left-8 z-30">
      <p className="text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: '#d4a574' }}>
        INTINI SYSTEM DIGITAL
      </p>
      <div className="space-y-1">
        {phases.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => setPhase(p.id)}
            className="flex items-center gap-3 group py-1.5 w-full text-left"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span
              className="text-[9px] font-mono transition-colors duration-300"
              style={{ color: phase === p.id ? '#d4a574' : 'rgba(255,255,255,0.15)' }}
            >
              {p.number}
            </span>
            <span
              className="text-[10px] tracking-[0.25em] transition-colors duration-300"
              style={{ color: phase === p.id ? '#ffffff' : 'rgba(255,255,255,0.2)' }}
            >
              {p.label}
            </span>
            {phase === p.id && (
              <motion.div
                className="h-[1px] flex-1 ml-2"
                style={{ background: 'linear-gradient(90deg, #d4a574, transparent)' }}
                layoutId="phaseIndicator"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function IdentityPhase() {
  const brandName = useAtelierStore((s) => s.brandName);
  const setBrandName = useAtelierStore((s) => s.setBrandName);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          FASE 01 — L'IDENTITÀ
        </p>
        <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          Incidi il tuo Brand
        </h2>
      </div>

      <div className="relative">
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value.toUpperCase())}
          placeholder="IL TUO BRAND"
          maxLength={20}
          className="w-full bg-transparent text-white text-lg tracking-[0.15em] py-4 border-b outline-none transition-all duration-500 placeholder:text-white/10"
          style={{
            borderColor: brandName ? '#d4a574' : 'rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-display)',
          }}
        />
        <span className="absolute right-0 bottom-5 text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
          {brandName.length}/20
        </span>
      </div>

      {brandName.length >= 2 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setPhase('essence')}
          className="text-[10px] tracking-[0.3em] uppercase py-3 px-6 transition-all duration-300"
          style={{
            border: '1px solid rgba(212,165,116,0.3)',
            color: '#d4a574',
          }}
          whileHover={{ background: 'rgba(212,165,116,0.08)' }}
        >
          PROCEDI →
        </motion.button>
      )}
    </motion.div>
  );
}

function EssencePhase() {
  const material = useAtelierStore((s) => s.material);
  const setMaterial = useAtelierStore((s) => s.setMaterial);
  const setPhase = useAtelierStore((s) => s.setPhase);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          FASE 02 — L'ESSENZA
        </p>
        <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          Materiali dell'Anima
        </h2>
      </div>

      <div className="space-y-2">
        {materials.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMaterial(m.id)}
            className="w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-500 text-left"
            style={{
              background: material === m.id ? 'rgba(255,255,255,0.04)' : 'transparent',
              border: `1px solid ${material === m.id ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div
              className="w-8 h-8 rounded-full border border-white/10 shrink-0"
              style={{
                background: m.id === 'obsidian'
                  ? 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)'
                  : m.id === 'frosted-glass'
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))'
                  : 'radial-gradient(circle at 30% 30%, #e8c99b, #8a6d3b)',
                boxShadow: material === m.id ? `0 0 20px ${m.color}33` : 'none',
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.25em]" style={{ color: material === m.id ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>
                {m.name}
              </p>
              <p className="text-[8px] tracking-[0.15em] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {m.subtitle}
              </p>
            </div>
            {material === m.id && (
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#d4a574' }}
                layoutId="materialIndicator"
              />
            )}
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={() => setPhase('arsenal')}
        className="text-[10px] tracking-[0.3em] uppercase py-3 px-6 transition-all duration-300"
        style={{ border: '1px solid rgba(212,165,116,0.3)', color: '#d4a574' }}
        whileHover={{ background: 'rgba(212,165,116,0.08)' }}
      >
        PROCEDI →
      </motion.button>
    </motion.div>
  );
}

function ArsenalPhase() {
  const modules = useAtelierStore((s) => s.modules);
  const toggleModule = useAtelierStore((s) => s.toggleModule);
  const setPhase = useAtelierStore((s) => s.setPhase);
  const activeCount = modules.filter((m) => m.active).length;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          FASE 03 — L'ARSENALE
        </p>
        <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          Moduli d'Élite
        </h2>
        <p className="text-[9px] tracking-[0.15em] mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {activeCount} MODULI ATTIVATI
        </p>
      </div>

      <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
        {modules.map((mod) => (
          <motion.button
            key={mod.id}
            onClick={() => toggleModule(mod.id)}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-500 text-left"
            style={{
              background: mod.active ? 'rgba(212,165,116,0.06)' : 'transparent',
              border: `1px solid ${mod.active ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.04)'}`,
            }}
            whileHover={{ background: mod.active ? 'rgba(212,165,116,0.08)' : 'rgba(255,255,255,0.02)' }}
          >
            {/* Toggle indicator */}
            <div
              className="w-8 h-4 rounded-full relative shrink-0 transition-colors duration-500"
              style={{
                background: mod.active ? 'rgba(212,165,116,0.3)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${mod.active ? 'rgba(212,165,116,0.5)' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              <motion.div
                className="absolute top-0.5 w-2.5 h-2.5 rounded-full"
                style={{ background: mod.active ? '#d4a574' : 'rgba(255,255,255,0.2)' }}
                animate={{ left: mod.active ? '14px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[9px] tracking-[0.2em]" style={{ color: mod.active ? '#d4a574' : 'rgba(255,255,255,0.35)' }}>
                {mod.name}
              </p>
              <p className="text-[8px] tracking-[0.1em] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.15)' }}>
                {mod.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={() => setPhase('signature')}
        className="text-[10px] tracking-[0.3em] uppercase py-3 px-6 transition-all duration-300"
        style={{ border: '1px solid rgba(212,165,116,0.3)', color: '#d4a574' }}
        whileHover={{ background: 'rgba(212,165,116,0.08)' }}
      >
        PROCEDI →
      </motion.button>
    </motion.div>
  );
}

function SignaturePhase() {
  const setPhase = useAtelierStore((s) => s.setPhase);
  const brandName = useAtelierStore((s) => s.brandName);
  const material = useAtelierStore((s) => s.material);
  const modules = useAtelierStore((s) => s.modules);
  const activeModules = modules.filter((m) => m.active);

  const materialLabel = materials.find((m) => m.id === material)?.name || '';

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          FASE 04 — LA FIRMA
        </p>
        <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          Riepilogo Creazione
        </h2>
      </div>

      {/* Summary */}
      <div className="space-y-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex justify-between items-center">
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>BRAND</span>
          <span className="text-xs tracking-[0.1em]" style={{ fontFamily: 'var(--font-display)' }}>{brandName || '—'}</span>
        </div>
        <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="flex justify-between items-center">
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>MATERIALE</span>
          <span className="text-[10px] tracking-[0.15em]">{materialLabel}</span>
        </div>
        <div className="h-[1px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div>
          <span className="text-[8px] tracking-[0.3em] uppercase block mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            MODULI ({activeModules.length})
          </span>
          {activeModules.length > 0 ? (
            <div className="space-y-1">
              {activeModules.map((m) => (
                <p key={m.id} className="text-[9px] tracking-[0.15em]" style={{ color: '#d4a574' }}>
                  ◆ {m.name}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>Nessun modulo selezionato</p>
          )}
        </div>
      </div>

      <motion.button
        onClick={() => setPhase('finale')}
        className="w-full relative py-4 text-[11px] tracking-[0.3em] uppercase overflow-hidden rounded-lg"
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

        <h2
          className="text-3xl md:text-4xl font-light mb-6 leading-[1.2]"
          style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}
        >
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

const AtelierHUD = () => {
  const phase = useAtelierStore((s) => s.phase);

  if (phase === 'finale') return <FinaleOverlay />;

  return (
    <>
      <PhaseNav />

      {/* Right panel - Configuration Console */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-30 w-[340px]"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(10,10,10,0.7)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          <AnimatePresence mode="wait">
            {phase === 'identity' && <IdentityPhase key="identity" />}
            {phase === 'essence' && <EssencePhase key="essence" />}
            {phase === 'arsenal' && <ArsenalPhase key="arsenal" />}
            {phase === 'signature' && <SignaturePhase key="signature" />}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom HUD bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#d4a574' }} />
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            CANVAS ATTIVO
          </span>
        </div>
        <div className="w-[1px] h-3" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-[8px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
          INTINI.SYS.DIG v4.0
        </span>
      </div>
    </>
  );
};

export default AtelierHUD;
