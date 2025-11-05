"use strict";
import { handleFetchError } from "./handleFetchError.js";
export const getJokesRandom = async () => {
    const url = 'https://icanhazdadjoke.com/';
    try {
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        handleFetchError(res);
        const data = await res.json();
        return { text: data.joke, source: "random" };
    }
    catch (err) {
        throw err;
    }
};
