// data-pleat: a photograph comes in as a pleated cloth and opens flat.
// Over a figure holding one <img>, the script lays six strips (four on a phone). Each strip is a
// copy of the same image clipped to its slice, so it shows exactly its part of the picture
// whatever the crop. Each starts turned 70° on its vertical axis, one way then the other, and
// shaded with the theme's neutral; the strips turn flat one after another from the left while
// the shading fades. Then the copies go and the picture is a plain <img> again.
// data-pleat="load" opens once the page has loaded (the hero's photos, one after the other);
// any other value opens as the picture comes into view.
// With no script, under reduced motion and in edit mode, the picture is simply there.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
const TURN = 70;
const DURATION = 0.9;
const STAGGER = 0.07;

let folds = [];
let stops = [];

/** Lays the folded strips over the figure's picture and hides the picture meanwhile. */
function fold(figure) {
  const img = figure.querySelector("img");
  if (!img) return undefined;
  const count = matchMedia("(max-width: 640px)").matches ? 4 : 6;
  const style = getComputedStyle(img);
  const layer = document.createElement("div");
  layer.className = "pleat-layer";
  layer.setAttribute("aria-hidden", "true");
  const ground = document.createElement("div");
  ground.className = "pleat-ground";
  layer.append(ground);
  const strips = [];
  const shades = [];
  for (let i = 0; i < count; i++) {
    const left = (i * 100) / count;
    const right = 100 - ((i + 1) * 100) / count;
    const strip = document.createElement("div");
    strip.className = "pleat-strip";
    strip.style.clipPath = `inset(0 ${right}% 0 ${left}%)`;
    strip.style.transformOrigin = `${left + 50 / count}% 50%`;
    strip.style.transform = `rotateY(${i % 2 ? -TURN : TURN}deg)`;
    const copy = img.cloneNode(false);
    copy.removeAttribute("id");
    copy.removeAttribute("class");
    copy.removeAttribute("style");
    copy.alt = "";
    copy.loading = "eager";
    copy.className = "pleat-copy";
    copy.style.objectFit = style.objectFit;
    copy.style.objectPosition = style.objectPosition;
    const shade = document.createElement("div");
    shade.className = "pleat-shade";
    shade.dataset.side = i % 2 ? "right" : "left";
    shade.style.left = `${left}%`;
    shade.style.width = `${100 / count}%`;
    strip.append(copy, shade);
    layer.append(strip);
    strips.push(strip);
    shades.push(shade);
  }
  figure.append(layer);
  img.style.visibility = "hidden";
  const state = { figure, img, layer, ground, strips, shades, controls: [], done: false };
  folds.push(state);
  return state;
}

/** Takes the strips away and gives the picture back. */
function flatten(state) {
  if (state.done) return;
  state.done = true;
  for (const control of state.controls) control.stop?.();
  state.layer.remove();
  state.img.style.visibility = "";
}

/** The picture is ready to show, or 2.5 s have passed. */
function ready(img) {
  const decoded = img.complete && img.naturalWidth ? Promise.resolve() : img.decode().catch(() => undefined);
  return Promise.race([decoded, new Promise((resolve) => setTimeout(resolve, 2500))]);
}

function open(state, delay) {
  if (state.done) return;
  const { strips, shades, ground } = state;
  strips.forEach((strip, i) => {
    const from = i % 2 ? -TURN : TURN;
    const at = delay + i * STAGGER;
    state.controls.push(
      Motion.animate(
        strip,
        { transform: [`rotateY(${from}deg)`, "rotateY(0deg)"] },
        { duration: DURATION, delay: at, ease: EASE },
      ),
      Motion.animate(shades[i], { opacity: [1, 0] }, { duration: DURATION, delay: at, ease: EASE }),
    );
  });
  state.controls.push(
    Motion.animate(ground, { opacity: [1, 0] }, { duration: DURATION + STAGGER * strips.length, delay, ease: EASE }),
  );
  Promise.all(state.controls).then(() => flatten(state));
}

export function start(root) {
  if (reduced()) return;
  let rank = 0;
  for (const figure of within(root, "[data-pleat]")) {
    if (figure.querySelector(".pleat-layer")) continue;
    const state = fold(figure);
    if (!state) continue;
    if (figure.dataset.pleat === "load") {
      const delay = 0.15 + rank++ * 0.35;
      ready(state.img).then(() => open(state, delay));
    } else {
      stops.push(
        Motion.inView(
          figure,
          () => {
            ready(state.img).then(() => open(state, 0));
          },
          { amount: 0.1 },
        ),
      );
    }
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
  for (const state of folds) flatten(state);
  folds = [];
}
