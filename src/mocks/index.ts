export const mockedWeatherData = {
  list: [
    {
      main: {
        temp_min: 27.4,
        temp_max: 27.97,
      },
      weather: [
        {
          main: "Rain",
        },
      ],
      wind: {
        speed: 12.78,
      },
      dt_txt: "2024-05-26 12:00:00",
    },
    {
      main: {
        temp_min: 26.15,
        temp_max: 27.36,
      },
      weather: [
        {
          main: "Rain",
        },
      ],
      wind: {
        speed: 12.39,
      },
      dt_txt: "2024-05-26 15:00:00",
    }
  ],
};

export const mockAPIResponse = {
  forecast: {
    "2024-05-31": {
      tempMax: 30.09,
      tempMin: 29.05,
      windSpeed: 2.36,
      weather: ["clouds"],
      conditions: [],
    },
    "2024-06-01": {
      tempMax: 38.89,
      tempMin: 28.64,
      windSpeed: 7.26,
      weather: ["clouds", "rain"],
      conditions: ["Carry umbrella"],
    },
    "2024-06-02": {
      tempMax: 36.81,
      tempMin: 28.21,
      windSpeed: 6.01,
      weather: ["clouds", "rain"],
      conditions: ["Carry umbrella"],
    },
  },
};
