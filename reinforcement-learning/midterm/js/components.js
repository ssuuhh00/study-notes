// Component helpers — keep DSL terse so chapter files stay readable.

const PAGES = {}; // pageId -> { title, render() }

function registerPage(id, title, renderFn) {
  PAGES[id] = { title, render: renderFn };
}

// Definition card
function defCard(title, body) {
  return `<div class="def-card">
    <div class="def-title">📖 ${title}</div>
    <div class="def-body">${body}</div>
  </div>`;
}

// Collapsible details
function collapse(summary, body) {
  return `<details><summary>${summary}</summary><div class="body">${body}</div></details>`;
}

// Note callouts
function note(body, kind = "info") {
  const labelMap = { info: "💡 직관", warn: "⚠️ 주의", tip: "✅ 팁" };
  return `<div class="note ${kind === "info" ? "" : kind}">
    <span class="label">${labelMap[kind] || ""}</span>${body}
  </div>`;
}

// Equation breakdown — 수식의 항을 3단계로 풀어쓰기
// parts: { symbols: HTML, combinations: HTML, whole: HTML }
function breakdown(parts) {
  const symbolsBlock = parts.symbols ? `<span class="eq-label">① 각 항(symbol)의 의미</span>${parts.symbols}` : "";
  const combosBlock = parts.combinations ? `<span class="eq-label">② 항들을 모으면 (부분 조합)</span>${parts.combinations}` : "";
  const wholeBlock = parts.whole ? `<div class="eq-final"><span class="eq-label">③ 전체 식이 말하는 것</span>${parts.whole}</div>` : "";
  return `<div class="eq-breakdown">${symbolsBlock}${combosBlock}${wholeBlock}</div>`;
}

// Tag
function tag(text, kind = "concept") {
  return `<span class="tag ${kind}">${text}</span>`;
}

// Multiple choice quiz
let quizCounter = 0;
function mcQuiz(question, options, correctIdx, explanation) {
  const id = `quiz-${++quizCounter}`;
  const opts = options.map((opt, i) => `
    <div class="quiz-option" data-id="${id}" data-i="${i}" onclick="window.checkMC('${id}', ${i}, ${correctIdx})">
      <span class="marker"></span><span>${opt}</span>
    </div>`).join("");
  return `<div class="quiz" id="${id}">
    <div class="quiz-q">${question}</div>
    <div class="quiz-options">${opts}</div>
    <div class="quiz-feedback" id="${id}-fb">${explanation}</div>
  </div>`;
}

window.checkMC = function (qid, picked, correct) {
  const root = document.getElementById(qid);
  if (root.dataset.answered) return;
  root.dataset.answered = "1";
  const opts = root.querySelectorAll(".quiz-option");
  opts.forEach((el, i) => {
    el.classList.add("disabled");
    if (i === correct) el.classList.add("correct");
    else if (i === picked) el.classList.add("wrong");
  });
  document.getElementById(qid + "-fb").classList.add("shown");
  if (window.renderMathInElement) {
    window.renderMathInElement(document.getElementById(qid + "-fb"), {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
    });
  }
};

// Short-answer quiz
function saQuiz(question, acceptable, explanation) {
  const id = `quiz-${++quizCounter}`;
  const accStr = JSON.stringify(acceptable.map(a => a.toString().trim().toLowerCase()));
  return `<div class="quiz" id="${id}">
    <div class="quiz-q">${question}</div>
    <input class="quiz-input" id="${id}-in" placeholder="답을 입력하세요"
      onkeypress="if(event.key==='Enter')window.checkSA('${id}', ${escapeAttr(accStr)})" />
    <button class="quiz-submit" onclick="window.checkSA('${id}', ${escapeAttr(accStr)})">확인</button>
    <div class="quiz-feedback" id="${id}-fb">${explanation}</div>
  </div>`;
}

function escapeAttr(s) {
  return JSON.stringify(s);
}

