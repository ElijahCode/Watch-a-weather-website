type testData = {
  NAME: string;
  AGE: string;
  TEAM: string;
  items: { A: number; B: number }[];
  author: undefined | string;
  isRendering: boolean;
};

export const data: testData = {
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

export const complexTestTemplate =
  "<h3>From {{sender}}</h3>\n<h3>What are we need buy</h3>\n{{if eventName}}<h3>to {{eventName}}</h3>{{endif}}\n<div>\n{{for data as products}}\n<p>{{index}}. {{product}}</p>_{{isFirst <p>{{index}}. {{product}}(important)</p>}}_{{isLast <p>{{index}}. {{product}}(not important)</p>}}</div>\n{{if reminder}}<h3>Dont forget it</h3>{{endif}}";
export const complexTestResult = `<h3>From Mom</h3>\n<h3>What are we need buy</h3>\n<h3>to dinner</h3>\n<div>\n<p>1. Cheese(important)</p>\n<p>2. Meat</p>\n<p>3. Bread(not important)</p>\n</div>\n<h3>Dont forget it</h3>`;
export const complexTestData = {
  sender: `Mom`,
  eventName: `dinner`,
  products: [{ product: `Cheese` }, { product: `Meat` }, { product: "Bread" }],
  reminder: true,
};
