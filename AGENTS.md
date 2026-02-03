# Repository Guidelines

## Project Structure & Module Organization

- `index.html` holds the page structure, SVG wheel, and modal markup.
- `styles.css` contains all styling, themes, and animations (including dark mode).
- `config.js` contains the `CONFIG` object that drives all content and labels.
- `storage.js` owns localStorage parsing, migrations, and persistence helpers.
- `ui.js` handles DOM rendering, wheel logic, modals, and event wiring.
- `message-archive.md` keeps the original drafted content for reference.
- `README.md` and `CLAUDE.md` document customization and architecture details.

## Build, Test, and Development Commands

This is a static site with no build step or dependencies.

- Open `index.html` directly in a browser for the fastest preview.
- Optional local server (for stricter browser security rules):
  - `python -m http.server 8000` (then open `http://localhost:8000`)

## Coding Style & Naming Conventions

- Indentation: 4 spaces in HTML, CSS, and JS.
- JavaScript: `const`/`let`, camelCase identifiers, and readable inline object literals.
- CSS: kebab-case class names, CSS custom properties in `:root` for theme tokens.
- Keep content edits inside the `CONFIG` object in `config.js` whenever possible.

## Testing Guidelines

There are no automated tests. Do a quick manual pass after changes:

- Load the page and spin the date wheel.
- Open a few "Open When..." notes and confirm read markers persist on refresh.
- Toggle dark mode and verify contrast.

## Commit & Pull Request Guidelines

- Commit messages in history use short, imperative, sentence-case phrasing (e.g., "Add message archive..."). Follow that style.
- PRs should include:
  - A brief summary of what changed.
  - Manual testing notes (what you clicked/verified).
  - Screenshots or a short GIF for visual changes.

## Configuration & Data Notes

- No secrets or API keys are used; content is embedded in `config.js`.
- User state (favorites, read notes, theme) is stored in `localStorage`.
