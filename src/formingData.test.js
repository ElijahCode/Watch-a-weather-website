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
