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
  birthdayMessage:
    "Happy birthday! Another year older, another year of putting up with me. I made this to help us pick our next adventure, and to tell you things I don't say enough. Let's make this year count.",

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
        {
          id: "cozy-ghibli-marathon",
          text: "Studio Ghibli marathon with homemade popcorn and blanket nest",
          effort: "low",
          budget: "free",
          season: "any",
        },
        {
          id: "cozy-italian-pasta",
          text: "Cook a new recipe together - Italian pasta from scratch",
          effort: "medium",
          budget: "$",
          season: "any",
        },
        {
          id: "cozy-blanket-fort",
          text: "Build a blanket fort and read our favorite books to each other",
          effort: "low",
          budget: "free",
          season: "winter",
        },
        {
          id: "cozy-spa-night",
          text: "Spa night with face masks, candles, and shoulder massages",
          effort: "low",
          budget: "$",
          season: "any",
        },
        {
          id: "cozy-board-game-tournament",
          text: "Board game tournament - loser makes breakfast tomorrow",
          effort: "low",
          budget: "free",
          season: "any",
        },
        {
          id: "cozy-bake-ambitious",
          text: "Bake something ambitious together - croissants or a layer cake",
          effort: "medium",
          budget: "$",
          season: "any",
        },
      ],
    },
    {
      name: "Adventure Date",
      icon: "compass",
      ideas: [
        {
          id: "adventure-sunrise-hike",
          text: "Sunrise hike to catch golden hour - bring coffee in a thermos",
          effort: "high",
          budget: "free",
          season: "summer",
        },
        {
          id: "adventure-road-trip",
          text: "Spontaneous road trip - pick a direction and drive for 2 hours",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "adventure-kayak-paddle",
          text: "Kayaking or paddleboarding - pack sandwiches for a water picnic",
          effort: "medium",
          budget: "$$",
          season: "summer",
        },
        {
          id: "adventure-geocaching",
          text: "Geocaching treasure hunt through the city",
          effort: "medium",
          budget: "free",
          season: "any",
        },
        {
          id: "adventure-scenic-train",
          text: "Take a scenic train to a small town we've never explored",
          effort: "low",
          budget: "$$",
          season: "fall",
        },
        {
          id: "adventure-stargazing-drive",
          text: "Drive somewhere dark for stargazing - bring blankets and hot cocoa",
          effort: "low",
          budget: "free",
          season: "any",
        },
      ],
    },
    {
      name: "Foodie Experience",
      icon: "utensils",
      ideas: [
        {
          id: "foodie-try-restaurant",
          text: "Finally try that restaurant we keep saying we'll go to",
          effort: "low",
          budget: "$$$",
          season: "any",
        },
        {
          id: "foodie-food-truck-crawl",
          text: "Food truck crawl - three trucks, three neighborhoods, one perfect day",
          effort: "medium",
          budget: "$$",
          season: "summer",
        },
        {
          id: "foodie-farmers-market",
          text: "Farmers market morning - buy ingredients, cook lunch together",
          effort: "low",
          budget: "$",
          season: "spring",
        },
        {
          id: "foodie-cooking-class",
          text: "Take a cooking class together - pasta making or sushi rolling",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "foodie-progressive-dinner",
          text: "Progressive dinner - appetizers, main, and dessert at three different spots",
          effort: "medium",
          budget: "$$$",
          season: "any",
        },
        {
          id: "foodie-sunset-picnic",
          text: "Sunset picnic at our favorite spot with homemade everything",
          effort: "medium",
          budget: "$",
          season: "summer",
        },
      ],
    },
    {
      name: "Creative Date",
      icon: "palette",
      ideas: [
        {
          id: "creative-paint-night",
          text: "Paint night at home - same subject, different interpretations",
          effort: "low",
          budget: "$$",
          season: "any",
        },
        {
          id: "creative-pottery-class",
          text: "Pottery class - make mugs for each other's morning coffee",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "creative-future-letters",
          text: "Write letters to our future selves to open next year",
          effort: "low",
          budget: "free",
          season: "any",
        },
        {
          id: "creative-scrapbook",
          text: "Create a scrapbook of our favorite memories together",
          effort: "medium",
          budget: "$",
          season: "any",
        },
        {
          id: "creative-photo-walk",
          text: "Photography walk - take portraits of each other in golden hour",
          effort: "low",
          budget: "free",
          season: "any",
        },
        {
          id: "creative-candle-making",
          text: "Candle making class - create scents that remind us of each other",
          effort: "medium",
          budget: "$$",
          season: "winter",
        },
      ],
    },
    {
      name: "Active & Outdoors",
      icon: "mountain",
      ideas: [
        {
          id: "active-bike-trail",
          text: "Bike ride on a scenic trail with a coffee stop halfway",
          effort: "medium",
          budget: "free",
          season: "spring",
        },
        {
          id: "active-rock-climbing",
          text: "Rock climbing gym",
          effort: "high",
          budget: "$$",
          season: "any",
        },
        {
          id: "active-beach-day",
          text: "Beach day",
          effort: "low",
          budget: "$",
          season: "summer",
        },
        {
          id: "active-ice-skating",
          text: "Ice skating followed by hot chocolate and people watching",
          effort: "medium",
          budget: "$",
          season: "winter",
        },
        {
          id: "active-pickleball",
          text: "Learn pickleball together",
          effort: "medium",
          budget: "$",
          season: "any",
        },
        {
          id: "active-sunrise-yoga",
          text: "Sunrise yoga in the park, then brunch at our favorite cafe",
          effort: "low",
          budget: "free",
          season: "summer",
        },
      ],
    },
    {
      name: "Culture & Arts",
      icon: "ticket",
      ideas: [
        {
          id: "culture-museum-afternoon",
          text: "Spend a whole afternoon getting lost in a museum together",
          effort: "low",
          budget: "$",
          season: "any",
        },
        {
          id: "culture-theater-comedy",
          text: "Live theater or comedy show",
          effort: "low",
          budget: "$$",
          season: "any",
        },
        {
          id: "culture-local-concert",
          text: "Local concert or outdoor music",
          effort: "low",
          budget: "$$",
          season: "summer",
        },
        {
          id: "culture-bookstore-date",
          text: "Bookstore date - pick out books for each other to read",
          effort: "low",
          budget: "$",
          season: "any",
        },
        {
          id: "culture-gallery-opening",
          text: "Art gallery opening with wine and pretending to be sophisticated",
          effort: "low",
          budget: "free",
          season: "any",
        },
      ],
    },
    {
      name: "Game Night",
      icon: "dice",
      ideas: [
        {
          id: "game-two-player-marathon",
          text: "Two-player board game marathon with themed snacks",
          effort: "low",
          budget: "free",
          season: "any",
        },
        {
          id: "game-coop-night",
          text: "Video game co-op night - beat that game we started months ago",
          effort: "low",
          budget: "free",
          season: "any",
        },
        {
          id: "game-escape-room",
          text: "Escape room challenge - put our teamwork to the ultimate test",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "game-arcade-bowling",
          text: "Retro arcade or bowling - compete for bragging rights",
          effort: "low",
          budget: "$$",
          season: "any",
        },
        {
          id: "game-mini-golf",
          text: "Mini golf tournament - loser plans the next date",
          effort: "low",
          budget: "$",
          season: "summer",
        },
        {
          id: "game-card-tournament",
          text: "Card game tournament with silly stakes and good music",
          effort: "low",
          budget: "free",
          season: "any",
        },
      ],
    },
    {
      name: "Surprise Me",
      icon: "sparkles",
      ideas: [
        {
          id: "surprise-coin-flip",
          text: "Flip a coin at every intersection until we find somewhere perfect",
          effort: "medium",
          budget: "free",
          season: "any",
        },
        {
          id: "surprise-restaurant-roulette",
          text: "Random restaurant roulette",
          effort: "low",
          budget: "$$",
          season: "any",
        },
        {
          id: "surprise-half-secret",
          text: "Each plan half the date secretly",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "surprise-say-yes",
          text: "Say yes to everything day",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "surprise-first-date",
          text: "Recreate our first date, but make it even better this time",
          effort: "medium",
          budget: "$$",
          season: "any",
        },
        {
          id: "surprise-thrift-challenge",
          text: "Thrift store challenge - find the perfect weird gift for each other",
          effort: "low",
          budget: "$",
          season: "any",
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // Love Notes - "Open When..." messages
  // Write personal messages for each trigger
  // -------------------------------------------------------------------------
  loveNotes: [
    {
      trigger: "when you need encouragement",
      message:
        "You've handled 100% of your bad days so far. That's a pretty good track record. This one's no different. I'm here, and I believe in you.",
    },
    {
      trigger: "when you want to laugh",
      message:
        "Remember when we laughed so hard we couldn't breathe? Let's do that again soon. Your laugh is still my favorite sound.",
    },
    {
      trigger: "when you miss me",
      message:
        '"In true love, the smallest distance is too great, and the greatest distance can be bridged." - Hans Nouwens. Miss you too. See you soon.',
    },
    {
      trigger: "when you need a reminder of how loved you are",
      message:
        "I love the way you get excited about things. I love how you make me laugh. I love how you are exactly yourself. That's it. That's the message.",
    },
    {
      trigger: "when you're having a rough day",
      message:
        "Bad days end. This feeling is temporary. Be kind to yourself today - you deserve it. Tomorrow's a new day.",
    },
    {
      trigger: "when you can't sleep",
      message:
        '"The night is darkest just before the dawn." - Harvey Dent. But also: counting sheep is overrated. Try thinking about that ridiculous thing that made us laugh yesterday.',
    },
    {
      trigger: "when you're overthinking",
      message:
        "Stop. Breathe. You don't need to figure everything out tonight. Some things work out, some don't. Either way, we're good.",
    },
    {
      trigger: "when you crushed it today",
      message:
        "TOLD YOU. Proud of you. You worked hard for this and you earned it. Now celebrate - you deserve it.",
    },
    {
      trigger: "when you want to feel adventurous",
      message:
        "\"Twenty years from now you'll be more disappointed by the things you didn't do.\" - Mark Twain. So what adventure are we doing next? Say the word.",
    },
    {
      trigger: "when you need to hear why I chose you",
      message:
        "Because you're you. Because you make regular days better. Because I'm myself around you. Because I want to. Simple as that.",
    },
  ],

  // -------------------------------------------------------------------------
  // Easter Egg - Secret message revealed by Konami code or heart clicks
  // -------------------------------------------------------------------------
  easterEggMessage:
    "You found it! Here's the truth: you make everything better. The regular stuff, the hard stuff, all of it. Thanks for being you, and for choosing me. Here's to many more adventures together.",
};

// ==========================================================================
// DOM Cache
// ==========================================================================

let DOM = {};

function cacheDom() {
  DOM.particles = document.getElementById("particles");
  DOM.wheel = document.getElementById("wheel");
  DOM.spinBtn = document.getElementById("spin-btn");
  DOM.ideasPanel = document.getElementById("ideas-panel");
  DOM.filters = document.getElementById("filters");
  DOM.favoritesSection = document.getElementById("favorites-section");
  DOM.favoritesList = document.getElementById("favorites-list");
  DOM.favoritesClear = document.getElementById("favorites-clear");
  DOM.notesGrid = document.getElementById("notes-grid");
  DOM.notesResetContainer = document.getElementById("notes-reset-container");
  DOM.notesResetBtn = document.getElementById("notes-reset-btn");
  DOM.notesProgress = document.getElementById("notes-progress");
  DOM.notesProgressText = document.getElementById("notes-progress-text");
  DOM.noteModal = document.getElementById("note-modal");
  DOM.noteModalClose = DOM.noteModal
    ? DOM.noteModal.querySelector(".note-close")
    : null;
  DOM.noteModalBackdrop = DOM.noteModal
    ? DOM.noteModal.querySelector(".note-modal-backdrop")
    : null;
  DOM.modalTrigger = document.getElementById("modal-trigger");
  DOM.modalMessage = document.getElementById("modal-message");
  DOM.themeToggle = document.getElementById("theme-toggle");
  DOM.recipientName = document.getElementById("recipient-name");
  DOM.birthdayMessage = document.getElementById("birthday-message");
  DOM.easterEggTrigger = document.getElementById("easter-egg-trigger");
  DOM.easterEggModal = document.getElementById("easter-egg-modal");
  DOM.easterEggMessage = document.getElementById("easter-egg-message");
  DOM.confetti = document.getElementById("confetti");
  DOM.easterEggClose = DOM.easterEggModal
    ? DOM.easterEggModal.querySelector(".easter-egg-close")
    : null;
  DOM.easterEggBackdrop = DOM.easterEggModal
    ? DOM.easterEggModal.querySelector(".easter-egg-backdrop")
    : null;
}

// ==========================================================================
// Helper: Create SVG Elements
// ==========================================================================

function createHeartSVG(filled, size) {
  filled = filled || false;
  size = size || 18;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", filled ? "currentColor" : "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  );
  svg.appendChild(path);

  return svg;
}

function createCheckSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "3");

  const polyline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );
  polyline.setAttribute("points", "20,6 9,17 4,12");
  svg.appendChild(polyline);

  return svg;
}

function createCloseSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", "18");
  line1.setAttribute("y1", "6");
  line1.setAttribute("x2", "6");
  line1.setAttribute("y2", "18");
  svg.appendChild(line1);

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", "6");
  line2.setAttribute("y1", "6");
  line2.setAttribute("x2", "18");
  line2.setAttribute("y2", "18");
  svg.appendChild(line2);

  return svg;
}

// Icon factory for category icons
function getCategoryIcon(iconName) {
  const iconContainer = document.createElement("div");
  iconContainer.className = "ideas-icon";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");

  const iconPaths = {
    home: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
    compass: [
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
      "M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
    ],
    utensils: [
      "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",
      "M7 2v20",
      "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z",
      "M21 15v7",
    ],
    palette: [
      "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z",
    ],
    mountain: ["M8 3l4 8 5-5 5 15H2L8 3z"],
    ticket: [
      "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      "M13 5v2",
      "M13 17v2",
      "M13 11v2",
    ],
    dice: ["M3 3h18v18H3z", "M16 8h.01", "M12 12h.01", "M8 16h.01"],
    sparkles: [
      "M12 3l-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
      "M5 3v4",
      "M19 17v4",
      "M3 5h4",
      "M17 19h4",
    ],
  };

  var paths = iconPaths[iconName] || iconPaths.sparkles;
  paths.forEach(function (d) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  });

  iconContainer.appendChild(svg);
  return iconContainer;
}

