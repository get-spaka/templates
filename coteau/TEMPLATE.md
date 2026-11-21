# Coteau

A winery's site in daylight that answers the question every bottle raises: open it tonight, or keep it? A limestone-pale page set in flared capitals like an engraved label, one grape-must purple and the pale green of unripe grapes. Every wine has its hill: a small striped vineyard slope that rises from the year it was picked to the year it is ready, runs flat while it is at its best and falls to the year it should be drunk by, with a marker at this year and one line that says "Keep it", "Open it" or "Drink it up". The wine list sorts itself into "Open tonight" and "For the cellar", each wine's page lays its older vintages behind it as a range of hills, and the rest is what a cellar door needs: four ways to taste, a request for a seat, the hours by season, a club in two sizes and the barn on the hill. It was written for Vossberg Hill, a family vineyard and cellar door on a glacial hill above Lake Leelanau, on the Leelanau Peninsula in northern Michigan; it suits a family winery, a vineyard with a tasting room, a natural-wine estate, a cidery or perry maker, a mead maker, a sake brewery, a farm distillery that releases vintages, or an urban winery that buys grapes from named vineyards. Rewrite the wines and their drinking windows, the blocks, the tastings, the club, the hours and the people; keep the hills, the typed labels, the back label and the calm daylight.

## How it is made

