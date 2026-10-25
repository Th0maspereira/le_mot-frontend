import { useState, useEffect } from "react";
import Tableau from "./components/Tableau.jsx";
import { verifierMot } from "./service/wikitionnaire.js";
import { motRandom, analyseMot } from "./components/jeuLogique.js";
import FinDePartie from "./components/finDePartie.jsx";

const { mot: motAleatoire, mystere: motMystere } = motRandom();

export default function App() { 
  const [essaisPasses, setEssaisPasses] = useState([]);
  const [essaisStatuts, setEssaisStatuts] = useState([]);
  const [essaiEnCours, setEssaiEnCours] = useState("")
  const [messageErreur, setMessageErreur] = useState("");
  
  // États de fin de partie
  const [estTerminee, setEstTerminee] = useState(false);
  const [aGagne, setAGagne] = useState(false);

  const rejouer = () => {
    window.location.reload();
  };

  useEffect(() => {
    const gestionTouche = async (event) => {
      const touche = event.key.toUpperCase();

      if (estTerminee || essaisPasses.length >= 6) return;
      setMessageErreur("");

      if (touche === "ENTER") {
        if (essaiEnCours.length === 5) {

          const motValide = await verifierMot(essaiEnCours);
          if (!motValide) {
            setMessageErreur("Le mot n'existe pas !");
            return;
          }

          const nouveauxPasses = [...essaisPasses, essaiEnCours];
          const statuts = analyseMot(essaiEnCours, motMystere);

          setEssaisPasses(nouveauxPasses);
          setEssaisStatuts((prev) => [...prev, statuts]);
          setEssaiEnCours("");

          if (essaiEnCours === motMystere) {
            setAGagne(true);
            setEstTerminee(true);
            return;
          }

          if (nouveauxPasses.length === 6) {
            setAGagne(false);
            setEstTerminee(true);
            return;
          }
        }
        return;
      }

      if (touche === "BACKSPACE") {
        setEssaiEnCours((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[A-Z]$/.test(touche) && essaiEnCours.length < 5) {
        setEssaiEnCours((prev) => prev + touche);
      }
    };

    window.addEventListener("keydown", gestionTouche);
    return () => window.removeEventListener("keydown", gestionTouche);
  }, [essaiEnCours, essaisPasses, estTerminee]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Le Mot Mystère</h1>
      {messageErreur && <p className="message-erreur">{messageErreur}</p>}

      <Tableau
        essaisPasses={essaisPasses}
        essaisStatuts={essaisStatuts}
        essaiEnCours={essaiEnCours}
      />

      {estTerminee && (
        <FinDePartie
          aGagne={aGagne}
          motMystere={motAleatoire}
          nbEssais={essaisPasses.length}
          onRejouer={rejouer}
        />
      )}
    </div>
  );
}