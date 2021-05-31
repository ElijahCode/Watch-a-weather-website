import { addToStorage, removeFirstFromStorage } from "./workWithStorage";
import { HISTORY_LIST_LENGTH, mapSize } from "./config";

export function getInputText(elem) {
  const text = elem.value;
  return text;
}

export function rewriteParagraph(elem, data) {
  const parag = elem;
  parag.innerText = data;
}

export function changeSourceOfImage(elem, data) {
  const latitude = data.coord.lat;
  const longitude = data.coord.lon;

  const image = elem;

  const imgSource = `https://static-maps.yandex.ru/1.x/?ll=${longitude},${latitude}&size=${mapSize.height},${mapSize.width}&z=12&l=map&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99`;
  image.src = imgSource;
}

export function addCityToHistoryList(cityName, parentElem) {
  const membersOfList = parentElem.getElementsByTagName("li");
  if (
    Array.from(membersOfList).filter((elem) => elem.innerText === cityName)
      .length > 0
  ) {
    return null;
  }

  if (membersOfList.length > HISTORY_LIST_LENGTH) {
    parentElem.removeChild(membersOfList.item(0));
    removeFirstFromStorage();
  }

  const li = document.createElement("li");
  li.innerText = cityName;
  parentElem.append(li);

  addToStorage(cityName);

  return null;
}
