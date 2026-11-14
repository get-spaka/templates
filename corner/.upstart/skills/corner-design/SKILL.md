---
name: corner-design
description: The Corner template's design notes — read before changing this site's pages, sections, styles or hours.
---

# Corner

A neighborhood shop's site that reads like its shopfront: poster-sized type on warm paper, one strong color, the day's hours always in sight, a ribbon of what is on the counter. Confident and warm, never busy: big words, few of them.

## Type

- Headings are uppercase, `font-extrabold`, condensed by the stylesheet, set large (`text-5xl md:text-7xl` for a section, `text-[clamp(…)]` for a page title) with tight leading (`leading-[0.9]`, `leading-[0.82]` for titles).
- **One word or two of each heading in `<em>`**: the stylesheet sets it in the italic serif, lowercase as written ("Fresh from <em>the oven.</em>"). Keep exactly one `<em>` per heading.
- A small mono label sits above each heading: `font-mono text-xs tracking-[0.25em] uppercase text-base-content/70`. Prices, hours, captions and figures are mono too.
- Keep headings short: three to six words. A page title is two or three lines of one or two words (`<br>` between them), the last in `<em>`.
- The footer's huge wordmark (`Marlow St.`) is one line at `text-[23vw]`: keep it to about ten characters, or lower `text-[23vw]`.

## Color and shape

- Warm paper (`bg-base-100`, `bg-base-200`) for most sections; one section per page flipped to `bg-primary text-primary-content` (the hours); the accent for the open-now line and the order card; `bg-neutral` for the footer. Every color comes from the theme.
- Portrait photos sit in an **arch**: `aspect-[4/5] rounded-t-full rounded-b-box object-cover`. Use portrait photos (taller than wide) there.
- What not to break: the arches, the flipped hours section, no color of its own.

## Effects, and the attribute that turns each on

- `data-reveal` on a section's main elements (its label and heading, its text, each card): they rise into view. Put it on every new section's elements too.
- `data-arch` on the `<img>` inside the hero's arch: the photo settles into its frame as the page scrolls.
- `data-ribbon` on the ribbon's `<ul>`: its items loop sideways. The list is written once; the script copies it while the page moves. Each `<li>` ends with its star and has `pr-8 md:pr-12`, no gap on the list, so the loop is seamless.
- `data-spin` on the stamp's SVG: it turns. Its words are in the `<textPath>`: rewrite them for the business, keeping about the same length (around 45 characters, two phrases repeated) so they fill the circle.
- `data-open-now` on the open-now line: it says whether the shop is open now, from the hours rows on the same page. Its sentences are its attributes, in the site's language: `data-open` ("Open now · until {time}"), `data-later` ("Opens today at {time}"), `data-next` ("Opens {day} at {time}"); its written text (`data-open-now-text`) is what shows while editing and on a page without hours. Translate all four with the site.
- The hours rows (`parts/hours.liquid`) carry `data-hours-row`, `data-weekday`, `data-opens` and `data-closes` from the `hours` datasource: keep one record per day, `weekday` one of the English day keys, `opens` and `closes` in 24 h (`07:00`), both empty on a closed day. `hours` and `day` are what visitors read, in the site's language.
- Nothing is hidden by the stylesheet: a script hides what it animates only when it starts, so a page shows whole without its scripts. Keep it that way in new styles.
- Smooth scrolling runs on every page by itself.

## Lists

- The menu page lists categories by name in `pages/menu.liquid` (`"Bread,Pastries,Coffee,Cakes to order"`), the same names as the `category` choices in `data/menu/_datasource.yaml`: change both together. `featured: true` puts an item on the home page's counter (six at most).
- When the hours change, change the `hours` records, the open-now lines' written text (`data-open-now-text`) and the footer's short hours line together.
