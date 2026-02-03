# Derren Winata | Data Science & Analytics — Portfolio

A responsive single-page portfolio showcasing experience in data science, analytics, and software development. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Hero & About** — Introduction, role highlights, and bio
- **Experience** — Timeline of roles (NUS, AI Singapore, Marina Bay Sands, Medisaya, Firsty.app)
- **Featured case studies** — Impact-focused project summaries
- **Projects** — Technical projects with GitHub links (360Cogni, EQ-5D-5L, Bassline, and more)
- **Skills & certifications** — Tech stack and credentials
- **Contact** — Form with validation and serverless email via Supabase

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix UI), React Router
- **Backend / services:** Supabase (Edge Functions for contact form), Zod for validation

## Getting started

### Prerequisites

- Node.js 18+ and npm (or [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) for installation)

### Install and run locally

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd derren-s-digital-showcase-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

### Other scripts

- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run test` — Run tests

## Deploying

Build the app with `npm run build`. The output is in the `dist/` folder. Deploy that folder to any static host (e.g. Vercel, Netlify, GitHub Pages, or your own server).

## License

Private project. All rights reserved.
