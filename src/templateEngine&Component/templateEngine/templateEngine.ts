export function template(tpl: string, data: object): string {
    return tpl.replace(
      /{{if (\w+)}}\n?(<\w+>[a-zA-z0-9 {}]{1,}<\/\w+>)\n?{{endif}}/gm,
        (_: unknown, variable: string, replaceString: string) => {
          return data.hasOwnProperty(variable) ? replaceString : "";
        }
    )
      .replace(
        /{{for (\w+)}}((\s|\S)+){{endfor}}/g,
        (_: unknown, listKey: string, listItemTemplate: string) => {
          let resultString = "";
          data[listKey].forEach((el) => {
            resultString += template(listItemTemplate, el);
          });
  
          return resultString;
        }
      )
      .replace(/{{(\w+)}}/g, (patternMatch, paramName) => {
        return data.hasOwnProperty(paramName) ? data[paramName] : "";
      });
  }