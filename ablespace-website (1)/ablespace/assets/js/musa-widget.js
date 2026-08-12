/* ==========================================================================
   AbleSpace — Floating Musa Widget
   Injects a fixed-position AI button (bottom-right, brand colors, pulse +
   glow + hover scale + tooltip) on every page. Clicking opens a compact
   chat popup that shares Musa's knowledge base (musa-engine.js) with the
   full Ask Musa page, so answers are always consistent site-wide.
   ========================================================================== */

(function () {
  "use strict";

  // Don't double-inject if a page somehow includes this script twice.
  if (document.getElementById("musa-fab-btn")) return;

  const MUSA_AVATAR = "assets/img/musa_assistant_avatar_1785932536008.jpg";

  const wrap = document.createElement("div");
  wrap.className = "musa-fab-wrap";
  wrap.innerHTML =
    '<button type="button" class="musa-fab" id="musa-fab-btn" aria-haspopup="dialog" aria-expanded="false" aria-controls="musa-fab-panel">' +
    '<i class="fa-solid fa-comment-medical" aria-hidden="true"></i>' +
    '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
    '<span class="visually-hidden">Ask Musa, your AI occupational therapy companion</span>' +
    "</button>" +
    '<span class="musa-fab-tooltip" role="tooltip">Need help? Ask Musa</span>';

  const panel = document.createElement("div");
  panel.className = "musa-fab-panel";
  panel.id = "musa-fab-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", "Ask Musa chat");
  panel.hidden = true;
  panel.innerHTML =
    '<div class="musa-fab-panel__head">' +
    '<span class="musa-avatar"><img src="' + MUSA_AVATAR + '" alt=""></span>' +
    '<span><span class="musa-card__title">Musa</span><br><span class="status-pill"><span class="status-dot"></span> Online</span></span>' +
    '<button type="button" class="musa-fab-panel__close" id="musa-fab-close" aria-label="Close chat"><i class="fa-solid fa-xmark"></i></button>' +
    "</div>" +
    '<div class="musa-fab-panel__messages" id="musa-fab-messages"></div>' +
    '<form class="chat-window__inputbar" id="musa-fab-form">' +
    '<label for="musa-fab-input" class="visually-hidden">Message Musa</label>' +
    '<input type="text" id="musa-fab-input" placeholder="Ask Musa a question…" autocomplete="off">' +
    '<button type="submit" class="chat-send" aria-label="Send message"><i class="fa-solid fa-paper-plane"></i></button>' +
    "</form>" +
    '<p class="musa-disclaimer">Educational only, not a diagnosis. <a href="ask-musa.html">Open full chat →</a></p>';

  document.body.appendChild(wrap);
  document.body.appendChild(panel);

  const fabBtn = document.getElementById("musa-fab-btn");
  const closeBtn = document.getElementById("musa-fab-close");
  const messagesEl = document.getElementById("musa-fab-messages");
  const form = document.getElementById("musa-fab-form");
  const input = document.getElementById("musa-fab-input");
  let started = false;

  function addMessage(sender, text) {
    const row = document.createElement("div");
    row.className = "msg " + sender;
    const avatar = sender === "user"
      ? '<span class="msg__avatar">U</span>'
      : '<span class="msg__avatar"><img src="' + MUSA_AVATAR + '" alt=""></span>';
    row.innerHTML = avatar + '<span class="msg__bubble"></span>';
    row.querySelector(".msg__bubble").textContent = text;
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const row = document.createElement("div");
    row.className = "msg musa";
    row.id = "musa-fab-typing";
    row.innerHTML =
      '<span class="msg__avatar"><img src="' + MUSA_AVATAR + '" alt=""></span>' +
      '<span class="typing-dots"><span></span><span></span><span></span></span>';
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function removeTyping() {
    const el = document.getElementById("musa-fab-typing");
    if (el) el.remove();
  }

  function sendText(text) {
    if (!text.trim()) return;
    addMessage("user", text);
    input.value = "";
    showTyping();
    setTimeout(function () {
      removeTyping();
      const result = window.MusaEngine
        ? window.MusaEngine.getResponse(text)
        : { reply: "I'm having trouble loading my knowledge base — please refresh the page." };
      addMessage("musa", result.reply);
    }, 550 + Math.random() * 450);
  }

  function openPanel() {
    panel.hidden = false;
    requestAnimationFrame(function () { panel.classList.add("open"); });
    wrap.classList.add("open");
    fabBtn.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      addMessage("musa", "Hi, I'm Musa 👋 Ask me anything about occupational therapy, daily activities, or adaptive strategies. For the full experience with topic suggestions, visit the Ask Musa page any time.");
    }
    setTimeout(function () { input.focus(); }, 180);
  }
  function closePanel() {
    panel.classList.remove("open");
    wrap.classList.remove("open");
    fabBtn.setAttribute("aria-expanded", "false");
    setTimeout(function () { panel.hidden = true; }, 200);
  }

  fabBtn.addEventListener("click", function () {
    if (panel.classList.contains("open")) closePanel(); else openPanel();
  });
  closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
  });
  document.addEventListener("click", function (e) {
    if (!panel.classList.contains("open")) return;
    if (panel.contains(e.target) || wrap.contains(e.target)) return;
    closePanel();
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    sendText(input.value);
  });
})();
