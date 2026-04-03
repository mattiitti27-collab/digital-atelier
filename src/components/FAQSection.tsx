import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    id: '1',
    question: 'Come riuscite a mantenere standard così elevati a prezzi così competitivi?',
    answer: 'Intini Web Atelier opera con una struttura snella e dinamica. Grazie al regime fiscale agevolato e all\'assenza di pesanti costi d\'intermediazione tipici delle grandi agenzie, possiamo trasferire questo vantaggio economico direttamente al cliente, garantendo eccellenza tecnica senza compromessi.',
  },
  {
    id: '2',
    question: 'Perché scegliere un talento emergente rispetto a un\'agenzia tradizionale?',
    answer: 'Scegliere la nostra realtà significa investire in dedizione assoluta e innovazione pura. Essendo una realtà giovane e in forte ascesa, ogni progetto è per noi una sfida verso la perfezione, gestita con una cura del dettaglio che solo un rapporto diretto e personale può offrire.',
  },
  {
    id: '3',
    question: 'Qual è il processo di realizzazione di un sito d\'élite?',
    answer: 'Ogni ecosistema digitale nasce da una fase di analisi stilistica e tecnica, seguita dalla modellazione delle interazioni 3D e dall\'ottimizzazione del codice per performance fulminee su ogni dispositivo.',
  },
  {
    id: '4',
    question: 'Fornite supporto continuo dopo il lancio?',
    answer: 'Certamente. Il lancio è solo l\'inizio. Offriamo consulenza e assistenza tecnica dedicata per assicurarci che la vostra presenza digitale evolva insieme ai vostri obiettivi di business.',
  },
];

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

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
          {FAQS.map((faq) => (
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
