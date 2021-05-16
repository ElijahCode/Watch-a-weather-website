import {
  getInputText,
  rewriteParagraph,
  changeSourceOfImage,
  addCityToHistoryList,
} from "./workWithHTML";
import { initStorage } from "./workWithStorage";
import { layout } from "./utils";

describe("Testing getInputText", () => {
  it("Return Test", () => {
    document.body.innerHTML = layout;
    document.querySelector(".textBox").value = "Test";

    expect(getInputText(document.querySelector(".textBox"))).toBe("Test");
  });
});

describe("Testing rewriteParagraph", () => {
  it("Must be equal Some text 2", () => {
    document.body.innerHTML = layout;

    const parag = document.getElementsByTagName("p").item(0);
    parag.innerText = "Some text";

    rewriteParagraph(parag, "Some text 2");
    expect(parag.innerText).toBe("Some text 2");
  });
});

describe("Testing changeSourceOfImage", () => {
  it("Source must change", () => {
    document.body.innerHTML = layout;

    const testData = {
      coord: {
        lat: 15,
        lon: 45,
      },
    };

    const result = `https://static-maps.yandex.ru/1.x/?ll=${testData.coord.lon},${testData.coord.lat}&size=400,400&z=12&l=map&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99`;

    const img = document.querySelector(".cityMap");
    img.src = "someSource";
    changeSourceOfImage(img, testData);
    expect(img.src).toBe(result);
  });
});

describe("Testing addCityToHistoryList", () => {
  initStorage();
  document.body.innerHTML = layout;

  it("list.length must be 1", () => {
    const list = document.querySelector(".list");
    addCityToHistoryList("Moscow", list);

    expect(list.getElementsByTagName("li").length).toBe(1);
  });

  it("list length must be 10 or less", () => {
    const list = document.querySelector(".list");
    const cities = [
      "Moscow",
      "Paris",
      "Berlin",
      "Samara",
      "Saratov",
      "Tver",
      "Perm",
      "Gamburg",
      "Novgorod",
    ];

    cities.map((elem) => {
      const li = document.createElement("li");
      li.innerText = elem;
      list.append(li);
      return elem;
    });

    addCityToHistoryList("Leon", list);

    expect(list.getElementsByTagName("li").length).toBeLessThanOrEqual(10);
  });

  it('list.item(9).innerText = "Leon"', () => {
    localStorage.clear();
    initStorage();

    const list = document.querySelector(".list");
    const cities = [
      "Moscow",
      "Paris",
      "Berlin",
      "Samara",
      "Saratov",
      "Tver",
      "Perm",
      "Gamburg",
      "Novgorod",
    ];

    cities.map((elem) => {
      const li = document.createElement("li");
      li.innerText = elem;
      list.append(li);
      return elem;
    });

    addCityToHistoryList("Leon", list);

    expect(list.getElementsByTagName("li").item(9).innerText).toBe("Leon");
  });
});
