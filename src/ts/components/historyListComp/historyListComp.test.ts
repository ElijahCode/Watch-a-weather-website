import { HistoryListComp } from "./historyListComp";
import { eventsList } from "../types";

describe("Testing BasicComponent class", () => {
  const list = document.createElement("ol");
  document.body.append(list);
  list.classList.add("testList");
  const component = new HistoryListComp(list);
  it("Have basic state", () => {
    expect(component.state).toEqual({ cities: [{ city: "" }] });
  });
  it("Check hook onMount", () => {
    expect(list.innerHTML).toBe("");
  });
  it("Can change state", () => {
    component.setState({ cities: [{ city: "Moscow" }] });
    expect(component.state.cities[0].city).toBe("Moscow");
  });
  it("Have event property", () => {
    const events: eventsList = {
      click: () => component.setState({ cities: [{ city: "Volgograd" }] }),
    };
    component.events = events;
    expect(component.events).toEqual(events);
  });
  it("Can add eventlisteners", () => {
    const events: eventsList = {
      "click@testList": () =>
        component.setState({ cities: [{ city: "Volgograd" }] }),
    };
    component.events = events;
    component.subscribeToEvents();
    list.click();

    expect(component.state).toEqual({ cities: [{ city: "Volgograd" }] });
  });
  it("Render method test", () => {
    component.setState({
      cities: [{ city: "Volgograd" }, { city: "London" }, { city: "Madrid" }],
    });
    const result = `<li> Volgograd</li>\n<li> London</li>\n<li> Madrid</li>\n`;
    expect(component.render()).toBe(result);
    expect(list.innerHTML).toBe(result);
  });
});