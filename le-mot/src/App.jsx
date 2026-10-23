import { useState, useEffect } from "react";
import Tableau from "./components/Tableau.jsx";
import { verifierMot } from "./service/wikitionnaire.js";
import { motRandom, analyseMot } from "./components/jeuLogique.js";

const motMystere = motRandom();

export default function App() {
  const [essaisPasses, setEssaisPasses] = useState([]);
  const [essaisStatuts, setEssaisStatuts] = useState([]);
  const [essaiEnCours, setEssaiEnCours] = useState("")
  const [messageErreur, setMessageErreur] = useState("");

  useEffect(() => {
    const gestionTouche = async (event) => {
      const touche = event.key.toUpperCase();

      if (essaisPasses.length >= 6) return;

      setMessageErreur("");

      if (touche === "ENTER") {
        if (essaiEnCours.length === 5) {

          const motValide = await verifierMot(essaiEnCours);
          if (!motValide) {
            setMessageErreur("Le mot n'existe pas !");
            return;
          }


          setEssaisPasses((prev) => [...prev, essaiEnCours]);
          const statuts = analyseMot(essaiEnCours, motMystere);

          setEssaisStatuts((prev) => [...prev, statuts]);
          setEssaiEnCours("");
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
  }, [essaiEnCours, essaisPasses]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Le Mot Mystère</h1>
      {messageErreur && <p className="message-erreur">{messageErreur}</p>}


      <Tableau
        essaisPasses={essaisPasses}
        essaisStatuts={essaisStatuts}
        essaiEnCours={essaiEnCours}
      />
    </div>
  );
}