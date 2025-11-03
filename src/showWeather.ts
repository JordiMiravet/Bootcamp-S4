"use strict"

import { getWeather } from "./api/weather.js";
import { getWeatherContainers, getWeatherIcons } from "./helpers.js";

export const showWeather = async (): Promise<void> => {
    const { icon, temp } = getWeatherContainers();
    if (!icon || !temp) return;

    try {
        const weather = await getWeather();
        
        (icon as HTMLImageElement).src = getWeatherIcons(weather.weathercode, weather.is_day);
        temp.textContent = `${weather.temperature}º C`;
    } catch (err) {
        console.error(err);

        (icon as HTMLImageElement).src = getWeatherIcons(0, 1);
        temp.textContent = "";
    }
};