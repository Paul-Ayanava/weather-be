import request from 'supertest';
import express from 'express';
import { weatherRouter } from './weatherForcast';
import { getWeatherData } from '../services/weatherService';
import { mockedWeatherData } from '../mocks';

jest.mock('../services/WeatherService');
const mockedGetWeatherData = getWeatherData as jest.MockedFunction<typeof getWeatherData>;

const app = express();
app.get('/api/weather/:cityId', weatherRouter);

describe('WeatherController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return weather data for a city', async () => {
        mockedGetWeatherData.mockResolvedValue(mockedWeatherData);

        const response = await request(app).get('/api/weather/kolkata');

        expect(response.status).toBe(200);
        expect(response.body.forecast).toBeDefined();
    });

    test('should return 400 if city is not provided', async () => {
        const response = await request(app).get('/api/weather');

        expect(response.status).toBe(404);
    });
});
