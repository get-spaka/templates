# Spaka templates

The templates a new website starts from in Spaka, one folder each, in the format described in [`FORMAT.md`](FORMAT.md). This repository is their only source.

## Releases

Each tag `v*` builds a release from these sources (`.github/workflows/release.yml`): every template is checked as a finished one, then the release gets

- `catalogue.json`: each template's manifest, its `.zip`'s name, sha256 and size, and its pictures; and under `earlier`, the earlier versions an older app still needs (a template that says `"app"`, the oldest app version it needs), each with the release that holds its files, carried forward from the previous release's catalogue;
- each template's cover and hover sequence;
- one `.zip` per template, without its pictures.

The Spaka app ships a copy of the catalogue and the pictures, reads the latest release's catalogue when it starts, and downloads a template's `.zip`, checked against its sha256, when someone views it large or chooses it. Nothing built is committed: the release is built here, on each tag. A template that changes gets a higher `version` in its `template.json`, so that the app downloads it again.

To build a release locally, with Node 24 or later and nothing installed:

```sh
node scripts/release.mjs . dist v0-local [previous catalogue.json, a path or an address]
```

The CI gives it the latest release's catalogue, so that the earlier versions an older app takes are kept; this repository's first release, v16, has none before it.

## Making one

Spaka's own repository has this one as a submodule, with the commands that check a template, photograph its pages and find its images, and the skill its agents follow to make one. `scripts/release.mjs` is the app's own checks, bundled there: it is not edited here.

## Lint

Biome checks every file with `biome.json`, as Spaka's repository does when it points to a commit here, and as the CI does on each push (`.github/workflows/lint.yml`). Lefthook runs it before each commit on the staged files (`lefthook.yml`), applies its fixes and stages them again; what it cannot fix stops the commit. Spaka's `pnpm install` installs the hook in the submodule; in a clone of this repository alone, run once

```sh
npx lefthook install
```

The hook and the CI use Biome 2.6.6, the version in Spaka's `package.json`: change them together.

Each template's licence is in its `template.json`; its fonts, libraries and images carry their own licences and credits in its folders.
