/**
 * Pangandusnõustaja ujuv vestlusaken — HTML/CSS/JS, mis lisatakse banks/index.html-i.
 * Aken on lohistatav (päisest), minimeeritav ("–") ja taasavatav "Pangandusnõustaja" nupust.
 * @returns {string}
 */
export function buildAdvisorWidgetHtml() {
  return `
  <div id="bank-advisor" class="advisor-root" aria-live="polite">
    <button type="button" class="advisor-toggle" id="advisor-toggle" aria-expanded="false" aria-controls="advisor-panel">
      Pangandusnõustaja
    </button>
    <div class="advisor-panel" id="advisor-panel" hidden>
      <header class="advisor-header" id="advisor-header">
        <div class="advisor-titles">
          <h2>Pangandusnõustaja</h2>
          <p class="advisor-sub">Vastan avalikult kogutud pangaandmete põhjal. See ei ole õigus- ega finantsnõustamine.</p>
        </div>
        <div class="advisor-actions">
          <button type="button" class="advisor-icon-btn" id="advisor-min" aria-label="Tee väikseks" title="Tee väikseks">&#8211;</button>
          <button type="button" class="advisor-icon-btn" id="advisor-close" aria-label="Sulge" title="Sulge">&times;</button>
        </div>
      </header>
      <div class="advisor-messages" id="advisor-messages" role="log" aria-relevant="additions"></div>
      <form class="advisor-form" id="advisor-form">
        <label class="visually-hidden" for="advisor-input">Küsimus</label>
        <textarea id="advisor-input" rows="2" placeholder="Küsi pangade intresside või teenuste kohta…" required></textarea>
        <button type="submit" id="advisor-send">Saada</button>
      </form>
      <p class="advisor-status" id="advisor-status" hidden></p>
    </div>
  </div>
  <style>
    .advisor-root { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 1000; font-family: 'Segoe UI', system-ui, sans-serif; }
    .advisor-toggle {
      background: #1e494d; color: #fff; border: none; border-radius: 999px;
      padding: 0.75rem 1.1rem; font-size: 0.95rem; cursor: pointer;
      box-shadow: 0 4px 16px rgba(30, 90, 138, 0.35);
    }
    .advisor-toggle:hover { background: #174a72; }
    .advisor-root.advisor-open .advisor-toggle { display: none; }
    .advisor-panel {
      position: fixed; right: 1.25rem; bottom: 1.25rem;
      width: min(520px, calc(100vw - 2rem)); max-height: min(560px, 80vh);
      background: #fff; border: 1px solid #d8e0e8; border-radius: 12px;
      display: flex; flex-direction: column; overflow: hidden;
      box-shadow: 0 8px 32px rgba(26, 35, 50, 0.18);
    }
    .advisor-panel[hidden] { display: none; }
    .advisor-panel.advisor-dragging { user-select: none; }
    .advisor-header {
      display: flex; align-items: flex-start; gap: 0.5rem;
      padding: 0.7rem 0.7rem 0.6rem 1rem; border-bottom: 1px solid #d8e0e8; background: #eaf6ec;
      cursor: move; touch-action: none;
    }
    .advisor-titles { flex: 1; min-width: 0; }
    .advisor-header h2 { margin: 0 0 0.25rem; font-size: 1rem; color: #1a2332; }
    .advisor-sub { margin: 0; font-size: 0.78rem; color: #5c6b7a; line-height: 1.35; }
    .advisor-actions { display: flex; gap: 0.25rem; flex: 0 0 auto; }
    .advisor-icon-btn {
      width: 2rem; height: 2rem; border: none; background: transparent; font-size: 1.4rem; line-height: 1;
      color: #5c6b7a; cursor: pointer; border-radius: 6px; display: grid; place-items: center;
    }
    .advisor-icon-btn:hover { background: rgba(0,0,0,0.07); color: #1a2332; }
    .advisor-messages {
      flex: 1; overflow-y: auto; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.6rem;
      min-height: 180px; max-height: 320px;
    }
    .advisor-msg {
      max-width: 92%; padding: 0.55rem 0.7rem; border-radius: 10px; font-size: 0.9rem; line-height: 1.45;
      white-space: pre-wrap; word-break: break-word;
    }
    .advisor-msg.user { align-self: flex-end; background: #1e494d; color: #fff; border-bottom-right-radius: 3px; }
    .advisor-msg.assistant { align-self: flex-start; background: #f4f6f8; color: #1a2332; border: 1px solid #d8e0e8; border-bottom-left-radius: 3px; }
    .advisor-msg.error { align-self: stretch; background: #fff8e6; color: #8a5a00; border: 1px solid #e8c96a; }
    .advisor-form { display: flex; gap: 0.5rem; padding: 0.65rem; border-top: 1px solid #d8e0e8; background: #fff; }
    .advisor-form textarea {
      flex: 1; resize: none; border: 1px solid #d8e0e8; border-radius: 8px;
      padding: 0.5rem 0.6rem; font: inherit; font-size: 0.9rem;
    }
    .advisor-form textarea:focus { outline: 2px solid #1e494d; outline-offset: 1px; }
    .advisor-form button {
      align-self: flex-end; background: #1e494d; color: #fff; border: none;
      border-radius: 8px; padding: 0.5rem 0.85rem; font: inherit; cursor: pointer;
    }
    .advisor-form button:disabled { opacity: 0.55; cursor: not-allowed; }
    .advisor-status { margin: 0; padding: 0 0.75rem 0.65rem; font-size: 0.8rem; color: #5c6b7a; }
    .visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
  </style>
  <script>
  (function () {
    var root = document.getElementById('bank-advisor');
    if (!root) return;

    var toggle = document.getElementById('advisor-toggle');
    var panel = document.getElementById('advisor-panel');
    var header = document.getElementById('advisor-header');
    var minBtn = document.getElementById('advisor-min');
    var closeBtn = document.getElementById('advisor-close');
    var messagesEl = document.getElementById('advisor-messages');
    var form = document.getElementById('advisor-form');
    var input = document.getElementById('advisor-input');
    var sendBtn = document.getElementById('advisor-send');
    var statusEl = document.getElementById('advisor-status');

    /** @type {{ role: string, content: string }[]} */
    var history = [];
    var busy = false;
    var REQUEST_TIMEOUT_MS = 60000;

    /** Lohistatud asukoht (px) — null = vaikimisi all paremal. @type {{left:number, top:number}|null} */
    var pos = null;

    function applyPosition() {
      if (pos) {
        panel.style.left = pos.left + 'px';
        panel.style.top = pos.top + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
      } else {
        panel.style.left = '';
        panel.style.top = '';
        panel.style.right = '';
        panel.style.bottom = '';
      }
    }

    function setOpen(open) {
      panel.hidden = !open;
      root.classList.toggle('advisor-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        applyPosition();
        input.focus();
      } else {
        toggle.focus();
      }
    }

    function setStatus(text) {
      if (!text) {
        statusEl.hidden = true;
        statusEl.textContent = '';
        return;
      }
      statusEl.hidden = false;
      statusEl.textContent = text;
    }

    function appendMessage(role, content, extraClass) {
      var div = document.createElement('div');
      div.className = 'advisor-msg ' + role + (extraClass ? ' ' + extraClass : '');
      div.textContent = content;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    toggle.addEventListener('click', function () {
      setOpen(panel.hidden);
    });
    minBtn.addEventListener('click', function () {
      setOpen(false);
    });
    closeBtn.addEventListener('click', function () {
      setOpen(false);
    });

    /* ---- Lohistamine päisest ---- */
    var dragging = false, startX = 0, startY = 0, baseLeft = 0, baseTop = 0;

    header.addEventListener('pointerdown', function (ev) {
      if (ev.target.closest('.advisor-actions')) return; // nuppudel ei lohista
      var rect = panel.getBoundingClientRect();
      baseLeft = rect.left;
      baseTop = rect.top;
      pos = { left: baseLeft, top: baseTop };
      applyPosition();
      dragging = true;
      startX = ev.clientX;
      startY = ev.clientY;
      panel.classList.add('advisor-dragging');
      try { header.setPointerCapture(ev.pointerId); } catch (e) {}
    });

    header.addEventListener('pointermove', function (ev) {
      if (!dragging) return;
      var nl = baseLeft + (ev.clientX - startX);
      var nt = baseTop + (ev.clientY - startY);
      var maxL = window.innerWidth - panel.offsetWidth - 4;
      var maxT = window.innerHeight - header.offsetHeight - 4;
      nl = Math.max(4, Math.min(nl, Math.max(4, maxL)));
      nt = Math.max(4, Math.min(nt, Math.max(4, maxT)));
      pos = { left: nl, top: nt };
      applyPosition();
    });

    function endDrag(ev) {
      if (!dragging) return;
      dragging = false;
      panel.classList.remove('advisor-dragging');
      try { header.releasePointerCapture(ev.pointerId); } catch (e) {}
    }
    header.addEventListener('pointerup', endDrag);
    header.addEventListener('pointercancel', endDrag);

    // Akna suuruse muutmisel hoia paneel vaateaknas
    window.addEventListener('resize', function () {
      if (!pos) return;
      pos.left = Math.max(4, Math.min(pos.left, window.innerWidth - panel.offsetWidth - 4));
      pos.top = Math.max(4, Math.min(pos.top, window.innerHeight - header.offsetHeight - 4));
      applyPosition();
    });

    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) {
        ev.preventDefault();
        if (!busy) form.requestSubmit();
      }
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (busy) return;

      var text = input.value.trim();
      if (!text) return;

      input.value = '';
      history.push({ role: 'user', content: text });
      appendMessage('user', text);

      busy = true;
      sendBtn.disabled = true;
      var startedAt = Date.now();
      setStatus('Laen vastust… 0 s');
      var elapsedTimer = setInterval(function () {
        var sec = Math.floor((Date.now() - startedAt) / 1000);
        setStatus('Laen vastust… ' + sec + ' s');
      }, 1000);

      var controller = new AbortController();
      var abortTimer = setTimeout(function () {
        controller.abort();
      }, REQUEST_TIMEOUT_MS);

      fetch('/banks/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal
      })
        .then(function (res) {
          var ct = res.headers.get('content-type') || '';
          if (ct.indexOf('application/json') !== -1) {
            return res.json().then(function (data) {
              return { ok: res.ok, status: res.status, data: data };
            });
          }
          return res.text().then(function (body) {
            return { ok: res.ok, status: res.status, data: { error: body.slice(0, 200) } };
          });
        })
        .then(function (result) {
          if (!result.ok) {
            var errMsg =
              (result.data && (result.data.error || result.data.message)) || 'API viga';
            if (result.status === 504) {
              errMsg =
                'Vastus võttis liiga kaua (serveri ajalõpp). Proovi uuesti.';
            }
            appendMessage('error', errMsg, 'error');
            setStatus('');
            return;
          }
          var reply = result.data.reply || '';
          history.push({ role: 'assistant', content: reply });
          appendMessage('assistant', reply);
          var meta = result.data.model ? 'Mudel: ' + result.data.model : '';
          if (result.data.knowledgeAt) {
            meta = (meta ? meta + ' · ' : '') + 'andmed: ' + result.data.knowledgeAt;
          }
          setStatus(meta);
        })
        .catch(function (err) {
          var hint = 'Ühendus API-ga ebaõnnestus.';
          if (err && err.name === 'AbortError') {
            hint = 'Vastus võttis liiga kaua (' + Math.round(REQUEST_TIMEOUT_MS / 1000) + ' s). Proovi uuesti.';
          } else if (err && err.name === 'TypeError') {
            hint += ' Võimalik, et vastus võttis liiga kaua või ühendus katkes.';
            hint += ' Proovi uuesti; kontrolli, et ANTHROPIC_API_KEY on serveris seadistatud.';
          } else {
            hint += ' Proovi uuesti.';
          }
          appendMessage('error', hint, 'error');
          setStatus('');
        })
        .finally(function () {
          clearTimeout(abortTimer);
          clearInterval(elapsedTimer);
          busy = false;
          sendBtn.disabled = false;
          input.focus();
        });
    });
  })();
  </script>`;
}
