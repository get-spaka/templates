# Commons

Commons is the website of a neighborhood nonprofit, made like the noticeboard by its door: big friendly type on newsprint, flat bright colors, figures on torn slips of paper, events as notices with tear-off tabs, an appeal's jar that fills to where it stands, and a few lines written by hand. The first screen is two doors, "Lend a hand" and "Take what you need", for the two kinds of visitors a nonprofit has. It was written for Bread & Bolts, a nonprofit on the North End of Dubuque, Iowa, that runs a tool library, a repair café, a porch pantry, a winter coat swap and a garden; it suits a food bank, a community center, a neighborhood or tenants' association, a youth program, an animal rescue, a literacy or language program, a refugee welcome group, a park or river conservancy, a mutual aid network or a library's friends. Keep the structure and rewrite the programs, the figures, the stories and the appeal.

## How it is made

- Every page shares the header (a strip on deep ink announcing the appeal, the wordmark, the links, a Volunteer pill and a Donate pill) and the footer ("Come by the porch.", the Porch Letter's sign-up form, and a marigold notice with the address, the hours and the phone, ending in tabs that link to directions).
- The home page's sections are parts in `parts/`: `hero-doors`, `promise`, `count`, `program-cards`, `jar`, `stories`, `noticeboard`, `latest-news`. The give page reuses `jar`; the about page reuses `count` with its own figures; events are drawn by `parts/notice.liquid` wherever they appear, and every fringe of tabs by `parts/tabs.liquid`.
- The lists: `programs` (the home page's cards, the programs page, a page per program, the doors' links), `appeal` (one record: the header's strip, the jar on the home and give pages, and the donation page's address that every Donate button reads), `home-figures` and `about-figures` (the count), `stories` (the home page and each program's page), `events` (the noticeboard, the events page, a page per event, the program pages, the volunteer page's next orientation), `news`, `team`, `hours` (the footer and the about page), `about-milestones`, `about-logos`, `give-levels`, `give-things`, `give-ways`, `give-spending`, `volunteer-roles`, `volunteer-steps`, `volunteer-faq` and `navigation`. `volunteers`, `rsvps`, `contact` and `newsletter` collect the forms. The design notes say how each effect works.

## When adapting

- The name is in the header's wordmark and the footer's (the ampersand in tomato: keep a short mark of the name in `text-primary` if it has none), every page's title, the footer's 501(c)(3) line and `fragments/`. The address (41 Couler Lane, Dubuque) is in the footer's notice and its tabs' directions link, the header's menu on a phone and the about page's "Find us"; the phone and email in the footer, the programs page, the about page, the volunteer form's side and `fragments/rsvp-thanks.liquid`.
- The appeal is facts only the maker knows: what it is for, the goal, what has come in, from how many, and by when. Write them in `data/appeal/`; the jar, the strip and the percentages follow by themselves. Never invent an amount: ask, or choose "Not now" for the appeal.
- The donation page's address goes into `appeal.link` (it is `https://example.org/donate` as built). Ask for it. Until it is given, empty the field: the Donate buttons then lead to `/give`.
- The figures (the count, each program's figure) are last year's real totals: ask for them, or leave the count out rather than guess. The handwritten note beside a figure must repeat a fact said elsewhere, never be the only place it is said.
- Stories are real neighbors' words, used with their permission, about an object or a moment, with a photo of the thing rather than the person. Never invent a quote for a real organization: keep one story the maker gives, or leave the section out.
- The team's people and the funders in `about-logos` are invented: replace them with the maker's or remove them.
- `parts/hero-doors.liquid` holds each door's four links: point them at the maker's own programs and ways to help.

## Pages

### Home (`/`)

The two doors under "What we have, we share.", the founders' promise, last year's figures on torn slips, the programs as cards in their colors, the appeal's jar, stories of neighbors, the noticeboard of the next three events, and the latest news.

#### How do people give money?

- **On your own donation page** (as built): every Donate button opens, in a new tab, the page where the nonprofit already takes gifts (its bank's, PayPal, Givebutter, Donorbox, Zeffy…); Spaka takes no payments. Put its address in `data/appeal/cooler.md` (`link`), which the header's and footer's Donate buttons, the jar and the give levels read.
- **With a pledge form**: visitors say what they mean to give, once or monthly, and leave their name and email; the nonprofit then writes back with how to pay. Add a collected `pledges` datasource (amount, frequency as a choice of Once and Monthly, name, email, note) with `fragments/pledge-thanks.liquid`; in `parts/give-levels.liquid` replace each level's button with a link to `#pledge` and add the form under the levels (`<div id="pledge">`); empty `appeal.link` and point the Donate buttons (`parts/header.liquid`, `parts/footer.liquid`, `parts/jar.liquid`) to `/give#pledge`.
- **By check or in person only**: the give page says to whom to make the check out, where to send it, and when the shed takes gifts in person (`data/give-ways/`). Empty `appeal.link`, point the Donate buttons to `/give#ways`, and in `parts/give-levels.liquid` remove the levels' buttons and the line about the secure donation page.
- **Things and time, not money**: "Donate" becomes "Give things" and points to `/give#things` (header, footer, jar). The jar counts things instead of dollars: put the count in `goal` and `raised`, and in `parts/jar.liquid` replace the `dollars` renders with the plain numbers and their unit ("120 winter coats by November 30: 74 so far"). Remove `parts/give-levels.liquid` and `parts/give-spending.liquid` from the give page and delete `data/give-levels/` and `data/give-spending/`.

#### How do people ask for help?

- **They just come** (as built): each program says when it is open and who it is for; nobody signs up. The "Take what you need" door links to the programs.
- **With a request form**: a short, private form asks for a name, a way to reach them, the program and what they need, and says who reads it and when they will hear back. Add a collected `requests` datasource and `fragments/request-thanks.liquid`, write `parts/ask.liquid` (the form, `id="ask"`) and render it on the programs page under the title; point the "Take what you need" door's links (`parts/hero-doors.liquid`) and "Not sure where to start?" to `/programs#ask`. Ask only what is needed.
- **By phone**: a help line set large with its hours. On the programs page, replace "Not sure where to start?" with the number at poster size and its hours; point the "Take what you need" door's links to `tel:`.

#### Does it send a newsletter?

- **Yes, sign-ups kept in Spaka** (as built): the footer's Porch Letter form posts to `newsletter`. Sign-ups arrive in the Content tab, to be copied into whatever tool sends the email; Spaka does not send it. Rename the letter after the maker's.
- **On another service**: in `parts/footer.liquid` replace the form with a "Get the letter" button to the maker's Mailchimp, Buttondown or other page; delete `data/newsletter/` and `fragments/newsletter-thanks.liquid`.
- **No newsletter**: remove the letter's block from `parts/footer.liquid`; delete `data/newsletter/` and `fragments/newsletter-thanks.liquid`.

### Programs (`/programs`)

The title, a line and how to ask where to start, then each program in full in its color, with its photo, when, where and who it is for; each program opens on its own page with its terms, its text, its steps, its figure, a neighbor's story, its next event and the next program.

#### Does each program have its own page?

- **A page per program** (as built): keep `pages/programs/[programs].liquid`.
- **All on one page** (one or two programs): delete `pages/programs/[programs].liquid`; in `pages/programs.liquid` show each program's `body` and `steps` in its row in place of "More about it"; point the home page's cards (`parts/program-cards.liquid`) and the doors' links to `/programs#<id>`.

When removed: delete `pages/programs.liquid`, `pages/programs/` and the `programs` navigation record. The home page's cards keep `programs` as `<div>`s without links, showing When and Where; point the "Take what you need" door's links (`parts/hero-doors.liquid`) to `/#programs`.

### Volunteer (`/volunteer`)

The title with "takes two minutes" written by hand, five roles as notices with "I'm in!" tabs, three steps to a first shift, the sign-up form beside the coordinator and the next orientation, and questions.

#### How do volunteers sign up?

- **A form, then a call** (as built): the form says what they would like to do and when they are free, and the coordinator calls them. Records arrive in the Content tab. Keep `parts/volunteer-form.liquid` and `data/volunteers/`.
- **They pick a shift**: add a `shifts` datasource (date, time, program, spots) shown as notices with `parts/notice.liquid`'s look above the form, and a `shift` choice field in `data/volunteers/` asked in the form; it stays a request that the coordinator confirms by email.
- **An orientation first**: the form books a seat at the next orientation: replace the programs and times in `parts/volunteer-form.liquid` with a choice of the coming `events` of kind Orientation (a `session` field in `data/volunteers/`), and say that shifts come after.
- **On a volunteer platform**: in `parts/volunteer-form.liquid` replace the form with a button to the maker's SignUpGenius, VolunteerHub or other page (keep the coordinator's side), point the roles' tabs (`parts/volunteer-roles.liquid`) there, and delete `data/volunteers/` and `fragments/volunteer-thanks.liquid`.

When removed: delete `pages/volunteer.liquid`, `parts/volunteer-roles.liquid`, `parts/volunteer-steps.liquid`, `parts/volunteer-form.liquid`, `parts/volunteer-faq.liquid`, `data/volunteer-roles/`, `data/volunteer-steps/`, `data/volunteer-faq/`, `data/volunteers/`, `fragments/volunteer-thanks.liquid` and the `volunteer` navigation record. Point the header's and footer's Volunteer pills, the "Lend a hand" door's Volunteer and "Fix things with us" links and the program pages' "Volunteer here" to the coordinator's email (`mailto:`), or remove them.

### Give (`/give`)

The title, the appeal's jar, what a gift does in four levels, the things the shed can take, other ways to give, and where each dollar goes as a bar of torn strips. Its giving sections follow how people give money, chosen with the home page.

#### Is there an appeal running?

- **Yes, the jar** (as built): one goal with an end date, filled to where it stands from the `appeal` record, in the header's strip, on the home page and here. Ask for its amounts.
- **Not now**: remove the strip from `parts/header.liquid` (the `{% if appeal %}` link at its top) and `{% render 'jar' %}` from `pages/index.liquid` and `pages/give.liquid`; `data/appeal/` keeps only the donation page's address, and `parts/jar.liquid` stays for the next appeal.

When removed: delete `pages/give.liquid`, `parts/give-levels.liquid`, `parts/give-things.liquid`, `parts/give-ways.liquid`, `parts/give-spending.liquid`, `data/give-levels/`, `data/give-things/`, `data/give-ways/`, `data/give-spending/` and the `give` navigation record. The Donate buttons lead straight to the donation page, or go when there is none; the header's strip points to `/#appeal`; remove the jar's "Other ways to give" and the "Lend a hand" door's "Give money" and "Give tools or coats" links (or point them to the donation page).

### Events (`/events`)

The title, then the coming events by month as notices on a sky band, each with its day at poster size, its kind, time and place, "Free" or its price, and tabs to save a spot; each event opens on its own page with its text, its terms on a slip, a form to save a spot, and the other events.

#### How do people come?

- **They save a spot** (as built): each event's page has a short form posting to `rsvps`, so the nonprofit knows how many to expect; the notices' tabs lead to it (`#spot`).
- **They just come**: remove the `#spot` form from `pages/events/[events].liquid`, delete `data/rsvps/` and `fragments/rsvp-thanks.liquid`; in `parts/notice.liquid` the tabs read the date and place ("Dec 12 · the shed") and lead to the event's page, and the notice says "Free, no need to sign up".
- **Tickets elsewhere** (a benefit with paid seats): add a `ticket_url` link field to `data/events/`; in `parts/notice.liquid` and the event page, the tabs and a "Get tickets" button open it in a new tab when it is set; remove the form and delete `data/rsvps/` and `fragments/rsvp-thanks.liquid`.

When removed: delete `pages/events/`, `data/events/`, `data/rsvps/`, `fragments/rsvp-thanks.liquid`, `parts/noticeboard.liquid` with its render in `pages/index.liquid`, and the `events` navigation record. Remove the next event from `pages/programs/[programs].liquid` (the `{% if event %}` section) and the next orientation from `parts/volunteer-form.liquid`, writing the orientation as a line of text there.

### News (`/news`)

The latest post large, the others in a list with their kind and date; each post opens on its own page with its cover, its text with tomato pull quotes, and more posts.

No choice: the posts are the maker's. With none to tell yet, keep one, written from what the maker says, rather than inventing three.

When removed: delete `pages/news/`, `data/news/`, `parts/latest-news.liquid`, `parts/post-card.liquid`, the render of `latest-news` in `pages/index.liquid` and the `news` navigation record. The stories stay on the home page.

### About (`/about`)

The title, how it started in dated steps, the year in numbers on six slips, who runs it (staff, then the board), the businesses and funds that keep it going as wordmarks, the shed's address and hours with a directions link, and a form to write to the nonprofit.

#### Who runs it?

- **Staff and a board** (as built): the team in two groups, staff then board, each shown by initials in a program color until the maker sends photos (`photo`).
- **Volunteers only**: no staff. In `pages/about.liquid` the heading becomes the volunteers who coordinate each program, with "Run entirely by volunteers since 2017" (the founding year), and one group only: remove the loop over the two groups and the `group` field from `data/team/`.

When removed: delete `pages/about.liquid`, `data/about-milestones/`, `data/about-figures/`, `data/about-logos/`, `data/team/`, `data/contact/`, `fragments/contact-thanks.liquid` and the `about` navigation record. In `parts/count.liquid` remove the "Our year in numbers" link; the footer keeps the address, the hours and the email.
