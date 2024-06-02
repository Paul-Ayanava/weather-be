import { processWeatherData } from './processWeather';
import { mockedWeatherData } from '../mocks';
import { DailyWeatherData } from '../strategies/ConditionStrategy';

describe('WeatherProcessor', () => {
    test('should process weather data and apply conditions', () => {
        const result = processWeatherData(mockedWeatherData);
        expect(Object.keys(result.forecast).length).toBe(1);
        expect((result.forecast?.[0] as DailyWeatherData).tempMax).toEqual(27.97)
        expect((result.forecast?.[0] as DailyWeatherData).conditions).toContain('Carry umbrella')
    });
});
