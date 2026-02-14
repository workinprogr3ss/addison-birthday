/* ==========================================================================
   Date Night Roulette & Love Notes - Core
   DOM cache, state, SVG helpers, scroll lock, modal system + focus trap.
   ========================================================================== */

(function () {
  "use strict";

  const CONFIG = window.CONFIG;
  const StorageApi = window.StorageApi;

  if (!CONFIG || !StorageApi) {
    return;
  }

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  const DOM = {};
  const state = {
    currentRotation: 0,
    isSpinning: false,
    selectedCategory: null,
    spinToken: 0,
    notesComplete: false,
    valentineWheelSurpriseShown: false,
    defaultHeroEyebrowText: null,
    defaultBirthdayMessage: null,
    pendingWheelRender: false,
    activeModal: null,
    previousFocus: null,
  };

  let scrollLockCount = 0;

  function cacheDom() {
    DOM.particles = document.getElementById("particles");
    DOM.wheel = document.getElementById("wheel");
    DOM.spinBtn = document.getElementById("spin-btn");
    DOM.ideasPanel = document.getElementById("ideas-panel");
    DOM.filters = document.getElementById("filters");
    DOM.filtersToggle = document.getElementById("filters-toggle");
    DOM.filtersSummary = document.getElementById("filters-summary");
    DOM.globalPickBtn = document.getElementById("global-pick-btn");
    DOM.avoidRepeatsToggle = document.getElementById("avoid-repeats-toggle");
    DOM.favoritesSection = document.getElementById("favorites-section");
    DOM.favoritesList = document.getElementById("favorites-list");
    DOM.favoritesClear = document.getElementById("favorites-clear");
    DOM.historySection = document.getElementById("history-section");
    DOM.historyList = document.getElementById("history-list");
    DOM.historyClear = document.getElementById("history-clear");
    DOM.notesGrid = document.getElementById("notes-grid");
    DOM.notesResetContainer = document.getElementById("notes-reset-container");
    DOM.notesResetBtn = document.getElementById("notes-reset-btn");
    DOM.notesProgress = document.getElementById("notes-progress");
    DOM.notesProgressText = document.getElementById("notes-progress-text");
    DOM.notesConfetti = document.getElementById("notes-confetti");
    DOM.noteModal = document.getElementById("note-modal");
    DOM.noteModalClose = DOM.noteModal
      ? DOM.noteModal.querySelector(".note-close")
      : null;
    DOM.noteModalBackdrop = DOM.noteModal
      ? DOM.noteModal.querySelector(".note-modal-backdrop")
      : null;
    DOM.modalTrigger = document.getElementById("modal-trigger");
    DOM.modalMessage = document.getElementById("modal-message");
    DOM.planModal = document.getElementById("plan-modal");
    DOM.planModalClose = DOM.planModal
      ? DOM.planModal.querySelector(".plan-modal-close")
      : null;
    DOM.planModalBackdrop = DOM.planModal
      ? DOM.planModal.querySelector(".plan-modal-backdrop")
      : null;
    DOM.planTitle = document.getElementById("plan-title");
    DOM.planCategory = document.getElementById("plan-category");
    DOM.planIcon = document.getElementById("plan-icon");
    DOM.planTags = document.getElementById("plan-tags");
    DOM.planDuration = document.getElementById("plan-duration");
    DOM.planChecklist = document.getElementById("plan-checklist");
    DOM.planNote = document.getElementById("plan-note");
    DOM.planEmpty = document.getElementById("plan-empty");
    DOM.wheelSelected = document.getElementById("wheel-selected");
    DOM.wheelSelectedName = document.getElementById("wheel-selected-name");
    DOM.wheelSelectedIcon = document.getElementById("wheel-selected-icon");
    DOM.themeToggle = document.getElementById("theme-toggle");
    DOM.valentineToggle = document.getElementById("valentine-toggle");
    DOM.heroEyebrow = document.querySelector(".hero-eyebrow");
    DOM.recipientName = document.getElementById("recipient-name");
    DOM.birthdayMessage = document.getElementById("birthday-message");
    DOM.valentineSurpriseBtn = document.getElementById(
      "valentine-surprise-btn",
    );
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

  // ======================================================================
  // Helper: Create SVG Elements
  // ======================================================================

  function createHeartSVG(filled, size) {
    const isFilled = filled || false;
    const iconSize = size || 18;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", iconSize);
    svg.setAttribute("height", iconSize);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", isFilled ? "currentColor" : "none");
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

    const line1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    line1.setAttribute("x1", "18");
    line1.setAttribute("y1", "6");
    line1.setAttribute("x2", "6");
    line1.setAttribute("y2", "18");
    svg.appendChild(line1);

    const line2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    line2.setAttribute("x1", "6");
    line2.setAttribute("y1", "6");
    line2.setAttribute("x2", "18");
    line2.setAttribute("y2", "18");
    svg.appendChild(line2);

    return svg;
  }

  function createCategoryIcon(iconName, className) {
    const iconContainer = document.createElement("div");
    iconContainer.className = className || "ideas-icon";

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

    const paths = iconPaths[iconName] || iconPaths.sparkles;
    paths.forEach(function (d) {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", d);
      svg.appendChild(path);
    });

    iconContainer.appendChild(svg);
    return iconContainer;
  }

  // ======================================================================
  // Scroll Lock
  // ======================================================================

  function lockBodyScroll() {
    scrollLockCount += 1;
    if (scrollLockCount > 1) {
      return;
    }
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + "px";
    }
  }

  function unlockBodyScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount > 0) {
      return;
    }
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  // ======================================================================
  // Modal System + Focus Trap
  // ======================================================================

  function trapFocus(event) {
    if (event.key !== "Tab" || !state.activeModal) {
      return;
    }
    const focusable = state.activeModal.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function openModal(modal) {
    if (!modal) {
      return;
    }
    state.previousFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    state.activeModal = modal;
    document.addEventListener("keydown", trapFocus);
    lockBodyScroll();
    const initialFocus = modal.querySelector("[data-modal-initial-focus]");
    if (initialFocus) {
      initialFocus.focus();
    } else {
      const focusable = modal.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", trapFocus);
    state.activeModal = null;
    unlockBodyScroll();
    if (
      state.previousFocus &&
      typeof state.previousFocus.focus === "function"
    ) {
      state.previousFocus.focus();
      state.previousFocus = null;
    }
  }

  // ======================================================================
  // Export
  // ======================================================================

  window.UI = {
    CONFIG: CONFIG,
    StorageApi: StorageApi,
    DOM: DOM,
    state: state,
    cacheDom: cacheDom,
    createHeartSVG: createHeartSVG,
    createCheckSVG: createCheckSVG,
    createCloseSVG: createCloseSVG,
    createCategoryIcon: createCategoryIcon,
    openModal: openModal,
    closeModal: closeModal,
  };
})();
