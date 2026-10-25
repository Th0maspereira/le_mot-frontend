export default function Accueil({ onLancerPartie }) {
  return (
    <div className="ecran-accueil" style={{ textAlign: "center", padding: "40px 20px" }}>
      <h1>Le Mot Mystère</h1>
      <p style={{ maxWidth: "400px", margin: "0 auto 25px auto", color: "#a1a1a5", lineHeight: "1.5" }}>
        Trouvez le mot mystère en 6 essais. Chaque essai doit être un mot valide de 5 lettres. 
        Les couleurs vous indiqueront quelles lettres sont bien placées ou présentes.
      </p>

      <button onClick={onLancerPartie} className="btn-rejouer">
        Jouer
      </button>
    </div>
  );
}