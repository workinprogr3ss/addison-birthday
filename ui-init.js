/* ==========================================================================
   Date Night Roulette & Love Notes - Init
   populateContent, smooth scroll, DOMContentLoaded.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const CONFIG = UI.CONFIG;

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
    document.title = "Happy Birthday, " + CONFIG.recipientName;
  }

  // ======================================================================
  // Smooth Scroll for Navigation
  // ======================================================================

  function getHeaderOffset() {
    const header = document.querySelector(".header");
    if (header && header.offsetHeight) {
      return header.offsetHeight;
    }

    const rawValue = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height")
      .trim();
    if (!rawValue) {
      return 0;
    }

    if (rawValue.endsWith("rem")) {
      const fontSize =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return parseFloat(rawValue) * fontSize;
    }

    if (rawValue.endsWith("px")) {
      return parseFloat(rawValue);
    }

    const parsed = parseFloat(rawValue);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          const headerOffset = getHeaderOffset();
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  function initGlobalKeybinds() {
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }

      if (DOM.planModal && DOM.planModal.classList.contains("open")) {
        UI.closePlanView();
        return;
      }

      if (DOM.noteModal && DOM.noteModal.classList.contains("open")) {
        UI.closeNoteModal();
        return;
      }

      if (DOM.easterEggModal && DOM.easterEggModal.classList.contains("open")) {
        UI.closeEasterEgg();
      }
    });
  }

  // ======================================================================
  // Initialize Everything
  // ======================================================================

  document.addEventListener("DOMContentLoaded", function () {
    UI.cacheDom();
    UI.StorageApi.init();
    UI.initNotesState();

    // Theme
    UI.initTheme();
    UI.initValentineTheme();
    if (DOM.themeToggle) {
      DOM.themeToggle.addEventListener("click", UI.toggleTheme);
    }
    if (DOM.valentineToggle) {
      DOM.valentineToggle.addEventListener("click", UI.toggleValentineTheme);
    }

    // Populate content
    populateContent();

    // Visual effects
    UI.initParticles();

    // Roulette
    UI.renderWheel();
    UI.setSpinButtonState("idle");
    if (DOM.spinBtn) {
      DOM.spinBtn.addEventListener("click", UI.spinWheel);
    }
    if (DOM.globalPickBtn) {
      DOM.globalPickBtn.addEventListener("click", UI.handleGlobalPick);
    }
    UI.initFilters();
    UI.initAvoidRepeatsToggle();
    UI.renderFavorites();
    UI.initFavoritesControls();
    UI.renderHistory();
    UI.initHistoryControls();
    UI.initWheelResize();

    // Love Notes
    UI.renderNotes();
    UI.initNoteModal();
    UI.initResetButton();

    // Plan modal
    UI.initPlanModal();

    // Easter Egg
    UI.initKonamiCode();
    UI.initHeartClick();
    UI.initEasterEggModal();
    UI.initValentineSurpriseButton();

    // Navigation
    initSmoothScroll();
    initGlobalKeybinds();

    // Initial UI state
    UI.setFiltersOpen(false);
  });
})();
