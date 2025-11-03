"use strict"

import { JokeResponse } from "./type.js";

export const getJokesRandom = async (): Promise<JokeResponse> => {
    const url: string = 'https://icanhazdadjoke.com/';
    try{
        const response = await fetch(url , { headers: { 'Accept': 'application/json'}})
        if(!response.ok) throw new Error('Network response was not ok')
        
        const data = await response.json();
        return { text: data.joke, source: "random"};
    } catch (err){
        console.error(err);
        // ToDo: Ya manejaré este error en main.ts, por ahora dejo esto como recordatorio
        throw err;
    }
}