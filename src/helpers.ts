"use strict"

export const print = (elementHTML: HTMLElement, result: string): void => { elementHTML.innerHTML = result }

export const getJokeContainer = (): HTMLElement | null => document.getElementById("resultDiv");
export const getDate = (): string => new Date().toISOString();
export const getStars = (): number => {
    const star : HTMLInputElement | null = document.querySelector('input[name="rating"]:checked');
    return star ? Number(star.value) : 0;
}