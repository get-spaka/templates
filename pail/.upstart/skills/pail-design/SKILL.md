---
name: pail-design
description: The Pail template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Pail

A flower shop's site read like its sidewalk on a market morning: light and fresh like tissue paper and cold water, this week's stems standing in a row of galvanized pails with their enamel price plates, and a plain line of type that says whether an order placed now goes out today. Quiet and useful: nothing moves for show, and nothing sells harder than the flowers do.

## Type

- Kalnia for headings, the big figures and the name, never italic (it has none) and never bold in a heading: headings are 300 at large sizes, 400 for small ones (a size's name, a wedding, a workshop), sentence case. The hero is `text-[clamp(3rem,6.5vw+1rem,6.75rem)] leading-[0.98]`; a page's title `text-[clamp(2.75rem,5vw+1rem,5.25rem)]`; a section's `text-[clamp(2rem,3vw+1rem,3.5rem)]`; a small heading `text-[1.5rem]`. `wordmark` is Kalnia's Victorian fat face (600, wide) for the name only; `figure-serif` for prices and month names in Kalnia.
- Commissioner for body text: `body-copy` (80 % of the text's color, relaxed), at most about 62 characters a line (`max-w-[62ch]`). Buttons are 600, sentence case.
- Sono, the plates' face, monospaced: `mono` (0.8125 rem) for labels above headings, the order-by line, a stem's line, the counter and small notes; `mono-md` for the week's rows, fees and ZIP codes; `figures` for tabular numbers. Never on a heading.
- Labels are sentence case, never spaced capitals.

## Color and shape

- Tissue (`bg-base-100`) for most of the page; zinc pale (`bg-base-200`) for the shelf the pails stand on, the zones, the forms' panels and one other band; blush (`bg-secondary`) for one light band per page at most (the weddings band, a closing band, the featured size); zinc dark (`bg-neutral`) only for the header's strip and the footer.
- Fern (`primary`) fills the main buttons and colors links in text (`text-link`, a 1 px underline). The other button is outlined in stem ink (`btn btn-outline`). Buttons and fields are pills.
- Ranunculus coral (`accent`) is a fill and a mark only, never text on a light ground: a picked stem's ring, the counter's badge, the "Now" month, the coral swatches.
- The pails' metal is mixed from zinc pale and zinc dark in `styles/site.css` (`--zinc-lit`, `--zinc-rib`, `--zinc-shade`, `--zinc-bright`), so the Theme tab restyles them with the rest. Soft corners (`rounded-box`) on photos and panels; hairlines in `base-300`, rules in stem ink above a list's items; dotted leaders (`leader`) between a stem and its price. No shadows.

## Effects, and what turns each on

- **The shop's clock** (`scripts/shop-clock.js`): reads the week from the footer's rows (`data-hours-row` with `data-weekday`, `data-day`, `data-opens`, `data-closes`, `data-delivers`, `data-cutoff`, and the times as shown inside, `data-time="cutoff"`, `data-time="closes"`) in the shop's time zone (`data-tz` on the footer), and sets `data-deliver` on `<html>`: `today` (before today's cutoff on a delivery day), `tomorrow`, `later-pickup` (the next delivery is later and the shop is still open today) or `later`; and `data-month` (jan to dec). Any line can follow it: one `<span data-when="…">` per state, and `data-when="plain"` for the page with no script (edit mode). Times go in empty slots the script fills: `<span data-slot="cutoff">`, `closes`, `next_day`. `parts/order-by.liquid` holds the site's order-by line: render it wherever the day matters. It is a plain line of type, never a sign, a card or a dot. Never write a sentence in the script.
- **The pails** (`parts/pail.liquid`, pass `stem`, and `pick: true` for a checkbox of the bunch): the stem's photo standing behind a pail drawn in CSS (`.pail-can`: rim, tapered body with two ribs, wire handle), with its plate (`$4 a stem`) and, under it, its name and its line (grower · distance · days in the vase). A stem's `height` (tall, medium, short) sets its photo's shape, so a row has an uneven skyline. With no photo, a green-to-blush stem stands in. Put pails in a `.shelf` (two to a row on a phone, three, then four) with `data-pails`: as it comes into view, `scripts/pails.js` lowers each stem into its pail in turn. On hover a stem sways a little.
- **Picking a bunch** (CSS only): a picked pail (`:has(:checked)`) lifts its stem, leans it and rings its plate in coral, and says "In your bunch". The counter after a shelf counts the checked pails: `<span class="count-badge picked-count"></span>` with the words in a `data-count="none"` span and a `data-count="some"` span (the badge shows the number, so "some" reads "3 picked: …"); it must come after the `.shelf` in the same parent. The home page's shelf is a GET form to `/flowers#order`; `scripts/prefill.js` checks the same stems in the order form (a form with `data-prefill`), and also reads `?size=`, `?plan=` and `?workshop=`.
- **The ZIP check** (`data-zip-check` on a form, `scripts/zip-check.js`): rows with `data-zips` (the codes, space-separated) and `data-zone`; answer lines under the field with `data-zip-answer` (a zone's id, or `none`) and a `data-slot="zip"` the visitor's code is copied into. The table works with no script.
- **The year in stems** (`parts/year.liquid`): `<details class="month" data-month-row="may">` per month, January open on a phone, all open from 768 px; the clock opens the current month and shows its "Now" (`.month-now`).
- **Swatches** (`swatch` with `data-tone`: white, blush, coral, deep, green, zinc): a stem's color family, made from the theme. `parts/stem-chips.liquid` draws a row of them with names (pass `names`, `stems: data.stems`, and `month` to link each to the season page). Keep stem ink on every swatch's label; deep, green and zinc carry no text.
- **Reveals** (`scripts/reveal.js`): `data-reveal` on a section's text makes it rise a little into view; `data-reveal="stagger"` does it for a list's children one after another.
- Nothing scrolls smoothly, nothing slides sideways (the pails wrap two to a row on a phone), no page transitions, no falling petals.

## Lists

- `stems`: every stem the shop sells across the year, in the order of the pails. `this_week` puts it in the pails, the order form and the counter's list; `months` (jan to dec) puts it in the season page; `tone` is its swatch; `from` (nearby, further) its mark; `price` a number in dollars. A wedding's `stems` and the chips match stems by their `name`: rename both together.
- `months`: the season page's twelve rows, each with its line; `key` matches the stems' `months`.
- `hours`: one record per day, Monday to Sunday, `weekday` and its times in 24-hour form ("13:00"), `opens` empty for a closed day, `delivers` and `cutoff` for same-day delivery; `hours` and `note` are the same in words. Change the hours here only: the footer, the about page and every order-by line follow.
- `sizes` (home and the order form; the order form's `size` choices are their ids), `zones` (`zips` read by the ZIP check), `plans` (the standing order form's `plan` choices are their ids), `weddings` (a page each), `workshops`, `growers`, `team` (initials until there are photos), `testimonials`, `home-doors`, `delivery-steps`, `delivery-notices`, `delivery-faq` (by `topic`), `flowers-faq`, `weddings-faq`, `standing-steps`, `wedding-steps`, `care-tips`, `navigation`.
- Collected: `orders`, `consultations`, `standing-orders`, `workshop-requests`, each answered by its fragment.

## Rules for the site's whole life

- One blush band per page at most; zinc dark only for the header's strip and the footer.
- Coral marks and fills; it never colors text on tissue or zinc pale.
- Stem photos are one kind of flower each, tall and upright, in daylight, fresh and cool rather than golden, with no filter; the pails and the zinc pull them together.
- The order-by line and the "Now" month read the hours and the clock: never write "today" or a cutoff as fixed text elsewhere, and never show the sun or the time of day as a picture.
- No watercolor florals, script fonts, falling petals or pink-and-gold luxury: the flowers are the decoration.
