"use strict"
// --------------------------------------------------
// Archivos

import { getJokes } from "./api/jokes.js"
import { print, getJokeContainer, getDate, getStars } from "./helpers.js"
import { reportJokes, ReportJoke } from "./DDBB.js"

// --------------------------------------------------

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
    if (!result) return console.error("No se encontró el elemento 'result'");

    const joke = await getJokes();
    print(result, joke.joke);
};

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

    console.log(reportJokes[reportJokes.length - 1]);

    starRating.resetStar();
    showJoke();
};

// --------------------------------------------------
// Eventos

document.addEventListener("DOMContentLoaded", () => {
    starRating.listenToStars();
    document.getElementById("btn")?.addEventListener("click", handleNextJoke);
    showJoke();
});



