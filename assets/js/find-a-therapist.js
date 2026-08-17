/* ==========================================================================
   AbleSpace — Find a Therapist directory interactivity
   ========================================================================== */

(function () {
  "use strict";
  if (!window.THERAPISTS) return;

  const grid = document.getElementById("therapist-grid");
  const countEl = document.getElementById("t-count");
  const searchInput = document.getElementById("t-search");
  const regionSelect = document.getElementById("t-filter-region");
  const specSelect = document.getElementById("t-filter-spec");
  const expSelect = document.getElementById("t-filter-exp");
  const ratingSelect = document.getElementById("t-filter-rating");
  const modal = document.getElementById("t-modal");
  if (!grid) return;

  /* ---------- Populate filter dropdowns from data ---------- */
  const regions = Array.from(new Set(THERAPISTS.map(function (t) { return t.region; }))).sort();
  regions.forEach(function (r) {
    const opt = document.createElement("option");
    opt.value = r; opt.textContent = r;
    regionSelect.appendChild(opt);
  });
  const specs = Array.from(new Set(THERAPISTS.flatMap(function (t) { return t.specializations; }))).sort();
  specs.forEach(function (s) {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    specSelect.appendChild(opt);
  });

  function starsHtml(rating) {
    const full = Math.round(rating);
    let html = '<span class="stars">';
    for (let i = 0; i < 5; i++) html += '<i class="fa-solid fa-star" style="' + (i < full ? "" : "opacity:0.25;") + '"></i>';
    html += "</span>";
    return html;
  }

  function cardHtml(t) {
    return (
      '<article class="therapist-card">' +
        '<div class="therapist-card__head">' +
          '<span class="therapist-avatar" style="background:' + t.color + '">' + t.initials + '</span>' +
          '<div>' +
            '<div class="therapist-card__name">' + t.name + '</div>' +
            '<div class="therapist-card__credentials">' + t.credentials + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="therapist-card__facility"><i class="fa-solid fa-location-dot"></i><span>' + t.facility + ', ' + t.region + '</span></div>' +
        '<div class="therapist-rating">' + starsHtml(t.rating) + ' ' + t.rating.toFixed(1) + ' <span style="font-weight:500; color:var(--ink-500);">(' + t.reviews + ' reviews)</span></div>' +
        '<div class="therapist-card__meta">' +
          '<span class="tag">' + t.years + ' yrs experience</span>' +
          '<span class="tag tag-sage">' + t.availability + '</span>' +
        '</div>' +
        '<p class="therapist-card__bio">' + t.bio + '</p>' +
        '<div class="therapist-card__actions">' +
          '<button type="button" class="btn btn-outline" data-view="' + t.id + '">View Profile</button>' +
          '<button type="button" class="btn btn-primary" data-book="' + t.id + '"><i class="fa-solid fa-calendar-check"></i> Book</button>' +
        '</div>' +
      '</article>'
    );
  }

  function currentFilters() {
    return {
      q: (searchInput.value || "").trim().toLowerCase(),
      region: regionSelect.value,
      spec: specSelect.value,
      exp: expSelect.value ? parseInt(expSelect.value, 10) : null,
      rating: ratingSelect.value ? parseFloat(ratingSelect.value) : null
    };
  }

  function matches(t, f) {
    if (f.region && t.region !== f.region) return false;
    if (f.spec && t.specializations.indexOf(f.spec) === -1) return false;
    if (f.rating !== null && t.rating < f.rating) return false;
    if (f.exp !== null) {
      if (f.exp === 0 && t.years > 5) return false;
      if (f.exp > 0 && t.years < f.exp) return false;
    }
    if (f.q) {
      const hay = (t.name + " " + t.specializations.join(" ") + " " + t.facility + " " + t.region).toLowerCase();
      if (hay.indexOf(f.q) === -1) return false;
    }
    return true;
  }

  function render() {
    const f = currentFilters();
    const list = THERAPISTS.filter(function (t) { return matches(t, f); });
    grid.innerHTML = list.map(cardHtml).join("") || '<p style="grid-column:1/-1; text-align:center; color:var(--ink-500); padding:40px 0;">No therapists match those filters. Try broadening your search.</p>';
    countEl.textContent = list.length + " therapist" + (list.length === 1 ? "" : "s") + " found";
  }

  [searchInput, regionSelect, specSelect, expSelect, ratingSelect].forEach(function (el) {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  /* ---------- Profile modal ---------- */
  function openModal(id) {
    const t = THERAPISTS.find(function (x) { return x.id === id; });
    if (!t) return;
    document.getElementById("t-modal-avatar").textContent = t.initials;
    document.getElementById("t-modal-avatar").style.background = t.color;
    document.getElementById("t-modal-name").textContent = t.name;
    document.getElementById("t-modal-credentials").textContent = t.credentials;
    document.getElementById("t-modal-meta").innerHTML =
      '<span class="tag">' + t.region + '</span>' +
      '<span class="tag tag-sage">' + t.years + ' yrs experience</span>' +
      '<span class="tag tag-coral">' + t.rating.toFixed(1) + ' \u2605 (' + t.reviews + ')</span>';
    document.getElementById("t-modal-bio").textContent = t.bio;
    document.getElementById("t-modal-specs").innerHTML = t.specializations.map(function (s) { return '<span class="tag">' + s + '</span>'; }).join("");
    document.getElementById("t-modal-phone").textContent = t.phone;
    document.getElementById("t-modal-email").textContent = t.email;
    document.getElementById("t-modal-book").onclick = function () { bookTherapist(t); };
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  function bookTherapist(t) {
    const subject = encodeURIComponent("Appointment request via AbleSpace — " + t.name);
    const body = encodeURIComponent("Hello " + t.name.replace(/^Dr\.\s*/, "") + ",\n\nI'd like to book an appointment. Please let me know your availability.\n\nThank you.");
    window.location.href = "mailto:" + t.email + "?subject=" + subject + "&body=" + body;
  }

  grid.addEventListener("click", function (e) {
    const viewBtn = e.target.closest("[data-view]");
    if (viewBtn) { openModal(viewBtn.dataset.view); return; }
    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) {
      const t = THERAPISTS.find(function (x) { return x.id === bookBtn.dataset.book; });
      if (t) bookTherapist(t);
    }
  });
  document.getElementById("t-modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  render();
})();
