import { useState, useEffect } from "react";
import Tableau from "./components/Tableau.jsx";
import motsSolutions from "./data/mots_solutions.json";

const motMystere = motsSolutions[Math.floor(Math.random() * motsSolutions.length)].toUpperCase();

export default function App() {
  const [essaisPasses, setEssaisPasses] = useState([]);
  const [essaisStatuts, setEssaisStatuts] = useState([]);
  const [essaiEnCours, setEssaiEnCours] = useState("");

  const analysemots = (mot) => {
    const statuts = Array(5).fill("absente");
    const lettresMystere = motMystere.split("");
    const lettresEssai = mot.split("");

    lettresEssai.forEach((lettre, l) => {
      if (lettresMystere[l] === lettre) {
        statuts[l] = "correcte";
        lettresMystere[l] = null;
      }
    });

    lettresEssai.forEach((lettre, l) => {
      if (statuts[l] !== "correcte") {
        const index = lettresMystere.indexOf(lettre);
        if (index !== -1) {
          statuts[l] = "presente";
          lettresMystere[index] = null;
        }
      }
    });

    return statuts;
  }

  useEffect(() => {
    const gestionTouche = (event) => {
      const touche = event.key.toUpperCase();

      if (essaisPasses.length >= 6) return;

      // Touche Entrée : valider le mot
      if (touche === "ENTER") {
        if (essaiEnCours.length === 5) {
          setEssaisPasses((prev) => [...prev, essaiEnCours]);
          const statuts = analysemots(essaiEnCours);

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
      <Tableau
        essaisPasses={essaisPasses}
        essaisStatuts={essaisStatuts}
        essaiEnCours={essaiEnCours}
      />
    </div>
  );
}