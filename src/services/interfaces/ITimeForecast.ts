import { IBeachForecast } from "./IBeachForecast";

export interface ITimeForecast {
  time: string;
  forecast: IBeachForecast[];
}
