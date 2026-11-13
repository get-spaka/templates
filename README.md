# Upstart templates

The templates a new website starts from in Upstart, one folder each, in the format described in [`FORMAT.md`](FORMAT.md). This repository is their only source.

## Releases

Each tag `v*` builds a release from these sources (`.github/workflows/release.yml`): every template is checked as a finished one, then the release gets

- `catalogue.json`: each template's manifest, its `.zip`'s name, sha256 and size, and its pictures;
- each template's cover and hover sequence;
- one `.zip` per template, without its pictures.

The Upstart app ships a copy of the catalogue and the pictures, reads the latest release's catalogue when it starts, and downloads a template's `.zip`, checked against its sha256, when someone views it large or chooses it. Nothing built is committed: the release is built here, on each tag. A template that changes gets a higher `version` in its `template.json`, so that the app downloads it again.

To build a release locally, with Node 24 or later and nothing installed:

```sh
node scripts/release.mjs . dist v0-local
```

## Making one

Upstart's own repository has this one as a submodule, with the commands that check a template, photograph its pages and find its images, and the skill its agents follow to make one. `scripts/release.mjs` is the app's own checks, bundled there: it is not edited here.

Each template's licence is in its `template.json`; its fonts, libraries and images carry their own licences and credits in its folders.
