import { Component } from "../ComponentClass";
import { ComponentState, convertedWeatherState, eventsList } from "../types";
import { template } from "../../templateEngine/templateEngine";

const tpl = `In {{name}} now is
{{weather}},
Temperature: {{temp}} C,
Temperature is feels like: {{tempFeelsLike}} C,
Humidity:{{humidity}}%,
Atmospheric pressure: {{pressure}} Pa,
Wind speed: {{windSpeed}} m/s`;

const WEATHER_BEFORE_FIRST_DEFINE = {
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

export class WeatherInCityComp implements Component {
  private el: HTMLElement;

  public state: convertedWeatherState = WEATHER_BEFORE_FIRST_DEFINE as convertedWeatherState;

  public events: eventsList = {
    defaultEvent: () => null,
  };

  constructor(el: HTMLElement, initialState?: Partial<convertedWeatherState>) {
    this.el = el;
    initialState ? this.setState(initialState) : this.onMount(el); // eslint-disable-line no-unused-expressions
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
    this.render();
  }

  render(): string {
    const result = template(tpl, this.state);
    this.el.innerHTML = result;
    return result;
  }
}
