import motSolution from '../data/mots_solutions.json';

export function motRandom() {
    const motMystere = motSolution[Math.floor(Math.random() * motSolution.length)];
    return motMystere.toUpperCase();
}

export function analyseMot(mot, motMystere) {
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