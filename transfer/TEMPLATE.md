# Transfer

A tattoo shop's website that works the way a tattoo is made: every design lands as a violet thermal stencil, a little off register, and the black ink takes over it; hovering a design lifts the ink to show the stencil again. The site is a sheet of flash on bristol board: a blackletter wordmark at poster size, numbered and priced drawings, a flash wall to claim from, the guest chair laid out month by month, a design tried on skin at its real size, and a dial of healing days. It was written for Lost Wax Tattoo, four artists and an apprentice on the second floor of an old tannery in Butchertown, Louisville, Kentucky; it suits a single tattoo artist, a fine-line or blackwork studio, a piercing studio (the jewelry in place of the flash), a cosmetic tattoo or microblading studio, a henna artist, or a sign painter or illustrator who sells designs. Rewrite the artists, the flash, the guests and the healing texts; keep the sheet, the transfer, the try-on and the heal.

## How it is made

- Every page has the header (a strip on vellum naming who is in the guest chair, the "Lost Wax" wordmark, the links and a red "Request a tattoo" pill, a full-screen menu on ink below the width where the links fit) and the footer on ink (the "Fresh flash" sign-up, the hours, the address with "18+ with a photo ID", the links, Instagram, and the small "No. 00, Thank you" drawing).
- The lists: `artists` (the home page's roster, the artists page and a page each, the request form's select), `flash` (the home page's "On the wall", the flash wall and a page each, each artist's flash, the artists' marks), `placements` (the skin photos of "Try it on"), `guests` (the header's strip, the guest sheet on the home and guest pages, the guest cards, "Been and gone", the request form's select), `hours` (the footer), `heal` (the aftercare's dial), `home-steps` and `book-steps` (the ruled steps), `book-prices`, `book-faq`, `aftercare-dos`, `aftercare-faq` and `navigation` (the header and the footer). `requests`, `claims`, `guest-applications` and `newsletter` collect the four forms.
- Records name each other by id: a design's `artist` is an artist's id, an artist's `mark` is a design's id, the request form's select is built from `artists` and `guests` (its values are their ids, which `/book?artist=…` and `/book?guest=…` choose). Rename both sides together.
- The drawings of the flash, the guests' marks and the steps' drawings are the template's own SVG files in `media/`, each with its stencil beside it (`<name>-stencil.svg`, its lines only); the artists' work images are those drawings set on the skin photos.

## When adapting

- The shop's name is in the header's wordmark, the hero's `<h1>` (`parts/sheet.liquid`), the footer, every `<title>` and description, and the shop's story (`parts/shop.liquid`); the address, phone and email in `parts/footer.liquid` and `parts/find-us.liquid`; the hours and the walk-in line in the header's menu, the hero's labels, the footer, `parts/find-us.liquid` and `parts/flash-rules.liquid`.
- **Never fill an artist's work or flash with found images.** The maker's own drawings and photos replace them. Until they are given, keep the template's drawings, or a placeholder in theme colors. A drawing given as a transparent PNG or an SVG of lines makes the best stencil (`outline`); a photo of a painted sheet works too, its stencil made from it.
- The hero's sheet (`parts/sheet.liquid`) is written out: six designs with their numbers and prices. Keep it in step with `flash` when designs change, or show the maker's six newest.
- Ask for the real prices, deposits, age rule and hours; never invent a license, a health permit number or a medical claim. The aftercare texts are general care, not medical advice: keep the doctor panel and its sentence that it does not replace one, and ask the maker to check the texts against what their shop hands out.
- The guests and their dates are invented and never stay: ask who is coming and when, or remove the guest chair. The sheet starts at the month of the next guest (Liquid reads today's date when the page is built) and a script marks who is in the chair, who is next and who has left.
- The skin photos (`placements`) show three skin tones; the maker can replace them with their own, giving each the inches of skin it shows across (`skin_in`) and where a design sits best on it (`center_x`, `center_y`, in % of the photo).

## Pages

### Home (`/`)

The sheet (the wordmark over six numbered designs that transfer one after another), the shop, the artists as big blackletter names on ink, eight designs from the wall, how it goes in four ruled steps, the guest chair month by month with the next three guests, the aftercare's settled tattoo, and a ruled strip with the address, the hours and the walk-ins.

#### How do clients ask for a tattoo?

- **With the request form** (as built): custom work through the book page's form, flash through each design's claim form; requests arrive in Spaka's Content tab, and the shop replies with dates and a deposit link. Keep `parts/request-form.liquid`, `parts/claim-form.liquid`, `data/requests/`, `data/claims/`, `fragments/request-thanks.liquid`, `fragments/claim-thanks.liquid` and `scripts/prefill.js`.
- **On the shop's own booking system**: for shops whose artists take bookings and deposits through a booking app. Point every "Request a tattoo" (`parts/header.liquid`, `parts/sheet.liquid`, `parts/ruled-steps.liquid`, the artists' pages) and the claim buttons to the address the maker gives, or to each artist's `booking_link`; delete the two forms, `data/requests/`, `data/claims/`, their fragments and `scripts/prefill.js`, and remove `{% render 'request-form' … %}` from `pages/book.liquid` and the form from `parts/claim-form.liquid` (keep its heading and a "Book it" button). The book page keeps its steps, prices and questions.
- **By email or direct message**: "Request a tattoo" opens an email (`mailto:`) or links to the shop's Instagram; the forms go as above, and the book page's steps (`data/book-steps/`) say what to put in the message: the idea, the placement, the size and a few references.

