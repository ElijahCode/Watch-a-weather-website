/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./compiled/index.js":
/*!***************************!*\
  !*** ./compiled/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.createParagraph = createParagraph;\nexports.createInput = createInput;\nexports.createBlock = createBlock;\nexports.createImgOfCityMap = createImgOfCityMap;\nexports.getWeather = getWeather;\nexports.defineUserCity = defineUserCity;\nexports.createData = createData;\nexports.getInputText = getInputText;\nexports.rewriteParagraph = rewriteParagraph;\nexports.changeSourceOfImage = changeSourceOfImage;\nexports.getWeatherByClick = getWeatherByClick;\nexports.addToStorage = addToStorage;\nexports.addCityToList = addCityToList;\nexports.initStorage = initStorage;\nexports.readFromStorage = readFromStorage;\nexports.default = buttonClick;\nexports.createButton = createButton;\n\nfunction createParagraph(elem, data) {\n  const p = document.createElement('p');\n  p.innerText = data;\n\n  if (!elem.hasChildNodes()) {\n    elem.appendChild(p);\n  } else {\n    elem.append(p);\n  }\n\n  return p;\n}\n\nfunction createInput(elem) {\n  const input = document.createElement('input');\n  input.type = 'text';\n  input.id = 'input';\n  elem.append(input);\n}\n\nfunction createBlock(elem, id, flag = 'app') {\n  const div = document.createElement('div');\n  div.id = id;\n\n  if (flag === 'app') {\n    elem.append(div);\n  } else if (flag === 'prep') {\n    elem.prepend(div);\n  }\n}\n\nfunction createImgOfCityMap(elem) {\n  const img = document.createElement('img');\n  img.id = 'image';\n  elem.append(img);\n}\n\nasync function getWeather(cityName) {\n  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`;\n  const response = await fetch(url);\n  const jsonData = await response.json();\n  return jsonData;\n}\n\nasync function defineUserCity() {\n  const url = 'https://get.geojs.io/v1/ip/geo.json';\n  const response = await fetch(url);\n  const jsonData = await response.json();\n  return jsonData.city;\n}\n\nfunction createData(inputData) {\n  const data = `\n    In ${inputData.name} now is \n    ${inputData.weather[0].main},\n    Temperature: ${inputData.main.temp} C,\n    Temperature is feels like: ${inputData.main.feels_like} C,\n    Humidity:${inputData.main.humidity}%,\n    Atmospheric pressure: ${inputData.main.pressure} Pa,\n    Wind speed: ${inputData.wind.speed} m/s`;\n  return data;\n}\n\nfunction getInputText(elemId) {\n  const text = document.getElementById(elemId).value;\n  return text;\n}\n\nfunction rewriteParagraph(elem, data, position = 0) {\n  const parag = elem.getElementsByTagName('p').item(position);\n  parag.innerText = data;\n}\n\nfunction changeSourceOfImage(elem, data) {\n  const latitude = data.coord.lat;\n  const longitude = data.coord.lon;\n  const image = elem.getElementsByTagName('img').item(0);\n  const imgSource = `http://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=400x400&key=AIzaSyAu9cQhEoU0Uj0-GkEBnWGP_4WpRdos6LU`;\n  image.src = imgSource;\n}\n\nasync function getWeatherByClick() {\n  const cityName = this.innerText;\n  const weather = await getWeather(cityName);\n  const data = createData(weather);\n  rewriteParagraph(document.getElementById('block3'), data);\n  changeSourceOfImage(document.getElementById('imageBlock'), weather);\n}\n\nfunction addToStorage(data) {\n  for (let i = 0; i < 10; i += 1) {\n    const key = localStorage.key(`${i}`);\n    const value = localStorage.getItem(key);\n\n    if (value === '') {\n      localStorage.setItem(key, data);\n      break;\n    }\n  }\n}\n\nfunction addCityToList(cityName, blockId = 'block4') {\n  const list = document.getElementById(blockId);\n  const paragOfList = list.getElementsByTagName('p');\n\n  for (let i = 0; i < paragOfList.length; i += 1) {\n    if (cityName === paragOfList.item(i).innerText) {\n      return null;\n    }\n  }\n\n  if (paragOfList.length > 9) {\n    list.removeChild(paragOfList.item(0));\n    localStorage.setItem('0', '');\n  }\n\n  const parag = createParagraph(list, cityName);\n  parag.addEventListener('click', getWeatherByClick);\n  addToStorage(cityName);\n  return null;\n}\n\nfunction initStorage() {\n  if (localStorage.length > 0) {\n    return null;\n  }\n\n  for (let i = 0; i < 10; i += 1) {\n    localStorage.setItem(`${i}`, '');\n  }\n\n  return null;\n}\n\nasync function readFromStorage(blockId) {\n  if (localStorage.length === 0) {\n    return null;\n  }\n\n  for (let i = 0; i < 10; i += 1) {\n    const key = localStorage.key(`${i}`);\n    const value = localStorage.getItem(key);\n\n    if (value === null) {\n      break;\n    }\n\n    const parag = createParagraph(document.getElementById(blockId), value);\n    parag.addEventListener('click', getWeatherByClick);\n  }\n\n  return null;\n}\n\nasync function buttonClick() {\n  const cityName = getInputText('input');\n  const weather = await getWeather(cityName);\n  const data = createData(weather);\n  rewriteParagraph(document.getElementById('block3'), data);\n  addCityToList(cityName);\n  changeSourceOfImage(document.getElementById('imageBlock'), weather);\n}\n\nfunction createButton(elem) {\n  const button = document.createElement('button');\n  button.innerText = 'Show weather';\n  button.addEventListener('click', buttonClick);\n  elem.append(button);\n}\n\n//# sourceURL=webpack://homework4/./compiled/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*************************!*\
  !*** ./compiled/bin.js ***!
  \*************************/
eval("\n\nvar _index = __webpack_require__(/*! ./index */ \"./compiled/index.js\");\n\n// draw elemets and show weather in user city\n(0, _index.initStorage)();\n\n(async function () {\n  const userCity = await (0, _index.defineUserCity)();\n  const userCityWeather = await (0, _index.getWeather)(userCity);\n  const userCityData = (0, _index.createData)(userCityWeather);\n  (0, _index.createBlock)(document.getElementById('app'), 'block1', 'prep');\n  (0, _index.createParagraph)(document.getElementById('block1'), 'Weather in your city:');\n  (0, _index.createParagraph)(document.getElementById('block1'), userCityData);\n})(); // draw elements\n\n\n(0, _index.createBlock)(document.getElementById('app'), 'block2');\n(0, _index.createParagraph)(document.getElementById('block2'), 'Enter a city name:');\n(0, _index.createInput)(document.getElementById('block2'));\n(0, _index.createButton)(document.getElementById('block2'));\n(0, _index.createBlock)(document.getElementById('app'), 'block3');\n(0, _index.createParagraph)(document.getElementById('block3'), '');\n(0, _index.createBlock)(document.getElementById('app'), 'imageBlock');\n(0, _index.createImgOfCityMap)(document.getElementById('imageBlock'));\n(0, _index.createBlock)(document.getElementById('app'), 'history');\n(0, _index.createParagraph)(document.getElementById('history'), 'History of search:');\n(0, _index.createBlock)(document.getElementById('app'), 'block4');\n(0, _index.readFromStorage)('block4');\n\n//# sourceURL=webpack://homework4/./compiled/bin.js?");
})();

/******/ })()
;