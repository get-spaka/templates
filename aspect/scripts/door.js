// The open door: data-door on a photo's frame, which holds the <img> then a
// <span class="door">. The stylesheet keeps the door out of the page, so edit
// mode, a page with no script and reduced motion show the photo plain. For
// visitors, start shows each door closed over its photo and swings it open on
// its left hinge as the frame comes into view (data-door="load": once the page
// has loaded); doors in a list marked data-door-stagger open 120 ms apart.
// Once open, the door goes again and the photo is whole.
import { animate, inView } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.65, 0, 0.35, 1];
const STAGGER = 0.12;
let stops = [];

function swing(door, delay) {
  const shade = door.querySelector(".door-shade");
  const opening = animate(door, { rotateY: [0, -104] }, { duration: 1.1, ease: EASE, delay });
  const shading = shade ? animate(shade, { opacity: [0, 0.35] }, { duration: 1.1, ease: EASE, delay }) : null;
  opening.finished
    .then(() => {
      door.style.display = "none";
    })
    .catch(() => {});
  return () => {
    opening.stop();
    shading?.stop();
  };
}

export function start(root) {
  if (reduced()) return;
  const queues = new Map();
  for (const frame of within(root, "[data-door]")) {
    const door = frame.querySelector(":scope > .door");
    if (!door) continue;
    const shade = door.querySelector(".door-shade");
    frame.style.perspective = "1400px";
    door.style.display = "block";
    door.style.transform = "rotateY(0deg)";
    if (shade) shade.style.opacity = "0";
    let halt = () => {};
    const list = frame.closest("[data-door-stagger]");
    const open = () => {
      let delay = 0;
      if (list) {
        const now = performance.now() / 1000;
        const next = queues.get(list) ?? 0;
        delay = Math.max(0, next - now);
        queues.set(list, now + delay + STAGGER);
      }
      halt = swing(door, delay);
    };
    let watch = () => {};
    if (frame.dataset.door === "load") {
      const timer = setTimeout(open, 300);
      watch = () => clearTimeout(timer);
    } else {
      let done = false;
      watch = inView(
        frame,
        () => {
          if (done) return;
          done = true;
          open();
        },
        { amount: 0.45 },
      );
    }
    stops.push(() => {
      watch();
      halt();
      frame.style.perspective = "";
      door.style.display = "";
      door.style.transform = "";
      if (shade) shade.style.opacity = "";
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
