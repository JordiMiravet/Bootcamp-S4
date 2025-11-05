"use strict";
import { handleFetchError } from "./handleFetchError.js";
export const getWeather = async () => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true";
    try {
        const res = await fetch(url);
        handleFetchError(res);
        const data = await res.json();
        return data.current_weather;
    }
    catch (err) {
        throw err;
    }
};
