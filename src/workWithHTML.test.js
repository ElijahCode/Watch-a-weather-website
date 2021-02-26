import {
  getInputText,
  rewriteParagraph,
  changeSourceOfImage,
  addCityToHistoryList,
} from "./workWithHTML";
import { initStorage } from "./workWithStorage";

describe("Testing getInputText", () => {
  it("Return Test", () => {
    document.body.innerHTML = `
            <input type = 'text' class = 'textbox'>
        `;
    document.querySelector(".textbox").value = "Test";

    expect(getInputText(document.querySelector(".textbox"))).toBe("Test");
  });
});

describe("Testing rewriteParagraph", () => {
  it("Must be equal Some text 2", () => {
    document.body.innerHTML = `
            <div class = 'textblock'>
                <p></p>
            </div>`;

    const container = document.querySelector(".textblock");
    const parag = container.getElementsByTagName("p").item(0);
    parag.innerText = "Some text";

    rewriteParagraph(parag, "Some text 2");
    expect(parag.innerText).toBe("Some text 2");
  });
});

describe("Testing changeSourceOfImage", () => {
  it("Source must change", () => {
    document.body.innerHTML = `
        <div class = 'textblock'>
            <img class = 'cityMap'>
        </div>`;

    const testData = {
      coord: {
        lat: 15,
        lon: 45,
      },
    };

    const result =
      `http://maps.googleapis.com/maps/api/staticmap?center=${testData.coord.lat},` +
      `${testData.coord.lon}&zoom=10&size=400x400&key=AIzaSyAu9cQhEoU0Uj0-` +
      "GkEBnWGP_4WpRdos6LU";

    const img = document.querySelector(".cityMap");
    img.src = "someSource";
    changeSourceOfImage(img, testData);
    expect(img.src).toBe(result);
  });
});

describe("Testing addCityToHistoryList", () => {
  initStorage();
  it("list.length must be 1", () => {
    document.body.innerHTML = `
        <div class = 'listBlock'>
            <ol class = 'list'>
                <li>
            </ol>;
        </div>`;

    const list = document.querySelector(".list");
    list.getElementsByTagName("li").item(0).innerText = "Moscow";

    addCityToHistoryList("Moscow", list);

    expect(list.getElementsByTagName("li").length).toBe(1);
  });

  it("list length must be 10 or less", () => {
    document.body.innerHTML = `
        <div class = 'listBlock'>
            <ol class = 'list'></ol>;
        </div>`;

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
      "Kursk",
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

    document.body.innerHTML = `
        <div class = 'listBlock'>
            <ol class = 'list'></ol>;
        </div>`;

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
