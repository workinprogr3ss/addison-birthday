/* ==========================================================================
   Date Night Roulette & Love Notes - UI
   ========================================================================== */

(function() {
    'use strict';

    const CONFIG = window.CONFIG;
    const StorageApi = window.StorageApi;

    if (!CONFIG || !StorageApi) {
        return;
    }

    const DOM = {};
    const state = {
        currentRotation: 0,
        isSpinning: false,
        selectedCategory: null,
        spinToken: 0,
        notesComplete: false
    };

    const wheelColors = [
        '#7c5cbf', '#a78bdb', '#e8b4bc', '#d4a574',
        '#7c5cbf', '#a78bdb', '#e8b4bc', '#d4a574'
    ];

    const ideaIndex = buildIdeaIndex();
    const allIdeas = buildIdeaList();

    let scrollLockCount = 0;

    function cacheDom() {
        DOM.particles = document.getElementById('particles');
        DOM.wheel = document.getElementById('wheel');
        DOM.spinBtn = document.getElementById('spin-btn');
        DOM.ideasPanel = document.getElementById('ideas-panel');
        DOM.filters = document.getElementById('filters');
        DOM.filtersToggle = document.getElementById('filters-toggle');
        DOM.filtersSummary = document.getElementById('filters-summary');
        DOM.globalPickBtn = document.getElementById('global-pick-btn');
        DOM.avoidRepeatsToggle = document.getElementById('avoid-repeats-toggle');
        DOM.favoritesSection = document.getElementById('favorites-section');
        DOM.favoritesList = document.getElementById('favorites-list');
        DOM.favoritesClear = document.getElementById('favorites-clear');
        DOM.historySection = document.getElementById('history-section');
        DOM.historyList = document.getElementById('history-list');
        DOM.historyClear = document.getElementById('history-clear');
        DOM.notesGrid = document.getElementById('notes-grid');
        DOM.notesResetContainer = document.getElementById('notes-reset-container');
        DOM.notesResetBtn = document.getElementById('notes-reset-btn');
        DOM.notesProgress = document.getElementById('notes-progress');
        DOM.notesProgressText = document.getElementById('notes-progress-text');
        DOM.notesConfetti = document.getElementById('notes-confetti');
        DOM.noteModal = document.getElementById('note-modal');
        DOM.noteModalClose = DOM.noteModal ? DOM.noteModal.querySelector('.note-close') : null;
        DOM.noteModalBackdrop = DOM.noteModal ? DOM.noteModal.querySelector('.note-modal-backdrop') : null;
        DOM.modalTrigger = document.getElementById('modal-trigger');
        DOM.modalMessage = document.getElementById('modal-message');
        DOM.planModal = document.getElementById('plan-modal');
        DOM.planModalClose = DOM.planModal ? DOM.planModal.querySelector('.plan-modal-close') : null;
        DOM.planModalBackdrop = DOM.planModal ? DOM.planModal.querySelector('.plan-modal-backdrop') : null;
        DOM.planTitle = document.getElementById('plan-title');
        DOM.planCategory = document.getElementById('plan-category');
        DOM.planIcon = document.getElementById('plan-icon');
        DOM.planTags = document.getElementById('plan-tags');
        DOM.planDuration = document.getElementById('plan-duration');
        DOM.planChecklist = document.getElementById('plan-checklist');
        DOM.planNote = document.getElementById('plan-note');
        DOM.planEmpty = document.getElementById('plan-empty');
        DOM.wheelSelected = document.getElementById('wheel-selected');
        DOM.wheelSelectedName = document.getElementById('wheel-selected-name');
        DOM.wheelSelectedIcon = document.getElementById('wheel-selected-icon');
        DOM.themeToggle = document.getElementById('theme-toggle');
        DOM.recipientName = document.getElementById('recipient-name');
        DOM.birthdayMessage = document.getElementById('birthday-message');
        DOM.easterEggTrigger = document.getElementById('easter-egg-trigger');
        DOM.easterEggModal = document.getElementById('easter-egg-modal');
        DOM.easterEggMessage = document.getElementById('easter-egg-message');
        DOM.confetti = document.getElementById('confetti');
        DOM.easterEggClose = DOM.easterEggModal ? DOM.easterEggModal.querySelector('.easter-egg-close') : null;
        DOM.easterEggBackdrop = DOM.easterEggModal ? DOM.easterEggModal.querySelector('.easter-egg-backdrop') : null;
    }

    // ======================================================================
    // Helper: Create SVG Elements
    // ======================================================================

    function createHeartSVG(filled, size) {
        const isFilled = filled || false;
        const iconSize = size || 18;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', iconSize);
        svg.setAttribute('height', iconSize);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', isFilled ? 'currentColor' : 'none');
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

    function createCategoryIcon(iconName, className) {
        const iconContainer = document.createElement('div');
        iconContainer.className = className || 'ideas-icon';

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

        const paths = iconPaths[iconName] || iconPaths.sparkles;
        paths.forEach(function(d) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            svg.appendChild(path);
        });

        iconContainer.appendChild(svg);
        return iconContainer;
    }

    // ======================================================================
    // Theme Management
    // ======================================================================

    function initTheme() {
        const savedTheme = StorageApi.getThemePreference();
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', initialTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        StorageApi.setThemePreference(newTheme);
    }

    // ======================================================================
    // Particles Background
    // ======================================================================

    function initParticles() {
        const container = DOM.particles;
        const particleCount = 30;

        if (!container || container.dataset.particlesInit === 'true') {
            return;
        }

        container.textContent = '';
        container.dataset.particlesInit = 'true';

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < particleCount; i += 1) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            fragment.appendChild(particle);
        }

        container.appendChild(fragment);
    }

    // ======================================================================
    // Scroll Lock
    // ======================================================================

    function lockBodyScroll() {
        scrollLockCount += 1;
        if (scrollLockCount > 1) {
            return;
        }
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
        }
    }

    function unlockBodyScroll() {
        scrollLockCount = Math.max(0, scrollLockCount - 1);
        if (scrollLockCount > 0) {
            return;
        }
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    function openModal(modal) {
        if (!modal) {
            return;
        }
        modal.classList.add('open');
        lockBodyScroll();
    }

    function closeModal(modal) {
        if (!modal) {
            return;
        }
        modal.classList.remove('open');
        unlockBodyScroll();
    }

    // ======================================================================
    // Roulette Wheel
    // ======================================================================

    function setSpinButtonState(mode) {
        const spinBtn = DOM.spinBtn;
        if (!spinBtn) {
            return;
        }

        spinBtn.classList.remove('is-spinning', 'is-after');

        if (mode === 'spinning') {
            spinBtn.textContent = 'Spinning...';
            spinBtn.disabled = true;
            spinBtn.classList.add('is-spinning');
            return;
        }

        if (mode === 'after') {
            spinBtn.textContent = 'Spin again';
            spinBtn.disabled = false;
            spinBtn.classList.add('is-after');
            return;
        }

        spinBtn.textContent = 'Spin';
        spinBtn.disabled = false;
    }

    function showIdeasPlaceholder(message, isChoosing) {
        const panel = DOM.ideasPanel;
        if (!panel) {
            return;
        }

        panel.textContent = '';

        const placeholder = document.createElement('div');
        placeholder.className = 'ideas-placeholder' + (isChoosing ? ' is-choosing' : '');

        const text = document.createElement('p');
        text.className = 'ideas-placeholder-text';

        if (isChoosing) {
            const label = document.createElement('span');
            label.textContent = message;

            const dots = document.createElement('span');
            dots.className = 'ideas-placeholder-dots';

            for (let i = 0; i < 3; i += 1) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.textContent = '.';
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
        const highlighted = document.querySelectorAll('.idea-item.is-highlighted');
        highlighted.forEach(function(el) {
            el.classList.remove('is-highlighted');
        });

        void item.offsetWidth;

        item.classList.add('is-highlighted');
        function handleHighlightEnd(event) {
            if (event.animationName !== 'highlight-sheen') {
                return;
            }
            item.classList.remove('is-highlighted');
            item.removeEventListener('animationend', handleHighlightEnd);
        }
        item.addEventListener('animationend', handleHighlightEnd);
    }

    function renderWheel() {
        const wheel = DOM.wheel;
        if (!wheel) {
            return;
        }
        const categories = CONFIG.dateCategories;
        const segmentAngle = 360 / categories.length;
        const labelRadius = Math.max(80, (wheel.offsetWidth / 2) - 50);

        const gradientStops = categories.map(function(category, index) {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const color = wheelColors[index % wheelColors.length];
            return color + ' ' + startAngle + 'deg ' + endAngle + 'deg';
        }).join(', ');

        wheel.style.background = 'conic-gradient(' + gradientStops + ')';
        wheel.textContent = '';

        const labelsContainer = document.createElement('div');
        labelsContainer.className = 'wheel-labels';

        categories.forEach(function(category, index) {
            const angleDeg = (index * segmentAngle) + (segmentAngle / 2) - 90;
            const angleRad = angleDeg * (Math.PI / 180);

            const x = Math.cos(angleRad) * labelRadius;
            const y = Math.sin(angleRad) * labelRadius;

            const text = document.createElement('span');
            text.className = 'wheel-segment-text';
            text.textContent = category.name;

            const rotation = angleDeg + 90;
            text.style.transform = 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px) rotate(' + rotation + 'deg)';

            labelsContainer.appendChild(text);
        });

        wheel.appendChild(labelsContainer);
    }

    function updateSelectedCategoryLabel(category) {
        if (!DOM.wheelSelected || !DOM.wheelSelectedName || !DOM.wheelSelectedIcon) {
            return;
        }

        if (!category) {
            DOM.wheelSelected.classList.remove('is-visible');
            DOM.wheelSelectedName.textContent = '';
            DOM.wheelSelectedIcon.textContent = '';
            return;
        }

        DOM.wheelSelectedName.textContent = category.name;
        DOM.wheelSelectedIcon.textContent = '';
        DOM.wheelSelectedIcon.appendChild(createCategoryIcon(category.icon, 'wheel-selected-icon'));
        DOM.wheelSelected.classList.add('is-visible');
    }

    function spinWheel() {
        if (state.isSpinning) {
            return;
        }

        const wheel = DOM.wheel;
        if (!wheel) {
            return;
        }
        const categories = CONFIG.dateCategories;
        const segmentAngle = 360 / categories.length;
        const spinId = state.spinToken + 1;
        state.spinToken = spinId;

        state.isSpinning = true;
        state.selectedCategory = null;
        wheel.classList.add('spinning');
        setSpinButtonState('spinning');
        showIdeasPlaceholder('Choosing', true);

        const fullRotations = 3 + Math.floor(Math.random() * 3);
        const randomSegment = Math.floor(Math.random() * categories.length);
        const segmentOffset = randomSegment * segmentAngle + segmentAngle / 2;

        const finalRotation = state.currentRotation + (fullRotations * 360) + (360 - segmentOffset);

        function handleSpinEnd(event) {
            if (event.target !== wheel || event.propertyName !== 'transform') {
                return;
            }

            if (spinId !== state.spinToken) {
                return;
            }

            wheel.removeEventListener('transitionend', handleSpinEnd);
            state.isSpinning = false;
            wheel.classList.remove('spinning');
            state.selectedCategory = categories[randomSegment];
            setSpinButtonState('after');
            showDateIdeas(state.selectedCategory);
        }

        wheel.addEventListener('transitionend', handleSpinEnd);
        wheel.style.transform = 'rotate(' + finalRotation + 'deg)';
        state.currentRotation = finalRotation;
    }

    // ======================================================================
    // Filters
    // ======================================================================

    function getCurrentFilters() {
        const filters = {
            effort: 'all',
            budget: 'all',
            season: 'all'
        };

        document.querySelectorAll('.filter-chip.active').forEach(function(chip) {
            filters[chip.dataset.filter] = chip.dataset.value;
        });

        return filters;
    }

    function updateFiltersSummary() {
        if (!DOM.filtersSummary) {
            return;
        }

        const filters = getCurrentFilters();
        const parts = [
            'Effort: ' + (filters.effort === 'all' ? 'All' : filters.effort),
            'Budget: ' + (filters.budget === 'all' ? 'All' : filters.budget),
            'Season: ' + (filters.season === 'all' ? 'All' : filters.season)
        ];

        if (StorageApi.getAvoidRepeats()) {
            parts.push('Avoid repeats');
        }

        DOM.filtersSummary.textContent = parts.join(' | ');
    }

    function setFiltersOpen(isOpen) {
        if (!DOM.filters || !DOM.filtersToggle) {
            return;
        }
        const shouldOpen = Boolean(isOpen);
        DOM.filters.classList.toggle('is-collapsed', !shouldOpen);
        DOM.filtersToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }

    function initFilters() {
        if (!DOM.filtersToggle || !DOM.filters) {
            return;
        }

        DOM.filtersToggle.addEventListener('click', function() {
            const isOpen = DOM.filtersToggle.getAttribute('aria-expanded') === 'true';
            setFiltersOpen(!isOpen);
        });

        document.querySelectorAll('.filter-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                const group = chip.closest('.filter-group');
                group.querySelectorAll('.filter-chip').forEach(function(button) {
                    button.classList.remove('active');
                    if (button.hasAttribute('aria-pressed')) {
                        button.setAttribute('aria-pressed', 'false');
                    }
                });
                chip.classList.add('active');
                if (chip.hasAttribute('aria-pressed')) {
                    chip.setAttribute('aria-pressed', 'true');
                }

                updateFiltersSummary();

                if (state.selectedCategory) {
                    triggerFilterFeedback();
                    showDateIdeas(state.selectedCategory);
                }
            });
        });

        updateFiltersSummary();
    }

    function resetFilters() {
        document.querySelectorAll('.filter-group').forEach(function(group) {
            group.querySelectorAll('.filter-chip').forEach(function(chip) {
                chip.classList.remove('active');
                if (chip.hasAttribute('aria-pressed')) {
                    chip.setAttribute('aria-pressed', 'false');
                }
            });
            const allChip = group.querySelector('.filter-chip[data-value="all"]');
            if (allChip) {
                allChip.classList.add('active');
                if (allChip.hasAttribute('aria-pressed')) {
                    allChip.setAttribute('aria-pressed', 'true');
                }
            }
        });

        updateFiltersSummary();

        if (state.selectedCategory) {
            triggerFilterFeedback();
            showDateIdeas(state.selectedCategory);
        }
    }

    function triggerFilterFeedback() {
        const panel = DOM.ideasPanel;
        if (!panel) {
            return;
        }

        panel.classList.remove('is-filtering');
        void panel.offsetWidth;
        panel.classList.add('is-filtering');
        panel.addEventListener('animationend', function() {
            panel.classList.remove('is-filtering');
        }, { once: true });
    }

    function initAvoidRepeatsToggle() {
        if (!DOM.avoidRepeatsToggle) {
            return;
        }

        DOM.avoidRepeatsToggle.checked = StorageApi.getAvoidRepeats();

        DOM.avoidRepeatsToggle.addEventListener('change', function() {
            StorageApi.setAvoidRepeats(DOM.avoidRepeatsToggle.checked);
            updateFiltersSummary();
            if (state.selectedCategory) {
                showDateIdeas(state.selectedCategory);
            }
        });
    }

    // ======================================================================
    // Ideas + History
    // ======================================================================

    function buildIdeaIndex() {
        const index = {};
        CONFIG.dateCategories.forEach(function(category) {
            category.ideas.forEach(function(idea) {
                index[idea.id] = {
                    idea: idea,
                    category: category
                };
            });
        });
        return index;
    }

    function buildIdeaList() {
        const ideas = [];
        CONFIG.dateCategories.forEach(function(category) {
            category.ideas.forEach(function(idea) {
                ideas.push({
                    idea: idea,
                    category: category
                });
            });
        });
        return ideas;
    }

    function filterIdeas(ideas, filters) {
        return ideas.filter(function(idea) {
            const matchesEffort = filters.effort === 'all' || idea.effort === filters.effort;
            const matchesBudget = filters.budget === 'all' || idea.budget === filters.budget;
            const matchesSeason = filters.season === 'all' || idea.season === filters.season || idea.season === 'any';
            return matchesEffort && matchesBudget && matchesSeason;
        });
    }

    function getHistoryIdSet() {
        const history = StorageApi.getDateHistory();
        return new Set(history.map(function(entry) {
            return entry.id;
        }));
    }

    function getDisplayIdeas(ideas, filters, includeId) {
        const filtered = filterIdeas(ideas, filters);
        if (!StorageApi.getAvoidRepeats()) {
            return { filtered: filtered, available: filtered };
        }

        const historyIds = getHistoryIdSet();
        const available = filtered.filter(function(idea) {
            if (includeId && idea.id === includeId) {
                return true;
            }
            return !historyIds.has(idea.id);
        });

        return { filtered: filtered, available: available };
    }

    function renderIdeasMessage(options) {
        const panel = DOM.ideasPanel;
        if (!panel) {
            return;
        }

        panel.textContent = '';

        const placeholder = document.createElement('div');
        placeholder.className = 'ideas-placeholder';

        const message = document.createElement('p');
        message.textContent = options.message;
        placeholder.appendChild(message);

        if (options.actions && options.actions.length) {
            const actions = document.createElement('div');
            actions.className = 'ideas-placeholder-actions';

            options.actions.forEach(function(action) {
                const button = document.createElement('button');
                button.className = 'ideas-reset' + (action.secondary ? ' is-secondary' : '');
                button.textContent = action.label;
                button.addEventListener('click', action.onClick);
                actions.appendChild(button);
            });

            placeholder.appendChild(actions);
        }

        panel.appendChild(placeholder);
    }

    function showDateIdeas(category, options) {
        const panel = DOM.ideasPanel;
        if (!panel || !category) {
            return;
        }

        const config = options || {};
        const currentFilters = getCurrentFilters();
        const ideasData = getDisplayIdeas(category.ideas, currentFilters, config.includeId);
        const filteredIdeas = ideasData.filtered;
        const displayIdeas = ideasData.available;
        const favorites = StorageApi.getFavorites();

        panel.textContent = '';
        const wasUnselected = !state.selectedCategory;
        state.selectedCategory = category;
        if (wasUnselected) {
            setFiltersOpen(true);
        }
        updateSelectedCategoryLabel(category);

        const header = document.createElement('div');
        header.className = 'ideas-header';

        header.appendChild(createCategoryIcon(category.icon));

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'ideas-category';
        categoryTitle.textContent = category.name;
        header.appendChild(categoryTitle);

        const count = document.createElement('span');
        count.className = 'ideas-count';
        const countValue = displayIdeas.length;
        count.textContent = countValue + (countValue === 1 ? ' idea match' : ' ideas match');
        header.appendChild(count);

        panel.appendChild(header);

        const list = document.createElement('div');
        list.className = 'ideas-list';
        const ideaElements = {};
        const listFragment = document.createDocumentFragment();

        if (filteredIdeas.length === 0) {
            renderIdeasMessage({
                message: 'No ideas match your filters. Try adjusting them!',
                actions: [
                    { label: 'Reset filters', onClick: resetFilters }
                ]
            });
            return;
        }

        if (displayIdeas.length === 0 && StorageApi.getAvoidRepeats()) {
            renderIdeasMessage({
                message: 'All of these ideas are already in our history.',
                actions: [
                    {
                        label: 'Clear history',
                        onClick: function() {
                            StorageApi.clearHistory();
                            renderHistory();
                            showDateIdeas(category);
                        }
                    },
                    {
                        label: 'Turn off repeats',
                        secondary: true,
                        onClick: function() {
                            StorageApi.setAvoidRepeats(false);
                            if (DOM.avoidRepeatsToggle) {
                                DOM.avoidRepeatsToggle.checked = false;
                            }
                            updateFiltersSummary();
                            showDateIdeas(category);
                        }
                    }
                ]
            });
            return;
        }

        displayIdeas.forEach(function(idea) {
            const isFavorited = favorites.some(function(favorite) {
                return favorite.id === idea.id;
            });

            const item = document.createElement('div');
            item.className = 'idea-item';
            item.dataset.ideaId = idea.id;

            const textSpan = document.createElement('span');
            textSpan.className = 'idea-text';
            textSpan.textContent = idea.text;
            item.appendChild(textSpan);

            const meta = document.createElement('div');
            meta.className = 'idea-meta';

            const effortTag = document.createElement('span');
            effortTag.className = 'idea-tag';
            effortTag.textContent = idea.effort;
            meta.appendChild(effortTag);

            const budgetTag = document.createElement('span');
            budgetTag.className = 'idea-tag';
            budgetTag.textContent = idea.budget;
            meta.appendChild(budgetTag);

            const seasonTag = document.createElement('span');
            seasonTag.className = 'idea-tag';
            seasonTag.textContent = idea.season;
            meta.appendChild(seasonTag);

            const favBtn = document.createElement('button');
            favBtn.className = 'idea-favorite' + (isFavorited ? ' favorited' : '');
            favBtn.setAttribute('aria-label', 'Save to favorites');
            favBtn.appendChild(createHeartSVG(isFavorited));
            favBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                toggleFavorite(idea, category);
            });
            meta.appendChild(favBtn);

            item.appendChild(meta);
            listFragment.appendChild(item);
            ideaElements[idea.id] = item;
        });

        list.appendChild(listFragment);
        panel.appendChild(list);

        if (displayIdeas.length > 0) {
            const actions = document.createElement('div');
            actions.className = 'ideas-actions';

            const pickBtn = document.createElement('button');
            pickBtn.className = 'ideas-pick-button';
            pickBtn.textContent = 'Pick one for us';
            pickBtn.addEventListener('click', function() {
                const latestIdeas = getDisplayIdeas(category.ideas, getCurrentFilters());
                const availableIdeas = latestIdeas.available;
                if (availableIdeas.length === 0) {
                    showDateIdeas(category);
                    return;
                }
                const choiceIndex = Math.floor(Math.random() * availableIdeas.length);
                const chosenIdea = availableIdeas[choiceIndex];
                const chosenItem = ideaElements[chosenIdea.id];
                if (chosenItem) {
                    highlightIdea(chosenItem);
                }
                recordHistory(chosenIdea, category);
                openPlanView(chosenIdea, category);
            });

            actions.appendChild(pickBtn);
            panel.appendChild(actions);

            if (config.highlightIdeaId && ideaElements[config.highlightIdeaId]) {
                highlightIdea(ideaElements[config.highlightIdeaId]);
            }
        }
    }

    function pickRandomIdea(ideas) {
        if (!ideas.length) {
            return null;
        }
        const index = Math.floor(Math.random() * ideas.length);
        return ideas[index];
    }

    function handleGlobalPick() {
        const currentFilters = getCurrentFilters();
        const avoidRepeats = StorageApi.getAvoidRepeats();
        const historyIds = avoidRepeats ? getHistoryIdSet() : null;

        const eligible = allIdeas.filter(function(entry) {
            const idea = entry.idea;
            const matchesEffort = currentFilters.effort === 'all' || idea.effort === currentFilters.effort;
            const matchesBudget = currentFilters.budget === 'all' || idea.budget === currentFilters.budget;
            const matchesSeason = currentFilters.season === 'all' || idea.season === currentFilters.season || idea.season === 'any';
            const passesFilters = matchesEffort && matchesBudget && matchesSeason;
            if (!passesFilters) {
                return false;
            }
            if (avoidRepeats && historyIds) {
                return !historyIds.has(idea.id);
            }
            return true;
        });

        if (!eligible.length) {
            const actions = [
                {
                    label: 'Reset filters',
                    onClick: resetFilters
                }
            ];

            if (avoidRepeats) {
                actions.push({
                    label: 'Clear history',
                    onClick: function() {
                        StorageApi.clearHistory();
                        renderHistory();
                        updateFiltersSummary();
                    }
                });

                actions.push({
                    label: 'Turn off repeats',
                    secondary: true,
                    onClick: function() {
                        StorageApi.setAvoidRepeats(false);
                        if (DOM.avoidRepeatsToggle) {
                            DOM.avoidRepeatsToggle.checked = false;
                        }
                        updateFiltersSummary();
                    }
                });
            }

            renderIdeasMessage({
                message: avoidRepeats
                    ? 'No available ideas match these filters while avoiding repeats.'
                    : 'No available ideas match these filters right now.',
                actions: actions
            });
            return;
        }

        const choice = pickRandomIdea(eligible);
        if (!choice) {
            return;
        }

        showDateIdeas(choice.category, { includeId: choice.idea.id, highlightIdeaId: choice.idea.id });
        recordHistory(choice.idea, choice.category);
        openPlanView(choice.idea, choice.category);
    }

    function recordHistory(idea, category) {
        StorageApi.addHistoryEntry({
            id: idea.id,
            text: idea.text,
            categoryName: category.name,
            effort: idea.effort,
            budget: idea.budget,
            season: idea.season,
            pickedAt: Date.now()
        });
        renderHistory();
    }

    function formatRelativeTime(timestamp) {
        const now = Date.now();
        const diffMs = now - timestamp;
        const diffSeconds = Math.floor(diffMs / 1000);

        if (diffSeconds < 60) {
            return 'just now';
        }

        const diffMinutes = Math.floor(diffSeconds / 60);
        if (diffMinutes < 60) {
            return diffMinutes + ' min ago';
        }

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) {
            return diffHours + ' hr ago';
        }

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) {
            return diffDays + ' days ago';
        }

        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    function renderHistory() {
        const section = DOM.historySection;
        const list = DOM.historyList;
        if (!section || !list) {
            return;
        }

        const history = StorageApi.getDateHistory();
        list.textContent = '';

        if (history.length === 0) {
            section.classList.add('is-empty');
            if (DOM.historyClear) {
                DOM.historyClear.style.display = 'none';
            }

            const emptyCard = document.createElement('div');
            emptyCard.className = 'history-empty';
            emptyCard.textContent = 'New picks show up here once we start spinning.';
            list.appendChild(emptyCard);
            return;
        }

        section.classList.remove('is-empty');
        if (DOM.historyClear) {
            DOM.historyClear.style.display = 'inline-flex';
        }

        const fragment = document.createDocumentFragment();
        history.slice(0, 5).forEach(function(entry) {
            const item = document.createElement('div');
            item.className = 'history-item';

            const text = document.createElement('span');
            text.className = 'history-text';
            text.textContent = entry.text;
            item.appendChild(text);

            const meta = document.createElement('div');
            meta.className = 'history-meta';

            const category = document.createElement('span');
            category.className = 'history-category';
            category.textContent = entry.categoryName;
            meta.appendChild(category);

            const timestamp = document.createElement('span');
            timestamp.className = 'history-time';
            timestamp.textContent = entry.pickedAt ? formatRelativeTime(entry.pickedAt) : 'recently';
            meta.appendChild(timestamp);

            item.appendChild(meta);
            fragment.appendChild(item);
        });

        list.appendChild(fragment);
    }

    function initHistoryControls() {
        if (!DOM.historyClear) {
            return;
        }
        DOM.historyClear.addEventListener('click', function() {
            StorageApi.clearHistory();
            renderHistory();
            if (state.selectedCategory) {
                showDateIdeas(state.selectedCategory);
            }
        });
    }

    // ======================================================================
    // Favorites
    // ======================================================================

    function buildFavorite(idea, category) {
        return {
            id: idea.id,
            text: idea.text,
            categoryName: category.name,
            effort: idea.effort,
            budget: idea.budget,
            season: idea.season,
            favoritedAt: Date.now()
        };
    }

    function toggleFavorite(idea, category) {
        const favorites = StorageApi.getFavorites();
        const index = favorites.findIndex(function(favorite) {
            return favorite.id === idea.id;
        });

        if (index === -1) {
            favorites.unshift(buildFavorite(idea, category));
        } else {
            favorites.splice(index, 1);
        }

        StorageApi.setFavorites(favorites);
        renderFavorites();

        if (state.selectedCategory) {
            showDateIdeas(state.selectedCategory);
        }
    }

    function renderFavorites() {
        const favorites = StorageApi.getFavorites();
        const section = DOM.favoritesSection;
        const list = DOM.favoritesList;
        if (!section || !list) {
            return;
        }

        list.textContent = '';

        if (favorites.length === 0) {
            section.classList.add('is-empty');
            section.classList.remove('has-favorites');
            if (DOM.favoritesClear) {
                DOM.favoritesClear.style.display = 'none';
            }

            const emptyCard = document.createElement('div');
            emptyCard.className = 'favorites-empty';
            const emptyTitle = document.createElement('p');
            emptyTitle.textContent = 'Tap a heart to save ideas here.';
            emptyCard.appendChild(emptyTitle);
            list.appendChild(emptyCard);
            return;
        }

        section.classList.remove('is-empty');
        section.classList.add('has-favorites');
        if (DOM.favoritesClear) {
            DOM.favoritesClear.style.display = 'inline-flex';
        }

        const fragment = document.createDocumentFragment();

        favorites.forEach(function(favorite) {
            const item = document.createElement('div');
            item.className = 'favorite-item';

            const main = document.createElement('div');
            main.className = 'favorite-main';

            const textSpan = document.createElement('span');
            textSpan.className = 'favorite-text';
            textSpan.textContent = favorite.text;
            main.appendChild(textSpan);

            const category = document.createElement('span');
            category.className = 'favorite-category';
            category.textContent = favorite.categoryName;
            main.appendChild(category);

            item.appendChild(main);

            const tags = document.createElement('div');
            tags.className = 'favorite-tags';

            ['effort', 'budget', 'season'].forEach(function(key) {
                const value = favorite[key];
                if (!value) {
                    return;
                }
                const tag = document.createElement('span');
                tag.className = 'idea-tag';
                tag.textContent = value;
                tags.appendChild(tag);
            });

            item.appendChild(tags);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'favorite-remove';
            removeBtn.setAttribute('aria-label', 'Remove from favorites');
            removeBtn.appendChild(createCloseSVG());
            removeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                const remaining = StorageApi.getFavorites().filter(function(entry) {
                    return entry.id !== favorite.id;
                });
                StorageApi.setFavorites(remaining);
                renderFavorites();
                if (state.selectedCategory) {
                    showDateIdeas(state.selectedCategory);
                }
            });
            item.appendChild(removeBtn);

            item.addEventListener('click', function() {
                const entry = ideaIndex[favorite.id];
                const idea = entry ? entry.idea : favorite;
                const category = entry ? entry.category : { name: favorite.categoryName, icon: 'sparkles' };
                openPlanView(idea, category);
            });

            fragment.appendChild(item);
        });

        list.appendChild(fragment);
    }

    function initFavoritesControls() {
        if (!DOM.favoritesClear) {
            return;
        }
        DOM.favoritesClear.addEventListener('click', function() {
            StorageApi.setFavorites([]);
            renderFavorites();
            if (state.selectedCategory) {
                showDateIdeas(state.selectedCategory);
            }
        });
    }

    // ======================================================================
    // Plan Modal
    // ======================================================================

    function renderPlanChecklist(idea) {
        if (!DOM.planChecklist) {
            return false;
        }

        DOM.planChecklist.textContent = '';
        if (!idea.details || !Array.isArray(idea.details.checklist) || idea.details.checklist.length === 0) {
            return false;
        }

        const heading = document.createElement('h4');
        heading.textContent = 'What we need';
        DOM.planChecklist.appendChild(heading);

        const list = document.createElement('div');
        list.className = 'plan-checklist-items';

        const savedChecklist = StorageApi.getChecklistState();
        const savedItems = Array.isArray(savedChecklist[idea.id]) ? savedChecklist[idea.id] : [];

        idea.details.checklist.forEach(function(itemText, index) {
            const label = document.createElement('label');
            label.className = 'plan-checklist-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = Boolean(savedItems[index]);
            checkbox.addEventListener('change', function() {
                StorageApi.updateChecklistItem(idea.id, index, checkbox.checked);
            });

            const text = document.createElement('span');
            text.textContent = itemText;

            label.appendChild(checkbox);
            label.appendChild(text);
            list.appendChild(label);
        });

        DOM.planChecklist.appendChild(list);
        return true;
    }

    function openPlanView(idea, category) {
        if (!DOM.planModal || !DOM.planTitle || !DOM.planCategory || !DOM.planTags || !DOM.planIcon) {
            return;
        }

        DOM.planTitle.textContent = idea.text;
        DOM.planCategory.textContent = category.name;
        DOM.planIcon.textContent = '';
        DOM.planIcon.appendChild(createCategoryIcon(category.icon, 'plan-icon'));

        DOM.planTags.textContent = '';
        ['effort', 'budget', 'season'].forEach(function(key) {
            if (!idea[key]) {
                return;
            }
            const tag = document.createElement('span');
            tag.className = 'idea-tag';
            tag.textContent = idea[key];
            DOM.planTags.appendChild(tag);
        });

        let hasDetails = false;

        if (DOM.planDuration) {
            DOM.planDuration.textContent = '';
            if (idea.details && idea.details.duration) {
                const durationLabel = document.createElement('h4');
                durationLabel.textContent = 'Estimated time';
                const durationValue = document.createElement('p');
                durationValue.textContent = idea.details.duration;
                DOM.planDuration.appendChild(durationLabel);
                DOM.planDuration.appendChild(durationValue);
                hasDetails = true;
            }
        }

        if (DOM.planNote) {
            DOM.planNote.textContent = '';
            if (idea.details && idea.details.note) {
                const noteLabel = document.createElement('h4');
                noteLabel.textContent = 'Why I picked this';
                const noteText = document.createElement('p');
                noteText.textContent = idea.details.note;
                DOM.planNote.appendChild(noteLabel);
                DOM.planNote.appendChild(noteText);
                hasDetails = true;
            }
        }

        const hasChecklist = renderPlanChecklist(idea);
        hasDetails = hasDetails || hasChecklist;

        if (DOM.planEmpty) {
            DOM.planEmpty.textContent = '';
            if (!hasDetails) {
                DOM.planEmpty.textContent = 'No extra details yet - just a simple, perfect plan with you.';
            }
        }

        openModal(DOM.planModal);
    }

    function closePlanView() {
        closeModal(DOM.planModal);
    }

    function initPlanModal() {
        if (!DOM.planModal) {
            return;
        }

        if (DOM.planModalClose) {
            DOM.planModalClose.addEventListener('click', closePlanView);
        }
        if (DOM.planModalBackdrop) {
            DOM.planModalBackdrop.addEventListener('click', closePlanView);
        }
    }

    // ======================================================================
    // Love Notes
    // ======================================================================

    function initNotesState() {
        const readNotes = StorageApi.getReadNotes();
        state.notesComplete = readNotes.length >= CONFIG.loveNotes.length;
    }

    function renderNotes() {
        const grid = DOM.notesGrid;
        if (!grid) {
            return;
        }
        const readNotes = StorageApi.getReadNotes();
        const bonusRead = StorageApi.getBonusNoteRead();
        const isComplete = readNotes.length >= CONFIG.loveNotes.length;

        grid.textContent = '';

        const fragment = document.createDocumentFragment();

        CONFIG.loveNotes.forEach(function(note, index) {
            const button = document.createElement('button');
            button.className = 'note-button' + (readNotes.indexOf(index) !== -1 ? ' read' : '');

            const label = document.createElement('span');
            label.className = 'note-label';
            label.textContent = 'Open';
            button.appendChild(label);

            const triggerText = document.createElement('span');
            triggerText.className = 'note-trigger-text';
            triggerText.textContent = note.trigger;
            button.appendChild(triggerText);

            const indicator = document.createElement('span');
            indicator.className = 'note-read-indicator';
            indicator.appendChild(createCheckSVG());
            button.appendChild(indicator);

            button.addEventListener('click', function() {
                openNote(index);
            });
            fragment.appendChild(button);
        });

        if (CONFIG.bonusLoveNote) {
            const bonusButton = document.createElement('button');
            bonusButton.className = 'note-button bonus-note' + (bonusRead ? ' read' : '') + (isComplete ? '' : ' is-locked');
            bonusButton.disabled = !isComplete;

            const label = document.createElement('span');
            label.className = 'note-label';
            label.textContent = 'Bonus';
            bonusButton.appendChild(label);

            const triggerText = document.createElement('span');
            triggerText.className = 'note-trigger-text';
            triggerText.textContent = isComplete ? CONFIG.bonusLoveNote.trigger : 'Unlock after every note';
            bonusButton.appendChild(triggerText);

            const hint = document.createElement('span');
            hint.className = 'note-hint';
            hint.textContent = isComplete ? 'A little extra just for you.' : 'Finish all notes to reveal.';
            bonusButton.appendChild(hint);

            const indicator = document.createElement('span');
            indicator.className = 'note-read-indicator';
            indicator.appendChild(createCheckSVG());
            bonusButton.appendChild(indicator);

            if (isComplete) {
                bonusButton.addEventListener('click', openBonusNote);
            }

            fragment.appendChild(bonusButton);
        }

        grid.appendChild(fragment);

        updateResetButtonVisibility();
        updateNotesProgress(readNotes);
    }

    function markNoteAsRead(index) {
        const readNotes = StorageApi.getReadNotes();
        if (readNotes.indexOf(index) === -1) {
            readNotes.push(index);
            StorageApi.setReadNotes(readNotes);
        }

        const isComplete = readNotes.length >= CONFIG.loveNotes.length;
        if (isComplete && !state.notesComplete) {
            state.notesComplete = true;
            if (DOM.notesConfetti) {
                launchConfetti(DOM.notesConfetti, 35);
            }
        }
    }

    function openNote(index) {
        const note = CONFIG.loveNotes[index];
        if (!note || !DOM.noteModal || !DOM.modalTrigger || !DOM.modalMessage) {
            return;
        }

        DOM.modalTrigger.textContent = 'Open ' + note.trigger;
        DOM.modalMessage.textContent = note.message;

        openModal(DOM.noteModal);

        markNoteAsRead(index);
        renderNotes();
    }

    function openBonusNote() {
        if (!CONFIG.bonusLoveNote || !DOM.noteModal || !DOM.modalTrigger || !DOM.modalMessage) {
            return;
        }

        DOM.modalTrigger.textContent = 'Open ' + CONFIG.bonusLoveNote.trigger;
        DOM.modalMessage.textContent = CONFIG.bonusLoveNote.message;

        StorageApi.setBonusNoteRead(true);
        openModal(DOM.noteModal);
        renderNotes();
    }

    function closeNoteModal() {
        closeModal(DOM.noteModal);
    }

    function initNoteModal() {
        if (!DOM.noteModal || !DOM.noteModalClose || !DOM.noteModalBackdrop) {
            return;
        }

        DOM.noteModalClose.addEventListener('click', closeNoteModal);
        DOM.noteModalBackdrop.addEventListener('click', closeNoteModal);
    }

    function updateResetButtonVisibility() {
        const readNotes = StorageApi.getReadNotes();
        const bonusRead = StorageApi.getBonusNoteRead();
        const container = DOM.notesResetContainer;
        if (!container) {
            return;
        }
        if (readNotes.length > 0 || bonusRead) {
            container.classList.add('has-read');
        } else {
            container.classList.remove('has-read');
        }
    }

    function resetReadNotes() {
        StorageApi.clearReadNotes();
        StorageApi.setBonusNoteRead(false);
        state.notesComplete = false;
        renderNotes();
        updateResetButtonVisibility();
    }

    function initResetButton() {
        if (!DOM.notesResetBtn) {
            return;
        }
        DOM.notesResetBtn.addEventListener('click', resetReadNotes);
        updateResetButtonVisibility();
    }

    function updateNotesProgress(readNotes) {
        const progress = DOM.notesProgress;
        const text = DOM.notesProgressText;
        const openedCount = readNotes ? readNotes.length : StorageApi.getReadNotes().length;
        const totalCount = CONFIG.loveNotes.length;

        if (text) {
            text.textContent = openedCount + '/' + totalCount + ' opened';
        }

        if (progress) {
            if (openedCount === totalCount && totalCount > 0) {
                progress.classList.add('is-complete');
            } else {
                progress.classList.remove('is-complete');
            }
        }
    }

    // ======================================================================
    // Confetti
    // ======================================================================

    function launchConfetti(container, count) {
        if (!container) {
            return;
        }

        container.textContent = '';

        const colors = ['#7c5cbf', '#a78bdb', '#e8b4bc', '#d4a574', '#4a9d6e'];
        const fragment = document.createDocumentFragment();
        const total = count || 50;

        for (let i = 0; i < total; i += 1) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (2 + Math.random()) + 's';
            fragment.appendChild(confetti);
        }

        container.appendChild(fragment);
    }

    // ======================================================================
    // Easter Egg
    // ======================================================================

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    let heartClickCount = 0;
    let heartClickTimer = null;

    function initKonamiCode() {
        document.addEventListener('keydown', function(event) {
            if (event.code === konamiCode[konamiIndex]) {
                konamiIndex += 1;
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
        const heart = DOM.easterEggTrigger;
        if (!heart) {
            return;
        }

        heart.addEventListener('click', function() {
            heartClickCount += 1;

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
        if (!DOM.easterEggModal || !DOM.easterEggMessage || !DOM.confetti) {
            return;
        }

        DOM.easterEggMessage.textContent = CONFIG.easterEggMessage;
        openModal(DOM.easterEggModal);
        launchConfetti(DOM.confetti, 50);
    }

    function closeEasterEgg() {
        closeModal(DOM.easterEggModal);
    }

    function initEasterEggModal() {
        if (!DOM.easterEggModal || !DOM.easterEggClose || !DOM.easterEggBackdrop) {
            return;
        }

        DOM.easterEggClose.addEventListener('click', closeEasterEgg);
        DOM.easterEggBackdrop.addEventListener('click', closeEasterEgg);
    }

    // ======================================================================
    // Populate Page Content
    // ======================================================================

    function populateContent() {
        if (DOM.recipientName) {
            DOM.recipientName.textContent = CONFIG.recipientName;
        }
        if (DOM.birthdayMessage) {
            DOM.birthdayMessage.textContent = CONFIG.birthdayMessage;
        }
        document.title = 'Happy Birthday, ' + CONFIG.recipientName;
    }

    // ======================================================================
    // Smooth Scroll for Navigation
    // ======================================================================

    function getHeaderOffset() {
        const header = document.querySelector('.header');
        if (header && header.offsetHeight) {
            return header.offsetHeight;
        }

        const rawValue = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
        if (!rawValue) {
            return 0;
        }

        if (rawValue.endsWith('rem')) {
            const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            return parseFloat(rawValue) * fontSize;
        }

        if (rawValue.endsWith('px')) {
            return parseFloat(rawValue);
        }

        const parsed = parseFloat(rawValue);
        return Number.isNaN(parsed) ? 0 : parsed;
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = getHeaderOffset();
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initGlobalKeybinds() {
        document.addEventListener('keydown', function(event) {
            if (event.key !== 'Escape') {
                return;
            }

            if (DOM.planModal && DOM.planModal.classList.contains('open')) {
                closePlanView();
                return;
            }

            if (DOM.noteModal && DOM.noteModal.classList.contains('open')) {
                closeNoteModal();
                return;
            }

            if (DOM.easterEggModal && DOM.easterEggModal.classList.contains('open')) {
                closeEasterEgg();
            }
        });
    }

    function initWheelResize() {
        const wheel = DOM.wheel;
        if (!wheel) {
            return;
        }

        let resizeTimer = null;

        function scheduleRender() {
            if (state.isSpinning) {
                return;
            }
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function() {
                renderWheel();
                resizeTimer = null;
            }, 120);
        }

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(function() {
                scheduleRender();
            });
            observer.observe(wheel);
        } else {
            window.addEventListener('resize', scheduleRender);
        }
    }

    // ======================================================================
    // Initialize Everything
    // ======================================================================

    document.addEventListener('DOMContentLoaded', function() {
        cacheDom();
        StorageApi.init();
        initNotesState();

        // Theme
        initTheme();
        if (DOM.themeToggle) {
            DOM.themeToggle.addEventListener('click', toggleTheme);
        }

        // Populate content
        populateContent();

        // Visual effects
        initParticles();

        // Roulette
        renderWheel();
        setSpinButtonState('idle');
        if (DOM.spinBtn) {
            DOM.spinBtn.addEventListener('click', spinWheel);
        }
        if (DOM.globalPickBtn) {
            DOM.globalPickBtn.addEventListener('click', handleGlobalPick);
        }
        initFilters();
        initAvoidRepeatsToggle();
        renderFavorites();
        initFavoritesControls();
        renderHistory();
        initHistoryControls();
        initWheelResize();

        // Love Notes
        renderNotes();
        initNoteModal();
        initResetButton();

        // Plan modal
        initPlanModal();

        // Easter Egg
        initKonamiCode();
        initHeartClick();
        initEasterEggModal();

        // Navigation
        initSmoothScroll();
        initGlobalKeybinds();

        // Initial UI state
        setFiltersOpen(false);
    });
})();
