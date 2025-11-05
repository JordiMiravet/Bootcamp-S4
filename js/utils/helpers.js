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
export const getWeatherIcons = (code, is_day) => {
    switch (true) {
        case code === 0: return is_day ? "../images/weather_icons/day.svg" : "../images/weather_icons/night.svg";
        case code <= 2: return is_day ? "../images/weather_icons/cloudy-day.svg" : "../images/weather_icons/cloudy-night.svg";
        case code <= 48: return "../images/weather_icons/cloudy.svg";
        case code <= 82: return is_day ? "../images/weather_icons/rainy-day.svg" : "../images/weather_icons/rainy-night.svg";
        case code <= 86: return is_day ? "../images/weather_icons/snowy-day.svg" : "../images/weather_icons/snowy-night.svg";
        case code <= 99: return "../images/weather_icons/thunder.svg";
        default: return is_day ? "../images/weather_icons/day.svg" : "../images/weather_icons/night.svg";
    }
};
