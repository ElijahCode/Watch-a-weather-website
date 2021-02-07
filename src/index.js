function createParagraph(elem, data) {
  const p = document.createElement('p');

  p.innerText = data;
  if (!elem.hasChildNodes()) {
    elem.appendChild(p);
  } else {
    elem.append(p);
  }
}

function createInput(elem) {
  const input = document.createElement('input');

  input.type = 'text';
  input.id = 'input';

  elem.append(input);
}

function createButton(elem) {
  const button = document.createElement('button');

  button.innerHTML = `
  <button onclick = 'buttonClick()'>
  Show weather
  </button>
  `;

  elem.append(button);
}

function createBlock(elem, id, flag = 'app') {
  const div = document.createElement('div');

  div.id = id;

  if (flag === 'app') {
    elem.append(div);
  } else if (flag === 'prep') {
    elem.prepend(div);
  }
}

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=29322a2e1ecf125b380cfcee03239f35&units=metric`;

  const response = await fetch(url);
  const jsonData = await response.json();

  return jsonData;
}

async function defineUserCity() {
  const url = 'https://get.geojs.io/v1/ip/geo.json';

  const response = await fetch(url);
  const jsonData = await response.json();

  return jsonData.city;
}

function createData(inputData) {
  const data = `
    In ${inputData.name} now is 
    ${inputData.weather[0].main},
    Temperature: ${inputData.main.temp} C,
    Temperature is feels like: ${inputData.main.feels_like} C,
    Humidity:${inputData.main.humidity}%,
    Atmospheric pressure: ${inputData.main.pressure} Pa,
    Wind speed: ${inputData.wind.speed} m/s`;

  return data;
}

function getInputText(elemId) {
  const text = document.getElementById(elemId).value;
  return text;
}

function rewriteParagraph(elem, data, position = 0) {
  const parag = elem.getElementsByTagName('p').item(position);
  parag.innerText = data;
}

export default async function buttonClick() {
  const cityName = getInputText('input');

  const weather = await getWeather(cityName);

  const data = createData(weather);

  rewriteParagraph(document.getElementById('block3'), data);
}

// draw elemets and show weather in user city
(async function () {
  const userCity = await defineUserCity();

  const userCityWeather = await getWeather(userCity);

  const userCityData = createData(userCityWeather);

  createBlock(document.getElementById('app'), 'block1', 'prep');
  createParagraph(document.getElementById('block1'), userCityData);
}());

// draw elements
createBlock(document.getElementById('app'), 'block2');

createParagraph(document.getElementById('block2'), 'Enter a city name:');
createInput(document.getElementById('block2'));
createButton(document.getElementById('block2'));

createBlock(document.getElementById('app'), 'block3');
createParagraph(document.getElementById('block3'), '');
