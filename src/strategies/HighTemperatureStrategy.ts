import { ConditionStrategy, DailyWeatherData } from './ConditionStrategy';

class HighTemperatureStrategy implements ConditionStrategy {
    checkCondition(data: DailyWeatherData): boolean {
        return data.tempMax > 40;
    }

    getMessage(): string {
        return 'Use sunscreen';
    }
}

export { HighTemperatureStrategy };
