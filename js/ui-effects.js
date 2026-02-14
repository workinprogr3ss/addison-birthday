/* ==========================================================================
   Date Night Roulette & Love Notes - Effects
   Confetti, easter egg, valentine surprise, Konami.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const CONFIG = UI.CONFIG;

  // ======================================================================
  // Confetti
  // ======================================================================

  function launchConfetti(container, count, palette) {
    if (!container) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    container.textContent = "";

    const colors =
      Array.isArray(palette) && palette.length > 0
        ? palette
        : ["#7c5cbf", "#a78bdb", "#e8b4bc", "#d4a574", "#4a9d6e"];
    const fragment = document.createDocumentFragment();
    const total = count || 50;

    for (let i = 0; i < total; i += 1) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      confetti.style.animationDuration = 2 + Math.random() + "s";
      confetti.addEventListener("animationend", function () {
        confetti.remove();
      });
      fragment.appendChild(confetti);
    }

    container.appendChild(fragment);
  }

  // ======================================================================
  // Easter Egg
  // ======================================================================

  const konamiCode = [
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
  let konamiIndex = 0;
  let heartClickCount = 0;
  let heartClickTimer = null;

  function initKonamiCode() {
    document.addEventListener("keydown", function (event) {
      if (event.code === konamiCode[konamiIndex]) {
        konamiIndex += 1;
        if (konamiIndex === konamiCode.length) {
          revealSeasonalSurprise("default");
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

    heart.addEventListener("click", function () {
      heartClickCount += 1;

      clearTimeout(heartClickTimer);
      heartClickTimer = setTimeout(function () {
        heartClickCount = 0;
      }, 1000);

      if (heartClickCount >= 5) {
        revealSeasonalSurprise("heart");
        heartClickCount = 0;
      }
    });
  }

  function revealSeasonalSurprise(source) {
    if (UI.isValentineModeEnabled()) {
      revealValentineSurprise(source);
      return;
    }
    revealEasterEgg();
  }

  function revealValentineSurprise(source) {
    if (!DOM.easterEggModal || !DOM.easterEggMessage || !DOM.confetti) {
      return;
    }

    const valentineConfig = UI.getValentineConfig();
    const surpriseSource = source || "default";
    const selectedMessage =
      valentineConfig.surpriseMessages[surpriseSource] ||
      valentineConfig.surpriseMessages.default;
    const valentineColors = [
      "#d62872",
      "#ef476f",
      "#ff8fab",
      "#ffb3c6",
      "#ffd6e0",
    ];

    DOM.easterEggMessage.textContent = selectedMessage;
    UI.openModal(DOM.easterEggModal);
    launchConfetti(DOM.confetti, 50, valentineColors);
  }

  function maybeTriggerWheelSurprise() {
    if (!UI.isValentineModeEnabled() || state.valentineWheelSurpriseShown) {
      return;
    }

    const valentineConfig = UI.getValentineConfig();
    if (Math.random() <= valentineConfig.wheelSurpriseChance) {
      state.valentineWheelSurpriseShown = true;
      revealValentineSurprise("wheel");
    }
  }

  function revealEasterEgg() {
    if (!DOM.easterEggModal || !DOM.easterEggMessage || !DOM.confetti) {
      return;
    }

    DOM.easterEggMessage.textContent = CONFIG.easterEggMessage;
    UI.openModal(DOM.easterEggModal);
    launchConfetti(DOM.confetti, 50);
  }

  function closeEasterEgg() {
    UI.closeModal(DOM.easterEggModal);
  }

  function initEasterEggModal() {
    if (!DOM.easterEggModal || !DOM.easterEggClose || !DOM.easterEggBackdrop) {
      return;
    }

    DOM.easterEggClose.addEventListener("click", closeEasterEgg);
    DOM.easterEggBackdrop.addEventListener("click", closeEasterEgg);
  }

  function initValentineSurpriseButton() {
    if (!DOM.valentineSurpriseBtn) {
      return;
    }

    DOM.valentineSurpriseBtn.addEventListener("click", function () {
      if (!UI.isValentineModeEnabled()) {
        return;
      }
      revealValentineSurprise("hero");
    });
  }

  Object.assign(UI, {
    launchConfetti: launchConfetti,
    initKonamiCode: initKonamiCode,
    initHeartClick: initHeartClick,
    maybeTriggerWheelSurprise: maybeTriggerWheelSurprise,
    closeEasterEgg: closeEasterEgg,
    initEasterEggModal: initEasterEggModal,
    initValentineSurpriseButton: initValentineSurpriseButton,
  });
})();
