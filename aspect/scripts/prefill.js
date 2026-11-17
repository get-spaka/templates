// The request, filled in from the link (data-prefill on the form):
// /sell?with=kari-halvorsen checks the broker whose data-key is that id, and
// /sell?hood=fairhaven chooses that neighborhood. It writes no text and does
// not move; with no script, nothing is chosen in advance.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

export function start(root) {
  const params = new URLSearchParams(location.search);
  for (const form of within(root, "form[data-prefill]")) {
    for (const [param, value] of params) {
      if (!/^[\w-]+$/.test(value)) continue;
      const option = form.querySelector(`[data-prefill-from="${param}"] [data-key="${value}"]`);
      if (option instanceof HTMLOptionElement) option.selected = true;
      else if (option instanceof HTMLInputElement) option.checked = true;
    }
  }
}
