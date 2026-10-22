
export async function verifierMot(mot) {
    const motRecherche = mot.trim().toLowerCase()

    const url = new URL("https://fr.wiktionary.org/w/api.php")

    url.searchParams.set("action", "parse")
    url.searchParams.set("page", motRecherche)
    url.searchParams.set("prop", "sections")
    url.searchParams.set("format", "json")
    url.searchParams.set("origin", "*")

    const reponse = await fetch(url)

    if (!reponse.ok) {
        throw new Error("Erreur de connexion au Wiktionnaire")
    }

    const donnees = await reponse.json()

    if (donnees.error) {
        if (donnees.error.code === "missingtitle") {
            return false
        }

        throw new Error(donnees.error.info || "Erreur API")
    }

    const sections = donnees.parse?.sections || []

    const estFrancais = sections.some((section) =>
        section.line.toLowerCase().includes("français")
    )

    return estFrancais
}
