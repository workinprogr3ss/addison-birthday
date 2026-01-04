/* ==========================================================================
   Date Night Roulette & Love Notes - JavaScript

   CUSTOMIZATION GUIDE:
   Edit the CONFIG object below to personalize the website.
   All placeholder text is marked with [brackets] for easy identification.
   ========================================================================== */

// ==========================================================================
// CONFIGURATION - Edit this section to personalize your website
// ==========================================================================

const CONFIG = {
    // -------------------------------------------------------------------------
    // Personal Info
    // -------------------------------------------------------------------------
    recipientName: "Addison",
    birthdayMessage: "Happy birthday! Another year older, another year of putting up with me. I made this to help us pick our next adventure, and to tell you things I don't say enough. Let's make this year count.",

    // -------------------------------------------------------------------------
    // Date Night Categories
    // Each category appears on the wheel. Add 5-7 ideas per category.
    // Effort: "low", "medium", "high"
    // Budget: "free", "$", "$$", "$$$"
    // Season: "any", "spring", "summer", "fall", "winter"
    // -------------------------------------------------------------------------
    dateCategories: [
        {
            name: "Cozy Night In",
            icon: "home",
            ideas: [
                { text: "Studio Ghibli marathon with homemade popcorn and blanket nest", effort: "low", budget: "free", season: "any" },
                { text: "Cook a new recipe together - Italian pasta from scratch", effort: "medium", budget: "$", season: "any" },
                { text: "Build a blanket fort and read our favorite books to each other", effort: "low", budget: "free", season: "winter" },
                { text: "Spa night with face masks, candles, and shoulder massages", effort: "low", budget: "$", season: "any" },
                { text: "Board game tournament - loser makes breakfast tomorrow", effort: "low", budget: "free", season: "any" },
                { text: "Bake something ambitious together - croissants or a layer cake", effort: "medium", budget: "$", season: "any" }
            ]
        },
        {
            name: "Adventure Date",
            icon: "compass",
            ideas: [
                { text: "Sunrise hike to catch golden hour - bring coffee in a thermos", effort: "high", budget: "free", season: "summer" },
                { text: "Spontaneous road trip - pick a direction and drive for 2 hours", effort: "medium", budget: "$$", season: "any" },
                { text: "Kayaking or paddleboarding - pack sandwiches for a water picnic", effort: "medium", budget: "$$", season: "summer" },
                { text: "Geocaching treasure hunt through the city", effort: "medium", budget: "free", season: "any" },
                { text: "Take a scenic train to a small town we've never explored", effort: "low", budget: "$$", season: "fall" },
                { text: "Drive somewhere dark for stargazing - bring blankets and hot cocoa", effort: "low", budget: "free", season: "any" }
            ]
        },
        {
            name: "Foodie Experience",
            icon: "utensils",
            ideas: [
                { text: "Finally try that restaurant we keep saying we'll go to", effort: "low", budget: "$$$", season: "any" },
                { text: "Food truck crawl - three trucks, three neighborhoods, one perfect day", effort: "medium", budget: "$$", season: "summer" },
                { text: "Farmers market morning - buy ingredients, cook lunch together", effort: "low", budget: "$", season: "spring" },
                { text: "Take a cooking class together - pasta making or sushi rolling", effort: "medium", budget: "$$", season: "any" },
                { text: "Progressive dinner - appetizers, main, and dessert at three different spots", effort: "medium", budget: "$$$", season: "any" },
                { text: "Sunset picnic at our favorite spot with homemade everything", effort: "medium", budget: "$", season: "summer" }
            ]
        },
        {
            name: "Creative Date",
            icon: "palette",
            ideas: [
                { text: "Paint night at home - same subject, different interpretations", effort: "low", budget: "$$", season: "any" },
                { text: "Pottery class - make mugs for each other's morning coffee", effort: "medium", budget: "$$", season: "any" },
                { text: "Write letters to our future selves to open next year", effort: "low", budget: "free", season: "any" },
                { text: "Create a scrapbook of our favorite memories together", effort: "medium", budget: "$", season: "any" },
                { text: "Photography walk - take portraits of each other in golden hour", effort: "low", budget: "free", season: "any" },
                { text: "Candle making class - create scents that remind us of each other", effort: "medium", budget: "$$", season: "winter" }
            ]
        },
        {
            name: "Active & Outdoors",
            icon: "mountain",
            ideas: [
                { text: "Bike ride on a scenic trail with a coffee stop halfway", effort: "medium", budget: "free", season: "spring" },
                { text: "Rock climbing gym", effort: "high", budget: "$$", season: "any" },
                { text: "Beach day", effort: "low", budget: "$", season: "summer" },
                { text: "Ice skating followed by hot chocolate and people watching", effort: "medium", budget: "$", season: "winter" },
                { text: "Learn pickleball together", effort: "medium", budget: "$", season: "any" },
                { text: "Sunrise yoga in the park, then brunch at our favorite cafe", effort: "low", budget: "free", season: "summer" }
            ]
        },
        {
            name: "Culture & Arts",
            icon: "ticket",
            ideas: [
                { text: "Spend a whole afternoon getting lost in a museum together", effort: "low", budget: "$", season: "any" },
                { text: "Live theater or comedy show", effort: "low", budget: "$$", season: "any" },
                { text: "Local concert or outdoor music", effort: "low", budget: "$$", season: "summer" },
                { text: "Bookstore date - pick out books for each other to read", effort: "low", budget: "$", season: "any" },
                { text: "Art gallery opening with wine and pretending to be sophisticated", effort: "low", budget: "free", season: "any" },
            ]
        },
        {
            name: "Game Night",
            icon: "dice",
            ideas: [
                { text: "Two-player board game marathon with themed snacks", effort: "low", budget: "free", season: "any" },
                { text: "Video game co-op night - beat that game we started months ago", effort: "low", budget: "free", season: "any" },
                { text: "Escape room challenge - put our teamwork to the ultimate test", effort: "medium", budget: "$$", season: "any" },
                { text: "Retro arcade or bowling - compete for bragging rights", effort: "low", budget: "$$", season: "any" },
                { text: "Mini golf tournament - loser plans the next date", effort: "low", budget: "$", season: "summer" },
                { text: "Card game tournament with silly stakes and good music", effort: "low", budget: "free", season: "any" }
            ]
        },
        {
            name: "Surprise Me",
            icon: "sparkles",
            ideas: [
                { text: "Flip a coin at every intersection until we find somewhere perfect", effort: "medium", budget: "free", season: "any" },
                { text: "Random restaurant roulette", effort: "low", budget: "$$", season: "any" },
                { text: "Each plan half the date secretly", effort: "medium", budget: "$$", season: "any" },
                { text: "Say yes to everything day", effort: "medium", budget: "$$", season: "any" },
                { text: "Recreate our first date, but make it even better this time", effort: "medium", budget: "$$", season: "any" },
                { text: "Thrift store challenge - find the perfect weird gift for each other", effort: "low", budget: "$", season: "any" }
            ]
        }
    ],

    // -------------------------------------------------------------------------
    // Love Notes - "Open When..." messages
    // Write personal messages for each trigger
    // -------------------------------------------------------------------------
    loveNotes: [
        {
            trigger: "when you need encouragement",
            message: "You've handled 100% of your bad days so far. That's a pretty good track record. This one's no different. I'm here, and I believe in you."
        },
        {
            trigger: "when you want to laugh",
            message: "Remember when we laughed so hard we couldn't breathe? Let's do that again soon. Your laugh is still my favorite sound."
        },
        {
            trigger: "when you miss me",
            message: "\"In true love, the smallest distance is too great, and the greatest distance can be bridged.\" - Hans Nouwens. Miss you too. See you soon."
        },
        {
            trigger: "when you need a reminder of how loved you are",
            message: "I love the way you get excited about things. I love how you make me laugh. I love how you are exactly yourself. That's it. That's the message."
        },
        {
            trigger: "when you're having a rough day",
            message: "Bad days end. This feeling is temporary. Be kind to yourself today - you deserve it. Tomorrow's a new day."
        },
        {
            trigger: "when you can't sleep",
            message: "\"The night is darkest just before the dawn.\" - Harvey Dent. But also: counting sheep is overrated. Try thinking about that ridiculous thing that made us laugh yesterday."
        },
        {
            trigger: "when you're overthinking",
            message: "Stop. Breathe. You don't need to figure everything out tonight. Some things work out, some don't. Either way, we're good."
        },
        {
            trigger: "when you crushed it today",
            message: "TOLD YOU. Proud of you. You worked hard for this and you earned it. Now celebrate - you deserve it."
        },
        {
            trigger: "when you want to feel adventurous",
            message: "\"Twenty years from now you'll be more disappointed by the things you didn't do.\" - Mark Twain. So what adventure are we doing next? Say the word."
        },
        {
            trigger: "when you need to hear why I chose you",
            message: "Because you're you. Because you make regular days better. Because I'm myself around you. Because I want to. Simple as that."
        }
    ],

    // -------------------------------------------------------------------------
    // Easter Egg - Secret message revealed by Konami code or heart clicks
    // -------------------------------------------------------------------------
    easterEggMessage: "You found it! Here's the truth: you make everything better. The regular stuff, the hard stuff, all of it. Thanks for being you, and for choosing me. Here's to many more adventures together."
};