// ==========================================================================
// Safe localStorage Helpers
// ==========================================================================

function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Storage quota exceeded or storage blocked
  }
}

function safeRemoveItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // Storage blocked
  }
}

function safeParseJSON(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

// ==========================================================================
// Theme Management
// ==========================================================================

function initTheme() {
  var savedTheme = safeGetItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

function toggleTheme() {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  safeSetItem("theme", newTheme);
}

// ==========================================================================
// Particles Background
// ==========================================================================

function initParticles() {
  var container = DOM.particles;
  var particleCount = 30;

  if (!container || container.dataset.particlesInit === "true") {
    return;
  }

  container.textContent = "";
  container.dataset.particlesInit = "true";

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < particleCount; i++) {
    var particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    fragment.appendChild(particle);
  }

  container.appendChild(fragment);
}

// ==========================================================================
// Roulette Wheel
// ==========================================================================

let currentRotation = 0;
let isSpinning = false;
let selectedCategory = null;
let spinToken = 0;

const wheelColors = [
  "#7c5cbf",
  "#a78bdb",
  "#e8b4bc",
  "#d4a574",
  "#7c5cbf",
  "#a78bdb",
  "#e8b4bc",
  "#d4a574",
];

function setSpinButtonState(state) {
  var spinBtn = DOM.spinBtn;
  if (!spinBtn) return;

  spinBtn.classList.remove("is-spinning", "is-after");

  if (state === "spinning") {
    spinBtn.textContent = "Spinning...";
    spinBtn.disabled = true;
    spinBtn.classList.add("is-spinning");
    return;
  }

  if (state === "after") {
    spinBtn.textContent = "Spin again";
    spinBtn.disabled = false;
    spinBtn.classList.add("is-after");
    return;
  }

  spinBtn.textContent = "Spin";
  spinBtn.disabled = false;
}

function showIdeasPlaceholder(message, isChoosing) {
  var panel = DOM.ideasPanel;
  if (!panel) return;

  panel.textContent = "";

  var placeholder = document.createElement("div");
  placeholder.className =
    "ideas-placeholder" + (isChoosing ? " is-choosing" : "");

  var text = document.createElement("p");
  text.className = "ideas-placeholder-text";

  if (isChoosing) {
    var label = document.createElement("span");
    label.textContent = message;

    var dots = document.createElement("span");
    dots.className = "ideas-placeholder-dots";

    for (var i = 0; i < 3; i++) {
      var dot = document.createElement("span");
      dot.className = "dot";
      dot.textContent = ".";
      dots.appendChild(dot);
    }

    text.appendChild(label);
    text.appendChild(dots);
  } else {
    text.textContent = message;
  }

  placeholder.appendChild(text);
  panel.appendChild(placeholder);
}

function highlightIdea(item) {
  var highlighted = document.querySelectorAll(".idea-item.is-highlighted");
  highlighted.forEach(function (el) {
    el.classList.remove("is-highlighted");
  });

  // Force a reflow so the highlight animation can replay.
  void item.offsetWidth;

  item.classList.add("is-highlighted");
  function handleHighlightEnd(event) {
    if (event.animationName !== "highlight-sheen") {
      return;
    }
    item.classList.remove("is-highlighted");
    item.removeEventListener("animationend", handleHighlightEnd);
  }
  item.addEventListener("animationend", handleHighlightEnd);
}

function renderWheel() {
  var wheel = DOM.wheel;
  if (!wheel) return;
  var categories = CONFIG.dateCategories;
  var segmentAngle = 360 / categories.length;
  var wheelRadius = 150; // Half of wheel width
  var labelRadius = 100; // Distance from center for labels

  // Create visual conic-gradient based on categories
  const gradientStops = categories
    .map(function (cat, i) {
      const startAngle = i * segmentAngle;
      const endAngle = (i + 1) * segmentAngle;
      return (
        wheelColors[i % wheelColors.length] +
        " " +
        startAngle +
        "deg " +
        endAngle +
        "deg"
      );
    })
    .join(", ");

  wheel.style.background = "conic-gradient(" + gradientStops + ")";

  // Clear existing content
  wheel.textContent = "";

  // Create labels container
  var labelsContainer = document.createElement("div");
  labelsContainer.className = "wheel-labels";

  // Add segment labels positioned around the wheel
  categories.forEach(function (cat, i) {
    // Calculate angle for center of this segment (in radians)
    // Offset by -90 degrees so 0 starts at top
    var angleDeg = i * segmentAngle + segmentAngle / 2 - 90;
    var angleRad = angleDeg * (Math.PI / 180);

    // Calculate position using polar coordinates
    var x = Math.cos(angleRad) * labelRadius;
    var y = Math.sin(angleRad) * labelRadius;

    var text = document.createElement("span");
    text.className = "wheel-segment-text";
    text.textContent = cat.name;

    // Position label and rotate it to align with segment
    // Add 90 to rotation so text reads from outside toward center
    var rotation = angleDeg + 90;
    text.style.transform =
      "translate(-50%, -50%) translate(" +
      x +
      "px, " +
      y +
      "px) rotate(" +
      rotation +
      "deg)";

    labelsContainer.appendChild(text);
  });

  wheel.appendChild(labelsContainer);
}

function spinWheel() {
  if (isSpinning) return;

  var wheel = DOM.wheel;
  if (!wheel) return;
  var categories = CONFIG.dateCategories;
  var segmentAngle = 360 / categories.length;
  var spinId = ++spinToken;

  isSpinning = true;
  selectedCategory = null;
  wheel.classList.add("spinning");
  setSpinButtonState("spinning");
  showIdeasPlaceholder("Choosing", true);

  // Random number of full rotations (3-5) plus random final position
  var fullRotations = 3 + Math.floor(Math.random() * 3);
  var randomSegment = Math.floor(Math.random() * categories.length);
  var segmentOffset = randomSegment * segmentAngle + segmentAngle / 2;

  // Calculate final rotation (we need to account for the pointer at top)
  var finalRotation =
    currentRotation + fullRotations * 360 + (360 - segmentOffset);

  function handleSpinEnd(event) {
    if (event.target !== wheel || event.propertyName !== "transform") {
      return;
    }

    if (spinId !== spinToken) {
      return;
    }

    wheel.removeEventListener("transitionend", handleSpinEnd);
    isSpinning = false;
    wheel.classList.remove("spinning");
    selectedCategory = categories[randomSegment];
    setSpinButtonState("after");
    showDateIdeas(selectedCategory);
  }

  wheel.addEventListener("transitionend", handleSpinEnd);
  wheel.style.transform = "rotate(" + finalRotation + "deg)";
  currentRotation = finalRotation;
}

function showDateIdeas(category) {
  var panel = DOM.ideasPanel;
  if (!panel) return;
  var currentFilters = getCurrentFilters();
  var filteredIdeas = filterIdeas(category.ideas, currentFilters);
  var favorites = getFavorites();

  // Clear panel
  panel.textContent = "";

  // Create header
  var header = document.createElement("div");
  header.className = "ideas-header";

  var iconContainer = getCategoryIcon(category.icon);
  header.appendChild(iconContainer);

  var categoryTitle = document.createElement("h3");
  categoryTitle.className = "ideas-category";
  categoryTitle.textContent = category.name;
  header.appendChild(categoryTitle);

  var count = document.createElement("span");
  count.className = "ideas-count";
  count.textContent =
    filteredIdeas.length +
    (filteredIdeas.length === 1 ? " idea match" : " ideas match");
  header.appendChild(count);

  panel.appendChild(header);

  // Create ideas list
  var list = document.createElement("div");
  list.className = "ideas-list";
  var ideaElements = [];
  var listFragment = document.createDocumentFragment();

  if (filteredIdeas.length === 0) {
    var placeholder = document.createElement("div");
    placeholder.className = "ideas-placeholder";
    var placeholderText = document.createElement("p");
    placeholderText.textContent =
      "No ideas match your filters. Try adjusting them!";
    placeholder.appendChild(placeholderText);
    var resetBtn = document.createElement("button");
    resetBtn.className = "ideas-reset";
    resetBtn.textContent = "Reset filters";
    resetBtn.addEventListener("click", resetFilters);
    placeholder.appendChild(resetBtn);
    listFragment.appendChild(placeholder);
  } else {
    filteredIdeas.forEach(function (idea) {
      var ideaId = idea.id;
      var isFavorited = favorites.indexOf(ideaId) !== -1;

      var item = document.createElement("div");
      item.className = "idea-item";

      var textSpan = document.createElement("span");
      textSpan.className = "idea-text";
      textSpan.textContent = idea.text;
      item.appendChild(textSpan);

      var meta = document.createElement("div");
      meta.className = "idea-meta";

      var effortTag = document.createElement("span");
      effortTag.className = "idea-tag";
      effortTag.textContent = idea.effort;
      meta.appendChild(effortTag);

      var budgetTag = document.createElement("span");
      budgetTag.className = "idea-tag";
      budgetTag.textContent = idea.budget;
      meta.appendChild(budgetTag);

      var seasonTag = document.createElement("span");
      seasonTag.className = "idea-tag";
      seasonTag.textContent = idea.season;
      meta.appendChild(seasonTag);

      var favBtn = document.createElement("button");
      favBtn.className = "idea-favorite" + (isFavorited ? " favorited" : "");
      favBtn.setAttribute("aria-label", "Save to favorites");
      favBtn.appendChild(createHeartSVG(isFavorited));
      (function (id, txt) {
        favBtn.addEventListener("click", function () {
          toggleFavorite(id, txt);
        });
      })(ideaId, idea.text);
      meta.appendChild(favBtn);

      item.appendChild(meta);
      listFragment.appendChild(item);
      ideaElements.push(item);
    });
  }

  list.appendChild(listFragment);
  panel.appendChild(list);

  if (filteredIdeas.length > 0) {
    var actions = document.createElement("div");
    actions.className = "ideas-actions";

    var pickBtn = document.createElement("button");
    pickBtn.className = "ideas-pick-button";
    pickBtn.textContent = "Pick one for us";
    pickBtn.addEventListener("click", function () {
      var choiceIndex = Math.floor(Math.random() * filteredIdeas.length);
      var chosenItem = ideaElements[choiceIndex];
      if (!chosenItem) {
        return;
      }
      highlightIdea(chosenItem);
    });

    actions.appendChild(pickBtn);
    panel.appendChild(actions);
  }
}

function getCurrentFilters() {
  var filters = {
    effort: "all",
    budget: "all",
    season: "all",
  };

  document.querySelectorAll(".filter-chip.active").forEach(function (chip) {
    filters[chip.dataset.filter] = chip.dataset.value;
  });

  return filters;
}

function filterIdeas(ideas, filters) {
  return ideas.filter(function (idea) {
    var matchesEffort =
      filters.effort === "all" || idea.effort === filters.effort;
    var matchesBudget =
      filters.budget === "all" || idea.budget === filters.budget;
    var matchesSeason =
      filters.season === "all" ||
      idea.season === filters.season ||
      idea.season === "any";
    return matchesEffort && matchesBudget && matchesSeason;
  });
}

function initFilters() {
  document.querySelectorAll(".filter-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      // Deactivate siblings in same group and update aria-pressed
      var group = chip.closest(".filter-group");
      group.querySelectorAll(".filter-chip").forEach(function (c) {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-pressed", "true");

      // Re-render ideas if category is selected
      if (selectedCategory) {
        triggerFilterFeedback();
        showDateIdeas(selectedCategory);
      }
    });
  });
}

