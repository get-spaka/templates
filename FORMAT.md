# Templates

A template starts a website: the maker chooses one on the start screen, describes their business, and the agent adapts it, rewriting its texts, replacing its images, adding or removing pages, keeping its design (Q229, Q246). This repository holds Upstart's own, one folder per template named after its `id`; Upstart's tests check each as a finished template, and so does each release.

## On disk

A template is an ordinary Upstart project folder, which its author opens in Upstart to see it and change it with the agent, plus:

- `template.json`, its manifest:

  ```json
  {
    "id": "atelier",
    "version": "1.0.0",
    "name": "Atelier",
    "description": "A calm studio site whose sections rise into view, with a large type hero.",
    "category": "portfolio",
    "original": true,
    "tags": ["studio", "ceramics"],
    "author": { "name": "Upstart", "url": "https://upstart.gg" },
    "licence": "MIT"
  }
  ```

  `category` is one of `business`, `portfolio`, `blog`, `launch`, `event`, `app`; `original` marks one of the original, animated designs (Q230). `questions`, optional, asks 1 to 4 questions on what really varies in the design (Q287, Q293), in the form of the agent's own questions: each with a `question`, a short `header` (a word or two), 2 to 4 `options` with a `label` and a `description`, and `multiSelect` when several go together. The first option is the recommended one, and holds for the template as it is:

  ```json
  "questions": [
    {
      "question": "How do guests book a table?",
      "header": "Booking",
      "options": [
        { "label": "Online, with the form", "description": "The reservation form stays." },
        { "label": "By phone", "description": "A call button in place of the form." }
      ],
      "multiSelect": false
    }
  ]
  ```

  Once the template is chosen, the start screen shows them under the message box, each set to its first option; the maker changes some or none, then sends, and the agent gets the answers with the first message, each marked as the maker's choice or left on the recommended one. The design notes say what each answer changes, under `## Template questions`, a `### ` heading per question written as asked. Ask only what the maker knows and the design cannot guess, and what costs the agent work to change: how a visitor books, orders or signs up, which pages exist, what is sold and how. Facts (the hours, the prices) are the agent's to ask after. What the project's own files say is not repeated there: the libraries' licences are in `scripts/libraries.json` and at the top of `scripts/lib/` files, each image's credits beside it in `media/`, the pictures in `pictures/`.
- `blocks/<kind>/<id>/`: its own blocks, in the format of Upstart's gallery, which the Blocks tab offers first once a site starts from it (Q235). They may overlap and tilt (Q256).
- `.upstart/skills/<id>-design/SKILL.md`: its design notes for the agent, a skill named `<id>-design`: its spirit, its effects and how to use them, what not to break (Q239).
- `pictures/`: made by `pnpm template:shoot`: `cover.webp` (the home page's first screen), `hover.webp` (an animated sequence of it, for the start screen), and `pages/<page>-desktop.webp` and `pages/<page>-phone.webp` for each page (`home` for `/`) and for the first record's page of each page per record (`work-casa-do-pinhal` for `/work/casa-do-pinhal`).

A new site copies everything but `template.json`, `pictures/`, a readme and a licence. Of `.upstart/`, a template keeps only `skills/` and `test-records/`.

As a `.zip` (an outside author's, Q236), the same files at its root or in the one folder it holds.

## Rules

`pnpm template:check` checks them:

- it has `pages/index.liquid` and `theme.css`, and every page renders with no note from the runtime;
- pages, parts, fragments and blocks hold no `<script>`, `<style>` or `<link>` tag and no `data-theme`: Upstart adds the site's scripts, stylesheet and theme;
- colors come from the theme (Q234): no `bg-blue-600`, `text-white` or `bg-[#…]` in the templates, no `#hex`, `rgb()`, `oklch(…)` or named color in `styles/*.css` or a `style` attribute; a color made from the theme's is fine (`oklch(from var(--color-primary) l c h / 0.4)`, `color-mix(in oklch, var(--color-primary), transparent)`);
- nothing is taken from another site but the libraries: images, videos, fonts and stylesheets are files of the template;
- each image has its credits in `media/<name>.json` (`credit.license`, `credit.author` for a CC BY licence, and `alt`), under a licence a business site may use: no NC or ND (Q231);
- each library of `scripts/libraries.json` comes from `cdn.jsdelivr.net` or `unpkg.com` with its version pinned (`@1.2.3`), with an open licence (MIT, ISC, BSD, Apache-2.0, Unlicense, 0BSD, CC0-1.0); a file of `scripts/lib/` names its licence at its top; never GSAP;
- each module of `scripts/` exports `start(root)`, imports libraries only from those servers, pinned, and leaves movement out under `prefers-reduced-motion` (warned); see the site-scripts skill (`../skills/site-scripts/SKILL.md`);
- the stylesheet hides nothing a script shows (warned): the page must look right in edit mode, where no script runs (Q242);
- its design notes are there, named after it, and its blocks describe themselves and render once dropped into its pages;
- once finished, its pictures are there.

No program, no `package.json`; anything at its root that is not part of a template is named and not copied.

## Starting a website from one

The start screen lists the templates (originals first) and shows one large, real and moving. Chosen, the template's site is copied into the new project (not its manifest or pictures), its sentences are noted in `.upstart/template-texts.json`, and the agent is told to adapt it: read the design notes, rewrite every text and record for the maker's business, replace the images, add or remove pages, keep the design. At the end of its turns Upstart names the template's sentences still in the site to the agent once, as it does for lorem ipsum. So write texts that are plainly of the invented business, in full sentences: a sentence of three words or more is checked; a short label (Menu, See the work) is not.

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

`template:image` searches and adds images as the agent's find_images and use_image do: free for commercial use, saved into `media/` with their credits and alternative text (a list file adds several, one a line: `<id> <name> <alternative text>`; downloads go one at a time, 1920 px wide at most from Commons, and wait while the source is busy); a search keeps a small copy of each image found in `e2e/.runs/template-images/`. The making-templates skill (`.claude/skills/making-templates/SKILL.md`) is the way to make one, step by step.

`template:shoot` builds the app (unless `--no-build`), launches it in the background, opens a copy of the template and photographs each page moving, as visitors see it, at 1440 and 390 pixels wide, into the template's `pictures/`, then writes a review sheet to `e2e/.runs/template-sheets/<id>.png`.
