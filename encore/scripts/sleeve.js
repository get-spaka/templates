// data-sleeve: a record's sleeve, its disc drawn in CSS behind the cover.
// With no script, while editing and under reduced motion, the disc is 18% out and still.
// Once this script runs (data-sleeve-live), the stylesheet slides a pointed or focused sleeve's
// disc 55% out and turns it at the record's speed (data-rpm). The hero's record
// (data-sleeve="hero") slides out on load and turns while it is in view; a record's page
// (data-sleeve="scroll") rolls its disc out as the first screen scrolls away.
import { animate, inView, scroll } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
let stops = [];

/** Which way the disc leaves its sleeve, as the stylesheet says (--dir: down on a phone). */
const down = (sleeve) => getComputedStyle(sleeve).getPropertyValue("--dir").trim() === "down";

export function start(root) {
  if (reduced()) return;
  for (const sleeve of within(root, "[data-sleeve]")) {
    const disc = sleeve.querySelector(".disc");
    if (!disc) continue;
    const kind = sleeve.getAttribute("data-sleeve");
    sleeve.setAttribute("data-sleeve-live", "");
    stops.push(() => sleeve.removeAttribute("data-sleeve-live"));

    if (kind === "hero") {
      // The disc starts inside the sleeve and slides out, then turns while in view.
      const axis = down(sleeve) ? "y" : "x";
      sleeve.style.setProperty("--out", "0");
      const slide = animate(disc, { [axis]: ["0%", "55%"] }, { duration: 1.2, delay: 0.35, ease: EASE });
      const stopView = inView(
        sleeve,
        () => {
          sleeve.setAttribute("data-turning", "");
          return () => sleeve.removeAttribute("data-turning");
        },
        { amount: 0.05 },
      );
      stops.push(() => {
        slide.stop();
        stopView();
        sleeve.removeAttribute("data-turning");
        sleeve.style.removeProperty("--out");
        disc.style.removeProperty("transform");
      });
    } else if (kind === "scroll") {
      // The disc rolls out as the first screen scrolls away; scrolling back turns it back.
      const stage = sleeve.closest("[data-sleeve-stage]") ?? sleeve.parentElement;
      const axis = down(sleeve) ? "y" : "x";
      const reach = Math.round(100 * (parseFloat(getComputedStyle(sleeve).getPropertyValue("--reach")) || 0.6));
      sleeve.style.setProperty("--out", "0");
      const roll = animate(
        disc,
        { [axis]: ["18%", `${reach}%`], rotate: [0, 540] },
        { duration: 1, ease: "linear", autoplay: false },
      );
      const cancel = scroll(roll, { target: stage, offset: ["start start", "end start"] });
      stops.push(() => {
        cancel();
        roll.stop();
        sleeve.style.removeProperty("--out");
        disc.style.removeProperty("transform");
      });
    }
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
