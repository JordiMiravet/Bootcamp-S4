"use strict"
// --------------------------------------------------
// Archivos

import { getJokes } from "./api/jokes.js"
import { print } from "./helpers.js"
import { reportJokes, ReportJoke } from "./DDBB.js"

// --------------------------------------------------
// Logica

const getInput = (): HTMLElement | null => document.getElementById("resultDiv");
const getDate = (): string => new Date().toISOString();


// Comentario: No va el deseleccionar las estrellas, entiendo que debe ser algo del input radio
// Para mañana: intentaré generar algún tipo de lógica para que escuche los iconos seleccionados
// Para mañana : + actualizar el "score" del chiste según la votación.

const showJoke = async (): Promise<void> => {
    const joke = await getJokes();
    const result = getInput();

    if(result){
        reportJokes.push({
            joke: joke.joke,
            score: 0, // me falta la logica para escuchar los iconos seleccionados
            date: getDate()
        })

        console.log(joke.joke);
        print(result, joke.joke);

        
    } else {
        console.error("No se encontró el elemento 'result'")
    }  
}

// --------------------------------------------------
// Evento

document.getElementById("btn")?.addEventListener("click", showJoke);


