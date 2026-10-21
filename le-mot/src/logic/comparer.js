export function compareMots(motentrer, motsolution){
    const mot = motsolution.toUpperCase()
    const essai = motentrer.toUpperCase()


    if (essai.length !== mot.length) {
        throw new Error(`le mot entré doit contenir ${mot.length} lettres`)
    }

    const statuts = Array(essai.length).fill("absent")
    const restantes = mot.split("")

    for (let i = 0 ; i < mot.length ; i++) {
        if (essai[i] === mot[i]) {
            statuts[i] = "correct"
            restantes[i] = null
        }
    }
    for (let i = 0 ; i < mot.length ; i++) {
        if (statuts[i] === "correct") continue
        const index = restantes.indexOf(essai[i])
        if (index !== -1) {
            statuts[i] = "present"
            restantes[index] = null
        }
    }


    return statuts

}
