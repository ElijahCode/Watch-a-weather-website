import { changeSourceOfImage, getInputText } from "./workWithHTML";
import { getWeather } from "./getWeatherFuns";
import { dataConverter } from "./dataConverter/dataConverter";
import { addToStorage, removeFromStorage } from "./workWithStorage";
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
  // if(historyList.state.cities[0].city === ''){
  //   const newState = historyList.state;
  //   newState.cities[0].city = cityName
  //   historyList.setState(newState);
  //   localStorage.clear();
  //   localStorage.setItem("historyList", JSON.stringify({ cities: [{city: cityName}] }));
  // } else if (historyList.state.cities.length < 10) {
  //   const newState = historyList.state;
  //   newState.cities.push({city: cityName})
  //   historyList.setState(newState);
  //   addToStorage(cityName);
  // } else {
  //   const newState = historyList.state;
  //   newState.cities.shift();
  //   newState.cities.push({city: cityName})
  //   historyList.setState(newState)
  //   removeFromStorage();
  //   addToStorage(cityName);
  // }

  changeSourceOfImage(imageElem, weather);

  return null;
}
