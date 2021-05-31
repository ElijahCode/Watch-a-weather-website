// eslint-disable-next-line @typescript-eslint/ban-types
export function template(tpl: string, data: { [key: string]: any }): string {
  return tpl
    .replace(
      /{{if (\w+)}}\n?([a-zA-Z0-9{}<>"#!.,/= ]{1,})\n?{{endif}}/gm,
      (_: unknown, variable: string, replaceString: string) =>
        data[variable] ? replaceString : ""
    )
    .replace(
      /{{for \w+ as (\w+)}}\n?([a-zA-Z0-9{}()<>"#!.,/= ]{1,})\n?(_{{isFirst ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?\n?(_{{isLast ([a-zA-Z0-9{}()<>"#!.,/= ]{1,})}})?/g,
      (
        inputString: string,
        listKey: string,
        listItemTemplate: string,
        ...firstLastItemInstr: string[]
      ) => {
        let resultString = "";
        let firstIndex: string;
        let lastIndex: string;
        /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
        if (/isFirst/.test(firstLastItemInstr[0])) {
          firstIndex = firstLastItemInstr[1]; // eslint-disable-line prefer-destructuring
          lastIndex = firstLastItemInstr[3]; // eslint-disable-line prefer-destructuring
        } else if (
          /isLast/.test(firstLastItemInstr[0]) ||
          firstLastItemInstr[3]
        ) {
          lastIndex = firstLastItemInstr[3]; // eslint-disable-line prefer-destructuring
        }
        // eslint-disable-next-line @typescript-eslint/ban-types
        data[listKey].forEach((el: object, index: number) => {
          let listItemTemplateClone: string;
          if (index === 0 && firstIndex !== undefined) {
            listItemTemplateClone = /{{index}}/g.test(firstIndex)
              ? firstIndex.replace(/{{index}}/g, `${1 + index}`)
              : firstIndex;
          } else if (
            index === data[listKey].length - 1 &&
            lastIndex !== undefined
          ) {
            listItemTemplateClone = /{{index}}/g.test(lastIndex)
              ? lastIndex.replace(/{{index}}/g, `${1 + index}`)
              : lastIndex;
          } else {
            listItemTemplateClone = /{{index}}/g.test(listItemTemplate)
              ? listItemTemplate.replace(/{{index}}/g, `${1 + index}`)
              : listItemTemplate;
          }
          resultString += /\n/g.test(inputString)
            ? `${template(listItemTemplateClone, el)}\n`
            : template(listItemTemplateClone, el);
        });
        return resultString;
      }
    )
    .replace(/{{(\w+)}}/g, (_: unknown, paramName: string) =>
      data[paramName] ? data[paramName] : ""
    );
}
