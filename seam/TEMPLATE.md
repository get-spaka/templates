# Seam

Seam is the website of an independent clothing label, made from the things on its cutting table: pattern paper with its notches, manila hang tags in typewriter type, swatches cut with pinking shears, and the photographer's contact sheet with the picks circled in grease pencil. Its photographs arrive pleated and open flat. It is quiet and current: big photographs, tiny type and one narrow serif at poster size. It was written for Ourlet, a label of four people in a studio in Mile End, Montreal, that cuts most pieces when someone asks for one; it suits a knitwear label, a bag, shoe or hat maker, a jewelry studio, a vintage reworker, a made-to-measure tailor or a label of household linens. Keep the structure and rewrite the pieces, the looks, the cloth and the studio.

## How it is made

- Every page shares the header (Collections, Pieces and Studio on the left, the wordmark in spaced capitals in the middle, Journal, Stockists and an outlined "How to buy" button on the right; a Menu button below 1280 px) and the footer on ink with its pinked top edge (the letter's sign-up, the studio's address and hours, the links, and the wordmark across its full width).
- The home page's sections are parts in `parts/`: `hero-diptych`, `statement`, `on-the-table`, `contact-sheet`, `making-steps`, `journal-latest`, `stockists-line`. `contact-sheet` is also the lookbook's index on each collection's page; `piece-card` draws every piece with its hang tag; `pattern-piece` draws the four printed pattern pieces (shirt front, cutting layout, sleeve, hem); `made-label` turns a piece's `made` into the tag's words.
- The lists: `pieces` (the home page's table, the pieces page, a page per piece, the looks' tags), `collections` (the collections page, a page per collection, the piece pages' collection link), `looks` (the contact sheets, the lookbooks, the piece pages' "Worn in"), `making` (the home page's steps and the studio's rows), `fabrics` (the studio's swatches, the hang tags' cloth, the piece pages' swatch), `team`, `stockists` (the home page's line and the stockists page), `hours` (the footer and the stockists page), `buy-steps` and `pieces-faq` (the pieces page), `journal` and `navigation`. `orders`, `wholesale` and `newsletter` collect the forms.
- The lists have no links between them: a piece names its collection by the collection's id (`collection: fieldwork`) and its cloth by the cloth's id (`fabric: washed-linen`); a look names its collection, and its pieces by their ids (`pieces: [fieldwork-overshirt, wide-pleat-trouser]`). When you rename or remove a record, change the ids that point to it.

## When adapting

- The name is the header's and the footer's wordmark (keep it short, in capitals), every page's title, the hero's hang tag, the contact sheet's film edge (it reads the collection's title), `fragments/` and the menu on a phone. The address (Studio 405, 5590 Avenue de Gaspé, Mile End) is in the footer, the header's menu on a phone, the studio page's title line and the stockists page with its map link; the email (`studio@ourlet.ca`) in the footer, the size table, the piece pages' "Ask when it's back", the studio's repair band and the stockists page with `wholesale@ourlet.ca`.
- The hero names the current collection (its number, name and season) and links to its lookbook: keep it in step with the first record of `collections`. The looks are listed newest collection first, so that the home page's contact sheet shows the current one.
- Prices are facts only the maker knows: ask for them, or keep the examples and say so. The currency is written in the price (`$265`) and once more on a piece's page (`CAD`).
- The stockists are invented shops at `example.com` addresses: replace them with the maker's, or leave the stockists page out. Never name a real shop the maker did not give.
- The team's people are invented and shown by their initials on manila: replace them, and add portraits in `photo` only if the maker gives them.
- Photographs of the clothes worn are the label's own lookbook: use the maker's. Keep each collection's looks from one shoot, in portrait format, so they read as a set.

## Pages

### Home (`/`)

Two photographs of the current collection opening from their pleats with its name at poster size and a hang tag, the label's statement beside a printed pattern piece, six pieces on the table with their tags, the contact sheet of the latest looks, how a piece is made in four steps, the journal, and where to try the clothes on.

#### How does a visitor buy a piece?

