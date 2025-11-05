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
    
    const path = "./images/weather_icons/"

    switch(true){
        case code === 0 : return is_day ? `${path}day.svg` : `${path}night.svg`;
        case code <= 2 : return is_day ? `${path}cloudy-day.svg` : `${path}cloudy-night.svg`;
        case code <= 48 : return `${path}cloudy.svg`;
        case code <= 82 : return is_day ? `${path}rainy-day.svg` : `${path}rainy-night.svg`;
        case code <= 86 : return is_day ? `${path}snowy-day.svg` : `${path}snowy-night.svg`;
        case code <= 99 : return `${path}thunder.svg`;  
        default: return is_day ? `${path}day.svg` : `${path}night.svg`;
    }  
};


