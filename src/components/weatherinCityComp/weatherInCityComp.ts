import { Component } from "../ComponentClass";
import { ComponentState, convertedWeatherState } from "../types";
import { WEATHER_BEFORE_FIRST_DEFINE } from "../../config";
import { template } from "../../templateEngine/templateEngine";

const tpl = `In {{name}} now is
{{weather}},
Temperature: {{temp}} C,
Temperature is feels like: {{tempFeelsLike}} C,
Humidity:{{humidity}}%,
Atmospheric pressure: {{pressure}} Pa,
Wind speed: {{windSpeed}} m/s`;

export class WeatherInCityComp implements Component {
  private el: HTMLElement;

  state: convertedWeatherState = WEATHER_BEFORE_FIRST_DEFINE as convertedWeatherState;

  public events;

  constructor(el: HTMLElement, initialState?: Partial<ComponentState>) {
    this.el = el;
    initialState ? this.setState(initialState) : this.onMount(el); // eslint-disable-line no-unused-expressions
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  subscribeToEvents(): void {
    Object.keys(this.events).forEach((key) => {
      const [event, elemClass] = key.split("@");
      const element = document.querySelector(`.${elemClass}`);
      element.addEventListener(event, this.events[key]);
    });
  }

  setState(newState: Partial<ComponentState>): void {
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
