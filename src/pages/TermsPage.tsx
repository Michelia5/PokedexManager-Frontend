import React from "react";
import BackgroundImage from "/images/other/pokeball.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer"; 

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "bottom",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
        className="text-white"
      >
        <div className="mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8">Termini e Condizioni</h1>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Termini e Condizioni di Utilizzo</h2>
            <p className="mb-4">Ultimo aggiornamento: 06/01/2025</p>
            <p className="mb-4">
              Benvenuto su Pokédex Manager. L'utilizzo del nostro sito web è regolato
              dai presenti Termini e Condizioni. Si prega di leggere attentamente i
              termini seguenti prima di utilizzare il sito.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. Accettazione dei Termini</h2>
            <p>
              Utilizzando il nostro sito, accetti di essere vincolato dai presenti
              Termini e Condizioni e dalla nostra Privacy Policy. Se non sei
              d'accordo con uno qualsiasi dei termini, ti invitiamo a non utilizzare
              il sito.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">2. Descrizione del Servizio</h2>
            <p>
              Pokédex Manager è un'applicazione web che permette agli utenti di
              esplorare e gestire un database di Pokémon. Gli utenti possono
              visualizzare informazioni dettagliate sui Pokémon, cercare specifici
              Pokémon, e gestire una collezione personale.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">3. Modifiche ai Termini</h2>
            <p>
              Ci riserviamo il diritto di modificare questi Termini in qualsiasi
              momento. Le modifiche saranno efficaci non appena pubblicate sul sito.
              Continuando a utilizzare il sito dopo la pubblicazione delle modifiche,
              accetti i nuovi Termini.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">4. Account Utente</h2>
            <p>
              Per utilizzare alcune funzionalità del sito, potrebbe essere necessario
              creare un account. Sei responsabile della sicurezza delle informazioni
              del tuo account e della riservatezza della tua password. Devi
              notificarci immediatamente qualsiasi uso non autorizzato del tuo
              account.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">5. Uso Consentito</h2>
            <p className="mb-4">Puoi utilizzare il sito solo per scopi legali e in conformità con i presenti Termini. È vietato:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Utilizzare il sito in modo che violi leggi o regolamenti applicabili.</li>
              <li>Tentare di ottenere accesso non autorizzato al sito o ai suoi server.</li>
              <li>Interferire con il funzionamento del sito.</li>
            </ul>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">6. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti presenti sul sito, inclusi testo, grafica, loghi,
              immagini, e software, sono di proprietà di Pokedex Manager o dei suoi
              licenziatari e sono protetti dalle leggi sul copyright e altre leggi
              sulla proprietà intellettuale.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">7. Legge Applicabile</h2>
            <p>
              Questi Termini sono regolati e interpretati secondo le leggi italiane.
              Qualsiasi controversia derivante dall'uso del sito sarà soggetta alla
              giurisdizione esclusiva dei tribunali italiani.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