- **By request, with the form** (as built): each piece's page has a request form; requests arrive in the Content tab, and the label replies with the timing and a payment link. Nothing is charged on the site. Keep `parts/order-form.liquid`, `data/orders/`, `fragments/order-thanks.liquid`, `parts/buy-steps.liquid` with `data/buy-steps/`, and the header's "How to buy" button (`/pieces#how-to-buy`).
- **On the label's own online shop**: each piece's button becomes "Buy at the shop", to its page there: fill `shop_link` in each record of `data/pieces/`, which `pages/pieces/[pieces].liquid` already reads. In `parts/header.liquid` the "How to buy" button becomes "Shop", to the shop's address. Remove `{% render 'order-form' … %}` from the piece page and `{% render 'buy-steps' %}` from `pages/pieces/index.liquid`; delete `parts/order-form.liquid`, `parts/buy-steps.liquid`, `data/orders/`, `data/buy-steps/` and `fragments/order-thanks.liquid`. The tags keep their prices.
- **At stockists and the studio only**: nothing is bought on the site. On the piece page, replace the request button and the form with a line on where to try it on and a button to `/stockists`; the header's button becomes "Stockists". Delete the same files as for the shop. Prices stay on the tags as a guide, unless the maker prefers none (then remove `piece.price` from `parts/piece-card.liquid` and the piece page's tag).

#### How are the pieces made?

- **To order** (as built): cut when asked for, ready in about three weeks. The hero's tag ("made to order"), the statement, the steps (`data/making/`, `data/buy-steps/`) and the questions (`data/pieces-faq/`) say so, and `made` is "made to order" for most pieces.
- **In small runs, ready to ship**: set `made` to "in stock", "last few" or "sold out" in each piece; the tags follow. Remove the waiting time from `data/buy-steps/` and `data/making/finish.md`, "ready in about three weeks" from the pieces page's title line and the timing question, and "made to order" from the hero's tag. If the form stays, its sizes are the ones left (`sizes`).
- **One of a kind** (reworked, vintage or deadstock): set `made` to "one of a kind" (the tag reads "1 of 1") and write the piece's measurements in `sizes` ("Chest 40 in", "Length 29 in"). In `parts/order-form.liquid` remove the size and color selects; sold pieces stay, marked "sold out", as an archive. Remove `{% render 'size-table' %}` and its jump link from `pages/pieces/index.liquid`.

### Pieces (`/pieces`)

The title, how to buy in three steps on powder blue, the pieces grouped by kind with jump links and hang tags, the size table, and the questions on ordering, fit and care; a page per piece with its worn, flat and close-up photos, its hang tag, swatch, colors and sizes, the request form on manila, its fit and care, the looks it is worn in and four more pieces. Its "How to buy" steps, its tags and each piece's request follow the two choices made with the home page.

#### How are the pieces grouped?

