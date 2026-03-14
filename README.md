# Co-Arbitrator

Co-Arbitrator is a Next.js web application (work in progress) that provides a landing site and an early implementation of a "Smart Matcher" feature. The landing pages are available now and the Smart Matcher is almost finished — it's accessible in the repo for testing, but the overall project remains under active development.

## What you'll find here

- **Landing pages**: The public-facing pages and marketing site are implemented under the `app/` directory.
- **Smart Matcher**: The matching feature lives under `app/(smart-matcher)` and `app/(smart-matcher)/smart-matcher`. It's mostly complete and available for use, but may change as development continues.
- **Components & UI**: Reusable UI components live in the `components/` and `components/ui/` folders.

## Quick start

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to view the app locally.

## Development notes

- Routes and pages use Next.js App Router under `app/`.
- The Smart Matcher UI and helper components are in `app/(smart-matcher)` and `components/`.
- This repository is actively worked on; expect breaking changes and incomplete features.

## Contributing

If you'd like to help: fork, open a branch, and submit a PR. Please open issues for bugs or feature requests.

## License

This repo does not currently include a license file — add one if you plan to accept contributions.

---

If you'd like, I can run the dev server locally or commit these README changes — tell me which you'd prefer next.