// ==========================================================================
// Helper: Create SVG Elements
// ==========================================================================

function createHeartSVG(filled, size) {
    filled = filled || false;
    size = size || 18;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', filled ? 'currentColor' : 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    svg.appendChild(path);

    return svg;
}

function createCheckSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '3');

    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '20,6 9,17 4,12');
    svg.appendChild(polyline);

    return svg;
}

function createCloseSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '18');
    line1.setAttribute('y1', '6');
    line1.setAttribute('x2', '6');
    line1.setAttribute('y2', '18');
    svg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '6');
    line2.setAttribute('y1', '6');
    line2.setAttribute('x2', '18');
    line2.setAttribute('y2', '18');
    svg.appendChild(line2);

    return svg;
}

// Icon factory for category icons
function getCategoryIcon(iconName) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'ideas-icon';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');

    const iconPaths = {
        home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
        compass: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'],
        utensils: ['M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2', 'M7 2v20', 'M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z', 'M21 15v7'],
        palette: ['M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z'],
        mountain: ['M8 3l4 8 5-5 5 15H2L8 3z'],
        ticket: ['M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z', 'M13 5v2', 'M13 17v2', 'M13 11v2'],
        dice: ['M3 3h18v18H3z', 'M16 8h.01', 'M12 12h.01', 'M8 16h.01'],
        sparkles: ['M12 3l-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z', 'M5 3v4', 'M19 17v4', 'M3 5h4', 'M17 19h4']
    };

    var paths = iconPaths[iconName] || iconPaths.sparkles;
    paths.forEach(function(d) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        svg.appendChild(path);
    });

    iconContainer.appendChild(svg);
    return iconContainer;
}

