import { AxiosStatic } from "axios";
import { IForecastPoint } from "./interfaces/IForecastPoint";
import { IStormGlassForecastResponse } from "./interfaces/IStormGlassForecastResponse";
import { IStormGlassPoint } from "./interfaces/IStormGlassPoint";

export class StormGlass {
  readonly stormglassAPIParams =
    "swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection, windSpeed";

  readonly stormGlassAPISource = "noaa";

  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(
    lat: number,
    lng: number
  ): Promise<IForecastPoint[]> {
    const response = await this.request.get<IStormGlassForecastResponse>(
      "https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormglassAPISource}&end=1592113802&lat=${lat}&lng=${lng}",
      {
        headers: {
          Authorization: "fake-token",
        },
      }
    );

    return this.normalizeResponse(response.data);
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
