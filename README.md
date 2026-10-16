# YUFLOTO Photography

Current static photography website: Home, Meet Yui, Portfolio, Blog, Pricing and Contact.

## Run locally

Serve `dist/` with any static server, for example:

```sh
python3 -m http.server 8080 --directory dist
```

## Validation

```sh
node scripts/check.mjs
```

## Hosting

Publish `dist/` as the site root. There is no build step or package installation. The site uses root-relative URLs and expects to be served at a domain root. A GitHub Pages project URL under `/yuflotophotography/` requires a base-path adjustment before publication.

Contact prepares an email draft; no server or database is required. Web fonts and their license are included in `dist/assets/`. Original photo source folders and local review screenshots are not part of this export.