// ==========================================================================
// Theme Management
// ==========================================================================

function initTheme() {
    var savedTheme = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ==========================================================================
// Particles Background
// ==========================================================================

function initParticles() {
    var container = document.getElementById('particles');
    var particleCount = 30;

    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ==========================================================================
// Roulette Wheel
// ==========================================================================

var currentRotation = 0;
var isSpinning = false;
var selectedCategory = null;

var wheelColors = [
    '#7c5cbf', '#a78bdb', '#e8b4bc', '#d4a574',
    '#7c5cbf', '#a78bdb', '#e8b4bc', '#d4a574'
];

function renderWheel() {
    var wheel = document.getElementById('wheel');
    var categories = CONFIG.dateCategories;
    var segmentAngle = 360 / categories.length;
    var wheelRadius = 150; // Half of wheel width
    var labelRadius = 100; // Distance from center for labels

    // Create visual conic-gradient based on categories
    var gradientStops = categories.map(function(cat, i) {
        var startAngle = i * segmentAngle;
        var endAngle = (i + 1) * segmentAngle;
        return wheelColors[i] + ' ' + startAngle + 'deg ' + endAngle + 'deg';
    }).join(', ');

    wheel.style.background = 'conic-gradient(' + gradientStops + ')';

    // Clear existing content
    while (wheel.firstChild) {
        wheel.removeChild(wheel.firstChild);
    }

    // Create labels container
    var labelsContainer = document.createElement('div');
    labelsContainer.className = 'wheel-labels';

    // Add segment labels positioned around the wheel
    categories.forEach(function(cat, i) {
        // Calculate angle for center of this segment (in radians)
        // Offset by -90 degrees so 0 starts at top
        var angleDeg = (i * segmentAngle) + (segmentAngle / 2) - 90;
        var angleRad = angleDeg * (Math.PI / 180);

        // Calculate position using polar coordinates
        var x = Math.cos(angleRad) * labelRadius;
        var y = Math.sin(angleRad) * labelRadius;

        var text = document.createElement('span');
        text.className = 'wheel-segment-text';
        text.textContent = cat.name;

        // Position label and rotate it to align with segment
        // Add 90 to rotation so text reads from outside toward center
        var rotation = angleDeg + 90;
        text.style.transform = 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px) rotate(' + rotation + 'deg)';

        labelsContainer.appendChild(text);
    });

    wheel.appendChild(labelsContainer);
}

function spinWheel() {
    if (isSpinning) return;

    var wheel = document.getElementById('wheel');
    var spinBtn = document.getElementById('spin-btn');
    var categories = CONFIG.dateCategories;
    var segmentAngle = 360 / categories.length;

    isSpinning = true;
    spinBtn.disabled = true;

    // Random number of full rotations (3-5) plus random final position
    var fullRotations = 3 + Math.floor(Math.random() * 3);
    var randomSegment = Math.floor(Math.random() * categories.length);
    var segmentOffset = randomSegment * segmentAngle + segmentAngle / 2;

    // Calculate final rotation (we need to account for the pointer at top)
    var finalRotation = currentRotation + (fullRotations * 360) + (360 - segmentOffset);

    wheel.style.transform = 'rotate(' + finalRotation + 'deg)';
    currentRotation = finalRotation;

    // After spin completes, show ideas
    setTimeout(function() {
        isSpinning = false;
        spinBtn.disabled = false;
        selectedCategory = categories[randomSegment];
        showDateIdeas(selectedCategory);
    }, 4000);
}

function showDateIdeas(category) {
    var panel = document.getElementById('ideas-panel');
    var currentFilters = getCurrentFilters();
    var filteredIdeas = filterIdeas(category.ideas, currentFilters);
    var favorites = getFavorites();

    // Clear panel
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }

    // Create header
    var header = document.createElement('div');
    header.className = 'ideas-header';

    var iconContainer = getCategoryIcon(category.icon);
    header.appendChild(iconContainer);

    var categoryTitle = document.createElement('h3');
    categoryTitle.className = 'ideas-category';
    categoryTitle.textContent = category.name;
    header.appendChild(categoryTitle);

    panel.appendChild(header);

    // Create ideas list
    var list = document.createElement('div');
    list.className = 'ideas-list';

    if (filteredIdeas.length === 0) {
        var placeholder = document.createElement('div');
        placeholder.className = 'ideas-placeholder';
        var placeholderText = document.createElement('p');
        placeholderText.textContent = 'No ideas match your filters. Try adjusting them!';
        placeholder.appendChild(placeholderText);
        list.appendChild(placeholder);
    } else {
        filteredIdeas.forEach(function(idea, index) {
            var ideaId = category.name + '-' + index;
            var isFavorited = favorites.indexOf(ideaId) !== -1;

            var item = document.createElement('div');
            item.className = 'idea-item';

            var textSpan = document.createElement('span');
            textSpan.className = 'idea-text';
            textSpan.textContent = idea.text;
            item.appendChild(textSpan);

            var meta = document.createElement('div');
            meta.className = 'idea-meta';

            var effortTag = document.createElement('span');
            effortTag.className = 'idea-tag';
            effortTag.textContent = idea.effort;
            meta.appendChild(effortTag);

            var budgetTag = document.createElement('span');
            budgetTag.className = 'idea-tag';
            budgetTag.textContent = idea.budget;
            meta.appendChild(budgetTag);

            var seasonTag = document.createElement('span');
            seasonTag.className = 'idea-tag';
            seasonTag.textContent = idea.season;
            meta.appendChild(seasonTag);

            var favBtn = document.createElement('button');
            favBtn.className = 'idea-favorite' + (isFavorited ? ' favorited' : '');
            favBtn.setAttribute('aria-label', 'Save to favorites');
            favBtn.appendChild(createHeartSVG(isFavorited));
            (function(id, txt) {
                favBtn.addEventListener('click', function() { toggleFavorite(id, txt); });
            })(ideaId, idea.text);
            meta.appendChild(favBtn);

            item.appendChild(meta);
            list.appendChild(item);
        });
    }

    panel.appendChild(list);
}

