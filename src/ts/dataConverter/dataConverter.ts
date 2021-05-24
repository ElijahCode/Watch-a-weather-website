import { WeatherState, convertedWeatherState } from "../components/types";

export function dataConverter(inputData: WeatherState): convertedWeatherState {
  return {
    name: inputData.name,
    weather: inputData.weather[0].main,
    temp: inputData.main.temp,
    tempFeelsLike: inputData.main.feels_like,
    humidity: inputData.main.humidity,
    pressure: inputData.main.pressure,
    windSpeed: inputData.wind.speed,
  };
}
