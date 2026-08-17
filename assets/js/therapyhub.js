/* ==========================================================================
   AbleSpace — Therapy Hub interactivity
   Renders a sidebar of filterable "problems" (ADLs, IADLs, conditions) from
   TH_ITEMS (assets/js/therapyhub-data.js) and, on selection, renders a full
   Solution panel (interventions, exercises, equipment, home mods, activities,
   outcomes, difficulty/age/time) plus a Safety Tips panel.
   ========================================================================== */

(function () {
  "use strict";
  if (!window.TH_ITEMS) return;

  const groupsEl = document.getElementById("th-filter-groups");
  const contentEl = document.getElementById("th-content");
  const searchInput = document.getElementById("th-search-input");
  if (!groupsEl || !contentEl) return;

  const GROUP_ORDER = [
    "Activities of Daily Living",
    "Instrumental Activities of Daily Living",
    "Physical Conditions",
    "Neurological Conditions",
    "Developmental Conditions",
    "Mental Health",
    "Age-Related",
    "Contexts",
    "Skills"
  ];

  function groupItems() {
    const byGroup = {};
    window.TH_ITEMS.forEach(function (item) {
      if (!byGroup[item.group]) byGroup[item.group] = [];
      byGroup[item.group].push(item);
    });
    return byGroup;
  }

  function buildSidebar() {
    const byGroup = groupItems();
    let html = "";
    GROUP_ORDER.forEach(function (groupName) {
      const items = byGroup[groupName];
      if (!items) return;
      const collapsedByDefault = ["Physical Conditions", "Neurological Conditions", "Developmental Conditions", "Mental Health", "Age-Related", "Contexts", "Skills"].indexOf(groupName) !== -1;
      html += '<div class="th-group' + (collapsedByDefault ? " collapsed" : "") + '" data-group="' + groupName + '">' +
        '<button type="button" class="th-group__title" data-toggle-group>' +
        '<span>' + groupName + ' (' + items.length + ')</span>' +
        '<i class="fa-solid fa-chevron-down chev"></i>' +
        '</button>' +
        '<div class="th-group__list">' +
        items.map(function (item) {
          return '<button type="button" class="th-item-btn" data-item="' + item.id + '" data-search="' + item.name.toLowerCase() + '">' +
            '<i class="fa-solid ' + item.icon + '"></i><span>' + item.name + '</span></button>';
        }).join("") +
        '</div></div>';
    });
    groupsEl.innerHTML = html;
  }

  function renderSolution(item) {
    const listHtml = function (arr) {
      if (!arr || !arr.length) return '<li style="color:var(--ink-300);">Not applicable for this item.</li>';
      return arr.map(function (t) { return '<li><i class="fa-solid fa-circle-check"></i>' + t + '</li>'; }).join("");
    };

    contentEl.innerHTML =
      '<div class="solution-card">' +
        '<div class="solution-card__head">' +
          '<span class="tag"><i class="fa-solid ' + item.icon + '"></i> ' + item.group + '</span>' +
          '<h2>' + item.name + '</h2>' +
          '<p>' + item.blurb + '</p>' +
          '<div class="solution-meta">' +
            '<span class="meta-chip"><i class="fa-solid fa-gauge"></i> ' + item.difficulty + '</span>' +
            '<span class="meta-chip"><i class="fa-solid fa-user-group"></i> ' + item.ageGroup + '</span>' +
            '<span class="meta-chip"><i class="fa-regular fa-clock"></i> ' + item.time + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="solution-card__body">' +
          '<div class="solution-grid">' +
            '<div class="solution-block"><h4><i class="fa-solid fa-stethoscope"></i> Recommended interventions</h4><ul class="solution-list">' + listHtml(item.interventions) + '</ul></div>' +
            '<div class="solution-block"><h4><i class="fa-solid fa-dumbbell"></i> Exercises</h4><ul class="solution-list">' + listHtml(item.exercises) + '</ul></div>' +
            '<div class="solution-block"><h4><i class="fa-solid fa-toolbox"></i> Adaptive equipment</h4><ul class="solution-list">' + listHtml(item.equipment) + '</ul></div>' +
            '<div class="solution-block"><h4><i class="fa-solid fa-house-chimney"></i> Home modifications</h4><ul class="solution-list">' + listHtml(item.homeMods) + '</ul></div>' +
          '</div>' +
          '<div class="solution-block"><h4><i class="fa-solid fa-puzzle-piece"></i> Recommended therapy activities</h4><ul class="solution-list">' + listHtml(item.activities) + '</ul></div>' +
          '<div class="outcomes-box"><i class="fa-solid fa-chart-line"></i><p>' + item.outcomes + '</p></div>' +
          '<div class="safety-box">' +
            '<h4><i class="fa-solid fa-triangle-exclamation"></i> Safety tips</h4>' +
            '<ul>' + item.safetyTips.map(function (t) { return '<li><i class="fa-solid fa-shield-heart"></i>' + t + '</li>'; }).join("") + '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="solution-card__foot">' +
          '<a href="ask-musa.html?q=' + encodeURIComponent(item.name) + '" class="btn btn-primary"><i class="fa-solid fa-sparkles"></i> Ask Musa about ' + item.name + '</a>' +
          '<a href="find-a-therapist.html" class="btn btn-outline"><i class="fa-solid fa-user-doctor"></i> Find a Therapist</a>' +
        '</div>' +
      '</div>';

    contentEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function selectItem(id) {
    const item = window.TH_ITEMS.find(function (x) { return x.id === id; });
    if (!item) return;
    document.querySelectorAll(".th-item-btn").forEach(function (b) { b.classList.toggle("active", b.dataset.item === id); });
    // Auto-expand the group containing the selected item
    const btn = groupsEl.querySelector('[data-item="' + id + '"]');
    if (btn) {
      const groupWrap = btn.closest(".th-group");
      if (groupWrap) groupWrap.classList.remove("collapsed");
    }
    renderSolution(item);
  }

  buildSidebar();

  groupsEl.addEventListener("click", function (e) {
    const toggle = e.target.closest("[data-toggle-group]");
    if (toggle) {
      toggle.closest(".th-group").classList.toggle("collapsed");
      return;
    }
    const itemBtn = e.target.closest("[data-item]");
    if (itemBtn) selectItem(itemBtn.dataset.item);
  });

  contentEl.addEventListener("click", function (e) {
    const guide = e.target.closest("[data-open]");
    if (guide) selectItem(guide.dataset.open);
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const q = searchInput.value.trim().toLowerCase();
      document.querySelectorAll(".th-group").forEach(function (group) {
        let anyVisible = false;
        group.querySelectorAll(".th-item-btn").forEach(function (btn) {
          const match = !q || btn.dataset.search.indexOf(q) !== -1;
          btn.hidden = !match;
          if (match) anyVisible = true;
        });
        group.style.display = anyVisible ? "" : "none";
        if (q && anyVisible) group.classList.remove("collapsed");
      });
    });
  }

  // Deep-link support: therapy-hub.html?item=adl-bathing
  const params = new URLSearchParams(location.search);
  const preselect = params.get("item");
  if (preselect && window.TH_ITEMS.some(function (x) { return x.id === preselect; })) {
    selectItem(preselect);
  }
})();
