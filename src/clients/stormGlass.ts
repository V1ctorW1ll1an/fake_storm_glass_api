import { ClientRequestError } from "./errors/clientRequestError";
import { StormGlassResponseError } from "./errors/stormGlassResponseError";
import { IForecastPoint } from "./interfaces/IForecastPoint";
import { IStormGlassForecastResponse } from "./interfaces/IStormGlassForecastResponse";
import { IStormGlassPoint } from "./interfaces/IStormGlassPoint";
import config, { IConfig } from "config";
import * as HTTPUtil from "@src/util/request";

const stormGlassResourceConfig: IConfig = config.get(
  "App.resources.StormGlass"
);
export class StormGlass {
  readonly stormGlassAPIParams =
    "swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed";
  readonly stormGlassAPISource = "noaa";

  constructor(protected request = new HTTPUtil.Request()) {}

  public async fetchPoints(
    lat: number,
    lng: number
  ): Promise<IForecastPoint[]> {
    try {
      const response = await this.request.get<IStormGlassForecastResponse>(
        `${stormGlassResourceConfig.get(
          "apiUrl"
        )}/weather/point?lat=${lat}&lng=${lng}&params=${
          this.stormGlassAPIParams
        }&source=${this.stormGlassAPISource}`,
        {
          headers: {
            Authorization: stormGlassResourceConfig.get("apiToken"),
          },
        }
      );
      return this.normalizeResponse(response.data);
    } catch (err) {
      /**
       * This is handling the Axios errors specifically
       */
      if (HTTPUtil.Request.isRequestError(err)) {
        throw new StormGlassResponseError(
          `Error: ${JSON.stringify(err.response.data)} Code: ${
            err.response.status
          }`
        );
      }
      throw new ClientRequestError(err.message);
    }
  }
  private normalizeResponse(
    points: IStormGlassForecastResponse
  ): IForecastPoint[] {
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource],
    }));
  }

  private isValidPoint(point: Partial<IStormGlassPoint>): boolean {
    return !!(
      point.time &&
      point.swellDirection?.[this.stormGlassAPISource] &&
      point.swellHeight?.[this.stormGlassAPISource] &&
      point.swellPeriod?.[this.stormGlassAPISource] &&
      point.waveDirection?.[this.stormGlassAPISource] &&
      point.waveHeight?.[this.stormGlassAPISource] &&
      point.windDirection?.[this.stormGlassAPISource] &&
      point.windSpeed?.[this.stormGlassAPISource]
    );
  }
}
