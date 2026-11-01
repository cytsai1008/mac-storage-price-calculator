# Mac Storage Price Calculator

See what Apple charges per GB for Mac storage upgrades, and what a given amount of storage costs at that rate.

- Pick a product and storage option; the rate is the upgrade price divided by the GB it adds over the base storage
- USD (Apple US) and TWD (Apple TW) prices
- Prices live in `app/prices.ts`, read from the Apple Store on 2026-11-02

Built with [Nuxt UI](https://ui.nuxt.com).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run generate   # static site in .output/public
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages
(`.github/workflows/deploy.yml`).
