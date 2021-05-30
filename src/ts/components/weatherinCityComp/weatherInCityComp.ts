import { Component } from "../ComponentClass";
import { convertedWeatherState, eventsList } from "../types";
import { template } from "../../templateEngine/templateEngine";

export class WeatherInCityComp implements Component {
  public events: eventsList;

  public state: convertedWeatherState;

  public onMountFlag;

  private el: HTMLElement;

  private weatherInCityCompTPL = `In {{name}} now is\n{{weather}},\nTemperature: {{temp}} C,\nTemperature is feels like: {{tempFeelsLike}} C,\nHumidity:{{humidity}}%,\nAtmospheric pressure: {{pressure}} Pa,\nWind speed: {{windSpeed}} m/s`;

  private defaultWeather = {
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

  private defaultEvents = {
    defaultEvent: () => null,
  };

  constructor(el: HTMLElement, initialState?: Partial<convertedWeatherState>) {
    this.el = el;
    this.state = this.defaultWeather;
    if (initialState) {
      this.setState(initialState);
    } else {
      this.setState(this.defaultWeather);
    }
    this.events = this.defaultEvents;
    this.onMountFlag = false;
    this.onMount(el);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  subscribeToEvents(): void {
    Object.keys(this.events).forEach((key) => {
      const [event, elemClass] = key.split("@");
      const element = document.querySelector(`.${elemClass}`) as HTMLElement;
      element.addEventListener(event, this.events[key]);
    });
  }

  setState(newState: Partial<convertedWeatherState>): void {
    Object.keys(newState).forEach((key) => {
      this.state[key] = newState[key];
    });
    this.render();
  }

  onMount(el: HTMLElement): void {
    this.onMountFlag = true;
  }

  render(): string {
    const result = template(this.weatherInCityCompTPL, this.state);
    this.el.innerHTML = result;
    return result;
  }
}
