/* ==========================================================================
   Date Night Roulette & Love Notes - Storage
   Local-only persistence helpers, migrations, and state accessors.
   ========================================================================== */

(function() {
    'use strict';

    const STORAGE_KEYS = {
        theme: 'theme',
        valentineMode: 'valentineMode',
        favorites: 'dateFavorites',
        legacyFavoriteTexts: 'favoriteTexts',
        readNotes: 'readNotes',
        bonusNoteRead: 'bonusNoteRead',
        dateHistory: 'dateHistory',
        avoidRepeats: 'avoidRepeats',
        checklist: 'dateChecklist',
        filters: 'dateFilters'
    };

    const HISTORY_LIMIT = 50;
    const DEFAULT_FILTERS = {
        effort: 'all',
        budget: 'all',
        season: 'all'
    };
    const FILTER_OPTIONS = {
        effort: ['all', 'low', 'medium', 'high'],
        budget: ['all', 'free', '$', '$$', '$$$'],
        season: ['all', 'spring', 'summer', 'fall', 'winter']
    };

    function safeGetItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            return false;
        }
    }

    function safeRemoveItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            return false;
        }
    }

    function safeSetJSON(key, value) {
        safeSetItem(key, JSON.stringify(value));
    }

    function safeParseJSON(key, fallback) {
        const raw = safeGetItem(key);
        if (raw === null) {
            return fallback;
        }
        try {
            return JSON.parse(raw);
        } catch (error) {
            safeSetJSON(key, fallback);
            return fallback;
        }
    }

    function getThemePreference() {
        const raw = safeGetItem(STORAGE_KEYS.theme);
        if (raw === null) {
            return null;
        }
        if (raw === 'light' || raw === 'dark') {
            safeSetJSON(STORAGE_KEYS.theme, raw);
            return raw;
        }
        const parsed = safeParseJSON(STORAGE_KEYS.theme, null);
        if (parsed === 'light' || parsed === 'dark') {
            return parsed;
        }
        return null;
    }

    function setThemePreference(theme) {
        safeSetJSON(STORAGE_KEYS.theme, theme);
    }

    function getValentineModePreference() {
        const raw = safeGetItem(STORAGE_KEYS.valentineMode);
        if (raw === null) {
            return false;
        }

        const normalizedRaw = raw.toLowerCase();
        if (normalizedRaw === 'true' || normalizedRaw === '"true"' || normalizedRaw === 'on' || normalizedRaw === '"on"') {
            safeSetJSON(STORAGE_KEYS.valentineMode, true);
            return true;
        }

        if (normalizedRaw === 'false' || normalizedRaw === '"false"' || normalizedRaw === 'off' || normalizedRaw === '"off"') {
            safeSetJSON(STORAGE_KEYS.valentineMode, false);
            return false;
        }

        const parsed = safeParseJSON(STORAGE_KEYS.valentineMode, false);
        if (typeof parsed === 'boolean') {
            return parsed;
        }

        if (typeof parsed === 'string') {
            const normalizedParsed = parsed.toLowerCase();
            if (normalizedParsed === 'true' || normalizedParsed === 'on') {
                safeSetJSON(STORAGE_KEYS.valentineMode, true);
                return true;
            }
            if (normalizedParsed === 'false' || normalizedParsed === 'off') {
                safeSetJSON(STORAGE_KEYS.valentineMode, false);
                return false;
            }
        }

        safeSetJSON(STORAGE_KEYS.valentineMode, false);
        return false;
    }

    function setValentineModePreference(enabled) {
        safeSetJSON(STORAGE_KEYS.valentineMode, Boolean(enabled));
    }

    function normalizeArray(value, key) {
        if (Array.isArray(value)) {
            return value;
        }
        safeSetJSON(key, []);
        return [];
    }

    function normalizeObject(value, key) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value;
        }
        safeSetJSON(key, {});
        return {};
    }

    function normalizeFilters(filters) {
        const source = filters && typeof filters === 'object' && !Array.isArray(filters)
            ? filters
            : {};
        let changed = source !== filters;
        const normalized = {
            effort: DEFAULT_FILTERS.effort,
            budget: DEFAULT_FILTERS.budget,
            season: DEFAULT_FILTERS.season
        };

        Object.keys(DEFAULT_FILTERS).forEach(function(key) {
            const allowed = FILTER_OPTIONS[key];
            const raw = typeof source[key] === 'string'
                ? source[key].trim().toLowerCase()
                : '';
            if (allowed.indexOf(raw) !== -1) {
                normalized[key] = raw;
            } else if (raw) {
                changed = true;
            }

            if (!Object.prototype.hasOwnProperty.call(source, key)) {
                changed = true;
            }
        });

        if (changed) {
            safeSetJSON(STORAGE_KEYS.filters, normalized);
        }

        return normalized;
    }

    function getFavorites() {
        const favorites = safeParseJSON(STORAGE_KEYS.favorites, []);
        return normalizeArray(favorites, STORAGE_KEYS.favorites);
    }

    function setFavorites(favorites) {
        safeSetJSON(STORAGE_KEYS.favorites, favorites);
    }

    function getReadNotes() {
        const readNotes = safeParseJSON(STORAGE_KEYS.readNotes, []);
        return normalizeArray(readNotes, STORAGE_KEYS.readNotes);
    }

    function setReadNotes(readNotes) {
        safeSetJSON(STORAGE_KEYS.readNotes, readNotes);
    }

    function clearReadNotes() {
        safeRemoveItem(STORAGE_KEYS.readNotes);
    }

    function getBonusNoteRead() {
        const value = safeParseJSON(STORAGE_KEYS.bonusNoteRead, false);
        if (typeof value !== 'boolean') {
            safeSetJSON(STORAGE_KEYS.bonusNoteRead, false);
            return false;
        }
        return value;
    }

    function setBonusNoteRead(value) {
        safeSetJSON(STORAGE_KEYS.bonusNoteRead, Boolean(value));
    }

    function getDateHistory() {
        const history = safeParseJSON(STORAGE_KEYS.dateHistory, []);
        return normalizeArray(history, STORAGE_KEYS.dateHistory);
    }

    function setDateHistory(history) {
        safeSetJSON(STORAGE_KEYS.dateHistory, history);
    }

    function addHistoryEntry(entry) {
        const history = getDateHistory();
        history.unshift(entry);
        const trimmed = history.slice(0, HISTORY_LIMIT);
        safeSetJSON(STORAGE_KEYS.dateHistory, trimmed);
        return trimmed;
    }

    function clearHistory() {
        safeRemoveItem(STORAGE_KEYS.dateHistory);
    }

    function getAvoidRepeats() {
        const value = safeParseJSON(STORAGE_KEYS.avoidRepeats, false);
        if (typeof value !== 'boolean') {
            safeSetJSON(STORAGE_KEYS.avoidRepeats, false);
            return false;
        }
        return value;
    }

    function setAvoidRepeats(value) {
        safeSetJSON(STORAGE_KEYS.avoidRepeats, Boolean(value));
    }

    function getFilters() {
        const filters = safeParseJSON(STORAGE_KEYS.filters, DEFAULT_FILTERS);
        return normalizeFilters(filters);
    }

    function setFilters(filters) {
        safeSetJSON(STORAGE_KEYS.filters, normalizeFilters(filters));
    }

    function getChecklistState() {
        const state = safeParseJSON(STORAGE_KEYS.checklist, {});
        return normalizeObject(state, STORAGE_KEYS.checklist);
    }

    function setChecklistState(state) {
        safeSetJSON(STORAGE_KEYS.checklist, state);
    }

    function updateChecklistItem(ideaId, index, checked) {
        const state = getChecklistState();
        const existing = Array.isArray(state[ideaId]) ? state[ideaId] : [];
        existing[index] = Boolean(checked);
        state[ideaId] = existing;
        safeSetJSON(STORAGE_KEYS.checklist, state);
        return state;
    }

    function buildIdeaIndex() {
        const index = {};
        if (!window.CONFIG || !Array.isArray(window.CONFIG.dateCategories)) {
            return index;
        }

        window.CONFIG.dateCategories.forEach(function(category) {
            if (!category || !Array.isArray(category.ideas)) {
                return;
            }
            category.ideas.forEach(function(idea) {
                index[idea.id] = {
                    id: idea.id,
                    text: idea.text,
                    categoryName: category.name,
                    effort: idea.effort,
                    budget: idea.budget,
                    season: idea.season
                };
            });
        });

        return index;
    }

    function migrateFavorites() {
        const favorites = getFavorites();
        const legacyTexts = safeParseJSON(STORAGE_KEYS.legacyFavoriteTexts, {});
        const legacyTextKeys = legacyTexts && typeof legacyTexts === 'object' ? Object.keys(legacyTexts) : [];

        const hasLegacyFavorites = Array.isArray(favorites) && favorites.length > 0;
        const hasLegacyTexts = legacyTextKeys.length > 0;
        const alreadyStructured = hasLegacyFavorites && typeof favorites[0] === 'object' && favorites[0].id;

        if (alreadyStructured || (!hasLegacyFavorites && !hasLegacyTexts)) {
            return;
        }

        const ideaIndex = buildIdeaIndex();
        const legacyIds = hasLegacyFavorites ? favorites : legacyTextKeys;
        const seen = new Set();
        const migrated = [];

        legacyIds.forEach(function(id) {
            if (!id || seen.has(id)) {
                return;
            }
            seen.add(id);
            const idea = ideaIndex[id];
            if (idea) {
                migrated.push({
                    id: idea.id,
                    text: idea.text,
                    categoryName: idea.categoryName,
                    effort: idea.effort,
                    budget: idea.budget,
                    season: idea.season,
                    favoritedAt: Date.now()
                });
            } else {
                migrated.push({
                    id: id,
                    text: legacyTexts[id] || id,
                    categoryName: 'Saved',
                    effort: 'low',
                    budget: 'free',
                    season: 'any',
                    favoritedAt: Date.now()
                });
            }
        });

        safeSetJSON(STORAGE_KEYS.favorites, migrated);
        safeRemoveItem(STORAGE_KEYS.legacyFavoriteTexts);
    }

    function migrateTheme() {
        const raw = safeGetItem(STORAGE_KEYS.theme);
        if (raw === 'light' || raw === 'dark') {
            safeSetJSON(STORAGE_KEYS.theme, raw);
        }
    }

    function init() {
        migrateTheme();
        migrateFavorites();
    }

    window.StorageApi = {
        safeParseJSON: safeParseJSON,
        safeSetJSON: safeSetJSON,
        init: init,
        getThemePreference: getThemePreference,
        setThemePreference: setThemePreference,
        getValentineModePreference: getValentineModePreference,
        setValentineModePreference: setValentineModePreference,
        getFavorites: getFavorites,
        setFavorites: setFavorites,
        getReadNotes: getReadNotes,
        setReadNotes: setReadNotes,
        clearReadNotes: clearReadNotes,
        getBonusNoteRead: getBonusNoteRead,
        setBonusNoteRead: setBonusNoteRead,
        getDateHistory: getDateHistory,
        setDateHistory: setDateHistory,
        addHistoryEntry: addHistoryEntry,
        clearHistory: clearHistory,
        getAvoidRepeats: getAvoidRepeats,
        setAvoidRepeats: setAvoidRepeats,
        getFilters: getFilters,
        setFilters: setFilters,
        getChecklistState: getChecklistState,
        setChecklistState: setChecklistState,
        updateChecklistItem: updateChecklistItem
    };
})();
