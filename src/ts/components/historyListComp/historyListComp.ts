import { BasicComponent } from "../ComponentClass";
import { CityListState, eventsList } from "../types";

export class HistoryListComp extends BasicComponent {
  public state: CityListState;

  protected defaultState: CityListState;

  constructor(el: HTMLElement, initialState?: CityListState) {
    super(el, initialState);

    this.el = el;
    this.defaultState = {
      cities: [{ city: "" }],
    };
    this.defaultEvents = {
      defaultEvent: () => null,
    };
    this.defaultTemplate = `{{for data as cities}}\n<li> {{city}}</li>`;

    this.state = this.defaultState;
    if (initialState) {
      this.state = initialState;
      this.setState(this.state);
    } else {
      this.state = this.defaultState;
      this.setState(this.state);
    }
    this.events = this.defaultEvents;
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
}
