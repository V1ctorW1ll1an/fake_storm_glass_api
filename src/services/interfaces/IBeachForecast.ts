import { IForecastPoint } from "@src/clients/interfaces/IForecastPoint";
import { IBeach } from "./IBeach";

export interface IBeachForecast extends Omit<IBeach, "user">, IForecastPoint {}
