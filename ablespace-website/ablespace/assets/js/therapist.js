/* AbleSpace — Find a Therapist directory interactivity */

(function () {
  const grid = document.getElementById('therapist-grid');
  if (!grid) return;

  const searchInput = document.getElementById('therapist-search');
  const regionSelect = document.getElementById('filter-region');
  const specialtySelect = document.getElementById('filter-specialty');
  const yearsSelect = document.getElementById('filter-years');
  const availSelect = document.getElementById('filter-availability');
  const ratingSelect = document.getElementById('filter-rating');
  const resetBtn = document.getElementById('filter-reset');
  const countEl = document.getElementById('directory-count');
  const modalOverlay = document.getElementById('therapist-modal');
  const toastEl = document.getElementById('toast');

  const AVAIL_LABEL = { Accepting: 'Accepting new clients', Waitlist: 'Waitlist only', Closed: 'Not accepting' };

  /* ---------- Populate filter options from data ---------- */
  function uniqueSorted(list) { return [...new Set(list)].sort(); }

  function populateSelect(select, values, labelFn) {
    values.forEach((v) => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = labelFn ? labelFn(v) : v;
      select.appendChild(opt);
    });
  }

  populateSelect(regionSelect, uniqueSorted(THERAPISTS.map((t) => t.region)));
  populateSelect(
    specialtySelect,
    uniqueSorted(THERAPISTS.map((t) => t.specialty)),
  );

  /* ---------- Filtering ---------- */
  function starString(rating) {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function matchesYears(t, bucket) {
    if (!bucket) return true;
    if (bucket === '0-5') return t.years <= 5;
    if (bucket === '5-10') return t.years > 5 && t.years <= 10;
    if (bucket === '10-15') return t.years > 10 && t.years <= 15;
    if (bucket === '15+') return t.years > 15;
    return true;
  }

  function matchesRating(t, bucket) {
    if (!bucket) return true;
    return t.rating >= parseFloat(bucket);
  }

  function getFiltered() {
    const q = searchInput.value.trim().toLowerCase();
    const region = regionSelect.value;
    const specialty = specialtySelect.value;
    const years = yearsSelect.value;
    const avail = availSelect.value;
    const rating = ratingSelect.value;

    return THERAPISTS.filter((t) => {
      if (region && t.region !== region) return false;
      if (specialty && t.specialty !== specialty) return false;
      if (avail && t.availability !== avail) return false;
      if (!matchesYears(t, years)) return false;
      if (!matchesRating(t, rating)) return false;
      if (q) {
        const haystack = `${t.name} ${t.specialty} ${t.region} ${t.bio}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  /* ---------- Render ---------- */
  function cardTemplate(t) {
    return `
      <article class="therapist-card">
        <div class="therapist-card__photo">
          <img src="${t.photo}" alt="Portrait of ${t.name}" loading="lazy">
          <span class="therapist-card__avail ${t.availability}">${t.availability === 'Accepting' ? 'Accepting' : t.availability}</span>
        </div>
        <div class="therapist-card__body">
          <h3 class="therapist-card__name">${t.name}</h3>
          <div class="therapist-card__creds">${t.credentials}</div>
          <div class="therapist-card__meta">
            <span><i class="fa-solid fa-briefcase-medical"></i> ${t.specialty}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${t.region}</span>
            <span><i class="fa-solid fa-award"></i> ${t.years} years experience</span>
          </div>
          <div class="therapist-card__rating">
            <span class="therapist-card__stars" aria-hidden="true">${starString(t.rating)}</span>
            <strong>${t.rating.toFixed(1)}</strong>
            <span>(${t.reviews} reviews)</span>
          </div>
          <p class="therapist-card__bio">${t.bio}</p>
          <div class="therapist-card__contact">
            <span><i class="fa-solid fa-phone"></i> ${t.phone}</span>
            <span><i class="fa-solid fa-envelope"></i> ${t.email}</span>
          </div>
          <div class="therapist-card__actions">
            <button type="button" class="btn btn-outline" data-view="${t.id}">View Profile</button>
            <button type="button" class="btn btn-primary" data-book="${t.id}">Book Appointment</button>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const list = getFiltered();
    countEl.innerHTML = `<strong>${list.length}</strong> of ${THERAPISTS.length} occupational therapists`;

    if (!list.length) {
      grid.innerHTML = `
        <div class="directory-empty" style="grid-column:1/-1;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>No therapists match your filters right now. Try widening your search.</p>
        </div>`;
      return;
    }

    grid.innerHTML = list.map(cardTemplate).join('');

    grid.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => openProfile(btn.dataset.view));
    });
    grid.querySelectorAll('[data-book]').forEach((btn) => {
      btn.addEventListener('click', () => bookAppointment(btn.dataset.book));
    });
  }

  [searchInput, regionSelect, specialtySelect, yearsSelect, availSelect, ratingSelect].forEach((el) => {
    const evt = el === searchInput ? 'input' : 'change';
    el.addEventListener(evt, render);
  });

  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    [regionSelect, specialtySelect, yearsSelect, availSelect, ratingSelect].forEach((s) => { s.value = ''; });
    render();
  });

  /* ---------- Profile modal ---------- */
  function openProfile(id) {
    const t = THERAPISTS.find((x) => x.id === id);
    if (!t || !modalOverlay) return;
    modalOverlay.querySelector('[data-m-photo]').src = t.photo;
    modalOverlay.querySelector('[data-m-photo]').alt = `Portrait of ${t.name}`;
    modalOverlay.querySelector('[data-m-name]').textContent = t.name;
    modalOverlay.querySelector('[data-m-creds]').textContent = t.credentials;
    modalOverlay.querySelector('[data-m-specialty]').textContent = t.specialty;
    modalOverlay.querySelector('[data-m-region]').textContent = t.region;
    modalOverlay.querySelector('[data-m-avail]').textContent = AVAIL_LABEL[t.availability];
    modalOverlay.querySelector('[data-m-years]').textContent = t.years;
    modalOverlay.querySelector('[data-m-rating]').textContent = t.rating.toFixed(1);
    modalOverlay.querySelector('[data-m-reviews]').textContent = t.reviews;
    modalOverlay.querySelector('[data-m-bio]').textContent = t.bio;
    modalOverlay.querySelector('[data-m-phone-text]').textContent = t.phone;
    modalOverlay.querySelector('[data-m-phone]').href = 'tel:' + t.phone.replace(/\s+/g, '');
    modalOverlay.querySelector('[data-m-email-text]').textContent = t.email;
    modalOverlay.querySelector('[data-m-email]').href = 'mailto:' + t.email;
    const bookBtn = modalOverlay.querySelector('[data-m-book]');
    bookBtn.onclick = () => { closeProfile(); bookAppointment(t.id); };

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProfile() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.closest('[data-modal-close]')) closeProfile();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProfile(); });
  }

  /* ---------- Book appointment (demo) ---------- */
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 4200);
  }

  function bookAppointment(id) {
    const t = THERAPISTS.find((x) => x.id === id);
    if (!t) return;
    if (t.availability === 'Closed') {
      showToast(`${t.name} isn't accepting new clients right now — try another therapist.`);
      return;
    }
    showToast(`Request sent to ${t.name}. They'll reach out within 1–2 business days.`);
  }

  render();
})();