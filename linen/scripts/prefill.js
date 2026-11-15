// The dates, from the booking bar to the request. The home page's bar is a plain GET form to
// /book#request; on the Book page this script copies arrival, departure, guests, room, for and
// note from the address into the request's fields (data-request). On every form with
// data-arrival and data-departure, the departure stays at least a day after the arrival.
// It writes values into fields only, never text into the page. Nothing moves.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const iso = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const dayAfter = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  return iso(new Date(y, m - 1, d + 1));
};

let stops = [];

export function start(root) {
  const params = new URLSearchParams(location.search);
  for (const form of within(root, "[data-request]")) {
    const field = (name) => form.querySelector(`[name="${name}"]`);
    for (const name of ["arrival", "departure"]) {
      const value = params.get(name);
      if (value && DAY.test(value) && field(name)) field(name).value = value;
    }
    const guests = Number(params.get("guests"));
    if (guests >= 1 && guests <= 99 && field("guests")) field("guests").value = String(Math.round(guests));
    const room = (params.get("room") ?? "").toLowerCase();
    if (room) {
      const choice = [...form.querySelectorAll('input[name="room"]')].find(
        (input) => input.dataset.room === room || input.value.toLowerCase() === room,
      );
      if (choice) choice.checked = true;
    }
    if (params.get("for") === "house") {
      const house = form.querySelector('input[name="kind"][data-kind="house"]');
      if (house) house.checked = true;
    }
    const note = params.get("note");
    if (note && field("note") && !field("note").value) field("note").value = note.slice(0, 500);
  }

  const today = iso(new Date());
  for (const arrival of within(root, "[data-arrival]")) {
    const form = arrival.closest("form");
    const departure = form?.querySelector("[data-departure]");
    if (!departure) continue;
    arrival.min = today;
    const keep = () => {
      if (!DAY.test(arrival.value)) return;
      const next = dayAfter(arrival.value);
      departure.min = next;
      if (!departure.value || departure.value < next) departure.value = next;
    };
    if (arrival.value) keep();
    arrival.addEventListener("change", keep);
    stops.push(() => arrival.removeEventListener("change", keep));
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
