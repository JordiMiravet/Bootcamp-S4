export const print = (elementHTML: HTMLElement, result: string): void => { elementHTML.innerHTML = result }

// --------------------------------------------------
// Joke Helpers

export const getJokeContainer = (): HTMLElement | null => document.getElementById("resultDiv");
export const getDate = (): string => new Date().toISOString();
export const getStars = (): number => {
    const star : HTMLInputElement | null = document.querySelector('input[name="rating"]:checked');
    return star ? Number(star.value) : 0;
}

// --------------------------------------------------
// Weather Helpers
interface WeatherContainers {
    icon : HTMLImageElement | null;
    temp : HTMLElement | null;
}
export const getWeatherContainers = (): WeatherContainers => {
    const icon = document.getElementById("weatherIcon") as HTMLImageElement | null;;
    const temp = document.getElementById("weatherTemp");

    return { icon, temp };
}

export const getWeatherIcons = (code: number, is_day: number): { src: string, alt: string } => {
    
    enum weatherCode {
        clear = 0,
        partialCloudy = 2,
        cloudy = 48,
        rain = 82,
        snow = 86,
        thunderstorm = 99
    }
    const path = "./images/weather_icons/";

    switch (true) {
        case code === weatherCode.clear:
            return { 
                src: is_day ? `${path}day.svg` : `${path}night.svg`,
                alt: is_day ? "Clear sky during the day" : "Clear sky at night"
            };
        case code <= weatherCode.partialCloudy :
            return { 
                src: is_day ? `${path}cloudy-day.svg` : `${path}cloudy-night.svg`,
                alt: is_day ? "Partial cloudy day" : "Partial cloudy night"
            };
        case code <= weatherCode.cloudy :
            return { 
                src: `${path}cloudy.svg`,
                alt: "Cloudy sky"
            };
        case code <= weatherCode.rain :
            return { 
                src: is_day ? `${path}rainy-day.svg` : `${path}rainy-night.svg`,
                alt: is_day ? "Rainy day" : "Rainy night"
            };
        case code <= weatherCode.snow :
            return { 
                src: is_day ? `${path}snowy-day.svg` : `${path}snowy-night.svg`,
                alt: is_day ? "Snowy day" : "Snowy night"
            };
        case code <= weatherCode.thunderstorm :
            return { 
                src: `${path}thunder.svg`,
                alt: "Thunderstorm day"
            };
        default:
            return { 
                src: is_day ? `${path}day.svg` : `${path}night.svg`,
                alt: is_day ? "Default clear sky during the day" : "Default clear sky at night"
            };
    }
};



