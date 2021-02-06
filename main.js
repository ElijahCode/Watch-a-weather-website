/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("function createParagraph(elem, data) {\n  const p = document.createElement('p');\n\n  p.innerText = data;\n\n  elem.append(p);\n}\n\nasync function getWeather(cityName) {\n  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`;\n  const response = await fetch(url);\n\n  const jsonData = await response.json();\n\n  return jsonData;\n}\n\nasync function defineUserCity() {\n  const url = 'https://get.geojs.io/v1/ip/geo.json';\n\n  const response = await fetch(url);\n\n  const jsonData = await response.json();\n\n  return jsonData.city;\n}\n\nfunction createData(inputData) {\n  const data = `\n    In ${inputData.name} now is \n    ${inputData.weather[0].main},\n    Temperature: ${inputData.main.temp} C,\n    Temperature is feels like: ${inputData.main.feels_like} C,\n    Humidity:${inputData.main.humidity},\n    Atmospheric pressure: ${inputData.main.pressure} Pa,\n    Wind speed: ${inputData.wind.speed} m/s`;\n\n  return data;\n}\n\n// draw elemets and show weather in user city\n\n(async function () {\n  const userCity = await defineUserCity();\n\n  const userCityWeather = await getWeather(userCity);\n\n  const userCityData = createData(userCityWeather);\n\n  createParagraph(document.getElementById('app'), userCityData);\n}());\n\n\n//# sourceURL=webpack://homework4/./src/index.js?");
/******/ })()
;