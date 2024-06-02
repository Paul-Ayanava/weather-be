interface ConditionStrategy {
    checkCondition(data: DailyWeatherData): boolean;
    getMessage(): string;
}

interface DailyWeatherData {
    tempMin: number;
    tempMax: number;
    weather: Array<string>;
    windSpeed: number;
    date?: string;
    conditions?: Array<string>;
}

export { ConditionStrategy, DailyWeatherData };