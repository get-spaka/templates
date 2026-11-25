# Aspect

A website for an independent real estate agency that shows you in: a warm serif over a plain Scandinavian grotesk, fog-colored paper, one madrona red and a touch of brass. Every home arrives behind its own painted front door, with its house number on a brass plate, which swings open onto the house as it comes into view; each listing is written up room by room by the broker who walked through it, each card says where the home stands as an agent's window card does, and the year's sales stand in a ruled ledger. It was written for Halvorsen Pike Real Estate, five brokers in a brick storefront in Fairhaven, Bellingham, Washington; it suits an independent agency or brokerage, a single broker or a team of two, a rentals and property management office, an agency selling holiday or country homes, or an estate agent in Europe or Australia. Rewrite the listings, the neighborhoods, the brokers, the figures and the legal lines; keep the doors, the window cards, the ledger and the calm, first-hand voice.

## How it is made

- The header (the name, the links, the phone, a "Free valuation" button) and the footer (the office's address with "Get directions", the hours, the links and the legal lines) are on every page. The valuation band (`parts/valuation-band.liquid`, on Salish deep) closes most pages; every "Free valuation" button leads to `/sell#valuation`.
- The lists: `listings` (the home page's hero, "On the market" and "Open this weekend", the homes page, a page each, the neighborhoods' and the brokers' homes), `neighborhoods` (the home page's tiles, the neighborhoods page, a listing's neighborhood link, the valuation form's neighborhood and the wish list's checkboxes), `team` (the home page's brokers, the brokers page and a page each, the listing broker's card, the valuation form's "A broker you'd like", the notes' authors), `sales` and `sales-figures` (the sold ledger on the home and sell pages: one edit changes both), `selling-steps`, `sell-faq` and `testimonials` (the sell page; testimonials also on the home page), `promises` (the brokers page), `blog` (the notes, a page each, the home page's market notes), `hours` (the footer) and `navigation` (the header and the footer). `valuations`, `viewings` and `home-searches` collect the three forms.
- Records point to each other by name: a listing's `neighborhood` is a `neighborhoods` record's name, its `agent` a `team` record's name, a note's `author` a broker's name. Rename both together.

## When adapting

- The agency's name is in the header, the footer, every `<title>` and description, and the brokers page's office section; the address and the phone in the footer, the header's phone link and menu, the valuation band, the sell page's aside (`parts/valuation-form.liquid`), the brokers page's office section and the viewing thanks (`fragments/viewings-thanks.liquid`).
- **Fair housing.** Neighborhoods, listings and notes describe homes, streets and distances, never the people who live there or whom a place "suits" (families, young professionals, retirees, a church or school community): in the United States that is steering, and the same caution holds elsewhere. Rewrite the maker's words that way and tell them why.
- **The doors follow the listings.** Each listing gets its house number (`number`, on its door's brass plate and in the ledger) and one of the three paints (`door`: primary, secondary or neutral), varied along a row so that no two neighbors match. A listing with no number (a lot, a building) shows its plate empty.
- **The legal lines are the maker's.** The license line, the MLS membership, Equal Housing Opportunity and the disclaimer in `parts/footer.liquid`, and each broker's `license`, follow the maker's country and board: ask for the real ones; never invent a license number.
- **The clients' words and the ledger are invented** and never stay: ask the maker for real ones (`testimonials`, `sales`, `sales-figures`), or remove them as the sell page's choices say.
- The portraits are initials on plaster: ask for photos of the maker's own people first, and put them in each `team` record's `photo`.
- The wish list's neighborhoods come from `neighborhoods`, but its collected definition (`data/home-searches/_datasource.yaml`) lists them as `choices`: keep the two in step.

## Pages

### Home (`/`)

The hero with its headline and the first featured home behind its opening door, the homes on the market as window cards, this weekend's open houses, the neighborhoods as tiles, the sold ledger, the valuation band, the brokers, clients' words and the latest market notes.

#### How do owners ask what their home is worth?

- **With the valuation form** (as built): requests arrive in Spaka's Content tab and a broker calls back. Every "Free valuation" and "Ask for a valuation" button leads to `/sell#valuation`, the broker or the neighborhood filled in from the link (`?with=<broker id>`, `?hood=<neighborhood id>`).
- **By phone**: every valuation button becomes a call button (`tel:` with the number): in `parts/header.liquid`, `parts/hero.liquid`, `parts/valuation-band.liquid`, `parts/footer.liquid`, `pages/neighborhoods.liquid` and `pages/brokers/[team].liquid`; the sell page shows the number large with the hours to call in place of the form (its own turn); delete `data/valuations/`, `fragments/valuations-thanks.liquid` and `scripts/prefill.js`.
- **On a booking page elsewhere** (a calendar the agency already uses): point every `href="/sell#valuation"` and `/sell?…#valuation` in the same files to that page's address and say "Book a valuation visit"; the sell page keeps its steps, ledger and questions, and its form goes in its turn.

#### Do homes open at their front door?

- **Yes, the open door** (as built): each listing's `number` and `door` paint; the doors on the cards, the hero and each listing's lead photo.
- **No, the photos plainly**: for an agency selling land, commercial premises or apartments off plan, where a front door means little. Delete `scripts/door.js` and `parts/door.liquid`, remove every `{% render 'door' … %}` (`parts/hero.liquid`, `parts/listing-card.liquid`, `pages/homes/[listings].liquid`) and the `door` field from `data/listings/_datasource.yaml` and the records; keep `number` for the ledger. The reveals carry the motion.

#### One broker, or a team?

- **A team** (as built): the brokers page with a page each, the home page's brokers, the listing broker's card and the valuation form's "A broker you'd like".
- **One broker**: the texts speak in the first person; on the home page replace `{% render 'brokers-grid' %}` with one portrait beside a note in their words; the brokers page type becomes one About page (`pages/about.liquid`, `/about`) with the portrait, the license, the neighborhoods, the office and the promises, without record pages (its own turn); remove "A broker you'd like" from `parts/valuation-form.liquid`, and the `agent` lines from the listing cards' pages.

#### What does the agency do?

- **Sales** (as built).
- **Sales and rentals**: add `for-rent` to the `status` choices, with "For rent" on its band (`parts/window-band.liquid`) and a monthly rent in `price` ("$2,400 a month"); add a "For rent" chip on the homes page and a "Rentals" navigation record (`/homes`); the ledger keeps to sales.
- **Rentals and property management**: listings are lettings with their rent and the date they're free; the sell page becomes "Landlords" (`/landlords`) in its turn, its form a rental appraisal, its ledger the homes let with their days to let; the hero's headline and buttons, the valuation band and the `promises` follow.

### Homes (`/homes`)

Every listing as a window card behind its door, with chips to show only those for sale, open this weekend, under contract or sold, the wish list a broker answers by hand, and a page for each home: its window band, the price, the facts on plaster, the lead photo behind its door, a strip of photos, the walk-through in chapters, the floor plan, the details, the listing broker beside "Ask to see it", and more homes.

#### How are prices shown?

- **The asking price** (as built): "Listed at $789,000", and sold prices beside them.
- **A guide price or "offers over"** (as in the UK or Australia): add a `price_label` text field to `data/listings/_datasource.yaml` and show it in place of "Listed at" in `pages/homes/[listings].liquid` and before the price in `parts/listing-card.liquid`; sold prices follow the next choices.
- **On request**: no price on cards or pages: "Price on request" in `parts/listing-card.liquid`, `parts/hero.liquid` and `pages/homes/[listings].liquid`; the ledger drops its Asking and Sold columns (`parts/sold-ledger.liquid`).

#### How do buyers see a home?

- **They ask with the form** (as built): "Ask to see it" (`parts/viewing-form.liquid`) on each home's page; requests arrive in the Content tab.
- **They call the listing broker**: in `pages/homes/[listings].liquid` replace the form with the broker's card and a large call button; delete `parts/viewing-form.liquid`, `data/viewings/` and `fragments/viewings-thanks.liquid`.
- **At open houses, then by request**: render `parts/open-houses.liquid` at the top of `pages/homes/index.liquid` too, move the open house line to the top of each home's page, and keep the form for other times.

#### Do sold homes stay on the site?

- **Yes, marked sold** (as built): with their sold price and days, a Sold chip, and their row in the ledger links to their page (`listing` in `sales`).
- **No, they go once sold**: the maker deletes a sold record when the sale closes; remove the Sold chip from `pages/homes/index.liquid` and the `listing` field and links from `data/sales/` and `parts/sold-ledger.liquid`.

When removed: the homes are the template's core; without them the site is a broker's own page. Delete `pages/homes/`, `parts/listing-card.liquid`, `parts/window-band.liquid`, `parts/door.liquid`, `parts/viewing-form.liquid`, `parts/wish-list.liquid`, `parts/on-market.liquid`, `parts/open-houses.liquid`, `data/listings/`, `data/viewings/`, `data/home-searches/`, their fragments, `scripts/door.js` and the Homes navigation record; on the home page remove the on-market and open-house renders, and make the hero's photo a plain image (`/media/wren-street.jpg`, or the maker's) without its caption; remove the homes from `pages/neighborhoods.liquid` and `pages/brokers/[team].liquid`; point "See the homes" to `/neighborhoods`.

### Sell (`/sell`)

The valuation request in three numbered steps beside what happens next, how the agency sells in five steps, the sold ledger in full, sellers' words and the questions sellers ask first.

Its form follows how owners ask what their home is worth, chosen with the home page.

#### Do you publish your results?

- **The ledger and the figures** (as built): `sales` and `sales-figures`, on this page and the home page.
- **The figures only**: in `parts/sold-ledger.liquid` remove the table; delete `data/sales/`; `sales-figures` stays.
- **Neither**: delete `parts/sold-ledger.liquid` and its renders, `data/sales/` and `data/sales-figures/`; on the home page `parts/client-words.liquid` takes its place.

#### Do you say what you charge?

- **Not on the page** (as built): "What is your commission?" in `sell-faq` says it is agreed in writing at the valuation.
- **A stated rate**: add a short fees section between "How we sell" and the ledger in `pages/sell.liquid`, and answer the question with it.
- **A fixed fee**: the fees section gives the fee and what it includes; the valuation band (`parts/valuation-band.liquid`) says so in a line.

When removed: delete `pages/sell.liquid`, `parts/valuation-form.liquid`, `data/valuations/`, `data/selling-steps/`, `data/sell-faq/`, `fragments/valuations-thanks.liquid`, `scripts/prefill.js` and the Sell navigation record; every valuation button calls the office (`tel:`) as the home page's "By phone" option lists; the ledger stays on the home page without its "How we sell" link.

### Neighborhoods (`/neighborhoods`)

An index of the neighborhoods as chips that glide to each, then each one: a wide photo, its houses and streets in a paragraph, three facts, the homes for sale there, and the broker who knows it best with "What's my home worth here?".

When removed: delete `pages/neighborhoods.liquid` and its navigation record; the home page's tiles (`parts/hood-tiles.liquid`) lose their links and "All the neighborhoods", and a listing's neighborhood becomes plain text. `neighborhoods` stays for the tiles and the forms.

### Brokers (`/brokers`)

The brokers in rows with their portrait, role, the neighborhoods they know, languages and phone, the office with its story and hours, four promises under brass marks, and a page for each broker with their words, their homes and their notes.

#### How do visitors reach a broker?

- **Directly** (as built): each broker's phone and email on their row, their page and a listing's broker card.
- **Through the office**: remove the phone and email from `pages/brokers/index.liquid`, `pages/brokers/[team].liquid` (keep "Ask … for a valuation") and the broker card in `pages/homes/[listings].liquid`; every contact goes to the office's number and the forms.

When removed: delete `pages/brokers/` and its navigation record; the home page's brokers (`parts/brokers-grid.liquid`) lose their links, or go if the maker shows no one; a listing's broker card and the notes keep the name as text.

### Notes (`/notes`)

Short notes from the office: the latest with its cover, the others beside it, and a page for each with its author's card and two more notes.

When removed: delete `pages/notes/`, `data/blog/`, `parts/market-notes.liquid` and its render on the home page, and the Notes navigation record; the brokers' pages lose their notes.
