---
name: aspect-design
description: The Aspect template's design notes — read before changing this site's pages, sections, styles, listings, neighborhoods, brokers or forms.
---

# Aspect

An independent agency that shows you in. The site is calm and editorial, like a well-written listing: a warm text serif over a plain grotesk, fog-colored paper, one deep madrona red and brass only where a hand would touch a door. Every home opens the way a viewing does, at its front door. Nothing is loud: barely softened corners, hairlines instead of shadows, quiet reveals, a steady header.

## Type

- **Petrona** for headings and figures, light (300) at display sizes, 400 below 2rem, never bold, sentence case, no italic words in a heading. The home page's `<h1>`: `text-[clamp(2.75rem,5vw+1rem,5.25rem)] leading-[1.04] tracking-[-0.015em] text-balance`; a page title `text-[clamp(2.5rem,4vw+1rem,4.5rem)]`; a section title `text-[clamp(1.875rem,2.5vw+1rem,3.25rem)] leading-[1.06] tracking-[-0.015em]`.
- `class="price"`: Petrona with lining, even figures, for prices, house numbers and the ledger's figures; a card's price at 1.5rem in `text-primary`, a listing's at 2.25 to 3rem.
- Petrona light italic, in quotation marks, for pull quotes: a listing's opening line and clients' words.
- **Albert Sans** for the text: 1.0625rem, `leading-relaxed text-base-content/80`, at most `max-w-[64ch]`. `class="eyebrow"` (600, 0.75rem, uppercase, spaced) for eyebrows and the window card's band; `class="facts"` (500, 0.8125rem, tabular figures) for the facts row, dates and labels. Buttons in sentence case.
- Text written in Markdown (a walk-through, a neighborhood, a broker's words, a note) goes in `class="prose-aspect"` (`prose-lead` for a listing's or a note's text): its `##` headings become small uppercase chapter heads under a hairline ("The house", "Inside", "Outside", "Around the corner").

## Color and shape

- Fog paper (`bg-base-100`) for most sections; plaster (`bg-base-200`) for the facts row, the floor plan, the form's aside, the wish list and clients' words; overcast (`bg-secondary`) for the open houses and the neighborhoods' index; Salish deep (`bg-neutral`) for the sold ledger, the valuation band and the footer only.
- Madrona (`primary`) for buttons, links, prices on cards and the chosen chip. Brass (`accent`) only for small marks: door knobs and number plates, the "Open" band, sold prices and figures on Salish deep, the valuation band's button, `class="brass-mark"` before a promise. Brass on fog paper is never text.
- `--theme-radius: 0.25rem`: photos, cards and doors with barely softened corners (`rounded-box`); chips round. Hairlines between rows (`border-base-300`), no shadows (relief off).
- Photos: soft daylight, the houses square to the street, rooms without people, no flash and no wide-angle tricks; no handshakes, keys held out, sold signs or couples with boxes. Portraits are the agency's own people; until there are photos, initials in Petrona on plaster.

## Effects, and the attribute that turns each on

Nothing moves while editing or under reduced motion: no door, every photo plain, every section shown.

- **The open door**: `data-door` on a photo's frame (a `relative`/`overflow-hidden` box with a fixed aspect), holding the `<img>` then `{% render 'door', number: …, paint: … %}` (`parts/door.liquid`: two inset panels, a brass plate with the number, a knob, a shade). `paint` is `primary`, `secondary` or `neutral`, from the listing's `door` field; the door's panels and shading are mixed from that color and its brass from `accent`, so the Theme tab repaints them. The stylesheet keeps the door out of the page; `scripts/door.js` shows it closed and swings it open on its left hinge when the frame comes into view. `data-door="load"` opens it once the page has loaded (the hero, a listing's lead photo); `data-door-stagger` on a list opens its cards' doors 120 ms apart. Each door opens once per visit.
- **The window card's band**: `{% render 'window-band', listing: … %}` across a card's top edge: "New this week" and "For sale" in madrona, "Open Sunday 1–3" in brass (when `open_house` is set), "Under contract" and "Sold in 6 days" on Salish deep. A listing card is `{% render 'listing-card', listing: …, small: true %}` inside a `<ul>`.
- **The status filter** on the homes page (CSS only): `data-filter` on the section; radios `class="chip-input sr-only"` (values `all`, `for-sale`, `open`, `under-contract`, `sold`) each followed by its `<label class="chip">`; each card's `<li>` carries `data-status` and `data-open`. The statuses are a fixed set; neighborhoods are browsed on their own page, never filtered.
- **The sold ledger**: `<table class="ledger">` on Salish deep, cells `cell-no`, `cell-street`, `cell-sold` and `cell-rest` (with `data-label` for the phone's layout, where each sale becomes ruled lines).
- **The photo strip**: `class="strip"` scrolls and snaps without a script; "See all N photos" is a `<details>`.
- **Reveals**: `data-reveal` on a section's main element rises it a little into view; `data-reveal="stagger"` on a list rises its children 70 ms apart. Put them on every new section.
- **Filled in from the link**: `data-prefill` on the valuation form; `/sell?with=<broker id>` checks the broker radio whose `data-key` is that id (inside `data-prefill-from="with"`), `/sell?hood=<neighborhood id>` the neighborhood option (inside `data-prefill-from="hood"`).
- **Smooth scrolling** (Lenis, light), so the neighborhoods' index glides; the header is sticky on fog paper with a hairline and does not change as you scroll. No carousel that moves by itself, no page transitions, no loader.

## Lists

- `listings`: a home per record, `status` new, for-sale, under-contract or sold; prices as written ("$689,000"); `cover` the front photo and `photos` the others, in order (an images field: give use_image all of a home's photos at once); `details` as "Label: value" lines; `agent` and `neighborhood` by name; the walk-through as the record's text, in `##` chapters. `featured` puts it on the home page (three for sale at most, the first in the hero).
- `neighborhoods`: its id is its anchor on `/neighborhoods` and its key in `?hood=`; `agent` by name.
- `team`: its id is its page and its key in `?with=`; `knows` lists neighborhoods by name.
- `sales` and `sales-figures` are shared by the home and sell pages.

## Rules for the site's whole life

- Describe homes, streets and distances, never who lives in a neighborhood or whom it suits.
- Salish deep is kept for the ledger, the valuation band and the footer; where two meet, a hairline (`border-neutral-content/15`) runs between them.
- Every listing has a door paint different from its neighbors in the list, and its house number.
- Never invent a license number, an MLS line, a sale or a client's words: they are the maker's.
