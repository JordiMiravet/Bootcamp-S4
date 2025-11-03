"use strict";

import { getWeather } from "../src/api/weather";

global.fetch = jest.fn();

describe("getWeather", () => {
    it("should be a function", () => {
        expect(typeof getWeather).toBe("function");
    });

    it("should return a CurrentWeather object", async () => {
        const mockResponse = {
            current_weather: {
                time: "2025-11-03T12:00",
                temperature: 20,
                is_day: 1,
                weathercode: 0
            }
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await getWeather();

        expect(result).toEqual(mockResponse.current_weather);
    });

    it("should throw an error when response is not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ 
            ok: false,
            status: 400,
            json: async () => ({})
        });

        await expect(getWeather()).rejects.toThrow("Client Error 400");
    });
});
