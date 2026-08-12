/* AbleSpace — Daily Planner (schedule, goals, mood & energy) */

const STORE_KEY = 'ablespace_planner_v1';

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY));
    if (raw) return raw;
  } catch (e) { /* fall through */ }
  return {
    tasks: [
      { id: 't1', title: 'Morning stretch & dressing routine', timeSlot: 'Morning', category: 'ADL Routine', completed: true },
      { id: 't2', title: 'Take morning medication', timeSlot: 'Morning', category: 'Medication', completed: true },
      { id: 't3', title: 'Hand-strengthening putty exercises', timeSlot: 'Afternoon', category: 'Therapy Exercise', completed: false },
      { id: 't4', title: 'Prepare lunch using rocker knife', timeSlot: 'Afternoon', category: 'Meals', completed: false },
      { id: 't5', title: 'Rest period — 20 minutes', timeSlot: 'Evening', category: 'Rest Period', completed: false }
    ],
    goals: [
      { id: 'g1', title: 'Dress independently every morning', target: 7, progress: 4, category: 'ADLs', description: 'Complete the full morning dressing routine without assistance.' },
      { id: 'g2', title: 'Complete hand exercises daily', target: 7, progress: 5, category: 'Fine motor', description: '5 minutes of therapy putty work, twice a day.' },
      { id: 'g3', title: 'Walk safely for 10 minutes', target: 5, progress: 2, category: 'Mobility', description: 'Short supported walk to build stamina and balance confidence.' }
    ],
    moodLogs: []
  };
}

function saveStore(store) { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }

let store = loadStore();

/* ---------- Tabs ---------- */
document.querySelectorAll('.planner-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.planner-tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.planner-panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.panel).classList.add('active');
  });
});

/* ---------- Stats ---------- */
function renderStats() {
  const total = store.tasks.length;
  const done = store.tasks.filter((t) => t.completed).length;
  const goalAvg = store.goals.length
    ? Math.round(store.goals.reduce((s, g) => s + (g.progress / g.target), 0) / store.goals.length * 100)
    : 0;
  const lastMood = store.moodLogs[store.moodLogs.length - 1];

  document.getElementById('stat-tasks').textContent = `${done}/${total}`;
  document.getElementById('stat-goals').textContent = `${goalAvg}%`;
  document.getElementById('stat-mood').textContent = lastMood ? lastMood.mood : '—';
  document.getElementById('stat-checkins').textContent = store.moodLogs.length;
}

/* ---------- Schedule / Tasks ---------- */
const SLOTS = ['Morning', 'Afternoon', 'Evening', 'Night'];
const SLOT_ICONS = { Morning: 'fa-sun', Afternoon: 'fa-cloud-sun', Evening: 'fa-cloud-moon', Night: 'fa-moon' };

function renderSchedule() {
  const container = document.getElementById('schedule-list');
  if (!container) return;

  if (store.tasks.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fa-regular fa-calendar" style="font-size:1.6rem; margin-bottom:8px; display:block;"></i>No tasks yet — add your first one above.</div>`;
    renderStats();
    return;
  }

  container.innerHTML = SLOTS.map((slot) => {
    const tasks = store.tasks.filter((t) => t.timeSlot === slot);
    if (tasks.length === 0) return '';
    return `
      <div class="timeslot-group">
        <h4><i class="fa-solid ${SLOT_ICONS[slot]}"></i> ${slot}</h4>
        ${tasks.map((t) => `
          <div class="task-row ${t.completed ? 'completed' : ''}">
            <button type="button" class="task-check ${t.completed ? 'checked' : ''}" data-toggle="${t.id}" aria-label="Mark ${t.title} complete">
              ${t.completed ? '<i class="fa-solid fa-check"></i>' : ''}
            </button>
            <div class="task-row__body">
              <div class="task-row__title">${t.title}</div>
              <div class="task-row__cat">${t.category}</div>
            </div>
            <button type="button" class="task-row__del" data-delete="${t.id}" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const task = store.tasks.find((t) => t.id === btn.dataset.toggle);
      task.completed = !task.completed;
      saveStore(store);
      renderSchedule();
    });
  });
  container.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      store.tasks = store.tasks.filter((t) => t.id !== btn.dataset.delete);
      saveStore(store);
      renderSchedule();
    });
  });
  renderStats();
}