function getCurrentFilters() {
    var filters = {
        effort: 'all',
        budget: 'all',
        season: 'all'
    };

    document.querySelectorAll('.filter-chip.active').forEach(function(chip) {
        filters[chip.dataset.filter] = chip.dataset.value;
    });

    return filters;
}

function filterIdeas(ideas, filters) {
    return ideas.filter(function(idea) {
        var matchesEffort = filters.effort === 'all' || idea.effort === filters.effort;
        var matchesBudget = filters.budget === 'all' || idea.budget === filters.budget;
        var matchesSeason = filters.season === 'all' || idea.season === filters.season || idea.season === 'any';
        return matchesEffort && matchesBudget && matchesSeason;
    });
}

function initFilters() {
    document.querySelectorAll('.filter-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            // Deactivate siblings in same group
            var group = chip.closest('.filter-group');
            group.querySelectorAll('.filter-chip').forEach(function(c) { c.classList.remove('active'); });
            chip.classList.add('active');

            // Re-render ideas if category is selected
            if (selectedCategory) {
                showDateIdeas(selectedCategory);
            }
        });
    });
}

// ==========================================================================
// Favorites Management
// ==========================================================================

function getFavorites() {
    var saved = localStorage.getItem('dateFavorites');
    return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('dateFavorites', JSON.stringify(favorites));
}

