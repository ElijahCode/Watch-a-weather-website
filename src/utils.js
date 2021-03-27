export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const layout = `
    <div class = 'listBox'>
        <ol class = 'list'></ol>
    </div>
    <div class = 'requaredCity'>
        <input class = 'textBox' type = "text">
        <img class = 'cityMap'>
        <button class ='button'></button>
        <p class = 'weatherInReqCity'></p>
    </div>
`;

export const data = {
  coord: { lon: 37.6156, lat: 55.7522 },
  weather: [
    {
      id: 300,
      main: "Drizzle",
      description: "light intensity drizzle",
      icon: "09d",
    },
    { id: 701, main: "Mist", description: "mist", icon: "50d" },
  ],
  base: "stations",
  main: {
    temp: 269.48,
    feels_like: 262.71,
    temp_min: 269.15,
    temp_max: 270.15,
    pressure: 1011,
    humidity: 93,
  },
  visibility: 3300,
  wind: { speed: 6, deg: 240 },
  clouds: { all: 90 },
  dt: 1614236456,
  sys: {
    type: 1,
    id: 9027,
    country: "RU",
    sunrise: 1614227447,
    sunset: 1614264886,
  },
  timezone: 10800,
  id: 524901,
  name: "Moscow",
  cod: 200,
};
