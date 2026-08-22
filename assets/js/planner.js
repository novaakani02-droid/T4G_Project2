/* AbleSpace — Daily Planner (scoped, date-keyed storage, OT-focused) */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('[data-page="daily-planner"]');
    if (!page) return;

    function todayKey() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      return `dailyPlanner_${yyyy}-${mm}-${dd}`;
    }

    function loadStore() {
      const key = todayKey();
      try {
        const raw = JSON.parse(localStorage.getItem(key));
        if (raw && typeof raw === 'object') {
          return {
            activities: Array.isArray(raw.activities) ? raw.activities : Array.isArray(raw.tasks) ? raw.tasks : [],
            goals: Array.isArray(raw.goals) ? raw.goals : [],
            checkin: raw.checkin || { mood: '', energy: '' },
            moodLogs: Array.isArray(raw.moodLogs) ? raw.moodLogs : []
          };
        }
      } catch (error) {
        // Ignore invalid localStorage and continue with empty planner.
      }
      return { activities: [], goals: [], checkin: { mood: '', energy: '' }, moodLogs: [] };
    }

    function saveStore() {
      localStorage.setItem(todayKey(), JSON.stringify(store));
    }

    let store = loadStore();

    function uid(prefix) {
      return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    }

    function escapeHtml(value) {
      return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function formatDateShort() {
      const now = new Date();
      return now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    }

    const todayEl = document.getElementById('today-date-short');
    if (todayEl) {
      todayEl.textContent = formatDateShort();
    }

    function getActivityProgress() {
      const total = store.activities.length;
      const done = store.activities.filter((activity) => activity.completed).length;
      const percent = total === 0 ? 0 : Math.round((done / total) * 100);
      return { total, done, percent };
    }

    function updateOverview() {
      const progress = getActivityProgress();
      const goalTotal = 3;
      const goalDone = store.goals.filter((goal) => goal.done).length;

      const overviewActivities = document.getElementById('overview-activities');
      const overviewProgress = document.getElementById('overview-progress');
      const overviewGoals = document.getElementById('overview-goals');
      const progressBar = document.getElementById('progress-bar');
      const glanceActivities = document.getElementById('glance-activities');
      const glanceGoals = document.getElementById('glance-goals');
      const goalsSummary = document.getElementById('goals-summary');

      if (overviewActivities) {
        overviewActivities.textContent = `${progress.done} / ${progress.total}`;
      }
      if (overviewProgress) {
        overviewProgress.textContent = `${progress.percent}%`;
      }
      if (overviewGoals) {
        overviewGoals.textContent = `${goalDone} / ${goalTotal}`;
      }
      if (progressBar) {
        progressBar.style.width = `${progress.percent}%`;
      }
      if (glanceActivities) {
        glanceActivities.textContent = `${progress.done} / ${progress.total}`;
      }
      if (glanceGoals) {
        glanceGoals.textContent = `${goalDone} / ${goalTotal}`;
      }
      if (goalsSummary) {
        goalsSummary.textContent = `${goalDone} / ${goalTotal} Goals Completed`;
      }
    }

    function formatTimeDisplay(timeValue) {
      if (!timeValue) return 'Flexible';
      const [hours, minutes] = timeValue.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
    }

    function getTimeSortValue(timeValue) {
      if (!timeValue) return Number.MAX_SAFE_INTEGER;
      const [hours, minutes] = timeValue.split(':').map(Number);
      return hours * 60 + minutes;
    }

    function renderSchedule() {
      const container = document.getElementById('schedule-list');
      if (!container) return;

      if (!store.activities.length) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state__icon" aria-hidden="true">🌿</div>
            <h3>Your day starts here 🌿</h3>
            <p>Add your first activity and build a routine that works for you.</p>
            <button type="button" class="btn btn-primary" data-open-empty-add>+ Add Activity</button>
          </div>
        `;
        const addEmptyBtn = container.querySelector('[data-open-empty-add]');
        if (addEmptyBtn) {
          addEmptyBtn.addEventListener('click', () => openAddModal());
        }
        updateOverview();
        renderSummary();
        return;
      }

      const sorted = [...store.activities].sort((a, b) => getTimeSortValue(a.time) - getTimeSortValue(b.time));
      const chunks = [];
      sorted.forEach((activity) => {
        const timeLabel = formatTimeDisplay(activity.time);
        let target = chunks.find((chunk) => chunk.label === timeLabel);
        if (!target) {
          target = { label: timeLabel, items: [] };
          chunks.push(target);
        }
        target.items.push(activity);
      });

      container.innerHTML = chunks.map((group) => `
        <div class="timeline-group">
          <div class="timeline-time">${escapeHtml(group.label)}</div>
          ${group.items.map((activity) => `
            <article class="timeline-card ${activity.completed ? 'is-complete' : ''}" data-id="${activity.id}">
              <button type="button" class="activity-check ${activity.completed ? 'is-checked' : ''}" data-toggle="${activity.id}" aria-label="${activity.completed ? 'Mark incomplete' : 'Mark complete'}: ${escapeHtml(activity.title)}">
                <i class="fa-solid fa-check"></i>
              </button>
              <div class="activity-content">
                <div class="activity-content__header">
                  <h4 class="activity-title">${escapeHtml(activity.title)}</h4>
                  <div class="activity-pill">${escapeHtml(activity.priority || 'Medium')} priority</div>
                </div>
                <div class="activity-card__meta">
                  <span>${escapeHtml(activity.category)}</span>
                  <span>·</span>
                  <span>${escapeHtml(activity.duration || '30 minutes')}</span>
                  <span>·</span>
                  <span>Energy ${escapeHtml(activity.energy || 'Medium')}</span>
                </div>
                ${activity.notes ? `<div class="activity-notes">${escapeHtml(activity.notes)}</div>` : ''}
                <div class="activity-card__details">
                  <span class="activity-pill"><i class="fa-solid fa-clock"></i> ${escapeHtml(activity.time || 'Flexible')}</span>
                  <span class="activity-pill"><i class="fa-solid fa-bolt"></i> ${escapeHtml(activity.energy || 'Medium')}</span>
                </div>
                <div class="activity-actions">
                  <button type="button" class="btn btn-outline" data-edit="${activity.id}">Edit</button>
                  <button type="button" class="btn btn-outline" data-delete="${activity.id}">Delete</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      `).join('');

      container.querySelectorAll('[data-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.dataset.toggle;
          const activity = store.activities.find((item) => item.id === id);
          if (!activity) return;
          activity.completed = !activity.completed;
          saveStore();
          renderSchedule();
          updateOverview();
        });
      });

      container.querySelectorAll('[data-delete]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.dataset.delete;
          const activity = store.activities.find((item) => item.id === id);
          if (!activity) return;
          const confirmed = window.confirm(`Delete this activity?\n\n${activity.title}`);
          if (!confirmed) return;
          store.activities = store.activities.filter((item) => item.id !== id);
          saveStore();
          renderSchedule();
          updateOverview();
        });
      });

      container.querySelectorAll('[data-edit]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.dataset.edit;
          openEditModal(id);
        });
      });

      renderSummary();
      updateOverview();
    }

    function renderGoals() {
      const list = document.getElementById('goals-list');
      if (!list) return;

      if (!store.goals.length) {
        list.innerHTML = '<div class="goal-empty">No goals added yet.</div>';
        updateOverview();
        return;
      }

      list.innerHTML = store.goals.map((goal) => `
        <label class="goal-item ${goal.done ? 'is-complete' : ''}">
          <input type="checkbox" data-goal-toggle="${goal.id}" ${goal.done ? 'checked' : ''}>
          <span class="goal-text">${escapeHtml(goal.title)}</span>
        </label>
      `).join('');

      list.querySelectorAll('[data-goal-toggle]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          const id = checkbox.dataset.goalToggle;
          const goal = store.goals.find((item) => item.id === id);
          if (!goal) return;
          goal.done = checkbox.checked;
          saveStore();
          renderGoals();
          updateOverview();
        });
      });

      updateOverview();
    }

    function renderCheckIn() {
      const result = document.getElementById('checkin-result');
      if (!result) return;

      if (!store.checkin || (!store.checkin.mood && !store.checkin.energy)) {
        result.innerHTML = '<div class="checkin-empty">No check-ins yet.</div>';
        updateGlance();
        return;
      }

      const moodMap = { Good: '😊', Okay: '😐', Low: '😔', Struggling: '😣' };
      const moodLabel = store.checkin.mood || '—';
      const energyLabel = store.checkin.energy || '—';
      result.innerHTML = `
        <div class="checkin-card">
          <h4>Today's Check-in</h4>
          <p><strong>Mood:</strong> ${moodMap[moodLabel] || '🙂'} ${escapeHtml(moodLabel)}</p>
          <p><strong>Energy:</strong> ${escapeHtml(energyLabel)}</p>
          <p class="checkin-note">You can adjust your plan based on how you're feeling today.</p>
        </div>
      `;
      updateGlance();
    }

    function updateGlance() {
      const moodText = document.getElementById('glance-mood');
      const energyText = document.getElementById('glance-energy');
      const messageEl = document.getElementById('glance-message');
      const progress = getActivityProgress();
      const goalsDone = store.goals.filter((goal) => goal.done).length;

      if (moodText) {
        moodText.textContent = store.checkin && store.checkin.mood ? store.checkin.mood : '—';
      }
      if (energyText) {
        energyText.textContent = store.checkin && store.checkin.energy ? store.checkin.energy : '—';
      }
      if (messageEl) {
        if (progress.total === 0) {
          messageEl.textContent = 'Start by adding the activities that matter most for today.';
        } else if (progress.percent >= 80) {
          messageEl.textContent = 'You made strong progress today. Keep going with what supports your routine.';
        } else if (progress.percent >= 40) {
          messageEl.textContent = 'You made progress today. Every completed activity counts.';
        } else if (goalsDone >= 1) {
          messageEl.textContent = 'You are building momentum. Focus on one meaningful step at a time.';
        } else {
          messageEl.textContent = "It's okay if everything didn't get done. You can adjust your plan and try again tomorrow.";
        }
      }
    }

    function renderSummary() {
      const progress = getActivityProgress();
      const goalsDone = store.goals.filter((goal) => goal.done).length;
      const goalsTotal = store.goals.length;
      const messageEl = document.getElementById('glance-message');

      if (!messageEl) return;
      if (progress.total === 0) {
        messageEl.textContent = 'Start by adding the activities that matter most for today.';
      } else if (progress.percent >= 80) {
        messageEl.textContent = 'You made strong progress today. Keep going with what supports your routine.';
      } else if (progress.percent >= 40) {
        messageEl.textContent = 'You made progress today. Every completed activity counts.';
      } else if (goalsDone >= 1) {
        messageEl.textContent = 'You are building momentum. Focus on one meaningful step at a time.';
      } else {
        messageEl.textContent = "It's okay if everything didn't get done. You can adjust your plan and try again tomorrow.";
      }
    }

    function openAddModal(prefill = {}) {
      const modal = document.getElementById('add-activity-modal');
      if (!modal) return;
      const form = document.getElementById('add-activity-form');
      const titleInput = document.getElementById('act-title');
      const categoryInput = document.getElementById('act-category');
      const timeInput = document.getElementById('act-time');
      const durationInput = document.getElementById('act-duration');
      const priorityInput = document.getElementById('act-priority');
      const energyInput = document.getElementById('act-energy');
      const notesInput = document.getElementById('act-notes');
      const errorEl = document.getElementById('add-activity-error');

      if (form) {
        form.reset();
      }
      if (titleInput) titleInput.value = prefill.title || '';
      if (categoryInput) categoryInput.value = prefill.category || '';
      if (timeInput) timeInput.value = prefill.time || '';
      if (durationInput) durationInput.value = prefill.duration || '30 minutes';
      if (priorityInput) priorityInput.value = prefill.priority || 'Medium';
      if (energyInput) energyInput.value = prefill.energy || 'Medium';
      if (notesInput) notesInput.value = prefill.notes || '';
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('show');
      }
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      if (titleInput) titleInput.focus();
    }

    function closeAddModal() {
      const modal = document.getElementById('add-activity-modal');
      if (!modal) return;
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }

    function openEditModal(id) {
      const activity = store.activities.find((item) => item.id === id);
      if (!activity) return;
      editingId = id;
      openAddModal({
        title: activity.title,
        category: activity.category,
        time: activity.time,
        duration: activity.duration,
        priority: activity.priority,
        energy: activity.energy,
        notes: activity.notes
      });
    }

    let editingId = null;

    const addActivityForm = document.getElementById('add-activity-form');
    if (addActivityForm) {
      addActivityForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('act-title').value.trim();
        const category = document.getElementById('act-category').value;
        const time = document.getElementById('act-time').value;
        const duration = document.getElementById('act-duration').value;
        const priority = document.getElementById('act-priority').value;
        const energy = document.getElementById('act-energy').value;
        const notes = document.getElementById('act-notes').value.trim();
        const errorEl = document.getElementById('add-activity-error');

        if (!title || !category || !time) {
          const message = !title ? 'Please enter an activity name.' : !category ? 'Please select a category.' : 'Please choose a time.';
          if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
          }
          return;
        }

        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('show');
        }

        if (editingId) {
          const activity = store.activities.find((item) => item.id === editingId);
          if (activity) {
            activity.title = title;
            activity.category = category;
            activity.time = time;
            activity.duration = duration;
            activity.priority = priority;
            activity.energy = energy;
            activity.notes = notes;
          }
          editingId = null;
        } else {
          store.activities.push({
            id: uid('activity'),
            title,
            category,
            time,
            duration,
            priority,
            energy,
            notes,
            completed: false
          });
        }

        saveStore();
        closeAddModal();
        renderSchedule();
      });
    }

    document.querySelectorAll('[data-close-add]').forEach((button) => {
      button.addEventListener('click', () => {
        if (editingId) {
          editingId = null;
        }
        closeAddModal();
      });
    });

    const addGoalBtn = document.getElementById('btn-add-goal');
    const addGoalForm = document.getElementById('add-goal-form');
    const goalModal = document.getElementById('add-goal-modal');
    if (addGoalBtn && goalModal) {
      addGoalBtn.addEventListener('click', () => {
        if (store.goals.length >= 3) {
          const errorEl = document.getElementById('add-goal-error');
          if (errorEl) {
            errorEl.textContent = "You've reached your 3-goal limit for today. Focus on what matters most.";
            errorEl.classList.add('show');
          }
          return;
        }
        const goalInput = document.getElementById('goal-title');
        const errorEl = document.getElementById('add-goal-error');
        if (goalInput) goalInput.value = '';
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('show');
        }
        goalModal.style.display = 'block';
        goalModal.setAttribute('aria-hidden', 'false');
        if (goalInput) goalInput.focus();
      });
    }

    document.querySelectorAll('[data-close-goal]').forEach((button) => {
      button.addEventListener('click', () => {
        if (goalModal) {
          goalModal.style.display = 'none';
          goalModal.setAttribute('aria-hidden', 'true');
        }
      });
    });

    if (addGoalForm) {
      addGoalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('goal-title').value.trim();
        const errorEl = document.getElementById('add-goal-error');

        if (!title) {
          if (errorEl) {
            errorEl.textContent = 'Please enter a goal.';
            errorEl.classList.add('show');
          }
          return;
        }

        if (store.goals.length >= 3) {
          if (errorEl) {
            errorEl.textContent = "You've reached your 3-goal limit for today. Focus on what matters most.";
            errorEl.classList.add('show');
          }
          return;
        }

        store.goals.push({ id: uid('goal'), title, done: false });
        saveStore();
        if (goalModal) {
          goalModal.style.display = 'none';
          goalModal.setAttribute('aria-hidden', 'true');
        }
        renderGoals();
      });
    }

    const moodButtons = document.querySelectorAll('.mood-option');
    const energyButtons = document.querySelectorAll('.energy-option');

    function setSelectedButton(buttonGroup, selectedValue, selectedKey) {
      buttonGroup.forEach((button) => {
        const isSelected = button.dataset[selectedKey] === selectedValue;
        button.classList.toggle('selected', isSelected);
      });
    }

    moodButtons.forEach((button) => {
      button.addEventListener('click', () => {
        setSelectedButton(moodButtons, button.dataset.mood, 'mood');
      });
    });

    energyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        setSelectedButton(energyButtons, button.dataset.energy, 'energy');
      });
    });

    const moodForm = document.getElementById('mood-form');
    if (moodForm) {
      moodForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedMood = document.querySelector('.mood-option.selected');
        const selectedEnergy = document.querySelector('.energy-option.selected');

        if (!selectedMood || !selectedEnergy) {
          alert('Please select both your mood and energy level before logging your check-in.');
          return;
        }

        store.checkin = {
          mood: selectedMood.dataset.mood,
          energy: selectedEnergy.dataset.energy
        };

        saveStore();
        renderCheckIn();
        setSelectedButton(moodButtons, '', 'mood');
        setSelectedButton(energyButtons, '', 'energy');
      });
    }

    const openAddButton = document.getElementById('btn-open-add');
    if (openAddButton) {
      openAddButton.addEventListener('click', () => openAddModal());
    }

    document.querySelectorAll('.quick-add').forEach((button) => {
      button.addEventListener('click', () => {
        openAddModal({ category: button.dataset.category || '' });
      });
    });

    renderSchedule();
    renderGoals();
    renderCheckIn();
    updateGlance();
    updateOverview();
  });
})();
