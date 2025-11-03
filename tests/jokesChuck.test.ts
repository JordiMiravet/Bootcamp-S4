"use strict"

import { getJokesChuck } from "../src/api/jokesChuck";

global.fetch = jest.fn();

describe("getJokesChuck", () => {
    it("should be a function", () => {
        expect(typeof getJokesChuck).toBe("function");
    });

    it("should return a joke object with text and source", async () => {
        const mockResponse = { value: "Chuck Norris counted to infinity. Twice" };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await getJokesChuck();

        expect(result).toEqual({ text: mockResponse.value, source: "chuck" });
    });
    it("should throw an error when the network response is not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ 
            ok: false,
            status: 400,
            json: async () => ({})
        });

        await expect(getJokesChuck()).rejects.toThrow("Client Error 400")
    });
});