window.checkSA = function (qid, accStr) {
  const acceptable = JSON.parse(JSON.parse(accStr));
  const input = document.getElementById(qid + "-in");
  const v = input.value.trim().toLowerCase().replace(/\s+/g, "");
  const norm = acceptable.map(a => a.replace(/\s+/g, ""));
  const correct = norm.includes(v);
  input.style.borderColor = correct ? "var(--ok)" : "var(--danger)";
  const fb = document.getElementById(qid + "-fb");
  fb.classList.add("shown");
  fb.style.borderLeftColor = correct ? "var(--ok)" : "var(--danger)";
  fb.innerHTML = (correct ? "✅ 정답! " : `❌ 정답: <code>${acceptable[0]}</code><br>`) + fb.innerHTML.replace(/^✅[^<]*|^❌[^<]*/, "");
  if (window.renderMathInElement) window.renderMathInElement(fb, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
};

// Step-by-step walkthrough
let walkCounter = 0;
function walkthrough(title, steps) {
  const id = `walk-${++walkCounter}`;
  const data = JSON.stringify(steps).replace(/'/g, "&#39;");
  return `<div class="walkthrough" id="${id}" data-steps='${data}' data-current="0">
    <div class="walkthrough-header">
      <div class="title">🧮 ${title}</div>
      <div class="step-counter"><span class="cur">1</span> / ${steps.length}</div>
    </div>
    <div class="walkthrough-step"></div>
    <div class="walkthrough-controls">
      <button onclick="window.walkPrev('${id}')">← 이전</button>
      <button onclick="window.walkNext('${id}')">다음 →</button>
    </div>
  </div>`;
}

function renderWalkStep(id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const i = parseInt(root.dataset.current);
  const step = steps[i];
  const stepEl = root.querySelector(".walkthrough-step");
  stepEl.innerHTML = `<div class="step-title">Step ${i + 1}: ${step.title}</div><div>${step.body}</div>`;
  root.querySelector(".cur").textContent = i + 1;
  const [prev, next] = root.querySelectorAll(".walkthrough-controls button");
  prev.disabled = i === 0;
  next.disabled = i === steps.length - 1;
  if (window.renderMathInElement) window.renderMathInElement(stepEl, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
}

window.walkNext = function (id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const i = parseInt(root.dataset.current);
  if (i < steps.length - 1) { root.dataset.current = i + 1; renderWalkStep(id); }
};
window.walkPrev = function (id) {
  const root = document.getElementById(id);
  const i = parseInt(root.dataset.current);
  if (i > 0) { root.dataset.current = i - 1; renderWalkStep(id); }
};

// Page complete button
function completeBtn(pageId) {
  const done = isComplete(pageId);
  return `<button class="complete-btn ${done ? "done" : ""}" id="complete-${pageId}"
    onclick="window.toggleComplete('${pageId}')">
    ${done ? "✓ 완료됨 (다시 학습 표시)" : "이 페이지 학습 완료로 표시"}
  </button>`;
}

window.toggleComplete = function (pageId) {
  const cur = isComplete(pageId);
  setComplete(pageId, !cur);
  if (window.refreshNav) window.refreshNav();
  const btn = document.getElementById("complete-" + pageId);
  if (btn) {
    btn.classList.toggle("done");
    btn.textContent = !cur ? "✓ 완료됨 (다시 학습 표시)" : "이 페이지 학습 완료로 표시";
  }
};

function isComplete(pageId) {
  const data = JSON.parse(localStorage.getItem("rl-progress") || "{}");
  return !!data[pageId];
}
function setComplete(pageId, val) {
  const data = JSON.parse(localStorage.getItem("rl-progress") || "{}");
  if (val) data[pageId] = Date.now(); else delete data[pageId];
  localStorage.setItem("rl-progress", JSON.stringify(data));
}

// Homework problem block
let spoilerCounter = 0;
function hwProblem({ num, topic, image, problemText, answer, variant }) {
  const sid = `spoiler-${++spoilerCounter}`;
  const images = image ? (Array.isArray(image) ? image : [image]) : [];
  const imgHtml = images.map(img =>
    `<img src="images/hw/${img}" alt="Problem ${num}" loading="lazy" />`
  ).join("");
  return `<div class="hw-problem">
    <div class="hw-head">
      <span class="hw-num">Problem ${num}</span>
      <span class="hw-topic">${topic}</span>
    </div>
    <div class="hw-q">
      ${imgHtml}
      ${problemText ? `<div class="text"><strong>📌 한국어 번역:</strong><br>${problemText}</div>` : ""}
    </div>
    <div class="hw-answer">
      <div class="ans-title">모범 답안</div>
      <button class="spoiler-toggle" onclick="window.toggleSpoiler('${sid}')">답안 보기/숨기기</button>
      <div class="spoiler-content" id="${sid}">
        ${answer}
      </div>
      ${variant ? `<div class="hw-variant"><span class="v-label">시험 변형 가능성:</span>${variant}</div>` : ""}
    </div>
  </div>`;
}

window.toggleSpoiler = function(sid) {
  const el = document.getElementById(sid);
  el.classList.toggle("shown");
  if (el.classList.contains("shown") && window.renderMathInElement) {
    window.renderMathInElement(el, {
      delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
    });
  }
};

// Exam timer
let examTimerInterval = null;
function examTimer(minutes) {
  return `<div class="exam-timer" id="exam-timer">
    <div class="timer-display">
      <span class="timer-label">남은 시간</span>
      <span class="timer-value" id="timer-value">${minutes}:00</span>
    </div>
    <div class="timer-controls">
      <button id="timer-start" onclick="window.startTimer(${minutes})">시작</button>
      <button id="timer-pause" onclick="window.pauseTimer()" disabled>일시정지</button>
      <button id="timer-reset" onclick="window.resetTimer(${minutes})">리셋</button>
    </div>
  </div>`;
}

window.startTimer = function(minutes) {
  if (examTimerInterval) return;
  let remaining = parseInt(localStorage.getItem("rl-timer-remaining") || (minutes * 60));
  const tick = () => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const el = document.getElementById("timer-value");
    if (!el) { clearInterval(examTimerInterval); examTimerInterval = null; return; }
    el.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    if (remaining <= 300) el.classList.add("warning");
    if (remaining <= 60) el.classList.add("danger");
    if (remaining <= 0) {
      clearInterval(examTimerInterval); examTimerInterval = null;
      alert("시험 시간 종료!");
      return;
    }
    remaining--;
    localStorage.setItem("rl-timer-remaining", remaining);
  };
  tick();
  examTimerInterval = setInterval(tick, 1000);
  document.getElementById("timer-start").disabled = true;
  document.getElementById("timer-pause").disabled = false;
};

window.pauseTimer = function() {
  if (examTimerInterval) {
    clearInterval(examTimerInterval);
    examTimerInterval = null;
  }
  const start = document.getElementById("timer-start");
  const pause = document.getElementById("timer-pause");
  if (start) start.disabled = false;
  if (pause) pause.disabled = true;
};

window.resetTimer = function(minutes) {
  if (examTimerInterval) clearInterval(examTimerInterval);
  examTimerInterval = null;
  localStorage.removeItem("rl-timer-remaining");
  const el = document.getElementById("timer-value");
  if (el) {
    el.textContent = `${minutes}:00`;
    el.classList.remove("warning", "danger");
  }
  const start = document.getElementById("timer-start");
  const pause = document.getElementById("timer-pause");
  if (start) start.disabled = false;
  if (pause) pause.disabled = true;
};

// Exam problem block
let examCounter = 0;
function examProblem({ num, points, topic, statement, koreanText, answer }) {
  const sid = `exam-spoiler-${++examCounter}`;
  return `<div class="exam-problem">
    <div class="exam-head">
      <span class="exam-num">문제 ${num}</span>
      <span class="exam-points">[${points}점]</span>
      <span class="exam-topic">${topic}</span>
    </div>
    <div class="exam-statement">${statement}</div>
    ${koreanText ? `<div class="text"><strong>📌 한국어 번역:</strong><br>${koreanText}</div>` : ""}
    <div class="hw-answer">
      <div class="ans-title">모범 답안</div>
      <button class="spoiler-toggle" onclick="window.toggleSpoiler('${sid}')">답안 보기/숨기기</button>
      <div class="spoiler-content" id="${sid}">
        ${answer}
      </div>
    </div>
  </div>`;
}

// Page nav (prev/next)
function pageNav(prev, next) {
  return `<div class="page-nav">
    ${prev ? `<a href="#${prev.id}" onclick="window.go('${prev.id}')"><span class="label">← 이전</span>${prev.title}</a>` : `<div></div>`}
    ${next ? `<a class="next" href="#${next.id}" onclick="window.go('${next.id}')"><span class="label">다음 →</span>${next.title}</a>` : `<div></div>`}
  </div>`;
}

// ============ Concept (파랑, 원내용 심화) / Prereq (초록, 배경지식) 토글 ============
function concept(summary, body, opts = {}) {
  const open = opts.open ? "open" : "";
  return `<details class="concept" ${open}><summary>${summary}</summary><div class="body">${body}</div></details>`;
}
function prereq(summary, body, opts = {}) {
  const open = opts.open ? "open" : "";
  return `<details class="prereq" ${open}><summary>${summary}</summary><div class="body">${body}</div></details>`;
}

// ============ Glossary term link ============
function term(key, displayText) {
  const g = (window.GLOSSARY || {})[key];
  const text = displayText || (g ? g.term : key);
  return `<span class="term-link" onclick="window.openTerm('${key}')" title="클릭해서 설명 보기">${text}</span>`;
}

// Navigation history stack — forward navigation clears forward portion
window.tpHistory = [];
window.tpIndex = -1;

function tpRenderTerm(key) {
  const g = (window.GLOSSARY || {})[key];
  const panel = document.getElementById("term-panel");
  if (!panel) return;
  const content = panel.querySelector(".tp-content");
  if (!g) {
    content.innerHTML = `<div class="tp-term">${key}</div>
      <div class="tp-short">용어집에 없는 항목입니다. (key: ${key})</div>`;
  } else {
    const related = (g.related || []).map(k => {
      const gr = (window.GLOSSARY || {})[k];
      return gr ? `<span class="term-link" onclick="window.openTerm('${k}')">${gr.term}</span>` : "";
    }).filter(Boolean).join("");
    content.innerHTML = `
      <div class="tp-term">${g.term}</div>
      ${g.short ? `<div class="tp-short">${g.short}</div>` : ""}
      <div class="tp-body">${g.definition}</div>
      ${related ? `<div class="tp-related"><h4>관련 용어</h4>${related}</div>` : ""}
    `;
  }
  content.scrollTop = 0;
  if (window.renderMathInElement) {
    window.renderMathInElement(content, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
    });
  }
  // Update back button
  const backBtn = panel.querySelector(".tp-back");
  if (backBtn) backBtn.disabled = window.tpIndex <= 0;
}

window.openTerm = function (key) {
  const panel = document.getElementById("term-panel");
  const backdrop = document.getElementById("term-backdrop");
  if (!panel) return;
  // Drop any forward history when navigating to a new term
  window.tpHistory = window.tpHistory.slice(0, window.tpIndex + 1);
  window.tpHistory.push(key);
  window.tpIndex = window.tpHistory.length - 1;
  tpRenderTerm(key);
  panel.classList.add("open");
  backdrop.classList.add("open");
};

window.tpBack = function () {
  if (window.tpIndex > 0) {
    window.tpIndex--;
    tpRenderTerm(window.tpHistory[window.tpIndex]);
  }
};

window.closeTerm = function () {
  const panel = document.getElementById("term-panel");
  const backdrop = document.getElementById("term-backdrop");
  if (panel) panel.classList.remove("open");
  if (backdrop) backdrop.classList.remove("open");
  // Reset history on close for a fresh start next time
  window.tpHistory = [];
  window.tpIndex = -1;
};

// Drag-to-resize handle for term panel
window.tpSetupResize = function () {
  const panel = document.getElementById("term-panel");
  const handle = panel && panel.querySelector(".tp-resize");
  if (!panel || !handle) return;
  // Restore saved width
  const saved = parseInt(localStorage.getItem("tp-width") || "0", 10);
  if (saved >= 280) panel.style.width = saved + "px";
  let startX = 0, startW = 0, dragging = false;
  const onDown = (e) => {
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startW = panel.offsetWidth;
    panel.classList.add("resizing");
    document.body.style.userSelect = "none";
    e.preventDefault();
  };
  const onMove = (e) => {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const delta = startX - x;
    const maxW = Math.round(window.innerWidth * 0.85);
    const newW = Math.min(Math.max(startW + delta, 280), maxW);
    panel.style.width = newW + "px";
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    panel.classList.remove("resizing");
    document.body.style.userSelect = "";
    localStorage.setItem("tp-width", panel.offsetWidth);
  };
  handle.addEventListener("mousedown", onDown);
  handle.addEventListener("touchstart", onDown, { passive: false });
  window.addEventListener("mousemove", onMove);
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("mouseup", onUp);
  window.addEventListener("touchend", onUp);
};

// ============ Python code block (collapsed by default + copy button) ============
let pyCodeCounter = 0;
function pyCode(code, opts = {}) {
  const id = `pycode-${++pyCodeCounter}`;
  const title = opts.title || "Python";
  const lines = String(code).split("\n").length;
  const openAttr = opts.open ? " open" : "";
  return `<details class="pycode-collapse"${openAttr}>
    <summary>
      <span class="pc-label">${title}</span>
      <span class="pc-meta pc-meta-closed">${lines}줄 · 펼쳐서 보기</span>
      <span class="pc-meta pc-meta-open">${lines}줄 · 접기</span>
    </summary>
    <div class="pycode-body">
      <div class="pycode">
        <div class="pc-head">
          <span class="pc-title">${title}</span>
          <button class="pc-copy" onclick="window.copyPyCode('${id}', this)">복사</button>
        </div>
        <pre><code id="${id}">${escapeHtmlForCode(code)}</code></pre>
      </div>
    </div>
  </details>`;
}

function escapeHtmlForCode(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.copyPyCode = function (id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.textContent;
  const done = () => {
    btn.textContent = "✓ 복사됨";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = "복사";
      btn.classList.remove("copied");
    }, 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
};

function fallbackCopy(text, cb) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

// ============ Interactive GridWorld ============
// Supports two algorithms:
//   config.algorithm = 'policy-eval' (Bellman Expectation, uniform random π)
//                    = 'value-iter'  (Bellman Optimal, max over actions)
// All cells deterministic transitions. Boundary → stay in place.
let gwCounter = 0;
const GW_ACTIONS = [
  { dr: -1, dc: 0, sym: "↑" },
  { dr:  1, dc: 0, sym: "↓" },
  { dr:  0, dc: -1, sym: "←" },
  { dr:  0, dc:  1, sym: "→" },
];

function gridWorld(config) {
  const id = `gw-${++gwCounter}`;
  const cfgStr = JSON.stringify(config).replace(/'/g, "&#39;").replace(/"/g, "&quot;");
  return `<div class="gridworld" id="${id}" data-config="${cfgStr}">
    <div class="gw-head">
      <span class="gw-title">${config.title || "Grid World"}</span>
      <div class="gw-iter" id="${id}-iter">k = 0</div>
      <div class="gw-controls">
        <button onclick="window.gwStep('${id}')">▶ 1 iter</button>
        <button onclick="window.gwRun('${id}')" class="primary">▶▶ 수렴까지</button>
        <button onclick="window.gwReset('${id}')">↺ 리셋</button>
      </div>
    </div>
    <div class="gw-body">
      <div id="${id}-grid"></div>
      <div class="gw-side" id="${id}-side"></div>
    </div>
  </div>`;
}

window.gwState = {};

window.gwInitAll = function () {
  document.querySelectorAll(".gridworld:not(.gridlearn)").forEach(el => gwInit(el.id));
};

function gwInit(id) {
  const root = document.getElementById(id);
  if (!root) return;
  let cfg;
  try { cfg = JSON.parse(root.dataset.config); } catch (e) { console.error(e); return; }
  const rows = cfg.rows, cols = cfg.cols;
  const V = Array.from({ length: rows }, () => Array(cols).fill(cfg.initialValue || 0));
  window.gwState[id] = { cfg, V, iter: 0, focused: null, prevV: null, changed: null };
  gwRender(id);
}

function gwIsTerminal(cfg, r, c) {
  return (cfg.terminal || []).some(t => t[0] === r && t[1] === c);
}

function gwIsWall(cfg, r, c) {
  return (cfg.walls || []).some(w => w[0] === r && w[1] === c);
}

function gwIsStart(cfg, r, c) {
  return cfg.start && cfg.start[0] === r && cfg.start[1] === c;
}

function gwReward(cfg, r, c) {
  // Terminal states may have 0 reward per standard grid world convention
  if (gwIsTerminal(cfg, r, c)) return 0;
  return cfg.reward;
}

function gwNextState(cfg, r, c, action) {
  let nr = r + action.dr, nc = c + action.dc;
  // Out of bounds → stay
  if (nr < 0 || nr >= cfg.rows || nc < 0 || nc >= cfg.cols) { nr = r; nc = c; }
  // Wall → stay
  if (gwIsWall(cfg, nr, nc)) { nr = r; nc = c; }
  return [nr, nc];
}

function gwBestAction(cfg, V, r, c) {
  let bestQ = -Infinity, best = null;
  for (const a of GW_ACTIONS) {
    const [nr, nc] = gwNextState(cfg, r, c, a);
    const q = gwReward(cfg, r, c) + cfg.gamma * V[nr][nc];
    if (q > bestQ + 1e-9) { bestQ = q; best = a; }
  }
  return { action: best, q: bestQ };
}

function gwRender(id) {
  const st = window.gwState[id];
  if (!st) return;
  const cfg = st.cfg;
  const rows = cfg.rows, cols = cfg.cols;
  const grid = document.getElementById(id + "-grid");
  grid.innerHTML = "";
  const gd = document.createElement("div");
  gd.className = "gw-grid";
  gd.style.gridTemplateColumns = `repeat(${cols}, minmax(62px, 72px))`;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "gw-cell";
      const isWall = gwIsWall(cfg, r, c);
      const isTerm = gwIsTerminal(cfg, r, c);
      const isStart = gwIsStart(cfg, r, c);
      if (isWall) cell.classList.add("wall");
      if (isTerm) cell.classList.add("terminal");
      if (isStart) cell.classList.add("start");
      if (st.focused && st.focused[0] === r && st.focused[1] === c) cell.classList.add("focused");
      if (st.changed && st.changed[0] === r && st.changed[1] === c) cell.classList.add("changed");
      let arrowHtml = "";
      if (cfg.algorithm === "value-iter" && !isTerm && !isWall && st.iter > 0) {
        const { action } = gwBestAction(cfg, st.V, r, c);
        if (action) arrowHtml = `<span class="gw-arrow">${action.sym}</span>`;
      }
      const marker = isStart ? "S" : (isTerm ? "G" : "");
      const label = marker
        ? `<span class="gw-v">${marker}</span><span class="gw-pos" style="top:auto;bottom:3px;left:5px;font-size:8.5px">${st.V[r][c].toFixed(2)}</span>`
        : `<span class="gw-pos">(${r},${c})</span><span class="gw-v">${st.V[r][c].toFixed(2)}</span>`;
      cell.innerHTML = `${label}${arrowHtml}`;
      if (!isWall) cell.onclick = () => { st.focused = [r, c]; gwRender(id); };
      gd.appendChild(cell);
    }
  }
  grid.appendChild(gd);
  document.getElementById(id + "-iter").textContent = `k = ${st.iter}`;
  gwRenderSide(id);
}

function gwRenderSide(id) {
  const st = window.gwState[id];
  const cfg = st.cfg;
  const side = document.getElementById(id + "-side");
  const algoLabel = cfg.algorithm === "value-iter"
    ? "Value Iteration (Bellman Optimal, max over a)"
    : "Iterative Policy Eval (Bellman Expectation, uniform π)";
  const legend = `<div class="gw-legend">
    <strong>${algoLabel}</strong><br>
    ${cfg.rows}×${cfg.cols} 그리드 · 보상 <code>r = ${cfg.reward}</code> · 할인 <code>γ = ${cfg.gamma}</code><br>
    터미널: ${(cfg.terminal || []).map(t => `<code>(${t[0]},${t[1]})</code>`).join(", ") || "없음"}<br>
    <em>셀을 클릭하면 그 상태의 업데이트 식이 오른쪽에 실시간 수치로 표시돼요.</em>
  </div>`;

  let formula = "";
  if (st.focused) {
    const [r, c] = st.focused;
    const prevV = st.prevV || st.V;
    if (gwIsWall(cfg, r, c)) {
      formula = `<div class="gw-formula">
        <h4>셀 (${r},${c}) — 벽</h4>
        <div class="gw-eq">벽은 통과 불가. 값 없음.</div>
      </div>`;
    } else if (gwIsTerminal(cfg, r, c)) {
      formula = `<div class="gw-formula">
        <h4>셀 (${r},${c}) — 터미널 상태 (목표 G)</h4>
        <div class="gw-eq">v(terminal) = 0 (업데이트 안 함)</div>
      </div>`;
    } else {
      const parts = GW_ACTIONS.map(a => {
        const [nr, nc] = gwNextState(cfg, r, c, a);
        const vNext = prevV[nr][nc];
        const q = cfg.reward + cfg.gamma * vNext;
        return { a, vNext, q, nr, nc };
      });
      const lines = parts.map(p =>
        `<div class="line">${p.a.sym}: r + γ·v(${p.nr},${p.nc}) = <span class="num">${cfg.reward}</span> <span class="op">+</span> <span class="num">${cfg.gamma}</span>·<span class="num">${p.vNext.toFixed(3)}</span> = <span class="num">${p.q.toFixed(3)}</span></div>`
      ).join("");
      let finalLine, title;
      if (cfg.algorithm === "value-iter") {
        const maxQ = Math.max(...parts.map(p => p.q));
        const bestSym = parts.filter(p => Math.abs(p.q - maxQ) < 1e-9).map(p => p.a.sym).join("/");
        finalLine = `v_{k+1}(${r},${c}) ← max = <strong>${maxQ.toFixed(3)}</strong>  (best: ${bestSym})`;
        title = `셀 (${r},${c}) — Bellman Optimal 업데이트`;
      } else {
        const avg = parts.reduce((s, p) => s + 0.25 * p.q, 0);
        finalLine = `v_{k+1}(${r},${c}) ← ¼·(${parts.map(p => p.q.toFixed(2)).join(" + ")}) = <strong>${avg.toFixed(3)}</strong>`;
        title = `셀 (${r},${c}) — Bellman Expectation (균등 π)`;
      }
      formula = `<div class="gw-formula">
        <h4>${title}</h4>
        <div class="gw-eq">${lines}</div>
        <div class="gw-final">${finalLine}</div>
      </div>`;
    }
  } else {
    formula = `<div class="gw-formula">
      <h4>셀을 클릭해보세요</h4>
      <div class="gw-eq">임의의 비터미널 셀을 클릭하면 그 상태의 업데이트 수식을 <strong>현재 v값이 대입된 상태로</strong> 볼 수 있습니다.</div>
    </div>`;
  }
  side.innerHTML = legend + formula;
}

window.gwStep = function (id) {
  const st = window.gwState[id];
  if (!st) return;
  const cfg = st.cfg;
  const prevV = st.V.map(row => [...row]);
  const newV = st.V.map(row => [...row]);
  let maxDelta = 0, changed = null;
  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      if (gwIsTerminal(cfg, r, c)) continue;
      if (gwIsWall(cfg, r, c)) continue;
      let v;
      if (cfg.algorithm === "value-iter") {
        let best = -Infinity;
        for (const a of GW_ACTIONS) {
          const [nr, nc] = gwNextState(cfg, r, c, a);
          const q = cfg.reward + cfg.gamma * prevV[nr][nc];
          if (q > best) best = q;
        }
        v = best;
      } else {
        // uniform random policy
        let sum = 0;
        for (const a of GW_ACTIONS) {
          const [nr, nc] = gwNextState(cfg, r, c, a);
          sum += 0.25 * (cfg.reward + cfg.gamma * prevV[nr][nc]);
        }
        v = sum;
      }
      newV[r][c] = v;
      const d = Math.abs(v - prevV[r][c]);
      if (d > maxDelta) { maxDelta = d; changed = [r, c]; }
    }
  }
  st.V = newV;
  st.prevV = prevV;
  st.iter++;
  st.changed = changed;
  gwRender(id);
  return maxDelta;
};

