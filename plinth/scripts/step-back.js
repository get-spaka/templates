// Step back (data-step-back on the hero, data-focus="34% 58%" on its picture): the hero opens
// nose to the canvas, on a detail of the work filling the screen, and as the visitor scrolls it
// eases back to the whole work hung on the wall, its label beside it; the title's lines come up
// once the work is in place. The script makes the hero about 220svh tall (data-step-back-on)
// with its stage sticky; with no script, under reduced motion and in edit mode, the hero is one
// screen with everything in place.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const ease = (t) => 1 - (1 - t) ** 3;
let stops = [];

function setUp(hero) {
  const stage = hero.querySelector("[data-step-stage]");
  const picture = hero.querySelector("[data-focus]");
  const img = picture?.matches("img") ? picture : picture?.querySelector("img");
  if (!stage || !picture || !img) return;
  const caption = hero.querySelector("[data-step-caption]");
  const lines = [...hero.querySelectorAll("[data-step-line]")];
  const [fx, fy] = (picture.getAttribute("data-focus") || "50% 50%")
    .split(/\s+/)
    .map((v) => Number.parseFloat(v) / 100);

  let on = false;
  let titleUp = false;
  let geometry = null;
  let cancelScroll = null;

  const measure = () => {
    // Where the picture rests, with no transform, in the stage's own frame.
    picture.style.transform = "";
    const box = picture.getBoundingClientRect();
    const frame = stage.getBoundingClientRect();
    const vw = frame.width;
    const vh = frame.height;
    // Large enough to fill the screen around the focus point, about 2.6 times (2 on a phone),
    // never beyond the file's own pixels.
    const wanted = Math.max(vw < 768 ? 2 : 2.6, vw / box.width, vh / box.height);
    const cap = img.naturalWidth ? img.naturalWidth / box.width : wanted;
    const scale = Math.max(1, Math.min(wanted, cap));
    // The picture scales around its own center (cx, cy): move it so that the focus point comes
    // to the screen's center, then keep its scaled edges outside the screen.
    const left = box.left - frame.left;
    const top = box.top - frame.top;
    const cx = left + box.width / 2;
    const cy = top + box.height / 2;
    const fpx = left + fx * box.width;
    const fpy = top + fy * box.height;
    const halfW = (box.width * scale) / 2;
    const halfH = (box.height * scale) / 2;
    const clamp = (v, lo, hi) => (lo > hi ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, v)));
    const tx = clamp(vw / 2 - cx - scale * (fpx - cx), vw - cx - halfW, halfW - cx);
    const ty = clamp(vh / 2 - cy - scale * (fpy - cy), vh - cy - halfH, halfH - cy);
    geometry = { scale, tx, ty };
  };

  const render = (progress) => {
    if (!geometry) return;
    const t = ease(Math.min(1, Math.max(0, progress / 0.82)));
    const s = geometry.scale + (1 - geometry.scale) * t;
    const x = geometry.tx * (1 - t);
    const y = geometry.ty * (1 - t);
    picture.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    if (caption) caption.hidden = progress > 0.35;
    if (!titleUp && progress >= 0.8) {
      titleUp = true;
      lines.forEach((line, i) => {
        const inner = line.firstElementChild;
        if (!inner) return;
        line.style.overflow = "clip";
        Motion.animate(inner, { y: ["105%", "0%"] }, { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }).then(
          () => {
            line.style.overflow = "";
          },
        );
      });
    }
  };

  const turnOn = () => {
    if (on) return;
    // The stage must hold the whole hero in one screen, or it shows as it is.
    if (stage.scrollHeight > innerHeight + 2) return;
    on = true;
    hero.setAttribute("data-step-back-on", "");
    measure();
    for (const line of lines) {
      const inner = line.firstElementChild;
      if (!inner) continue;
      line.style.overflow = "clip";
      inner.style.transform = "translateY(105%)";
    }
    cancelScroll = Motion.scroll((p) => render(p), { target: hero, offset: ["start start", "end end"] });
  };

  const turnOff = () => {
    if (!on) return;
    on = false;
    cancelScroll?.();
    cancelScroll = null;
    hero.removeAttribute("data-step-back-on");
    picture.style.transform = "";
    if (caption) caption.hidden = true;
    for (const line of lines) {
      line.style.overflow = "";
      if (line.firstElementChild) line.firstElementChild.style.transform = "";
    }
    titleUp = false;
  };

  const onResize = () => {
    if (!on) return;
    measure();
    render(Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / (hero.offsetHeight - innerHeight || 1))));
  };

  // Whatever writes a position on the stage (a page photographed whole, an editor) gets the
  // hero as it is with no script, at once.
  const watch = new MutationObserver(() => {
    if (stage.style.position) turnOff();
  });
  watch.observe(stage, { attributes: true, attributeFilter: ["style"] });

  const begin = () => {
    if (stage.style.position) return;
    turnOn();
  };
  if (img.complete && img.naturalWidth) begin();
  else img.addEventListener("load", begin, { once: true });
  addEventListener("resize", onResize);

  stops.push(() => {
    img.removeEventListener("load", begin);
    removeEventListener("resize", onResize);
    watch.disconnect();
    turnOff();
  });
}

export function start(root) {
  if (reduced()) return;
  for (const hero of within(root, "[data-step-back]")) setUp(hero);
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
