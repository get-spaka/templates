---
name: coteau-design
description: The Coteau template's design notes — read before changing this site's pages, sections, styles or lists.
---

# Coteau

A winery's site in daylight, drawn from one hillside of vines: a limestone-pale page, flared capitals like an engraved label, one deep grape-must purple and the pale green of unripe grapes. Every wine is a small striped hill from its vintage to its last good year, with a marker where it stands this year and one plain line that says what to do with it. Quiet and useful: nothing moves for show, nothing is dark, nothing glows.

## Type

- **Marcellus** for headings (h1 to h4 take it by themselves). It has one weight and no italic: headings are never bold or italic, and are sentence case. The hero is `text-[clamp(2.75rem,5.5vw+1rem,6rem)] leading-[1.02]`; a page's title `text-[clamp(2.75rem,4.5vw+1rem,5rem)]`; a section's `text-[clamp(2rem,2.6vw+1rem,3.25rem)]`; a wine on a card `text-[1.5rem]`, on its page `text-[clamp(2.5rem,3vw+1rem,3.5rem)]`. A small heading in the body face takes `plain-heading`.
- **Marcellus SC**, the label lettering: `wordmark` for the estate's name (spaced capitals), `eyebrow` for the small labels above headings ("Four ways to taste") and the style headings of the wine list. Never on body text.
- **Ysabeau Office** for body text, 1.0625 rem: `body-copy` (80 % of the text's color, relaxed leading), at most about 60 characters a line (`max-w-[58ch]`). Buttons in its 600. A tasting note sits in a `note` wrapper, whose first paragraph is set in the italic.
- **IBM Plex Mono** for the facts: `mono` (0.875 rem) and `mono-sm` (0.8125 rem) for years, lengths, the hours and the back label; `price` for prices (tabular figures, never wrapped).

## Color and shape

- Limestone (`bg-base-100`) for most of the page. Chalk stone (`bg-base-200`) for one band in two: the tastings, the library, the range, the forms' asides and the back label. Verjus (`bg-secondary`) for the hills, the "Open tonight" chip, initials and one light band per page at most (`parts/verjus-band.liquid`). Must (`primary`) fills the buttons, the hills' markers, the taste scale's arrow, the numbers of steps and pours, and one band on the home page (the club). The cellar (`bg-neutral`) is the footer only.
- Vine (`accent`) marks only: the rows on the hills, the dot of "Open it" and of "Walk in". Never vine text on verjus, never must on the cellar.
- The tones of the hills and labels are made from the theme's colors in `styles/site.css` (`--row`, the ridges' `--tone`, the labels' `--band`): keep ink on the light ones and limestone on must.
- A paper label's corner everywhere (`rounded-box`, `rounded-field`, 0.25 rem); hairlines in `base-300`; buttons are must filled (`btn btn-primary`) or outlined in ink (`btn btn-ink`). No shadows, no relief.

## Effects, and what turns each on

- **The hill** (`parts/hill.liquid`, pass `wine`, and `size: 'lg'` on the wine's own page): a figure with `data-hill`, the wine's years as `--vintage`, `--ready`, `--best` and `--by` in its style, and `--now`/`--year` from the year of rendering. The stylesheet draws the slope with `clip-path` from those numbers (rising to the ready year, flat to the best-until year, falling to the drink-by year), the rows as a slanted stripe, the four years under it, and the must marker on the slope at `--at` (registered with `@property`, `--now` by default). Liquid writes `data-stage` (`keep`, `open`, `drink-up`, `past`) and all four lines (`data-when`); the stylesheet shows the stage's. `scripts/hill.js` sets the visitor's day, puts right a stage passed since publishing (any element with `data-years="vintage ready best by"` and `data-stage`), and walks the marker up from the vintage when the hill comes into view. A wine without its three years shows "Ask us when to open it".
- **The range** (`parts/range.liquid`, pass `vintages`, the records of one `wine` sorted by vintage, and `this`, the page's own record id): `data-range` with `--from` and `--to`; each vintage a `data-ridge` placed on that line of years, later ones lower and in front, paler further back; a line marks this year, and the script sweeps it across from the first vintage.
- **Open tonight or for the cellar** (CSS only): a wrapper with `data-filter` holds radio inputs (`chip-input`, values `all`, `tonight`, `cellar`, and the style chips' `sparkling`, `white`, `pink`, `red`, `sweet`) each followed by its `label.chip`, then the cards (`data-card`, with `data-kind`) and, on the wines page, the groups (`data-group`). A card stays when its hill's stage fits. "All" is checked in the markup.
- **The typed label** (`parts/typed-label.liquid`, through `parts/wine-picture.liquid`): a wine without a photo is its label, on paper with the estate's name, the wine, its vintage and block and a band in its style's tone (`data-style`). A bottle photo in the record's `image` takes its place.
- **The taste scale** (in `parts/back-label.liquid`): `data-taste` on its wrapper (`dry`, `medium-dry`, `medium-sweet`, `sweet`) places the must arrow under the step.
- **Reveals** (`scripts/reveal.js`): `data-reveal` on a section's main element makes it rise a little into view, `data-reveal="stagger"` its children one after another.
- **Requests filled in from the link** (`scripts/prefill.js`): a form with `data-prefill` checks the option whose `data-param` and `data-value` match the address (`/visit?tasting=on-the-porch#book`, `/club?level=eight-bottles#join`); `data-value="*"` for any value.
- **The phone menu** is a `<dialog id="site-menu">` opened by `commandfor`/`command` buttons, with no script.

## How the lists work

- `products` are the wines, one record per vintage; `wine` is the name across vintages (it gathers a range), `name` the full name with the vintage. `featured` puts a wine on the home page, `available: false` sends it to the library, `next_release` to the club page. `style` chooses the label's band and the chips' kind.
- `vineyard-blocks` names the blocks a wine's `block` points to; `services` are the tastings (`walk_in`: `walk-in` or `booked`, `href` the booking link); `hours` are rows by `season`.
- The forms' choices repeat the names of the wines, tastings and events: change them together.

## Rules for the site's whole life

- One must band per page at most, one verjus band per page at most; the rest limestone and stone.
- Every wine keeps its hill: a new wine gets `ready_from`, `best_until` and `drink_by` from the maker, never guessed.
- No dark pages, no candlelight, no sunsets, no filters on photos: daylight, true color, pale skies and stone. Never a photo of another producer's bottle.
- Labels on buttons and links stay on one line (`whitespace-nowrap`); the header's links leave room for longer words.
