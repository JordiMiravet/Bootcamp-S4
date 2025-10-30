"use strict"

import { getJokes } from "./api/jokes.js"
import { print } from "./helpers.js"

// En aquest primer exercici crearem la pantalla principal que mostrarà acudits a l'usuari/ària.
// El funcionament ha de ser el següent:
// - En iniciar es mostrarà el primer acudit per pantalla i el botó de següent acudit.
// - En prémer el botó de “Següent acudit” es farà fetch a l'API d'acudits i es mostrarà per consola i per pantalla l'acudit.

const getInput = (): HTMLElement | null => document.getElementById("resultDiv");

const showJoke = async (): Promise<void> => {
    const joke = await getJokes();
    const result = getInput();

    if(result){
        console.log(joke.joke);
        print(result, joke.joke);
    } else {
        console.error("No se encontró el elemento 'result'")
    }  
}

document.getElementById("btn")?.addEventListener("click", showJoke);


