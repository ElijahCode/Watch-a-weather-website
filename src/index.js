import { createData } from "./formingData";
import {
  addCityToHistoryList,
  changeSourceOfImage,
  getInputText,
  rewriteParagraph,
} from "./workWithHTML";

export async function getWeather(cityName) {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`;

    const response = await fetch(URL);
    const jsonData = await response.json();

    return jsonData;
  } catch (err) {
    return console.log("Can not downoload weather data!");
  }
}

export async function defineUserCity() {
  try {
    const URL = "https://get.geojs.io/v1/ip/geo.json";

    const response = await fetch(URL);
    const jsonData = await response.json();

    return jsonData.city;
  } catch (err) {
    return console.log("Can not downoload data about your city!");
  }
}

export async function getWeatherByClick(element) {
  const cityName = element.target.innerText;

  const weather = await getWeather(cityName);

  const data = createData(weather);

  const paragElem = document
    .querySelector(".requaredCity")
    .getElementsByTagName("p")
    .item(0);
  const imageElem = document.querySelector(".cityMap");

  rewriteParagraph(paragElem, data);
  changeSourceOfImage(imageElem, weather);
}

export async function buttonClick(inputElem, paragElem, listElem, imageElem) {
  const cityName = getInputText(inputElem);

  const weather = await getWeather(cityName);

  const data = createData(weather);

  rewriteParagraph(paragElem, data);
  addCityToHistoryList(cityName, listElem);
  changeSourceOfImage(imageElem, weather);
}
