import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';
import { useLanguage } from '@/i18n/LanguageContext';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Inserisci il tuo nome').max(100),
  email: z.string().trim().email('Email non valida').max(255),
  message: z.string().trim().min(1, 'Inserisci un messaggio').max(1000),
});

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ name, email, message });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('contact_submissions').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error(t.contact.error);
      return;
    }
    toast.success(t.contact.success);
    setName(''); setEmail(''); setMessage('');
    onClose();
  };

  const inputStyle = { border: '1px solid rgba(255,255,255,0.1)', background: 'transparent' };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }} onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-md p-6 md:p-8 rounded-2xl"
            style={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <X size={16} />
            </button>

            <h2 className="text-xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}>{t.contact.title}</h2>
            <p className="text-[9px] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {t.contact.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[8px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.contact.nameLabel}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.contact.namePlaceholder} className="w-full text-white text-sm py-3 px-3 rounded-lg outline-none min-h-[44px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.contact.emailLabel}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.contact.emailPlaceholder} className="w-full text-white text-sm py-3 px-3 rounded-lg outline-none min-h-[44px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[8px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{t.contact.messageLabel}</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.contact.messagePlaceholder} rows={4} className="w-full text-white text-sm py-3 px-3 rounded-lg outline-none resize-none" style={inputStyle} />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg text-[10px] tracking-[0.3em] uppercase min-h-[48px]"
                style={{ background: 'linear-gradient(135deg, rgba(212,165,116,0.2), rgba(212,165,116,0.08))', border: '1px solid rgba(212,165,116,0.4)', color: '#d4a574' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? t.contact.sending : t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
