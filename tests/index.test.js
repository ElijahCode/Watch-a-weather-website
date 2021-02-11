import {
  createParagraph,
  createInput,
  createButton,
  createBlock,
  createImgOfCityMap,
  getInputText,
  rewriteParagraph,
  changeSourceOfImage,
  addToStorage,
  addCityToList,
  initStorage,
  createData,
  readFromStorage,
} from "../src/index";

describe("Test functions that drawning page", () => {
  const parentNode = document.createElement("div");
  parentNode.id = "app";

  document.body.append(parentNode);

  createBlock(parentNode, "test1", "prep");

  it("parentNode must contain a div block with id test1", () => {
    expect(parentNode.getElementsByTagName("div").item(0).id).toBe("test1");
  });

  createBlock(parentNode, "test2");

  it("parentNode must contain a 2 div block", () => {
    expect(parentNode.getElementsByTagName("div").length).toBe(2);
  });

  const block1 = parentNode.getElementsByTagName("div").item(0);

  createParagraph(block1, "Test message");

  it('div with id test1 must contain paragraph with innerText: "Test message"', () => {
    expect(block1.getElementsByTagName("p").item(0).innerText).toBe(
      "Test message"
    );
  });

  createButton(block1);

  it("div must contain button", () => {
    expect(block1.getElementsByTagName("button").item(0).innerText).toBe(
      "Show weather"
    );
  });

  createInput(block1);
  const input = block1.getElementsByTagName("input").item(0);

  it("div must contain input", () => {
    expect(input).toBeTruthy();
  });

  createImgOfCityMap(block1);

  it("div must contain image", () => {
    expect(block1.getElementsByTagName("img").item(0)).toBeTruthy();
  });

  const parentNode2 = document.createElement("div");
  document.body.append(parentNode2);

  createBlock(parentNode2, "block4");

  const block4 = document.getElementById("block4");
  addCityToList("Test");

  it("block4 must contain p with innerNext = Test", () => {
    expect(block4.getElementsByTagName("p").item(0).innerText).toBe("Test");
  });

  addCityToList("Test");

  it("block4 must contain 1 <p> elem", () => {
    expect(block4.getElementsByTagName("p").length).toBe(1);
  });

  createBlock(parentNode2, "block5");

  const block5 = document.getElementById("block5");

  for (let i = 0; i < 20; i += 1) {
    addCityToList(`Test${i}`, block5.id);
  }

  it("block5 must contain 10 <p> elem", () => {
    expect(block5.getElementsByTagName("p").length).toBe(10);
  });
});

describe("Testing functions that change inner parametrs of page elements", () => {
  const parentNode = document.createElement("div");

  document.body.append(parentNode);

  const input = document.createElement("input");

  parentNode.append(input);

  input.id = "textbox";
  input.value = "Test message";

  it('getInputText("textbox") -> Test message', () => {
    expect(getInputText("textbox")).toBe("Test message");
  });

  const parag = document.createElement("p");
  parag.innerText = "Message1";

  parentNode.append(parag);

  rewriteParagraph(parentNode, "Message2");

  it("parag.innerText -> Message2", () => {
    expect(parag.innerText).toBe("Message2");
  });

  const image = document.createElement("img");
  image.src = "15";

  parentNode.append(image);

  const testData = {
    coord: {
      lat: 15,
      lon: 45,
    },
  };

  changeSourceOfImage(parentNode, testData);

  const result =
    `http://maps.googleapis.com/maps/api/staticmap?center=${testData.coord.lat},` +
    `${testData.coord.lon}&zoom=10&size=400x400&key=AIzaSyAu9cQhEoU0Uj0-` +
    "GkEBnWGP_4WpRdos6LU";

  it("image.src must change", () => {
    expect(image.src).toEqual(result);
  });

  describe("Test createData func", () => {
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

  describe("Test work with storage", () => {
    localStorage.clear();

    initStorage();

    it("localStorage.length = 10", () => {
      expect(localStorage.length).toBe(10);
    });

    const values = Object.values(localStorage);
    const valuesSum = values.reduce((acc, curr) => acc + curr);

    it('Sum values of member -> ""', () => {
      expect(valuesSum).toBe("");
    });

    addToStorage("Samara");

    it("localStorage.getItem(0) -> Samara", () => {
      expect(localStorage.getItem(0)).toBe("Samara");
    });

    const block = document.createElement("div");
    block.id = "block";
    document.body.append(block);

    readFromStorage("block");

    it("block p elem -> 6", () => {
      expect(block.getElementsByTagName("p").length).toBe(10);
    });

    it("1st p in block -> Samara", () => {
      expect(block.getElementsByTagName("p").item(0).innerText).toBe("Samara");
    });
  });
});
