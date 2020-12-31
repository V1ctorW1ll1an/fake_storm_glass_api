import supertest from "supertest";
import fakeForecast from "../../src/fake_service/forecast.json";

describe("Beach forecast functional tests", () => {
  it("Should return a forecast with just a few times", async () => {
    const { body, status } = await supertest(app).get("/forecast");

    expect(status).toBe(200);

    expect(body).toBe(fakeForecast);
  });
});
