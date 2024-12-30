import React from "react";
import BackgroundImage from "/images/other/pokeball.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Information: React.FC = () => {
  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
        className="text-white"
      >
        <div className="mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8">Informazioni</h1>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Informazioni sul Progetto</h2>
            <p className="mb-4">
              Benvenuti su Pokédex Manager, un progetto scolastico sviluppato con
              l'obiettivo di creare un'applicazione web che permetta agli utenti di
              esplorare e gestire un database di Pokémon. L'applicazione consente di
              visualizzare informazioni dettagliate su ciascun Pokémon, incluse
              statistiche, evoluzioni e tipi, e di gestire una collezione personale.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Scopo del Progetto</h2>
            <p>
              Lo scopo del progetto è sviluppare un'applicazione web che permetta agli
              utenti di esplorare e gestire un database di Pokémon. L'applicazione
              permetterà di visualizzare informazioni dettagliate su ciascun Pokémon,
              come statistiche, evoluzioni e tipi, e di gestire una collezione
              personale.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Chi Sono</h2>
            <p>
              Mi chiamo Michele Caniglia, sono nato nel 2003 e ho frequentato il
              liceo scientifico di Guardiagrele, dove mi sono diplomato. Attualmente,
              sto frequentando il secondo anno all'Istituto Infobasic a Pescara, dove
              sto studiando per diventare un Software Developer. Questo progetto fa
              parte del mio percorso scolastico attuale. Le mie passioni includono la
              programmazione, i videogiochi e il motorsport.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Motivazioni</h2>
            <p>
              Sin da piccolo ho sempre guardato e giocato ai videogiochi, e i
              Pokémon sono probabilmente uno dei brand più famosi. Ho giocato a molti
              giochi della saga e mi ha fatto piacere pensare di poter "rivivere" in
              parte quei momenti creando questo Pokédex.
            </p>
          </section>

          <section className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Futuri Sviluppi</h2>
            <p>
              Dopo aver presentato il progetto ai miei professori e aver ultimato gli
              ultimi dettagli, ho intenzione di continuare ad espandere il database e
              tenerlo aggiornato, dato che ora non è completo al 100%.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Information;
