import { string } from "yup";

export interface ForecastDataPerDay {
  date: string;
  img: string;
  temp: string;
}

export type CityType = {
  name: string;
  state: string;
  lat: number;
  lon: number;
};
export type StringType = string;
export type LocalNamesObjectType = { [T in StringType]: string };
export type CityTypeExtended = {
  country: string;
  local_names: LocalNamesObjectType;
} & CityType;
export type CurrentWeatherType = {
  id?: string | number;
  date: string | number;
  city: string | undefined;
  temp: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
};
export type WeatherForecast = {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    [T in StringType]: number;
  };
  pop: 0;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    [T in StringType]: number;
  };
};
export enum ButtonEnum {
  TWO = 2,
  THREE = 3,
  FIVE = 5,
}
