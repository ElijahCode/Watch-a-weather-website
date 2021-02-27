import { createData } from "./formingData";
import {
  defineUserCity,
  getWeather,
  buttonClick,
  getWeatherByClick,
} from "./asyncFun";
import { changeSourceOfImage, rewriteParagraph } from "./workWithHTML";
import { initStorage, readFromStorage } from "./workWithStorage";
import "./css/style.css";

initStorage();

const inputElem = document.querySelector(".textbox");
const paragElem = document
  .querySelector(".requaredCity")
  .getElementsByTagName("p")
  .item(0);
const listElem = document.querySelector(".historyList");
const imageElem = document.querySelector(".cityMap");

document
  .querySelector(".button")
  .addEventListener(
    "click",
    buttonClick.bind(null, inputElem, paragElem, listElem, imageElem)
  );

const historyList = readFromStorage();

// draw history list
if (historyList.lenght !== 0) {
  historyList.map((elem) => {
    const li = document.createElement("li");
    li.innerText = elem;
    document.querySelector(".historyList").append(li);
    return elem;
  });
}

document
  .querySelector(".historyList")
  .addEventListener("click", getWeatherByClick, true);

// show weather in user city
(async function () {
  const userCity = await defineUserCity();

  const userCityWeather = await getWeather(userCity);

  const userCityData = createData(userCityWeather);

  rewriteParagraph(
    document.querySelector(".userCityBlock").getElementsByTagName("p").item(0),
    userCityData
  );
  changeSourceOfImage(document.querySelector(".cityMap"), userCityWeather);
})();
