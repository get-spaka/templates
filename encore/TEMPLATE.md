# Encore

A band's website as a record shop and a tour board: every record is a square sleeve with a black disc inside that slides out and turns at its own speed, flies to its own page when opened and shows its tracklist on the paper back of the sleeve; the shows are a departure board whose letters flip into place. Photos are in black and white, so the only color on the stage is the records' and one aqua light. It was written for Velvet Freight, a four-piece soul band from Duluth, Minnesota, with five self-released records and a tour in the Midwest, Ontario and Europe; it suits any band, a singer-songwriter, a jazz trio, a DJ or producer, a classical ensemble, a choir, or a small label's single artist. Rewrite the records, the shows, the videos and the press; keep the sleeves, the board and the black and white.

## How it is made

- The header (the name, the links and an aqua "Listen" pill to the featured record's listen row) and the footer (on the record's black: "Encore" over "Bring Velvet Freight to your town" with "Book the band", the links, the listen and follow links, and the name across the width) are on every page.
- The lists: `releases` (the hero's featured record, the home page's row of sleeves, the music page, a page per record, the header's Listen button), `events` (the hero's next show, the home page's board, the shows page's board and past shows), `videos` (the home page, the videos page, each record's videos by its `release`), `team` (the home page's band), `quotes` (the home page's three and the press page's all), `press-photos` (the press page), `contacts` (the press page's contacts, the contact page's cards and its publicist line), `contact-rider` (for promoters, beside the booking form) and `navigation` (the header and footer links, with `place: listen` for the band's profile on each service and `place: social` for its social pages); `bookings` collects the booking form and `newsletter` the mailing list. The design notes explain how each works.
- Upstart plays no audio and embeds no video: each record's listen row links out to the services filled in its `listen` links, and each video is a poster linking to YouTube or Vimeo. Tickets and records are sold elsewhere (the venue's or the seller's page, Bandcamp).
- A show is upcoming or past by its date, compared with today's on every request; a static export fixes the split on the day it is made.

## When adapting

- The name is in the header, the hero, the footer (twice: "Bring … to your town" and across the width), the mobile menu, every `<title>` and the pages' descriptions; the town in the mobile menu, the footer's last line, the band section and the press bios and facts.
- The records are the maker's: titles, dates, kinds, catalog numbers, formats, tracklists, credits and links. Ask for the tracklists and credits, or keep a record's back short (the tracks only) rather than invent them for a real release. Give each record a square cover; the covers are the only pictures in color.
- Show dates, venues, prices and ticket links change every season: ask for them, or leave the board with its "No dates on the board right now" line rather than invent a tour. The opening acts, doors and ages are in each show's `summary`.
- The booking agents', publicist's and management's names and emails are the maker's: ask, or keep only the band's own address (`contacts`, the footer's mailto).
- Quotes from the press must be real: ask for them, or leave the said-of-us section and the press page's quotes out until the maker has some.
- Write the band's sound in words, never by naming other artists.

## Pages

### Home (`/`)

The name at poster size with the next show flipping in and the featured record's sleeve with its disc sliding out, the board of the next six shows, the records as sleeves, the three newest videos, the band, three press quotes and the mailing list.

#### A band or a solo artist?

- **A band** (as built): the texts say "we"; the members and their instruments are listed on the home page (`team`) and named in the press bios and facts.
- **A solo artist**: the texts say "I". In `parts/band.liquid`, one portrait (`data-bw`) replaces the band photo, the list of members becomes one line naming the live band, and `team` holds the players or is deleted with that list. Change the voice of every page's texts, the footer's "Bring … to your town", the press bios (`parts/bios.liquid`) and its facts (`parts/facts.liquid`: "On stage" becomes the live line-up).

#### Where do fans buy the records?

- **On Bandcamp** (as built): each record's `buy` link goes to its Bandcamp page, and Bandcamp leads its listen links and the footer's listen column.
- **In the maker's own shop**: point each record's `buy` to its page in that shop and change "Buy the LP" / "Buy the record" if the shop sells more (in `parts/hero.liquid` and `pages/music/[releases].liquid`); Bandcamp, if any, stays among the listen links.
- **Nowhere, streaming only**: delete the `buy` field from `releases` and from every record, and remove the buy buttons and the formats line from `parts/hero.liquid`, `parts/music-records.liquid` and `pages/music/[releases].liquid`; the listen links stay.

#### How do promoters book the band?

- **With the booking form** (as built): requests arrive in Upstart's Content tab. Keep `parts/booking.liquid`, `data/bookings/`, `fragments/booking-thanks.liquid` and every "Book the band" link to `/contact#booking` (the footer, the mobile menu, the shows page's `parts/bring-us.liquid`, the press facts).
- **Through a booking agent**: replace the form in `parts/booking.liquid` with the agent's name, agency and email set large (`display`), keep "For promoters" beside it, and point every "Book the band" link to `mailto:` that email; delete `data/bookings/` and `fragments/booking-thanks.liquid`.
- **Not booking shows**: delete `parts/booking.liquid` and its render, `parts/bring-us.liquid` and its render, `data/bookings/`, `data/contact-rider/` and `fragments/booking-thanks.liquid`; in the footer, replace the "Encore" call with the mailing list's line ("Hear first when …") and a link to `#mailing-list`, and remove "Book the band" from the mobile menu.

#### How do fans hear about new shows?

