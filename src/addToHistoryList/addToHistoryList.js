import { addToStorage, removeFirstFromStorage } from "../workWithStorage";

export function addToHistoryList(historyList, cityName) {
  for (let i = 0; i < historyList.state.cities.length; i += 1) {
    if (historyList.state.cities[i].city === cityName) {
      console.log("exit");
      return null;
    }
  }
  if (historyList.state.cities[0].city === "") {
    const newState = historyList.state;
    newState.cities[0].city = cityName;
    historyList.setState(newState);
    localStorage.clear();
    localStorage.setItem(
      "historyList",
      JSON.stringify({ cities: [{ city: cityName }] })
    );
  } else if (historyList.state.cities.length < 10) {
    const newState = historyList.state;
    newState.cities.push({ city: cityName });
    historyList.setState(newState);
    addToStorage(cityName);
  } else {
    const newState = historyList.state;
    newState.cities.shift();
    newState.cities.push({ city: cityName });
    historyList.setState(newState);
    removeFirstFromStorage();
    addToStorage(cityName);
  }
  return null;
}
