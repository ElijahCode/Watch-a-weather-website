import {
  getWeather,
  defineUserCity,
  getWeatherByClick,
  buttonClick,
} from "./index";
import { initStorage } from "./workWithStorage";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

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
  expect(console.log).toHaveBeenCalled();
});

const data = {
  coord: { lon: 37.6156, lat: 55.7522 },
  weather: [
    {
      id: 300,
      main: "Drizzle",
      description: "light intensity drizzle",
      icon: "09d",
    },
    { id: 701, main: "Mist", description: "mist", icon: "50d" },
  ],
  base: "stations",
  main: {
    temp: 269.48,
    feels_like: 262.71,
    temp_min: 269.15,
    temp_max: 270.15,
    pressure: 1011,
    humidity: 93,
  },
  visibility: 3300,
  wind: { speed: 6, deg: 240 },
  clouds: { all: 90 },
  dt: 1614236456,
  sys: {
    type: 1,
    id: 9027,
    country: "RU",
    sunrise: 1614227447,
    sunset: 1614264886,
  },
  timezone: 10800,
  id: 524901,
  name: "Moscow",
  cod: 200,
};

it("Testing get weatherByClick", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  document.body.innerHTML = `
    <div class = 'listBlock'>
        <ol class = 'list'>
            <li>
        </ol>
    </div>
    <div class = 'requaredCity'>
        <img class = 'cityMap'>
        <p>
    </div>
    `;

  const liElem = document
    .querySelector(".list")
    .getElementsByTagName("li")
    .item(0);
  liElem.innerText = "No data";

  const image = document.querySelector(".cityMap");
  image.src = "No data";

  const parag = document
    .querySelector(".requaredCity")
    .getElementsByTagName("p")
    .item(0);
  parag.innerText = "No data";

  await getWeatherByClick({ target: liElem });

  expect(parag.innerText).toEqual(expect.not.stringContaining("No data"));
  expect(image.src).toEqual(expect.not.stringContaining("No data"));
});

it("Testing getweatherByClick with eventListener", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  document.body.innerHTML = `
    <div class = 'listBlock'>
        <ol class = 'list'>
            <li>
        </ol>
    </div>
    <div class = 'requaredCity'>
        <img class = 'cityMap'>
        <p>
    </div>
    `;

  document
    .querySelector(".list")
    .addEventListener("click", getWeatherByClick, true);

  const liElem = document
    .querySelector(".list")
    .getElementsByTagName("li")
    .item(0);
  liElem.innerText = "Moscow";

  const image = document.querySelector(".cityMap");
  image.src = "No data";

  const parag = document
    .querySelector(".requaredCity")
    .getElementsByTagName("p")
    .item(0);
  parag.innerText = "No data";

  liElem.click();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(1);

  expect(parag.innerText).toEqual(expect.not.stringContaining("No data"));
  expect(image.src).toEqual(expect.not.stringContaining("No data"));
});

it("Testing buttonClick", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  initStorage();

  document.body.innerHTML = `
    <div class = 'listBox'>
        <ol class = 'list'></ol>
    </div>
    <div class = 'requaredCity'>
        <input tupe = "text" class = "textBox">
        <img class = 'cityMap'>
        <p><p>
    </div>`;

  const input = document.querySelector(".textBox");
  input.value = "Moscow";

  const image = document.querySelector(".cityMap");
  image.src = "No data";

  const changedParag = document
    .querySelector(".requaredCity")
    .getElementsByTagName("p")
    .item(0);
  changedParag.innerText = "No data";

  await buttonClick(
    input,
    changedParag,
    document.querySelector(".list"),
    image
  );

  expect(changedParag.innerText).toEqual(
    expect.not.stringContaining("No data")
  );
  expect(image.src).toEqual(expect.not.stringContaining("No data"));
});

it("Testing buttonClick with EventListener", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  initStorage();

  document.body.innerHTML = `
    <div class = 'listBox'>
        <ol class = 'list'></ol>
    </div>
    <div class = 'requaredCity'>
        <input tupe = "text" class = "textBox">
        <img class = 'cityMap'>
        <button class ='button'></button>
        <p><p>
    </div>`;

  const list = document.querySelector(".list");

  const input = document.querySelector(".textBox");
  input.value = "Moscow";

  const image = document.querySelector(".cityMap");
  image.src = "No data";

  const button = document.querySelector(".button");

  const changedParag = document
    .querySelector(".requaredCity")
    .getElementsByTagName("p")
    .item(0);
  changedParag.innerText = "No data";

  button.addEventListener(
    "click",
    buttonClick.bind(null, input, changedParag, list, image)
  );

  async function sleep(ms) {
    return new Promise((resolve) => setInterval(resolve, ms));
  }

  button.click();

  await sleep(1);

  expect(changedParag.innerText).toEqual(
    expect.not.stringContaining("No data")
  );
  expect(image.src).toEqual(expect.not.stringContaining("No data"));
});