- **By kind** (as built): Jackets, Shirts, Trousers, Dresses, Knits and Accessories, with jump links (`kinds` in `pages/pieces/index.liquid`, and the `kind` field's choices in `data/pieces/_datasource.yaml`).
- **By collection**: in `pages/pieces/index.liquid` loop over `data.collections` instead of `kinds`, filtering the pieces with `where: "collection", item.id`, each group headed by the collection's number and name, with jump links to `#<id>`.
- **One list**: for fewer than ten pieces, remove the jump links and the groups and show one grid of `data.pieces`.

When removed (a label that only shows its lookbooks): delete `pages/pieces/`, `data/pieces/`, `data/orders/`, `data/buy-steps/`, `data/pieces-faq/`, `parts/order-form.liquid`, `parts/buy-steps.liquid`, `parts/size-table.liquid`, `parts/pieces-faq.liquid`, `parts/on-the-table.liquid`, `parts/piece-card.liquid`, `fragments/order-thanks.liquid`, the home page's `{% render 'on-the-table' %}` and the `pieces` navigation record. On a collection's page, the looks' tags lose their links (show `look.caption` only) and "The pieces of …" goes. Point "All pieces" (the hero) and the header's "How to buy" to `/stockists`, or to the shop.

### Collections (`/collections`)

The current collection large, its two covers opening from their pleats, with "Open the lookbook"; then the archive of earlier collections and the Uniform as ruled rows, each linking to its lookbook (a page per collection: the name at poster size, the note, the contact sheet, one look a screen with the pieces worn as tags, the collection's pieces, and the next collection).

#### How is a lookbook shown?

- **One look per screen** (as built): each look full height, opening from its pleats, with its number and the pieces worn, reached from the contact sheet.
- **A grid of looks** (twenty looks or more): in `pages/collections/[collections].liquid` replace the looks' section with a grid of two looks a row (one on a phone), each an image with its number and caption in `type` below, and remove the collection page's `{% render 'contact-sheet' … %}`.

#### Are past collections kept?

- **Yes, as an archive** (as built): the collections page shows the current collection, then the earlier ones and the Uniform.
- **Only the current one**: remove the archive section from `pages/collections/index.liquid` and the "Next" link from `pages/collections/[collections].liquid`; delete the earlier collections' records in `data/collections/` and their looks in `data/looks/`. Their pieces keep their pages; set their `collection` to the current one or leave it empty.

When removed: delete `pages/collections/`, `data/collections/`, `data/looks/`, the home page's `{% render 'contact-sheet' … %}`, the piece page's "Worn in" section and collection link, and the `collections` navigation record. The hero's "See the lookbook" points to `/pieces`.

### Studio (`/studio`)

The title over a wide photo of the cutting table, the label's story with a pull quote by its founder, how a piece is made in four rows on pattern paper, the five cloths as pinked swatch cards, the four people, and "We mend what we make" on powder blue.

#### Who makes the clothes?

- **The label, in its own studio** (as built): the four steps happen in the studio, and the people are the ones at the table.
- **A partner workshop**: the label designs, and a named workshop cuts and sews. Rewrite `data/making/` to say who does what; `data/team/` holds the designers, and add after the people a card of the workshop (its name, town and a sentence) on manila (`bg-base-200`).
- **One person**: write the steps in the first person; replace the people's section with the maker's portrait (or initials) beside a note in their own words; remove "four people" from the title and the statement (`parts/statement.liquid`).

#### Does the label mend what it makes?

- **Yes** (as built): the "Mended for life" band says how to send a piece back.
- **Care only**: the band becomes how to wash, dry and store the pieces (title "Care for it, and it lasts"); remove the repair button and the "Repairs" wording from `data/pieces-faq/`.

When removed: delete `pages/studio.liquid`, `data/fabrics/`, `data/team/` and the `studio` navigation record. The home page's steps keep `data/making/`; remove their "Visit the studio" button (`parts/making-steps.liquid`) and point the statement's "How we work" to `/pieces#how-to-buy`. Piece pages show the cloth's id as text: remove their swatch card.

### Stockists (`/stockists`)

"Try them on": the studio's address, hours and how to get there, the stockists grouped by region in ruled rows, and the form for shops that want to carry the label beside the wholesale email.

#### Can visitors come to the studio?

- **On set days** (as built): the studio's hours (`data/hours/`), address and how to get there.
- **By appointment only**: replace the hours' table with a fitting request (a date, a time of day, name, email and the pieces to try) posting to a new collected `fittings` datasource with `fragments/fitting-thanks.liquid`; the footer says "By appointment" instead of the hours.
- **No visits**: remove the studio section; the footer keeps the city without street or hours; the home page's line (`parts/stockists-line.liquid`) starts with the cities.

#### Is the label looking for new stockists?

- **Yes, with the form** (as built).
- **No**: remove the form, `data/wholesale/` and `fragments/wholesale-thanks.liquid`; keep one line with the email for wholesale and press.

When removed: delete `pages/stockists.liquid`, `data/stockists/`, `data/wholesale/`, `fragments/wholesale-thanks.liquid`, the home page's `{% render 'stockists-line' %}` and the `stockists` navigation record; `data/hours/` stays for the footer. Point the piece pages' "Try it on" to the footer's address (`#studio` on the home page has none: use the footer's email), or remove it.

### Journal (`/journal`)

The latest post large with its cover, the others as entries with their category and date; a page per post with its title centered, the cover opening from its pleats, the text in a reading column and three more posts.

#### What does the journal hold?

- **The label's own stories** (as built): posts with their own pages.
- **Press**: what others wrote about the label. Rename the page "Press" (`pages/press.liquid`, at `/press`) and its navigation record; give `journal` a `publication`, a `quote` and a `link` to the article; each entry links to its article in a new tab; delete `pages/journal/[journal].liquid`. The home page's section (`parts/journal-latest.liquid`) shows three of them.

When removed: delete `pages/journal/`, `data/journal/`, `parts/journal-latest.liquid`, the home page's `{% render 'journal-latest' %}` and the `journal` navigation record. The footer's letter stays.
