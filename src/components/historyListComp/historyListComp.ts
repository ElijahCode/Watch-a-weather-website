import { Component } from "../ComponentClass";
import { ComponentState, CityListState } from "../types";
import { WEATHER_BEFORE_FIRST_DEFINE } from "../../config";
import { template } from "../../templateEngine/templateEngine";

const tpl = `{{for data as cities}}
<li> {{city}}</li>
`;

export class HistoryListComp implements Component {
  public state: CityListState = { cities: [{ city: "" }] };

  private el: HTMLElement;

  public events;

  constructor(el: HTMLElement, initialState?: CityListState) {
    this.el = el;
    initialState ? this.setState(initialState) : this.onMount(el); // eslint-disable-line no-unused-expressions
  }

  setState(newState: CityListState): void {
    this.state = newState;
    this.render();
  }

  subscribeToEvents(): void {
    Object.keys(this.events).forEach((key) => {
      const [event, elemClass] = key.split("@");
      const element = document.querySelector(`.${elemClass}`);
      element.addEventListener(event, this.events[key], true);
    });
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