function toggleFavorite(ideaId, ideaText) {
    var favorites = getFavorites();
    var index = favorites.indexOf(ideaId);

    if (index === -1) {
        favorites.push(ideaId);
        // Store the text too
        var texts = JSON.parse(localStorage.getItem('favoriteTexts') || '{}');
        texts[ideaId] = ideaText;
        localStorage.setItem('favoriteTexts', JSON.stringify(texts));
    } else {
        favorites.splice(index, 1);
    }

    saveFavorites(favorites);

    if (selectedCategory) {
        showDateIdeas(selectedCategory);
    }

    renderFavorites();
}

function renderFavorites() {
    var favorites = getFavorites();
    var texts = JSON.parse(localStorage.getItem('favoriteTexts') || '{}');
    var section = document.getElementById('favorites-section');
    var list = document.getElementById('favorites-list');

    if (favorites.length === 0) {
        section.classList.remove('has-favorites');
        return;
    }

    section.classList.add('has-favorites');

    // Clear list
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    favorites.forEach(function(id) {
        var item = document.createElement('div');
        item.className = 'favorite-item';

        var textSpan = document.createElement('span');
        textSpan.textContent = texts[id] || id;
        item.appendChild(textSpan);

        var removeBtn = document.createElement('button');
        removeBtn.className = 'favorite-remove';
        removeBtn.setAttribute('aria-label', 'Remove from favorites');
        removeBtn.appendChild(createCloseSVG());
        (function(favId) {
            removeBtn.addEventListener('click', function() { toggleFavorite(favId); });
        })(id);
        item.appendChild(removeBtn);

        list.appendChild(item);
    });
}

// ==========================================================================
// Love Notes
// ==========================================================================

function renderNotes() {
    var grid = document.getElementById('notes-grid');
    var readNotes = getReadNotes();

    // Clear grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    CONFIG.loveNotes.forEach(function(note, index) {
        var button = document.createElement('button');
        button.className = 'note-button' + (readNotes.indexOf(index) !== -1 ? ' read' : '');

        var label = document.createElement('span');
        label.className = 'note-label';
        label.textContent = 'Open';
        button.appendChild(label);

        var triggerText = document.createElement('span');
        triggerText.className = 'note-trigger-text';
        triggerText.textContent = note.trigger;
        button.appendChild(triggerText);

        var indicator = document.createElement('span');
        indicator.className = 'note-read-indicator';
        indicator.appendChild(createCheckSVG());
        button.appendChild(indicator);

        (function(idx) {
            button.addEventListener('click', function() { openNote(idx); });
        })(index);
        grid.appendChild(button);
    });

    updateResetButtonVisibility();
}

