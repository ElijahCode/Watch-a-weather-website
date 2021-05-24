import { Component } from "../ComponentClass";
import { CityListState, eventsList } from "../types";
import { template } from "../../templateEngine/templateEngine";
import {
  HISTORY_LIST_TPL,
  CITY_LIST_DEFAULT_VALUE,
  EVENTS_DEFAULT_VALUE,
} from "../../config";

export class HistoryListComp implements Component {
  public state: CityListState;

  private el: HTMLElement;

  public events: eventsList;

  constructor(el: HTMLElement, initialState?: CityListState) {
    this.state = CITY_LIST_DEFAULT_VALUE;
    this.events = EVENTS_DEFAULT_VALUE;
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
      const element = document.querySelector(`.${elemClass}`) as HTMLElement;
      element.addEventListener(event, this.events[key], true);
    });
  }

  onMount(el: HTMLElement): void {
    this.el.innerHTML = this.el.innerHTML; // eslint-disable-line no-self-assign
  }

  render(): string {
    const result = template(HISTORY_LIST_TPL, this.state);
    this.el.innerHTML = result;
    return result;
  }
}
