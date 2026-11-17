// Try it on: data-try on the section. The placements are CSS (radios and
// :has()); this script only lets the visitor move the design a little, by
// dragging it or with the arrow keys once it has focus, and turn it 15° either
// way with the range [data-try-turn], which it shows. With no script, and in
// edit mode, the design sits at the placement's center and the range stays
// hidden.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const section of within(root, "[data-try]")) {
    const design = section.querySelector(".try-design");
    const stage = section.querySelector(".try-stage");
    const turn = section.querySelector("[data-try-turn]");
    if (!design || !stage) continue;
    const field = turn?.closest("[data-try-turn-field]") ?? turn;
    let dx = 0;
    let dy = 0;
    const limit = () => ({ x: stage.clientWidth * 0.3, y: stage.clientHeight * 0.3 });
    const place = () => {
      const { x, y } = limit();
      dx = Math.max(-x, Math.min(x, dx));
      dy = Math.max(-y, Math.min(y, dy));
      design.style.setProperty("--dx", `${dx}px`);
      design.style.setProperty("--dy", `${dy}px`);
    };
    let from = null;
    const down = (event) => {
      from = { x: event.clientX - dx, y: event.clientY - dy };
      design.setPointerCapture(event.pointerId);
      section.classList.add("dragging");
    };
    const move = (event) => {
      if (!from) return;
      dx = event.clientX - from.x;
      dy = event.clientY - from.y;
      place();
    };
    const up = () => {
      from = null;
      section.classList.remove("dragging");
    };
    const key = (event) => {
      const step = event.shiftKey ? 20 : 6;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      const by = moves[event.key];
      if (!by) return;
      event.preventDefault();
      dx += by[0];
      dy += by[1];
      place();
    };
    const turning = () => design.style.setProperty("--turn", turn.value);
    design.setAttribute("tabindex", "0");
    design.setAttribute("role", "img");
    design.dataset.draggable = "";
    if (reduced()) design.style.transition = "none";
    design.addEventListener("pointerdown", down);
    design.addEventListener("pointermove", move);
    design.addEventListener("pointerup", up);
    design.addEventListener("pointercancel", up);
    design.addEventListener("keydown", key);
    turn?.addEventListener("input", turning);
    if (field) field.hidden = false;
    stops.push(() => {
      design.removeEventListener("pointerdown", down);
      design.removeEventListener("pointermove", move);
      design.removeEventListener("pointerup", up);
      design.removeEventListener("pointercancel", up);
      design.removeEventListener("keydown", key);
      turn?.removeEventListener("input", turning);
      design.removeAttribute("tabindex");
      design.removeAttribute("role");
      delete design.dataset.draggable;
      design.style.removeProperty("--dx");
      design.style.removeProperty("--dy");
      design.style.removeProperty("--turn");
      design.style.transition = "";
      section.classList.remove("dragging");
      if (turn) turn.value = "0";
      if (field) field.hidden = true;
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
