import { getWeather, getWeatherByClick } from "./getWeatherFuns";
import { layout, sleep, data } from "./utils";
import { addEventListenerFunc } from "./addEvenListenerFunc";

global.fetch = jest.fn();

jest.spyOn(console, "log");

it("getWeather: Promise is resolved", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ someData: "data" }),
    })
  );
  expect(await getWeather("Moscow")).toEqual({ someData: "data" });
});

it("getWeather: Promise is rejected", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.rejected("Something goes to bad way!")
  );
  await getWeather("Moscow");
  expect(console.log).toHaveBeenCalled();
});

it("Testing get weatherByClick", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  document.body.innerHTML = layout;
  document.querySelector(".list").append(document.createElement("li"));

  const liElem = document
    .querySelector(".list")
    .getElementsByTagName("li")
    .item(0);
  liElem.innerText = "No data";

  const image = document.querySelector(".cityMap");
  image.src = "No data";

  const parag = document.querySelector(".weatherInReqCity");
  parag.innerText = "No data";

  await getWeatherByClick({ target: liElem });

  expect(parag.innerText).toEqual(expect.not.stringContaining("No data"));
  expect(image.src).toEqual(expect.not.stringContaining("No data"));

  fetch.mockClear();

  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  parag.innerText = "No data";
  image.src = "No data";

  addEventListenerFunc(
    document.querySelector(".list"),
    "click",
    getWeatherByClick
  );

  liElem.click();

  await sleep(1);

  expect(parag.innerText).toEqual(expect.not.stringContaining("No data"));
  expect(image.src).toEqual(expect.not.stringContaining("No data"));
});
