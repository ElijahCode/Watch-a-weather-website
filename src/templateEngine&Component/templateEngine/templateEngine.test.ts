import {template} from './templateEngine'

const stringForCondRendering = `{{if author}}
<p>Its author is {{author}}</p>
{{endif}}
{{if AGE}}
<p>And author is {{AGE}} years old</p>
{{endif}}`;

const resultString = `<p>Its author is Jack</p>
<p>And author is 18 years old</p>`

describe("template", () => {
    const data = {
      NAME: "Bob",
      AGE: "18",
      TEAM: "Core",
      items: [
        { A: 1, B: 2 },
        { A: 11, B: 22 },
        { A: 111, B: 222 }
      ],
    };
 
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

    describe('conditional rendering', () => {
        it('Not rendering author', () => {
            expect(template("{{if author}}<h3>{{author}}</h3>{{endif}}", data)).toBe('');
        })
        it('rendering author', () => {
          data['author'] = 'Jack';
          expect(template("{{if author}}<h3>{{author}}</h3>{{endif}}", data)).toBe('<h3>Jack</h3>');
        })
        it('rendering all', () => {
          expect(template(stringForCondRendering,data)).toBe(resultString);
        })
    })
  
    describe("loops", () => {
      it("puts values from list elements inside loop", () => {
        expect(
          template("{{NAME}}{{for items}}{{NAME}},{{endfor}}", {
            NAME: "0 ",
            items: [{ NAME: "1" }, { NAME: "2" }]
          })
        ).toBe("0 1,2,");
      });
  
      it("handles basic loops", () => {
        expect(template("{{for items}}{{A}},{{endfor}}", data)).toBe("1,11,111,");
      });
    });
  });
  