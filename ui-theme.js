/* ==========================================================================
   Date Night Roulette & Love Notes - Theme
   Theme toggle, valentine theme, wheel colors.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const CONFIG = UI.CONFIG;
  const StorageApi = UI.StorageApi;

  function initTheme() {
    const savedTheme = StorageApi.getThemePreference();
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initialTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    StorageApi.setThemePreference(newTheme);
    UI.requestWheelRender();
  }

  function getWheelColors() {
    if (isValentineModeEnabled()) {
      const a = "#ff5d8f";
      const b = "#c74b7a";
      const c = "#ff9ebb";
      const d = "#ffd3df";
      return [a, b, c, d, a, b, c, d];
    }
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || "#7c5cbf";
    const primaryLight =
      styles.getPropertyValue("--primary-light").trim() || "#a78bdb";
    const accent = styles.getPropertyValue("--accent").trim() || "#e8b4bc";
    const accentWarm =
      styles.getPropertyValue("--accent-warm").trim() || "#d4a574";
    return [
      primary,
      primaryLight,
      accent,
      accentWarm,
      primary,
      primaryLight,
      accent,
      accentWarm,
    ];
  }

  function clampChance(value, fallback) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return fallback;
    }
    if (numeric < 0) {
      return 0;
    }
    if (numeric > 1) {
      return 1;
    }
    return numeric;
  }

  function getValentineConfig() {
    const defaults = {
      toggleLabel: "Valentine mode",
      heroEyebrowText: "Happy Valentine's Day",
      heroMessage:
        "Happy Valentine's Day! Every day with you is my favorite day, but today I get to celebrate us a little louder. I love you.",
      heroSurpriseLabel: "Open a Valentine surprise",
      surpriseMessages: {
        heart:
          "Happy Valentine's Day. Every ordinary day is better with you in it.",
        hero: "Surprise: loving you feels steady, honest, and like home. I'm grateful for us every day.",
        wheel:
          "Bonus draw: this is your reminder that I adore doing life with you.",
        default: "Happy Valentine's Day. I love you, and I love us.",
      },
      wheelSurpriseChance: 0.1,
    };

    const valentineTheme =
      CONFIG.valentineTheme && typeof CONFIG.valentineTheme === "object"
        ? CONFIG.valentineTheme
        : {};
    const surpriseMessages =
      valentineTheme.surpriseMessages &&
      typeof valentineTheme.surpriseMessages === "object"
        ? valentineTheme.surpriseMessages
        : {};

    return {
      toggleLabel:
        typeof valentineTheme.toggleLabel === "string" &&
        valentineTheme.toggleLabel.trim()
          ? valentineTheme.toggleLabel
          : defaults.toggleLabel,
      heroEyebrowText:
        typeof valentineTheme.heroEyebrowText === "string" &&
        valentineTheme.heroEyebrowText.trim()
          ? valentineTheme.heroEyebrowText
          : defaults.heroEyebrowText,
      heroMessage:
        typeof valentineTheme.heroMessage === "string" &&
        valentineTheme.heroMessage.trim()
          ? valentineTheme.heroMessage
          : defaults.heroMessage,
      heroSurpriseLabel:
        typeof valentineTheme.heroSurpriseLabel === "string" &&
        valentineTheme.heroSurpriseLabel.trim()
          ? valentineTheme.heroSurpriseLabel
          : defaults.heroSurpriseLabel,
      surpriseMessages: {
        heart:
          typeof surpriseMessages.heart === "string" &&
          surpriseMessages.heart.trim()
            ? surpriseMessages.heart
            : defaults.surpriseMessages.heart,
        hero:
          typeof surpriseMessages.hero === "string" &&
          surpriseMessages.hero.trim()
            ? surpriseMessages.hero
            : defaults.surpriseMessages.hero,
        wheel:
          typeof surpriseMessages.wheel === "string" &&
          surpriseMessages.wheel.trim()
            ? surpriseMessages.wheel
            : defaults.surpriseMessages.wheel,
        default:
          typeof surpriseMessages.default === "string" &&
          surpriseMessages.default.trim()
            ? surpriseMessages.default
            : defaults.surpriseMessages.default,
      },
      wheelSurpriseChance: clampChance(
        valentineTheme.wheelSurpriseChance,
        defaults.wheelSurpriseChance,
      ),
    };
  }

  function isValentineModeEnabled() {
    return document.documentElement.getAttribute("data-valentine") === "on";
  }

  function applyValentineTheme(enabled) {
    const isEnabled = Boolean(enabled);
    const valentineConfig = getValentineConfig();

    if (isEnabled) {
      document.documentElement.setAttribute("data-valentine", "on");
    } else {
      document.documentElement.removeAttribute("data-valentine");
    }

    if (DOM.valentineToggle) {
      DOM.valentineToggle.setAttribute(
        "aria-pressed",
        isEnabled ? "true" : "false",
      );
      DOM.valentineToggle.setAttribute(
        "aria-label",
        valentineConfig.toggleLabel,
      );
      DOM.valentineToggle.setAttribute("title", valentineConfig.toggleLabel);
      DOM.valentineToggle.classList.toggle("is-active", isEnabled);
    }

    if (DOM.valentineSurpriseBtn) {
      DOM.valentineSurpriseBtn.classList.toggle("is-inactive", !isEnabled);
      DOM.valentineSurpriseBtn.setAttribute(
        "aria-hidden",
        isEnabled ? "false" : "true",
      );
      DOM.valentineSurpriseBtn.tabIndex = isEnabled ? 0 : -1;
      DOM.valentineSurpriseBtn.textContent = valentineConfig.heroSurpriseLabel;
    }

    if (DOM.heroEyebrow) {
      const fallbackText = state.defaultHeroEyebrowText || "Happy Birthday";
      DOM.heroEyebrow.textContent = isEnabled
        ? valentineConfig.heroEyebrowText
        : fallbackText;
    }

    if (DOM.birthdayMessage) {
      DOM.birthdayMessage.textContent = isEnabled
        ? valentineConfig.heroMessage
        : state.defaultBirthdayMessage || CONFIG.birthdayMessage;
    }

    document.title = isEnabled
      ? "Happy Valentine's Day, " + CONFIG.recipientName
      : "Happy Birthday, " + CONFIG.recipientName;
  }

  function initValentineTheme() {
    const savedPreference = StorageApi.getValentineModePreference();
    if (!state.defaultHeroEyebrowText && DOM.heroEyebrow) {
      state.defaultHeroEyebrowText =
        DOM.heroEyebrow.textContent.trim() || "Happy Birthday";
    }
    if (!state.defaultBirthdayMessage && DOM.birthdayMessage) {
      state.defaultBirthdayMessage =
        DOM.birthdayMessage.textContent.trim() || CONFIG.birthdayMessage;
    }
    applyValentineTheme(savedPreference);
    state.valentineWheelSurpriseShown = false;
  }

  function toggleValentineTheme() {
    const newState = !isValentineModeEnabled();
    applyValentineTheme(newState);
    StorageApi.setValentineModePreference(newState);
    UI.requestWheelRender();
  }

  Object.assign(UI, {
    initTheme: initTheme,
    toggleTheme: toggleTheme,
    getWheelColors: getWheelColors,
    getValentineConfig: getValentineConfig,
    isValentineModeEnabled: isValentineModeEnabled,
    applyValentineTheme: applyValentineTheme,
    initValentineTheme: initValentineTheme,
    toggleValentineTheme: toggleValentineTheme,
  });
})();
