// The request, filled in from the link (data-prefill on the form): /book?with=mo-bell,
// ?service=skin-fade or ?level=2 checks the option whose data-key holds that word
// (a level's chip has data-key="level-2"). It writes no text and moves nothing; with no script
// nothing is checked in advance.
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

export function start(root) {
  const params = new URLSearchParams(location.search);
  const wanted = [
    ["service", params.get("service")],
    ["with", params.get("with")],
    ["with", params.get("level") && `level-${params.get("level")}`],
  ];
  for (const form of within(root, "form[data-prefill]")) {
    for (const [field, key] of wanted) {
      if (!key || !/^[\w-]+$/.test(key)) continue;
      const input = form.querySelector(`input[name="${field}"][data-key~="${key}"]`);
      if (input) input.checked = true;
    }
  }
}
