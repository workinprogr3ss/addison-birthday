/* ==========================================================================
   Date Night Roulette & Love Notes - Plan Modal
   Plan modal rendering, checklist.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const StorageApi = UI.StorageApi;

  function renderPlanChecklist(idea) {
    if (!DOM.planChecklist) {
      return false;
    }

    DOM.planChecklist.textContent = "";
    if (
      !idea.details ||
      !Array.isArray(idea.details.checklist) ||
      idea.details.checklist.length === 0
    ) {
      return false;
    }

    const heading = document.createElement("h4");
    heading.textContent = "What we need";
    DOM.planChecklist.appendChild(heading);

    const list = document.createElement("div");
    list.className = "plan-checklist-items";

    const savedChecklist = StorageApi.getChecklistState();
    const savedItems = Array.isArray(savedChecklist[idea.id])
      ? savedChecklist[idea.id]
      : [];

    idea.details.checklist.forEach(function (itemText, index) {
      const label = document.createElement("label");
      label.className = "plan-checklist-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(savedItems[index]);
      checkbox.addEventListener("change", function () {
        StorageApi.updateChecklistItem(idea.id, index, checkbox.checked);
      });

      const text = document.createElement("span");
      text.textContent = itemText;

      label.appendChild(checkbox);
      label.appendChild(text);
      list.appendChild(label);
    });

    DOM.planChecklist.appendChild(list);
    return true;
  }

  function openPlanView(idea, category) {
    if (
      !DOM.planModal ||
      !DOM.planTitle ||
      !DOM.planCategory ||
      !DOM.planTags ||
      !DOM.planIcon
    ) {
      return;
    }

    DOM.planTitle.textContent = idea.text;
    DOM.planCategory.textContent = category.name;
    DOM.planIcon.textContent = "";
    DOM.planIcon.appendChild(UI.createCategoryIcon(category.icon, "plan-icon"));

    DOM.planTags.textContent = "";
    ["effort", "budget", "season"].forEach(function (key) {
      if (!idea[key]) {
        return;
      }
      const tag = document.createElement("span");
      tag.className = "idea-tag";
      tag.textContent = idea[key];
      DOM.planTags.appendChild(tag);
    });

    let hasDetails = false;

    if (DOM.planDuration) {
      DOM.planDuration.textContent = "";
      if (idea.details && idea.details.duration) {
        const durationLabel = document.createElement("h4");
        durationLabel.textContent = "Estimated time";
        const durationValue = document.createElement("p");
        durationValue.textContent = idea.details.duration;
        DOM.planDuration.appendChild(durationLabel);
        DOM.planDuration.appendChild(durationValue);
        hasDetails = true;
      }
    }

    if (DOM.planNote) {
      DOM.planNote.textContent = "";
      if (idea.details && idea.details.note) {
        const noteLabel = document.createElement("h4");
        noteLabel.textContent = "Why I picked this";
        const noteText = document.createElement("p");
        noteText.textContent = idea.details.note;
        DOM.planNote.appendChild(noteLabel);
        DOM.planNote.appendChild(noteText);
        hasDetails = true;
      }
    }

    const hasChecklist = renderPlanChecklist(idea);
    hasDetails = hasDetails || hasChecklist;

    if (DOM.planEmpty) {
      DOM.planEmpty.textContent = "";
      if (!hasDetails) {
        DOM.planEmpty.textContent =
          "No extra details yet - just a simple, perfect plan with you.";
      }
    }

    UI.openModal(DOM.planModal);
  }

  function closePlanView() {
    UI.closeModal(DOM.planModal);
  }

  function initPlanModal() {
    if (!DOM.planModal) {
      return;
    }

    if (DOM.planModalClose) {
      DOM.planModalClose.addEventListener("click", closePlanView);
    }
    if (DOM.planModalBackdrop) {
      DOM.planModalBackdrop.addEventListener("click", closePlanView);
    }
  }

  Object.assign(UI, {
    openPlanView: openPlanView,
    closePlanView: closePlanView,
    initPlanModal: initPlanModal,
  });
})();
