import { BasicComponent } from "../ComponentClass";
import { convertedWeatherState, eventsList } from "../types";

export class WeatherInCityComp extends BasicComponent {
  public state: convertedWeatherState;

  protected defaultState: convertedWeatherState;

  constructor(el: HTMLElement, initialState?: Partial<convertedWeatherState>) {
    super(el, initialState);

    this.el = el;
    this.defaultTemplate = `In {{name}} now is\n{{weather}},\nTemperature: {{temp}} C,\nTemperature is feels like: {{tempFeelsLike}} C,\nHumidity:{{humidity}}%,\nAtmospheric pressure: {{pressure}} Pa,\nWind speed: {{windSpeed}} m/s`;
    this.defaultState = {
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
    this.defaultEvents = {
      defaultEvent: () => null,
    };
    this.state = this.defaultState;

    if (initialState) {
      this.setState(initialState);
    } else {
      this.setState(this.defaultState);
    }
    this.events = this.defaultEvents;
    this.onMountFlag = false;
    this.onMount(el);
  }

  setState(newState: Partial<convertedWeatherState>): void {
    Object.keys(newState).forEach((key) => {
      this.state[key] = newState[key];
    });
    this.render();
  }
}
