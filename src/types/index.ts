export interface WeatherDataType {
    list: Array<{
        main: {
            temp_min: number;
            temp_max: number;
        };
        weather: Array<{
            main: string;
        }>;
        dt_txt: string;
        wind: {
            speed: number;
        }
    }>;
}