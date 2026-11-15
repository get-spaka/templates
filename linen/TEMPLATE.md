# Linen

A guesthouse seen the way you wake in it: a sheer linen curtain moves over the window onto the courtyard and draws aside as you scroll, the rooms hang as dyed keys on the reception's board, and a request for your dates is never more than one scroll away. It was written for Casa Hilo, a guesthouse of five rooms around a courtyard in Oaxaca; it suits a bed and breakfast, a country inn, a farm stay, a seaside guesthouse, a mountain lodge, a city boutique hotel of up to about twenty rooms, or a holiday house let whole. Rewrite the house, the rooms and their colors, the table and the town, and keep the linen, the keys and the one deep band a page.

## How it is made

- The header (with "Book a room") and the footer (on indigo: "Come and stay", the address, the contacts, the season's letter and the links) are on every page.
- The lists: `rooms` (the key board on the home and rooms pages, a page per room, and the room cards of the request form), `testimonials` (the home page's guests' words), `places` (from the door, on the home and around pages), `outings` (the around page), `home-table` (the home page), `rooms-every` (the rooms page), `book-steps` and `book-faq` (the book page), `story-milestones`, `story-makers` and `team` (the story page), `table-breakfast` and `table-supper` (the table page), `around-seasons` (the around page) and `navigation` (the header and the footer); `stays` collects the request form's answers and `newsletter` the footer's letter. The design notes explain how each works.
- Booking is a request, never a sale: Upstart takes no payments and has no availability calendar. The home page's booking bar is a plain form to `/book#request`, whose script copies the dates into the request form.

## When adapting

- The name is in the header, the footer, the mobile menu and every `<title>`; the address in the footer, the mobile menu, the book page's getting here and the pages' descriptions; the hosts' names in the welcome, the story, the team and the request's answer (`fragments/stay-thanks.liquid`).
- Give each room a color that says something about it (its walls, its view, its name), from the theme's five: the rooms are told apart by them.
- Prices, check-in and check-out times, the deposit and cancellation terms, breakfast hours, the pickup and the supper's price are the house's: ask for them, or leave them out rather than guess.
- Guests' words are written by the house: keep them believable and short, or leave the section out until the maker has real ones.

## Pages

### Home (`/`)

The window with the sheer and the booking bar, the hosts' welcome, the key board of the rooms, the house's story on indigo, the table, the places from the door, and guests' words.

#### How do guests book a room?

- **They ask for their dates here** (as built): guests send a request for their dates, and the house answers by email with the room, the price and how to pay the deposit. Keep the booking bar (`parts/hero.liquid`), the request form (`parts/request.liquid`, `data/stays/`, `fragments/stay-thanks.liquid`) and every "Book a room" link to `/book#request`.
- **On the house's own booking page**: guests book and pay on the house's booking engine. Point every "Book a room", "Ask for these dates" and "Ask for this room" link (`parts/header.liquid`, `parts/footer.liquid`, `parts/good-to-know.liquid`, `parts/outings.liquid`, the room page) to that address; replace the booking bar's form with one stitched button, "See dates and prices" (`btn btn-primary btn-lg`), under the window; delete `data/stays/`, `fragments/stay-thanks.liquid` and `parts/request.liquid`, and put the same button where the book page's form was.
- **By message**: guests write or call. Replace the booking bar and the request form with the email, the phone and WhatsApp set large as links (`mailto:`, `tel:`, `https://wa.me/…`, in `display` type); point the booking links to `/book#contact` (an `id="contact"` on that section); delete `data/stays/` and `fragments/stay-thanks.liquid`.

#### How is the house let?

- **Room by room** (as built): each room has its key, its page, its price and its place in the request form. Keep `rooms` as it is.
- **As a whole**: for a holiday house, a villa or a farmhouse let to one group. The hero's line and the welcome speak of the house and how many it sleeps; the key board shows the bedrooms with what each sleeps, without prices or "Ask for this room" (`parts/keys.liquid` and the room page), and their pages stay; the request form loses its room and kind fields (and `room` and `kind` go from `data/stays/_datasource.yaml`); the book page's whole-house band (`parts/whole-house.liquid`) goes, since the whole house is what is booked.

### Rooms (`/rooms`)

The title on the rooms and their dyes, the key board of every room, what every room has, and check-in and check-out; each room has its page, dyed in its color, with its large key, its number, its facts and price, its pictures, its text, what is in it and the other rooms.

#### Are prices shown on the rooms?

- **A price from, per night** (as built): each room's lowest price, on the board and on its page, with "breakfast included". Keep `price` in `rooms`.
- **No prices**: the house gives its prices on request. Remove the price lines from `parts/keys.liquid`, the room page (`pages/rooms/[rooms].liquid`, which then says "Rates on request" beside "Ask for this room") and the request form's room cards; delete the `price` field from `rooms`.

When removed: delete `pages/rooms.liquid`, `pages/rooms/`, `parts/rooms-title.liquid`, `parts/every-room.liquid`, `parts/good-to-know.liquid`, `data/rooms-every/` and its navigation record. The home page's key board stays over `rooms`, its cards no longer link anywhere (`<a>` becomes `<div>` in `parts/keys.liquid`), and "All the rooms" goes; the request form keeps its room choices.

### Book (`/book`)

The title, the request for dates in three steps, how it works, the whole house, getting here, and good to know.

Its request follows how guests book, chosen with the home page.

#### Can guests take the whole house?

- **Yes, by request** (as built): a group can ask for all the rooms. Keep the whole-house band (`parts/whole-house.liquid`), "The whole house" among the form's kinds and "The whole house, up to 11" in the booking bar's guests.
- **Stays only**: delete `parts/whole-house.liquid` and its render; remove the form's kind field (`parts/request.liquid`, and `kind` from `data/stays/_datasource.yaml`), the bar's whole-house option, and the `groups` record of `book-faq`.

When removed: delete `pages/book.liquid`, `parts/book-title.liquid`, `parts/how-it-works.liquid`, `parts/whole-house.liquid`, `parts/getting-here.liquid`, `parts/book-faq.liquid`, `data/book-steps/`, `data/book-faq/` and its navigation record. With the request form, render `request` on the home page under the key board (it keeps `id="request"`), point the booking bar to `/#request` and every booking link to `/#request`; with an outside booking page or messages, the links point there. The footer keeps the address.

### Story (`/story`)

The house's story with Inés's pull quote, the house through time on indigo, who keeps it, and what was made nearby.

#### Who keeps the house?

- **Its hosts, by name** (as built): the welcome is signed by the hosts, and the four people who keep the house are shown. Keep `parts/welcome.liquid` and `team` as they are.
- **A small team**: the welcome is signed by the house ("Everyone at Casa Hilo", in `parts/welcome.liquid`, whose oval then holds the house's initials); `team` leads with the manager; the story's pull quote is the manager's.

When removed: delete `pages/story.liquid`, `parts/story-title.liquid`, `parts/through-time.liquid`, `parts/keepers.liquid`, `parts/made-nearby.liquid`, `data/story-milestones/`, `data/story-makers/`, `data/team/` and its navigation record. The home page's house section (`parts/house.liquid`) keeps its two paragraphs and loses "Read its story".

### The table (`/table`)

Breakfast on the roof with the cook's words, what is served every morning, the mezcal hour on indigo, and Thursday supper.

#### What does the house serve?

- **Breakfast every morning, supper some nights** (as built): breakfast, the mezcal hour and Thursday supper. Keep the page as it is.
- **Breakfast only**: delete `parts/mezcal.liquid`, `parts/supper.liquid`, their renders and `data/table-supper/`; keep the `breakfast` record of `home-table` alone, and say breakfast only in the footer's and the welcome's lines that mention supper or mezcal.
- **A restaurant open to all**: the menu gets its dishes and prices (a `price` field in `table-breakfast`, written with a leader); add "Book a table", either a second form over a collected `tables` datasource (date, time, guests, name, email, phone, note, with its answer fragment) on this page or a link to the restaurant's own booking page, and a "Book a table" button in the header beside "Book a room".

When removed: delete `pages/table.liquid`, `parts/table-title.liquid`, `parts/breakfast.liquid`, `parts/mezcal.liquid`, `parts/supper.liquid`, `data/table-breakfast/`, `data/table-supper/` and its navigation record. The home page's table section (`parts/home-table.liquid`) stays, without "See the table".

### Around (`/around`)

The barrio, every place by its minutes from the door, the outings the house arranges, and when to come.

#### Does the house arrange outings?

- **Yes, a few** (as built): each outing with its picture, length and price, asked for in the request's note. Keep `outings` and `parts/outings.liquid`.
- **No, places only**: delete `parts/outings.liquid`, its render and `data/outings/`.

When removed: delete `pages/around.liquid`, `parts/around-title.liquid`, `parts/outings.liquid`, `parts/seasons.liquid`, `data/outings/`, `data/around-seasons/` and its navigation record. The home page's from the door (`parts/distances.liquid`) keeps `places` and loses "Around the house".
