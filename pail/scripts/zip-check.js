// The ZIP check: a form with data-zip-check and one field. Each row of the zones table
// carries its ZIP codes (data-zips, space-separated) and its zone (data-zone); under the
// field, an answer line per zone ([data-zip-answer="zone-1"]) and one for a code no zone
// covers ([data-zip-answer="none"]), all written in the template. On submit, the script
// reads what was typed, marks the matching row (data-match), shows its answer line and
// copies the visitor's own code into its slot. A code starting with what a row lists also
// matches, so postcode districts ("SE15") work too. With no script, the form reloads the
// page at #zones and the table answers.
let stops = [];

function check(form) {
  const field = form.querySelector('input[name="zip"]');
  const typed = (field?.value || "").trim().toUpperCase().replace(/\s+/g, "");
  if (!typed) return;
  const section = form.closest("section") || document;
  const rows = [...section.querySelectorAll("[data-zips]")];
  const match = rows.find((row) =>
    row.dataset.zips
      .split(/\s+/)
      .filter(Boolean)
      .some((zip) => typed === zip.toUpperCase() || typed.startsWith(zip.toUpperCase())),
  );
  for (const row of rows) delete row.dataset.match;
  if (match) match.dataset.match = "";
  const key = match ? match.dataset.zone : "none";
  for (const line of form.querySelectorAll("[data-zip-answer]")) {
    line.hidden = line.dataset.zipAnswer !== key;
    for (const slot of line.querySelectorAll('[data-slot="zip"]')) slot.textContent = typed;
  }
}

export function start(root) {
  const forms =
    root === document
      ? [...document.querySelectorAll("form[data-zip-check]")]
      : [...root.querySelectorAll("form[data-zip-check]")];
  if (root !== document && root.matches?.("form[data-zip-check]")) forms.push(root);
  for (const form of forms) {
    const onSubmit = (event) => {
      event.preventDefault();
      check(form);
    };
    form.addEventListener("submit", onSubmit);
    stops.push(() => {
      form.removeEventListener("submit", onSubmit);
      for (const line of form.querySelectorAll("[data-zip-answer]")) {
        line.hidden = true;
        for (const slot of line.querySelectorAll('[data-slot="zip"]')) slot.textContent = "";
      }
      const section = form.closest("section") || document;
      for (const row of section.querySelectorAll("[data-zips]")) delete row.dataset.match;
    });
  }
}

export function stop() {
  for (const stop of stops) stop();
  stops = [];
}
