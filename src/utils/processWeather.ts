import { DailyWeatherData } from "../strategies/ConditionStrategy";
import { conditionsConfig } from "../strategies";
import { WeatherDataType } from "../types";

interface ProcessedWeatherData {
  forecast: Array<DailyWeatherData>;
}

function convertToArr(inputData: Record<string, DailyWeatherData>) {
  const forecastArray = Object.keys(inputData).map((date) => ({
    ...inputData[date],
    date,
  }));

  return forecastArray;
}

function processWeatherData(data: WeatherDataType): ProcessedWeatherData {
  const conditions = new Set<string>();
  let i = 0;
  const dailyDataValues: { [key: string]: DailyWeatherData } = {};
  const dataList = data.list;
  // for (let i = 0; i < data.list.length; i += 8) {
  while (i < dataList.length) {
    const dayData = dataList[i];
    const date = dayData.dt_txt.split(" ")[0];
    if (!dailyDataValues[date] && Object.keys(dailyDataValues).length >= 3) {
      break;
    }
    const weatherValue = dayData.weather[0].main.toLowerCase();
    if (!dailyDataValues[date]) {
      dailyDataValues[date] = {
        tempMax: dayData.main.temp_max,
        tempMin: dayData.main.temp_min,
        windSpeed: dayData.wind.speed,
        weather: [weatherValue],
        conditions: [],
        date,
      };
    } else {
      if (dayData.main.temp_max > dailyDataValues[date].tempMax) {
        dailyDataValues[date].tempMax = dayData.main.temp_max;
      }
      if (dayData.main.temp_min < dailyDataValues[date].tempMin) {
        dailyDataValues[date].tempMin = dayData.main.temp_min;
      }
      if (dayData.wind.speed > dailyDataValues[date].windSpeed) {
        dailyDataValues[date].windSpeed = dayData.wind.speed;
      }
      if (!dailyDataValues[date].weather.includes(weatherValue)) {
        dailyDataValues[date].weather.push(weatherValue);
      }
    }

    conditionsConfig.forEach((strategy) => {
      const conditionMessage = strategy.getMessage();
      const dailyConditions = dailyDataValues[date].conditions;
      if (
        strategy.checkCondition(dailyDataValues[date]) &&
        !dailyConditions?.includes(conditionMessage)
      ) {
        dailyConditions?.push(conditionMessage);
      }
    });
    i += 1;
  }
  return {
    forecast: convertToArr(dailyDataValues)
  };
}

export { processWeatherData, ProcessedWeatherData };
