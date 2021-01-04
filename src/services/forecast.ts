import { IForecastPoint } from "@src/clients/interfaces/IForecastPoint";
import { StormGlass } from "@src/clients/stormGlass";
import { ForecastProcessingInternalError } from "./errors/forecastProcessingInternalError";
import { IBeach } from "./interfaces/IBeach";
import { IBeachForecast } from "./interfaces/IBeachForecast";
import { ITimeForecast } from "./interfaces/ITimeForecast";

export class Forecast {
  constructor(protected stormGlass = new StormGlass()) {}

  public async processForecastForBeaches(
    beaches: IBeach[]
  ): Promise<ITimeForecast[]> {
    try {
      const pointsWithCorrectSources: IBeachForecast[] = [];

      for (const beach of beaches) {
        const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);

        const enrichedBeachData = this.enrichedBeachData(points, beach);

        pointsWithCorrectSources.push(...enrichedBeachData);
      }

      return this.mapForecastByTime(pointsWithCorrectSources);
    } catch (error) {
      throw new ForecastProcessingInternalError(error.message);
    }
  }

  private enrichedBeachData(
    points: IForecastPoint[],
    beach: IBeach
  ): IBeachForecast[] {
    return points.map((e) => {
      return {
        ...{
          lat: beach.lat,
          lng: beach.lng,
          name: beach.name,
          position: beach.position,
          rating: 1,
        },
        ...e,
      };
    });
  }

  private mapForecastByTime(forecast: IBeachForecast[]): ITimeForecast[] {
    const forecastByTime: ITimeForecast[] = [];

    for (const point of forecast) {
      const timePoint = forecastByTime.find((f) => f.time === point.time);

      if (timePoint) {
        timePoint.forecast.push(point);
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        });
      }
    }

    return forecastByTime;
  }
}
