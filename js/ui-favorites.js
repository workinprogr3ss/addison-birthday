/* ==========================================================================
   Date Night Roulette & Love Notes - Favorites
   Favorites list, toggle, render.
   ========================================================================== */

(function () {
  "use strict";

  const UI = window.UI;
  const DOM = UI.DOM;
  const state = UI.state;
  const StorageApi = UI.StorageApi;

  function buildFavorite(idea, category) {
    return {
      id: idea.id,
      text: idea.text,
      categoryName: category.name,
      effort: idea.effort,
      budget: idea.budget,
      season: idea.season,
      favoritedAt: Date.now(),
    };
  }

  function toggleFavorite(idea, category) {
    const favorites = StorageApi.getFavorites();
    const index = favorites.findIndex(function (favorite) {
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
      UI.showDateIdeas(state.selectedCategory);
    }
  }

  function renderFavorites() {
    const favorites = StorageApi.getFavorites();
    const section = DOM.favoritesSection;
    const list = DOM.favoritesList;
    if (!section || !list) {
      return;
    }

    list.textContent = "";

    if (favorites.length === 0) {
      section.classList.add("is-empty");
      section.classList.remove("has-favorites");
      if (DOM.favoritesClear) {
        DOM.favoritesClear.style.display = "none";
      }

      const emptyCard = document.createElement("div");
      emptyCard.className = "favorites-empty";
      const emptyTitle = document.createElement("p");
      emptyTitle.textContent = "Tap a heart to save ideas here.";
      emptyCard.appendChild(emptyTitle);
      list.appendChild(emptyCard);
      return;
    }

    section.classList.remove("is-empty");
    section.classList.add("has-favorites");
    if (DOM.favoritesClear) {
      DOM.favoritesClear.style.display = "inline-flex";
    }

    const fragment = document.createDocumentFragment();

    favorites.forEach(function (favorite) {
      const item = document.createElement("div");
      item.className = "favorite-item";

      const main = document.createElement("div");
      main.className = "favorite-main";

      const textSpan = document.createElement("span");
      textSpan.className = "favorite-text";
      textSpan.textContent = favorite.text;
      main.appendChild(textSpan);

      const category = document.createElement("span");
      category.className = "favorite-category";
      category.textContent = favorite.categoryName;
      main.appendChild(category);

      item.appendChild(main);

      const tags = document.createElement("div");
      tags.className = "favorite-tags";

      ["effort", "budget", "season"].forEach(function (key) {
        const value = favorite[key];
        if (!value) {
          return;
        }
        const tag = document.createElement("span");
        tag.className = "idea-tag";
        tag.textContent = value;
        tags.appendChild(tag);
      });

      item.appendChild(tags);

      const removeBtn = document.createElement("button");
      removeBtn.className = "favorite-remove";
      removeBtn.setAttribute("aria-label", "Remove from favorites");
      removeBtn.appendChild(UI.createCloseSVG());
      removeBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        const remaining = StorageApi.getFavorites().filter(function (entry) {
          return entry.id !== favorite.id;
        });
        StorageApi.setFavorites(remaining);
        renderFavorites();
        if (state.selectedCategory) {
          UI.showDateIdeas(state.selectedCategory);
        }
      });
      item.appendChild(removeBtn);

      item.addEventListener("click", function () {
        const entry = UI.ideaIndex[favorite.id];
        const idea = entry ? entry.idea : favorite;
        const cat = entry
          ? entry.category
          : { name: favorite.categoryName, icon: "sparkles" };
        UI.openPlanView(idea, cat);
      });

      fragment.appendChild(item);
    });

    list.appendChild(fragment);
  }

  function initFavoritesControls() {
    if (!DOM.favoritesClear) {
      return;
    }
    DOM.favoritesClear.addEventListener("click", function () {
      StorageApi.setFavorites([]);
      renderFavorites();
      if (state.selectedCategory) {
        UI.showDateIdeas(state.selectedCategory);
      }
    });
  }

  Object.assign(UI, {
    toggleFavorite: toggleFavorite,
    renderFavorites: renderFavorites,
    initFavoritesControls: initFavoritesControls,
  });
})();
