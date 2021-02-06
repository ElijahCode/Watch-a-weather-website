function createParagraph(elem, data) {
  const p = document.createElement('p');

  p.innerText = data;

  elem.append(p);
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
    Humidity:${inputData.main.humidity},
    Atmospheric pressure: ${inputData.main.pressure} Pa,
    Wind speed: ${inputData.wind.speed} m/s`;

  return data;
}

// draw elemets and show weather in user city

(async function () {
  const userCity = await defineUserCity();

  const userCityWeather = await getWeather(userCity);

  const userCityData = createData(userCityWeather);

  createParagraph(document.getElementById('app'), userCityData);
}());
