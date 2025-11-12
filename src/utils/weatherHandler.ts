import { getWeather } from "../api/weather.js";
import { getWeatherContainers, getWeatherIcons } from "../utils/helpers.js";

// --------------------------------------------------
// Weather Logic

// Mostrar Clima
export const showWeather = async (): Promise<void> => {
    const { icon, temp } = getWeatherContainers();
    if (!icon || !temp) return;

    try {
        const weather = await getWeather();

        const weatherIcon = getWeatherIcons(weather.weathercode, weather.is_day);
        icon.src = weatherIcon.src;
        icon.alt = weatherIcon.alt;

        temp.textContent = `${weather.temperature}º C`;

    } catch (err) {
        console.error(err);

        const defaultIcon = getWeatherIcons(0, 1);
        icon.src = defaultIcon.src;
        icon.alt = defaultIcon.alt;

        temp.textContent = "";
    }
};