// data-envelope: the envelope opens once, at load. The stylesheet draws it open, the card
// standing out (edit mode, no script, reduced motion); the script sets the closed state,
// then the seal lifts, the flap turns open from its top edge and passes behind the card,
// the card rises out and grows a little, and the envelope settles. About 2.2 s.
import { animate } from "motion";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const FOLD = [0.65, 0, 0.35, 1];
const RISE = [0.22, 1, 0.36, 1];
let stops = [];

function open(envelope) {
  const stage = envelope.querySelector(".env-stage");
  const flap = envelope.querySelector(".env-flap");
  const card = envelope.querySelector(".env-card");
  const seal = envelope.querySelector(".env-seal");
  if (!stage || !flap || !card) return;
  // The seal rests on the open flap's tip; closed, the tip is 20% of the envelope's width
  // above its bottom edge.
  const box = stage.getBoundingClientRect();
  const sealBox = seal?.getBoundingClientRect();
  const drop = sealBox ? box.bottom - box.width * 0.2 - (sealBox.top + sealBox.height / 2) : 0;
  const touched = [envelope, stage, flap, card, seal].filter(Boolean);
  const controls = [];
  const timers = [];

  stage.style.clipPath = "inset(-100vh -100vw 0 -100vw)";
  flap.style.transform = "perspective(1400px) rotateX(0deg)";
  flap.style.zIndex = "5";
  card.style.transform = "translateY(70%) scale(0.94)";
  envelope.style.transform = "translateY(-2%)";
  if (seal) seal.style.transform = `translateY(${drop}px)`;

  if (seal) {
    controls.push(
      animate(seal, { y: [drop, drop - 14], rotate: [0, -10] }, { duration: 0.45, ease: RISE, delay: 0.25 }),
      animate(seal, { y: [drop - 14, 0], rotate: [-10, 0] }, { duration: 0.9, ease: FOLD, delay: 0.7 }),
    );
  }
  controls.push(
    animate(
      flap,
      { transform: ["perspective(1400px) rotateX(0deg)", "perspective(1400px) rotateX(180deg)"] },
      { duration: 0.9, ease: FOLD, delay: 0.6 },
    ),
    animate(card, { y: ["70%", "0%"], scale: [0.94, 1] }, { duration: 1.1, ease: RISE, delay: 1.05 }),
    animate(envelope, { y: ["-2%", "0%"] }, { duration: 0.9, ease: RISE, delay: 1.3 }),
  );
  // At 90° the flap passes behind the card.
  timers.push(setTimeout(() => (flap.style.zIndex = ""), 1050));
  const clean = () => {
    for (const el of touched) {
      el.style.transform = "";
      el.style.clipPath = "";
      el.style.zIndex = "";
    }
  };
  timers.push(setTimeout(clean, 2300));
  stops.push(() => {
    for (const c of controls) c.cancel?.();
    for (const t of timers) clearTimeout(t);
    clean();
  });
}

export function start(root) {
  if (reduced()) return;
  for (const envelope of within(root, "[data-envelope]")) open(envelope);
}

export function stop() {
  for (const undo of stops) undo();
  stops = [];
}
