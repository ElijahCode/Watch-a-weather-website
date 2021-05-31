import { template } from "./templateEngine";

type testData = {
  NAME: string;
  AGE: string;
  TEAM: string;
  items: { A: number; B: number }[];
  author: undefined | string;
  isRendering: boolean;
};

const data: testData = {
  NAME: "Bob",
  AGE: "18",
  TEAM: "Core",
  items: [
    { A: 1, B: 2 },
    { A: 11, B: 22 },
    { A: 111, B: 222 },
  ],
  author: undefined,
  isRendering: false,
};

const complexTestTemplate =
  "<h3>From {{sender}}</h3>\n<h3>What are we need buy</h3>\n{{if eventName}}<h3>to {{eventName}}</h3>{{endif}}\n<div>\n{{for data as products}}\n<p>{{index}}. {{product}}</p>_{{isFirst <p>{{index}}. {{product}}(important)</p>}}_{{isLast <p>{{index}}. {{product}}(not important)</p>}}</div>\n{{if reminder}}<h3>Dont forget it</h3>{{endif}}";
const complexTestResult = `<h3>From Mom</h3>\n<h3>What are we need buy</h3>\n<h3>to dinner</h3>\n<div>\n<p>1. Cheese(important)</p>\n<p>2. Meat</p>\n<p>3. Bread(not important)</p>\n</div>\n<h3>Dont forget it</h3>`;
const complexTestData = {
  sender: `Mom`,
  eventName: `dinner`,
  products: [{ product: `Cheese` }, { product: `Meat` }, { product: "Bread" }],
  reminder: true,
};

describe("template", () => {
  describe("basic data placing", () => {
    it("puts data into placeholders", () => {
      expect(template("Hi, {{NAME}}", data)).toBe("Hi, Bob");
    });

    it("puts empty string into placeholders in no data provided", () => {
      expect(template("Hi, {{NAME}} {{SURNAME}}", data)).toBe("Hi, Bob ");
    });

    it("replaces all placeholders", () => {
      expect(template("Hi, {{NAME}}. My name is {{NAME}} too", data)).toBe(
        "Hi, Bob. My name is Bob too"
      );
    });
  });

  describe("conditional rendering", () => {
    it("Variable type is string. Not rendering", () => {
      expect(template("{{if author}}<h3>{{author}}</h3>{{endif}}", data)).toBe(
        ""
      );
    });
    it("Variable type is string. Rendering", () => {
      data.author = "Jack";
      expect(template("{{if author}}<h3>{{author}}</h3>{{endif}}", data)).toBe(
        "<h3>Jack</h3>"
      );
    });
    it("Variable type is boolean. Not rendering", () => {
      expect(template("{{if isRendering}}<p>Check</p>{{endif}}", data)).toBe(
        ""
      );
    });
    it("Variable type is boolean. Rendering", () => {
      data.isRendering = true;
      expect(template("{{if isRendering}}<p>Check</p>{{endif}}", data)).toBe(
        "<p>Check</p>"
      );
    });
    it("rendering all", () => {
      expect(
        template(
          `{{if author}}\n<p>Its author is {{author}}</p>\n{{endif}}\n{{if AGE}}\n<p>And author is {{AGE}} years old</p>\n{{endif}}`,
          data
        )
      ).toBe(`<p>Its author is Jack</p>\n<p>And author is 18 years old</p>`);
    });
  });

  describe("loops", () => {
    it("puts values from list elements in line", () => {
      expect(
        template(`{{NAME}}{{for data as items}}{{NAME}},`, {
          NAME: "0 ",
          items: [{ NAME: "1" }, { NAME: "2" }],
        })
      ).toBe("0 1,2,");
    });

    it("handles basic loops", () => {
      expect(template("{{for data as items}}{{A}},", data)).toBe("1,11,111,");
    });

    it("puts values from list elements in multiline", () => {
      expect(template(`{{for data as items}}\n<p>{{B}}</p>`, data)).toBe(
        `<p>2</p>\n<p>22</p>\n<p>222</p>\n`
      );
    });

    it("puts values from list elements in line with using index", () => {
      expect(
        template(`{{for data as items}}<p>{{index}}. {{B}}</p>`, data)
      ).toBe(`<p>1. 2</p><p>2. 22</p><p>3. 222</p>`);
    });

    it("puts values from list elements in multiline with using index", () => {
      expect(
        template(`{{for data as items}}\n<p>{{index}}. {{B}}</p>`, data)
      ).toBe(`<p>1. 2</p>\n<p>2. 22</p>\n<p>3. 222</p>\n`);
    });

    it("puts values from list elements in line. With using isFirst", () => {
      expect(
        template(
          `{{NAME}}{{for data as items}}{{NAME}}_{{isFirst {{NAME}} first,}}`,
          {
            NAME: "0 ",
            items: [{ NAME: "1" }, { NAME: "2" }],
          }
        )
      ).toBe("0 1 first,2");
    });

    it("puts values from list elements in line. With using isLast", () => {
      expect(
        template(
          `{{NAME}}{{for data as items}}{{NAME}}, _{{isLast {{NAME}} last}}`,
          {
            NAME: "0 ",
            items: [{ NAME: "1" }, { NAME: "2" }],
          }
        )
      ).toBe("0 1, 2 last");
    });

    it("puts values from list elements in line. With using isFirst, isLast", () => {
      expect(
        template(
          `{{NAME}}{{for data as items}}{{NAME}}_{{isFirst {{NAME}} first,}}_{{isLast {{NAME}} last}}`,
          {
            NAME: "0 ",
            items: [{ NAME: "1" }, { NAME: "2" }],
          }
        )
      ).toBe("0 1 first,2 last");
    });

    it("puts values from list elements in multiline with using isFirst", () => {
      expect(
        template(
          `{{for data as items}}\n<p>{{B}}</p>_{{isFirst <p>{{B}} Start!</p>}}`,
          data
        )
      ).toBe(`<p>2 Start!</p>\n<p>22</p>\n<p>222</p>\n`);
    });

    it("puts values from list elements in multiline with using isLast", () => {
      expect(
        template(
          `{{for data as items}}\n<p>{{B}}</p>_{{isLast <p>{{B}} Stop!</p>}}`,
          data
        )
      ).toBe(`<p>2</p>\n<p>22</p>\n<p>222 Stop!</p>\n`);
    });

    it("puts values from list elements in multiline with using isFirst, isLast", () => {
      expect(
        template(
          `{{for data as items}}\n<p>{{B}}</p>_{{isFirst <p>{{B}} Start!</p>}}_{{isLast <p>{{B}} Stop!</p>}}`,
          data
        )
      ).toBe(`<p>2 Start!</p>\n<p>22</p>\n<p>222 Stop!</p>\n`);
    });

    it("rendering all", () => {
      expect(
        template(
          `{{NAME}} {{for data as items}}{{index}}. {{A}}, _{{isFirst {{index}}. {{A}} first, }}_{{isLast {{index}}. {{A}} last}}\n{{for data as items}}\n<p>{{index}}. {{B}}</p>_{{isFirst <p>{{index}}. {{B}} Start!</p>}}_{{isLast <p>{{index}}. {{B}} Stop!</p>}}`,
          data
        )
      ).toBe(
        `Bob 1. 1 first, 2. 11, 3. 111 last\n<p>1. 2 Start!</p>\n<p>2. 22</p>\n<p>3. 222 Stop!</p>\n`
      );
    });
  });

  describe("complex test", () => {
    it("rendering all", () => {
      expect(template(complexTestTemplate, complexTestData)).toBe(
        complexTestResult
      );
    });
  });
});
