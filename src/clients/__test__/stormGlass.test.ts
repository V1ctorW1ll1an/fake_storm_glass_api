import { StormGlass } from "@src/clients/stormGlass";
import axios from "axios";
import stormGlassWeather3HoursFixtures from "@test/fixtures/stormGlass_weather_3_hours.json";
import stormGlassNormalized3HoursFixture from "@test/fixtures/stormglass_normalized_response_3_hours.json";

jest.mock("axios");

describe("StormGlass client", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it("Should return the normalized forecast from the stormGlass service", async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    // pegar a instancia mockada e retornar o objeto vazio na requisição
    mockedAxios.get.mockResolvedValue({
      data: stormGlassWeather3HoursFixtures,
    });

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });
});
