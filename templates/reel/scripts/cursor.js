// The cursor (data-cursor="View", "Drag" or "Next" on a link or an area): with a mouse,
// a disc of the main color follows the pointer over it, reading the attribute's word, and
// the normal cursor hides there. With no script, on touch screens and under reduced
// motion, the normal cursor.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

let teardown;

export function start(root) {
  if (root !== document || teardown || reduced() || !fine()) return;
  const disc = document.createElement("div");
  disc.className = "reel-cursor";
  disc.setAttribute("aria-hidden", "true");
  Motion.animate(disc, { scale: 0 }, { duration: 0 });
  document.body.append(disc);
  document.documentElement.setAttribute("data-cursoring", "");

  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let shownX = x;
  let shownY = y;
  let over;
  let frame;

  const show = (target) => {
    if (target === over) return;
    over = target;
    if (target) disc.textContent = target.dataset.cursor;
    Motion.animate(disc, { scale: target ? 1 : 0 }, { duration: target ? 0.35 : 0.2, ease: [0.22, 1, 0.36, 1] });
  };
  const move = (event) => {
    x = event.clientX;
    y = event.clientY;
    show(event.target instanceof Element ? event.target.closest("[data-cursor]") : null);
  };
  const leave = () => show(null);
  const tick = () => {
    shownX += (x - shownX) * 0.22;
    shownY += (y - shownY) * 0.22;
    disc.style.translate = `${shownX.toFixed(1)}px ${shownY.toFixed(1)}px`;
    frame = requestAnimationFrame(tick);
  };
  window.addEventListener("pointermove", move, { passive: true });
  document.documentElement.addEventListener("pointerleave", leave);
  frame = requestAnimationFrame(tick);

  teardown = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", leave);
    document.documentElement.removeAttribute("data-cursoring");
    disc.remove();
  };
}

export function stop(root) {
  if (root !== document) return;
  teardown?.();
  teardown = undefined;
}
