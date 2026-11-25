---
name: kindly-design
description: The Kindly template's design notes — read before changing its pages, sections or styles.
---

# Kindly's design

The website is the couple's invitation suite, unpacked from its envelope: cotton paper and letterpress, cards die-cut into arches and scallops, a lilac liner, a vermilion wax seal, postage stamps and postcards. Joyful and calm at once: generous space, one soft high-contrast serif, a ballet script for single words only, and labels in spaced capitals as if engraved. Nothing is drawn from outside the theme: the paper, the liner, the seals, the perforations and the die-cuts are CSS in `styles/site.css`, so the Theme tab restyles all of it.

## Type

- **Noto Serif Display** (the heading font): the names and the date on the card (`font-stretch: 90%`, class `pressed`), page titles (`.page-title`, weight 300), section titles (`.section-title`), the times of the run-of-show (`.show-time`), the days' numbers (`.day-number`). Never bold; italic (`.serif-italic`) only for an invitation's own italic words ("invite you to their wedding"). `.serif` sets it on any element that is not a heading.
- **Plus Jakarta Sans** (the body font): reading at 1.0625 rem, `.body-copy` for paragraphs at 80% of the text color, the interface at 600.
- **Ballet** (`.script`, the variable `--font-script`): the ampersand, the couple's signature, "Callum says". Never a sentence, never below 1.75 rem.
- **Engraved capitals** (`.engraved`): 0.75 rem, 600, capitals, wide tracking: labels above titles, places, times spelled out, postmarks.
- **The deboss** (`.pressed`): a highlight below and a shade above, made from the theme; on the names, the big date and the days' numbers.

## Colors and shapes

- Paper (`base-100`) is the page and the cards; oat (`base-200`) the envelope, the reply card and the postcards; ink (`base-content`) the text; bottle green (`primary`) the buttons, links, postmarks and the reply band; lilac (`secondary`) the liner and **one lilac band per page** (the island, what to wear, good to know, the questions), its text always ink; vermilion (`accent`) the seals, the ampersand and small marks only; night (`neutral`) the footer and the hero behind its photo.
- Stocks for cards: `.stock-paper`, `.stock-oat`, `.stock-lilac`, `.stock-green`, `.stock-vermilion` (a background and its text color). `.paper` gives a card its faint paper shadow; nothing else casts one.
- **Die-cuts** (`.diecut` + a shape class): `.diecut-arch`, `.diecut-pebble`, `.diecut-circle`, `.diecut-scallop`, `.diecut-wave`, `.diecut-square`. Every photograph sits in one; change a picture's shape by changing its class, or a record's `shape` field. The scallop and the wave are masks along the top edge (`styles/edges/`); the shapes also cut cards (the suite, the gifts).
- **The liner** (`.liner`): the secondary color with sprigs and bicycles printed through `styles/liner.svg` as a mask; inside the envelope's flap and behind the party's initials.
- **The seal** (`.seal > .wax`, with `.monogram` inside): a radial gradient of the accent with a lighter rim, its wavy edge a mask (`styles/seal.svg`); size it with `--seal` (`[--seal:6rem]`). The monogram is the couple's initials.
- **Postcards** (`.postcard`, tilted by `--tilt` in a `style` attribute, ±2°), **postmarks** (`parts/postmark.liquid`, green rings with the place and month) and **stamps** (`.stamp > .stamp-frame`, perforated by a radial-gradient mask; `parts/stamp.liquid`). They stay still.
- Corners are paper corners (`--theme-radius: 0.125rem`); buttons and fields are pills.

## Effects, and what turns each on

- `data-envelope` (`scripts/envelope.js`): the hero's envelope opens once at load: the seal lifts, the flap turns open behind the card, the card rises and grows a little, the envelope settles. The stylesheet draws it open, so edit mode shows the card out. Its pieces are `.env-stage`, `.env-back`, `.env-flap`, `.env-card` (the real invitation text), `.env-pocket`, `.env-seal`.
- `data-diecut` (`scripts/diecut.js`): a die-cut window opens from a small rounded window to its full shape as it comes into view, the image easing from 1.12 to 1. `parts/diecut.liquid` puts it on every picture; put it on any new die-cut figure.
- `data-suite` (`scripts/suite.js`): the cards of a `.suite` are dealt from a stack into the fan as it arrives (from lg up), or swing to their tilt one by one on a phone. Each `.suite-card` has `--tilt` and `--drop` in its `style`, computed from its place; under the hand it lifts and straightens (CSS).
- `data-seal` (`scripts/seal.js`): on the reply's answer, the reply card slides into the envelope, the flap closes and the seal presses. Only `fragments/rsvp-sealed.liquid` uses it.
- `data-reveal` (`scripts/reveal.js`): headings, paragraphs and cards rise into view. Put it on the elements of a new section, not on the section.
- `data-print` (CSS): photographs a touch less saturated and a little brighter, so the place's and the couple's pictures read as one set; `parts/diecut.liquid` and `parts/stamp.liquid` set it.
- The floating seal (`parts/reply-seal.liquid`, `.float-seal`) rises from below the screen's edge after the first screen, by a scroll-driven animation (hidden, it stays off the screen), and links to the reply; the reply page leaves it out. The header takes the paper once the page is scrolled (CSS). Lenis smooths the scroll (`scripts/smooth-scroll.js`).
- No page transitions, no countdown, no torn edges, tickets, curtains, tickers, turning stamps, or anything that scrolls sideways.

## Lists

- Lists are datasources: a new kind of item is a datasource, never items written out in a page. Records with a picture carry a `shape` where the design lets the maker choose it.
- `events` are grouped by `day` in `parts/run-of-show.liquid` (the day names and the sunset time are written there) and sorted by `start`, a 24-hour time shown by `parts/time.liquid`.
- `story` records marked `home` (three) are the home page's postcards.

## Rules for the website's whole life

- One display serif, one script, one sans: never another font.
- The script is for single words and the ampersand only.
- Text on lilac is always ink, never green. Vermilion stays for seals and small marks.
- Every photograph is in a die-cut window; no plain rectangles, no photo without `data-diecut` except on stamps.
- One lilac band per page at most, and the reply band in green at the foot of every page but the reply page.
- Keep labels on one line (`whitespace-nowrap`) in the header and on buttons; they hold a third more in French or German.
