import { defineUserCity } from "./defineUserCityFun";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

jest.spyOn(console, "log");

it("defineUserCity: Promise is resolved", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ city: "Moscow" }),
    })
  );
  expect(await defineUserCity()).toEqual("Moscow");
});

it("defineUserCity: Promise is rejected", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.rejected("Something goes to bad way!")
  );
  await defineUserCity();
  expect(console.log).toHaveBeenCalledWith(
    "Can not downoload data about your city!"
  );
});
