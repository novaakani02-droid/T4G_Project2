/* AbleSpace — Ask Musa (full page)
   A scripted, keyword-matched educational assistant. This is a prototype:
   it recognises topic keywords (via the shared MusaEngine, see
   assets/js/musa-engine.js) and returns pre-written OT-style guidance.
   It is not a real AI model and does not diagnose, assess, or prescribe.
   Keeping the knowledge base in musa-engine.js means the floating widget
   and this full chat page always give identical answers. */

const DISCLAIMER = `Just a reminder: I'm an educational tool, not a diagnostic one. For an assessment or treatment plan, please see a licensed occupational therapist.`;

function findMusaReply(text) {
  if (window.MusaEngine) return window.MusaEngine.getResponse(text).reply;
  return "I'm having trouble loading my knowledge base right now — please refresh the page.";
}

(function initMusaChat() {
  const messagesEl = document.getElementById('chat-messages');
  const form = document.getElementById('musa-form');
  const input = document.getElementById('musa-input');
  const topicList = document.getElementById('topic-list');
  if (!messagesEl || !form) return;

  function addMessage(sender, html) {
    const wrap = document.createElement('div');
    wrap.className = `msg ${sender}`;
    const avatar = sender === 'user'
      ? `<span class="msg__avatar">U</span>`
      : `<span class="msg__avatar"><img src="assets/img/musa_assistant_avatar_1785932536008.jpg" alt=""></span>`;
    wrap.innerHTML = `${avatar}<span class="msg__bubble">${html}</span>`;
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'msg musa';
    wrap.id = 'typing-indicator';
    wrap.innerHTML = `<span class="msg__avatar"><img src="assets/img/musa_assistant_avatar_1785932536008.jpg" alt=""></span>
      <span class="typing-dots"><span></span><span></span><span></span></span>`;
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function sendUserText(text) {
    if (!text.trim()) return;
    addMessage('user', text.replace(/</g, '&lt;'));
    input.value = '';
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage('musa', findMusaReply(text));
    }, 700 + Math.random() * 500);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendUserText(input.value);
  });

  if (topicList) {
    topicList.querySelectorAll('[data-topic-prompt]').forEach((btn) => {
      btn.addEventListener('click', () => sendUserText(btn.dataset.topicPrompt));
    });
  }

  // Opening message
  addMessage('musa', `Hi, I'm Musa 👋 Ask me about dressing, energy conservation, home safety, assistive devices, joint protection, daily routines, exercise education, or caregiver strategies. ${DISCLAIMER}`);
})();
