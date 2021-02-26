import { createData } from "./formingData";

describe("Testing createData", () => {
  const inputData = {
    name: "Moscow",
    weather: [{ main: "Sunny" }],
    main: {
      temp: 25,
      feels_like: 20,
      humidity: 50,
      pressure: 990,
    },
    wind: { speed: 3 },
  };

  /* {
      "coord":{"lon":37.6156,"lat":55.7522},
      "weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],
      "base":"stations",
      "main":{"temp":3.83,"feels_like":-2.42,"temp_min":3,"temp_max":4.44,"pressure":1004,"humidity":100},
      "visibility":1800,
      "wind":{"speed":7,"deg":230},"clouds":{"all":90},"dt":1614318271,
      "sys":{"type":1,"id":9027,"country":"RU","sunrise":1614313700,"sunset":1614351414},
      "timezone":10800,
      "id":524901,
      "name":"Moscow",
      "cod":200
    } */

  const resultData = `
    In Moscow now is 
    Sunny,
    Temperature: 25 C,
    Temperature is feels like: 20 C,
    Humidity:50%,
    Atmospheric pressure: 990 Pa,
    Wind speed: 3 m/s`;

  it("createData(inputData) -> result", () => {
    expect(createData(inputData)).toEqual(resultData);
  });
});
