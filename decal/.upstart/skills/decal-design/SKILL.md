---
name: decal-design
description: The Decal template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Decal

A food truck's site that answers where it is today, in road paint. Napkin-white pages with bands of asphalt, one loud road-sign yellow, a guava pink and the orange of a traffic cone. The week is drawn from above as parking bays on asphalt, each day painted on the road in long white letters, and a small yellow truck sits in today's bay. Short and useful: nothing moves for show.

## Type

- Bagel Fat One for headings and the big words (the truck's name, the footer's "Follow the truck", the dates' days). It has one weight and no italic: headings are never bold or italic, always sentence case. The hero is `text-[clamp(2.75rem,5.5vw+1rem,6rem)] leading-[0.98]`; a page's title `text-[clamp(2.75rem,5vw+1rem,5rem)]`; a section's `text-[clamp(2rem,3vw+1rem,3.25rem)]`; a stop, a dish or a package on its own `text-[1.5rem]`.
- Overpass, drawn from American road signs, for body text: `body-copy` (80 % of the text's color, relaxed leading), at most about 62 characters a line. Buttons are Overpass 700, sentence case.
- Overpass Mono for what a sign or a ticket would print: `sign-label` (0.75 rem, uppercase, spaced) for labels above headings; `mono` (500, figures in columns) for hours, prices and the data plate.
- Road paint (`paint`): Overpass 800, uppercase, stretched 1.8 times tall from its baseline, white on asphalt. Only the bays' days and "Home"; it is `aria-hidden`, since each day is written plainly beside it. No other text is stretched.
- The menu board: dish names in `board-dish` (Overpass 700, light capitals), their lines in `board-line`, prices in `board-price` (yellow mono), marks in `board-marks` (pink: V, VG, GF and a small chili).

## Color and shape

- Napkin white (`bg-base-100`) for most of the page; wax paper (`bg-base-200`) for the stops' details, the form's panel, the data plate and alternate sections.
- Asphalt (`bg-neutral`) for the parking row, the menu board, the window's awning, the booking band, the steps and the footer. Text on it is road-paint white (`text-neutral-content`).
- Truck yellow (`primary`) fills: the truck, the window's panel, buttons, the keep-clear hatching, the crew's initials; on asphalt it is also the prices' color. It is never text on a light ground. Yellow buttons keep a 2px ink border.
- Guava pink (`secondary`): the week's special card, the events' date blocks, and one light band per page at most ("Feeding a crowd?").
- Cone orange (`accent`): only the "Today" flag on a bay, the truck's tail lights and the guest count's marker.
- Corners are a step van's: `rounded-box` (0.75 rem) on panels, photos and fields; no pills, no shadows. Borders are 2px ink where they draw (the truck, the window, the plate, the buttons), 1px hairlines elsewhere.

## Effects, and what turns each on

- **The parking row** (`parts/parking-row.liquid`, `{% render 'parking-row', stops: data.stops %}`, `full: true` for addresses and notes): home base, then each day's stops in order, a keep-clear box for a day with none; on a desktop two facing rows across a dashed lane, on a phone one bay to a line. Each stop is a `parts/bay.liquid` with `data-stop`, `data-day`, `data-starts`, `data-ends` and `data-off`; its days and times come through `parts/day-name.liquid` and `parts/time.liquid`. A stop marked "Not this week" (`off`) is hatched with its note. The row carries the truck's time zone in `data-tz`.
- **Where the truck is** (`scripts/parking-row.js`): it sets `data-state` on every `[data-stop]` (`today`, `next`, `past`) and `home` on the home bay, then parks the truck (`[data-truck]` in the home bay's `[data-truck-spot]`) in today's bay; as the row comes into view it noses in from the lane. Any line can follow a stop's state: write `<span data-when="today">…</span>` (or `next`, `home`) inside the element that has `data-stop`, with empty slots `<span data-slot="starts"></span>` and `ends` that it fills from that element's `[data-time="starts"]`. A past bay fades to half. Never write a sentence in the script, never say open or closed: the truck says where.
- **Today's strip** (`parts/today-strip.liquid`): a yellow strip with today's stop, else the next, from the same states; with no script, its plain line.
- **The window** (`parts/window.liquid`, `image` passed): the hero's photo in a rounded opening of the yellow panel (`window-panel`, `window-opening`), the asphalt awning above (`awning`) and the counter ledge (`ledge`). It never moves.
- **The board** (`board`, on asphalt): `parts/board-home.liquid` (featured dishes) and `parts/menu-board.liquid` (every course); the week's special on its pinned pink card (`parts/special-card.liquid`, the first dish marked `special`).
- **The data plate** (`data-plate`, `plate-cells`): the truck's facts in ruled mono cells with four rivets.
- **The guest count** (`data-headcount` on the booking form, `scripts/headcount.js`): the line under the guests (`count-line`) shows `data-shows="plain"` until there is a count, then `data-shows="count"` with its slots `duration`, `price` and `package`. The figures are the form's attributes (`data-per-hour`, `data-minimum-weekday`, `data-minimum-saturday`) and each package radio's (`data-per-guest`, `data-min-guests`, `data-name`). The script adds a slider beside the number field.
- **Reveals** (`scripts/reveal.js`): `data-reveal` on a section's text makes it rise a little into view; `data-reveal="stagger"` on a list does it for its children. Never on the first screen (the hero, a page's title): it is there from the start.
- No smooth scrolling, no marquee, nothing sliding sideways, no page transitions.

## Lists

- `stops`: the regular week, in `order`; `day` (mon to sun), `starts` and `ends` in 24-hour form ("11:00"), `area`, `address`, `map` (the Directions link), `note`, `off` (not this week). Change the week here only: the row, the bays' lines and the menu page's strip follow. A day with no record is a keep-clear box (its words are in `parts/bay.liquid`).
- `menu`: every dish by `course` (mains are "Rice plates & bowls", starters "Skewers & snacks", desserts "Sweets"); `featured` puts it on the home page's board, `special` on the pink card, `tags` give its marks, `image` its photo (a dish without one is a line on the board only).
- `events` (festivals and pop-ups, by date), `team` (initials until there are photos), `gallery`, `testimonials`, `where-features`, `where-faq`, `book-plans`, `book-stats`, `book-steps`, `book-faq`, `navigation`. `event-requests` collects the booking form; `newsletter` the Monday email.

## Rules for the site's whole life

- One loud color, the yellow; pink and cone orange stay small. Yellow never colors text on white.
- The road paint is stretched once in CSS and never moves; the bay lines and the lane are painted from the start.
- The truck says where it is, never whether the window is open: no "open now" and no time of day written as fixed text.
- Photos are bright, warm and outdoor, in daylight or early evening; no dark food shots, no filter.
- No condensed poster capitals, no stickers, no ribbon or marquee, no map embed.
