export function createData(inputData) {
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