#### Is it a shop or one artist?

- **A shop of several artists** (as built): the roster, the artists' pages, and an artist select in the forms.
- **One artist**: the artists page type becomes About (`pages/about.liquid`, `/about`): the artist's own page with bio, portrait, books, flash and work (`pages/artists/[artists].liquid`, moved and reading the one record); on the home page replace `{% render 'roster' … %}` with one portrait beside a note in the artist's words; remove the artist select from `parts/request-form.liquid`; "Four artists and an apprentice" leaves the texts, and the texts speak in the first person.

#### Does the shop take walk-ins?

- **On set days** (as built): "Walk-ins Saturdays 12–6" in the hero's labels, the header's menu, the footer, `parts/find-us.liquid` and the flash page's rules.
- **By appointment only**: remove the walk-in lines from those files and the walk-in question in `data/book-faq/`; the flash page's fourth rule becomes "Claim it with the form" (`parts/flash-rules.liquid`).
- **Every day it is open**: the hero's labels say "Walk-ins welcome", the hours drop "by appointment", and the header's strip can carry who is in today when the maker keeps it current.

### Artists (`/artists`)

The title "Four artists and an apprentice", the roster in full (each name with its styles, its books and their note, a two-line summary and its mark), and the next guest's card; each artist has a page with their name at poster size, their books and a button to request a tattoo with them, their bio beside a photo of their hands at work, their flash, their work, and the other artists.

#### How does a client reach an artist?

- **Through the shop's request form** (as built): each artist's button links to `/book?artist=<id>`, and the form chooses them.
- **Each artist books for themselves**: each page's button links to the artist's `booking_link` or Instagram in `pages/artists/[artists].liquid`; remove the artists from the select in `parts/request-form.liquid`; the roster's rows (`parts/roster.liquid`) say "Books through Teo" in place of the books label.

#### Are the artists' books shown?

- **Yes** (as built): open, waitlist, closed or flash only (`books`), with a note (`books_note`).
- **No**: remove the books lines from `parts/roster.liquid` and `pages/artists/[artists].liquid`, and the `books` and `books_note` fields from `data/artists/`; every button reads "Request a tattoo with Teo".

When removed (a one-artist site that keeps no artists page): delete `pages/artists/`, the roster's render on the home page and its navigation record; keep `data/artists/` only if the forms still choose an artist, otherwise delete it and the designs' `artist` field and the forms' select; point "Meet the artists" (`parts/shop.liquid`) to `/book`.

### Flash (`/flash`)

The wall: its counts, how flash works in four ruled steps, filters by artist and style with "Available only", every design as a numbered card with "Claimed" set across those taken, flash day on ink and the fresh-flash sign-up; each design has a page with the drawing large, its number and price, the facts, try it on (the design on a forearm, a shoulder or a shoulder blade at its size), the claim form, and more by the same artist.

Its claim forms follow how clients ask for a tattoo, chosen with the home page.

#### How is flash taken?

- **Claimed online, design by design** (as built): the claim form and the $50 deposit on each design's page; the wall's filters and counts.
- **Walk-in only, first come, first served**: in `parts/claim-form.liquid` replace the form with "Walk in on Saturdays and ask for No. 14"; delete `data/claims/` and `fragments/claim-thanks.liquid`; remove the `status` field, the "Claimed" marks (`parts/flash-card.liquid`, `pages/flash/[flash].liquid`) and the "Available only" chip (`parts/flash-wall.liquid`).
- **Shown, not sold**: for an artist whose flash is a portfolio of ideas. Remove the prices (`price`) and statuses from the cards, the sheet and the design pages; each design's page ends with "Ask for something like it" to `/book?artist=<id>`; the counts read "12 designs".

#### Are designs tattooed once?

- **Some once, some again** (as built): the `kind` field marks each, and claimed one-and-done designs stay marked.
- **All one and done**: remove `kind` and its lines; every claimed design stays on the wall, marked "Claimed", as an archive.
- **All repeatable**: remove `kind` and `status`, the "Claimed" marks, the "Available only" chip and the claimed count.

