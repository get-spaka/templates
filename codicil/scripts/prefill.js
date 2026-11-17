// The request, filled in from the link (data-prefill on the form):
// /consultation?with=miriam-carrow or ?area=employment checks the option whose
// data-key is that word. It writes no text and does not move; with no script,
// nothing is checked in advance.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

const FIELDS = { with: "with", area: "area" };

export function start(root) {
  const params = new URLSearchParams(location.search);
  for (const form of within(root, "form[data-prefill]")) {
    for (const [param, field] of Object.entries(FIELDS)) {
      const key = params.get(param);
      if (!key || !/^[\w-]+$/.test(key)) continue;
      const input = form.querySelector(`input[name="${field}"][data-key="${key}"]`);
      if (input) input.checked = true;
    }
  }
}
