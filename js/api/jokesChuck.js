"use strict";
import { handleFetchError } from "./handleFetchError.js";
export const getJokesChuck = async () => {
    const url = "https://api.chucknorris.io/jokes/random";
    try {
        const res = await fetch(url);
        handleFetchError(res);
        const data = await res.json();
        return { text: data.value, source: "chuck" };
    }
    catch (err) {
        throw err;
    }
};
