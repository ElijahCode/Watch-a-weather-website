export type WeatherState = {
  coord: { lon: number; lat: number };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
    { id: number; main: string; description: string; icon: string }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number; // eslint-disable-line camelcase
    temp_min: number; // eslint-disable-line camelcase
    temp_max: number; // eslint-disable-line camelcase
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type convertedWeatherState = {
  name: string;
  weather: string;
  temp: number;
  tempFeelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
};

export type CityListState = {
  city: string;
}[];

export type ComponentState = convertedWeatherState | CityListState | undefined;
