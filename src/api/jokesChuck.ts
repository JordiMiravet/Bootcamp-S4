"use strict"

import { JokeResponse } from "./type.js";
import { handleFetchError } from "../handleFetchError.js";

export const getJokesChuck = async (): Promise<JokeResponse> => {
    const url : string = "https://api.chucknorris.io/jokes/random";
    try{
        const res = await fetch(url);
        handleFetchError(res);

        const data = await res.json();
        return { text: data.value, source: "chuck"};
    } catch (err){
        throw err;
    }
}