export default function FinDePartie({ aGagne, motMystere, nbEssais, onRejouer }) {
    const urlWiktionnaire = `https://fr.wiktionary.org/wiki/${motMystere.toLowerCase()}`;

    return (
        <div className="fin-de-partie">
            <h2>{aGagne ? "Bravo, c'est gagné !" : "Dommage, c'est perdu !"}</h2>
            <p>
                Le mot mystère était :{" "}
                <a
                    href={urlWiktionnaire}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3aa346", fontWeight: "bold", textDecoration: "underline" }}
                >
                    {motMystere.toUpperCase()}
                </a>
            </p>
            <p>Nombre d'essais : {nbEssais} / 6</p>
            <button onClick={onRejouer} className="btn-rejouer">
                Rejouer
            </button>
        </div>
    );
}