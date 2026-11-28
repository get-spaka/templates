// Cover zoom (data-zoom on an image's frame): the image goes from scale 1.12 to 1 as the
// page scrolls past it. With no script, under reduced motion and while editing, it
// stays at 1.
import { animate, scroll } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const running = new Map();

export function start(root) {
  if (reduced()) return;
  for (const frame of within(root, "[data-zoom]")) {
    const image = frame.querySelector("img");
    if (!image || running.has(frame)) continue;
    const stopScroll = scroll(animate(image, { scale: [1.12, 1] }, { ease: "linear" }), {
      target: frame,
      offset: ["start end", "end start"],
    });
    running.set(frame, () => {
      stopScroll();
      image.style.transform = "";
    });
  }
}

export function stop(root) {
  for (const frame of within(root, "[data-zoom]")) {
    running.get(frame)?.();
    running.delete(frame);
  }
}
