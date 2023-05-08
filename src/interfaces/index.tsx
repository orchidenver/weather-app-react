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
export type LocalNamesType = string;
export type LocalNamesObjectType = { [T in LocalNamesType]: string };
export type CityTypeExtended = {
  country: string;
  local_names: LocalNamesObjectType;
} & CityType;