function resetFilters() {
  document.querySelectorAll(".filter-group").forEach(function (group) {
    group.querySelectorAll(".filter-chip").forEach(function (chip) {
      chip.classList.remove("active");
      chip.setAttribute("aria-pressed", "false");
    });
    var allChip = group.querySelector('.filter-chip[data-value="all"]');
    if (allChip) {
      allChip.classList.add("active");
      allChip.setAttribute("aria-pressed", "true");
    }
  });

  if (selectedCategory) {
    triggerFilterFeedback();
    showDateIdeas(selectedCategory);
  }
}

function triggerFilterFeedback() {
  var panel = DOM.ideasPanel;
  if (!panel) {
    return;
  }

  panel.classList.remove("is-filtering");
  void panel.offsetWidth;
  panel.classList.add("is-filtering");
  panel.addEventListener(
    "animationend",
    function () {
      panel.classList.remove("is-filtering");
    },
    { once: true },
  );
}

// ==========================================================================
// Favorites Management
// ==========================================================================

function getFavorites() {
  var saved = safeGetItem("dateFavorites");
  return safeParseJSON(saved, []);
}

function saveFavorites(favorites) {
  safeSetItem("dateFavorites", JSON.stringify(favorites));
}

function toggleFavorite(ideaId, ideaText) {
  var favorites = getFavorites();
  var index = favorites.indexOf(ideaId);

  if (index === -1) {
    favorites.push(ideaId);
    // Store the text too
    var texts = safeParseJSON(safeGetItem("favoriteTexts"), {});
    texts[ideaId] = ideaText;
    safeSetItem("favoriteTexts", JSON.stringify(texts));
  } else {
    favorites.splice(index, 1);
    var storedTexts = safeParseJSON(safeGetItem("favoriteTexts"), {});
    if (storedTexts[ideaId]) {
      delete storedTexts[ideaId];
      safeSetItem("favoriteTexts", JSON.stringify(storedTexts));
    }
  }

  saveFavorites(favorites);

  if (selectedCategory) {
    showDateIdeas(selectedCategory);
  }

  renderFavorites();
}