- **The mailing list form** (as built): an email and a city, kept by Upstart and downloadable as CSV from the Content tab (`parts/mailing-list.liquid`, `data/newsletter/`, `fragments/newsletter-thanks.liquid`).
- **The maker's newsletter service**: replace the form in `parts/mailing-list.liquid` with one "Join the list" button (`btn btn-primary btn-lg`) to its sign-up page (Mailchimp, Substack, Laylo…); delete `data/newsletter/` and `fragments/newsletter-thanks.liquid`.
- **Follow links only**: delete `parts/mailing-list.liquid` and its renders (home, shows, contact), `data/newsletter/` and `fragments/newsletter-thanks.liquid`; the board's empty line points to the band's social pages instead ("Follow us on Instagram to hear first").

### Music (`/music`)

The records' title with the filter by kind, every record as a large sleeve with its kind, year, formats and summary, and the services as wordmarks; each record has its page: the sleeve large on the stage, its disc rolling out with the scroll, the title at poster size, the listen row and the buy button (`#listen`), then the paper back with the sides, the credits and the liner notes, the record's videos and the next record.

#### A page for each record?

- **Yes, a page each** (as built): the sleeve flies to a page with the front, the back and the record's videos. Keep `pages/music/[releases].liquid` and `parts/side.liquid`.
- **The discography only**: each sleeve opens its first listen link instead (its Bandcamp page, or the first service). Delete `pages/music/[releases].liquid` and `parts/side.liquid`; in `parts/hero.liquid`, `parts/records.liquid` and `parts/music-records.liquid`, link each sleeve to `{{ release.listen.first.href }}` (with `target="_blank" rel="noopener"`) and pass no `flight` to `sleeve`; delete the `side_a`, `side_b`, `credits` fields and the notes from `releases`; point the header's Listen to `/music`.

When removed: delete `pages/music.liquid`, `pages/music/`, `parts/music-records.liquid`, `parts/listen-everywhere.liquid`, `parts/side.liquid` and the `music` navigation record. The home page's hero and sleeves keep `releases`; link each sleeve to its first listen link as in "The discography only"; "Every record" in `parts/records.liquid` goes; the header's Listen leads to the hero (`/#listen`, an `id="listen"` on the hero's listen links).

### Shows (`/shows`)

The title and the tour's line, every upcoming show on the board grouped by month with its opening act, doors, ages and price, the past shows by year, "Bring us to your town" over a crowd photo, and the mailing list.

#### How do fans get tickets?

- **A ticket link for each show** (as built): `booking` in each show, at the venue or the ticket seller; a sold-out show has none and its row says "No tickets left".
- **One page for the whole tour**: the band's page on Bandsintown or Songkick, or a promoter's. Remove `booking` from the shows; in `parts/show-row.liquid` every row becomes a `<div>` and its tickets cell is dropped; end `parts/board.liquid` and `parts/tour-board.liquid` with one "Tickets for every date ↗" button (`btn btn-primary`) to that page.
- **At the door**: remove `booking` from the shows; the tickets cell of `parts/show-row.liquid` shows the price (`{{ show.price }}`) and says "At the door"; the tour's line says "Tickets at the door".

When removed: delete `pages/shows.liquid`, `parts/tour-board.liquid`, `parts/past-shows.liquid`, `parts/bring-us.liquid` and the `shows` navigation record. The home page's board keeps `events` and loses "All dates", and the hero's next show leads to `/#shows`. For a maker who plays no shows, delete `parts/board.liquid`, `parts/show-row.liquid`, the hero's next-show line and "On tour" line, and `data/events/`.

### Videos (`/videos`)

The title, the featured video large with its kind, running time, date and director, every video as a poster with its kind and running time, and "More on our YouTube channel".

When removed: delete `pages/videos.liquid`, `parts/featured-video.liquid`, `parts/all-videos.liquid` and the `videos` navigation record. The home page's videos and each record's videos stay; "All videos" in `parts/videos.liquid` points to the band's YouTube channel (the `youtube` navigation record). With no videos at all, delete `data/videos/`, `parts/videos.liquid`, `parts/video-card.liquid` and the record page's videos section.

### Press (`/press`)

The title with the publicist's name and email, the short and long bios on paper, the facts, every quote, four press photos to download with their credits, and the press and management contacts.

#### A press kit to download?

- **The page is the kit** (as built): bios to copy, facts, quotes, photos to download and the contacts.
- **The page and a PDF**: once the maker has added their press kit to the media library (it takes documents), add a "Download the press kit (PDF)" button (`btn btn-primary`, with `download`) under the title's publicist line, to its `/media/…` address. Until they do, leave the button out rather than link to nothing.

When removed: delete `pages/press.liquid`, `parts/bios.liquid`, `parts/facts.liquid`, `parts/quotes.liquid`, `parts/press-photos.liquid`, `data/press-photos/` and the `press` navigation record. The home page's quotes stay; "Read the full story" in `parts/band.liquid` goes; the footer's "Press kit" link becomes the publicist's email (`mailto:` from `contacts`).

### Contact (`/contact`)

The title, who to write to (booking in North America and Europe, press, management and a general address), the booking form with "For promoters" beside it, and the mailing list.

Its booking section follows how promoters book, and its mailing list how fans hear about shows, both chosen with the home page.

When removed: delete `pages/contact.liquid`, `parts/booking.liquid`, `parts/contact-cards.liquid` (unless the press page keeps it), `data/contact-rider/`, `data/bookings/`, `fragments/booking-thanks.liquid` and the `contact` navigation record. Every "Book the band" link becomes the booking agent's email (`mailto:` from `contacts`), and the footer's "Write" column names the press and booking emails.
