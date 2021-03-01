import { createData } from "./formingData";
import { defineUserCity } from "./defineUserCityFun";
import { getWeather, getWeatherByClick } from "./getWeatherFuns";
import { buttonClick } from "./buttonEventsFun";
import { changeSourceOfImage, rewriteParagraph } from "./workWithHTML";
import { initStorage, readFromStorage } from "./workWithStorage";
import { addEventListenerFunc } from "./addEvenListenerFunc";
import "./css/style.css";

if (
  localStorage.length > 0 &&
  !localStorage.getItem("historyList").includes("[")
) {
  localStorage.clear();
}

if (localStorage.length === 0) {
  initStorage();
}

const inputElem = document.querySelector(".textbox");
const paragElem = document.querySelector(".weatherInReqCity");
const listElem = document.querySelector(".historyList");
const imageElem = document.querySelector(".cityMap");

addEventListenerFunc(
  document.querySelector("button"),
  "click",
  buttonClick,
  inputElem,
  paragElem,
  listElem,
  imageElem
);

const historyList = readFromStorage();

if (historyList.lenght !== 0) {
  historyList.map((elem) => {
    const li = document.createElement("li");
    li.innerText = elem;
    listElem.append(li);
    return elem;
  });
}

addEventListenerFunc(
  document.querySelector(".historyList"),
  "click",
  getWeatherByClick
);

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
