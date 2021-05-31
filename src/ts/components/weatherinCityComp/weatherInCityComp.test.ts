import { WeatherInCityComp } from "./weatherInCityComp";
import { convertedWeatherState, eventsList } from "../types";

const defaultWeather: convertedWeatherState = {
  weather: "",
  base: "",
  temp: 0,
  tempFeelsLike: 0,
  pressure: 0,
  humidity: 0,
  visibility: 0,
  windSpeed: 0,
  name: "",
};

describe("Testing BasicComponent class", () => {
  const divBlock = document.createElement("div");
  document.body.append(divBlock);
  divBlock.classList.add("testBlock");
  const component = new WeatherInCityComp(divBlock);
  it("Have basic state", () => {
    expect(component.state).toStrictEqual(defaultWeather);
  });
  it("Check hook onMount", () => {
    expect(component.onMountFlag).toBeTruthy();
  });
  it("Can change state", () => {
    component.setState({ name: "Moscow" });
    expect(component.state.name).toBe("Moscow");
  });
  it("Have event property", () => {
    const events: eventsList = {
      click: () => component.setState({ name: "Volgograd" }),
    };
    component.events = events;
    expect(component.events).toStrictEqual(events);
  });
  it("Can add eventlisteners", () => {
    const events: eventsList = {
      "click@testBlock": () => component.setState({ name: "Volgograd" }),
    };
    component.events = events;
    component.subscribeToEvents();
    divBlock.click();

    expect(component.state.name).toBe("Volgograd");
  });
  it("Render method test", () => {
    const inputData: convertedWeatherState = {
      name: "Moscow",
      weather: "Sunny",
      temp: 25,
      tempFeelsLike: 20,
      humidity: 50,
      pressure: 990,
      windSpeed: 3,
    };
    const result = `In Moscow now is\nSunny,\nTemperature: 25 C,\nTemperature is feels like: 20 C,\nHumidity:50%,\nAtmospheric pressure: 990 Pa,\nWind speed: 3 m/s`;
    component.setState(inputData);
    expect(divBlock.innerHTML).toBe(result);
  });
});
