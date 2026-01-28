# Personal Website (Deployed on GitHub Pages)

A small, interactive personal website (overview, projects, studies, skills + a contact page) built with **Vite + React + TypeScript** and deployed to **GitHub Pages** via GitHub Actions.

## Features

- Responsive layout + light/dark theme toggle
- Sections: Overview, Projects (tag filter), Studies, Skills
- Contact page (opens a prefilled email draft)
- GitHub Pages deployment workflow included

## Getting started (local)

1. Install dependencies:
   - `npm install`
2. Create your local env file:
   - Copy `.env.example` to `.env` (or `.env.local`) and edit values
3. Run the dev server:
   - `npm run dev`
4. Open:
   - Home: `http://localhost:3000/#/`
   - Contact: `http://localhost:3000/#/contact`

## Configure your content

- Edit cards and text in `src/content.ts`.
- Update site URLs and email in `.env`:
  - `VITE_SITE_TITLE`
  - `VITE_PROFILE_IMAGE_URL`
  - `VITE_GITHUB_REPO_URL`
  - `VITE_GITHUB_PROFILE_URL`
  - `VITE_LINKEDIN_URL`
  - `VITE_CONTACT_EMAIL`
  - `VITE_PROFILE_IMAGE_URL`

## .env and “private” variables

This project is a **static** site. Any variable prefixed with `VITE_` is embedded into the browser bundle at build time (so it is **not secret**).

If you need true secrets (API keys), you must use a backend or a third‑party service designed for static sites (or move that feature server-side). For GitHub Actions, you can store values in **Repository Secrets**, but anything used by the client runtime will still be visible in the built output.

## Deploy to GitHub Pages

1. Push to a repository on GitHub (default branch: `main`).
2. In GitHub: **Settings → Pages**
   - Source: **GitHub Actions**
3. Push again (or run the workflow manually).

The workflow lives in `.github/workflows/deploy.yml` and publishes the `dist/` folder.

## Fork / reuse

1. Fork this repo
2. Update `.env` values (do not commit `.env`)
3. Update `src/content.ts` with your own sections
4. Push to `main` to deploy

## License

MIT (see `LICENSE`).