function getReadNotes() {
    var saved = localStorage.getItem('readNotes');
    return saved ? JSON.parse(saved) : [];
}

function markNoteAsRead(index) {
    var readNotes = getReadNotes();
    if (readNotes.indexOf(index) === -1) {
        readNotes.push(index);
        localStorage.setItem('readNotes', JSON.stringify(readNotes));
    }
}

function openNote(index) {
    var note = CONFIG.loveNotes[index];
    var modal = document.getElementById('note-modal');
    var trigger = document.getElementById('modal-trigger');
    var message = document.getElementById('modal-message');

    trigger.textContent = 'Open ' + note.trigger;
    message.textContent = note.message;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    markNoteAsRead(index);
    renderNotes();
}

function closeNoteModal() {
    var modal = document.getElementById('note-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function initNoteModal() {
    var modal = document.getElementById('note-modal');
    var closeBtn = modal.querySelector('.note-close');
    var backdrop = modal.querySelector('.note-modal-backdrop');

    closeBtn.addEventListener('click', closeNoteModal);
    backdrop.addEventListener('click', closeNoteModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeNoteModal();
        }
    });
}

function updateResetButtonVisibility() {
    var readNotes = getReadNotes();
    var container = document.getElementById('notes-reset-container');
    if (readNotes.length > 0) {
        container.classList.add('has-read');
    } else {
        container.classList.remove('has-read');
    }
}

function resetReadNotes() {
    localStorage.removeItem('readNotes');
    renderNotes();
    updateResetButtonVisibility();
}

function initResetButton() {
    var resetBtn = document.getElementById('notes-reset-btn');
    resetBtn.addEventListener('click', resetReadNotes);
    updateResetButtonVisibility();
}

// ==========================================================================
// Easter Egg
// ==========================================================================

var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
var konamiIndex = 0;
var heartClickCount = 0;
var heartClickTimer = null;

function initKonamiCode() {
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                revealEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function initHeartClick() {
    var heart = document.getElementById('easter-egg-trigger');

    heart.addEventListener('click', function() {
        heartClickCount++;

        clearTimeout(heartClickTimer);
        heartClickTimer = setTimeout(function() {
            heartClickCount = 0;
        }, 1000);

        if (heartClickCount >= 5) {
            revealEasterEgg();
            heartClickCount = 0;
        }
    });
}

function revealEasterEgg() {
    var modal = document.getElementById('easter-egg-modal');
    var message = document.getElementById('easter-egg-message');
    var confettiContainer = document.getElementById('confetti');

    message.textContent = CONFIG.easterEggMessage;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Clear existing confetti
    while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
    }

    // Create confetti
    var colors = ['#7c5cbf', '#a78bdb', '#e8b4bc', '#d4a574', '#4a9d6e'];

    for (var i = 0; i < 50; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random()) + 's';
        confettiContainer.appendChild(confetti);
    }
}

function closeEasterEgg() {
    var modal = document.getElementById('easter-egg-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function initEasterEggModal() {
    var modal = document.getElementById('easter-egg-modal');
    var closeBtn = modal.querySelector('.easter-egg-close');
    var backdrop = modal.querySelector('.easter-egg-backdrop');

    closeBtn.addEventListener('click', closeEasterEgg);
    backdrop.addEventListener('click', closeEasterEgg);
}

// ==========================================================================
// Populate Page Content
// ==========================================================================

function populateContent() {
    document.getElementById('recipient-name').textContent = CONFIG.recipientName;
    document.getElementById('birthday-message').textContent = CONFIG.birthdayMessage;
    document.title = 'Happy Birthday, ' + CONFIG.recipientName;
}

// ==========================================================================
// Smooth Scroll for Navigation
// ==========================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Initialize Everything
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Theme
    initTheme();
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Populate content
    populateContent();

    // Visual effects
    initParticles();

    // Roulette
    renderWheel();
    document.getElementById('spin-btn').addEventListener('click', spinWheel);
    initFilters();
    renderFavorites();

    // Love Notes
    renderNotes();
    initNoteModal();
    initResetButton();

    // Easter Egg
    initKonamiCode();
    initHeartClick();
    initEasterEggModal();

    // Navigation
    initSmoothScroll();
});