window.gwRun = function (id) {
  for (let i = 0; i < 200; i++) {
    const d = window.gwStep(id);
    if (d !== undefined && d < 1e-4) break;
  }
};

window.gwReset = function (id) {
  gwInit(id);
};

// ============ gridLearn — Episode-based Q-Learning / SARSA simulation ============
let glCounter = 0;
function gridLearn(config) {
  const id = `gl-${++glCounter}`;
  const cfgStr = JSON.stringify(config).replace(/'/g, "&#39;").replace(/"/g, "&quot;");
  const algoLabel = config.algorithm === "sarsa" ? "SARSA" : "Q-Learning";
  return `<div class="gridworld gridlearn" id="${id}" data-config="${cfgStr}">
    <div class="gw-head">
      <span class="gw-title">${config.title || algoLabel + " 학습"}</span>
      <div class="gw-iter">
        ep = <span id="${id}-ep">0</span> · ε = <span id="${id}-eps">${(config.initialEps || 0.9).toFixed(2)}</span>
      </div>
      <div class="gw-controls">
        <button onclick="window.glRunEp('${id}', 1)">▶ 1 ep</button>
        <button onclick="window.glRunEp('${id}', 100)" class="primary">▶▶ 100 ep</button>
        <button onclick="window.glRunEp('${id}', 1000)">▶▶▶ 1000 ep</button>
        <button onclick="window.glReset('${id}')">↺ 리셋</button>
      </div>
    </div>
    <div class="gw-body">
      <div id="${id}-grid"></div>
      <div class="gw-side" id="${id}-side"></div>
    </div>
  </div>`;
}

window.glState = {};

window.glInitAll = function () {
  document.querySelectorAll(".gridlearn").forEach(el => glInit(el.id));
};

function glInit(id) {
  const root = document.getElementById(id);
  if (!root) return;
  let cfg;
  try { cfg = JSON.parse(root.dataset.config); } catch (e) { return; }
  const Q = Array.from({ length: cfg.rows }, () =>
    Array.from({ length: cfg.cols }, () => [0, 0, 0, 0])
  );
  window.glState[id] = {
    cfg, Q,
    eps: cfg.initialEps || 0.9,
    episodes: 0,
    focused: null,
    trajectory: [],
    lastLen: 0, lastReturn: 0
  };
  glRender(id);
}

function glEpsGreedy(Q, r, c, eps) {
  if (Math.random() < eps) return Math.floor(Math.random() * 4);
  const qs = Q[r][c];
  let best = 0, bestQ = qs[0];
  for (let i = 1; i < 4; i++) if (qs[i] > bestQ) { best = i; bestQ = qs[i]; }
  return best;
}

window.glRunEp = function (id, n) {
  const st = window.glState[id];
  if (!st) return;
  const cfg = st.cfg;
  const alpha = cfg.alpha || 0.1;
  const decay = cfg.epsDecay || 0.001;
  const epsMin = cfg.epsMin || 0.05;
  const maxSteps = cfg.rows * cfg.cols * 10;
  let lastTraj = [], lastReturn = 0;

  for (let e = 0; e < n; e++) {
    let r = cfg.start[0], c = cfg.start[1];
    let a = glEpsGreedy(st.Q, r, c, st.eps);
    const traj = [[r, c]];
    let epReturn = 0, steps = 0;
    while (!gwIsTerminal(cfg, r, c) && steps < maxSteps) {
      const [nr, nc] = gwNextState(cfg, r, c, GW_ACTIONS[a]);
      const reward = cfg.reward;
      epReturn += reward;
      if (cfg.algorithm === "sarsa") {
        const aNext = glEpsGreedy(st.Q, nr, nc, st.eps);
        const qNext = gwIsTerminal(cfg, nr, nc) ? 0 : st.Q[nr][nc][aNext];
        st.Q[r][c][a] += alpha * (reward + cfg.gamma * qNext - st.Q[r][c][a]);
        r = nr; c = nc; a = aNext;
      } else {
        const qNext = gwIsTerminal(cfg, nr, nc) ? 0 : Math.max(...st.Q[nr][nc]);
        st.Q[r][c][a] += alpha * (reward + cfg.gamma * qNext - st.Q[r][c][a]);
        r = nr; c = nc;
        a = glEpsGreedy(st.Q, r, c, st.eps);
      }
      traj.push([r, c]);
      steps++;
    }
    st.eps = Math.max(st.eps - decay, epsMin);
    st.episodes++;
    lastTraj = traj; lastReturn = epReturn;
  }
  st.trajectory = lastTraj;
  st.lastLen = lastTraj.length;
  st.lastReturn = lastReturn;
  glRender(id);
};

window.glReset = function (id) { glInit(id); };

function glRender(id) {
  const st = window.glState[id];
  if (!st) return;
  const cfg = st.cfg;
  const grid = document.getElementById(id + "-grid");
  grid.innerHTML = "";
  const gd = document.createElement("div");
  gd.className = "gw-grid";
  gd.style.gridTemplateColumns = `repeat(${cfg.cols}, minmax(54px, 66px))`;

  // compute V range for heatmap
  let minV = Infinity, maxV = -Infinity;
  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      if (gwIsWall(cfg, r, c) || gwIsTerminal(cfg, r, c)) continue;
      const v = Math.max(...st.Q[r][c]);
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
  }
  if (!isFinite(minV)) { minV = -1; maxV = 0; }

  const trajSet = new Set(st.trajectory.map(t => `${t[0]},${t[1]}`));

  for (let r = 0; r < cfg.rows; r++) {
    for (let c = 0; c < cfg.cols; c++) {
      const cell = document.createElement("div");
      cell.className = "gw-cell";
      const isWall = gwIsWall(cfg, r, c);
      const isTerm = gwIsTerminal(cfg, r, c);
      const isStart = gwIsStart(cfg, r, c);
      if (isWall) cell.classList.add("wall");
      if (isTerm) cell.classList.add("terminal");
      if (isStart) cell.classList.add("start");
      if (st.focused && st.focused[0] === r && st.focused[1] === c) cell.classList.add("focused");
      if (trajSet.has(`${r},${c}`) && !isWall) cell.classList.add("gl-traj");

      if (!isWall && !isTerm && !isStart) {
        const v = Math.max(...st.Q[r][c]);
        const range = maxV - minV || 1;
        const t = (v - minV) / range;
        const alpha = 0.04 + t * 0.32;
        cell.style.background = `rgba(37, 99, 235, ${alpha.toFixed(3)})`;
      }

      let arrowHtml = "";
      if (!isWall && !isTerm && st.episodes > 0) {
        const qs = st.Q[r][c];
        let best = 0, bestQ = qs[0];
        for (let i = 1; i < 4; i++) if (qs[i] > bestQ) { best = i; bestQ = qs[i]; }
        if (Math.abs(bestQ) > 1e-9) {
          arrowHtml = `<span class="gw-arrow">${GW_ACTIONS[best].sym}</span>`;
        }
      }

      const marker = isStart ? "S" : (isTerm ? "G" : "");
      const v = isWall || isTerm ? "" : Math.max(...st.Q[r][c]).toFixed(2);
      const label = marker
        ? `<span class="gw-v">${marker}</span>`
        : `<span class="gw-pos">(${r},${c})</span><span class="gw-v">${v}</span>`;
      cell.innerHTML = `${label}${arrowHtml}`;
      if (!isWall) cell.onclick = () => { st.focused = [r, c]; glRender(id); };
      gd.appendChild(cell);
    }
  }
  grid.appendChild(gd);

  const epEl = document.getElementById(id + "-ep");
  const epsEl = document.getElementById(id + "-eps");
  if (epEl) epEl.textContent = st.episodes;
  if (epsEl) epsEl.textContent = st.eps.toFixed(2);
  glRenderSide(id);
}

