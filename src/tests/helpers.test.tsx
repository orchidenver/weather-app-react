import {
  transformDate,
  selectWeatherImage,
  filterForecastData,
} from "../helpers";

const weatherForecast = [
  {
    date: 1683568800,
    city: "Odesa",
    temp: 6,
    weatherDescription: "Rain",
    humidity: 65,
    windSpeed: 2,
  },
  {
    date: 1683579600,
    city: "Odesa",
    temp: 1,
    weatherDescription: "Snow",
    humidity: 65,
    windSpeed: 10,
  },
  {
    date: 1683590400,
    city: "Odesa",
    temp: 6,
    weatherDescription: "Rain",
    humidity: 65,
    windSpeed: 2,
  },
];

describe("Testing function selectWeatherImage", () => {
  test("argument `weather` is undefined or null", () => {
    expect(selectWeatherImage(undefined)).toBe("moon.svg");
    expect(selectWeatherImage(null)).toBe("moon.svg");
  });

  test("type of argument `weather` is number", () => {
    expect(selectWeatherImage(45)).toBe("moon.svg");
  });

  test("type of argument `weather` is array", () => {
    expect(selectWeatherImage(["Rain"])).toBe("moon.svg");
  });

  test("type of argument `weather` is object", () => {
    expect(selectWeatherImage({ weather: "Rain" })).toBe("moon.svg");
  });

  test("argument `weather` is incorrect string", () => {
    expect(selectWeatherImage("Rainy")).toBe("moon.svg");
  });

  test("arg weather equals Rainy and returned value is on sunny.svg", () => {
    expect(selectWeatherImage("Rainy")).not.toBe("sunny.svg");
  });

  test("arg weather equals Rainy and returned value is on rainy.svg", () => {
    expect(selectWeatherImage("Rainy")).not.toBe("rainy.svg");
  });
});

describe("Testing function filterForecastData", () => {
  test("invalid args: arg forecastData has type of string", () => {
    expect(() => filterForecastData("string", 2)).toThrow(TypeError);
  });

  test("invalid args: arg forecastData is not an array", () => {
    expect(() =>
      filterForecastData(
        {
          date: "10065695626",
          city: "Odesa",
          temp: 6,
          weatherDescription: "Rain",
          humidity: 65,
          windSpeed: 2,
        },
        2
      )
    ).toThrow(TypeError);
  });

  test("args have valid types and returned value is an array", () => {
    expect(filterForecastData(weatherForecast, 2)).toBeInstanceOf(Array);
  });
});

describe("Testing function transformDate", () => {
  test("returned value contains year, month, day, hours, minutes", () => {
    const value: string = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
      .format(new Date())
      .split(", ")
      .join(" ");

    expect(transformDate(new Date(), true, true)).toBe(value);
  });

  test("returned value contains hours and minutes", () => {
    const value: string = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(new Date());

    expect(transformDate(new Date(), true)).toBe(value);
  });

  test("returned value contains weekday, year, month and day", () => {
    const value: string = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date());

    expect(transformDate(new Date())).toBe(value);
    expect(transformDate(new Date(), false, true)).toBe(value);
  });
});
