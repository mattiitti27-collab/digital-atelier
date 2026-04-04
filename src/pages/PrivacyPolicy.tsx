import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-16 py-12">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase mb-10 transition-colors" style={{ color: 'rgba(212,165,116,0.6)' }}>
        <ArrowLeft size={14} /> Torna alla Home
      </Link>

      <h1 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: '#d4a574' }}>
        Informativa sulla Privacy
      </h1>
      <p className="text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR)
      </p>

      <div className="space-y-8 text-sm leading-[1.8]" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>1. Titolare del Trattamento</h2>
          <p>
            Mattia Intini – Libero Professionista<br />
            Sede: Torino, Italia<br />
            P.IVA: 13419790012<br />
            Email: <a href="mailto:intiniwebatelier@gmail.com" className="underline" style={{ color: '#d4a574' }}>intiniwebatelier@gmail.com</a><br />
            Telefono: <a href="tel:+393345415707" className="underline" style={{ color: '#d4a574' }}>+39 334 541 5707</a>
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>2. Dati Raccolti</h2>
          <p>I dati personali trattati attraverso questo sito includono:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, orario di accesso, raccolti automaticamente dai sistemi informatici.</li>
            <li><strong>Dati forniti volontariamente:</strong> nome, email, telefono e messaggio inviati tramite il modulo di contatto.</li>
            <li><strong>Cookie:</strong> cookie tecnici e, previo consenso, cookie analitici e di profilazione (vedi <Link to="/cookie-policy" className="underline" style={{ color: '#d4a574' }}>Cookie Policy</Link>).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>3. Finalità e Base Giuridica</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Risposta alle richieste:</strong> i dati inviati tramite il form sono trattati per rispondere alle richieste dell'utente (base giuridica: consenso, art. 6.1.a GDPR).</li>
            <li><strong>Adempimento di obblighi legali:</strong> i dati possono essere trattati per adempiere a obblighi di legge (art. 6.1.c GDPR).</li>
            <li><strong>Funzionamento del sito:</strong> i cookie tecnici sono necessari per il corretto funzionamento (art. 6.1.f GDPR – legittimo interesse).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>4. Modalità di Trattamento</h2>
          <p>
            I dati sono trattati con strumenti informatici e telematici, con logiche strettamente correlate alle finalità indicate e comunque in modo da garantire la sicurezza e la riservatezza dei dati stessi, nel rispetto delle misure organizzative, fisiche e logiche previste dalla normativa vigente.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>5. Periodo di Conservazione</h2>
          <p>
            I dati personali forniti tramite il modulo di contatto sono conservati per il tempo strettamente necessario a gestire la richiesta e, successivamente, per un periodo massimo di 24 mesi, salvo obblighi di legge che ne richiedano una conservazione più lunga.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>6. Comunicazione e Diffusione dei Dati</h2>
          <p>
            I dati personali non saranno diffusi. Potranno essere comunicati a:<br />
            – Fornitori di servizi di hosting e infrastruttura tecnica;<br />
            – Professionisti e consulenti per adempimenti fiscali e legali;<br />
            – Autorità competenti, nei casi previsti dalla legge.
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>7. Trasferimento dei Dati</h2>
          <p>
            Alcuni dati potrebbero essere trasferiti verso paesi extra-UE (es. servizi cloud). In tal caso, il trasferimento avviene nel rispetto delle garanzie previste dal GDPR (decisioni di adeguatezza, clausole contrattuali standard).
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>8. Diritti dell'Interessato</h2>
          <p>Ai sensi degli artt. 15-22 del GDPR, l'utente ha diritto di:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Accedere ai propri dati personali;</li>
            <li>Richiedere la rettifica o la cancellazione;</li>
            <li>Limitare il trattamento;</li>
            <li>Opporsi al trattamento;</li>
            <li>Richiedere la portabilità dei dati;</li>
            <li>Revocare il consenso in qualsiasi momento;</li>
            <li>Proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#d4a574' }}>www.garanteprivacy.it</a>).</li>
          </ul>
          <p className="mt-2">
            Per esercitare i propri diritti, scrivere a: <a href="mailto:intiniwebatelier@gmail.com" className="underline" style={{ color: '#d4a574' }}>intiniwebatelier@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(212,165,116,0.7)' }}>9. Modifiche alla Privacy Policy</h2>
          <p>
            Il Titolare si riserva il diritto di apportare modifiche alla presente informativa in qualunque momento. Si prega di consultare regolarmente questa pagina.
          </p>
          <p className="mt-2">Ultimo aggiornamento: Aprile 2026</p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
