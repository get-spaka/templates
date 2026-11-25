---
name: taper-design
description: The Taper template's design notes — read before changing this site's pages, sections, styles, prices, levels, hours, cut book or forms.
---

# Taper

A daylit neighborhood shop with the door propped open: plain spoken, light and exact. Every head pays for its time in the chair at the level of whoever cuts, and the site says so with one code, the fade: four tonal steps from a pale wash to deep blue-green, the deeper the step, the more years in the chair. Motion is quiet and useful: a little barber pole that turns only while the shop is open, the price grid's steps darkening in turn, the week's bars drawn from opening to closing, and a hand mirror that turns a cut to show its back.

## Type

- **Gloock** for headings, the name and large figures. It has one weight (400) and no italic: never `font-bold` or `italic` on a heading, never italic accent words. Sentence case. A page title is `text-[clamp(3rem,5vw+1rem,5.5rem)] leading-[0.98] tracking-[-0.01em]` (the home page's at up to 6.5 rem); a section title `text-[clamp(2rem,3vw+1rem,3.5rem)] leading-[1.05] text-balance`; small headings `text-[1.375rem]` to `text-[1.5rem]`.
- Large figures (chair times, minutes, level numbers, years) take `class="display"`.
- **Funnel Sans** for everything else: running text at `text-lg leading-relaxed text-base-content/80`, at most `max-w-[62ch]`.
- Labels take `class="board"`: 12 px, semibold, uppercase, spaced, like the lettering of a price board. A label over a section title is `board text-primary`. Prices, hours and phone numbers take `class="figure"`: semibold with tabular figures.
- A long text written in Markdown (a cut's story, a person's words, an answer) goes in `class="prose-taper"`.

## Color and shape

- Towel white (`bg-base-100`) for most sections; lather (`bg-base-200`) for one panel at a time (the week at the chair, the menu, the promises, the years, the form's aside); the pale wash (`bg-secondary`) for the clients' quotes and small notes; night (`bg-neutral`, with the class `on-night`) for the booking band and the footer only.
- **The four steps of the fade** are not theme colors: the stylesheet mixes them from the primary and the surface (`--fade-1` to `--fade-4`), so the Theme tab restyles them. Put `data-step="1"` to `"4"` on any element to give it that step's tone and its text color: steps 1 and 2 carry ink, steps 3 and 4 light text. If the palette changes, keep the primary deep enough for light text and the surface light enough for ink.
- Blue-green (`primary`) is for buttons, links and labels. Vermilion (`accent`) is for marks only: the pole's stripe, the now line, the walk-in stripes, the mirror's rim, today's dot. Never small text in vermilion.
- Buttons are full pills (`btn`, rounded by the stylesheet), the one round shape besides the pole and the mirror; photos, panels and cards take the small `rounded-box`. Hairlines between rows (`border-base-300`, `divide-base-300`) rather than boxes. No shadows, no relief.
- **Photos** are daylight with true skin tones, pale walls, chrome and wood: no flash, no logos or watermarks, no sepia, no barbershop clip art (red-white-blue poles as decoration, mustaches, razors, skulls). Faces only for the team and for clients where a photo shows a cut. No filter is applied.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: every step is in its tone, the pole stands still, the week's bars are drawn, each cut's mirror is small in its corner.

- **The fade**: `data-fade` on a price grid (`parts/rates.liquid`), each column's cells `data-step` and `data-col`. When the grid comes into view, `scripts/fade.js` plays it: the steps darken from the surface's tone to their own, the palest first, each column's figures with them. `data-fade="band"` is a thin row of the four steps (`<span data-step="1"></span>` … `"4"`) that closes the hero, the grid and the footer; it does not move.
- **The price grid on a phone**: level chips above the grid (radio inputs whose `name` ends in `-level`) choose the column shown beside the chair times; level 2 is checked by default. On wider screens every column shows and the chips are hidden. Each grid on a page needs its own `name` (`{% render 'rates', name: "home" %}`).
- **The open sign**: `{% render 'open-sign' %}` (parameters `short`, `large`, `class`) writes `data-open-sign`, the pole (`<span class="pole">`) and one line per moment: the week's line, then for each open day "Open now, until …" (`data-line="open"`), "Closed now, opens today at …" (`data-line="later"`) and "Closed now, opens Tuesday at …" (`data-line="closed"`), each `data-for` its weekday. `scripts/open-sign.js` reads the week from `data-week` (written from `hours`) in the shop's time zone (`data-tz`), sets `data-state="open"` or `"closed"` on the sign and `data-current` on the true line; the stylesheet shows it, and turns the pole only while open. With no script only the week's line shows. Rewrite the lines in the part, never in the script.
- **The week at the chair**: `{% render 'week' %}` (parameters `large`, `class`) draws `data-week-chart`, a row per `hours` record (`data-weekday`), its bar placed by `--opens` and `--closes` in minutes since midnight on a day from 8 am to 9 pm, its walk-in part striped by `--walk-in-from` and `--walk-in-until`; all computed from the records. The script marks today's row (`data-today`) and draws a vermilion line at the current time; `scripts/fade.js` grows the bars, one row after another, once the chart is in view.
- **The hand mirror**: `data-mirror` on a cut card (`parts/cut-card.liquid`) holding the front photo and the back photo marked `data-back`, with `<span class="mirror-rim">`. At rest the back sits in an oval at the lower right with a vermilion rim and handle; under the pointer or the keyboard's focus, once the page moves, the oval grows until the back fills the card and the label turns from "Front" to "Other side". On a phone it stays in its corner; the cut's page shows both photos large.
- **The cut book's filter**: hair type chips (radio inputs, values `all`, `straight`, `wavy`, `curly`, `coily`) over cards marked `data-hair`; the stylesheet keeps the chosen type's cuts, all of them under "All". A new hair type needs its rule in `styles/site.css` beside the others.
- **The request filled in from the link**: `data-prefill` on the form. `/book?service=<service id>`, `?with=<person id>` and `?level=<n>` check the option whose `data-key` holds that word (`level-2` for a level's chip).
- `data-reveal` on a section's main element: it rises a little into view. `data-reveal="stagger"` on a list or grid: its children rise 70 ms apart. Put them on every new section.
- The header is sticky on towel white and does not change as you scroll.

## Lists

- `levels`: four records, each with its `number`, `name`, `meaning` and `step` (1 palest to 4 deepest). They are the grid's columns, the chips on the people (`{% render 'level-chip', level: 3 %}`) and the form's "By level": one edit changes all three.
- `rates`: one record per chair time (`minutes`), with `price_1` to `price_4` written with their currency ("$34") and what usually takes that time. The home page shows the first four.
- `services`: each with its `group` (Cuts, Color, Shaves & beards, Kids & extras: the menu and the form list these groups by name), `minutes` (a row of `rates`: the menu shows that row's level 1 price as "from"), `from` when the time varies with the hair, and `flat_price` for what ignores the grid (kids' cuts, the free consultation). `price` and `duration` are what the gallery's blocks show: keep them in step.
- `team`: `level` (1 to 4), `pronouns`, `cuts_most`, `days`, `station`, `instagram` (the handle shown is the address's last part) and their words in the first person as the body. Without a `photo`, a person shows their initials on their level's step.
- `gallery`: the cut book. `image` is the front, `back` the back in the mirror, `category` the hair type, `by` the person's page (`/team/tasha-greer`, which links the cut to them), `service` a service's id (for "Book this cut"), `minutes`, `comes_back` ("every 3 to 4 weeks"), `ask_for` (the line to say at the chair), `product`, and `featured` for the home page (six at most).
- `hours`: seven records, Monday first; `hours` is the text shown, `opens`, `closes`, `walk_in_from` and `walk_in_until` are 24-hour times ("10:00") that the sign and the chart compute from, empty on a closed day; `weekday` (monday … sunday) tells the sign which day each record is.
- `home-features` (the hero's three facts), `testimonials`, `promises`, `prices-faq`, `book-faq` (the rules), `milestones`, `shelf` and `navigation` (`place`: both, header, footer or social).
- `bookings` collects the request form. Its fields' choices (days, time of day, first visit, hair length) are written in the form (`parts/request-form.liquid`) and in `data/bookings/_datasource.yaml`: change both together. The services, levels and people come from their lists.

## Rules for the site's whole life

- Prices are by chair time and level, never by gender: no men's and women's menus, no "ladies' cut".
- One code for experience: the four steps. Never use a step's tone for anything but a level (and the bands).
- Say plainly that a request is not a booking until the shop confirms it, wherever there is a booking button or form.
- No colors of the site's own: everything comes from the theme, so the Theme tab restyles it all, the steps and the pole included.
