"use strict"

import { JokeResponse } from "./type.js";
import { handleFetchError } from "../handleFetchError";

export const getJokesRandom = async (): Promise<JokeResponse> => {
    const url: string = 'https://icanhazdadjoke.com/';
    try{
        const res = await fetch(url , { headers: { 'Accept': 'application/json'}})
        handleFetchError(res);

        const data = await res.json();
        return { text: data.joke, source: "random"};
    } catch (err){
        throw err;
    }
}