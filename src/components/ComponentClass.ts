// eslint-disable-next-line @typescript-eslint/ban-types
import { ComponentState } from "./types";

export interface Component<State = ComponentState> {
  state: State;
  events: {
    [key: string]: (ev: Event) => void;
  };
  // constructor(el: HTMLElement, initialState?: Partial<State>);
  subscribeToEvents(): void;
  setState(patch: any): void;
  onMount(el: HTMLElement): void;
  render(): string;
}
