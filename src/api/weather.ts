"use strict"

interface CurrentWeather{
    time: string;
    temperature: number;
    is_day: 0 | 1;
    weathercode: number
}

export const getWeather = async (): Promise<CurrentWeather>  => {
    const url : string  = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true";
    try{
        const res = await fetch(url);
        if(!res.ok) throw new Error("Error en la API")
        const data = await res.json();

        return data.current_weather as CurrentWeather;
    } catch (err){
        console.error(err);
        // ToDo: Ya manejaré este error en main.ts, por ahora dejo esto como recordatorio
        throw err;
    }   
}
