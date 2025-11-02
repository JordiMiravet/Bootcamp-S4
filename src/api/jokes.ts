"use strict"

interface JokeResponse {
    id: string
    joke: string
    status: number
}

export const getJokes = async (): Promise<JokeResponse> => {
    const url: string = 'https://icanhazdadjoke.com/';
    try{
        const response = await fetch(url , { headers: { 'Accept': 'application/json'}})
        if(!response.ok) throw new Error('Network response was not ok')
        const data: JokeResponse = await response.json();

        return data;
    } catch (err){
        console.error(err);
        // ToDo: Ya manejaré este error en main.ts, por ahora dejo esto como recordatorio
        throw err;
    }
}