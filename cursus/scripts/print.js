// "Print or save as PDF": data-print on a button opens the browser's print dialog, which also
// saves a PDF. What prints is in the print stylesheet, so the browser's own menu gives the same.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const print = () => window.print();
let buttons = [];

export function start(root) {
  for (const button of within(root, "[data-print]")) {
    button.addEventListener("click", print);
    buttons.push(button);
  }
}

export function stop() {
  for (const button of buttons) button.removeEventListener("click", print);
  buttons = [];
}
