"use strict"

export const print = (elementHTML: HTMLElement, result: string): void => { elementHTML.innerHTML = result }

// --------------------------------------------------
// Joke Helpers

export const getJokeContainer = (): HTMLElement | null => document.getElementById("resultDiv");
export const getDate = (): string => new Date().toISOString();
export const getStars = (): number => {
    const star : HTMLInputElement | null = document.querySelector('input[name="rating"]:checked');
    return star ? Number(star.value) : 0;
}

// --------------------------------------------------
// Weather Helpers
interface WeatherContainers {
    icon : HTMLImageElement | null;
    temp : HTMLElement | null;
}
export const getWeatherContainers = (): WeatherContainers => {
    const icon = document.getElementById("weatherIcon") as HTMLImageElement | null;;
    const temp = document.getElementById("weatherTemp");

    return { icon, temp };
}

export const getWeatherIcons = (code: number, is_day: number): string => {
    switch(true){
        case code === 0 : return is_day ? "images/weather_icons/day.svg" : "images/weather_icons/night.svg";
        case code <= 2 : return is_day ? "images/weather_icons/cloudy-day.svg" : "images/weather_icons/cloudy-night.svg";
        case code <= 48 : return "images/weather_icons/cloudy.svg";
        case code <= 82 : return is_day ? "images/weather_icons/rainy-day.svg" : "images/weather_icons/rainy-night.svg";
        case code <= 86 : return is_day ? "images/weather_icons/snowy-day.svg" : "images/weather_icons/snowy-night.svg";
        case code <= 99 : return "images/weather_icons/thunder.svg";  
        default: return is_day ? "images/weather_icons/day.svg" : "images/weather_icons/night.svg";
    }  
};


