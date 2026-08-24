# Vincent Ma — Portfolio

Personal portfolio website, live at [www.vincentma.dev](https://www.vincentma.dev).

A single-page site with an animated Vanta/Three.js background and scroll-reveal
sections covering the hero intro, selected work, skills, experience, and contact
details. Built with React and bundled by Vite; deployed on Netlify.

## Tech stack

- React 19
- Vite 8
- Three.js + Vanta for the animated background

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

The dev server prints a local URL (usually http://localhost:5173) — open it in
your browser. Changes to `index.html`, `script.jsx`, or `styles.css` hot-reload
automatically.

## Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Serve the built `dist/` output locally |

## Project structure

```
index.html      # Page markup and all content sections
script.jsx      # React entry point, Vanta background, scroll animations
styles.css      # Global styles
public/         # Static assets served as-is
vite.config.js  # Vite configuration
netlify.toml    # Netlify build settings
```
