import {
  initStorage,
  addToStorage,
  removeFromStorage,
  readFromStorage,
} from "./workWithStorage";

describe("Testing initStorage", () => {
  it("localStorage = []", () => {
    initStorage();
    expect(localStorage.getItem("historyList")).toBe("[]");
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
      JSON.stringify(["Moscow"])
    );
  });
});

describe("Testing removeFromStorage", () => {
  it("localStorage must not contain Kiev", () => {
    localStorage.clear();
    initStorage();
    localStorage.setItem(
      "historyList",
      JSON.stringify(["Kiev", "Moscow", "Minsk"])
    );
    removeFromStorage();
    expect(localStorage.getItem("historyList")).toEqual(
      JSON.stringify(["Moscow", "Minsk"])
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
    localStorage.setItem("historyList", JSON.stringify(["Moscow", "Berlin"]));
    expect(readFromStorage()).toEqual(["Moscow", "Berlin"]);
  });
});
