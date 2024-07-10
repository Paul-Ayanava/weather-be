import request from "supertest";
import {
  getWeatherData,
  getCachedWeatherData,
} from "../services/weatherService";
import { mockedWeatherData } from "../mocks";
import { app } from "../app";

jest.mock("../services/WeatherService");
const mockedGetWeatherData = getWeatherData as jest.MockedFunction<
  typeof getWeatherData
>;
const mockCachedWeatherData = getCachedWeatherData as jest.MockedFunction<
  typeof getCachedWeatherData
>;

describe("WeatherController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return weather data for a city", async () => {
    mockedGetWeatherData.mockResolvedValue(mockedWeatherData);

    const response = await request(app).get("/api/weather/kolkata");

    expect(response.status).toBe(200);
    expect(response.body.forecast).toBeDefined();
  });

  test("should return 400 if city is not provided", async () => {
    const response = await request(app).get("/api/weather");

    expect(response.status).toBe(404);
  });
  test("should return value from cache", async () => {
    mockCachedWeatherData.mockReturnValue(mockedWeatherData);

    const response = await request(app).get("/api/weather/kolkata/offline");

    expect(response.status).toBe(200);
    expect(response.body.forecast).toBeDefined();
  });

  test("should return error if value does not exist on cache in offline mode", async () => {
    mockCachedWeatherData.mockReturnValue(null);

    const response = await request(app).get("/api/weather/kolkata/offline");

    expect(response.status).toBe(500);
  });

  test("should return error if some error occurs", async () => {
    mockedGetWeatherData.mockRejectedValue(new Error('Something went wrong'));

    const response = await request(app).get("/api/weather/kolkata");

    expect(response.status).toBe(400);
  });
});
