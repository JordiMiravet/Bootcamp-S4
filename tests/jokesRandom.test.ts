"use strict"

import { getJokesRandom } from "../src/api/jokesRandom";

global.fetch = jest.fn();

describe("getJokesRandom", () => {
    it("should be a function", () => {
        expect(typeof getJokesRandom).toBe("function");
    });

    it("should return a joke object with text and source", async () => {
        const mockResponse = { joke: "What did the late tomato say to the early tomato? I'll ketch up" };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await getJokesRandom();

        expect(result).toEqual({ text: mockResponse.joke, source: "random" });
    });
    it("should throw an error when the network response is not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ 
            ok: false,
            status: 400,
            json: async () => ({})
        });

        await expect(getJokesRandom()).rejects.toThrow("Client Error 400")
    });
});