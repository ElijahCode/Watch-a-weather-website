// eslint-disable-next-line @typescript-eslint/ban-types
import { ComponentState, eventsList } from "./types";

export abstract class BasicComponent {
  public state: ComponentState;

  public events: eventsList;

  public onMountFlag: boolean;

  protected el: HTMLElement;

  protected defaultState: { [key: string]: any };

  protected defaultTemplate: string;

  protected defaultEvents: {
    [key: string]: () => null;
  };

  abstract setState(newState: Partial<ComponentState>): void;

  public subscribeToEvents(): void {
    Object.keys(this.events).forEach((key) => {
      const [event, elemClass] = key.split("@");
      const element = document.querySelector(`.${elemClass}`) as HTMLElement;
      element.addEventListener(event, this.events[key], true);
    });
  }

  constructor(el: HTMLElement, initialState?: ComponentState) {
    this.el = el;
    this.defaultState = {};
    this.defaultTemplate = "";
    this.defaultEvents = {
      defaultEvent: () => null,
    };
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

  protected onMount(el: HTMLElement): void {
    this.onMountFlag = true;
  }

  protected template(tpl: string, data: { [key: string]: any }): string {
    return tpl
      .replace(
        /{{if (\w+)}}\n?([a-zA-Z0-9{}<>"#!.,/= ]{1,})\n?{{endif}}/gm,
        (_: unknown, variable: string, replaceString: string) =>
          data[variable] ? replaceString : ""
      )
      .replace(
        /{{for \w+ as (\w+)}}\n?([a-zA-Z0-9{}()<>"#!.,/= ]{1,})\n?(_{{isFirst ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?\n?(_{{isLast ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?/g,
        (
          inputString: string,
          listKey: string,
          listItemTemplate: string,
          ...firstLastItemInstr: string[]
        ) => {
          let resultString = "";
          let firstIndex: string;
          let lastIndex: string;
          /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
          if (/isFirst/.test(firstLastItemInstr[0])) {
            firstIndex = firstLastItemInstr[1]; // eslint-disable-line prefer-destructuring
            lastIndex = firstLastItemInstr[3]; // eslint-disable-line prefer-destructuring
          } else if (
            /isLast/.test(firstLastItemInstr[0]) ||
            firstLastItemInstr[3]
          ) {
            lastIndex = firstLastItemInstr[3]; // eslint-disable-line prefer-destructuring
          }
          // eslint-disable-next-line @typescript-eslint/ban-types
          data[listKey].forEach((el: object, index: number) => {
            let listItemTemplateClone: string;
            if (index === 0 && firstIndex !== undefined) {
              listItemTemplateClone = /{{index}}/g.test(firstIndex)
                ? firstIndex.replace(/{{index}}/g, `${1 + index}`)
                : firstIndex;
            } else if (
              index === data[listKey].length - 1 &&
              lastIndex !== undefined
            ) {
              listItemTemplateClone = /{{index}}/g.test(lastIndex)
                ? lastIndex.replace(/{{index}}/g, `${1 + index}`)
                : lastIndex;
            } else {
              listItemTemplateClone = /{{index}}/g.test(listItemTemplate)
                ? listItemTemplate.replace(/{{index}}/g, `${1 + index}`)
                : listItemTemplate;
            }
            resultString += /\n/g.test(inputString)
              ? `${this.template(listItemTemplateClone, el)}\n`
              : this.template(listItemTemplateClone, el);
          });
          return resultString;
        }
      )
      .replace(/{{(\w+)}}/g, (_: unknown, paramName: string) =>
        data[paramName] ? data[paramName] : ""
      );
  }

  protected render(): string {
    const result = this.template(
      this.defaultTemplate,
      this.state as { [key: string]: any }
    );
    this.el.innerHTML = result;
    return result;
  }
}
