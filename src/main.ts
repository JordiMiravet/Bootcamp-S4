"use strict"
// --------------------------------------------------
// Archivos

import { getJokesRandom } from "./api/jokesRandom.js";
import { getJokesChuck } from "./api/jokesChuck.js";
import { print, getJokeContainer, getDate } from "./helpers.js";
import { reportJokes } from "./DDBB.js";
import { showWeather } from "./showWeather.js";

// --------------------------------------------------
// Joke Logic

// Resetear y deseleccionar estrellas
const createStarRating = () => {
    let ratingChecked: HTMLInputElement | null = null;

    // Deseleccionar checkbox
    const listenToStars = (): void => {
        document.querySelectorAll<HTMLInputElement>('input[name="rating"]').forEach(star => 
            star.addEventListener("click", () => {
                ratingChecked === star
                    ? ((star.checked = false), (ratingChecked = null))
                    : ratingChecked = star
            }
        ));
    };

    // Reset checkbox
    const resetStar = () : HTMLInputElement | void => {
        document.querySelectorAll<HTMLInputElement>('input[name="rating"]').forEach( star => {
            star.checked = false;
        });
        ratingChecked = null;
    };

    const getRating = (): number => ratingChecked ? parseInt(ratingChecked.value) : 0;

    return { listenToStars, resetStar, getRating }
}
const starRating = createStarRating();

// Mostrar chiste
const showJoke = async (): Promise<void> => {
    const result = getJokeContainer();
    if (!result) return console.error("The element 'result' was not found");

    try{
        const joke = Math.random() > 0.5 
            ? await getJokesRandom()
            : await getJokesChuck()

        print(result, joke.text);
    } catch (err){
        console.error(err)
        print(result, `Error : ${err}`);
    }
};

// Mirar estas infos antes de continuar :

// mdn control de flujo y manejo de errores
// logggin library js
// duck typing typescript


const handleNextJoke = (): void => {
    const star = starRating.getRating();
    const result = getJokeContainer();
    if (!result) return console.error("No se encontró el elemento 'result'");

    const currentJoke = result.textContent || "";

    reportJokes.push({
        joke: currentJoke,
        score: star,
        date: getDate()
    });

    starRating.resetStar();
    showJoke();
};

// --------------------------------------------------
// Eventos

document.addEventListener("DOMContentLoaded", () => {
    showWeather();
    setInterval(() => showWeather(), 900 * 1000);

    starRating.listenToStars();
    document.getElementById("btn")?.addEventListener("click", handleNextJoke);
    showJoke();
});



