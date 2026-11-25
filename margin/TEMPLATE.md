# Margin

Margin is a weekly letter and blog built for reading. It was written for a writer's Sunday letter about walking one city; it suits any letter or blog that is read rather than skimmed: a newsletter, a writer's essays, a small magazine or a journal, by one writer or a few.

## How it is made

- The header and the footer are on every page; the letterbox (the newsletter's sign-up, `parts/letterbox.liquid`) closes the home page, the letters' and the topics' pages.
- The lists: `blog` (the letters, on every page but the about page), `topics` (the home page, the topics' pages and the letters), `about-now` (the about page), `newsletter-features` and `newsletter-faq` (the newsletter page), `navigation` (the header and the footer), and the sign-ups to `newsletter` (the letterbox and the newsletter page) and the messages to `contact` (the about page). The design notes explain how the letters and topics work.

## When adapting

- The publication's name is in the masthead, the compact header, the footer and every page's `<title>`; the writer's name in the masthead's row, the writer section, the sign-off (`parts/sign-off.liquid`), the about page and the letters' `author`.
- The reader count ("Read by 6,400 walkers"), the day it comes and "since 2021" are the site's promises: ask for them or leave them out rather than guess.

## Pages

### Home (`/`)

The masthead, the lead letter and "This season", the letterbox, the topics' plates, "From the archive", and the writer.

#### Where do readers subscribe?

- **Here, in Spaka** (as built): the sign-up forms stay; subscribers arrive in Spaka's Content tab. Keep the letterbox's form posting to `newsletter`.
- **On another service**: the forms become a button to the maker's Substack, Buttondown or other page. Replace the letterbox's form by a `btn btn-primary` "Subscribe" link to the maker's newsletter page (ask its address, or `#` until given), keeping the sentence beside it; the newsletter page follows in its turn.

#### Who writes?

- **One writer** (as built): one name in the masthead, the sign-off and the about page. Keep one name everywhere, as now.
- **Several writers**: each letter signed by its author; the about page presents them. Keep `author` on each letter and make the sign-off (`parts/sign-off.liquid`) say the author's name (`{{ record.author }}`) rather than one; the about page presents each writer in its turn, initials or portrait, in the same grid.

### Letters (`/blog`)

Every letter by year, under the topics' buttons; each letter has its page, with its cover, its text and the sign-off, then more letters on its first topic and the letters before and after.

When removed: delete `pages/blog/`, `parts/archive.liquid` and its navigation record; the home page's lead letter and "From the archive" show the letters without links to them.

### Topics (`/topics`)

The five topics with their plates, and "Read one at random"; each topic has its page, with its plate and its letters.

When removed: delete `pages/topics.liquid`, `pages/topics/` and its navigation record; the home page's plates and the letters' topics are no longer links, and the letters page's topic buttons go.

### About (`/about`)

The writer, how it began, the "Now" list, the colophon, and "Write to me".

With several writers (chosen with the home page), the page presents each, initials or portrait, in the same grid.

When removed: delete `pages/about.liquid`, `parts/about-now.liquid`, `parts/write-to-me.liquid`, `data/about-now/`, `data/contact/`, `fragments/contact-thanks.liquid` and its navigation record; the home page's writer section no longer links to it.

### Newsletter (`/newsletter`)

The sign-up form with what readers choose to receive, what arrives, the latest letters, and questions.

Its form follows where readers subscribe, chosen with the home page: as built, the form posting to `newsletter`; on another service, the `btn btn-primary` "Subscribe" link in place of the form, and `data/newsletter/` and `fragments/newsletter-thanks.liquid` deleted.

When removed: delete `pages/newsletter.liquid`, `data/newsletter-features/`, `data/newsletter-faq/` and its navigation record; the letterbox stays the place to subscribe.
