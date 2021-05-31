import { defineUserCity } from "./defineUserCityFun";
import { getWeather, getWeatherByClick } from "./getWeatherFuns";
import { buttonClick } from "./buttonEventsFun";
import { changeSourceOfImage } from "./workWithHTML";
import { initStorage, readFromStorage } from "./workWithStorage";
import { addEventListenerFunc } from "./addEvenListenerFunc";
import { WeatherInCityComp } from "./ts/components/weatherinCityComp/weatherInCityComp";
import { HistoryListComp } from "./ts/components/historyListComp/historyListComp";
import { dataConverter } from "./ts/dataConverter/dataConverter";
import "./css/style.css";

if (localStorage.length === 0) {
  initStorage();
}

const userCityParagraph = new WeatherInCityComp(
  document.querySelector(".weatherInUserCity")
);

const requearedCityParagraph = new WeatherInCityComp(
  document.querySelector(".weatherInReqCity")
);

const historyList = new HistoryListComp(document.querySelector(".historyList"));

const inputElem = document.querySelector(".textbox");
const imageElem = document.querySelector(".cityMap");

addEventListenerFunc(
  document.querySelector("button"),
  "click",
  buttonClick,
  inputElem,
  requearedCityParagraph,
  historyList,
  imageElem
);

const historyListInStorage = readFromStorage();
if (historyListInStorage.cities[0].city !== "") {
  historyList.setState(historyListInStorage);
}
historyList.events = {
  "click@historyList": getWeatherByClick,
};

historyList.subscribeToEvents();

addEventListenerFunc(
  document.querySelector(".historyList"),
  "click",
  getWeatherByClick
);

(async function () {
  const userCity = await defineUserCity();

  const userCityWeather = await getWeather(userCity);

  const userCityData = dataConverter(userCityWeather);

  userCityParagraph.setState(userCityData);

  changeSourceOfImage(document.querySelector(".cityMap"), userCityWeather);
})();
