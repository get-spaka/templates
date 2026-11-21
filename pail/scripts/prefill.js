// The bunch carried to the order form: the home page's shelf sends its checked stems to
// /flowers with a plain GET (?stems=Ranunculus&stems=Tulips), which works with no script.
// Here, on a form with data-prefill, the script checks the matching boxes of the pails
// (by their value), chooses the size from ?size=armful, the plan from ?plan= and the
// workshop from ?workshop= (by the option's data-id). It writes no text and moves
// nothing; stop puts the form back as the page had it.
let undo = [];

function setChecked(input, value) {
  const before = input.checked;
  input.checked = value;
  undo.push(() => {
    input.checked = before;
  });
}

export function start(root) {
  const params = new URLSearchParams(location.search);
  if (![...params.keys()].length) return;
  const forms =
    root === document
      ? [...document.querySelectorAll("form[data-prefill]")]
      : [...root.querySelectorAll("form[data-prefill]")];
  if (root !== document && root.matches?.("form[data-prefill]")) forms.push(root);
  const stems = new Set(params.getAll("stems").map((s) => s.toLowerCase()));
  for (const form of forms) {
    for (const box of form.querySelectorAll('input[type="checkbox"][name="stems"]')) {
      if (stems.has(box.value.toLowerCase())) setChecked(box, true);
    }
    const size = params.get("size");
    if (size) {
      const radio = form.querySelector(`input[type="radio"][name="size"][value="${CSS.escape(size)}"]`);
      if (radio) setChecked(radio, true);
    }
    for (const [param, attr] of [
      ["plan", "value"],
      ["workshop", "data-id"],
    ]) {
      const wanted = params.get(param);
      const select = form.querySelector(`select[name="${param}"]`);
      if (!wanted || !select) continue;
      const option = [...select.options].find((o) => o.getAttribute(attr) === wanted);
      if (!option) continue;
      const before = select.selectedIndex;
      select.value = option.value;
      undo.push(() => {
        select.selectedIndex = before;
      });
    }
  }
}

export function stop() {
  for (const step of undo.reverse()) step();
  undo = [];
}
