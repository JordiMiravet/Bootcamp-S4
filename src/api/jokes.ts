"use strict"

interface JokeResponse {
    id: string
    joke: string
    status: number
}

export const getJokes = async (): Promise<JokeResponse> => {
    const url: string = 'https://icanhazdadjoke.com/';
    const response = await fetch(url , { headers: { 'Accept': 'application/json'}})
    if(!response.ok){
        throw new Error('Network response was not ok')
    }
    const data: JokeResponse = await response.json()
    return data;
}


// --------------------------------------------------
// This json return:

// {
//     "id": "haMJRfF6hFd",
//     "joke": "How do you fix a broken pizza? With tomato paste.",
//     "status": 200
// }