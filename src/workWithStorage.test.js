import {
  initStorage,
  addToStorage,
  removeFromStorage,
  readFromStorage,
} from "./workWithStorage";

describe("Testing initStorage", () => {
  it("localStorage = {cities: []}", () => {
    initStorage();
    expect(JSON.parse(localStorage.getItem("historyList"))).toEqual({
      cities: [],
    });
  });
});

describe("Testing addToStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    initStorage();
  });

  it("localStorage contain Moscow", () => {
    addToStorage("Moscow");
    expect(localStorage.getItem("historyList")).toEqual(
      JSON.stringify({ cities: [{ city: "Moscow" }] })
    );
  });
});

describe("Testing removeFromStorage", () => {
  it("localStorage must not contain Kiev", () => {
    localStorage.clear();
    initStorage();
    localStorage.setItem(
      "historyList",
      JSON.stringify({
        cities: [{ city: "Kiev" }, { city: "Moscow" }, { city: "Minsk" }],
      })
    );
    removeFromStorage();
    expect(localStorage.getItem("historyList")).toEqual(
      JSON.stringify({ cities: [{ city: "Moscow" }, { city: "Minsk" }] })
    );
  });
});

describe("Testing readFromStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("Return null", () => {
    expect(readFromStorage()).toBeNull();
  });

  it('Return ["Moscow", "Berlin"]', () => {
    localStorage.setItem(
      "historyList",
      JSON.stringify({ cities: [{ city: "Moscow" }, { city: "Berlin" }] })
    );
    expect(readFromStorage()).toEqual({
      cities: [{ city: "Moscow" }, { city: "Berlin" }],
    });
  });
});
