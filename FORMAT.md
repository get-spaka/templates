# Templates

A template starts a website: the maker chooses one on the start screen, describes their business, and the agent adapts it, rewriting its texts, replacing its images, adding or removing pages, keeping its design (Q229, Q246). This repository holds Spaka's own, one folder per template named after its `id`; Spaka's tests check each as a finished template, and so does each release.

## On disk

A template is an ordinary Spaka project folder, which its author opens in Spaka to see it and change it with the agent, plus:

- `template.json`, its manifest:

  ```json
  {
    "id": "atelier",
    "version": "1.0.0",
    "name": "Atelier",
    "description": "A calm studio site whose sections rise into view, with a large type hero.",
    "category": "portfolio",
    "tags": ["studio", "ceramics"],
    "author": { "name": "Spaka", "url": "https://spaka.app" },
    "licence": "MIT"
  }
  ```

  `category` is one of `business`, `portfolio`, `blog`, `launch`, `event`, `app`. A template whose look follows the time of day (a café's card that reads open or closed) adds `"shoot": { "clock": "2027-04-14T09:30:00-05:00" }`, the instant its pictures are taken at whatever the day of the shoot; the app reads nothing else of it. A template that uses something an older app reads otherwise adds `"app"`, the oldest app version it needs: `"app": "0.2.0"` for the `images` field kind or a generated image, which the checks require (Q368). An older app then takes the template's latest version it can open, kept in the catalogue, or does not show it. What the project's own files say is not repeated there: the libraries' licences are in `scripts/libraries.json` and at the top of `scripts/lib/` files, each image's credits beside it in `media/`, the pictures in `pictures/`.
- `TEMPLATE.md`, its guide for the agent that adapts it (Q299, Q306): Spaka keeps it beside a website started from the template while the website is adapted, page type by page type, and does not copy it into the website. A page type is the pages that share a first folder of `pages/`, with their records: `pages/index.liquid` is the home page, `/`; `pages/events/[events].liquid` belongs to `/events`. The guide says what matters only while adapting:

  ```markdown
  # Ember

  What it is, then whom it suits ("It was written for a wine bar…; it suits a cocktail bar, a steakhouse…").

  ## How it is made

  What every page shares (the header, the footer); the lists by name, with the pages that show them.

  ## When adapting

  Where the name, the address and the dates appear; what to ask or leave out rather than guess.

  ## Pages

  ### Home (`/`)

  The hero (the name and the open tonight line), the house's statement, the evening, the menu card…

  #### How do guests book a table?

  - **Online, with the form** (as built): the reservation form stays; requests arrive in the Content tab. Keep the booking links…
  - **By phone**: a call button and the number in place of the form. Point every booking link to the phone…

  ### Visit (`/visit`)

  The reservation form, the hours, how to find the place, gift cards and questions.

  When removed: delete `pages/visit.liquid`, `parts/reserve.liquid`, … and its navigation record; point the booking links to the phone.
  ```

  `## Pages` is the section `template:check` asks for: a `### Name (`/route`)` section per page type, the home page first, in the order the agent adapts them (Q303). A section's first paragraph says what the page shows: the agent starts from it to describe the page to the maker in the card of pages (Q302). Its `####` choices are those that really vary on that page and cost the agent work to change (how a visitor books, orders or signs up, what is sold and how), each written as a question, with 2 to 4 options: its label in bold, a sentence for the maker on what it means, then what to change in the files. The first option is the one recommended, most often the template as built, which `(as built)` marks wherever it is: Reel recommends "No open roles", since its invented jobs are not the maker's. A choice for the whole website goes with the home page, which is adapted with what every page shares; a page it also changes says so in its own section ("Its reserve section follows how guests book, chosen with the home page"). Whether a page exists is not a choice: the maker keeps or leaves page types in the card of pages, and each section's `When removed:` line says what to delete with it and where to point what led to it (Q304, Q307). The agent asks a page type's choices the maker's messages leave open in its turn, before changing its files. Facts (the hours, the prices) are not choices: the agent asks about them once the page is built. During the adaptation, the agent gets the guide's general part and the section of the page type it adapts.
- `blocks/<kind>/<id>/`: its own blocks, in the format of Spaka's gallery, which the Blocks tab offers first once a site starts from it (Q235). They may overlap and tilt (Q256).
- `.spaka/skills/<id>-design/SKILL.md`: its design notes, a skill named `<id>-design`, which stays with the website for the agent's later turns (Q239): its spirit, its type, colors and shapes, its effects and the attribute or class that turns each on, how its lists work, and the rules that hold for the website's whole life ("keep one oxblood band per page"). What only matters while adapting goes in the guide.
- `pictures/`: made by `pnpm template:shoot`: `cover.webp` (the home page's first screen), `hover.webp` (an animated sequence of it, for the start screen), and `pages/<page>-desktop.webp` and `pages/<page>-phone.webp` for each page (`home` for `/`) and for the first record's page of each page per record (`work-casa-do-pinhal` for `/work/casa-do-pinhal`).

A new site copies everything but `template.json`, `TEMPLATE.md`, `pictures/`, a readme and a licence. Of `.spaka/`, a template keeps only `skills/` and `test-records/`.

As a `.zip` (an outside author's, Q236), the same files at its root or in the one folder it holds.

## Rules

`pnpm template:check` checks them:

- it has `pages/index.liquid` and `theme.css`, and every page renders with no note from the runtime;
- pages, parts, fragments and blocks hold no `<script>`, `<style>` or `<link>` tag and no `data-theme`: Spaka adds the site's scripts, stylesheet and theme;
- colors come from the theme (Q234): no `bg-blue-600`, `text-white` or `bg-[#…]` in the templates, no `#hex`, `rgb()`, `oklch(…)` or named color in `styles/*.css` or a `style` attribute; a color made from the theme's is fine (`oklch(from var(--color-primary) l c h / 0.4)`, `color-mix(in oklch, var(--color-primary), transparent)`);
- nothing is taken from another site but the libraries: images, videos, fonts and stylesheets are files of the template;
- each image has its credits in `media/<name>.json` (`credit.license`, `credit.author` for a CC BY licence, and `alt`), under a licence a business site may use: no NC or ND (Q231), or, generated, how it was made in their place (`generated.model`, `generated.prompt`), with `"app": "0.2.0"` (Q432);
- each library of `scripts/libraries.json` comes from `cdn.jsdelivr.net` or `unpkg.com` with its version pinned (`@1.2.3`), with an open licence (MIT, ISC, BSD, Apache-2.0, Unlicense, 0BSD, CC0-1.0); a file of `scripts/lib/` names its licence at its top; never GSAP;
- each module of `scripts/` exports `start(root)`, imports libraries only from those servers, pinned, and leaves movement out under `prefers-reduced-motion` (warned); see the site-scripts skill (`../skills/site-scripts/SKILL.md`);
- the stylesheet hides nothing a script shows (warned): the page must look right in edit mode, where no script runs (Q242);
- its design notes are there, named after it, and its blocks describe themselves and render once dropped into its pages;
- once finished, its pictures are there.

No program, no `package.json`; anything at its root that is not part of a template is named and not copied.

## Starting a website from one

The start screen lists the templates by name and shows one large, real and moving. Chosen, the template's site is copied into the new project (not its manifest, guide or pictures), its sentences are noted in `.spaka/template-texts.json`, and the website is adapted page type by page type (Q302-Q313). In the first turn the agent shows the maker the card of pages, asks the home page's choices the message leaves open, then adapts the home page and what every page shares and removes the page types not kept; it stops after each page type with a line on what it invented, and the maker continues to the next from the list under the conversation. The pages still to do keep the template's contents meanwhile. At the end of its turns Spaka names the template's sentences still in what was adapted to the agent once, as it does for lorem ipsum. So write texts that are plainly of the invented business, in full sentences: a sentence of three words or more is checked; a short label (Menu, See the work) is not.

## Commands

```bash
pnpm template:check <folder or .zip> [--finished]
```

```bash
pnpm template:shoot <folder> [--no-build]
```

```bash
pnpm template:image find <words>
```

```bash
pnpm template:image use <folder> <id> <name> "<alternative text>"
```

```bash
pnpm template:image use <folder> <list file>
```

```bash
pnpm template:image generate <folder> <name> "<prompt>" "<alternative text>" [--aspect 16:9] [--ref media/x.webp]
```

`template:image` searches and adds images as the agent's find_images and use_image do: free for commercial use, saved into `media/` with their credits and alternative text (a list file adds several, one a line: `<id> <name> <alternative text>`; downloads go one at a time, 1920 px wide at most from Commons, and wait while the source is busy); a search keeps a small copy of each image found in `e2e/.runs/template-images/`. `generate` makes one as the agent's generate_image does, with GEMINI_API_KEY or OPENAI_API_KEY set in the terminal (`--model` picks among the models it lists): 2K at most, saved into `media/` as WebP with its model, prompt and date in place of credits, from up to four images of `media/` given with `--ref`, to keep one style or retouch one. The making-templates skill (`.claude/skills/making-templates/SKILL.md`) is the way to make one, step by step.

`template:shoot` builds the app (unless `--no-build`), launches it in the background, opens a copy of the template and photographs each page moving, as visitors see it, at 1440 and 390 pixels wide, into the template's `pictures/`, then writes a review sheet to `e2e/.runs/template-sheets/<id>.png`.
