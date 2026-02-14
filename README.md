# Date Night Roulette & Love Notes

A romantic birthday website featuring an interactive date night wheel and heartfelt "Open When..." love notes.

## Quick Start

1. Open `index.html` in your browser - it works directly from the file system
2. Or host on GitHub Pages, Netlify, or any static hosting

## Smoke Tests

Open `tests/smoke-tests.html` in a browser and click **Run smoke tests**.

It runs a small browser suite for:
- Wheel spin and selection rendering
- Plan modal open/close flow
- Note modal open/close flow
- Theme storage persistence
- Filter persistence and reload restoration

## Customization Guide

All content is in the `CONFIG` object at the top of `js/config.js`. The site comes pre-filled with heartfelt messages - you can use them as-is or personalize them further to make them your own.

**Note:** The birthday message, love notes, and date ideas are all written generically enough to work as-is, but they'll be even more meaningful if you add specific memories, inside jokes, and personal details unique to your relationship.

### Personal Info

```javascript
recipientName: "Addison",  // Their name - appears in hero and page title
birthdayMessage: "[Your birthday message here...]",  // Main message on landing page
```

### Date Night Ideas

Each category has 5-7 date ideas. Customize the placeholder text:

```javascript
dateCategories: [
    {
        name: "Cozy Night In",
        icon: "home",
        ideas: [
            {
                text: "[Movie marathon - pick a theme]",  // Replace with your idea
                effort: "low",      // low, medium, or high
                budget: "free",     // free, $, $$, or $$$
                season: "any"       // any, spring, summer, fall, or winter
            },
            // ... more ideas
        ]
    },
    // ... more categories
]
```

Optional plan details (used in the "Plan this date" view):

```javascript
details: {
    duration: "2-3 hours",
    checklist: ["Snacks", "Playlist", "Blankets"],
    note: "Why I picked this"
}
```

**Categories included:**
- Cozy Night In
- Adventure Date
- Foodie Experience
- Creative Date
- Active & Outdoors
- Culture & Arts
- Game Night
- Surprise Me

### Love Notes

Replace the message placeholders with your personal notes:

```javascript
loveNotes: [
    {
        trigger: "when you need encouragement",
        message: "[Write your encouraging message here]"
    },
    // ... 9 more notes
]
```

Bonus note (unlocks after all notes are opened):

```javascript
bonusLoveNote: {
    trigger: "when you've opened every note",
    message: "[Your bonus message here]"
}
```

**Note triggers included:**
1. when you need encouragement
2. when you want to laugh
3. when you miss me
4. when you need a reminder of how loved you are
5. when you're having a rough day
6. when you can't sleep
7. when you're overthinking
8. when you crushed it today
9. when you want to feel adventurous
10. when you need to hear why I chose you

### Easter Egg

There's a secret message revealed by:
- Konami code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
- Or clicking the heart in the footer 5 times quickly

```javascript
easterEggMessage: "[Your secret message here]"
```

## Features

- **Date Night Roulette**: Spin the wheel to randomly select a date category, then browse ideas with filters for effort, budget, and season
- **Pick For Us**: Global pick and per-category picks open a plan view instantly
- **Avoid Repeats + History**: Track recent picks and optionally skip repeats
- **Save Favorites**: Heart any date idea to save it to your favorites (persisted in localStorage)
- **Love Notes**: Click "Open When..." buttons to reveal personalized messages
- **Completion Bonus**: Unlock a bonus note once every note is opened
- **Read Tracking**: Notes show a checkmark after being read
- **Dark Mode**: Toggle between light and dark themes (respects system preference)
- **Mobile Responsive**: Works beautifully on all screen sizes
- **Smooth Animations**: Delightful micro-interactions throughout

## Color Customization

To change the color palette, edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --primary: #7c5cbf;        /* Main purple */
    --primary-light: #a78bdb;  /* Lighter purple */
    --accent: #e8b4bc;         /* Blush rose */
    --accent-warm: #d4a574;    /* Warm gold */
    /* ... more colors */
}
```

## Hosting on GitHub Pages

1. Create a new repository on GitHub
2. Push these files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose `main`
5. Your site will be live at `https://yourusername.github.io/repo-name`

## Migration Note

Favorites and date history are stored in `localStorage`. On first load, any legacy favorites keys are upgraded to the new object format and the history key is created locally. You can clear these at any time from the browser storage panel.

## File Structure

```
addison-birthday/
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── config.js           # CONFIG object + content
│   ├── storage.js          # localStorage helpers + migrations
│   ├── ui-core.js          # UI namespace, modals, DOM cache
│   ├── ui-theme.js         # Theme toggle, valentine overlay
│   ├── ui-wheel.js         # Wheel render, spin, particles
│   ├── ui-filters.js       # Effort/budget/season filters
│   ├── ui-ideas.js         # Ideas panel, history, global pick
│   ├── ui-favorites.js     # Favorites list
│   ├── ui-plan.js          # Plan modal, checklist
│   ├── ui-notes.js         # Love notes grid, progress
│   ├── ui-effects.js       # Confetti, easter egg, Konami
│   └── ui-init.js          # DOMContentLoaded wiring
├── docs/
│   ├── AGENTS.md           # Repository guidelines
│   └── message-archive.md  # Original drafted content
├── tests/
│   └── smoke-tests.html    # Browser smoke tests
├── index.html              # Entry point
├── sw.js                   # Service worker (PWA)
├── manifest.json           # PWA manifest
├── CLAUDE.md               # Claude Code instructions
└── README.md               # This file
```

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No build tools or dependencies required.

---

Made with love.
