import axios from "axios";
import { WeatherDataType } from "../types";
import { DownstreamConnectionError } from "../errors/downstream-connection-error";
import { CacheService } from "./cacheService";

const cacheExpiration = 3600000 * 24; // 1day
const weatherCache = CacheService.getInstance<WeatherDataType>(cacheExpiration);

export async function getWeatherData(city: string): Promise<WeatherDataType> {
  console.log('The original api is called')
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=24&units=metric&appid=${process.env.API_KEY}`;
  try {
    const response = await axios.get(url);
    weatherCache.set(city, response.data);
    return response.data;
  } catch (err) {
    const response = getCachedWeatherData(city)
    if(!response) {
      throw new DownstreamConnectionError();
    }
    return response
  }
}

export function getCachedWeatherData(city: string): WeatherDataType | null {
  return weatherCache.get(city);
}
