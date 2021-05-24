import { Component } from "../ComponentClass";
import { convertedWeatherState, eventsList } from "../types";
import { template } from "../../templateEngine/templateEngine";
import {
  WEATHER_IN_CITY_COMP_TPL,
  WEATHER_BEFORE_FIRST_DEFINE,
} from "../../config";

export class WeatherInCityComp implements Component {
  private el: HTMLElement;

  public events: eventsList = {
    defaultEvent: () => null,
  };

  public state: convertedWeatherState = WEATHER_BEFORE_FIRST_DEFINE;

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
    const result = template(WEATHER_IN_CITY_COMP_TPL, this.state);
    this.el.innerHTML = result;
    return result;
  }
}
