import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAtelierStore } from '@/stores/atelierStore';
import { supabase } from '@/integrations/supabase/client';
import AtelierPaywall from '@/components/atelier/AtelierPaywall';
import AtelierScene from '@/components/atelier/AtelierScene';
import AtelierHUD from '@/components/atelier/AtelierHUD';

const Atelier = () => {
  const [searchParams] = useSearchParams();
  const hasAccess = useAtelierStore((s) => s.hasAccess);
  const setHasAccess = useAtelierStore((s) => s.setHasAccess);
  const setEmail = useAtelierStore((s) => s.setEmail);

  // Check access from URL params (after Stripe redirect)
  useEffect(() => {
    const access = searchParams.get('access');
    const email = searchParams.get('email');

    if (access === 'granted' && email) {
      // Verify in DB
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
      <AnimatePresence mode="wait">
        {!hasAccess ? (
          <AtelierPaywall key="paywall" />
        ) : (
          <>
            <AtelierScene key="scene" />
            <AtelierHUD key="hud" />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Atelier;
