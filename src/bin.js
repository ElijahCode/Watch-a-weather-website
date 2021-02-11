import {
  createParagraph,
  createInput,
  createButton,
  createBlock,
  createImgOfCityMap,
  getWeather,
  defineUserCity,
  createData,
  initStorage,
  readFromStorage,
} from "./index";

// draw elemets and show weather in user city
initStorage();

(async function () {
  const userCity = await defineUserCity();

  const userCityWeather = await getWeather(userCity);

  const userCityData = createData(userCityWeather);

  createBlock(document.getElementById("app"), "block1", "prep");
  createParagraph(document.getElementById("block1"), "Weather in your city:");
  createParagraph(document.getElementById("block1"), userCityData);
})();

// draw elements
createBlock(document.getElementById("app"), "block2");
createParagraph(document.getElementById("block2"), "Enter a city name:");
createInput(document.getElementById("block2"));
createButton(document.getElementById("block2"));

createBlock(document.getElementById("app"), "block3");
createParagraph(document.getElementById("block3"), "");

createBlock(document.getElementById("app"), "imageBlock");
createImgOfCityMap(document.getElementById("imageBlock"));

createBlock(document.getElementById("app"), "history");
createParagraph(document.getElementById("history"), "History of search:");

createBlock(document.getElementById("app"), "block4");

readFromStorage("block4");
