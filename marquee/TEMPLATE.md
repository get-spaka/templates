# Marquee

Marquee is a festival site that is its own poster, loud on top and calm in its practical pages. It was written for a music festival; it suits any festival, a conference, a biennale or a club's season. Rewrite the acts as speakers, films or chefs, the stages as rooms, the passes as tickets, and keep the shapes.

## How it is made

- `/` (`pages/index.liquid`): the poster (the name, the dates and the place), the tape, the bill, the days, the passes, getting there, the partners, and the ticket alert.
- `/lineup`: the days' filters, the bill, and every act; `/lineup/<id>` (`pages/lineup/[acts].liquid`): an act, with its day, time, stage, origin, genre, bio and photo, then the other acts of its day.
- `/timetable`: a tab per day, its sets on a grid with a column per stage.
- `/tickets`: the passes, the access tickets, and the questions on tickets.
- `/info`: the stages, getting there, access, the questions, the partners, and the contacts.
- The ticket alert closes the home, lineup, timetable and tickets pages.

The lists: `acts` (the bill, the lineup, the acts' pages and the timetable), `days` (the home page, the lineup and the timetable), `stages` (the timetable and the info page), `passes` (the home page and the tickets page), `travel` (the home page and the info page), `access` (the info page), `faq` (the info and tickets pages), `partners` (the home page and the info page), `home-tape` (the home page), `alerts` (the ticket alert's sign-ups) and `navigation` (the header and the footer). The design notes explain how each works.

## When adapting

- The name is in the header, the poster, the footer and every `<title>`; the dates in the header ("09—11.07.27"), the poster, the countdowns, the day records and the passes' numbers; the place in the poster, getting there and the info page.
- Prices, capacities, opening hours and the access team's promises are the organizer's: ask for them or leave them out rather than guess.

## Before building

### How many days?

- **Three** (as built): three days in the lineup, the timetable and the passes. Keep one `days` record each, as now.
- **One**: one day: one timetable, no day passes. Make one `days` record, the `day` choice of `acts` the same word and every act on it; the header's dates and the poster's follow, and so does the number of days where it is written (`parts/days.liquid`, `parts/bill.liquid`, the `home-tape` record `three-days`, the timetable page's "Four stages · Three days" and the pages' descriptions). Drop the day and weekend passes for a single one.
- **Two**: two days. Make one `days` record per day, the `day` choices of `acts` the same words, each act on one of them; the header's dates and the poster's follow, and so does the number of days where it is written (`parts/days.liquid`, `parts/bill.liquid`, the `home-tape` record `three-days`, the timetable page's "Four stages · Three days" and the pages' descriptions).
- **Four or more**: A day each in the lineup and timetable. Make one `days` record per day, the `day` choices of `acts` the same words, each act on one of them; the header's dates and the poster's follow, and so does the number of days where it is written (`parts/days.liquid`, `parts/bill.liquid`, the `home-tape` record `three-days`, the timetable page's "Four stages · Three days" and the pages' descriptions).

### How do people get tickets?

- **A ticketing site** (as built): each pass links to where it is sold. Keep the passes; each pass's `link` is its page there (ask it, or leave it empty until given).
- **Free, with sign-up**: the passes become a free registration form. Make them one stub "Free · sign up" whose button opens a form posting to `alerts` (name, email), renamed "Sign-ups"; the countdowns stay.
- **Free, no tickets**: the tickets page goes; the info page says entry is free. Delete `pages/tickets.liquid`, `data/passes/` and its navigation record, remove `{% render 'passes' %}` from the home page, and say on the info page that entry is free.
