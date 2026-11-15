# Marquee

Marquee is a festival site that is its own poster, loud on top and calm in its practical pages. It was written for a music festival; it suits any festival, a conference, a biennale or a club's season. Rewrite the acts as speakers, films or chefs, the stages as rooms, the passes as tickets, and keep the shapes.

## How it is made

- The header and the footer are on every page; the ticket alert (`parts/alert.liquid`) closes the home, lineup, timetable and tickets pages.
- The lists: `acts` (the bill, the lineup, the acts' pages and the timetable), `days` (the home page, the lineup and the timetable), `stages` (the timetable and the info page), `passes` (the home page and the tickets page), `travel` (the home page and the info page), `access` (the info page), `faq` (the info and tickets pages), `partners` (the home page and the info page), `home-tape` (the home page), `alerts` (the ticket alert's sign-ups) and `navigation` (the header and the footer). The design notes explain how each works.

## When adapting

- The name is in the header, the poster, the footer and every `<title>`; the dates in the header ("09—11.07.27"), the poster, the countdowns, the day records and the passes' numbers; the place in the poster, getting there and the info page.
- Prices, capacities, opening hours and the access team's promises are the organizer's: ask for them or leave them out rather than guess.

## Pages

### Home (`/`)

The poster (the name, the dates and the place), the tape, the bill, the days, the passes, getting there, the partners, and the ticket alert.

#### How many days?

- **Three** (as built): three days in the lineup, the timetable and the passes. Keep one `days` record each, as now.
- **One**: one day: one timetable, no day passes. Make one `days` record; the header's dates and the poster's follow, and so does the number of days where it is written (`parts/days.liquid`, `parts/bill.liquid`, the `home-tape` record `three-days`). Drop the day and weekend passes for a single one. The acts, the timetable page's "Four stages · Three days" and the pages' descriptions follow in their turns.
- **Two**: two days. Make one `days` record per day; the header's dates and the poster's follow, and so does the number of days where it is written (`parts/days.liquid`, `parts/bill.liquid`, the `home-tape` record `three-days`). The acts, the timetable page's "Four stages · Three days" and the pages' descriptions follow in their turns.
- **Four or more**: a day each in the lineup and timetable. Make one `days` record per day; the header's dates and the poster's follow, and so does the number of days where it is written (`parts/days.liquid`, `parts/bill.liquid`, the `home-tape` record `three-days`). The acts, the timetable page's "Four stages · Three days" and the pages' descriptions follow in their turns.

#### How do people get tickets?

- **A ticketing site** (as built): each pass links to where it is sold. Keep the passes; each pass's `link` is its page there (ask it, or leave it empty until given).
- **Free, with sign-up**: the passes become a free registration form. Make them one stub "Free · sign up" whose button opens a form posting to `alerts` (name, email), renamed "Sign-ups"; the countdowns stay.

A festival free to enter, with no tickets at all, has no tickets page: it is left unchecked in the card of pages, and its "When removed" says what changes.

### Lineup (`/lineup`)

The days' filters, the bill, and every act; each act has its page, with its day, time, stage, origin, genre, bio and photo, then the other acts of its day.

The `day` choice of `acts` takes the days' words chosen with the home page, each act on one of them.

When removed: delete `pages/lineup.liquid`, `pages/lineup/`, `parts/acts.liquid` and its navigation record; the bill's names are no longer links.

### Timetable (`/timetable`)

A tab per day, its sets on a grid with a column per stage.

When removed: delete `pages/timetable.liquid` and its navigation record; `stages` stays for the info page.

### Tickets (`/tickets`)

The passes, the access tickets, and the questions on tickets.

When removed: delete `pages/tickets.liquid` and its navigation record. When entry is free, also delete `data/passes/`, remove `{% render 'passes' %}` from the home page, and say on the info page that entry is free; otherwise the home page's passes link to where they are sold.

### Info (`/info`)

The stages, getting there, access, the questions, the partners, and the contacts.

When removed: delete `pages/info.liquid`, `parts/stages.liquid`, `parts/travel.liquid`, `parts/access.liquid`, `data/access/` and its navigation record; getting there stays on the home page.
