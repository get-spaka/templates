# Upstart templates

The templates a new website starts from in Upstart: each folder of `templates/` is one, in the template format described in [`templates/README.md`](templates/README.md).

## Releases

Each tag `v*` builds a release from these sources (`.github/workflows/release.yml`): every template is checked as a finished one, then the release gets

- `catalogue.json`: each template's manifest, its `.zip`'s name, sha256 and size, and its pictures;
- each template's cover and hover sequence;
- one `.zip` per template.

The Upstart app ships a copy of the catalogue and the pictures, reads the latest release's catalogue when it starts, and downloads a template's `.zip`, checked against its sha256, when someone views it large or chooses it. The `.zip` files are never committed: they are built here, on each tag.

To build a release locally, with Node 24 or later and nothing installed:

```sh
node scripts/release.mjs templates dist v0-local
```

## Where these come from

The templates are made in Upstart's own repository and published here with `pnpm template:publish`, which also writes `scripts/release.mjs` (the app's own checks, bundled). Change them there rather than here.

Each template's licence is in its `template.json`; its fonts, libraries and images carry their own licences and credits in its folders.
