"use strict"

import { print , getJokeContainer, getDate } from "./helpers.js";
import { getJokesRandom } from "./api/jokesRandom.js";
import { getJokesChuck } from "./api/jokesChuck.js";
import { reportJokes } from "./DDBB.js";

// --------------------------------------------------
// Joke Logic

// Resetear y deseleccionar estrellas
export const createStarRating = () => {
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

    const getRating = (): number => ratingChecked 
        ? parseInt(ratingChecked.value) 
        : 0;

    return { listenToStars, resetStar, getRating }
}

// Mostrar chiste
export const showJoke = async (): Promise<void> => {
    const result = getJokeContainer();
    if (!result) return console.error("The element 'result' was not found");

    try{
        const joke = Math.random() > 0.5 
            ? await getJokesRandom()
            : await getJokesChuck()

        console.clear();
        console.log(reportJokes[reportJokes.length -1]);
        console.log(reportJokes)

        print(result, joke.text);
    } catch (err){
        console.error(err)
        print(result, `Error : ${err}`);
    }
};

export const starRating = createStarRating();

export const handleNextJoke = (): void => {
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