const addTaskForm = document.getElementById('add-task-form');
if (addTaskForm) {
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-task-title');
    const slot = document.getElementById('new-task-slot');
    const cat = document.getElementById('new-task-cat');
    if (!title.value.trim()) return;
    store.tasks.push({
      id: 't' + Date.now(),
      title: title.value.trim(),
      timeSlot: slot.value,
      category: cat.value,
      completed: false
    });
    saveStore(store);
    title.value = '';
    renderSchedule();
  });
}

/* ---------- Goals ---------- */
function renderGoals() {
  const container = document.getElementById('goals-list');
  if (!container) return;

  if (store.goals.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fa-regular fa-flag" style="font-size:1.6rem; margin-bottom:8px; display:block;"></i>No goals yet — set one above.</div>`;
    return;
  }

  container.innerHTML = store.goals.map((g) => {
    const pct = Math.min(100, Math.round((g.progress / g.target) * 100));
    return `
      <div class="goal-card">
        <div class="goal-card__head">
          <h4>${g.title}</h4>
          <span class="goal-card__days">${g.progress}/${g.target} days</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
        <p>${g.description}</p>
        <div style="display:flex; gap:8px; margin-top:12px;">
          <button type="button" class="btn btn-outline btn-sm" data-goal-inc="${g.id}"><i class="fa-solid fa-plus"></i> Log a day</button>
          <button type="button" class="btn btn-outline btn-sm" data-goal-del="${g.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('[data-goal-inc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const g = store.goals.find((x) => x.id === btn.dataset.goalInc);
      if (g.progress < g.target) g.progress += 1;
      saveStore(store);
      renderGoals();
      renderStats();
    });
  });
  container.querySelectorAll('[data-goal-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      store.goals = store.goals.filter((x) => x.id !== btn.dataset.goalDel);
      saveStore(store);
      renderGoals();
      renderStats();
    });
  });
}

const addGoalForm = document.getElementById('add-goal-form');
if (addGoalForm) {
  addGoalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-goal-title');
    const target = document.getElementById('new-goal-target');
    const cat = document.getElementById('new-goal-cat');
    if (!title.value.trim()) return;
    store.goals.push({
      id: 'g' + Date.now(),
      title: title.value.trim(),
      target: parseInt(target.value, 10) || 7,
      progress: 0,
      category: cat.value,
      description: `Working toward: ${title.value.trim()}`
    });
    saveStore(store);
    title.value = '';
    target.value = '';
    renderGoals();
    renderStats();
  });
}

/* ---------- Mood & energy check-in ---------- */
let selectedMood = null;
document.querySelectorAll('.mood-opt').forEach((opt) => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.mood-opt').forEach((o) => o.classList.remove('selected'));
    opt.classList.add('selected');
    selectedMood = opt.dataset.mood;
  });
});

function renderMoodLog() {
  const container = document.getElementById('mood-log');
  if (!container) return;
  if (store.moodLogs.length === 0) {
    container.innerHTML = `<div class="empty-state">No check-ins yet today. Log your first one above.</div>`;
    return;
  }
  container.innerHTML = store.moodLogs.slice().reverse().slice(0, 6).map((m) => `
    <div class="mood-log-entry">
      <span>${m.date} — ${m.mood}</span>
      <span>Energy ${m.energy}/5 · Fatigue ${m.fatigue}/5</span>
    </div>
  `).join('');
}

const moodForm = document.getElementById('mood-form');
if (moodForm) {
  moodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedMood) { alert('Please select a mood first.'); return; }
    const energy = document.getElementById('energy-slider').value;
    const fatigue = document.getElementById('fatigue-slider').value;
    store.moodLogs.push({
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mood: selectedMood,
      energy,
      fatigue
    });
    saveStore(store);
    renderMoodLog();
    renderStats();
    document.querySelectorAll('.mood-opt').forEach((o) => o.classList.remove('selected'));
    selectedMood = null;
  });
}

/* ---------- Init ---------- */
renderSchedule();
renderGoals();
renderMoodLog();
renderStats();