function clearFavorites() {
  safeRemoveItem("dateFavorites");
  safeRemoveItem("favoriteTexts");
  renderFavorites();
  if (selectedCategory) {
    showDateIdeas(selectedCategory);
  }
}

function renderFavorites() {
  var favorites = getFavorites();
  var texts = safeParseJSON(safeGetItem("favoriteTexts"), {});
  var section = DOM.favoritesSection;
  var list = DOM.favoritesList;
  if (!section || !list) {
    return;
  }

  list.textContent = "";

  if (favorites.length === 0) {
    section.classList.remove("has-favorites");
    return;
  }

  section.classList.add("has-favorites");

  var fragment = document.createDocumentFragment();

  favorites.forEach(function (id) {
    var item = document.createElement("div");
    item.className = "favorite-item";

    var textSpan = document.createElement("span");
    textSpan.textContent = texts[id] || id;
    item.appendChild(textSpan);

    var removeBtn = document.createElement("button");
    removeBtn.className = "favorite-remove";
    removeBtn.setAttribute("aria-label", "Remove from favorites");
    removeBtn.appendChild(createCloseSVG());
    (function (favId) {
      removeBtn.addEventListener("click", function () {
        toggleFavorite(favId);
      });
    })(id);
    item.appendChild(removeBtn);

    fragment.appendChild(item);
  });

  list.appendChild(fragment);
}

