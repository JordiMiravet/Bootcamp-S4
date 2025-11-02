"use strict"
// --------------------------------------------------
// Archivos

import { getJokes } from "./api/jokes.js"
import { print, getJokeContainer, getDate, getStars, getWeatherContainers, getWeatherIcons } from "./helpers.js"
import { reportJokes, ReportJoke } from "./DDBB.js"
import { getWeather } from "./api/weather.js"

// --------------------------------------------------
// Weather Logic

const showWeather = async () : Promise<void> => {
    const { icon, temp } = getWeatherContainers();
    const weather = await getWeather();
    
    if(!icon || !temp) return;
    console.log( weather.is_day);
    (icon as HTMLImageElement).src = getWeatherIcons(weather.weathercode, weather.is_day);
    temp.textContent = `${weather.temperature}º C`;
}

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
    showWeather();
    setInterval(() => showWeather(), 900 * 1000);

    starRating.listenToStars();
    document.getElementById("btn")?.addEventListener("click", handleNextJoke);
    showJoke();
});



