import { ConditionStrategy, DailyWeatherData } from "./ConditionStrategy";

class WindStrategy implements ConditionStrategy {
    checkCondition(data: DailyWeatherData): boolean {
        return data.weather.includes('wind');
    }

    getMessage(): string {
        return "It's windy";
    }
}

export { WindStrategy }