function initFavoritesControls() {
  var clearBtn = DOM.favoritesClear;
  if (!clearBtn) {
    return;
  }
  clearBtn.addEventListener("click", clearFavorites);
}

// ==========================================================================
// Love Notes
// ==========================================================================

function renderNotes() {
  var grid = DOM.notesGrid;
  if (!grid) {
    return;
  }
  var readNotes = getReadNotes();

  // Clear grid
  grid.textContent = "";

  var fragment = document.createDocumentFragment();

  CONFIG.loveNotes.forEach(function (note, index) {
    var button = document.createElement("button");
    button.className =
      "note-button" + (readNotes.indexOf(index) !== -1 ? " read" : "");

    var label = document.createElement("span");
    label.className = "note-label";
    label.textContent = "Open";
    button.appendChild(label);

    var triggerText = document.createElement("span");
    triggerText.className = "note-trigger-text";
    triggerText.textContent = note.trigger;
    button.appendChild(triggerText);

    var indicator = document.createElement("span");
    indicator.className = "note-read-indicator";
    indicator.appendChild(createCheckSVG());
    button.appendChild(indicator);

    (function (idx) {
      button.addEventListener("click", function () {
        openNote(idx);
      });
    })(index);
    fragment.appendChild(button);
  });

  grid.appendChild(fragment);

  updateResetButtonVisibility();
  updateNotesProgress(readNotes);
}