When removed: delete `pages/flash/`, `data/flash/`, `data/claims/`, `parts/claim-form.liquid`, `parts/flash-wall.liquid`, `parts/flash-rules.liquid`, `parts/flash-day.liquid`, `parts/try-on.liquid`, `data/placements/`, `scripts/try-on.js`, `fragments/claim-thanks.liquid`, the home page's `{% render 'on-the-wall' … %}`, the "their flash" section of `pages/artists/[artists].liquid` and the Flash navigation record; the hero's sheet and the artists' marks keep their drawings without links (`parts/sheet.liquid`, `parts/roster.liquid` read the drawings as the artists' work); point "See the flash" to `/artists`.

### Book (`/book`)

The title "Tell us the idea", how it goes in five ruled steps with the deposit said plainly, the request form beside what makes a good request, the prices with dotted leaders, and the questions people ask first.

#### Is there a deposit?

- **Yes, sent with the dates** (as built): the steps, the questions and the forms' answers say the shop sends a deposit link.
- **No deposit**: remove the deposit from `data/book-steps/quote-and-deposit.md` and `data/home-steps/`, the deposit lines of `data/book-faq/payment.md` and `cancelling.md`, `parts/claim-form.liquid` and the fragments, which say "We'll write with dates."

#### Does custom work start with a consultation?

- **Only when needed** (as built): the shop replies by email, and a consult is offered for large pieces.
- **Always**: every custom request books a consult first, in person or by video: the second step (`data/book-steps/`) becomes the consult, and `parts/request-form.liquid` adds a preferred consult time and which way (add both fields to `data/requests/_datasource.yaml`).

When removed (a shop that books on its own system or by message): delete `pages/book.liquid`, `parts/request-form.liquid`, `parts/prices.liquid`, `data/requests/`, `data/book-steps/`, `data/book-prices/`, `data/book-faq/`, `fragments/request-thanks.liquid` and `scripts/prefill.js`, and the navigation record; point every "Request a tattoo" to the booking system, the email or the Instagram chosen with the home page.

### Guest spots (`/guests`)

The title "The guest chair", the guest sheet (six months in panels, each guest's dates as a blackletter numeral with their name, city and mark, "Chair open" for a month without one), a card per coming guest with "Request a spot", the past guests in one ruled line, and a form for artists who want the chair.

#### How do clients book a guest?

- **Through the shop's request form** (as built): "Request a spot" links to `/book?guest=<id>`, and the form chooses the guest.
- **Through the guest's own booking**: each card's button (`parts/guest-card.liquid`) and the header's strip link to the guest's `booking_link` or Instagram; remove the guests from the select in `parts/request-form.liquid`.

#### Does the shop take guest applications?

- **Yes, with the form** (as built): `parts/guest-apply.liquid`, collected in `guest-applications`.
- **By invitation only**: delete `parts/guest-apply.liquid`, `data/guest-applications/` and `fragments/guest-thanks.liquid`, and put one line under the guests saying the shop invites its guests.

When removed (a shop with no guest chair): delete `pages/guests.liquid`, `data/guests/`, `data/guest-applications/`, `parts/guest-sheet.liquid`, `parts/guest-card.liquid`, `parts/guest-chair.liquid`, `parts/guest-apply.liquid`, `fragments/guest-thanks.liquid`, `scripts/guests.js`, the home page's `{% render 'guest-chair' … %}`, the guest section of `pages/artists/index.liquid` and the navigation record; the header's strip (`parts/header.liquid`) carries the walk-in line instead ("Walk-ins Saturdays 12–6 · See the flash →"); remove the guests from the request form's select.

### Aftercare (`/aftercare`)

The title "Heal it well", the dial of days with the same tattoo on the same skin from fresh to settled and what to see and do at each stage, the every-day do's and don'ts, how to take off a film wrap, when to call a doctor, free touch-ups, and the questions people ask after; printed, the every-day list and the doctor panel make one card.

#### How does the shop wrap a new tattoo?

- **Ointment and air** (as built in the texts, with the film as a section of its own): the heal's stages, the every-day list and the questions speak of washing and a thin layer of ointment from day one. If the shop never uses film, delete `parts/film.liquid` and its render, and the `under-film` record of `data/heal/`.
- **Film for the first days** (an adhesive bandage worn three to five days): move `{% render 'film' %}` up under the title in `pages/aftercare.liquid`, make the heal's second stage lead ("Under film", Day 1 to 4), and start the ointment once the film is off in `data/heal/` and `data/aftercare-dos/`.
- **The artist chooses**: keep both, each under its own heading, and title the heal's film stage "If you were wrapped".

When removed: delete `pages/aftercare.liquid`, `parts/heal.liquid`, `parts/every-day.liquid`, `parts/film.liquid`, `parts/doctor.liquid`, `parts/touch-ups.liquid`, `data/heal/`, `data/aftercare-dos/`, `data/aftercare-faq/`, the home page's `{% render 'heal-cta' %}` and the navigation record; point "Heal it well" in the steps (`data/home-steps/heal-it-well.md`) to the book page's questions, and add a short aftercare question there.
