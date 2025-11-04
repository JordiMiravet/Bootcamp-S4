"use strict"
// --------------------------------------------------
// Archivos

import { showWeather } from "./weatherHandler.js";
import { starRating, showJoke, handleNextJoke } from "./jokeHandler.js"

// --------------------------------------------------
// Eventos

document.addEventListener("DOMContentLoaded", () => {
    showWeather();
    setInterval(() => showWeather(), 900 * 1000);

    starRating.listenToStars();
    document.getElementById("btn")?.addEventListener("click", handleNextJoke);
    showJoke();
});



