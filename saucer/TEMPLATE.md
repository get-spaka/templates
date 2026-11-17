# Saucer

Saucer is the website of a daytime café that reads like its front door: the hours typed on the door's glass with a card that turns to "Come in, we're open" or "Sorry, we're closed", a header that says what the kitchen is serving now, a typed menu that opens on that service, and the dishes as round plates seen from above, set down on the table as you scroll. It was written for Oriel, a breakfast and lunch café in an old corner pharmacy in the Marquette neighborhood of Madison, Wisconsin, where guests walk in and order at the counter; it suits a brunch spot, a café with a kitchen, a diner, a bagel or bakery café that serves lunch, a deli, a juice and breakfast bar, a coffee shop with a lunch counter, a tea room, or a museum's or garden's café. Keep the structure; rewrite the dishes, the hours and their services, the suppliers, the people and the town.

## How it is made

- Every page shares the header (`parts/header.liquid`: an oat strip with the now line and the address, the name with its steaming cup, Menu, Visit, Catering and Our story, and a "Find us" button; a Menu button below 1024 px) and the footer (`parts/footer.liquid`, on coffee: the name, the now line, the week's hours as rows, the address, the phone and the links).
- The hours drive the site. The footer renders each record of `hours` as a row the script `scripts/served-now.js` reads, in the time zone of `data-tz` on the footer; from them it knows whether breakfast, lunch or only coffee is served now, and the now line (`parts/now-line.liquid`), the door card (`parts/door-card.liquid`) and the menu's tabs follow. `parts/time.liquid` shows a 24-hour time of the records as visitors read it (7 am, 2:30 pm).
- The lists: `menu` (the home page's plates and coffee bar, the menu page's specials and tabs), `hours` (the footer, the door on the home and visit pages), `suppliers` (the home and story pages), `team` (the story), `catering`, `catering-steps` and `catering-faq` (the catering page), `visit-notes` and `visit-faq` (the visit page), `story-room` (the story), `navigation`. `catering-requests` collects the catering form and is answered by `fragments/catering-thanks.liquid`.

## When adapting

- The name (Oriel) is in `parts/logo.liquid` (the header and the footer), `parts/door.liquid` (the name on the glass), every page's title, `parts/footer.liquid`'s last line and the story. The address (2 Larkspur Row, Marquette, Madison) is in the header's strip and its phone menu, `parts/come-by.liquid`, `parts/finding-us.liquid` and the footer, each with a "Get directions" link to a map search for it: change the address in those links too. The phone ((608) 555-0147) is in the same places and `parts/catering-form.liquid`.
- Set `data-tz` on the footer (`parts/footer.liquid`, and the footer block) to the maker's town's time zone ("Europe/Paris", "America/New_York"), so that the card and the now line follow the café's clock, not the visitor's.
- The hours are facts: ask for them, or keep the example and say so. Write them in `data/hours/` only, in 24-hour form; the door, the footer and the now line follow. The plain lines shown with no script ("Open 7 to 3, Wednesday to Monday" in `parts/now-line.liquid`, "Open Wednesday to Monday" and "Closed on Tuesdays" in `parts/door-card.liquid`) and the hours written in words (the coffee panel's counter hours in `parts/coffee-bar.liquid`, the visit page's paragraph in `parts/visit-door.liquid`, the menu page's title line) must say the same.
- For a site in French, German or most of Europe, make `parts/time.liquid` write the time as it is (7:00, 14:30) instead of "7 am".
- Prices are facts: keep the examples only if the maker says so. The add-on lines under each tab of the menu (`parts/served-now-menu.liquid`) carry prices too.
- The suppliers, the people (shown as initials until the maker sends photos) and the pharmacy's story are invented: replace them with the maker's, or leave them out rather than invent others. Never name a real farm or roaster the maker did not give.
- Dishes are photographed from above and cropped round: when the maker sends photos, keep the featured dishes' photos bright and taken from above.

## Pages

### Home (`/`)

What the café is in one headline beside a large plate with the door card above it, the dishes on the pass today as plates on an oat table, the door with the week's hours and how to come in, the coffee bar, who the kitchen buys from, and a catering band.

#### How do guests eat with you?

- **They walk in and order at the counter** (as built): no booking and no ordering online. "Find us" is the header's button, and the line beside the door says "Walk in: no reservations". Nothing to change.
- **They can also order ahead for pickup online**: the café's own ordering page (Toast, Square…) is a link that leaves the site, never a widget. Add an "Order ahead" button beside "Find us" in `parts/header.liquid` (and its phone menu), make the hero's second button "Order ahead" (`parts/hero.liquid`), add an "Order ahead" link under each tab of the menu in `parts/served-now-menu.liquid`, and answer "Can I order ahead?" in `data/visit-faq/order-ahead.md` with the link.
- **They book a table at weekends**: the Visit page gets a booking request form, adapted from the gallery's `forms-booking-table` (posting to a collected `reservations` datasource with its thank-you fragment), placed after the door; "Book a table" (to `/visit#book`) replaces "Find us" in the header; in `parts/come-by.liquid` the line becomes "Walk in on weekdays; book for weekends", and `data/visit-faq/reservations.md` says how. Requests are confirmed by the café.

#### How is the day divided?

- **Breakfast, then lunch** (as built): the menu's Breakfast and Lunch tabs, the now line switching at `lunch_from`, breakfast and lunch typed for each day on the door's glass.
- **One menu all day** (brunch all day, or a diner): in `data/menu/_datasource.yaml` make the `course` choices the menu's courses (plates, sandwiches, sweet, sides, drinks) and set each dish's; in `parts/served-now-menu.liquid` make the tabs those courses, and remove `data-served-now` and the `.now-mark` spans. Empty `lunch_from` in every record of `hours`; in `parts/door.liquid` the services line becomes "kitchen till {{ kitchen_closes }}"; in `parts/now-line.liquid` and `parts/door-card.liquid` the breakfast and lunch lines both say "Kitchen open till" the slot `until`.
- **Coffee and the bakery case only** (a coffee shop with a counter of pastries and a few toasts): remove the Breakfast and Lunch tabs and their dishes; the tabs are Coffee, Tea & other drinks and The bakery case (a `tea` course added). In `hours` set `kitchen_closes` equal to `opens` (the counter only); the door's services line and the now line's breakfast and lunch lines go, the coffee line remains ("Coffee and the bakery case till"). The plates show pastries, `parts/on-the-pass.liquid` says "In the case today", and the hero's sentence speaks of coffee and baking.

### Menu (`/menu`)

The title with when each service is served, this week's specials as plates, the menu in tabs (breakfast, lunch, coffee and drinks, the bakery case) opening on what is served now, the allergy line, and a band to catering.

#### Do the dishes have photos?

- **The dishes that have one** (as built): plates on the home page and in the menu's rows; a dish without a photo is a typed row only.
- **A typed menu only**: in `parts/served-now-menu.liquid` pass `plate: false` to every `{% render 'menu-row' … %}`; the specials stay as plates if they have photos, otherwise `parts/this-week.liquid` shows them as typed rows (`menu-row`) on the oat slip. The home page's plates need a photo for each featured dish, or `parts/on-the-pass.liquid` gives way to a typed list of the featured dishes on the oat slip.

When removed: delete `pages/menu.liquid`, `parts/this-week.liquid`, `parts/served-now-menu.liquid`, `parts/crowd-band.liquid` and the `menu` navigation record; remove "The whole menu" from `parts/on-the-pass.liquid` and point the hero's "See the menu" to `/#on-the-pass`. The plates and the coffee bar stay over `menu`.

### Visit (`/visit`)

The door's glass at full height with the week and the closed days, how to find the café (address, bus, bikes, parking, access), how it works as four typed slips, gift cards, and questions. Its booking form follows how guests eat, chosen with the home page.

When removed: delete `pages/visit.liquid`, `parts/visit-door.liquid`, `parts/finding-us.liquid`, `parts/visit-notes.liquid`, `parts/gift-cards.liquid`, `data/visit-notes/`, `data/visit-faq/` and the `visit` navigation record; point every "Find us" and "Plan your visit" (the header, the hero, `parts/come-by.liquid`) to the home page's door, `/#hours`, which keeps the address and directions; the footer keeps the hours.

### Catering (`/catering`)

The boxes with what is in them, how many each serves and its price, how ordering works in four steps, the request form, and questions.

#### How are catering orders placed?

- **A request form, confirmed by email** (as built): requests arrive in the Content tab; the café confirms by email and is paid at pickup or on delivery. Keep `parts/catering-form.liquid`, `data/catering-requests/` and `fragments/catering-thanks.liquid`; if the boxes change, change the form's checkboxes and the `items` choices together.
- **On the café's own ordering page** (Toast, ezCater…): the boxes stay with their prices; add an "Order" button to each box in `parts/catering-boxes.liquid` and the band's button, to that page. Remove `{% render 'catering-form' %}` and delete `parts/catering-form.liquid`, `data/catering-requests/` and `fragments/catering-thanks.liquid`; `data/catering-steps/` says how it works there.
- **By phone or email**: in place of the form, the phone set large in Caprasimo and an email link, with the notice ("48 hours ahead"); delete `data/catering-requests/` and `fragments/catering-thanks.liquid`.

#### Do you deliver?

- **Pickup, and delivery nearby** (as built).
- **Pickup only**: in `parts/catering-form.liquid` remove the pickup-or-delivery and address fields (and `how` and `address` from `data/catering-requests/_datasource.yaml`); delete `data/catering-steps/pick-up-or-delivery.md` or make it about pickup; remove "we deliver nearby" from `parts/catering-band.liquid` and delivery from the steps and the questions.

When removed: delete `pages/catering.liquid`, `parts/catering-boxes.liquid`, `parts/catering-steps.liquid`, `parts/catering-form.liquid`, `parts/crowd-band.liquid`, `data/catering/`, `data/catering-steps/`, `data/catering-faq/`, `data/catering-requests/`, `fragments/catering-thanks.liquid` and the `catering` navigation record; on the home page, replace `{% render 'catering-band' %}` with `{% render 'gift-cards' %}` (from the Visit page), and remove the menu page's `{% render 'crowd-band' %}`.

### Our story (`/story`)

The room in a wide photo and the story in three short parts, the people as round portraits or initials, who the kitchen cooks with, and six photos of the room.

#### Who appears on the page?

- **The people by name** (as built): four round portraits, or their initials until the maker sends photos (`photo` in `data/team/`).
- **The founders only**: one or two people shown large with a few words each, adapted from the gallery's `about-founder-note` in place of `{% render 'people' %}`; `data/team/` keeps only them.
- **Nobody by name**: remove `{% render 'people' %}` and delete `parts/people.liquid` and `data/team/`; the story's second part speaks of "we".

When removed: delete `pages/story.liquid`, `parts/story.liquid`, `parts/people.liquid`, `parts/the-room.liquid`, `data/story-room/` and the `our-story` navigation record; remove "Our story" from `parts/market.liquid`, and `data/team/` unless another page shows it.
