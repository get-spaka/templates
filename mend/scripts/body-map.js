// The jointed figure (data-body-map): a click or tap on a joint opens its area
// and closes the others; on a phone the opened area is scrolled into view.
// Lighting the joints and moving the figure are the stylesheet's (:has()).
// The list of areas works without this script, and is what screen readers use.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

let stops = [];

export function start(root) {
  for (const map of within(root, "[data-body-map]")) {
    const onClick = (event) => {
      const joint = event.target.closest("[data-joint]");
      if (!joint || !map.contains(joint)) return;
      const area = map.querySelector(`details[data-area="${joint.dataset.joint}"]`);
      if (!area) return;
      for (const other of map.querySelectorAll("details[data-area]")) if (other !== area) other.open = false;
      area.open = true;
      if (matchMedia("(max-width: 767px)").matches)
        area.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "nearest" });
    };
    map.addEventListener("click", onClick);
    stops.push(() => map.removeEventListener("click", onClick));
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
