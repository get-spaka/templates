# Margin

Margin is a weekly letter and blog built for reading. It was written for a writer's Sunday letter about walking one city; it suits any letter or blog that is read rather than skimmed: a newsletter, a writer's essays, a small magazine or a journal, by one writer or a few.

## How it is made

- `/` (`pages/index.liquid`): the masthead, the lead letter and "This season", the letterbox (the newsletter's sign-up, which the letters' and the topics' pages repeat), the topics' plates, "From the archive", and the writer.
- `/blog`: every letter by year, under the topics' buttons.
- `/blog/<id>` (`pages/blog/[blog].liquid`): a letter, with its cover, its text and the sign-off, then more letters on its first topic and the letters before and after.
- `/topics`: the five topics with their plates, and "Read one at random"; `/topics/<id>`: a topic, its plate and its letters.
- `/about`: the writer, how it began, the "Now" list, the colophon, and "Write to me".
- `/newsletter`: the sign-up form with what readers choose to receive, what arrives, the latest letters, and questions.

The lists: `blog` (the letters, on every page but the about page), `topics` (the home page, the topics' pages and the letters), `about-now` (the about page), `newsletter-features` and `newsletter-faq` (the newsletter page), `navigation` (the header and the footer), and the sign-ups to `newsletter` (the letterbox and the newsletter page) and the messages to `contact` (the about page). The design notes explain how the letters and topics work.

## When adapting

- The publication's name is in the masthead, the compact header, the footer and every page's `<title>`; the writer's name in the masthead's row, the writer section, the sign-off (`parts/sign-off.liquid`), the about page and the letters' `author`.
- The reader count ("Read by 6,400 walkers"), the day it comes and "since 2021" are the site's promises: ask for them or leave them out rather than guess.

## Before building

### Where do readers subscribe?

- **Here, in Upstart** (as built): the sign-up forms stay; subscribers arrive in Upstart's Content tab. Keep the forms posting to `newsletter` (`pages/newsletter.liquid`, `parts/letterbox.liquid`).
- **On another service**: the forms become a button to the maker's Substack, Buttondown or other page. Replace each form by a `btn btn-primary` "Subscribe" link to the maker's newsletter page (ask its address, or `#` until given), keeping the sentence beside it; delete `data/newsletter/`.

### Who writes?

- **One writer** (as built): one name in the masthead, the sign-off and the about page. Keep one name everywhere, as now.
- **Several writers**: each letter signed by its author; the about page presents them. Keep `author` on each letter, make the sign-off (`parts/sign-off.liquid`) say the author's name (`{{ record.author }}`) rather than one, and present each writer on the about page, initials or portrait, in the same grid.
