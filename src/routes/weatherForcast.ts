import express, { Response, Request } from "express";
import {
  getCachedWeatherData,
  getWeatherData,
} from "../services/weatherService";
import { DownstreamConnectionError } from "../errors/downstream-connection-error";
import { processWeatherData } from "../utils/processWeather";
import { WeatherDataType } from "../types";

const router = express.Router();

function sendWeatherData(res: Response, weatherData: WeatherDataType) {
  const forecast = processWeatherData(weatherData);
  return res.send(forecast);
}

/**
 * @swagger
 * /api/weather/{cityId}/{mode}:
 *   get:
 *     summary: Get weather forecast for a city
 *     parameters:
 *       - in: path
 *         name: cityId
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the city
 *       - in: path
 *         name: mode
 *         schema:
 *           type: string
 *           enum: [offline]
 *         required: false
 *         description: Mode to determine if cached data should be used
 *     responses:
 *       200:
 *         description: A JSON object containing the weather forecast
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                forecast:
 *                 type: object
 *                 properties:
 *                     tempMax:
 *                       type: number
 *                       description: Maximum temperature of the day
 *                       example: 30.09
 *                     tempMin:
 *                       type: number
 *                       description: Minimum temperature of the day
 *                       example: 29.05
 *                     windSpeed:
 *                       type: number
 *                       description: Wind speed in meters per second
 *                       example: 2.36
 *                     weather:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of weather phenomena
 *                       example: ["rain"]
 *                     date:
 *                       type: string
 *                       description: "The date of the day"
 *                       example: "2024-06-01"
 *                     conditions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Additional weather conditions or recommendations
 *                       example: ["Carry umbrella"]
 *       404:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *       500:
 *         description: Downstream server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *       400:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 */
router.get(
  "/api/weather/:cityId/:mode?",
  async (req: Request, res: Response) => {
    const city = req.params.cityId;
    const mode = req.params.mode;
    if (mode === "offline") {
      const cachedData = getCachedWeatherData(city);
      if (!cachedData) {
        throw new DownstreamConnectionError();
      } else {
        sendWeatherData(res, cachedData);
      }
    } else {
      const weatherData = await getWeatherData(city);
      sendWeatherData(res, weatherData);
    }
  }
);

export { router as weatherRouter };
