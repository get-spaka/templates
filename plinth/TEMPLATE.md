# Plinth

Plinth is the website of an exhibition that hangs itself: it opens nose to the canvas, on a detail of the lead work, and steps back as the visitor scrolls to the whole painting on a white wall with its museum label; every work is then hung to scale on one center line, the rooms painted in the theme's colors, and the practical museum (open today, tickets, talks and tours) is always one line away. It was written for Long Light: Nordic Painters of the Evening, 1885–1915, an exhibition of twelve paintings in five rooms at the Hallgren Museum of Art, a small museum on a pier in Astoria, Oregon. It suits a museum's or a gallery's solo or group show, a photography exhibition, an art center's or a university gallery's show, a design, craft or sculpture exhibition, a historic house's display, or an artist's own retrospective or open studio. Keep the wall, the labels and the way works are shown; rewrite the exhibition, its rooms, works, artists and program.

## How it is made

- Every page shares the header (a top line with the open today line and the museum's name and place, then the exhibition's name, the links and a Buy tickets button) and the footer (a colophon on night: the credit line, then the address, the hours, the links and the socials).
- The home page's sections are parts: `step-back` (the hero), `idea`, `rooms-index`, `on-the-wall`, `artists-section`, `talks-and-tours`, `visit-today` and `letter`. Works are hung everywhere by `parts/hang.liquid` and labeled by `parts/plaque.liquid`; artists are listed by `parts/artist-rows.liquid`, events by `parts/event-rows.liquid`, the open today line by `parts/today.liquid`.
- The lists: `works` (the hang on the home page, the works page, each room, each artist's page and a page per work), `rooms` (the home page's paint chips, the exhibition page's bands, the works page's filter), `artists` (the home page, the artists page and a page per artist, every label), `events` (the home page, the program page and a page per event), `hours` (the header's open today line, the home page's and visit page's tables, the footer), `navigation` (the links, and the one ticketing link every Buy tickets button reads, `place: tickets`), `visit-admission`, `visit-access`, `visit-faq` and `exhibition-credits`. `reservations`, `group-visits` and `newsletter` collect the forms. The design notes say how each effect works.

## When adapting

- The exhibition's name is in the header ("Long Light" and "at the Hallgren"), the hero's title (`parts/step-back.liquid`, two `data-step-line` words: keep one or two short words a line, or rewrite it as one line), the exhibition page's title, the footer's credit line, the catalogue and every page's title. Its dates are in the hero, the exhibition page and `parts/today.liquid` (`data-last-day`). The museum's name and address are in the header's top line, the visit section, the visit page and the footer; its time zone in `parts/today.liquid` (`data-tz`), with the line it shows with no script ("Wednesday to Sunday, 10 to 5"), which must match `data/hours/`.
- The hero's work, picture and label are written in `parts/step-back.liquid`: keep them in step with that work's record. Set `data-focus` on the picture to the detail to start from (as "x% y%" of the image).
- The works' facts are the maker's: title, year, medium, size and collection exactly as the owners give them. Never invent a size: the hang draws from it. When the maker gives no photographs of their works yet, keep each work's record with an empty `image` (a placeholder frame in theme colors shows, with its label) and ask for them; never fill a living artist's works with found images. Photographs of works are shown whole and true: no crop, no filter.
- The labels name the collection a work belongs to ("Collection: …"); for an artist's own show, "Courtesy of the artist" or the gallery.
- The curator, the speakers, the supporters and the catalogue are invented: replace them with the maker's or remove them.
- The ticketing page's address goes into `data/navigation/tickets.md` (it is `https://example.org/tickets` as built). Ask for it.

## Pages

### Home (`/`)

The step back from a detail of the lead work to the whole painting on the wall, with the title, the dates and the tickets; the curator's statement; the rooms as paint chips; six works hung to scale; the artists; the next three talks and tours; today at the museum; and the letter's sign-up.

#### What does the website present?

- **One exhibition** (as built): the site is the exhibition's own, from its idea to its last work. The museum appears in the header's top line, the visit page and the footer.
- **A space and its exhibitions**: for a gallery or an art center with a changing program. Add an `exhibitions` list (title, subtitle, dates, status as a choice of current, upcoming and past, a cover work's image, the text as the body) with `pages/exhibitions/index.liquid` and `pages/exhibitions/[exhibitions].liquid`; give `rooms` and `works` an `exhibition` choice; the hero takes the current exhibition, and the header's "Long Light" becomes the space's name. The exhibition page becomes the current exhibition's page in that list: move `parts/essay.liquid`, `parts/room-bands.liquid`, `parts/credits.liquid` and `parts/catalogue.liquid` into the record page, filtered by exhibition, and point the navigation's Exhibition link to `/exhibitions`.

#### How do visitors get in?

- **Tickets on the museum's own ticketing page** (as built): every Buy tickets button (the header, the hero, the visit section, the visit page, the footer) opens the address in `data/navigation/tickets.md`. The prices show on the visit page.
- **Free entry**: "Free entry" after the open today line in `parts/header.liquid` and under the dates in `parts/step-back.liquid`; change `data/navigation/tickets.md` to the label "Plan your visit" and the address `/visit` (and remove `target="_blank"` from the buttons that read it). On the visit page, replace the admission section's list with one line, and remove the line about the ticketing page.
- **Free, by time slot**: add a collected `visits` datasource (date, time, visitors as a number, name, email) with `fragments/visit-thanks.liquid`, a form on the visit page in place of the admission list (`id="book"`), and say the museum confirms by email; change `data/navigation/tickets.md` to "Book a free visit" and `/visit#book`.
- **Paid at the door**: the prices stay on the visit page; change `data/navigation/tickets.md` to "Plan your visit" and `/visit`, and remove the line about the ticketing page.

### The exhibition (`/exhibition`)

The title, the dates and the curator; the essay beside a picture of a gallery room, with a pull quote; one band per room in its wall color with its number, its text and its works hung on its wall; who organized, owns and supported it; and the catalogue.

#### How is the exhibition laid out?

- **In rooms** (as built): a painted band per room, with its works; each work names its room.
- **As one sequence**: no rooms. In `pages/exhibition.liquid` replace `{% render 'room-bands' %}` with one white section that hangs every work (`{% render 'hang', works: data.works, artists: data.artists, legend: true %}`) in catalogue order. Delete `data/rooms/`, the works' `room` field, `parts/rooms-index.liquid` (and its render on the home page), the works page's `rooms:` filter and the work page's room line and link.
- **By artist**: each band is an artist's room, with that artist's works. In `parts/room-bands.liquid` loop over `data.artists` and filter `data.works` by `artist`, painting the bands in turn (`alt`, `secondary`, `primary`, `neutral`, `base`); delete `data/rooms/` and the works' `room` field, make the home page's paint chips list the artists, and filter the works page by artist.

When removed: delete `pages/exhibition.liquid`, `parts/essay.liquid`, `parts/room-bands.liquid`, `parts/credits.liquid`, `parts/catalogue.liquid`, `data/exhibition-credits/` and the `exhibition` navigation record. The home page's statement keeps the idea: point its "About the exhibition" button and the paint chips' links to `/works`, and the work page's room link too; the works keep their `room` for the hang's order.

### Works (`/works`)

The title and the count, the room filter and the On the wall / As a list switch, then every work hung to scale or as the checklist; each work opens on its own page, on its room's wall color, with its full label, Look closer, a text, its place in the hang and the artist's other works.

#### How are the works hung?

- **To scale, on a center line** (as built): from each work's height and width, for paintings, drawings and prints.
- **All at one height**: for photographs and editions, or when the sizes are not known. In `styles/site.css` give `.frame` a fixed height (`height: calc(var(--tallest) * var(--cm) * 0.6); width: auto`) and `.bay-cell` a width from the frame, and remove the legend's meter (`legend: true` in the renders of `hang`); the sizes stay in the labels when they are known.
- **On plinths**: for sculpture, ceramics and design objects. Each work stands on a block of putty (`bg-base-200`, a fixed height under the frame) with its label on the block's face, in square frames (`aspect-ratio: 1`, `object-contain`), with no center line (remove `.bay::before`) and no legend. Write the sizes as height × width × depth.

When removed: delete `pages/works/` and the `works` navigation record; pass `links: false` to every render of `hang` (the home page, the exhibition's rooms, the artists' pages), and show the labels in full there (`full: true` in `parts/hang.liquid`'s plaque); move Look closer to the home page's wall (a `data-look` link under each label and `{% render 'look' %}` on the home page); point "All twelve works" to `/exhibition`.

### Artists (`/artists`)

The title, then each artist as a row with a portrait or initials, the name, dates and places, a line and how many works are in the show; each artist opens on a page with the name at poster size, the portrait and its label, the life, their works hung to scale and the other artists.

#### How much room does each artist get?

- **A page each** (as built): the list, then each artist's page with their life, portrait and works in the show.
- **All on one page**: for a group show of many artists. Delete `pages/artists/[artists].liquid`; in `pages/artists/index.liquid` give each row an `id="{{ artist.id }}"`, the life (`body`) and the thumbnails of their works, and point every link to an artist (the rows in `parts/artist-rows.liquid`, the work page's "More about") to `/artists#<id>`.

When removed (a solo show, or makers who are not named): delete `pages/artists/`, `parts/artists-section.liquid` (and its render on the home page) and the `artists` navigation record; the labels' names stop linking (the work page's "More about" goes). For a solo show, keep the one artist's record for the labels and add their life to the exhibition page as a section after the essay.

### Program (`/program`)

The title and the kind filter, then the talks, tours, family afternoons and evenings by date, each with its time, place and price; each event opens on a page with its details, the speaker, its text, the form to reserve a seat and the work it starts from, hung whole.

#### How do people come to an event?

- **They reserve a seat with the form** (as built): the form on each event's page (`parts/reserve.liquid`), the requests in the Content tab, and "Free with admission" or the price shown.
- **Through the ticketing page**: add a `booking` link field to `events`; on the event's page replace `{% render 'reserve' %}` with a button to `record.booking` opening in a new tab, and change "Reserve a seat" in `parts/event-rows.liquid` to "Book". Delete `parts/reserve.liquid`, `data/reservations/` and `fragments/reservation-thanks.liquid`.
- **They just come**: on the event's page replace the form with "No booking: first come, first seated" and the time to arrive; remove "Reserve a seat" from `parts/event-rows.liquid`. Delete `parts/reserve.liquid`, `data/reservations/` and `fragments/reservation-thanks.liquid`.

When removed: delete `pages/program/`, `parts/talks-and-tours.liquid` (and its render on the home page), `parts/event-rows.liquid`, `parts/reserve.liquid`, `data/events/`, `data/reservations/`, `fragments/reservation-thanks.liquid` and the `program` navigation record.

### Visit (`/visit`)

Today and the week's hours, admission and tickets, getting here (the address set large, by car, bus, on foot and by trolley), access, school and group visits with their request form, and questions. Its admission section follows how visitors get in, chosen with the home page.

#### Can groups book a visit?

- **Yes, with the form** (as built): schools and groups ask by form (`parts/group-form.liquid`, `data/group-visits/`), and the museum confirms by email.
- **By email or phone**: in `pages/visit.liquid` replace `{% render 'group-form' %}` with a line giving the education team's email and phone; delete `parts/group-form.liquid`, `data/group-visits/` and `fragments/group-visit-thanks.liquid`.
- **No group visits**: remove the `#groups` section from `pages/visit.liquid`; delete `parts/group-form.liquid`, `data/group-visits/` and `fragments/group-visit-thanks.liquid`, and the access list's ASL tour line if it points there.

When removed: delete `pages/visit.liquid`, `data/visit-admission/`, `data/visit-access/`, `data/visit-faq/`, `data/group-visits/`, `parts/group-form.liquid`, `fragments/group-visit-thanks.liquid` and the `visit` navigation record. The home page's visit section keeps the hours, the admission line and the address: point every "Plan your visit" to `/#visit`. The footer keeps the address and the hours, and the header keeps the open today line.
