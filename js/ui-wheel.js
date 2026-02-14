/* ==========================================================================
   Date Night Roulette & Love Notes - Wheel
   Particles, wheel render, spin, resize.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const CONFIG = UI.CONFIG;

  // ======================================================================
  // Particles Background
  // ======================================================================

  function initParticles() {
    const container = DOM.particles;
    const particleCount = 30;

    if (!container || container.dataset.particlesInit === "true") {
      return;
    }

    container.textContent = "";
    container.dataset.particlesInit = "true";

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
      fragment.appendChild(particle);
    }

    container.appendChild(fragment);
  }

  // ======================================================================
  // Roulette Wheel
  // ======================================================================

  function setSpinButtonState(mode) {
    const spinBtn = DOM.spinBtn;
    if (!spinBtn) {
      return;
    }

    spinBtn.classList.remove("is-spinning", "is-after");

    if (mode === "spinning") {
      spinBtn.textContent = "Spinning...";
      spinBtn.disabled = true;
      spinBtn.classList.add("is-spinning");
      return;
    }

    if (mode === "after") {
      spinBtn.textContent = "Spin again";
      spinBtn.disabled = false;
      spinBtn.classList.add("is-after");
      return;
    }

    spinBtn.textContent = "Spin";
    spinBtn.disabled = false;
  }

  function showIdeasPlaceholder(message, isChoosing) {
    const panel = DOM.ideasPanel;
    if (!panel) {
      return;
    }

    panel.textContent = "";

    const placeholder = document.createElement("div");
    placeholder.className =
      "ideas-placeholder" + (isChoosing ? " is-choosing" : "");

    const text = document.createElement("p");
    text.className = "ideas-placeholder-text";

    if (isChoosing) {
      const label = document.createElement("span");
      label.textContent = message;

      const dots = document.createElement("span");
      dots.className = "ideas-placeholder-dots";

      for (let i = 0; i < 3; i += 1) {
        const dot = document.createElement("span");
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
    const highlighted = document.querySelectorAll(".idea-item.is-highlighted");
    highlighted.forEach(function (el) {
      el.classList.remove("is-highlighted");
    });

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
    const wheel = DOM.wheel;
    if (!wheel) {
      return;
    }

    const categories = CONFIG.dateCategories;
    if (!Array.isArray(categories) || categories.length === 0) {
      wheel.textContent = "";
      return;
    }

    const segmentAngle = 360 / categories.length;
    const wheelRadius = wheel.offsetWidth / 2;
    const centerButtonRadius = DOM.spinBtn
      ? DOM.spinBtn.offsetWidth / 2
      : Math.max(34, wheelRadius * 0.24);
    const innerSafeRadius = Math.max(
      centerButtonRadius + 10,
      wheelRadius * 0.32,
    );
    const outerSafeRadius = wheelRadius - Math.max(10, wheelRadius * 0.06);
    const labelStartRadius = innerSafeRadius + 4;
    const labelWidth = Math.max(64, outerSafeRadius - labelStartRadius);
    const baseLabelFontSize = Math.max(
      9.5,
      Math.min(12.5, wheel.offsetWidth * 0.038),
    );
    const wheelColors = UI.getWheelColors();

    const gradientStops = categories
      .map(function (category, index) {
        const startAngle = index * segmentAngle;
        const endAngle = (index + 1) * segmentAngle;
        const color = wheelColors[index % wheelColors.length];
        return color + " " + startAngle + "deg " + endAngle + "deg";
      })
      .join(", ");

    wheel.style.background = "conic-gradient(" + gradientStops + ")";
    wheel.textContent = "";

    const labelsContainer = document.createElement("div");
    labelsContainer.className = "wheel-labels";

    categories.forEach(function (category, index) {
      const angleDeg = index * segmentAngle + segmentAngle / 2 - 90;
      const angleRad = angleDeg * (Math.PI / 180);

      const x = Math.cos(angleRad) * labelStartRadius;
      const y = Math.sin(angleRad) * labelStartRadius;

      const text = document.createElement("span");
      text.className = "wheel-segment-text";
      text.textContent = category.name;

      const charCount = Math.max(category.name.length, 1);
      const fittedFontSize = labelWidth / (charCount * 0.56);
      const labelFontSize = Math.max(
        8.6,
        Math.min(baseLabelFontSize, fittedFontSize),
      );

      text.style.width = labelWidth.toFixed(1) + "px";
      text.style.fontSize = labelFontSize.toFixed(1) + "px";
      text.style.transform =
        "translate(" +
        x.toFixed(1) +
        "px, " +
        y.toFixed(1) +
        "px) rotate(" +
        angleDeg.toFixed(1) +
        "deg) translateY(-50%)";

      labelsContainer.appendChild(text);
    });

    wheel.appendChild(labelsContainer);
  }

  function requestWheelRender() {
    if (state.isSpinning) {
      state.pendingWheelRender = true;
      return;
    }
    renderWheel();
  }

  function updateSelectedCategoryLabel(category) {
    if (
      !DOM.wheelSelected ||
      !DOM.wheelSelectedName ||
      !DOM.wheelSelectedIcon
    ) {
      return;
    }

    if (!category) {
      DOM.wheelSelected.classList.remove("is-visible");
      DOM.wheelSelectedName.textContent = "";
      DOM.wheelSelectedIcon.textContent = "";
      return;
    }

    DOM.wheelSelectedName.textContent = category.name;
    DOM.wheelSelectedIcon.textContent = "";
    DOM.wheelSelectedIcon.appendChild(
      UI.createCategoryIcon(category.icon, "wheel-selected-icon"),
    );
    DOM.wheelSelected.classList.add("is-visible");
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
    wheel.classList.add("spinning");
    setSpinButtonState("spinning");
    showIdeasPlaceholder("Choosing", true);

    const fullRotations = 3 + Math.floor(Math.random() * 3);
    const randomSegment = Math.floor(Math.random() * categories.length);
    const segmentOffset = randomSegment * segmentAngle + segmentAngle / 2;

    const finalRotation =
      state.currentRotation + fullRotations * 360 + (360 - segmentOffset);

    function handleSpinEnd(event) {
      if (event.target !== wheel || event.propertyName !== "transform") {
        return;
      }

      if (spinId !== state.spinToken) {
        return;
      }

      wheel.removeEventListener("transitionend", handleSpinEnd);
      state.isSpinning = false;
      wheel.classList.remove("spinning");
      state.selectedCategory = categories[randomSegment];
      if (state.pendingWheelRender) {
        state.pendingWheelRender = false;
        renderWheel();
      }
      setSpinButtonState("after");
      UI.showDateIdeas(state.selectedCategory);
    }

    wheel.addEventListener("transitionend", handleSpinEnd);
    wheel.style.transform = "rotate(" + finalRotation + "deg)";
    state.currentRotation = finalRotation;
  }

  function initWheelResize() {
    const wheel = DOM.wheel;
    if (!wheel) {
      return;
    }

    let resizeTimer = null;

    function scheduleRender() {
      if (state.isSpinning) {
        state.pendingWheelRender = true;
        return;
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        requestWheelRender();
        resizeTimer = null;
      }, 120);
    }

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(function () {
        scheduleRender();
      });
      observer.observe(wheel);
    } else {
      window.addEventListener("resize", scheduleRender);
    }
  }

  Object.assign(UI, {
    initParticles: initParticles,
    setSpinButtonState: setSpinButtonState,
    showIdeasPlaceholder: showIdeasPlaceholder,
    highlightIdea: highlightIdea,
    renderWheel: renderWheel,
    requestWheelRender: requestWheelRender,
    updateSelectedCategoryLabel: updateSelectedCategoryLabel,
    spinWheel: spinWheel,
    initWheelResize: initWheelResize,
  });
})();
