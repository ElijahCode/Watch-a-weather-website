import { changeSourceOfImage, getInputText } from "./workWithHTML";
import { getWeather } from "./getWeatherFuns";
import { dataConverter } from "./ts/dataConverter/dataConverter";
import { addToHistoryList } from "./addToHistoryList/addToHistoryList";

export async function buttonClick(
  inputElem,
  requearedCityParagraph,
  historyList,
  imageElem
) {
  const cityName = getInputText(inputElem);

  if (cityName === "") {
    return console.log("Empty city requare!");
  }

  const weather = await getWeather(cityName);

  const data = dataConverter(weather);
  requearedCityParagraph.setState(data);
  addToHistoryList(historyList, cityName);
  changeSourceOfImage(imageElem, weather);

  return null;
}
