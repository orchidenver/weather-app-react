import sunny from "../assets/sunny.svg";
import clear from "../assets/moon.svg";
import rainy from "../assets/rainy.svg";
import snowy from "../assets/snowy.svg";
import cloudy from "../assets/cloudy-medium.svg";
import { CurrentWeatherType } from "../types";

export function transformDate(
  date: Date,
  timestamp: boolean = false,
  perDays: boolean = false
): string {
  if (timestamp && perDays) {
    const transformedDateToHoursPerDays: string = new Intl.DateTimeFormat(
      "en-GB",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }
    ).format(date);

    return transformedDateToHoursPerDays.split(", ").join(" ");
  }

  if (timestamp) {
    const transformedDateToHours: string = new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(date);
    return transformedDateToHours;
  }

  const transformedDateToWeekday: string = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);

  return transformedDateToWeekday;
}

export function selectWeatherImage(weather: string | undefined): string {
  if (weather === "Sunny" || weather === "Clear") return sunny;
  if (weather === "Rain") return rainy;
  if (weather === "Snow") return snowy;
  if (weather === "Clouds") return cloudy;

  return clear;
}

export function filterForecastData(
  forecastData: CurrentWeatherType[],
  days: number = 0
) {
  const day: Date = new Date();
  const endOfADay: number =
    day.setUTCHours(23, 59, 59, 999) + days * 1000 * 60 * 60 * 24;

  const data = forecastData
    ?.filter((today: CurrentWeatherType, i: number) => {
      return parseInt(today.date * 1000 < endOfADay);
    })
    .map((el: CurrentWeatherType) => {
      return {
        ...el,
        date: parseInt(el.date * 1000),
      };
    });

  return data;
}