function getReadNotes() {
  var saved = safeGetItem("readNotes");
  return safeParseJSON(saved, []);
}

function markNoteAsRead(index) {
  var readNotes = getReadNotes();
  if (readNotes.indexOf(index) === -1) {
    readNotes.push(index);
    safeSetItem("readNotes", JSON.stringify(readNotes));
  }
}

let lastFocusedNoteIndex = null;

function openNote(index) {
  // Bounds check to prevent accessing undefined notes
  if (index < 0 || index >= CONFIG.loveNotes.length) {
    return;
  }

  const note = CONFIG.loveNotes[index];
  const modal = DOM.noteModal;
  const trigger = DOM.modalTrigger;
  const message = DOM.modalMessage;
  if (!modal || !trigger || !message) {
    return;
  }

  // Store the note index for focus restoration after modal closes
  // (storing element reference doesn't work because renderNotes() rebuilds the grid)
  lastFocusedNoteIndex = index;

  trigger.textContent = "Open " + note.trigger;
  message.textContent = note.message;

  modal.classList.add("open");
  lockBodyScroll();

  // Focus the close button for keyboard users
  if (DOM.noteModalClose) {
    DOM.noteModalClose.focus();
  }

  markNoteAsRead(index);
  renderNotes();
}

function closeNoteModal() {
  const modal = DOM.noteModal;
  if (!modal) return;
  modal.classList.remove("open");
  unlockBodyScroll();

  // Restore focus to the note button that triggered the modal
  // We query by index because renderNotes() rebuilds the grid and detaches old buttons
  if (lastFocusedNoteIndex !== null) {
    const noteButtons = DOM.notesGrid.querySelectorAll(".note-button");
    const targetButton = noteButtons[lastFocusedNoteIndex];
    if (targetButton) {
      targetButton.focus();
    }
    lastFocusedNoteIndex = null;
  }
}

var noteModalKeydownHandler = null;

function initNoteModal() {
  var modal = DOM.noteModal;
  var closeBtn = DOM.noteModalClose;
  var backdrop = DOM.noteModalBackdrop;
  if (!modal || !closeBtn || !backdrop) {
    return;
  }

  closeBtn.addEventListener("click", closeNoteModal);
  backdrop.addEventListener("click", closeNoteModal);

  // Remove existing listener if any to prevent accumulation
  if (noteModalKeydownHandler) {
    document.removeEventListener("keydown", noteModalKeydownHandler);
  }

  noteModalKeydownHandler = function (e) {
    if (!modal.classList.contains("open")) {
      return;
    }

    if (e.key === "Escape") {
      closeNoteModal();
      return;
    }

    // Focus trap: keep Tab focus within the modal
    if (e.key === "Tab") {
      var noteCard = modal.querySelector(".note-card");
      var focusableElements = noteCard.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      var firstFocusable = focusableElements[0];
      var lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };
  document.addEventListener("keydown", noteModalKeydownHandler);
}

function updateResetButtonVisibility() {
  var readNotes = getReadNotes();
  var container = DOM.notesResetContainer;
  if (!container) {
    return;
  }
  if (readNotes.length > 0) {
    container.classList.add("has-read");
  } else {
    container.classList.remove("has-read");
  }
}

function resetReadNotes() {
  safeRemoveItem("readNotes");
  renderNotes();
  updateResetButtonVisibility();
}

function initResetButton() {
  var resetBtn = DOM.notesResetBtn;
  if (!resetBtn) {
    return;
  }
  resetBtn.addEventListener("click", resetReadNotes);
  updateResetButtonVisibility();
}

function updateNotesProgress(readNotes) {
  var progress = DOM.notesProgress;
  var text = DOM.notesProgressText;
  var openedCount = readNotes ? readNotes.length : getReadNotes().length;
  var totalCount = CONFIG.loveNotes.length;

  if (text) {
    text.textContent = openedCount + "/" + totalCount + " opened";
  }

  if (progress) {
    if (openedCount === totalCount && totalCount > 0) {
      progress.classList.add("is-complete");
    } else {
      progress.classList.remove("is-complete");
    }
  }
}

function lockBodyScroll() {
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = scrollbarWidth + "px";
  }
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

// ==========================================================================
// Easter Egg
// ==========================================================================

var konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];
var konamiIndex = 0;
var heartClickCount = 0;
var heartClickTimer = null;

