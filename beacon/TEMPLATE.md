# Beacon

A launch page for a product, dark and precise, with one violet light. It was written for Nightjar, uptime and job monitoring for small software teams, in its public beta; it suits an app, a web service, a developer tool or any other software about to launch or just launched, and a product that is not software as well.

## How it is made

- The header and the footer are on every page; the footer holds the navigation, the social links and the image credits.
- The lists: `home-logos`, `home-features`, `home-steps`, `home-stats` and `testimonials`, `home-milestones`, `home-plans` and `home-faq` make the home page's sections, in that order; `updates` makes the updates pages and the home page's latest updates; `navigation` the header and the footer; `waitlist` collects the forms' answers. The design notes explain how each works.

## When adapting

- The product's name is in the header, the footer, the window's `aria-label` and every page's `<title>`; its email in the FAQ and the privacy page; its launch date in the hero's status line, the closing band, the track and the updates page.
- The waitlist count ("2,418 teams on the list"), the founding offer and the figures are promises: ask the maker for them or leave them out rather than invent them.
- For a product that is not software (a book, a course, hardware taking pre-orders), keep the structure: the window becomes what the product shows (a contents page, a lesson, a spec sheet drawn in HTML), the steps its three verbs, the track its own milestones.

## Pages

### Home (`/`)

The hero (the update pill, the launch's status line, the promise and the waitlist form), the window, the logos of the teams in the beta, the features, the three steps, the proof (figures and testimonials), the launch track, the pricing, the latest updates, the questions and the closing waitlist band.

#### What do visitors sign up for?

- **A waitlist** (as built): an email to hear at launch, at the top and at the end of the page. Keep the forms and `waitlist`.
- **Pre-orders**: the plans become founding offers to reserve; the form takes a reservation. In `parts/pricing.liquid`, each plan becomes a founding offer (one `data-lit`) with a "Reserve" button; the hero's and closing band's forms say "Reserve yours" and `waitlist` gains a `plan` choice field with the plans' names. No payment is taken on the site: say that the maker will write to confirm.
- **Already launched**: the forms become a sign-up button to the product; the track ends at launch. Replace the forms of `parts/hero.liquid` and `parts/waitlist.liquid` by a `btn btn-primary` "Start free" or "Sign up" link to the product's address (ask it, or `#` until given); the track's last milestone is the launch, done; delete `data/waitlist/` once the updates page's form is gone too.

The updates page's form follows this choice in its turn.

#### Show pricing yet?

- **Yes, the plans** (as built): the plans section stays, with the maker's prices. Keep `parts/pricing.liquid` and `home-plans`.
- **Not yet**: the plans go; the questions say pricing comes at launch. Remove `{% render 'pricing' %}` from the home page, delete `data/home-plans/`, renumber the figures' labels, and add a question to `home-faq` saying pricing comes at launch. With pre-orders, the founding offers are the plans: keep them, whatever this answer.

### Updates (`/updates`)

The changelog, every update, then a waitlist form; each update has its page, with links to the previous and the next.

Its form follows what visitors sign up for, chosen with the home page: the waitlist form as built; with pre-orders, "Reserve yours"; already launched, the `btn btn-primary` sign-up link in place of the form, and `data/waitlist/` deleted.

When removed: delete `pages/updates.liquid`, `pages/updates/`, `data/updates/`, `parts/latest.liquid` and its render on the home page, and its navigation record.

### Privacy (`/privacy`)

What the waitlist keeps, written in the page itself.

When removed: delete `pages/privacy.liquid` and its link in the footer and beside the forms; the FAQ says in one line what the waitlist keeps.
