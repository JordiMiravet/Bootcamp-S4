"use strict"

import { JokeResponse } from "./type.js";

export const getJokesChuck = async (): Promise<JokeResponse> => {
    const url : string = "https://api.chucknorris.io/jokes/random";
    try{
        const res = await fetch(url);
        if(!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        return { text: data.value, source: "chuck"};
    } catch (err){
        console.error(err);
        // ToDo: Ya manejaré este error en main.ts, por ahora dejo esto como recordatorio
        throw err;
    }
}