# Kindly

Kindly is a couple's wedding website made as their invitation suite unpacked from its envelope: the first screen is an envelope that opens at load on the invitation card with the names, the date and the place; the weekend comes as a fan of cards in different paper stocks; the story as postcards with postmarks; the way here as postage stamps; and the reply card, once sent, is sealed in its envelope with the couple's monogram. It was written for Iris Novak and Callum Shaw, who marry on Saturday, June 12, 2027, at Larkspur Cottage on Mackinac Island, Michigan, over a weekend with a Friday fish fry and Sunday pancakes. It suits any wedding, from a town hall ceremony and a party to a destination weekend, and also an elopement with a party later, a vow renewal, a commitment ceremony, a milestone anniversary, a big family reunion or a bar or bat mitzvah weekend. Keep the structure; rewrite the couple, the place, the weekend, the rooms and the reply.

## How it is made

- Every page shares the header (`parts/header.liquid`: the couple's names with the script ampersand, Our story, The weekend and Travel & stay, and the green "Kindly reply" pill; a Menu button below 1024 px) and the footer (`parts/footer.liquid`, on night: the monogram seal, the names, the date and place, the links, the email and a last line). Every page but the reply page renders the floating seal (`parts/reply-seal.liquid`), and every page but the home and reply pages starts with `parts/page-title.liquid`.
- The lists: `home-suite` (the home page's five cards), `story` (the home page's postcards, those marked `home`, and the story page), `party` (the people standing with them), `events` (the weekend page, grouped by `day`), `getting-here` (the home page's stamps and the travel page's steps), `stays`, `guide` and `gallery` (the home page's island), `rsvp-faq` and `registry` (the reply page), `navigation`. `rsvps` collects the reply card (`parts/reply-form.liquid`) and is answered by `fragments/rsvp-sealed.liquid`.
- `parts/diecut.liquid` shows a picture in a die-cut window (`shape`: arch, pebble, circle, scallop, wave); `parts/time.liquid` shows a 24-hour time of the records ("16:30") as "4:30 pm"; `parts/stamp.liquid` and `parts/postmark.liquid` draw a stamp and a postmark from a record.

## When adapting

- The couple's names are on the invitation card (`parts/envelope.liquid`), in the header, the footer, the letter's signature (`parts/letter.liquid`), every page's title and description, the reply card's sealed envelope ("To Iris & Callum, Mackinac Island" in `fragments/rsvp-sealed.liquid`), and the monogram "I C" on every seal (`parts/envelope.liquid`, `parts/footer.liquid`, `parts/reply-band.liquid`, `parts/reply-form.liquid`, the fragment): change the initials everywhere.
- The date (June 12, 2027), the time (half past four) and the place (Larkspur Cottage, East Bluff, Mackinac Island) are on the card, in the header's phone menu, the footer, the suite's records, the weekend's records and title, and the page titles. The reply date (May 1, 2027) is in the reply band (`parts/reply-band.liquid`), the floating seal, the suite's last card, the reply page's title and the reply card.
- The weekend's times, the rooms and their codes, the rates and the cutoff dates are facts: ask for them, or keep the examples and say so. The hotels, the fudge shop, the fish counter and the stables are invented; keep only real landmarks of the maker's place (Arch Rock, the fort here) and leave out what you would have to guess.
- The couple's story is theirs: rewrite the postcards from what the maker tells you, or keep fewer of them rather than invent a life. The party is shown as initials on lilac until the maker sends portraits (`photo` in `data/party/`).
- The email (hello@irisandcallum.wedding) is in the footer and the questions.
- The site is "Still to come"; for a thank-you site after the day, see the home page's choices.

## Pages

### Home (`/`)

The envelope opening on the invitation card over a photograph of the place, a letter from the two of them beside an arch photo, the weekend as a fan of five cards, three postcards of their story, the place on lilac with five die-cut pictures and three facts, the way here as four stamps, and the green reply band.

#### How do guests reply?

- **Online, with the reply card** (as built): guests fill in the reply card on the site; replies arrive in Upstart's Content tab and can be downloaded as a CSV for the caterer. Keep `parts/reply-form.liquid`, `data/rsvps/`, `fragments/rsvp-sealed.liquid`, the header's "Kindly reply", the floating seal and the reply bands.
- **By email or text**: guests write or text the couple. In `parts/reply-form.liquid` replace the form with a card of the same oat stock and arch top holding the address and a phone number with "Write to us" (`mailto:`) and "Text us" (`sms:`) buttons; delete `data/rsvps/`, `fragments/rsvp-sealed.liquid` and `scripts/seal.js`. Every reply link keeps pointing to `/rsvp`.
- **Through another wedding service** (Zola, The Knot, Joy or a printed card): the reply page keeps its date and questions, and `parts/reply-form.liquid` becomes one card saying where to reply, with a button to it; delete the form, `data/rsvps/`, the fragment and `scripts/seal.js`. Point the header's button (`parts/header.liquid`), the floating seal (`parts/reply-seal.liquid`) and the reply band's button to that address.
- **No reply needed** (an open ceremony, a party everyone may join): delete `pages/rsvp.liquid` with the reply page's parts, `data/rsvps/`, the fragment, `scripts/seal.js` and `parts/reply-seal.liquid` (and its render on every page), remove the header's button and the `kindly-reply` navigation record, and move the questions and the gifts (`parts/rsvp-questions.liquid`, `parts/gifts.liquid`) to the weekend page. The reply band (`parts/reply-band.liquid`) becomes "We hope to see you there" with a link to `/weekend`, and the suite's last card points to the weekend.

#### Is the wedding still to come?

- **Still to come** (as built): the invitation, the weekend, travel and the reply.
- **It has happened** (the thank-you site): in `parts/envelope.liquid` the card reads "Thank you" over the names, the date and "for being there"; the suite's cards become the photographs, the story and the thank-you letter (`data/home-suite/`); the reply page gives way to **Photos** (`pages/photos.liquid`, `/photos`): a wall of the day's pictures in die-cuts, adapted from the gallery's `gallery-masonry-wall` over `gallery`. Delete `data/rsvps/`, the reply page's parts and `parts/reply-seal.liquid`, and leave out the travel page unless the maker wants it kept as a memory.

### Our story (`/story`)

The title, their chapters as postcards (a die-cut photo, and on the back the postmark, the title and a paragraph), the proposal told by each of them under a wide arch photo, the people standing with them, and the reply band.

#### Who tells the story?

- **The two of them, as "we"** (as built).
- **Each in turn**: every postcard carries two short paragraphs, "Iris says" and "Callum says", as the proposal does (`parts/the-question.liquid`). Add the fields `first` and `second` (markdown) to `data/story/_datasource.yaml`, write them in each record, show them in `parts/story-postcards.liquid` with their labels in the script, and make each `summary` a line.
- **A friend**: the maid of honor or the best man tells it in the third person. Add a short note above the postcards in `parts/story-postcards.liquid`, signed with their name in the script (`.script`), and rewrite the records in the third person; "Ten summers and one ferry" stays as the title.

#### Is there a wedding party?

- **Yes** (as built): the people standing with them, the officiant last.
- **No**: delete `parts/party.liquid`, its render and `data/party/`. The officiant, if there is one, gets one line under the proposal in `parts/the-question.liquid`.

When removed: delete `pages/story.liquid`, `parts/story-postcards.liquid`, `parts/the-question.liquid`, `parts/party.liquid`, `data/party/` and the `our-story` navigation record. The home page's three postcards keep `story`; remove their "Read our story" button in `parts/home-postcards.liquid`.

### The weekend (`/weekend`)

The title, the run-of-show grouped by day (each day's number set huge, its name and a die-cut photo, then the times as ruled rows with the place, directions, what to wear and who it is for, with sunset marked on Saturday), what to wear on lilac with five color swatches, the rain line, getting around on the day, and the reply band.

#### How long is the celebration?

- **A weekend** (as built): Friday's welcome, the wedding on Saturday and Sunday's goodbyes; the suite's first three cards are the three days.
- **One day**: keep only that day's records in `data/events/` (one `day` value) and remove the day header in `parts/run-of-show.liquid` (keep the rows); the suite's first three cards become the ceremony, the dinner and the party (`data/home-suite/`); remove the reply card's step 03 except the song and the note (`parts/reply-form.liquid`), with the `friday` and `sunday` fields of `data/rsvps/` and their line in the fragment.
- **A ceremony now, a party later** (two dates, two places): make the `day` choices of `data/events/_datasource.yaml` the two occasions and set `days` and the day names in `parts/run-of-show.liquid`; each record has its own place and directions; the envelope's card names both; step 03 of the reply asks about each.

#### What do guests wear?

- **Colors to wear** (as built): the swatches on lilac (`parts/what-to-wear.liquid`) and a sentence of advice.
- **A named dress code** (black tie, cocktail, beach formal): in `parts/what-to-wear.liquid` the code in the display serif, a sentence, and two die-cut photos of the place (`parts/diecut.liquid`) in place of the swatches.
- **Nothing to say**: delete `parts/what-to-wear.liquid` and its render; the rows keep any note in their `dress` field.

When removed: delete `pages/weekend.liquid`, `parts/run-of-show.liquid`, `parts/what-to-wear.liquid`, `parts/if-it-rains.liquid`, `parts/getting-around.liquid`, `data/events/` and the `the-weekend` navigation record. The suite's three day cards become one card, "The day", carrying the times written into it, linking to `/rsvp`; the hero's "See the weekend" points to `/#weekend`. The envelope's card keeps the date, the time and the place.

### Travel & stay (`/travel`)

The title, the way here as four stamps along a dotted route with a paragraph each, where to stay as ruled rows (a pebble photo, the name, the rate, the block's code and cutoff, a booking link and a phone), the island's places in tabs (Eat, See, Do) as stamps, good-to-know notes on lilac, and the reply band.

#### Where do most guests come from?

- **From away** (as built): airports, the drive, the last leg, rooms to book and things to do.
- **Mostly nearby**: the page becomes "Getting there" (rename `pages/travel.liquid` to `pages/getting-there.liquid` and its navigation record), with the address, parking and a plain map link in place of `parts/way-here.liquid`'s steps; keep two or three stays; the home page's stamps keep only "By road" and "On foot" (`data/getting-here/`).
- **From abroad**: add a "Before you fly" section after the way here (passports and visas, the currency, the language, the time zone, plugs and phones), written like `parts/good-to-know.liquid`; the stamps carry the countries' airports.

#### Where do guests stay?

- **Blocks of rooms held for them** (as built): each stay with its code and its cutoff date.
- **All at the venue**: one record in `data/stays/` for the venue's rooms ("Your room is on us; we'll write with your room by May 15"), with no code; delete the others.
- **Their own choice**: suggestions with no `code` or `cutoff` (the row then shows the rate and the links only), and the line above the rows in `parts/stays.liquid` says to book early.

When removed: delete `pages/travel.liquid`, `parts/way-here.liquid`, `parts/stays.liquid`, `parts/guide.liquid`, `parts/good-to-know.liquid`, `parts/home-stamps.liquid` and its render on the home page, `data/getting-here/`, `data/stays/`, `data/guide/` and the `travel-and-stay` navigation record. Delete the suite's "Getting here" card; the footer keeps the place's name, and add a "Directions" link to a map search for the venue there.

### Kindly reply (`/rsvp`)

The title with the reply date, the reply card in three numbered steps (whether you'll be there, your party and dinner, the weekend) answered by the sealed envelope, the questions by topic on lilac, and the gifts. Its card follows how guests reply, chosen with the home page.

#### What does the reply ask?

- **Attendance, the party, the dinner and the weekend** (as built).
- **Attendance and the party only** (a buffet or a family-style dinner): remove the dinner field from `parts/reply-form.liquid` and `data/rsvps/_datasource.yaml`.
- **A dinner for each guest**: step 02 repeats a name and a dinner for each seat on the invitation, up to four (`guest_1` and `dinner_1` to `guest_4` and `dinner_4`, in the form and in `data/rsvps/`), and the sealed envelope lists them.

#### Who comes with a guest?

- **Those named on the invitation** (as built): "How many of you" goes up to the number invited, and the questions say so (`data/rsvp-faq/can-i-bring-a-plus-one.md`).
- **Anyone may bring a guest**: step 02 asks "Bringing someone?" and their name, and the plus-one answer says yes.

#### How do gifts work?

- **A fund and a registry** (as built): the cards of `data/registry/` link to them.
- **No gifts, please**: `parts/gifts.liquid` becomes one line in the display serif, "Your being there is the gift"; delete `data/registry/` and rewrite `data/rsvp-faq/gifts.md`.
- **A cause**: one record in `data/registry/` for a charity the two of them chose, with its link.

When removed (the maker answered "No reply needed" or replies elsewhere): delete `pages/rsvp.liquid`, `parts/reply-form.liquid`, `data/rsvps/`, `fragments/rsvp-sealed.liquid`, `scripts/seal.js`, `parts/reply-seal.liquid` with its renders and the `kindly-reply` navigation record; move `parts/rsvp-questions.liquid` and `parts/gifts.liquid` to the weekend page; point every reply link where the home page's choice says.
