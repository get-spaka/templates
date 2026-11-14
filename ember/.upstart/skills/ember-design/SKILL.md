---
name: ember-design
description: The Ember template's design notes — read before changing this site's pages, sections, styles, menu, wines, evening or hours.
---

# Ember

An evening seen by candlelight. The site opens on the dark room, and the visitor's pointer carries a warm light that brings it out of the shadow. The pages are paced like a film: one scene per screen, slow reveals, photos that drift as the page scrolls, an evening that runs from the first pour to the last glass as you scroll down it. A table, a private room or a gift card is never more than one tap away.

It was written for a wine bar and wood-fire kitchen; it suits a cocktail bar, a steakhouse, a tasting-menu dining room, an izakaya, a jazz bar, a wine shop with a bar or a hotel's restaurant. Rewrite the dishes, the wines, the rooms and the evening, and keep the dark, the one warm light and the slow pace.

## Type

- **Bodoni Moda** for headings, the name and large figures, light (400 to 500, never bold), in sentence case. A section title is `text-5xl md:text-6xl`; a page title `text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] tracking-tight`. Large figures (the evening's hours, the course numbers, the "14" of the Cellar Room, prices of the tasting menu) take `class="display"` on a `<p>` or `<span>`.
- **Hanken Grotesk** for the body: running text with `prose-ember` (cream at 80%, relaxed leading).
- **Labels, times and prices**: `class="tag"` (small, uppercase, widely spaced, tabular figures; 13 px at least on a desktop). It is not daisyUI's `label`, which is a form field's. Buttons carry it too: `btn btn-outline btn-primary tag`.
- Only the roman of Bodoni is shipped: no italic accents in headings.

## Color and shape

- The room is dark: `bg-base-100` (warm near-black) and `bg-base-200` for long sections, `bg-neutral` (night) for the hero, page titles, what's on and the footer, `bg-secondary` (oxblood) for one warm band a page at most (the Cellar Room, the tasting menu, the cellar, gift cards).
- The main color (amber) is the candlelight: labels, links, buttons, prices on the lists. The accent (ember) is only for the open tonight dot.
- The menu card (`class="menu-card"`) is the one light surface of the site: cream paper with the room's dark as ink. Keep it unique.
- Square photos and panels (no radius), pill buttons and fields, hairline borders (`border-base-300`, `divide-base-300`), dotted leaders between a name and its price (`<span class="leader" aria-hidden="true"></span>` in a `flex items-end` row).
- Fields on a dark section: `input field-ember`, `select field-ember`, `textarea field-ember rounded-box`.
- **Photos** are chosen low-key: tungsten or firelight, deep shadows, dark backgrounds, no daylight or white tablecloths, no faces but the team's. Put `data-grade` on an image's frame (or the `<img>`): a little less color, a little more contrast, so any set reads as one.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: everything is where the stylesheet puts it.

- **The candlelight**: `<figure class="candle …" data-candlelight data-grade>` holding `<div class="candle-media" data-fade-in><img …><canvas data-shader aria-hidden="true"></canvas></div>`. The script draws the photo darkened, with a pool of the main color's light that follows the pointer, flickers and carries a grain; on a phone it drifts near the name. Without WebGL, a CSS light (`--candle-x`, `--candle-y`) does the same. Keep the `<img>` inside: it is the texture, and what editing shows. Give the figure a height (`h-[78svh] md:h-[86svh]`).
- `data-fade-in` on the hero's media: it comes up from black and settles at a scale of 1.04.
- `data-flicker` on the name (`<h1>`, one text node): its letters come up from a blur in a random order, like candles being lit, then it is plain text again.
- `kern-first` on the name wherever it is set large (the hero's `<h1>`, the footer's wordmark, the header's logo): its first letter is pulled toward the second, in plain text and once split into letters. Keep it when the name begins with W, V, T, Y or A (their diagonals leave a gap at poster size); remove it for any other first letter.
- `data-candle` on a dark section (`bg-secondary` or `bg-neutral`): a soft amber light follows the pointer over it.
- `data-reveal` on a section's main elements: they rise slowly out of a blur as they come into view. Put it on a block of content, not on every line.
- `data-curtain` on a large image's frame (with `overflow-hidden` and an aspect): it opens from its middle outward.
- `data-drift` on an image's frame (`overflow-hidden`, an aspect, the `<img>` `size-full object-cover`): the photo moves inside its frame as the page scrolls.
- `data-kindle` on a statement (a `<p class="display …">`, plain text): its words light up one by one as they cross the middle of the screen.
- **The evening**: `data-evening` on the section, `data-evening-hour` on the large hour in the sticky left column, `data-evening-moment` on each moment and `data-evening-time` on its own time (`class="evening-own-time"`). The background deepens to night as it scrolls and the hour changes to the moment crossing the middle. The times are short figures ("5", "7", "10:30", "12"): keep them short so the hour fits.
- **Open tonight**: `data-tonight` on a line, with its sentences in `data-open`, `data-bar`, `data-later` and `data-next` (`{kitchen}`, `{closes}`, `{opens}`, `{day}`) and the text in `<span data-tonight-text>`, read from the page's hours rows (`data-hours-row` with `data-weekday`, `data-day`, `data-opens`, `data-kitchen`, `data-closes` in 24 h). The footer has the rows on every page. A closing at `00:00` is midnight. The written text is what shows while editing: keep it true.
- On the menu page each course's picture is `md:sticky md:top-28` beside its dishes; the menu card is `md:-rotate-2` and straightens under the pointer.
- The header is transparent over the hero and turns to night as the page scrolls; pages cut through black from one to the next; smooth scrolling runs by itself.

## Lists

- `menu`: `course` is one of snacks, raw-bar, small-plates, hearth, sides, sweet (the menu page names them in `parts/courses.liquid`: change both together); `tags` are the diet marks (V, VG, GF); `featured` puts a dish on the home page's menu card (four); a course's picture is its first dish with an image.
- `menu-tasting`: the tasting menu's courses, each with the pairing's wine. Its prices are written in `parts/tasting.liquid`.
- `wines`: `style` groups them; `by_the_glass` puts a wine in the glass list (with its glass and bottle prices), the others are the cellar's bottles; `featured` puts five on the home page.
- `home-evening`: the evening's moments, four is best. `private-rooms`: the rooms with their seats and minimum spend. `events`: each has its page at `/events/<id>`, newest last by date. `team`, `hours` (one row per weekday), `home-press`, `story-suppliers` and `visit-faq`.
- `reservations`, `enquiries` and `newsletter` collect the forms' answers.

## When adapting

- The name is in the header, the hero, the footer's wordmark and every `<title>`; the address in the footer, the visit page and the event pages.
- Opening hours, prices, minimum spends, corkage and the kitchen's last orders are the owner's: ask for them or leave them out rather than guess. When the hours change, change the `hours` records, the written open tonight lines and the reservation form's times together.
- Keep one oxblood band per page and the cream card unique, or the room stops being dark.

## Template questions

The maker answered these on the start screen; the first message says how. Do what the answer says, then adapt the rest as usual.

### How do guests book a table?

- Online, with the form: keep `parts/reserve.liquid` on the visit page and the `reservations` datasource; its times follow the `hours`.
- By phone: replace the form in `parts/reserve.liquid` by the phone number set large (`display`) and a `btn btn-primary tag` call button (`href="tel:…"`); point every "Book a table" link to it; delete `data/reservations/`.
- Walk-ins only: the reserve section says how the evening works without booking (first come, the bar while you wait); remove the booking buttons from the header and the hero, and `data/reservations/`.

### Private dining and events?

- Both: keep them.
- Events only: delete `pages/private-dining.liquid`, `parts/cellar-room.liquid` where it is rendered, `data/private-rooms/`, `data/enquiries/` and its navigation record.
- Private dining only: delete `pages/events/`, `data/events/`, `parts/whats-on.liquid` and `parts/wine-dinners.liquid` where they are rendered.
- Neither: both of the above. The home page keeps its rhythm: one scene per screen, one oxblood band.
