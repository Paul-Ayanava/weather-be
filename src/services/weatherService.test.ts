import axios from 'axios';
import { getWeatherData, getCachedWeatherData } from './weatherService';
import { CacheService } from './cacheService';
import { WeatherDataType } from '../types';
import { mockAPIResponse, mockedWeatherData } from '../mocks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
    const city = 'Kolkata';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch weather data from API and cache it', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockedWeatherData });

        const data = await getWeatherData(city);

        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(city));
        expect(data).toEqual(mockedWeatherData);

        const cachedData = getCachedWeatherData(city);
        expect(cachedData).toEqual(mockedWeatherData);
    });

    test('should return cached weather data if available', async () => {
        const cacheService = new CacheService<WeatherDataType>(3600000);
        cacheService.set(city, mockedWeatherData);

        const data = getCachedWeatherData(city);
        expect(data).toEqual(mockedWeatherData);
    });
    test('should fetch data from cached service if API call fails', async() => {
        mockedAxios.get.mockRejectedValue({ error: 'Service down'})
        const cacheService = new CacheService<WeatherDataType>(3600000);
        cacheService.set(city, mockedWeatherData);
        const data = await getWeatherData(city);
        expect(data).toEqual(mockedWeatherData);
    })
});
