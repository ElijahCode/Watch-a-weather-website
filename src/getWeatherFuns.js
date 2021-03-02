import { createData } from "./formingData";
import { rewriteParagraph, changeSourceOfImage } from "./workWithHTML";

export async function getWeather(cityName) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`;

    const response = await fetch(url);
    const jsonData = await response.json();

    return jsonData;
  } catch (err) {
    return console.log("Can not downoload weather data!");
  }
}

export async function getWeatherByClick(element) {
  const cityName = element.target.innerText;

  const weather = await getWeather(cityName);

  const data = createData(weather);

  const paragElem = document.querySelector(".weatherInReqCity");
  const imageElem = document.querySelector(".cityMap");

  rewriteParagraph(paragElem, data);
  changeSourceOfImage(imageElem, weather);
}
