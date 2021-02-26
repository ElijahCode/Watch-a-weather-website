import {
  initStorage,
  addToStorage,
  removeFromStorage,
  readFromStorage,
} from "./workWithStorage";

describe("Testing initStorage", () => {
  it("localStorage = []", () => {
    initStorage();
    expect(localStorage.getItem("1")).toBe("[]");
  });
  it("localStorage not change", () => {
    localStorage.setItem("1", JSON.stringify(["one", "two"]));
    initStorage();
    expect(localStorage.getItem("1")).toBe(JSON.stringify(["one", "two"]));
  });
});

describe("Testing addToStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    initStorage();
  });

  it("localStorage not change", () => {
    addToStorage("");
    expect(localStorage.getItem("1")).toEqual(JSON.stringify([]));
  });

  it("localStorage contain Moscow", () => {
    addToStorage("Moscow");
    expect(localStorage.getItem("1")).toEqual(JSON.stringify(["Moscow"]));
  });
});

describe("Testing removeFromStorage", () => {
  it("localStorage must not contain Kiev", () => {
    localStorage.clear();
    initStorage();
    localStorage.setItem("1", JSON.stringify(["Kiev", "Moscow", "Minsk"]));
    removeFromStorage();
    expect(localStorage.getItem("1")).toEqual(
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
    localStorage.setItem("1", JSON.stringify(["Moscow", "Berlin"]));
    expect(readFromStorage()).toEqual(["Moscow", "Berlin"]);
  });
});
