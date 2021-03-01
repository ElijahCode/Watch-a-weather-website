import { buttonClick } from "./buttonEventsFun";

import { initStorage } from "./workWithStorage";

import { addEventListenerFunc } from "./addEvenListenerFunc";

import { sleep, layout, data } from "./utils";

global.fetch = jest.fn();

it("Testing buttonClick", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  initStorage();

  document.body.innerHTML = layout;

  const input = document.querySelector(".textBox");
  input.value = "Moscow";

  const image = document.querySelector(".cityMap");
  image.src = "No data";

  const changedParag = document.querySelector(".weatherInReqCity");
  changedParag.innerText = "No data";

  const result = await buttonClick(
    input,
    changedParag,
    document.querySelector(".list"),
    image
  );

  expect(changedParag.innerText).toEqual(
    expect.not.stringContaining("No data")
  );
  expect(image.src).toEqual(expect.not.stringContaining("No data"));

  input.value = "";

  expect(result).toBeFalsy();

  fetch.mockClear();

  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );

  input.value = "Moscow";
  changedParag.innerText = "No data";
  image.src = "No data";

  const list = document.querySelector(".list");
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
});
