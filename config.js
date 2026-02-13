/* ==========================================================================
   Date Night Roulette & Love Notes - Configuration

   CUSTOMIZATION GUIDE:
   Edit the CONFIG object below to personalize the website.
   All placeholder text is marked with [brackets] for easy identification.
   ========================================================================== */

// ==========================================================================
// CONFIGURATION - Edit this section to personalize your website
// ==========================================================================

window.CONFIG = {
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
    // Optional details:
    //   - duration (string)
    //   - checklist (array of strings)
    //   - note (string)
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
                    details: {
                        duration: "2-3 hours",
                        checklist: ["Pick the movie lineup", "Popcorn + cozy blankets", "Dim the lights"],
                        note: "Slow nights with you are my favorite kind."
                    }
                },
                { id: "cozy-italian-pasta", text: "Cook a new recipe together - Italian pasta from scratch", effort: "medium", budget: "$", season: "any" },
                { id: "cozy-blanket-fort", text: "Build a blanket fort and read our favorite books to each other", effort: "low", budget: "free", season: "winter" },
                { id: "cozy-spa-night", text: "Spa night with face masks, candles, and shoulder massages", effort: "low", budget: "$", season: "any" },
                { id: "cozy-board-game-tournament", text: "Board game tournament - loser makes breakfast tomorrow", effort: "low", budget: "free", season: "any" },
                { id: "cozy-bake-ambitious", text: "Bake something ambitious together - croissants or a layer cake", effort: "medium", budget: "$", season: "any" }
            ]
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
                    details: {
                        duration: "3-4 hours",
                        checklist: ["Coffee in a thermos", "Trail snacks", "Warm layers"],
                        note: "I want to watch the day start with you."
                    }
                },
                { id: "adventure-road-trip", text: "Spontaneous road trip - pick a direction and drive for 2 hours", effort: "medium", budget: "$$", season: "any" },
                { id: "adventure-kayak-paddle", text: "Kayaking or paddleboarding - pack sandwiches for a water picnic", effort: "medium", budget: "$$", season: "summer" },
                { id: "adventure-geocaching", text: "Geocaching treasure hunt through the city", effort: "medium", budget: "free", season: "any" },
                { id: "adventure-scenic-train", text: "Take a scenic train to a small town we've never explored", effort: "low", budget: "$$", season: "fall" },
                { id: "adventure-stargazing-drive", text: "Drive somewhere dark for stargazing - bring blankets and hot cocoa", effort: "low", budget: "free", season: "any" }
            ]
        },
        {
            name: "Foodie Experience",
            icon: "utensils",
            ideas: [
                { id: "foodie-try-restaurant", text: "Finally try that restaurant we keep saying we'll go to", effort: "low", budget: "$$$", season: "any" },
                { id: "foodie-food-truck-crawl", text: "Food truck crawl - three trucks, three neighborhoods, one perfect day", effort: "medium", budget: "$$", season: "summer" },
                {
                    id: "foodie-farmers-market",
                    text: "Farmers market morning - buy ingredients, cook lunch together",
                    effort: "low",
                    budget: "$",
                    season: "spring",
                    details: {
                        duration: "Half day",
                        checklist: ["Reusable bags", "Easy recipe plan", "Room for treats"],
                        note: "I love picking ingredients with you."
                    }
                },
                { id: "foodie-cooking-class", text: "Take a cooking class together - pasta making or sushi rolling", effort: "medium", budget: "$$", season: "any" },
                { id: "foodie-progressive-dinner", text: "Progressive dinner - appetizers, main, and dessert at three different spots", effort: "medium", budget: "$$$", season: "any" },
                { id: "foodie-sunset-picnic", text: "Sunset picnic at our favorite spot with homemade everything", effort: "medium", budget: "$", season: "summer" }
            ]
        },
        {
            name: "Creative Date",
            icon: "palette",
            ideas: [
                { id: "creative-paint-night", text: "Paint night at home - same subject, different interpretations", effort: "low", budget: "$$", season: "any" },
                { id: "creative-pottery-class", text: "Pottery class - make mugs for each other's morning coffee", effort: "medium", budget: "$$", season: "any" },
                {
                    id: "creative-future-letters",
                    text: "Write letters to our future selves to open next year",
                    effort: "low",
                    budget: "free",
                    season: "any",
                    details: {
                        duration: "1-2 hours",
                        checklist: ["Nice paper", "Stamps or a keepsake box"],
                        note: "I want to remember exactly how this year felt."
                    }
                },
                { id: "creative-scrapbook", text: "Create a scrapbook of our favorite memories together", effort: "medium", budget: "$", season: "any" },
                { id: "creative-photo-walk", text: "Photography walk - take portraits of each other in golden hour", effort: "low", budget: "free", season: "any" },
                { id: "creative-candle-making", text: "Candle making class - create scents that remind us of each other", effort: "medium", budget: "$$", season: "winter" }
            ]
        },
        {
            name: "Active & Outdoors",
            icon: "mountain",
            ideas: [
                { id: "active-bike-trail", text: "Bike ride on a scenic trail with a coffee stop halfway", effort: "medium", budget: "free", season: "spring" },
                { id: "active-rock-climbing", text: "Rock climbing gym", effort: "high", budget: "$$", season: "any" },
                { id: "active-beach-day", text: "Beach day", effort: "low", budget: "$", season: "summer" },
                { id: "active-ice-skating", text: "Ice skating followed by hot chocolate and people watching", effort: "medium", budget: "$", season: "winter" },
                { id: "active-pickleball", text: "Learn pickleball together", effort: "medium", budget: "$", season: "any" },
                { id: "active-sunrise-yoga", text: "Sunrise yoga in the park, then brunch at our favorite cafe", effort: "low", budget: "free", season: "summer" }
            ]
        },
        {
            name: "Culture & Arts",
            icon: "ticket",
            ideas: [
                { id: "culture-museum-afternoon", text: "Spend a whole afternoon getting lost in a museum together", effort: "low", budget: "$", season: "any" },
                { id: "culture-theater-comedy", text: "Live theater or comedy show", effort: "low", budget: "$$", season: "any" },
                { id: "culture-local-concert", text: "Local concert or outdoor music", effort: "low", budget: "$$", season: "summer" },
                { id: "culture-bookstore-date", text: "Bookstore date - pick out books for each other to read", effort: "low", budget: "$", season: "any" },
                { id: "culture-gallery-opening", text: "Art gallery opening with wine and pretending to be sophisticated", effort: "low", budget: "free", season: "any" }
            ]
        },
        {
            name: "Game Night",
            icon: "dice",
            ideas: [
                { id: "game-two-player-marathon", text: "Two-player board game marathon with themed snacks", effort: "low", budget: "free", season: "any" },
                { id: "game-coop-night", text: "Video game co-op night - beat that game we started months ago", effort: "low", budget: "free", season: "any" },
                { id: "game-escape-room", text: "Escape room challenge - put our teamwork to the ultimate test", effort: "medium", budget: "$$", season: "any" },
                { id: "game-arcade-bowling", text: "Retro arcade or bowling - compete for bragging rights", effort: "low", budget: "$$", season: "any" },
                { id: "game-mini-golf", text: "Mini golf tournament - loser plans the next date", effort: "low", budget: "$", season: "summer" },
                { id: "game-card-tournament", text: "Card game tournament with silly stakes and good music", effort: "low", budget: "free", season: "any" }
            ]
        },
        {
            name: "Surprise Me",
            icon: "sparkles",
            ideas: [
                { id: "surprise-coin-flip", text: "Flip a coin at every intersection until we find somewhere perfect", effort: "medium", budget: "free", season: "any" },
                { id: "surprise-restaurant-roulette", text: "Random restaurant roulette", effort: "low", budget: "$$", season: "any" },
                { id: "surprise-half-secret", text: "Each plan half the date secretly", effort: "medium", budget: "$$", season: "any" },
                { id: "surprise-say-yes", text: "Say yes to everything day", effort: "medium", budget: "$$", season: "any" },
                { id: "surprise-first-date", text: "Recreate our first date, but make it even better this time", effort: "medium", budget: "$$", season: "any" },
                { id: "surprise-thrift-challenge", text: "Thrift store challenge - find the perfect weird gift for each other", effort: "low", budget: "$", season: "any" }
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

    bonusLoveNote: {
        trigger: "when you've opened every note",
        message: "You did it. Every note opened, every reminder tucked away. Here is the bonus truth: loving you is the easiest thing I do."
    },

    // -------------------------------------------------------------------------
    // Valentine Theme - Optional seasonal overlay + surprise messages
    // -------------------------------------------------------------------------
    valentineTheme: {
        toggleLabel: "Valentine mode",
        heroEyebrowText: "Happy Valentine's Day",
        heroSurpriseLabel: "Open a Valentine surprise",
        surpriseMessages: {
            heart: "Happy Valentine's Day. Every ordinary day is better with you in it.",
            hero: "Surprise: loving you feels steady, honest, and like home. I'm grateful for us every day.",
            wheel: "Bonus draw: this is your reminder that I adore doing life with you.",
            default: "Happy Valentine's Day. I love you, and I love us."
        },
        wheelSurpriseChance: 0.1
    },

    // -------------------------------------------------------------------------
    // Easter Egg - Secret message revealed by Konami code or heart clicks
    // -------------------------------------------------------------------------
    easterEggMessage: "You found it! Here's the truth: you make everything better. The regular stuff, the hard stuff, all of it. Thanks for being you, and for choosing me. Here's to many more adventures together."
};
