export type SearchedCityType = {
  name: string;
  state: string;
  lat: number;
  lon: number;
};

export type SearchedCityTypeExtended = {
  country: string;
  local_names: { [T in string]: string };
} & SearchedCityType;

export type CurrentWeatherType = {
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
    [T in string]: number;
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
    [T in string]: number;
  };
};

export enum ButtonDaysPerViewEnum {
  TWO = 2,
  THREE = 3,
  FIVE = 5,
}

export type ChildrenProps = {
  children: JSX.Element;
};

export interface ScreenViewProps {
  cityWeather: CurrentWeatherType | null;
}
