# Pocket

A light, playful site for an app, whose screens are drawn in the page inside phone frames. It was written for Fernway, a houseplant care app; it suits any consumer app: a habit tracker, a budget, a language course, a sleep, recipe or fitness app. Rewrite the texts, the screens' parts and the records that fill them, and keep the shapes.

## How it is made

- The header and the footer are on every page; the download band (`parts/download.liquid`) closes the home and pricing pages.
- The lists: `plants` (the phones' screens), `stores` (the store buttons, in the hero, the download band and the footer), `home-chapters`, `home-figures`, `home-features`, `reviews` and `home-faq` (the home page), `plans` (the home and pricing pages), `pricing-compare` and `pricing-faq` (the pricing page), `help-articles` (the help center and its pages), `privacy-points` (the privacy page and the home page), `privacy-sections` (the privacy page), `support` (the support form's messages) and `navigation` (the header and the footer). The design notes explain how each works.

## When adapting

- The app's name is in the header, the footer and every `<title>`.
- Ratings, prices and privacy promises are the maker's: ask for them or leave them out rather than guess.

## Pages

### Home (`/`)

The hero (three phones fanned over the glow, the rating and the store buttons), the figures, the story (one phone whose screen changes with each chapter), the feature tiles, the reviews, the plans, the privacy promises, the questions and the download band.

#### Where is the app?

- **iPhone and Android** (as built): the site shows both store buttons. Keep both `stores` records.
- **iPhone only**: the site shows the App Store button only. Keep that store's record only; `parts/store-buttons.liquid` draws what is left.
- **Android only**: the site shows the Google Play button only. Keep that store's record only; `parts/store-buttons.liquid` draws what is left.
- **On the web**: the store buttons become one button that opens the app. Delete `data/stores/`; in `parts/store-buttons.liquid`, put one `btn btn-primary` pill "Open <app>" to the app's address (ask it, or `#` until given), the same size as the store pills; the phones stay.

#### How is the app paid for?

- **Free, with a paid plan** (as built): the plans and the pricing page stay. Keep `plans` and the plans on the home page.
- **Paid**: one price shows where the plans were. One plan, its price set in `numeral`, takes the place of the plans on the home page; the pricing page keeps one card in its turn.

A free app has no pricing page: it is left unchecked in the card of pages, and its "When removed" says what changes.

### Pricing (`/pricing`)

The plans as its title band, the comparison, the money questions and the download band.

For a paid app (chosen with the home page), the page keeps one card and the comparison goes (`parts/compare.liquid`, `data/pricing-compare/`).

When removed: the app is free. Delete `pages/pricing.liquid`, `parts/compare.liquid`, `parts/billing-faq.liquid`, `data/pricing-compare/`, `data/pricing-faq/`, and the pricing page's navigation record and footer link; remove `parts/pricing.liquid` and its render on the home page, and `data/plans/`; the home page's questions say it is free.

### Help (`/help`)

The help center's title with its topics, the articles by topic, and the support form, whose thank-you is `fragments/support-thanks.liquid`; each article has its page, with the others of its topic and a band to write to the team.

When removed: delete `pages/help.liquid`, `pages/help/`, `parts/help-intro.liquid`, `parts/help-topics.liquid`, `parts/support.liquid`, `parts/write-to-us.liquid`, `data/help-articles/`, `data/support/`, `fragments/support-thanks.liquid` and its navigation record; the home page's questions give the support email instead.

### Privacy (`/privacy`)

What the app keeps and never does, in cards, then the policy with its table of contents.

The policy is a sample: tell the maker it must be checked against what their app really does.

When removed: delete `pages/privacy.liquid`, `parts/privacy-cards.liquid`, `parts/privacy-policy.liquid`, `data/privacy-sections/` and its link in the footer; the home page's privacy promises stay, without a link to the page.
