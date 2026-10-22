import { useState, useEffect } from "react";
import Tableau from "./components/Tableau.jsx";
import motsSolutions from "./data/mots_solutions.json";

const motMystere = motsSolutions[Math.floor(Math.random() * motsSolutions.length)].toUpperCase();

export default function App() {
  const [essaisPasses, setEssaisPasses] = useState([]);
  const [essaisStatuts, setEssaisStatuts] = useState([]);
  const [essaiEnCours, setEssaiEnCours] = useState("");

  useEffect(() => {
    const gestionTouche = (event) => {
      const touche = event.key.toUpperCase();

      if (essaisPasses.length >= 6) return;

      // Touche Entrée : valider le mot
      if (touche === "ENTER") {
        if (essaiEnCours.length === 5) {
          setEssaisPasses((prev) => [...prev, essaiEnCours]);
          setEssaiEnCours(""); // On vide la ligne pour le prochain essai
        }
        return;
      }

      // Touche Effacer : retirer la dernière lettre
      if (touche === "BACKSPACE") {
        setEssaiEnCours((prev) => prev.slice(0, -1));
        return;
      }

      // Lettres de A à Z : ajouter la lettre si on a moins de 5 lettres
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
      <Tableau
        essaisPasses={essaisPasses}
        essaisStatuts={essaisStatuts}
        essaiEnCours={essaiEnCours}
      />
    </div>
  );
}