function glRenderSide(id) {
  const st = window.glState[id];
  const cfg = st.cfg;
  const side = document.getElementById(id + "-side");
  const algo = cfg.algorithm === "sarsa" ? "SARSA (On-policy TD)" : "Q-Learning (Off-policy TD)";
  const target = cfg.algorithm === "sarsa"
    ? "r + γ · Q(s', a')  — a' = ε-greedy(Q, s')"
    : "r + γ · max<sub>a'</sub> Q(s', a')  — 항상 최대";

  let focusFormula = "";
  if (st.focused) {
    const [r, c] = st.focused;
    if (gwIsWall(cfg, r, c)) {
      focusFormula = `<div class="gw-formula"><h4>셀 (${r},${c}) — 벽</h4><div class="gw-eq">통과 불가. Q값 없음.</div></div>`;
    } else if (gwIsTerminal(cfg, r, c)) {
      focusFormula = `<div class="gw-formula"><h4>셀 (${r},${c}) — G (terminal)</h4><div class="gw-eq">Q(terminal, ·) ≡ 0</div></div>`;
    } else {
      const qs = st.Q[r][c];
      const syms = ["↑", "↓", "←", "→"];
      const best = qs.indexOf(Math.max(...qs));
      const lines = qs.map((q, i) =>
        `<div class="line" style="${i === best ? 'color:var(--accent);font-weight:700' : ''}">${syms[i]}: Q(s, ${syms[i]}) = <span class="num">${q.toFixed(3)}</span></div>`
      ).join("");
      focusFormula = `<div class="gw-formula">
        <h4>셀 (${r},${c}) — Q(s, ·) 4값</h4>
        <div class="gw-eq">${lines}</div>
        <div class="gw-final">argmax → ${syms[best]} (Q = ${qs[best].toFixed(3)})</div>
      </div>`;
    }
  } else {
    focusFormula = `<div class="gw-formula"><h4>셀 클릭하면 Q(s, ·) 4값이 보입니다</h4></div>`;
  }

  const lastInfo = st.episodes > 0
    ? `<strong style="color:var(--accent)">마지막 에피소드</strong>: ${st.lastLen} step, 총 보상 = ${st.lastReturn}`
    : `<em>아직 학습 전. ▶ 버튼을 눌러보세요.</em>`;

  side.innerHTML = `
    <div class="gw-legend">
      <strong>${algo}</strong><br>
      ${cfg.rows}×${cfg.cols} · r = ${cfg.reward} · γ = ${cfg.gamma} · α = ${cfg.alpha || 0.1}<br>
      S = (${cfg.start[0]}, ${cfg.start[1]}) → G = (${cfg.terminal[0][0]}, ${cfg.terminal[0][1]})<br>
      target: <code>${target}</code><br>
      ε-greedy: 초기 ${(cfg.initialEps || 0.9).toFixed(2)} → 최소 ${(cfg.epsMin || 0.05).toFixed(2)} (decay ${(cfg.epsDecay || 0.001).toFixed(4)} / ep)<br>
      ${lastInfo}<br>
      <em style="color:var(--text-dim)">노란 outline: 마지막 에피소드 궤적. 파란 배경: max<sub>a</sub> Q 히트맵.</em>
    </div>
    ${focusFormula}
  `;
}