- The header (a thin stone strip with the season's tasting days, the links, the estate's name with its small hill, "Book a tasting") and the footer (on the cellar: the address with "Get directions", the phone and email, the hours by season, the closed days, the links, the release letter's sign-up and the line on legal age) are on every page. Every "Book a tasting" button leads to `/visit#book`.
- The lists: `products` (the wines: the home page's hero and "Open it or keep it", the wines page, a page each with its range of vintages, the club's next release, the estate's blocks; the hold form's select), `services` (the tastings: the home page's rows, the visit page's tastings and the booking form's cards), `visit-flight` (the bar's five pours), `hours` (by `season`: the footer, the home page's tastings and the visit page), `events` (the home page's "What's on" and the events page; the booking form's event select), `club-levels`, `club-steps` and `club-faq` (the club page; the levels also in the join form), `vineyard-blocks` (the estate page and each wine's "From the block"), `team`, `milestones` and `estate-gallery` (the estate page), `home-stats` (the home page's figures), `visit-notes` and `visit-faq` (the visit page), and `navigation` (the header and the footer). `bookings`, `holds`, `club-requests` and `newsletter` collect the four forms.
- Records point to each other by name: a wine's `block` is a `vineyard-blocks` record's `name`; the vintages of one wine share its `wine` field, which gathers them into a range; the hold form's choices (`data/holds/_datasource.yaml`) are the names of the wines for sale, and the booking form's (`data/bookings/_datasource.yaml`) the tastings' and the events' names. Rename both together, and keep those `choices` in step when a wine, a tasting or an event is added, renamed or removed.
- A wine's hill reads three years of its record: `ready_from`, `best_until` and `drink_by`, beside its `vintage`.

## When adapting

- The estate's name is in the header and its menu (`parts/logo.liquid`), the footer, the typed labels (`parts/typed-label.liquid`, "Vossberg Hill"), every `<title>` and description, and the footer's last line; the address in the footer, the header's menu, the home page's tastings (`parts/tastings.liquid`) and the visit page (`parts/getting-here.liquid`, `pages/visit.liquid`'s label); the phone in the footer, the hold form, the booking form and the getting-here cards. The people's names are in `team`, the club's texts ("Priya calls", "picked by Teo"), the club fragment, the home page's story and the estate page's story.
- **The drinking windows are the maker's to give.** Ask for each wine's ready, best-until and drink-by years. While a wine has none, leave the three fields out of its record rather than invent them: its card then says "Ask us when to open it". Never guess a window from the grape.
- **The legal age and the shipping rules are the maker's.** The footer's line ("You must be 21 or older…"), the forms' required checkboxes and the club's shipping answer use the age and the rules of the maker's country or state: ask, and never list states a winery ships to unless the maker gives them. Never call the site "compliant": tell the maker that the rules where they sell are theirs to check.
- **Scores and press quotes** are left out: add them only as text the maker gives, with their source.
- **The bottle photos.** Every wine is shown as its typed label until the maker sends a photo of its bottle, which goes in its `image`; ask for them, since they matter most here. Never use a photo of another producer's bottle.
- The portraits are initials on verjus: ask for photos of the maker's own people.
- The events' dates are invented: ask for the real ones, or leave the list empty (it then says so).

## Pages

### Home (`/`)

The hero with its headline, the wine to open tonight with its hill and a tall photo of the rows; this year's wines with the "Open tonight" and "For the cellar" chips; four ways to taste beside the hours by season; the hill in figures; the story, short; the club band on must; what's on.

#### How do people buy your wine?

- **At the cellar door, with bottles held on request** (as built): every wine's page has the hold form (`parts/hold-form.liquid`); requests arrive in the Content tab, paid when collected.
- **In your own online shop too** (Commerce7, WineDirect, Vinoshipper, Shopify…): ask for the shop's address of each wine, never invent it, and put it in each record's `order_link`: the wine's page then shows "Buy" in place of "Hold bottles for me" and leaves the hold form out. Delete `parts/hold-form.liquid`, `data/holds/` and `fragments/holds-thanks.liquid`, add a "Shop" record to `data/navigation/` with the shop's address, and change "How to buy" in `pages/wines/index.liquid`.
- **Only at the cellar door, and from shops and restaurants**: delete `parts/hold-form.liquid`, `data/holds/` and `fragments/holds-thanks.liquid`, and the "Hold bottles for me" button in `pages/wines/[products].liquid`; add a "Where to find our wine" section to `pages/visit.liquid` over a new `stockists` section list (name, town, a link), and change "How to buy" in `pages/wines/index.liquid`.

#### How are tastings booked?

- **A request, confirmed by email** (as built): the form on `/visit` (`parts/book-form.liquid`), filled in from every "Book" link by `scripts/prefill.js` (`/visit?tasting=<tasting id>#book`, `/visit?event=<event id>#book`).
- **On your own booking page** (Tock, Resy, CellarPass…): ask for its address; point every "Book" and "Book a tasting" link to it (each `services` record's `href`, `parts/header.liquid`, `parts/hero.liquid`, `parts/tastings-list.liquid`, `pages/wines/[products].liquid`, `pages/visit.liquid`) and say "Book online"; delete `parts/book-form.liquid` and its render, `data/bookings/`, `fragments/bookings-thanks.liquid` and `scripts/prefill.js` unless the club's join form keeps it; events keep their own `booking` link.
- **Walk-ins only**: every tasting's `walk_in` becomes `walk-in` ("Just walk in"), the booking form goes as above, every "Book a tasting" becomes "Plan your visit" (`/visit`), and `parts/hours.liquid` moves up to follow the page's title.

#### Does the site ask visitors their age?

- **No question at the door** (as built): the footer's line on every page and the required 21-or-older checkbox on every request.
- **A question at the door**: write `scripts/age-gate.js`, which on the first visit, in visitor mode only, opens a small `<dialog>` ("Are you 21 or older?"; Yes closes it and remembers it in `localStorage` for thirty days, No leads to a short page, `pages/adults-only.liquid`, saying the site is for adults), the page complete beneath it; write the dialog's markup in `parts/footer.liquid` so its words stay editable. The footer's line stays. Tell the maker it is a courtesy, not a check.

### Wines (`/wines`)

Every wine for sale with its hill, filtered by the stage chips and the style chips and grouped by style; the library of sold-out vintages with their hills; how to buy; a band to book a tasting. Each wine's page has its photo or typed label, its large hill, the tasting note, the back label with the taste scale, the block it comes from, the range of its vintages, and the hold form.

#### Do you give drinking windows?

- **Yes, a hill for every wine** (as built): the four years on each record, the chips, the ranges.
- **No, the wines are made to drink young**: delete `parts/hill.liquid`, `parts/range.liquid` and `scripts/hill.js`; remove their renders (`parts/wine-card.liquid`, `parts/hero.liquid`, `pages/wines/[products].liquid`) and the stage chips (`parts/open-or-keep.liquid`, `parts/wine-list.liquid`); the hero's "Open tonight" shows the first featured wine; take `ready_from`, `best_until` and `drink_by` out of `data/products/_datasource.yaml` and the records. Tell the maker the site then loses its signature.

#### How much do you tell about each wine?

- **The whole back label** (as built): grapes, block, harvest, alcohol, sugar, acidity, pH, bottles made, closure and serving temperature (`parts/back-label.liquid`).
- **The essentials only**: grapes, alcohol, the taste scale and the serving temperature; take `harvest`, `sugar`, `acidity`, `ph`, `bottles` and `closure` out of the definition, the records and `parts/back-label.liquid`.

#### Do you keep past vintages on the site?

- **Yes, the library** (as built): sold-out vintages (`available: false`) stay, in the library (`parts/library.liquid`) and in each range, marked "Sold out".
- **Only what's for sale**: remove `{% render 'library' %}` from `pages/wines/index.liquid` and delete `parts/library.liquid`; in `pages/wines/[products].liquid` assign `vintages` with `| where: "available", true` too; delete the records with `available: false`.

When removed: delete `pages/wines/`, `parts/wine-list.liquid`, `parts/library.liquid`, `parts/back-label.liquid`, `parts/range.liquid`, `parts/hold-form.liquid`, `data/holds/`, `fragments/holds-thanks.liquid` and the "Wines" navigation record; in `parts/wine-card.liquid` and `parts/hero.liquid` the wine's name and picture stop being links; "All the wines" and "See the wines" go from the home page; the hills stay on the home page.

### Visit (`/visit`)

The bar's five pours this week, the four tastings with their photos, the booking form, the hours by season, getting here, what to know before you come, and questions.

#### Can visitors walk in?

- **Yes, at the bar; the other tastings are booked** (as built).
- **By appointment only**: the bar tasting's `walk_in` becomes `booked` with its `href` (`/visit?tasting=at-the-bar#book`); "Walk in, any day we're open" in `parts/bar-flight.liquid` becomes "Booked like the others"; the strip in `parts/header.liquid` says "Tastings by appointment"; the visit FAQ's first answer follows.

Its booking form follows how tastings are booked, chosen with the home page.

When removed: delete `pages/visit.liquid`, `parts/bar-flight.liquid`, `parts/tastings-list.liquid`, `parts/book-form.liquid`, `parts/hours.liquid`, `parts/getting-here.liquid`, `parts/visit-notes.liquid`, `data/visit-flight/`, `data/visit-notes/`, `data/visit-faq/`, `data/bookings/`, `fragments/bookings-thanks.liquid` and the "Visit" navigation record; point every "Book a tasting", "Book" and "Reserve a seat" to the phone (`tel:+12315550148` with the maker's number) or the booking page, and "Plan your visit" in `parts/tastings.liquid` to the footer's address; keep `scripts/prefill.js` for the club's form.

### The club (`/club`)

The two sizes, how it works, the wines in the next release with their hills, the request to join, and questions.

#### How do members join?

- **A request, set up by phone** (as built): the form (`parts/join-form.liquid`) and `club-requests`; the size is chosen from each size's button (`/club?level=<id>#join`).
- **On your own club page** (Commerce7, WineDirect…): ask for its address and put it in each `club-levels` record's `href`; delete `parts/join-form.liquid` and its render, `data/club-requests/` and `fragments/club-thanks.liquid`; the steps start with "Join online".
- **A wait list**: the sizes stay as what members get; the form becomes "Join the wait list" (name, email, the size wanted: trim `data/club-requests/_datasource.yaml` and the form to those), and the page's text says how often places open.

#### How do members get their wine?

- **Pick up at the release party, or shipped** (as built).
- **Pick up only**: the "Ship it to me" choice and the state field go from the form and from `data/club-requests/_datasource.yaml`; the shipping question goes from `club-faq`; the fourth step says "Collect your release at the barn within a month".

When removed: delete `pages/club.liquid`, `parts/club-levels.liquid`, `parts/club-steps.liquid`, `parts/next-release.liquid`, `parts/join-form.liquid`, `parts/faq-columns.liquid`, `data/club-levels/`, `data/club-steps/`, `data/club-faq/`, `data/club-requests/`, `fragments/club-thanks.liquid` and "The club" navigation record; the home page's club band (`parts/club-band.liquid`) becomes the release letter's sign-up, its button leading to `#letter`; `club_price` and `next_release` leave the wines' definition and records, and "Hill Club" leaves `pages/wines/[products].liquid` and "How to buy".

### Events (`/events`)

The year's events by date, each with its time, place, price and "Reserve a seat" or "Just come"; past ones drop off by their date. A band to join the release letter.

#### How are seats reserved?

- **Through the tasting request** (as built): "Reserve a seat" leads to the booking form with the event chosen (each event's `booking` is `/visit?event=<id>#book`); an event with no `booking` says "Just come".
- **Tickets on an outside page** (Eventbrite, Tock…): ask for each event's page and put it in its `booking`; take "An event" and the event select out of `parts/book-form.liquid` and the `event` field and choice out of `data/bookings/_datasource.yaml`.
- **No reservations**: empty every event's `booking` ("Just come"), take the event choice out of the form as above, and empty `price` where events are free.

When removed: delete `pages/events.liquid`, `parts/events-list.liquid`, `parts/whats-on.liquid`, `data/events/` and the "Events" navigation record; remove `{% render 'whats-on' %}` from the home page, and "An event" with its select from `parts/book-form.liquid` and `data/bookings/_datasource.yaml`.

### The estate (`/estate`)

A wide photo of the hill from across the lake, the story in three short parts, the five blocks with their wines, the people, the years, and the barn and the hill in photos.

#### Who appears on the page?

- **The people by name** (as built): four portraits from `team`, initials on verjus until the maker sends photos.
- **The family only, as one note**: replace `{% render 'people' %}` with one portrait beside a few words in their own voice, adapted from the gallery's `about/about-founder-note`; keep only that person in `team`.
- **Nobody by name**: remove `{% render 'people' %}` and delete `parts/people.liquid` and `data/team/`; take the names out of the stories, the club's texts and `fragments/club-thanks.liquid`.

When removed: delete `pages/estate.liquid`, `parts/estate-story.liquid`, `parts/vineyard-blocks.liquid`, `parts/people.liquid`, `parts/years.liquid`, `parts/estate-gallery.liquid`, `data/milestones/`, `data/estate-gallery/`, `data/team/` and "The estate" navigation record; the home page's story loses its "The estate" button; the wine pages keep "From the block" (`vineyard-blocks` stays) with the block's name as plain text instead of a link to `/estate#<block>`.
