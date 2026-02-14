/* ==========================================================================
   Date Night Roulette & Love Notes - Filters
   Filter chips, avoid-repeats, filter summary.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const StorageApi = UI.StorageApi;

  function getCurrentFilters() {
    const filters = {
      effort: "all",
      budget: "all",
      season: "all",
    };

    document.querySelectorAll(".filter-chip.active").forEach(function (chip) {
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
      "Effort: " + (filters.effort === "all" ? "All" : filters.effort),
      "Budget: " + (filters.budget === "all" ? "All" : filters.budget),
      "Season: " + (filters.season === "all" ? "All" : filters.season),
    ];

    if (StorageApi.getAvoidRepeats()) {
      parts.push("Avoid repeats");
    }

    DOM.filtersSummary.textContent = parts.join(" | ");
  }

  function setFiltersOpen(isOpen) {
    if (!DOM.filters || !DOM.filtersToggle) {
      return;
    }
    const shouldOpen = Boolean(isOpen);
    DOM.filters.classList.toggle("is-collapsed", !shouldOpen);
    DOM.filtersToggle.setAttribute(
      "aria-expanded",
      shouldOpen ? "true" : "false",
    );
  }

  function triggerFilterFeedback() {
    const panel = DOM.ideasPanel;
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

  function resetFilters() {
    document.querySelectorAll(".filter-group").forEach(function (group) {
      group.querySelectorAll(".filter-chip").forEach(function (chip) {
        chip.classList.remove("active");
        if (chip.hasAttribute("aria-pressed")) {
          chip.setAttribute("aria-pressed", "false");
        }
      });
      const allChip = group.querySelector('.filter-chip[data-value="all"]');
      if (allChip) {
        allChip.classList.add("active");
        if (allChip.hasAttribute("aria-pressed")) {
          allChip.setAttribute("aria-pressed", "true");
        }
      }
    });

    updateFiltersSummary();

    if (state.selectedCategory) {
      triggerFilterFeedback();
      UI.showDateIdeas(state.selectedCategory);
    }
  }

  function initFilters() {
    if (!DOM.filtersToggle || !DOM.filters) {
      return;
    }

    DOM.filtersToggle.addEventListener("click", function () {
      const isOpen = DOM.filtersToggle.getAttribute("aria-expanded") === "true";
      setFiltersOpen(!isOpen);
    });

    document.querySelectorAll(".filter-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        const group = chip.closest(".filter-group");
        group.querySelectorAll(".filter-chip").forEach(function (button) {
          button.classList.remove("active");
          if (button.hasAttribute("aria-pressed")) {
            button.setAttribute("aria-pressed", "false");
          }
        });
        chip.classList.add("active");
        if (chip.hasAttribute("aria-pressed")) {
          chip.setAttribute("aria-pressed", "true");
        }

        updateFiltersSummary();

        if (state.selectedCategory) {
          triggerFilterFeedback();
          UI.showDateIdeas(state.selectedCategory);
        }
      });
    });

    updateFiltersSummary();
  }

  function initAvoidRepeatsToggle() {
    if (!DOM.avoidRepeatsToggle) {
      return;
    }

    DOM.avoidRepeatsToggle.checked = StorageApi.getAvoidRepeats();

    DOM.avoidRepeatsToggle.addEventListener("change", function () {
      StorageApi.setAvoidRepeats(DOM.avoidRepeatsToggle.checked);
      updateFiltersSummary();
      if (state.selectedCategory) {
        UI.showDateIdeas(state.selectedCategory);
      }
    });
  }

  Object.assign(UI, {
    getCurrentFilters: getCurrentFilters,
    updateFiltersSummary: updateFiltersSummary,
    setFiltersOpen: setFiltersOpen,
    resetFilters: resetFilters,
    initFilters: initFilters,
    initAvoidRepeatsToggle: initAvoidRepeatsToggle,
  });
})();
