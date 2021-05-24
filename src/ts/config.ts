import { convertedWeatherState } from "./components/types";

export const HISTORY_LIST_TPL = `{{for data as cities}}
<li> {{city}}</li>
`;

export const WEATHER_IN_CITY_COMP_TPL = `In {{name}} now is
{{weather}},
Temperature: {{temp}} C,
Temperature is feels like: {{tempFeelsLike}} C,
Humidity:{{humidity}}%,
Atmospheric pressure: {{pressure}} Pa,
Wind speed: {{windSpeed}} m/s`;

export const WEATHER_BEFORE_FIRST_DEFINE: convertedWeatherState = {
  weather: "",
  base: "",
  temp: 0,
  tempFeelsLike: 0,
  pressure: 0,
  humidity: 0,
  visibility: 0,
  windSpeed: 0,
  name: "",
};
