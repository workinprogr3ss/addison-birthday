/* ==========================================================================
   Date Night Roulette & Love Notes - Ideas + History
   Ideas panel, history, idea picking.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const CONFIG = UI.CONFIG;
  const StorageApi = UI.StorageApi;

  // Built at parse time — CONFIG is already loaded
  const ideaIndex = buildIdeaIndex();
  const allIdeas = buildIdeaList();

  function buildIdeaIndex() {
    const index = {};
    CONFIG.dateCategories.forEach(function (category) {
      category.ideas.forEach(function (idea) {
        index[idea.id] = {
          idea: idea,
          category: category,
        };
      });
    });
    return index;
  }

  function buildIdeaList() {
    const ideas = [];
    CONFIG.dateCategories.forEach(function (category) {
      category.ideas.forEach(function (idea) {
        ideas.push({
          idea: idea,
          category: category,
        });
      });
    });
    return ideas;
  }

  function filterIdeas(ideas, filters) {
    return ideas.filter(function (idea) {
      const matchesEffort =
        filters.effort === "all" || idea.effort === filters.effort;
      const matchesBudget =
        filters.budget === "all" || idea.budget === filters.budget;
      const matchesSeason =
        filters.season === "all" ||
        idea.season === filters.season ||
        idea.season === "any";
      return matchesEffort && matchesBudget && matchesSeason;
    });
  }

  function getHistoryIdSet() {
    const history = StorageApi.getDateHistory();
    return new Set(
      history.map(function (entry) {
        return entry.id;
      }),
    );
  }

  function getDisplayIdeas(ideas, filters, includeId) {
    const filtered = filterIdeas(ideas, filters);
    if (!StorageApi.getAvoidRepeats()) {
      return { filtered: filtered, available: filtered };
    }

    const historyIds = getHistoryIdSet();
    const available = filtered.filter(function (idea) {
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

    panel.textContent = "";

    const placeholder = document.createElement("div");
    placeholder.className = "ideas-placeholder";

    const message = document.createElement("p");
    message.textContent = options.message;
    placeholder.appendChild(message);

    if (options.actions && options.actions.length) {
      const actions = document.createElement("div");
      actions.className = "ideas-placeholder-actions";

      options.actions.forEach(function (action) {
        const button = document.createElement("button");
        button.className =
          "ideas-reset" + (action.secondary ? " is-secondary" : "");
        button.textContent = action.label;
        button.addEventListener("click", action.onClick);
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
    const currentFilters = UI.getCurrentFilters();
    const ideasData = getDisplayIdeas(
      category.ideas,
      currentFilters,
      config.includeId,
    );
    const filteredIdeas = ideasData.filtered;
    const displayIdeas = ideasData.available;
    const favorites = StorageApi.getFavorites();

    panel.textContent = "";
    const wasUnselected = !state.selectedCategory;
    state.selectedCategory = category;
    if (wasUnselected) {
      UI.setFiltersOpen(true);
    }
    UI.updateSelectedCategoryLabel(category);

    const header = document.createElement("div");
    header.className = "ideas-header";

    header.appendChild(UI.createCategoryIcon(category.icon));

    const categoryTitle = document.createElement("h3");
    categoryTitle.className = "ideas-category";
    categoryTitle.textContent = category.name;
    header.appendChild(categoryTitle);

    const count = document.createElement("span");
    count.className = "ideas-count";
    const countValue = displayIdeas.length;
    count.textContent =
      countValue + (countValue === 1 ? " idea match" : " ideas match");
    header.appendChild(count);

    panel.appendChild(header);

    const list = document.createElement("div");
    list.className = "ideas-list";
    const ideaElements = {};
    const listFragment = document.createDocumentFragment();

    if (filteredIdeas.length === 0) {
      renderIdeasMessage({
        message: "No ideas match your filters. Try adjusting them!",
        actions: [{ label: "Reset filters", onClick: UI.resetFilters }],
      });
      return;
    }

    if (displayIdeas.length === 0 && StorageApi.getAvoidRepeats()) {
      renderIdeasMessage({
        message: "All of these ideas are already in our history.",
        actions: [
          {
            label: "Clear history",
            onClick: function () {
              StorageApi.clearHistory();
              renderHistory();
              showDateIdeas(category);
            },
          },
          {
            label: "Turn off repeats",
            secondary: true,
            onClick: function () {
              StorageApi.setAvoidRepeats(false);
              if (DOM.avoidRepeatsToggle) {
                DOM.avoidRepeatsToggle.checked = false;
              }
              UI.updateFiltersSummary();
              showDateIdeas(category);
            },
          },
        ],
      });
      return;
    }

    displayIdeas.forEach(function (idea) {
      const isFavorited = favorites.some(function (favorite) {
        return favorite.id === idea.id;
      });

      const item = document.createElement("div");
      item.className = "idea-item";
      item.dataset.ideaId = idea.id;

      const textSpan = document.createElement("span");
      textSpan.className = "idea-text";
      textSpan.textContent = idea.text;
      item.appendChild(textSpan);

      const meta = document.createElement("div");
      meta.className = "idea-meta";

      const effortTag = document.createElement("span");
      effortTag.className = "idea-tag";
      effortTag.textContent = idea.effort;
      meta.appendChild(effortTag);

      const budgetTag = document.createElement("span");
      budgetTag.className = "idea-tag";
      budgetTag.textContent = idea.budget;
      meta.appendChild(budgetTag);

      const seasonTag = document.createElement("span");
      seasonTag.className = "idea-tag";
      seasonTag.textContent = idea.season;
      meta.appendChild(seasonTag);

      const favBtn = document.createElement("button");
      favBtn.className = "idea-favorite" + (isFavorited ? " favorited" : "");
      favBtn.setAttribute("aria-label", "Save to favorites");
      favBtn.appendChild(UI.createHeartSVG(isFavorited));
      favBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        UI.toggleFavorite(idea, category);
      });
      meta.appendChild(favBtn);

      item.appendChild(meta);
      listFragment.appendChild(item);
      ideaElements[idea.id] = item;
    });

    list.appendChild(listFragment);
    panel.appendChild(list);

    if (displayIdeas.length > 0) {
      const actions = document.createElement("div");
      actions.className = "ideas-actions";

      const pickBtn = document.createElement("button");
      pickBtn.className = "ideas-pick-button";
      pickBtn.textContent = "Pick one for us";
      pickBtn.addEventListener("click", function () {
        const latestIdeas = getDisplayIdeas(
          category.ideas,
          UI.getCurrentFilters(),
        );
        const availableIdeas = latestIdeas.available;
        if (availableIdeas.length === 0) {
          showDateIdeas(category);
          return;
        }
        const choiceIndex = Math.floor(Math.random() * availableIdeas.length);
        const chosenIdea = availableIdeas[choiceIndex];
        const chosenItem = ideaElements[chosenIdea.id];
        if (chosenItem) {
          UI.highlightIdea(chosenItem);
        }
        recordHistory(chosenIdea, category);
        UI.openPlanView(chosenIdea, category);
        UI.maybeTriggerWheelSurprise();
      });

      actions.appendChild(pickBtn);
      panel.appendChild(actions);

      if (config.highlightIdeaId && ideaElements[config.highlightIdeaId]) {
        UI.highlightIdea(ideaElements[config.highlightIdeaId]);
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
    const currentFilters = UI.getCurrentFilters();
    const avoidRepeats = StorageApi.getAvoidRepeats();
    const historyIds = avoidRepeats ? getHistoryIdSet() : null;

    const eligible = allIdeas.filter(function (entry) {
      const idea = entry.idea;
      const matchesEffort =
        currentFilters.effort === "all" ||
        idea.effort === currentFilters.effort;
      const matchesBudget =
        currentFilters.budget === "all" ||
        idea.budget === currentFilters.budget;
      const matchesSeason =
        currentFilters.season === "all" ||
        idea.season === currentFilters.season ||
        idea.season === "any";
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
          label: "Reset filters",
          onClick: UI.resetFilters,
        },
      ];

      if (avoidRepeats) {
        actions.push({
          label: "Clear history",
          onClick: function () {
            StorageApi.clearHistory();
            renderHistory();
            UI.updateFiltersSummary();
          },
        });

        actions.push({
          label: "Turn off repeats",
          secondary: true,
          onClick: function () {
            StorageApi.setAvoidRepeats(false);
            if (DOM.avoidRepeatsToggle) {
              DOM.avoidRepeatsToggle.checked = false;
            }
            UI.updateFiltersSummary();
          },
        });
      }

      renderIdeasMessage({
        message: avoidRepeats
          ? "No available ideas match these filters while avoiding repeats."
          : "No available ideas match these filters right now.",
        actions: actions,
      });
      return;
    }

    const choice = pickRandomIdea(eligible);
    if (!choice) {
      return;
    }

    showDateIdeas(choice.category, {
      includeId: choice.idea.id,
      highlightIdeaId: choice.idea.id,
    });
    recordHistory(choice.idea, choice.category);
    UI.openPlanView(choice.idea, choice.category);
    UI.maybeTriggerWheelSurprise();
  }

  function recordHistory(idea, category) {
    StorageApi.addHistoryEntry({
      id: idea.id,
      text: idea.text,
      categoryName: category.name,
      effort: idea.effort,
      budget: idea.budget,
      season: idea.season,
      pickedAt: Date.now(),
    });
    renderHistory();
  }

  function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSeconds = Math.floor(diffMs / 1000);

    if (diffSeconds < 60) {
      return "just now";
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return diffMinutes + " min ago";
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return diffHours + " hr ago";
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return diffDays + " days ago";
    }

    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  function renderHistory() {
    const section = DOM.historySection;
    const list = DOM.historyList;
    if (!section || !list) {
      return;
    }

    const history = StorageApi.getDateHistory();
    list.textContent = "";

    if (history.length === 0) {
      section.classList.add("is-empty");
      if (DOM.historyClear) {
        DOM.historyClear.style.display = "none";
      }

      const emptyCard = document.createElement("div");
      emptyCard.className = "history-empty";
      emptyCard.textContent = "New picks show up here once we start spinning.";
      list.appendChild(emptyCard);
      return;
    }

    section.classList.remove("is-empty");
    if (DOM.historyClear) {
      DOM.historyClear.style.display = "inline-flex";
    }

    const fragment = document.createDocumentFragment();
    history.slice(0, 5).forEach(function (entry) {
      const item = document.createElement("div");
      item.className = "history-item";

      const text = document.createElement("span");
      text.className = "history-text";
      text.textContent = entry.text;
      item.appendChild(text);

      const meta = document.createElement("div");
      meta.className = "history-meta";

      const category = document.createElement("span");
      category.className = "history-category";
      category.textContent = entry.categoryName;
      meta.appendChild(category);

      const timestamp = document.createElement("span");
      timestamp.className = "history-time";
      timestamp.textContent = entry.pickedAt
        ? formatRelativeTime(entry.pickedAt)
        : "recently";
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
    DOM.historyClear.addEventListener("click", function () {
      StorageApi.clearHistory();
      renderHistory();
      if (state.selectedCategory) {
        showDateIdeas(state.selectedCategory);
      }
    });
  }

  Object.assign(UI, {
    ideaIndex: ideaIndex,
    allIdeas: allIdeas,
    showDateIdeas: showDateIdeas,
    handleGlobalPick: handleGlobalPick,
    renderHistory: renderHistory,
    initHistoryControls: initHistoryControls,
  });
})();
