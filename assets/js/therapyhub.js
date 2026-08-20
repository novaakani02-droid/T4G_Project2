/* ==========================================================================
   AbleSpace — Therapy Hub practical guides
  The page uses the shared TH_ITEMS catalog to render a searchable,
  category-filtered list of practical OT guides. Each card opens a modal with
  the guide content and an Ask Musa link.
   ========================================================================== */

(function () {
  "use strict";

  const guideListEl = document.getElementById("therapy-guide-list");
  const searchInput = document.getElementById("th-search-input");
  const categoryButtons = document.querySelectorAll("[data-therapy-category]");
  const viewAllButtons = document.querySelectorAll("[data-therapy-view-all]");
  const resourceHeading = document.getElementById("resource-section-heading");

  if (!guideListEl) return;

  const categoryMap = {
    "adl-dress-upper": ["adl-dress-upper", "adl-dress-lower", "adl-grooming", "adl-toileting", "adl-feeding", "adl-bathing", "adl-eating", "adl-oral", "adl-teeth"],
    "adl-mobility": ["adl-mobility", "adl-transfers", "adl-handwashing", "adl-haircare", "adl-nailcare", "adl-toileting"],
    "skill-finemotor": ["cond-arthritis", "cond-handinjury", "iadl-computer", "iadl-phone", "adl-grooming", "adl-nailcare"],
    "skill-memory": ["iadl-medication", "iadl-money", "iadl-computer", "iadl-phone", "iadl-community", "iadl-transport"],
    "energy-rest": ["iadl-mealprep", "iadl-laundry", "iadl-cleaning", "iadl-petcare", "cond-parkinsons", "cond-arthritis"],
    "home-safety": ["adl-bathing", "adl-toileting", "iadl-cooking", "iadl-cleaning", "cond-stroke", "cond-parkinsons"],
    "equipment-aids": ["adl-dress-upper", "adl-transfers", "cond-arthritis", "cond-handinjury", "iadl-computer", "iadl-phone"],
    "school-work": ["iadl-computer", "iadl-community", "iadl-money", "iadl-transport", "iadl-shopping", "iadl-driving"],
    "social-participation": ["iadl-community", "iadl-shopping", "iadl-transport", "iadl-driving", "iadl-phone", "iadl-transport"]
  };

  const state = { activeCategory: null, query: "" };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Prefer detailed guide data when available
  function sourceItems() {
    if (window.TH_GUIDES && Array.isArray(window.TH_GUIDES) && window.TH_GUIDES.length) return window.TH_GUIDES.slice();
    if (window.TH_ITEMS && Array.isArray(window.TH_ITEMS)) return window.TH_ITEMS.slice();
    return [];
  }

  function getFilteredItems() {
    let items = sourceItems();

    if (state.activeCategory && categoryMap[state.activeCategory]) {
      const activeIds = new Set(categoryMap[state.activeCategory]);
      items = items.filter(function (item) {
        return activeIds.has(item.id);
      });
    }

    if (state.query) {
      const query = state.query.toLowerCase();
      items = items.filter(function (item) {
        const searchableText = [item.name, item.blurb, item.group, item.cat, (item.activities || []).join(" "), (item.interventions || []).join(" "), (item.equipment || []).join(" ")].join(" ").toLowerCase();
        return searchableText.indexOf(query) !== -1;
      });
    }

    return items;
  }

  function renderGuideList(items) {
    if (!items.length) {
      guideListEl.innerHTML = '<div class="therapy-hub-page__empty-state"><h3>No practical guides match this search.</h3><p>Try another term such as dressing, fatigue, mobility, balance, writing, or safety.</p></div>';
      return;
    }

    guideListEl.innerHTML = items.map(function (item) {
      const tagText = item.category || item.group || "Practical Guide";
      const art = item.image ? ('<div class="therapy-hub-page__resource-art"><img src="' + item.image + '" alt="' + escapeHtml(item.alt || item.name) + '"></div>') : ('<div class="therapy-hub-page__resource-art" aria-hidden="true"><i class="fa-solid ' + (item.icon || "fa-circle-question") + '"></i></div>');
      return '<article class="therapy-hub-page__resource-card">' +
        art +
        '<div class="therapy-hub-page__resource-body">' +
          '<span class="therapy-hub-page__resource-tag">' + escapeHtml(tagText) + '</span>' +
          '<h3>' + escapeHtml(item.name) + '</h3>' +
          '<p>' + escapeHtml(item.blurb) + '</p>' +
          '<div class="therapy-hub-page__meta"><span><i class="fa-regular fa-clock"></i> ' + escapeHtml(item.time || '') + '</span><span><i class="fa-solid fa-level-up"></i> ' + escapeHtml(item.difficulty || '') + '</span></div>' +
          '<div class="therapy-hub-page__card-actions">' +
            '<button type="button" class="btn btn-primary btn-sm" data-view-guide="' + item.id + '">View Guide</button>' +
            '<a href="ask-musa.html?q=' + encodeURIComponent(item.name) + '" class="btn btn-outline btn-sm">Ask Musa</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join("");

    guideListEl.querySelectorAll("[data-view-guide]").forEach(function (button) {
      button.addEventListener("click", function () {
        const chosen = sourceItems().find(function (item) { return item.id === button.dataset.viewGuide; });
        if (chosen) openGuide(chosen);
      });
    });
  }

  function updateCategoryButtons() {
    categoryButtons.forEach(function (button) {
      const isActive = state.activeCategory === button.dataset.therapyCategory;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function refreshGuides() {
    renderGuideList(getFilteredItems());
    updateCategoryButtons();
  }

  function ensureModal() {
    let modal = document.getElementById("therapy-guide-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "therapy-guide-modal";
      modal.className = "therapy-guide-modal";
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = '<div class="therapy-guide-modal__backdrop" data-close-guide></div><div class="therapy-guide-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="therapy-guide-title"><button type="button" class="therapy-guide-modal__close" aria-label="Close guide"><i class="fa-solid fa-xmark"></i></button><div class="therapy-guide-modal__content"></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", function (event) {
        if (event.target && event.target.matches("[data-close-guide]")) closeGuide();
      });
      const closeButton = modal.querySelector(".therapy-guide-modal__close");
      if (closeButton) closeButton.addEventListener("click", closeGuide);
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("open")) closeGuide();
      });
    }
    return modal;
  }

  function closeGuide() {
    const modal = document.getElementById("therapy-guide-modal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function openGuide(item) {
    const modal = ensureModal();
    const content = modal.querySelector(".therapy-guide-modal__content");
    // Prefer a richer guide object from TH_GUIDES if available
    const rich = (window.TH_GUIDES || []).find(function (g) { return g.id === item.id; });
    const guide = rich || item;

    function listHtml(arr) { if (!arr || !arr.length) return '<p>Not specified.</p>'; return '<ul>' + arr.map(function (t) { return '<li>' + escapeHtml(t) + '</li>'; }).join('') + '</ul>'; }
    function stepsHtml(arr) { if (!arr || !arr.length) return '<p>Not specified.</p>'; return '<ol>' + arr.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</ol>'; }

    content.innerHTML = '<div class="therapy-guide-modal__eyebrow">' + escapeHtml(guide.category || guide.group || 'Practical Guide') + '</div>' +
      '<h3 id="therapy-guide-title">' + escapeHtml(guide.name) + '</h3>' +
      '<p>' + escapeHtml(guide.overview || guide.blurb || '') + '</p>' +
      '<div class="therapy-guide-modal__meta"><span><i class="fa-regular fa-clock"></i> ' + escapeHtml(guide.time || '') + '</span><span><i class="fa-solid fa-level-up"></i> ' + escapeHtml(guide.difficulty || '') + '</span></div>' +
      '<div class="therapy-guide-modal__section"><h4>What you may need</h4>' + listHtml(guide.equipment || guide.equipmentThatMayHelp || []) + '</div>' +
      '<div class="therapy-guide-modal__section"><h4>Step-by-step guide</h4>' + stepsHtml(guide.steps || guide.interventions || []) + '</div>' +
      '<div class="therapy-guide-modal__section"><h4>Safety precautions</h4>' + listHtml(guide.safety || guide.safetyTips || []) + '</div>' +
      '<div class="therapy-guide-modal__section"><h4>Equipment that may help</h4>' + listHtml(guide.equipmentThatMayHelp || guide.equipment || []) + '</div>' +
      '<div class="therapy-guide-modal__section"><h4>When to seek professional support</h4><p>' + escapeHtml(guide.whenToSeek || 'If you are unsure whether these approaches are right for you or if the task is unsafe, consider consulting a qualified Occupational Therapist for an individualized assessment.') + '</p></div>' +
      '<div class="therapy-guide-modal__section"><h4>Still have questions?</h4><p><a href="ask-musa.html?q=' + encodeURIComponent(guide.name) + '" class="btn btn-primary btn-sm">Ask Musa</a> <a href="find-a-therapist.html" class="btn btn-outline btn-sm">Find a Therapist</a></p></div>' +
      '<div class="therapy-guide-modal__section"><p style="color:var(--ink-500); font-size:0.9rem; margin-top:12px;">This guide provides general educational information and is not a substitute for individualized assessment or treatment from a qualified Occupational Therapist or other healthcare professional.</p></div>' +
      '<div class="therapy-guide-modal__actions"><button type="button" class="btn btn-outline btn-sm" data-close-guide>Close</button></div>';

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const closeTrigger = modal.querySelector("[data-close-guide]");
    if (closeTrigger) closeTrigger.addEventListener("click", closeGuide);
  }

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selected = button.dataset.therapyCategory;
      state.activeCategory = selected === state.activeCategory ? null : selected;
      state.query = "";
      if (searchInput) searchInput.value = "";
      refreshGuides();
      if (resourceHeading) {
        resourceHeading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  viewAllButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      state.activeCategory = null;
      state.query = "";
      if (searchInput) searchInput.value = "";
      refreshGuides();
      if (resourceHeading) {
        resourceHeading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value.trim();
      refreshGuides();
    });
  }

  refreshGuides();
})();
