import { dataConverter } from "./dataConverter";
import { data } from "../utils";
import { WeatherState } from "../components/types";

describe("Test dataConverter", () => {
  it("Must return valid data", () => {
    const inputData = data as WeatherState;
    const result = {
      name: "Moscow",
      weather: "Drizzle",
      temp: 269.48,
      tempFeelsLike: 262.71,
      humidity: 93,
      pressure: 1011,
      windSpeed: 6,
    };
    expect(dataConverter(inputData)).toEqual(result);
  });
});
