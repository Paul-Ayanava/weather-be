import { ConditionStrategy, DailyWeatherData } from './ConditionStrategy';

class RainStrategy implements ConditionStrategy {
    checkCondition(data: DailyWeatherData): boolean {
        return data.weather.includes('rain');
    }

    getMessage(): string {
        return 'Carry umbrella';
    }
}

export { RainStrategy };
