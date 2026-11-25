---
name: transfer-design
description: The Transfer template's design notes — read before changing this site's pages, sections, styles, flash, artists, guests or forms.
---

# Transfer

A tattoo shop on a sheet of flash. Bristol board and India ink, three flash colors and the violet of a thermal stencil; a blackletter wordmark at poster size, numbered and priced drawings, ruled pencil lines. Every design arrives the way a tattoo is made: a violet stencil lands a little off register, then the ink takes over it. The shop is light, never the usual dark and smoky one; things are square to the page, never tilted.

## Type

- **Grenze Gotisch** (a readable blackletter) for the wordmark, page titles, section titles, the artists' names, flash numbers and prices, and the guests' dates. The hero's wordmark `gothic text-[clamp(6rem,27vw,19rem)] leading-[0.8] tracking-[-0.02em]`, one word a line on a phone; a page title `text-[clamp(3.5rem,11vw,9rem)] leading-[0.85]`; a section title `text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95]`; sentence case. Outside a heading, `class="gothic"` sets it ("No. 14", "$180", "3–7").
- **Encode Sans** for everything else: text at 1.0625rem, `leading-relaxed text-base-content/80`; smaller headings (cards, steps, forms) in Encode Sans 600 with `class="sans"` on the `<h3>` (Spaka's heading rule would set them in blackletter otherwise); `class="caps"` (600, condensed width 75, 0.75rem, uppercase, spaced, tabular figures) for labels, sizes ("4 in."), dates, styles and books; buttons and header links at width 87.5.
- `class="pill"` for an artist's or guest's styles; `class="dot"` (flash yellow) before "Books open", "In the chair now", "New", "Walk-ins".

## Color and shape

- Bristol (`bg-base-100`) is the ground of every page; vellum (`bg-base-200`, a tracing paper with a faint lilac) for flash cards, the request form's aside, the claim section and the every-day list; ink (`bg-neutral`) for the artists' roster, flash day, the full-screen menu and the footer only.
- Flash red (`primary`) for buttons, prices, links and the redness of a fresh tattoo; stencil violet (`secondary`) for every stencil, the eyebrows, the steps' numbers, the guest sheet's rules and the dial; flash yellow (`accent`) only for small marks (the dot), never text on bristol.
- `--theme-radius: 0.25rem`, nearly square; buttons, chips, pills and fields round (`--theme-radius-field: 9999px`); textareas take `rounded-box`. Hairlines (`border-base-300`), heavy 2px ink rules above lists (`border-base-content`), no shadows (relief off).
- `class="ruled"` draws the sheet's faint pencil grid (the hero's sheet, a design's page).
- Photos: warm, clean and calm. Hands at work rather than faces for the artists; the guests' cities; skin with no tattoo for the try-on and the heal. Never a real artist's tattoo presented as the shop's work.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: every design shows as plain ink, every section in place.

- **The transfer** (`scripts/transfer.js`, Motion): `data-transfer` on a `<figure>` holding one `<img>`. Give it `data-stencil="<the design's lines>"` (a flash record's `outline`, a guest's `mark_outline`); an `.svg` or `.png` image without one is its own stencil, and a photo gets a stencil made from it (grayscale, high contrast, lightened over violet). The stencil lands off register, the ink takes over it in 0.6 s, the stencil slides into register and fades. `data-transfer="load"` transfers once the page has loaded (the hero, a design's page); inside `data-transfer-stagger`, figures follow each other 0.12 s apart; elsewhere each transfers as it comes into view. Put it on every new drawing.
- **The lift** (CSS): a `[data-transfer]` inside a link or an element with `data-lift` shows its stencil on hover and focus, the ink fading to 0.1.
- **Flash cards**: `{% render 'flash-card', design: …, artists: data.artists %}`, in a `<ul class="grid grid-cols-2 … lg:grid-cols-4">`. A claimed design stays, dimmed, with "Claimed" set across it in blackletter.
- **The wall's filters** (CSS only, `parts/flash-wall.liquid`): `data-filter` on the section; radios `class="chip-input sr-only"` + `<label class="chip">`, artists by their place in `data.artists` (`data-n`), styles by their place in the wall's list of styles; each card's `<li data-card data-a="n" data-s="|n|n|" data-status>`. Up to 8 artists and 12 styles; nothing in the stylesheet names a record.
- **Try it on** (`parts/try-on.liquid`, CSS with radios and `:has()`, `scripts/try-on.js` for dragging and turning only): the design over a skin photo in `mix-blend-mode: multiply`, its width its `size_in` over the placement's `skin_in`. Up to 4 placements.
- **The heal** (`parts/heal.liquid`, CSS only): radios valued by `stage` (fresh, film, flaking, cloudy, settled) switch the layers over one design on one skin (`--ink` on `.heal-tattoo` is the design's address, for the gloss) and the panel with the same `data-panel`.
- **The guest sheet** (`parts/guest-sheet.liquid`, `scripts/guests.js`): six month panels from the next guest's month; each guest panel has `data-from` and `data-to`, and `[data-when]` lines ("In the chair now", "Arrives in N days", "Been and gone") that the script's `data-state` shows. The header's strip (`data-guests-strip`) holds a line per guest, all `hidden` but one.
- **Ruled steps**: `{% render 'ruled-steps', steps: data.<list>, eyebrow: …, title: …, cta: true %}`, each with a small line drawing (`icon`) that transfers.
- **Rises**: `data-rise` on a heading or paragraph rises it into view (CSS, scroll-driven). Put it on new section titles.
- **Prefill**: `select[data-prefill]` in the request form chooses `?artist=` or `?guest=` from the address.
- The header is sticky; it gains bristol and a hairline once scrolled. Smooth scrolling is Lenis, light. No cursor effects, no carousels, no page transitions, no stamps, nothing drawn stroke by stroke.

## Lists

- `flash`: a design per record, numbered (`number`, shown "No. 08"), newest first (`sort: -number`); `artist` is an artist's id; `image` the colored drawing and `outline` its lines; `size` as written ("4 in.") and `size_in` the number for the try-on; `price` in dollars; `kind` one-and-done or repeatable; `status` available or claimed; `featured` on the home page (eight at most); `placements` free text.
- `artists`: ordered by hand, the apprentice last; `books` open, waitlist, closed or flash-only, with `books_note`; `mark` a design's id; `work_1` to `work_4` with their captions; the bio as the record's text.
- `guests`: by date (`sort: arrives`); `mark` and `mark_outline` their drawing and its lines; `status` booking, waitlist or consult.
- `placements`: a skin photo each, with the inches of skin it shows across and the design's center in %.
- `heal`: five stages in order, one per `stage`.

## Rules for the site's whole life

- One ink band per page at most besides the footer (the roster, or flash day).
- The stencil is always the secondary color and the fresh redness the primary: never a color of its own.
- Every drawing of the shop transfers; photos don't.
- The flash is the maker's own drawings, never found images.
