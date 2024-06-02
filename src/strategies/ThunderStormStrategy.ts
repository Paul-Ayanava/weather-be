import { ConditionStrategy, DailyWeatherData } from "./ConditionStrategy";

class ThunderStormStrategy implements ConditionStrategy {
    checkCondition(data: DailyWeatherData): boolean {
        return data.weather.includes('thunderstorm');
    }

    getMessage(): string {
        return "Don't step out";
    }
}

export { ThunderStormStrategy };