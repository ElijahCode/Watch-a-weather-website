export function addEventListenerFunc(element, event, func, ...args) {
  if (args.length === 0) {
    element.addEventListener(event, func, true);
  } else {
    element.addEventListener(event, func.bind(null, ...args));
  }
}
