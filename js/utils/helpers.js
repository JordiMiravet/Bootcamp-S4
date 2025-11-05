"use strict";
export const print = (elementHTML, result) => { elementHTML.innerHTML = result; };
// --------------------------------------------------
// Joke Helpers
export const getJokeContainer = () => document.getElementById("resultDiv");
export const getDate = () => new Date().toISOString();
export const getStars = () => {
    const star = document.querySelector('input[name="rating"]:checked');
    return star ? Number(star.value) : 0;
};
export const getWeatherContainers = () => {
    const icon = document.getElementById("weatherIcon");
    ;
    const temp = document.getElementById("weatherTemp");
    return { icon, temp };
};

const path = "/Bootcamp-S4/images/weather_icons/";

export const getWeatherIcons = (code, is_day) => {
    switch (true) {
        case code === 0: return is_day ? `${path}day.svg` : `${path}night.svg`;
        case code <= 2: return is_day ? `${path}cloudy-day.svg` : `${path}cloudy-night.svg`;
        case code <= 48: return `${path}cloudy.svg`;
        case code <= 82: return is_day ? `${path}rainy-day.svg` : `${path}rainy-night.svg`;
        case code <= 86: return is_day ? `${path}snowy-day.svg` : `${path}snowy-night.svg`;
        case code <= 99: return `${path}thunder.svg`;
        default: return is_day ? `${path}day.svg` : `${path}night.svg`;
    }
};
