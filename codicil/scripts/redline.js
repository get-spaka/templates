// The redline (data-redline on a line holding a <del> then an <ins>): the lawyer's phrase
// is struck through in red from the left, then the plain words write themselves in after
// it, their red rule following, line by line when they wrap. data-redline="load" plays as
// the page opens (the hero); any other plays when the line comes into view. Once per page view.
// With no script, under reduced motion and while editing, the markup is simply there.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const EASE = [0.65, 0, 0.35, 1];
// The new words are uncovered by a mask cut per line (box-decoration-break: clone),
// so that each line of a wrapped phrase writes in from its own left edge.
const MASK = {
  webkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
  maskImage: "linear-gradient(#000, #000)",
  maskRepeat: "no-repeat",
  maskPosition: "0 0",
};
let stops = [];

const unmask = (ins) => {
  for (const key of Object.keys(MASK)) ins.style[key] = "";
  ins.style.maskSize = "";
};

export function start(root) {
  if (reduced()) return;
  for (const line of within(root, "[data-redline]")) {
    const del = line.querySelector("del");
    const ins = line.querySelector("ins");
    if (!del || !ins) continue;
    del.style.backgroundSize = "0% 2px";
    Object.assign(ins.style, MASK, { maskSize: "0% 100%" });
    let animations = [];
    let timer;
    const go = () => {
      const strike = Motion.animate(del, { backgroundSize: ["0% 2px", "100% 2px"] }, { duration: 0.45, ease: EASE });
      const write = Motion.animate(
        ins,
        { maskSize: ["0% 100%", "100% 100%"] },
        { duration: 0.6, ease: EASE, delay: 0.6 },
      );
      animations = [strike, write];
      Promise.resolve(strike).then(() => (del.style.backgroundSize = ""), () => {});
      Promise.resolve(write).then(() => unmask(ins), () => {});
    };
    if (line.dataset.redline === "load") {
      timer = setTimeout(go, 300);
    } else {
      const stopView = Motion.inView(
        line,
        () => {
          go();
          stopView();
        },
        { amount: 0.5 },
      );
      stops.push(stopView);
    }
    stops.push(() => {
      clearTimeout(timer);
      for (const animation of animations) animation.stop?.();
      del.style.backgroundSize = "";
      unmask(ins);
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
