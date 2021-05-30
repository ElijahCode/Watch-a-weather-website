import { Component } from "../ComponentClass";
import { CityListState, eventsList } from "../types";
import { template } from "../../templateEngine/templateEngine";

export class HistoryListComp implements Component {
  public state: CityListState;

  public events: eventsList;

  public onMountFlag;

  private el: HTMLElement;

  private cityListDefaultValue = {
    cities: [{ city: "" }],
  };

  private eventsDefualtValue = {
    defaultEvent: () => null,
  };

  private template = `{{for data as cities}}\n<li> {{city}}</li>`;

  constructor(el: HTMLElement, initialState?: CityListState) {
    this.el = el;
    if (initialState) {
      this.state = initialState;
      this.setState(this.state);
    } else {
      this.state = this.cityListDefaultValue;
      this.setState(this.state);
    }
    this.events = this.eventsDefualtValue;
    this.onMountFlag = false;
    this.onMount(el);
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
    this.onMountFlag = true;
  }

  render(): string {
    const result = template(this.template, this.state);
    this.el.innerHTML = result;
    return result;
  }
}
