# Sprint 4

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.png?v=101)
![Tests](https://img.shields.io/badge/Tests-Jest-blue)

## **Introducción**

Este proyecto reúne una serie de ejercicios diseñados para practicar el consumo de `API REST` y la correcta estructuración del código en `TypeScript`, con el objetivo de familiarizarse con su sintaxis y lógica.
La base del proyecto es una landing page que muestra una tarjeta con chistes, permite calificarlos mediante un sistema de puntuación y cuenta con un botón para pasar al siguiente chiste. Además, incluye una sección que muestra el clima en tiempo real.

## **Objetivos**

- Aprender y practicar el consumo de `API REST`.
- Profundizar en el uso de `TypeScript`, comprendiendo su `sintaxis`, el `tipado estático`, y el uso adecuado de `interfaces` y otros componentes del lenguaje para mantener un código claro y estructurado.
- Practicar la implementación de procesos asíncronos en un entorno web, integrando `HTML` y `CSS` para la presentación visual.

---

## **Instalación**

### Clonar el repositorio

```bash
git clone https://github.com/JordiMiravet/Bootcamp-S4 cd Bootcamp-S4
```

### Instalar las dependencias

Si tienes instalado `Node.js` y `npm` ejecuta:

```bash
npm install
```

### Compilar el código TypeScript

```bash
npm run watch
```

Esto generará la carpeta `dist/` con los archivos JavaScript ya compilados.

### Ejecutar en el navegador

Una vez compilado, abre en el navegador el archivo :

```TypeScript
index.html
```
* Para este ultimo paso deberás poseer una extensión como _Live Server_ en el VisualStudio Code.

---

## **Estructura de carpetas**

```text
Bootcamp-S4/
│
├─ images/
│  ├─ dom_images
│  │  └─ background-image_001.jpg
│  └─ weather_icons/
│     ├─ day.svg
│     ├─ night.svg
│     ├─ cloudy-day.svg
│     ├─ cloudy-night.svg
│     ├─ cloudy.svg
│     ├─ rainy-day.svg
│     ├─ rainy-night.svg
│     ├─ snowy-day.svg
│     ├─ snowy-night.svg
│     └─ thunder.svg
│
├─ src/
│  ├─ api/
│  │  ├─ handleFetchError.ts
│  │  ├─ jokesChuck.ts
│  │  ├─ jokesRandom.ts
│  │  ├─ typeJoke.ts
│  │  └─ weather.ts
|  ├─ DDBB/
|  |  └─ DDBB.ts
|  ├─ utils/
|  |  ├─ helpers.ts
│  |  ├─ jokeHandler.ts
│  |  └─ weatherHandler.ts 
│  └─ main.ts
│
├─ styles/
│  └─ style.css
│
├─ test/
│  ├─ jokesChuck.test.ts
│  ├─ jokesRandom.test.ts
│  └─ weather.test.ts
│
├─ .gitignore
├─ index.html
├─ jest.config.js
├─ package-lock.json
├─ package.json 
├─ README.md 
└─ tsconfig.json
```

---

## **Funciones principales**

### Archivos para el consumo de APIs REST

- A continuación se describen los archivos responsables de realizar las llamadas a las distintas APIs y manejar las respuestas en el proyecto.

Archivo `typeJoke.ts`:

```typescript
"use strict"

export interface JokeResponse {
    text: string;
    source: "random" | "chuck";
}
```

- Este archivo define la interface `JokeResponse`, que establece el tipado del objeto devuelto por las funciones que consumen las APIs de chistes. Gracias a esta interfaz, he normalizado la estructura de las respuestas, lo que me ha permitido intercalar y mostrar los chistes de distintas fuentes de forma uniforme en el `HTML`.

---

Archivo `handleFetchError.ts`:

```typescript
"use strict"

export const handleFetchError = (res: Response) => {
    if (!res.ok) {
        if (res.status >= 400 && res.status < 500) throw new Error(`Client Error ${res.status}`);
        if (res.status >= 500 && res.status < 600) throw new Error(`Server Error ${res.status}`);
    }
};
```

- Esta función centraliza el manejo de errores en las peticiones `HTTP`.  
- Verifica el estado de la respuesta y lanza errores descriptivos en caso de fallos del cliente (4xx) o del servidor (5xx). En este caso se implementan mensajes de error genéricos, aunque en futuros proyectos me gustaría ampliar el sistema para gestionar distintos tipos de errores de forma más específica.

---

Archivo `JokesChuck.ts`:

```typescript
"use strict"

import { JokeResponse } from "./api/typeJoke.js";
import { handleFetchError } from "./api/handleFetchError.js";

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
```

- Esta función realiza una petición a la `API` de chistes de Chuck Norris y devuelve un objeto (tipado según la interfaz `JokeResponse`).
- En caso de error en la respuesta `HTTP`, he delegado el manejo a `handleFetchError()`.

---

Archivo `jokesRandom.ts`:

```typescript
"use strict"

import { JokeResponse } from "./api/typeJoke.js";
import { handleFetchError } from "./api/handleFetchError.js";

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
```

- Esta función consume una `API` de chistes aleatorios y devuelve el resultado en el mismo formato que la función anterior, unificando la estructura de las respuestas mediante la interface `JokeResponse`.
- En caso de error en la respuesta `HTTP`, esta tambien delega su manejo a `handleFetchError()`

---

Archivo `weather.ts`

```typescript
"use strict"

import { handleFetchError } from "./api/handleFetchError.js";

interface CurrentWeather{
    time: string;
    temperature: number;
    is_day: 0 | 1;
    weathercode: number
}

export const getWeather = async (): Promise<CurrentWeather>  => {
    const url : string  = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true";

    try{
        const res = await fetch(url);
        handleFetchError(res);

        const data = await res.json();
        return data.current_weather as CurrentWeather;
    } catch (err){
        throw err;
    }  
}
```

- Esta función obtiene los datos meteorológicos actuales desde una `API` de meteorologia, para este caso he usado las coordenadas de Barcelona pero para proximos proyectos me gustaría estudiar como implementarla segun la direccion IP del trabajador/cliente.
- Devuelve un objeto `CurrentWeather` con la hora, temperatura, momento del día (diurno o nocturno) y codigo del clima actual (el cual luego es transformado en un icono svg dinamico).

---

Archivo `reportJokes.ts`

```typescript
"use strict"

export type ReportJoke = {
    joke: string,
    score: number,
    date: string,
}

export const reportJokes: ReportJoke[] = [];
```

- Este archivo define el type `ReportJoke`, que establece la estructura y tipado de los objetos que representan los chistes evaluados por el usuario.
- Además, exporta `reportJokes` que es un array vacío tipado con el type `ReportJoke[]`, que sirve para almacenar todos los chistes que se lancen, con su puntuación y la fecha en la que ha sido calificado.

---

Archivo `helpers.ts`:

- Estos archivos contienen funciones auxiliares para manipular el DOM y manejar la representación de información en la interfaz de la sección de chistes y el clima.

```typescript
"use strict"

export const print = (elementHTML: HTMLElement, result: string): void => { 
    elementHTML.innerHTML = result 
}

// --------------------------------------------------
// Joke Helpers

export const getJokeContainer = (): HTMLElement | null => document.getElementById("resultDiv");
export const getDate = (): string => new Date().toISOString();
export const getStars = (): number => {
    const star: HTMLInputElement | null = document.querySelector('input[name="rating"]:checked');
    return star ? Number(star.value) : 0;
}

// --------------------------------------------------
// Weather Helpers
interface WeatherContainers {
    icon: HTMLImageElement | null;
    temp: HTMLElement | null;
}
export const getWeatherContainers = (): WeatherContainers => {
    const icon = document.getElementById("weatherIcon") as HTMLImageElement | null;
    const temp = document.getElementById("weatherTemp");

    return { icon, temp };
}

export const getWeatherIcons = (code: number, is_day: number): string => {
    switch(true){
        case code === 0 : return is_day ? "images/weather_icons/day.svg" : "images/weather_icons/night.svg";
        case code <= 2 : return is_day ? "images/weather_icons/cloudy-day.svg" : "images/weather_icons/cloudy-night.svg";
        case code <= 48 : return "images/weather_icons/cloudy.svg";
        case code <= 82 : return is_day ? "images/weather_icons/rainy-day.svg" : "images/weather_icons/rainy-night.svg";
        case code <= 86 : return is_day ? "images/weather_icons/snowy-day.svg" : "images/weather_icons/snowy-night.svg";
        case code <= 99 : return "images/weather_icons/thunder.svg";  
        default: return is_day ? "images/weather_icons/day.svg" : "images/weather_icons/night.svg";
    }  
};
```

Definición de cada una de las funciones:

- `print(elementHTML, result)`: función que printea el resultado en el `HTML`.
- Joke Helpers:
    - `getJokeContainer()` Devuelve el contenedor `HTML` donde muestro el chiste.
    - `getDate()` Devuelve la fecha actual en formato ISO.
    - `getStars()` Obtiene la puntuación seleccionada por el usuario.
- Weather Helpers:
    - `getWeatherContainers()` Devuelve los elementos del DOM donde se mostrará el icono y la temperatura del clima.
    - `getWeatherIcons(code, is_day)` Selecciono el icono apropiado según el código de clima (`code`) y con un ternario me aseguro de mostrar el icono mas adecuado para el momento del dia (`is_day`) en el que se encuentre el usuario.

---

Archivo `jokeHandler.ts`:

- Este archivo gestiona toda la lógica de los chistes dentro del proyecto, incluyendo la selección aleatoria de chistes, su visualización en pantalla y el registro de la puntuación que otorga el usuario.

```typescript
"use strict"

import { print , getJokeContainer, getDate } from "./utils/helpers.js";
import { getJokesRandom } from "./api/jokesRandom.js";
import { getJokesChuck } from "./api/jokesChuck.js";
import { reportJokes } from "./DDBB/DDBB.js";

// --------------------------------------------------
// Joke Logic

// Resetear y deseleccionar estrellas
export const createStarRating = () => {
    let ratingChecked: HTMLInputElement | null = null;

    // Deseleccionar checkbox
    const listenToStars = (): void => {
        document.querySelectorAll<HTMLInputElement>('input[name="rating"]').forEach(star => 
            star.addEventListener("click", () => {
                ratingChecked === star
                    ? ((star.checked = false), (ratingChecked = null))
                    : ratingChecked = star
            }
        ));
    };

    // Reset checkbox
    const resetStar = () : HTMLInputElement | void => {
        document.querySelectorAll<HTMLInputElement>('input[name="rating"]').forEach( star => {
            star.checked = false;
        });
        ratingChecked = null;
    };

    const getRating = (): number => ratingChecked 
        ? parseInt(ratingChecked.value) 
        : 0;

    return { listenToStars, resetStar, getRating }
}

// Mostrar chiste
export const showJoke = async (): Promise<void> => {
    const result = getJokeContainer();
    if (!result) return console.error("The element 'result' was not found");

    try{
        const joke = Math.random() > 0.5 
            ? await getJokesRandom()
            : await getJokesChuck()

        console.clear();
        console.log(reportJokes[reportJokes.length -1]);
        console.log(reportJokes)

        print(result, joke.text);
    } catch (err){
        console.error(err)
        print(result, `Error : ${err}`);
    }
};

export const starRating = createStarRating();

export const handleNextJoke = (): void => {
    const star = starRating.getRating();
    const result = getJokeContainer();
    if (!result) return console.error("No se encontró el elemento 'result'");

    const currentJoke = result.textContent || "";

    reportJokes.push({
        joke: currentJoke,
        score: star,
        date: getDate()
    });
    
    starRating.resetStar();
    showJoke();
};
```

Definición de cada una de las funciones:

- `createStarRating()`:
    - Inicializa el sistema de puntuación.
    - Permite seleccionar y deseleccionar una estrella, en este caso, haberlo trabajado con radio no encontré otra manera más lógica de hacerlo.
    - Devuelve un objeto con tres métodos:
        - `listenToStars()`: añade los listeners a las estrellas para permitir su selección/deselección.
        - `resetStar()`: limpia la selección de estrellas y el valor adjudicado a ella tras valorar un chiste y pasar al siguiente.
        - `getRating()`: devuelve la puntuación seleccionada por el usuario en formato numérico.

- `showJoke()`:
    - Obtiene un chiste aleatorio desde una de las dos APIs (`getJokesRandom` o `getJokesChuck`) y lo muestra en el contenedor del DOM mediante la función `print()`.
    - Además, limpia la consola y registra el último chiste puntuado en el array reportJokes.
    - En caso de error en la petición o renderizado, lo muestra en el HTML.

- `handleNextJoke()`:
    - Registra el chiste actual junto con su puntuación y la fecha pusheandolo en el array `reportJokes`.
    - Llama a `resetStar()` para limpiar la puntuación anterior y vuelve a lanzar `showJoke()` para mostrar un nuevo chiste.

- `starRating`:
    - Es una instancia creada a partir de `createStarRating()` para mantener el estado de la valoración a lo largo de su ciclo de vida.

---

Archivo `weatherHandler.ts`:

- Este archivo contiene la lógica principal de la sección del clima, obtiene la información meteorológica actual y la representa dinámicamente en la interfaz mediante un icono y la temperatura.

```typescript
"use strict"

import { getWeather } from "./api/weather.js";
import { getWeatherContainers, getWeatherIcons } from "./utils/helpers.js";

// --------------------------------------------------
// Weather Logic

// Mostrar Clima
export const showWeather = async (): Promise<void> => {
    const { icon, temp } = getWeatherContainers();
    if (!icon || !temp) return;

    try {
        const weather = await getWeather();
        
        (icon as HTMLImageElement).src = getWeatherIcons(weather.weathercode, weather.is_day);
        temp.textContent = `${weather.temperature}º C`;
    } catch (err) {
        console.error(err);

        (icon as HTMLImageElement).src = getWeatherIcons(0, 1);
        temp.textContent = "";
    }
};
```

Definición de la función:

- `showWeather()`:
    - Obtiene los elementos del DOM donde se mostrarán el icono del clima y la temperatura mediante la función `getWeatherContainers()` de `helpers.ts`.
    - Llama a `getWeather()` para realizar la petición a la `API` de meteorología y obtener los datos actuales.
    - Según el código del clima (`weathercode`) y el momento del día (`is_day`), asigna el icono correspondiente con `getWeatherIcons()` tambien definidio en `helpers.ts`.
    - Muestra la temperatura actual en ºCelsius en el contenedor correspondiente.
    - En caso de error en la petición o en el renderizado, muestra un icono por defecto (día despejado) y deja vacío el texto de la temperatura.

---

Archivo `main.ts`:

- Este archivo actúa como punto de entrada principal del proyecto, donde se inicializan todos los procesos.
- Aquí se coordinan tanto la lógica de los chistes como la del clima, enlazando las funciones correspondientes.

```typescript
"use strict"
// --------------------------------------------------
// Archivos

import { showWeather } from "./utils/weatherHandler.js";
import { starRating, showJoke, handleNextJoke } from "./utils/jokeHandler.js"

// --------------------------------------------------
// Eventos

document.addEventListener("DOMContentLoaded", () => {
    showWeather();
    setInterval(() => showWeather(), 900 * 1000);

    starRating.listenToStars();
    document.getElementById("btn")?.addEventListener("click", handleNextJoke);
    showJoke();
});
```

Definición de la lógica general:
- Al cargarse el documento (DOMContentLoaded):
    - Se ejecuta la función showWeather() para mostrar la información meteorológica actual en pantalla.
    - Además, se actualiza automáticamente cada 15 minutos (900 * 1000 ms) para mantener los datos del clima siempre al día.
    - Se inicializa el sistema de puntuación por estrellas con el `starRating.listenToStars()`.
    - Se añade un listener al botón principal (`btn`) que, al hacer clic, llama a `handleNextJoke()` para guardar el chiste actual, registrar su puntuación y mostrar uno nuevo.
    - Finalmente, se ejecuta `showJoke()` al inicio para que la página muestre el primer chiste nada más cargarse.

---

## **Autor**

```text
Jordi Miravet – Bootcamp S4 – Proyecto de práctica TypeScript y APIs.
```