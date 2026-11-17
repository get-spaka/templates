# Taper

A daylit neighborhood barbershop and hair studio that prices every head by the time it takes in the chair and the level of whoever cuts, never by gender: gold-leaf serif letters on towel white, a price grid whose four columns step from pale to deep blue-green like a fade, a little barber pole that turns only while the shop is open, the week drawn as bars, and a cut book where each card turns in a hand mirror to show the back. It was written for Good Side, a barbershop and hair studio of five chairs in Hampden, Baltimore; it suits a barbershop, a hair salon, a unisex hair studio, a curly hair specialist, a colorist's studio, a braiding salon, or a single barber renting a chair. Rewrite the services and their chair times, the levels and the rates, the people, the cuts and the hours; keep the towel white, the one deep blue-green, the four steps and the vermilion pole.

## How it is made

- The header (the name, the open sign, the links and "Book a chair") and the footer (address, phone, email, Instagram, the hours, the links) are on every page. The booking band (`parts/booking-band.liquid`) closes most pages.
- The lists:
  - `levels` (the four steps: the price grid's columns, the chips on every person, the form's "By level"),
  - `rates` (chair times against the levels: the home page's grid, the first four, and the prices page's, all of them),
  - `services` (the prices page's menu and the form's "What you'd like"),
  - `team` (the home page's chairs, the team page, a page each, the form's "By name"),
  - `gallery` (the cut book: the home page's featured cuts, the cut book page, a page each, a person's cuts on their page),
  - `hours` (the open sign, the week at the chair, the footer),
  - `home-features` (the hero's three facts), `testimonials`, `prices-faq`, `promises` (team page), `book-faq` (the rules on `/book`), `milestones` and `shelf` (the shop page) and `navigation`.
  - `bookings` collects the request form.
  The design notes say how each works.

## When adapting

- The name, Good Side, is in the header, the footer and every `<title>`; the address (14 Mill Row, Hampden, Baltimore) in the footer, the week section (`parts/visit.liquid`), finding us (`parts/find-us.liquid`) and the week block; the phone, (410) 555-0136, a fictional number, in the header's menu, the footer, the week section, the booking band, the form's aside and the thanks fragment; the email in the footer and "Join the shop".
- Set `data-tz` in `parts/open-sign.liquid` and `parts/week.liquid` to the maker's time zone (`Europe/Paris`, `America/Chicago`), so "Open now" is worked out in the shop's own time. Write each `hours` record's `opens`, `closes` and walk-in times in 24-hour form ("09:30", "20:00"); a closed day has none. Keep `weekday` on each record: the sign reads it.
- The rates, the levels' names and meanings, the hours, the walk-in windows, the cancellation notice and how fast the shop answers are the owner's facts: ask for them once the page is built, or leave the examples and say so, rather than invent them. The phone is fictional and goes with the rest of the business's facts.
- The three quotes of "What clients say" are invented and never stay: ask for real ones, given with the clients' permission, or remove the section (`{% render 'clients' %}`).
- The cut book's photos matter most: ask the maker for their own cuts, a front and a back of each. Until then the examples stay with a note that they are examples.

## Pages

### Home (`/`)

The hero (the headline, two buttons, the open sign and a tall photo) with the four-step band and three facts, what a cut costs (the fade's grid), the cut book's featured cuts, the chairs, the week at the chair with the address, what clients say and the booking band.

#### How do clients book?

- **A request form, confirmed by text** (as built): requests arrive in Upstart's Content tab; the shop texts back to set a time. Every booking button leads to `/book`, with the service, the person or the level filled in from the link (`?service=`, `?with=`, `?level=`).
- **On the shop's own booking page** (Squire, Booksy, Fresha, Boulevard, Square Appointments…): ask for its address, never invent it. Point every `href="/book…"` (header, hero, booking band, the chairs, the team pages, a cut's "Book this cut", the grid's "Book at this level", the consultation link) to that address and rename those buttons "Book online"; `/book` changes in its turn.
- **Walk-ins and phone only**: every booking button becomes "Call the shop" (`tel:`); `/book` becomes Visit (`/visit`) in its turn, leading with the week chart and the walk-in line.

#### How are prices set?

- **By chair time and level** (as built): the fade's grid, the levels on the team, the level chips in the form.
- **By service and level**: the grid's rows become the services themselves (a cut, a fade, a beard, color…), each with a price per level. Add `price_1` to `price_4` to `data/services/_datasource.yaml` and the services, loop over `services` in place of `rates` in `parts/rates.liquid` (each row's name in place of the minutes), and delete `data/rates/`; in `parts/menu.liquid` show the service's `price_1` as "from". The levels and the fade stay.
- **One price per service, whoever cuts**: a classic menu with dotted leaders and no levels. Remove `{% render 'what-it-costs' %}` from the home page, delete `parts/rates.liquid`, `parts/what-it-costs.liquid`, `parts/rate-grid.liquid`, `parts/levels.liquid`, `parts/level-chip.liquid`, `data/rates/` and `data/levels/`; write each service's `price` and show it in `parts/menu.liquid`; remove the level chips from the chairs, the team pages and a cut's page, and "By level" from the form. The four steps then only mark the menu's four groups and the bands.

#### A barbershop, a salon, or both?

- **Both** (as built): cuts, color, shaves and beards, kids.
- **A barbershop**: color goes from the services, the cut book and the levels' meanings; shaves, beards, fades and lineups lead; the hero's label says "Barbershop".
- **A salon**: shaves and beards go; color, treatments and styling (blow-dries, updos) take their place in `services` (their group is a choice: change its `choices` and the groups written in `parts/menu.liquid` and `parts/request-form.liquid` together); the hero's label says "Hair salon".

#### Do you take walk-ins?

- **Yes, at set times** (as built): striped windows on the week chart, the walk-in fact in the hero, the walk-in note in the week section and the form's aside, and the walk-ins section on `/book`.
- **Any time there's a free chair**: set each open day's `walk_in_from` and `walk_in_until` to its opening and closing times, and say "Walk in any time; booked clients go first" in those places.
- **By appointment only**: empty `walk_in_from` and `walk_in_until` on every day, remove the walk-in fact (`data/home-features/walk-ins.md`), the walk-in note in `parts/visit.liquid` and the form's aside, the "Walk-ins" legend in `parts/week.liquid`, and the week line's "walk-ins" in `parts/open-sign.liquid`; `/book` loses its walk-ins section in its turn.

### Prices (`/prices`)

How the levels work, the full chair-time grid with "Book at this level" under each column, the menu by group with each service's chair time and lowest price, what every cut includes, questions about prices and the booking band. Its grid and menu follow how prices are set, chosen with the home page.

#### Do you show every price?

- **Every price** (as built): the grid and the menu with their figures.
- **Starting prices only**: remove `{% render 'rate-grid' %}` and `{% render 'levels' %}`; the menu keeps "from $34" and its intro says "Your price depends on your hair and who you see; we'll tell you before we start".

When removed: delete `pages/prices.liquid`, `parts/levels.liquid`, `parts/rate-grid.liquid`, `parts/menu.liquid`, `data/prices-faq/` and its navigation record (`data/navigation/prices.md`). The home page's grid keeps its figures and loses "The full menu" (in `parts/what-it-costs.liquid`); point the hero's "See prices" to `#prices`. The prices questions may move to `/book`, below the rules.

### The cut book (`/cuts`)

Every cut with its front and its back in a hand mirror, filtered by hair type, and a page per cut: both photos large, the spec, what to ask for, how it was done, "Book this cut" and three more cuts.

#### A page for each cut?

- **Yes, a page each** (as built).
- **The book only**: the cards stop being links (in `parts/cut-book.liquid`, render `cut-card` with `link: false`) and show their `ask_for` under the card; render them with `link: false` on the team pages too (`pages/team/[team].liquid`); delete `pages/cuts/[gallery].liquid`.

When removed: delete `pages/cuts/`, the navigation record (`data/navigation/cuts.md`) and the "The whole cut book" link in `parts/cuts-home.liquid`; the home page's cut book stays, its cards rendered with `link: false`, as are the team pages' cuts (`pages/team/[team].liquid`).

### Team (`/team`)

The barbers and stylists as rows (portrait, pronouns, level, what they cut most, days, Instagram, "Book with…"), how the shop works in four promises, and a page each: their words, their station, their cuts.

#### Do clients choose who cuts them?

- **Yes, by name or by level** (as built): "Book with…" on every person, and the form's "By level" and "By name".
- **By level only**: the people stay; remove "By name" from `parts/request-form.liquid`; "Book with Tasha" becomes "Book at level 4" (`/book?level=4`) in `parts/chairs.liquid`, `parts/team-rows.liquid` and `pages/team/[team].liquid`.
- **The shop matches them**: one "Book a chair" (`/book`) in place of every "Book with…"; remove step 2 ("Who you'd like") from the form and `with` from `data/bookings/_datasource.yaml`; the team page's intro says how the shop chooses ("Tell us about your hair; we'll put you in the right chair").

#### One person or a team?

- **A team** (as built).
- **One barber or stylist working alone**: the texts speak in the first person. The team page type becomes one About page with their portrait, their words and their cuts; keep one `team` record; the levels go and prices follow one level (the grid keeps one column, or the menu its prices); on the home page replace `{% render 'chairs' %}` with a portrait beside a note (from the gallery's `about-founder-note`); remove "Who you'd like" from the form.

When removed: delete `pages/team/`, `parts/team-rows.liquid`, `parts/promises.liquid`, `data/promises/` and its navigation record. On the home page, `parts/chairs.liquid` keeps the portraits without links (replace `<a href="/team/…">` with a `<div>`), or goes if the maker shows no one; a cut's page keeps its barber's name as text; the prices page's levels lose their links to people (`parts/levels.liquid`).

### Book a chair (`/book`)

The request form in four steps beside the open sign, the walk-in hours and the phone, walk-ins with the week chart, the shop's rules and finding us. Its form, walk-ins and rules follow how clients book and whether they walk in, chosen with the home page:

- the shop's own booking page: replace `{% render 'request-form' %}` with a short section, a large "Book online" button to that page beside the phone; delete `data/bookings/`, `fragments/bookings-thanks.liquid` and `scripts/prefill.js`;
- walk-ins and phone only: rename the page Visit (`pages/visit.liquid`, its navigation record to `/visit`), lead with `{% render 'walk-ins' %}`, then the number set large and a call button; delete the same files;
- by appointment only: remove `{% render 'walk-ins' %}`.

When removed: delete `pages/book.liquid`, `parts/request-form.liquid`, `parts/walk-ins.liquid`, `parts/rules.liquid`, `parts/find-us.liquid`, `data/bookings/`, `data/book-faq/`, `fragments/bookings-thanks.liquid`, `scripts/prefill.js` and its navigation record; point every booking button to the phone (`tel:`) or the shop's booking page. The week chart stays on the home page; the rules can move to the prices page's questions.

### The shop (`/about`)

The story of the shop beside a photo of its windows, three photos of the room, the years, the products on the shelf, a note on hiring and the booking band.

#### Do you sell what you use?

- **At the desk only** (as built): the shelf lists the products with "Sold in the shop only".
- **In an online store too**: each product in `shelf` links to the maker's store elsewhere and a "Shop online" record joins `navigation` (place `footer`); nothing is sold through Upstart. Replace "Sold in the shop only" in `parts/shelf.liquid`.
- **No products**: remove `{% render 'shelf' %}`, delete `parts/shelf.liquid` and `data/shelf/`, and "On my station" from `pages/team/[team].liquid`.

#### Are you hiring?

- **Not right now** (as built): the short note with the email.
- **Yes**: the note in `parts/hiring.liquid` names the role and the level, and links to the email or an application page elsewhere.

When removed: delete `pages/about.liquid`, `parts/story.liquid`, `parts/room.liquid`, `parts/years.liquid`, `parts/shelf.liquid`, `parts/hiring.liquid`, `data/milestones/`, `data/shelf/` and its navigation record; the footer keeps the address and the hours.
