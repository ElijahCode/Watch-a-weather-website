import { addToStorage, removeFromStorage } from "./workWithStorage";

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

  const imgSource = `http://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=400x400&key=AIzaSyAu9cQhEoU0Uj0-GkEBnWGP_4WpRdos6LU`;

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

  if (membersOfList.length > 9) {
    parentElem.removeChild(membersOfList.item(0));
    removeFromStorage();
  }

  const li = document.createElement("li");
  li.innerText = cityName; // накинуть листенер
  parentElem.append(li);

  addToStorage(cityName);

  return null;
}
