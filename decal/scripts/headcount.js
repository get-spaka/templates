// The guest count (data-headcount on the booking form): as the planner types the
// number of guests, the line under the field says how long the service will run and
// what it costs, from the truck's figures on the form (data-per-hour,
// data-minimum-weekday, data-minimum-saturday) and the chosen way to serve (each
// option's data-per-guest, data-min-guests and data-name). It writes numbers and the
// option's own name into the line's empty slots ([data-slot="duration"], "price",
// "package"), never a sentence; until there is a count, the plain line shows. It also
// puts a slider beside the number field, kept in step with it. Nothing moves.
const forms = new Map();

const number = (value) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : undefined;
};

function duration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
}

function update(form) {
  const guests = number(form.querySelector("input[name=guests]")?.value);
  const slider = forms.get(form)?.slider;
  if (slider && guests !== undefined && document.activeElement !== slider) slider.value = String(guests);
  if (!guests || guests < 1) {
    delete form.dataset.count;
    return;
  }
  const options = [...form.querySelectorAll("input[name=package][data-per-guest]")];
  const chosen = options.find((o) => o.checked) ?? options[0];
  const perHour = number(form.dataset.perHour) || 150;
  const date = form.querySelector("input[name=date]")?.value;
  const saturday = date && new Date(`${date}T12:00:00`).getDay() === 6;
  const minimum = number(saturday ? form.dataset.minimumSaturday : form.dataset.minimumWeekday) || 0;
  const perGuest = number(chosen?.dataset.perGuest) || 0;
  const minGuests = number(chosen?.dataset.minGuests) || 0;
  const price = Math.max(Math.max(guests, minGuests) * perGuest, minimum);
  const service = Math.max(10, Math.ceil(((guests / perHour) * 60) / 10) * 10);
  const values = {
    duration: duration(service),
    price: new Intl.NumberFormat(document.documentElement.lang || undefined).format(Math.round(price)),
    package: chosen?.dataset.name ?? "",
  };
  for (const slot of form.querySelectorAll("[data-slot]")) slot.textContent = values[slot.dataset.slot] ?? "";
  form.dataset.count = "set";
}

export function start(root) {
  const within =
    root === document
      ? [...document.querySelectorAll("[data-headcount]")]
      : [root, ...root.querySelectorAll("[data-headcount]")].filter((el) => el.matches("[data-headcount]"));
  for (const form of within) {
    if (forms.has(form)) continue;
    const field = form.querySelector("input[name=guests]");
    let slider;
    if (field) {
      slider = document.createElement("input");
      slider.type = "range";
      slider.min = field.min || "30";
      slider.max = field.max || "400";
      slider.step = "5";
      slider.value = field.value || "100";
      slider.className = "range range-xs mt-4 w-full max-w-[32rem]";
      slider.setAttribute(
        "aria-label",
        field.closest("fieldset")?.querySelector("legend")?.textContent.trim() || "Guests",
      );
      slider.addEventListener("input", () => {
        field.value = slider.value;
        update(form);
      });
      field.after(slider);
    }
    const onChange = () => update(form);
    form.addEventListener("input", onChange);
    form.addEventListener("change", onChange);
    forms.set(form, {
      slider,
      undo: () => {
        form.removeEventListener("input", onChange);
        form.removeEventListener("change", onChange);
        slider?.remove();
        delete form.dataset.count;
        for (const slot of form.querySelectorAll("[data-slot]")) slot.textContent = "";
      },
    });
    update(form);
  }
}

export function stop() {
  for (const state of forms.values()) state.undo();
  forms.clear();
}
