import { buttonClick } from "./buttonEventsFun";
import { initStorage } from "./workWithStorage";
import { addEventListenerFunc } from "./addEvenListenerFunc";
import { sleep, layout, data } from "./utils";
import { WeatherInCityComp } from "./ts/components/weatherinCityComp/weatherInCityComp";
import { HistoryListComp } from "./ts/components/historyListComp/historyListComp";

global.fetch = jest.fn();

initStorage();

document.body.innerHTML = layout;

const input = document.querySelector(".textBox");
input.value = "Moscow";

const image = document.querySelector(".cityMap");
image.src = "No data";

const changedParag = new WeatherInCityComp(
  document.querySelector(".weatherInReqCity")
);

it("Testing buttonCLick", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  input.value = "Moscow";
  changedParag.setState({ name: "no data" });
  image.src = "No data";

  const list = new HistoryListComp(document.querySelector(".list"));
  const button = document.querySelector(".button");

  addEventListenerFunc(
    button,
    "click",
    buttonClick,
    input,
    changedParag,
    list,
    image
  );

  button.click();

  await sleep(1);

  expect(changedParag.innerText).toEqual(
    expect.not.stringContaining("No data")
  );
  expect(image.src).toEqual(expect.not.stringContaining("No data"));

  jest.spyOn(console, "log");

  input.value = "";

  button.click();

  await sleep(1);

  expect(console.log).toBeCalledWith("Empty city requare!");
});
