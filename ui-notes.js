/* ==========================================================================
   Date Night Roulette & Love Notes - Notes
   Love notes grid, progress, bonus note.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const CONFIG = UI.CONFIG;
  const StorageApi = UI.StorageApi;

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

    grid.textContent = "";

    const fragment = document.createDocumentFragment();

    CONFIG.loveNotes.forEach(function (note, index) {
      const button = document.createElement("button");
      button.className =
        "note-button" + (readNotes.indexOf(index) !== -1 ? " read" : "");

      const title = document.createElement("span");
      title.className = "note-title";
      title.textContent = "Open " + note.trigger;
      button.appendChild(title);

      const indicator = document.createElement("span");
      indicator.className = "note-read-indicator";
      indicator.appendChild(UI.createCheckSVG());
      button.appendChild(indicator);

      button.addEventListener("click", function () {
        openNote(index);
      });
      fragment.appendChild(button);
    });

    if (CONFIG.bonusLoveNote) {
      const bonusButton = document.createElement("button");
      bonusButton.className =
        "note-button bonus-note" +
        (bonusRead ? " read" : "") +
        (isComplete ? "" : " is-locked");
      bonusButton.disabled = !isComplete;

      const chip = document.createElement("span");
      chip.className = "note-chip";
      chip.textContent = "Bonus";
      bonusButton.appendChild(chip);

      const title = document.createElement("span");
      title.className = "note-title";
      title.textContent = isComplete
        ? CONFIG.bonusLoveNote.trigger
        : "Unlock after every note";
      bonusButton.appendChild(title);

      const hint = document.createElement("span");
      hint.className = "note-hint";
      hint.textContent = isComplete
        ? "A little extra just for you."
        : "Finish all notes to reveal.";
      bonusButton.appendChild(hint);

      const indicator = document.createElement("span");
      indicator.className = "note-read-indicator";
      indicator.appendChild(UI.createCheckSVG());
      bonusButton.appendChild(indicator);

      if (isComplete) {
        bonusButton.addEventListener("click", openBonusNote);
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
        UI.launchConfetti(DOM.notesConfetti, 35);
      }
    }
  }

  function openNote(index) {
    const note = CONFIG.loveNotes[index];
    if (!note || !DOM.noteModal || !DOM.modalTrigger || !DOM.modalMessage) {
      return;
    }

    DOM.modalTrigger.textContent = "Open " + note.trigger;
    DOM.modalMessage.textContent = note.message;

    UI.openModal(DOM.noteModal);

    markNoteAsRead(index);
    renderNotes();
  }

  function openBonusNote() {
    if (
      !CONFIG.bonusLoveNote ||
      !DOM.noteModal ||
      !DOM.modalTrigger ||
      !DOM.modalMessage
    ) {
      return;
    }

    DOM.modalTrigger.textContent = "Open " + CONFIG.bonusLoveNote.trigger;
    DOM.modalMessage.textContent = CONFIG.bonusLoveNote.message;

    StorageApi.setBonusNoteRead(true);
    UI.openModal(DOM.noteModal);
    renderNotes();
  }

  function closeNoteModal() {
    UI.closeModal(DOM.noteModal);
  }

  function initNoteModal() {
    if (!DOM.noteModal || !DOM.noteModalClose || !DOM.noteModalBackdrop) {
      return;
    }

    DOM.noteModalClose.addEventListener("click", closeNoteModal);
    DOM.noteModalBackdrop.addEventListener("click", closeNoteModal);
  }

  function updateResetButtonVisibility() {
    const readNotes = StorageApi.getReadNotes();
    const bonusRead = StorageApi.getBonusNoteRead();
    const container = DOM.notesResetContainer;
    if (!container) {
      return;
    }
    if (readNotes.length > 0 || bonusRead) {
      container.classList.add("has-read");
    } else {
      container.classList.remove("has-read");
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
    DOM.notesResetBtn.addEventListener("click", resetReadNotes);
    updateResetButtonVisibility();
  }

  function updateNotesProgress(readNotes) {
    const progress = DOM.notesProgress;
    const text = DOM.notesProgressText;
    const openedCount = readNotes
      ? readNotes.length
      : StorageApi.getReadNotes().length;
    const totalCount = CONFIG.loveNotes.length;

    if (text) {
      text.textContent = openedCount + "/" + totalCount + " opened";
    }

    if (progress) {
      if (openedCount === totalCount && totalCount > 0) {
        progress.classList.add("is-complete");
      } else {
        progress.classList.remove("is-complete");
      }
    }
  }

  Object.assign(UI, {
    initNotesState: initNotesState,
    renderNotes: renderNotes,
    closeNoteModal: closeNoteModal,
    initNoteModal: initNoteModal,
    initResetButton: initResetButton,
  });
})();
