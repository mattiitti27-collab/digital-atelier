import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtelierStore } from '@/stores/atelierStore';
import { supabase } from '@/integrations/supabase/client';
import AtelierScene from '@/components/atelier/AtelierScene';
import AtelierHUD from '@/components/atelier/AtelierHUD';
import AtelierPaywall from '@/components/atelier/AtelierPaywall';
import LiveSitePreview from '@/components/atelier/LiveSitePreview';

const Atelier = () => {
  const [searchParams] = useSearchParams();
  const hasAccess = useAtelierStore((s) => s.hasAccess);
  const setHasAccess = useAtelierStore((s) => s.setHasAccess);
  const setEmail = useAtelierStore((s) => s.setEmail);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const access = searchParams.get('access');
    const email = searchParams.get('email');
    if (access === 'granted' && email) {
      supabase
        .from('atelier_access')
        .select('id')
        .eq('email', email)
        .limit(1)
        .then(({ data }) => {
          if (data && data.length > 0) {
            setHasAccess(true);
            setEmail(email);
          }
        });
    }
  }, [searchParams, setHasAccess, setEmail]);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#050505' }}>
      {/* Always show the 3D scene */}
      <AtelierScene />
      <LiveSitePreview />
      <AtelierHUD locked={false} onUnlockClick={() => setShowPaywall(true)} />

      {/* Lock overlay when no access */}
      <AnimatePresence>
        {!hasAccess && !showPaywall && (
          <motion.div
            key="lock-banner"
            className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-center pb-20 pointer-events-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setShowPaywall(true)}
              className="pointer-events-auto px-10 py-4 text-[10px] tracking-[0.35em] uppercase rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))',
                border: '1px solid rgba(212,165,116,0.4)',
                color: '#d4a574',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 60px rgba(212,165,116,0.1)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 80px rgba(212,165,116,0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              SBLOCCA L'ATELIER — €9,90
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paywall modal */}
      <AnimatePresence>
        {showPaywall && !hasAccess && (
          <motion.div
            key="paywall-overlay"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
              onClick={() => setShowPaywall(false)}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
              <AtelierPaywall />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Atelier;
