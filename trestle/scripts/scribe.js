// The scribe: a project's photos before and after, taken from the same spot,
// laid one over the other under a line the visitor moves (drag, touch or the
// arrow keys, through a native range input). When it first comes into view the
// line sweeps from the house as found to the middle. Its label is the figure's
// data-scribe-label; the photos and their captions stay in the page. Without
// the script, in edit mode, or for photos not taken from the same spot
// (no data-same-view), the two stand side by side.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const figure of within(root, "[data-scribe][data-same-view]")) {
    const frame = figure.querySelector("[data-scribe-frame]");
    if (!frame?.querySelector("[data-before]") || !frame.querySelector("[data-scribe-after] img")) continue;

    const set = (value) => figure.style.setProperty("--split", `${value}%`);
    const handle = document.createElement("span");
    handle.className = "scribe-handle";
    handle.setAttribute("aria-hidden", "true");
    const input = document.createElement("input");
    Object.assign(input, { type: "range", min: "0", max: "100", step: "1", value: "50", className: "scribe-input" });
    input.setAttribute("aria-label", figure.dataset.scribeLabel || "");
    input.style.opacity = "0";
    frame.append(handle, input);
    figure.setAttribute("data-scribing", "");

    let sweep;
    const onInput = () => {
      sweep?.stop();
      set(input.value);
    };
    input.addEventListener("input", onInput);

    let stopView = () => {};
    if (reduced()) set(50);
    else {
      set(100);
      input.value = "100";
      stopView = inView(
        frame,
        () => {
          sweep = animate(100, 50, {
            duration: 1.6,
            ease: [0.65, 0, 0.35, 1],
            onUpdate: (value) => {
              set(value);
              input.value = String(Math.round(value));
            },
          });
        },
        { amount: 0.25 },
      );
    }

    stops.push(() => {
      stopView();
      sweep?.stop();
      input.removeEventListener("input", onInput);
      input.remove();
      handle.remove();
      figure.removeAttribute("data-scribing");
      figure.style.removeProperty("--split");
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
