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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ buttonClick)\n/* harmony export */ });\nfunction createParagraph(elem, data) {\n  const p = document.createElement('p');\n\n  p.innerText = data;\n  if (!elem.hasChildNodes()) {\n    elem.appendChild(p);\n  } else {\n    elem.append(p);\n  }\n\n  return p;\n}\n\nfunction createInput(elem) {\n  const input = document.createElement('input');\n\n  input.type = 'text';\n  input.id = 'input';\n\n  elem.append(input);\n}\n\nfunction createButton(elem) {\n  const button = document.createElement('button');\n\n  button.innerHTML = `\n  <button onclick = 'buttonClick()'>\n  Show weather\n  </button>\n  `;\n\n  elem.append(button);\n}\n\nfunction createBlock(elem, id, flag = 'app') {\n  const div = document.createElement('div');\n\n  div.id = id;\n\n  if (flag === 'app') {\n    elem.append(div);\n  } else if (flag === 'prep') {\n    elem.prepend(div);\n  }\n}\n\nfunction createImgOfCityMap(elem) {\n  const img = document.createElement('img');\n\n  img.id = 'image';\n\n  elem.append(img);\n}\n\nasync function getWeather(cityName) {\n  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`;\n\n  const response = await fetch(url);\n  const jsonData = await response.json();\n\n  return jsonData;\n}\n\nasync function defineUserCity() {\n  const url = 'https://get.geojs.io/v1/ip/geo.json';\n\n  const response = await fetch(url);\n  const jsonData = await response.json();\n\n  return jsonData.city;\n}\n\nfunction createData(inputData) {\n  const data = `\n    In ${inputData.name} now is \n    ${inputData.weather[0].main},\n    Temperature: ${inputData.main.temp} C,\n    Temperature is feels like: ${inputData.main.feels_like} C,\n    Humidity:${inputData.main.humidity}%,\n    Atmospheric pressure: ${inputData.main.pressure} Pa,\n    Wind speed: ${inputData.wind.speed} m/s`;\n\n  return data;\n}\n\nfunction getInputText(elemId) {\n  const text = document.getElementById(elemId).value;\n  return text;\n}\n\nfunction rewriteParagraph(elem, data, position = 0) {\n  const parag = elem.getElementsByTagName('p').item(position);\n  parag.innerText = data;\n}\n\nfunction changeSourceOfImage(elem, data) {\n  const latitude = data.coord.lat;\n  const longitude = data.coord.lon;\n\n  const image = elem.getElementsByTagName('img').item(0);\n  console.log(elem);\n\n  const imgSource = `\n  http://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=400x400&key=AIzaSyAu9cQhEoU0Uj0-GkEBnWGP_4WpRdos6LU\n  `;\n\n  image.src = imgSource;\n}\n\nasync function getWeatherByClick() {\n  const cityName = this.innerText;\n\n  const weather = await getWeather(cityName);\n\n  const data = createData(weather);\n\n  rewriteParagraph(document.getElementById('block3'), data);\n  changeSourceOfImage(document.getElementById('imageBlock'), weather);\n}\n\nfunction addToStorage(data) {\n  for (let i = 0; i < 10; i += 1) {\n    const key = localStorage.key(`${i}`);\n    const value = localStorage.getItem(key);\n\n    if (value === '') {\n      localStorage.setItem(key, data);\n      break;\n    }\n  }\n}\n\nfunction addCityToList(cityName) {\n  const list = document.getElementById('block4');\n\n  const paragOfList = list.getElementsByTagName('p');\n\n  for (let i = 0; i < paragOfList.length; i += 1) {\n    if (cityName === paragOfList.item(i).innerText) {\n      return null;\n    }\n  }\n\n  if (paragOfList.length > 9) {\n    list.removeChild(paragOfList.item(0));\n    localStorage.setItem('0', '');\n  }\n\n  const parag = createParagraph(list, cityName);\n  parag.addEventListener('click', getWeatherByClick);\n\n  addToStorage(cityName);\n  console.log(localStorage);\n  return null;\n}\n\nfunction initStorage() {\n  if (localStorage.length > 0) {\n    return null;\n  }\n  for (let i = 0; i < 10; i += 1) {\n    localStorage.setItem(`${i}`, '');\n  }\n  return null;\n}\n\nasync function readFromStorage() {\n  if (localStorage.length === 0) {\n    return null;\n  }\n  for (let i = 0; i < 10; i += 1) {\n    const key = localStorage.key(`${i}`);\n    const value = localStorage.getItem(key);\n\n    if (value === null) {\n      break;\n    }\n\n    const parag = createParagraph(document.getElementById('block4'), value);\n    parag.addEventListener('click', getWeatherByClick);\n  }\n  return null;\n}\n\nasync function buttonClick() {\n  const cityName = getInputText('input');\n\n  const weather = await getWeather(cityName);\n\n  const data = createData(weather);\n\n  rewriteParagraph(document.getElementById('block3'), data);\n  addCityToList(cityName);\n  changeSourceOfImage(document.getElementById('imageBlock'), weather);\n}\n\n// draw elemets and show weather in user city\ninitStorage();\n\n(async function () {\n  const userCity = await defineUserCity();\n\n  const userCityWeather = await getWeather(userCity);\n\n  const userCityData = createData(userCityWeather);\n\n  createBlock(document.getElementById('app'), 'block1', 'prep');\n  createParagraph(document.getElementById('block1'), 'Weather in your city:');\n  createParagraph(document.getElementById('block1'), userCityData);\n}());\n\n// draw elements\ncreateBlock(document.getElementById('app'), 'block2');\ncreateParagraph(document.getElementById('block2'), 'Enter a city name:');\ncreateInput(document.getElementById('block2'));\ncreateButton(document.getElementById('block2'));\n\ncreateBlock(document.getElementById('app'), 'block3');\ncreateParagraph(document.getElementById('block3'), '');\n\ncreateBlock(document.getElementById('app'), 'imageBlock');\ncreateImgOfCityMap(document.getElementById('imageBlock'));\n\ncreateBlock(document.getElementById('app'), 'history');\ncreateParagraph(document.getElementById('history'), 'History of search:');\n\ncreateBlock(document.getElementById('app'), 'block4');\n\nreadFromStorage();\n\n\n//# sourceURL=webpack://homework4/./src/index.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;