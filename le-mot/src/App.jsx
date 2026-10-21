import Tableau from "./components/tableau.jsx";

export default function App() {
  const essaisPasses = ["TABLE", "CHIEN"];
  const essaisStatuts = [
    ["correct", "absent", "absent", "present", "absent"],
    ["absent", "correct", "absent", "absent", "absent"]
  ];
  const essaiEnCours = "CHAT";

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Test de la Grille</h1>
      <Tableau
        essaisPasses={essaisPasses}
        essaisStatuts={essaisStatuts}
        essaiEnCours={essaiEnCours}
      />
    </div>
  );
}