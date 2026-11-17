// The transfer: data-transfer on a figure holding one <img>. start puts a
// stencil layer beneath the image, in the theme's secondary color: masked by
// a line drawing (data-stencil, or the image itself when it is an .svg or a
// .png), or made from the image (grayscale, high contrast, lightened over the
// violet) for a photo. Then the stencil lands a little off register, the ink
// takes over it and the stencil slides into register and fades. The figure
// transfers when it comes into view; data-transfer="load" once the page has
// loaded; inside data-transfer-stagger, figures follow each other 0.12 s apart.
// Under reduced motion the layer is made for the lift (CSS) without the
// entrance. With no script, and in edit mode, each image is plain ink.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.22, 1, 0.36, 1];
const STAGGER = 0.12;
let stops = [];

function stencilLayer(figure, img) {
  const src = img.getAttribute("src") ?? "";
  const lines = figure.dataset.stencil || (/\.(?:svg|png)(?:[?#]|$)/i.test(src) ? src : "");
  const layer = document.createElement("span");
  layer.className = "stencil";
  layer.setAttribute("aria-hidden", "true");
  if (lines) {
    layer.dataset.from = "lines";
    layer.style.setProperty("--stencil", `url("${lines}")`);
  } else {
    layer.dataset.from = "picture";
    const copy = document.createElement("img");
    copy.src = img.currentSrc || src;
    copy.alt = "";
    copy.className = img.className;
    layer.append(copy);
  }
  figure.insertBefore(layer, img);
  return layer;
}

function play(layer, img, delay) {
  const off = { x: 4, y: -3, rotate: -0.6 };
  const landing = Motion.animate(
    layer,
    { opacity: [0, 1], x: [off.x, off.x], y: [off.y, off.y], rotate: [off.rotate, off.rotate] },
    { duration: 0.3, delay, ease: "easeOut" },
  );
  const inking = Motion.animate(
    img,
    { opacity: [0, 1], filter: ["blur(2px)", "blur(0px)"] },
    { duration: 0.6, delay: delay + 0.5, ease: EASE },
  );
  const register = Motion.animate(
    layer,
    { opacity: [1, 0], x: [off.x, 0], y: [off.y, 0], rotate: [off.rotate, 0] },
    { duration: 0.6, delay: delay + 0.5, ease: EASE },
  );
  // Once in register, the inline styles go: the stylesheet rests the stencil
  // under the ink and lifts it on hover; the heal's stages set the ink's opacity.
  // Motion writes its last values just after it finishes, hence the short wait.
  let timer = 0;
  Promise.all([inking.finished, register.finished])
    .then(() => {
      timer = setTimeout(() => {
        img.style.opacity = "";
        img.style.filter = "";
        layer.style.opacity = "";
        layer.style.transform = "";
      }, 80);
    })
    .catch(() => {});
  return () => {
    clearTimeout(timer);
    landing.stop();
    inking.stop();
    register.stop();
  };
}

export function start(root) {
  const still = reduced();
  const queues = new Map();
  for (const figure of within(root, "[data-transfer]")) {
    const img = figure.querySelector(":scope > img");
    if (!img || figure.querySelector(":scope > .stencil")) continue;
    const layer = stencilLayer(figure, img);
    let halt = () => {};
    let watch = () => {};
    if (!still) {
      img.style.opacity = "0";
      const list = figure.closest("[data-transfer-stagger]");
      const go = () => {
        let delay = 0;
        if (list) {
          const now = performance.now() / 1000;
          const next = queues.get(list) ?? now;
          delay = Math.max(0, next - now);
          queues.set(list, now + delay + STAGGER);
        }
        halt = play(layer, img, delay);
      };
      if (figure.dataset.transfer === "load") {
        const timer = setTimeout(go, 250);
        watch = () => clearTimeout(timer);
      } else {
        let done = false;
        watch = Motion.inView(
          figure,
          () => {
            if (done) return;
            done = true;
            go();
          },
          { amount: 0.3 },
        );
      }
    }
    stops.push(() => {
      watch();
      halt();
      layer.remove();
      img.style.opacity = "";
      img.style.filter = "";
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
