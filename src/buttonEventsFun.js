import { createData } from "./formingData";
import {
  addCityToHistoryList,
  changeSourceOfImage,
  getInputText,
  rewriteParagraph,
} from "./workWithHTML";
import { getWeather } from "./getWeatherFuns";

export async function buttonClick(inputElem, paragElem, listElem, imageElem) {
  const cityName = getInputText(inputElem);

  if (cityName === "") {
    return false;
  }

  const weather = await getWeather(cityName);

  const data = createData(weather);

  rewriteParagraph(paragElem, data);
  addCityToHistoryList(cityName, listElem);
  changeSourceOfImage(imageElem, weather);

  return null;
}
