# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

Pure HTML5, CSS3, and Vanilla JavaScript. No build tools, npm, or external dependencies.

## Development

Open `index.html` directly in a browser, or use any local server:
```bash
python -m http.server 8000
```

## Architecture

### CONFIG-Driven Content (script.js)

All dynamic content lives in the `CONFIG` object at the top of `script.js`:
- `recipientName` - Personalization throughout the site
- `birthdayMessage` - Hero section greeting
- `dateCategories` - 8 categories, each with 5-7 date ideas (includes effort/budget/season metadata)
- `loveNotes` - 10 "Open When..." trigger-message pairs
- `easterEggMessage` - Secret message (Konami code or 5 footer heart clicks)

### Theming (styles.css)

CSS custom properties control the color palette:
```css
:root {
    --primary: #7c5cbf;        /* Main purple */
    --accent: #e8b4bc;         /* Blush rose */
}
```
Dark mode uses `.dark-mode` class with alternate property values.

### State Persistence

localStorage stores:
- Favorite date ideas
- Love note read/unread states
- Theme preference (light/dark)

## Key Interactive Features

| Feature | Location | Notes |
|---------|----------|-------|
| Date Night Wheel | SVG in index.html, logic in script.js | Spin animation + category reveal |
| Filtering | script.js | effort (low/med/high), budget (free/$/$$/$$), season |
| Favorites | script.js | Heart toggle, persisted in localStorage |
| Love Notes | Modal in index.html, script.js | Read tracking with checkmarks |
| Easter Egg | script.js | Konami code OR 5 rapid footer heart clicks → confetti |

## File Structure

- `index.html` (154 lines) - Semantic structure, SVG wheel, modals
- `styles.css` (1,222 lines) - Theming, responsive layout, animations
- `script.js` (877 lines) - CONFIG object + all interactivity