function initKonamiCode() {
  document.addEventListener("keydown", function (e) {
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
  var heart = DOM.easterEggTrigger;
  if (!heart) {
    return;
  }

  heart.addEventListener("click", function () {
    heartClickCount++;

    clearTimeout(heartClickTimer);
    heartClickTimer = setTimeout(function () {
      heartClickCount = 0;
    }, 1000);

    if (heartClickCount >= 5) {
      revealEasterEgg();
      heartClickCount = 0;
    }
  });
}

var easterEggLastFocused = null;

function revealEasterEgg() {
  var modal = DOM.easterEggModal;
  var message = DOM.easterEggMessage;
  var confettiContainer = DOM.confetti;
  if (!modal || !message || !confettiContainer) {
    return;
  }

  // Store focus for restoration
  easterEggLastFocused = document.activeElement;

  message.textContent = CONFIG.easterEggMessage;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  // Focus the close button for keyboard users
  if (DOM.easterEggClose) {
    DOM.easterEggClose.focus();
  }

  // Clear existing confetti
  confettiContainer.textContent = "";

  // Create confetti
  var colors = ["#7c5cbf", "#a78bdb", "#e8b4bc", "#d4a574", "#4a9d6e"];
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 50; i++) {
    var confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    confetti.style.animationDuration = 2 + Math.random() + "s";
    fragment.appendChild(confetti);
  }

  confettiContainer.appendChild(fragment);
}

function closeEasterEgg() {
  var modal = DOM.easterEggModal;
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";

  // Restore focus to the element that triggered the modal
  if (easterEggLastFocused && easterEggLastFocused.focus) {
    easterEggLastFocused.focus();
    easterEggLastFocused = null;
  }
}

var easterEggKeydownHandler = null;

function initEasterEggModal() {
  var modal = DOM.easterEggModal;
  var closeBtn = DOM.easterEggClose;
  var backdrop = DOM.easterEggBackdrop;
  if (!modal || !closeBtn || !backdrop) {
    return;
  }

  closeBtn.addEventListener("click", closeEasterEgg);
  backdrop.addEventListener("click", closeEasterEgg);

  // Remove existing listener if any to prevent accumulation
  if (easterEggKeydownHandler) {
    document.removeEventListener("keydown", easterEggKeydownHandler);
  }

  easterEggKeydownHandler = function (e) {
    if (!modal.classList.contains("open")) {
      return;
    }

    if (e.key === "Escape") {
      closeEasterEgg();
      return;
    }

    // Focus trap: keep Tab focus within the modal
    if (e.key === "Tab") {
      var content = modal.querySelector(".easter-egg-content");
      var focusableElements = content.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      var firstFocusable = focusableElements[0];
      var lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };
  document.addEventListener("keydown", easterEggKeydownHandler);
}

// ==========================================================================
// Populate Page Content
// ==========================================================================

function populateContent() {
  if (DOM.recipientName) {
    DOM.recipientName.textContent = CONFIG.recipientName;
  }
  if (DOM.birthdayMessage) {
    DOM.birthdayMessage.textContent = CONFIG.birthdayMessage;
  }
  document.title = "Happy Birthday, " + CONFIG.recipientName;
}

// ==========================================================================
// Smooth Scroll for Navigation
// ==========================================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Focus the target for accessibility (skip link support)
        // Use setTimeout to focus after scroll completes
        setTimeout(function () {
          // Ensure target is focusable
          if (!target.hasAttribute("tabindex")) {
            target.setAttribute("tabindex", "-1");
          }
          target.focus({ preventScroll: true });
        }, 500);
      }
    });
  });
}

// ==========================================================================
// Initialize Everything
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  cacheDom();

  // Theme
  initTheme();
  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener("click", toggleTheme);
  }

  // Populate content
  populateContent();

  // Visual effects
  initParticles();

  // Roulette
  renderWheel();
  setSpinButtonState("idle");
  if (DOM.spinBtn) {
    DOM.spinBtn.addEventListener("click", spinWheel);
  }
  initFilters();
  renderFavorites();
  initFavoritesControls();

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
