function createParagraph(elem, data) {
  const p = document.createElement('p');

  p.innerText = data;
  if (!elem.hasChildNodes()) {
    elem.appendChild(p);
  } else {
    elem.append(p);
  }

  return p;
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

function createImgOfCityMap(elem) {
  const img = document.createElement('img');

  img.id = 'image';

  elem.append(img);
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

function changeSourceOfImage(elem, data) {
  const latitude = data.coord.lat;
  const longitude = data.coord.lon;

  const image = elem.getElementsByTagName('img').item(0);
  console.log(elem);

  const imgSource = `
  http://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=400x400&key=AIzaSyAu9cQhEoU0Uj0-GkEBnWGP_4WpRdos6LU
  `;

  image.src = imgSource;
}

async function getWeatherByClick() {
  const cityName = this.innerText;

  const weather = await getWeather(cityName);

  const data = createData(weather);

  rewriteParagraph(document.getElementById('block3'), data);
  changeSourceOfImage(document.getElementById('imageBlock'), weather);
}

function addToStorage(data) {
  for (let i = 0; i < 10; i += 1) {
    const key = localStorage.key(`${i}`);
    const value = localStorage.getItem(key);

    if (value === '') {
      localStorage.setItem(key, data);
      break;
    }
  }
}

function addCityToList(cityName) {
  const list = document.getElementById('block4');

  const paragOfList = list.getElementsByTagName('p');

  for (let i = 0; i < paragOfList.length; i += 1) {
    if (cityName === paragOfList.item(i).innerText) {
      return null;
    }
  }

  if (paragOfList.length > 9) {
    list.removeChild(paragOfList.item(0));
    localStorage.setItem('0', '');
  }

  const parag = createParagraph(list, cityName);
  parag.addEventListener('click', getWeatherByClick);

  addToStorage(cityName);
  console.log(localStorage);
  return null;
}

function initStorage() {
  if (localStorage.length > 0) {
    return null;
  }
  for (let i = 0; i < 10; i += 1) {
    localStorage.setItem(`${i}`, '');
  }
  return null;
}

async function readFromStorage() {
  if (localStorage.length === 0) {
    return null;
  }
  for (let i = 0; i < 10; i += 1) {
    const key = localStorage.key(`${i}`);
    const value = localStorage.getItem(key);

    if (value === null) {
      break;
    }

    const parag = createParagraph(document.getElementById('block4'), value);
    parag.addEventListener('click', getWeatherByClick);
  }
  return null;
}

export default async function buttonClick() {
  const cityName = getInputText('input');

  const weather = await getWeather(cityName);

  const data = createData(weather);

  rewriteParagraph(document.getElementById('block3'), data);
  addCityToList(cityName);
  changeSourceOfImage(document.getElementById('imageBlock'), weather);
}

// draw elemets and show weather in user city
initStorage();

(async function () {
  const userCity = await defineUserCity();

  const userCityWeather = await getWeather(userCity);

  const userCityData = createData(userCityWeather);

  createBlock(document.getElementById('app'), 'block1', 'prep');
  createParagraph(document.getElementById('block1'), 'Weather in your city:');
  createParagraph(document.getElementById('block1'), userCityData);
}());

// draw elements
createBlock(document.getElementById('app'), 'block2');
createParagraph(document.getElementById('block2'), 'Enter a city name:');
createInput(document.getElementById('block2'));
createButton(document.getElementById('block2'));

createBlock(document.getElementById('app'), 'block3');
createParagraph(document.getElementById('block3'), '');

createBlock(document.getElementById('app'), 'imageBlock');
createImgOfCityMap(document.getElementById('imageBlock'));

createBlock(document.getElementById('app'), 'history');
createParagraph(document.getElementById('history'), 'History of search:');

createBlock(document.getElementById('app'), 'block4');

readFromStorage();
