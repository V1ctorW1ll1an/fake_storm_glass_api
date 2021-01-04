import { StormGlass } from "@src/clients/stormGlass";
import { IBeach } from "./interfaces/IBeach";
import { IBeachForecast } from "./interfaces/IBeachForecast";

export class Forecast {
  constructor(protected stormGlass = new StormGlass()) {}

  public async processForecastForBeaches(
    beaches: IBeach[]
  ): Promise<IBeachForecast[]> {
    const pointsWithCorrectSources: IBeachForecast[] = [];

    for (const beach of beaches) {
      const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);
      const enrichedBeachData = points.map((e) => {
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

      pointsWithCorrectSources.push(...enrichedBeachData);
    }

    return pointsWithCorrectSources;
  }
}
