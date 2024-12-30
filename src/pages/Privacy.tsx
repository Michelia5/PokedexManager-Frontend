import React from "react";
import BackgroundImage from "/images/other/pokeball.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "center",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
        className="text-white"
      >
        <div className="mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="mb-4">Ultimo aggiornamento: 06/01/2025</p>
            <p className="mb-4">
              La tua privacy è importante per noi. La presente Privacy Policy spiega
              come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue
              informazioni personali.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. Informazioni Raccolte</h2>
            <p className="mb-4">Raccogliamo diverse tipologie di informazioni per fornire e migliorare il nostro servizio:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Informazioni di Registrazione:</strong> Quando crei un account, raccogliamo informazioni personali come il tuo nome, indirizzo email, e password.</li>
              <li><strong>Dati di Utilizzo:</strong> Raccogliamo informazioni su come accedi e utilizzi il sito, inclusi il tuo indirizzo IP, il tipo di browser, e le pagine visitate.</li>
              <li><strong>Cookie e Tecnologie Simili:</strong> Utilizziamo cookie e tecnologie simili per tracciare l'attività sul nostro sito e conservare determinate informazioni.</li>
            </ul>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">2. Uso delle Informazioni</h2>
            <p className="mb-4">Utilizziamo le informazioni raccolte per:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fornire e mantenere il servizio.</li>
              <li>Personalizzare la tua esperienza utente.</li>
              <li>Migliorare il nostro sito e i nostri servizi.</li>
            </ul>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">3. Condivisione delle Informazioni</h2>
            <p className="mb-4">Non condividiamo le tue informazioni personali con terze parti, tranne che in circostanze specifiche:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Con il tuo consenso.</li>
              <li>Per rispettare obblighi legali.</li>
              <li>Per proteggere e difendere i diritti o la proprietà di Pokédex Manager.</li>
            </ul>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">4. Protezione delle Informazioni</h2>
            <p>
              Adottiamo misure di sicurezza per proteggere le tue informazioni personali
              da accessi non autorizzati, uso improprio, divulgazione o distruzione.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">5. I Tuoi Diritti</h2>
            <p>
              Hai il diritto di accedere, correggere, aggiornare o eliminare le tue
              informazioni personali. Puoi contattarci per esercitare questi diritti.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">6. Modifiche alla Privacy Policy</h2>
            <p>
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi
              momento. Le modifiche saranno efficaci non appena pubblicate sul sito.
              Continuando a utilizzare il sito dopo la pubblicazione delle modifiche,
              accetti la nuova Privacy Policy.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">7. Contatti</h2>
            <p>
              Per qualsiasi domanda o dubbio riguardo a questa Privacy Policy,
              contattaci a: pokédex.manager@mail.it
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
