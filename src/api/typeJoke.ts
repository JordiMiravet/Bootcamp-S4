"use strict"

export interface JokeResponse {
    text: string;
    source: "random" | "chuck";
}