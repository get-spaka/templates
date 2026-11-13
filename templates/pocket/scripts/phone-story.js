// The phone that stays (data-phone-story on the section). On a screen 1024 px wide or more, the
// chapters' screens ([data-screen]) are gathered into the first chapter's phone, which becomes
// the stage (data-stage) and sticks beside the texts, with the rail of chapter numbers; as each
// chapter's text reaches the middle of the screen, its screen slides up into the frame and the
// rail moves on. stop puts every screen and the rail back, and so does a stage that cannot stay
// pinned. On a narrower screen, each chapter's phone tilts in from 4° as it comes into view.
// With no script, under reduced motion and while editing, each chapter shows its text beside
// its own phone.
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const within = (root, selector) =>
  root === document
    ? [...document.querySelectorAll(selector)]
    : [root, ...root.querySelectorAll(selector)].filter((el) => el.matches(selector));

/** Marks the rail's link of the chapter shown. */
function current(links, index) {
  for (const [i, link] of links.entries()) {
    if (i === index) link.setAttribute("aria-current", "step");
    else link.removeAttribute("aria-current");
  }
}

const wide = () => matchMedia("(min-width: 1024px)");
const running = new Map();

function gather(section, unpinned) {
  const texts = [...section.querySelectorAll("[data-chapter]")];
  const cells = [...section.querySelectorAll(".story-phone")];
  const frames = cells.map((cell) => cell.querySelector(".phone"));
  const slot = frames[0]?.querySelector(".phone-slot");
  if (!slot || texts.length < 2 || cells.length !== texts.length) return () => {};
  const screens = frames.map((frame) => frame?.querySelector("[data-screen]"));
  const homes = screens.map((screen) => screen && { parent: screen.parentElement, next: screen.nextSibling });
  const rail = section.querySelector(".story-rail-wrap");
  const railHome = rail && { parent: rail.parentElement, next: rail.nextSibling };
  const links = rail ? [...rail.querySelectorAll("a")] : [];
  const stage = cells[0];
  const sticky = stage.querySelector(".story-sticky");
  const tab = frames[0].getAttribute("data-tab");

  section.style.setProperty("--chapters", String(texts.length));
  stage.setAttribute("data-stage", "");
  section.setAttribute("data-story-on", "");
  screens.forEach((screen, i) => {
    if (!screen) return;
    if (i > 0) slot.append(screen);
    screen.style.transform = i === 0 ? "translateY(0%)" : "translateY(100%)";
    screen.inert = i !== 0;
  });
  if (rail && sticky) sticky.prepend(rail);

  let active = 0;
  const show = (next) => {
    if (next === active) return;
    const down = next > active;
    screens.forEach((screen, i) => {
      if (!screen) return;
      screen.inert = i !== next;
      if (i === next) {
        screen.style.zIndex = "2";
        Motion.animate(
          screen,
          { y: [down ? "100%" : "-30%", "0%"], opacity: [down ? 1 : 0.4, 1] },
          { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        );
      } else if (i === active) {
        screen.style.zIndex = "1";
        Motion.animate(
          screen,
          { y: down ? "-30%" : "100%", opacity: down ? 0.4 : 1 },
          { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        );
      } else {
        screen.style.zIndex = "0";
        screen.style.transform = i < next ? "translateY(-30%)" : "translateY(100%)";
      }
    });
    for (const [i, text] of texts.entries()) text.toggleAttribute("data-active", i === next);
    current(links, next);
    frames[0].setAttribute("data-tab", frames[next]?.getAttribute("data-tab") ?? tab);
    active = next;
  };
  texts[0].setAttribute("data-active", "");
  const views = texts.map((text, i) => Motion.inView(text, () => show(i), { margin: "-45% 0px -45% 0px" }));

  // If the stage cannot stay pinned (sticky positioning turned off, as a page capture
  // does), each chapter gets its own phone back rather than one phone left at the top.
  const holds = () => !sticky || getComputedStyle(sticky).position === "sticky";
  const pinned = new MutationObserver(() => {
    if (!holds()) queueMicrotask(unpinned);
  });
  if (sticky) pinned.observe(sticky, { attributes: true, attributeFilter: ["style", "class"] });
  if (!holds()) queueMicrotask(unpinned);

  return () => {
    pinned.disconnect();
    for (const stop of views) stop();
    screens.forEach((screen, i) => {
      if (!screen || !homes[i]) return;
      homes[i].parent.insertBefore(screen, homes[i].next);
      screen.style.cssText = "";
      screen.inert = false;
    });
    if (rail && railHome) railHome.parent.insertBefore(rail, railHome.next);
    current(links, 0);
    for (const text of texts) text.removeAttribute("data-active");
    frames[0].setAttribute("data-tab", tab);
    stage.removeAttribute("data-stage");
    section.removeAttribute("data-story-on");
    section.style.removeProperty("--chapters");
  };
}

function tiltIn(section) {
  const stops = [...section.querySelectorAll(".story-phone")].map((cell) => {
    cell.style.opacity = "0";
    cell.style.transform = "translateY(32px) rotate(4deg)";
    const stopView = Motion.inView(
      cell,
      () => {
        Motion.animate(cell, { opacity: 1, y: [32, 0], rotate: [4, 0] }, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
      },
      { amount: 0.1 },
    );
    return () => {
      stopView();
      cell.style.opacity = "";
      cell.style.transform = "";
    };
  });
  return () => {
    for (const stop of stops) stop();
  };
}

export function start(root) {
  if (reduced()) return;
  for (const section of within(root, "[data-phone-story]")) {
    if (running.has(section)) continue;
    const query = wide();
    let undo = () => {};
    const unpin = () => {
      undo();
      undo = () => {};
    };
    const change = () => {
      undo();
      undo = query.matches ? gather(section, unpin) : tiltIn(section);
    };
    change();
    query.addEventListener("change", change);
    running.set(section, () => {
      query.removeEventListener("change", change);
      undo();
    });
  }
}

export function stop(root) {
  for (const section of within(root, "[data-phone-story]")) {
    running.get(section)?.();
    running.delete(section);
  }
}
