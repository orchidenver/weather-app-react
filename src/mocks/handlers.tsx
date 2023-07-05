import { rest } from "msw";
import { SearchedCityTypeExtended } from "../types";

const cities: SearchedCityTypeExtended[] = [
  {
    country: "UA",
    lat: 49.841952,
    local_names: { ar: "لفيف", be: "Львоў", ca: "Lviv" },
    lon: 24.0315921,
    name: "Lviv",
    state: "Lviv Oblast",
  },
  {
    country: "UA",
    lat: 47.861591,
    local_names: { ru: "Львов", uk: "Львів", en: "Lviv" },
    lon: 33.551559,
    name: "Lviv",
    state: "Dnipropetrovsk Oblast",
  },
  {
    country: "UA",
    lat: 47.8922869,
    local_names: { ru: "Львов", uk: "Львів", en: "Lviv" },
    lon: 31.091311,
    name: "Lviv",
    state: "Mykolaiv Oblast",
  },
];

const currentWeatherData = {
  coord: { lon: 30.7326, lat: 46.4775 },
  weather: [{ id: 500, main: "Sunny", description: "light rain", icon: "10d" }],
  base: "stations",
  main: {
    temp: 22.2,
    feels_like: 10.15,
    temp_min: 11.2,
    temp_max: 11.2,
    pressure: 1023,
    humidity: 88,
    sea_level: 1023,
    grnd_level: 1016,
  },
  visibility: 10000,
  wind: { speed: 1.72, deg: 50, gust: 2.72 },
  rain: { "1h": 0.35 },
  clouds: { all: 95 },
  dt: 1683651206,
  sys: { country: "UA", sunrise: 1683599510, sunset: 1683652515 },
  timezone: 10800,
  id: 698740,
  name: "Odesa",
  cod: 200,
};

export const handlers = [
  rest.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=lviv&limit=5&appid=${process.env.REACT_APP_API_KEY}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(cities));
    }
  ),

  rest.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=46.4775&lon=30.73268&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(currentWeatherData));
    }
  ),
];
