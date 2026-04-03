import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('faq')
      .select('id, question, answer')
      .eq('is_active', true)
      .order('position')
      .then(({ data }) => {
        if (data) setFaqs(data);
      });
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="py-20 px-6" style={{ background: '#050505' }}>
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl text-center mb-12"
          style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}
        >
          Domande Frequenti
        </h2>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm" style={{ color: openId === faq.id ? '#d4a574' : 'rgba(255,255,255,0.6)' }}>
                  {faq.question}
                </span>
                <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
