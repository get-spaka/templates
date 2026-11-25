---
name: saucer-design
description: The Saucer template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Saucer

A daytime café's site that reads like its front door: milk-white pages, a soft round serif, a typed menu, one marmalade color like an egg yolk and a pale glass blue. The whole site knows what the kitchen is serving now, the hours are typed on the door's glass with a card that turns to open or closed, and the dishes are round plates seen from above, set down on the table as you scroll. Quiet and useful: nothing moves for show.

## Type

- Caprasimo for headings and the big words (the door card, "serves 12"). It has one weight and no italic: headings are never bold or italic, and are sentence case. The hero is `text-[clamp(3rem,6.5vw+1rem,6.5rem)] leading-[0.98]`; a page's title `text-[clamp(2.75rem,5vw+1rem,5rem)]`; a section's `text-[clamp(2rem,3vw+1rem,3.5rem)]`; a dish or a box on its own `text-[1.5rem]`.
- Spline Sans for body text: `body-copy` (80 % of the text's color, relaxed leading), at most about 60 characters a line (`max-w-[60ch]`).
- Spline Sans Mono, the typed face, for everything a kitchen slip would carry: `typed` (0.8125 rem) for labels above headings, the now line and small notes; `typed-md` for the hours; `dish-name` (1 rem, 500) and `dish-line` (0.9375 rem) for a dish; `price` for prices (tabular figures); `marks` (the mono's italic) for add-ons and diet marks. Put these classes on a `<p>` or `<span>`, never on a heading: headings take Caprasimo.
- Labels are sentence case with a little tracking, never spaced capitals.

## Color and shape

- Milk (`bg-base-100`) for most of the page. Oat (`bg-base-200`) is the tabletop under the plates (give that section the class `tabletop`, which makes the plates' rims milk), the menu's slip, slips and the form's panel. Glass blue (`bg-secondary`) for the door's pane, the coffee panel and one light band per page at most. Coffee (`bg-neutral`) for the catering band and the footer.
- Marmalade (`primary`) only ever fills: buttons, the door card's open side, the "This week" label, the steps' numbers, the underline of links (`text-link`). It is never text on a light ground.
- Chive (`accent`) is for small marks only: the dot of the now line (`dot now-dot`), today's dot on the door, the "Now" mark, the V and VG marks.
- Soft corners (`rounded-box`) on panels and photos that are not plates; buttons and fields are pills. Hairlines in `base-300`; dotted leaders (`leader`) between a dish and its price. No shadows.

## Effects, and what turns each on

- **What is served now** (`scripts/served-now.js`): the script reads the hours from the footer's rows (`data-hours-row` with `data-weekday`, `data-day`, `data-opens`, `data-lunch-from`, `data-kitchen-closes`, `data-closes`, in 24-hour times, and the times as shown inside, `data-time="opens"`…) in the café's time zone (`data-tz` on the footer), and sets `data-now` on `<html>`: `before`, `breakfast`, `lunch`, `coffee` (the kitchen closed, the counter open), `after` or `closed`, and `data-today`. Any line can follow it: write one `<span data-when="…">` per state, space-separated states allowed (`data-when="after closed"`), and one `data-when="plain"` for the page with no script (edit mode). Times go in empty slots the script fills: `<span data-slot="until"></span>` (when the current service ends), `opens`, `closes`, `next_day`, `next_opens`. `parts/now-line.liquid` holds the site's now line (the header, the hero and the footer render it). Never write a sentence in the script.
- **The door card** (`parts/door-card.liquid`, `data-door-card`): a `<button>` with two faces, the front marmalade ("Come in, we're open"), the back coffee ("Sorry, we're closed"), each with its typed line made of `data-when` lines. It turns to the true side when it comes into view and turns over when tapped; it never swings. Its stylesheet state is the front with a line that never claims the café is open ("Open Wednesday to Monday"). Render it with `{% render 'door-card' %}` (`string`, `width` optional) inside an element that sets `--hole` to the color behind it.
- **The door's glass** (`parts/door.liquid`, pass `hours: data.hours`): the hours typed on the pane, one line per record, the closed days struck through; the script marks today's line with a chive dot.
- **The menu served now** (`data-served-now` on the `menu-tabs` element in `parts/served-now-menu.liquid`): tabs are radio inputs, each followed by its `label.menu-tab` and its `div.menu-panel`; each input and label has `data-service` (breakfast, lunch, drinks, pastries). The first tab is checked in the markup; the script checks the tab of the hour (drinks once the kitchen is closed) and shows "Now" on it (`.now-mark` in the label). A new tab is one more input, label and panel in the same order.
- **Plates** (`scripts/plates.js`): a dish's photo is a plate, `<figure class="plate" data-plate><img src="…" class="object-cover"></figure>` (`parts/dish-plate.liquid` draws one from a record, with a cup on blue when there is no photo). On a list with `data-plates`, its plates are set down one after another as it comes into view; `data-plate="load"` sets one down when the page loads (the hero). Under the pointer a plate turns 10 degrees. Only dishes are plates: the room, the people's group photos and the catering band are `rounded-box` photos.
- **The steam** over the logo's cup (`parts/logo.liquid`, CSS only): it rises twice on load, then when the logo is hovered.
- **Reveals** (`scripts/reveal.js`): `data-reveal` on a section's text makes it rise a little into view; `data-reveal="stagger"` does it for a list's children one after another.
- Nothing scrolls smoothly, nothing slides sideways, no page transitions.

## Lists

- `menu`: every dish and drink, by `course` (breakfast, lunch, sides, pastries, drinks). `featured` puts it on the home page's table, `special` in "This week" (both on the menu page), `note` is its marmalade label ("This week", "Fridays only"), `served_with` puts a side under breakfast, lunch or both, `tags` give its marks. A dish without a photo is a typed row only; a featured dish needs a photo.
- `hours`: one record per day, Monday to Sunday, with `weekday` and its times in 24-hour form ("07:00"); `opens` empty for a closed day, `lunch_from` empty when breakfast runs all day; `hours` is the same in words, for blocks that show it. Change the hours here only: the door, the footer, the now line, the card and the menu's tabs all follow.
- `suppliers` (the home page and the story), `team` (the story, initials until there are photos), `catering`, `catering-steps`, `catering-faq`, `visit-notes`, `visit-faq`, `story-room`, `navigation`. `catering-requests` collects the catering form; its `items` choices are the boxes' names, written again as the form's checkboxes.

## Rules for the site's whole life

- One glass-blue band per page at most, one coffee band (besides the footer).
- Marmalade fills; it never colors text on milk or oat.
- Dishes are round, seen from above if possible; keep photos bright and warm, on pale tables, with no filter.
- The now line, the door card and the menu's tabs read the hours: never write "open now" or a time of day as fixed text, and never show the sun, light or a time of day as an image.
