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

// Step-by-step walkthrough — accumulating: revealed steps stay visible.
// 다음 클릭 → 아래에 새 단계 추가. 이전 단계는 그대로 남아 위로 스크롤 가능.
let walkCounter = 0;
function walkthrough(title, steps) {
  const id = `walk-${++walkCounter}`;
  const data = JSON.stringify(steps).replace(/'/g, "&#39;");
  return `<div class="walkthrough" id="${id}" data-steps='${data}' data-revealed="1">
    <div class="walkthrough-header">
      <div class="title">🧮 ${title}</div>
      <div class="step-counter"><span class="cur">1</span> / ${steps.length} 단계 공개됨</div>
    </div>
    <div class="walkthrough-steps"></div>
    <div class="walkthrough-controls">
      <button onclick="window.walkNext('${id}')">다음 단계 ↓</button>
      <button onclick="window.walkAll('${id}')">모두 펼치기</button>
      <button onclick="window.walkReset('${id}')">↺ 처음부터</button>
    </div>
  </div>`;
}

function renderWalkthrough(id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const revealed = parseInt(root.dataset.revealed);
  const stepsEl = root.querySelector(".walkthrough-steps");
  stepsEl.innerHTML = steps.slice(0, revealed).map((s, i) => `
    <div class="walk-step">
      <div class="step-title">Step ${i + 1}: ${s.title}</div>
      <div class="step-body">${s.body}</div>
    </div>
  `).join("");
  root.querySelector(".cur").textContent = revealed;
  const [nextBtn, allBtn, resetBtn] = root.querySelectorAll(".walkthrough-controls button");
  nextBtn.disabled = revealed >= steps.length;
  allBtn.disabled = revealed >= steps.length;
  resetBtn.disabled = revealed <= 1;
  if (window.renderMathInElement) window.renderMathInElement(stepsEl, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
}

function renderWalkStep(id) { renderWalkthrough(id); } // backward compat for router.js

window.walkNext = function (id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const revealed = parseInt(root.dataset.revealed);
  if (revealed < steps.length) {
    root.dataset.revealed = revealed + 1;
    renderWalkthrough(id);
    // Scroll newly revealed step into view
    const newStep = root.querySelectorAll(".walk-step")[revealed];
    if (newStep) newStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

window.walkAll = function (id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  root.dataset.revealed = steps.length;
  renderWalkthrough(id);
};

window.walkReset = function (id) {
  const root = document.getElementById(id);
  root.dataset.revealed = 1;
  renderWalkthrough(id);
  root.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const data = JSON.parse(localStorage.getItem("ls-progress") || "{}");
  return !!data[pageId];
}
function setComplete(pageId, val) {
  const data = JSON.parse(localStorage.getItem("ls-progress") || "{}");
  if (val) data[pageId] = Date.now(); else delete data[pageId];
  localStorage.setItem("ls-progress", JSON.stringify(data));
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
  let remaining = parseInt(localStorage.getItem("ls-timer-remaining") || (minutes * 60));
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
    localStorage.setItem("ls-timer-remaining", remaining);
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
  localStorage.removeItem("ls-timer-remaining");
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

// ============================================================
// Concept (blue) / Prereq (green) collapsibles.
// concept: 원내용 심화. prereq: 선행 선형대수 복습.
// ============================================================
function concept(summary, body, opts = {}) {
  const open = opts.open ? "open" : "";
  return `<details class="concept" ${open}><summary>${summary}</summary><div class="body">${body}</div></details>`;
}
function prereq(summary, body, opts = {}) {
  const open = opts.open ? "open" : "";
  return `<details class="prereq" ${open}><summary>${summary}</summary><div class="body">${body}</div></details>`;
}
// Backward-compat alias for older pages.
const bgKnow = prereq;

// Professor-memo block (orange) — captures spoken exam hints.
function profMemo(body) {
  return `<div class="prof-memo"><div class="prof-memo-label">💬 교수님 코멘트</div><div class="prof-memo-body">${body}</div></div>`;
}

// ============================================================
// Inline term — click opens right-side panel.
// ============================================================
function term(key, displayText) {
  const g = (window.GLOSSARY || {})[key];
  const text = displayText || (g ? g.term : key);
  return `<span class="term-link" onclick="window.openTerm('${key}')" title="클릭해서 설명 보기">${text}</span>`;
}

// Right-panel history stack so back button works.
window.tpHistory = [];
window.tpIndex = -1;

function tpRenderTerm(key) {
  const g = (window.GLOSSARY || {})[key];
  const panel = document.getElementById("term-panel");
  if (!panel) return;
  const content = panel.querySelector(".tp-content");
  if (!g) {
    content.innerHTML = `<div class="tp-term">${key}</div>
      <div class="tp-short">용어집에 없는 항목입니다. (key: <code>${key}</code>)</div>`;
  } else {
    const related = (g.related || []).map(k => {
      const gr = (window.GLOSSARY || {})[k];
      return gr ? `<span class="term-link" onclick="window.openTerm('${k}')">${gr.term}</span>` : "";
    }).filter(Boolean).join("");
    content.innerHTML = `
      <div class="tp-term">${g.term}${g.ko ? `<span class="tp-ko">${g.ko}</span>` : ""}</div>
      ${g.short ? `<div class="tp-short">${g.short}</div>` : ""}
      <div class="tp-body">${g.definition || ""}</div>
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
  const backBtn = panel.querySelector(".tp-back");
  if (backBtn) backBtn.disabled = window.tpIndex <= 0;
}

window.openTerm = function (key) {
  const panel = document.getElementById("term-panel");
  const backdrop = document.getElementById("term-backdrop");
  if (!panel) return;
  window.tpHistory = window.tpHistory.slice(0, window.tpIndex + 1);
  window.tpHistory.push(key);
  window.tpIndex = window.tpHistory.length - 1;
  tpRenderTerm(key);
  panel.classList.add("open");
  if (backdrop) backdrop.classList.add("open");
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
  window.tpHistory = [];
  window.tpIndex = -1;
};

window.tpSetupResize = function () {
  const panel = document.getElementById("term-panel");
  const handle = panel && panel.querySelector(".tp-resize");
  if (!panel || !handle || handle.dataset.wired) return;
  handle.dataset.wired = "1";
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

// ============================================================
// Matrix rendering — pretty, with optional row/col highlight.
// rows: 2D array of strings (KaTeX content allowed).
// opts: { hlRow: number|number[], hlCol: number|number[], hlCell: [r,c][] }
// ============================================================
function matrix(rows, opts = {}) {
  const hlRow = new Set([].concat(opts.hlRow ?? []));
  const hlCol = new Set([].concat(opts.hlCol ?? []));
  const hlCell = new Set((opts.hlCell || []).map(([r, c]) => `${r},${c}`));
  const body = rows.map((row, r) =>
    `<tr>${row.map((cell, c) => {
      const cls = [];
      if (hlRow.has(r)) cls.push("hl-row");
      if (hlCol.has(c)) cls.push("hl-col");
      if (hlCell.has(`${r},${c}`)) cls.push("hl-cell");
      return `<td class="${cls.join(" ")}">${cell}</td>`;
    }).join("")}</tr>`
  ).join("");
  return `<table class="mx">${body}</table>`;
}

// Row-reduction walker — each step is { op, rows, hlRow? }.
let rrCounter = 0;
function rowReduce(steps) {
  const id = `rr-${++rrCounter}`;
  const payload = JSON.stringify(steps).replace(/'/g, "&#39;");
  return `<div class="row-reduce" id="${id}" data-steps='${payload}' data-current="0">
    <div class="rr-header">
      <div class="title">🧮 행연산 단계별 보기</div>
      <div class="step-counter"><span class="cur">1</span> / ${steps.length}</div>
    </div>
    <div class="rr-op"></div>
    <div class="rr-matrix"></div>
    <div class="rr-controls">
      <button onclick="window.rrPrev('${id}')">← 이전</button>
      <button onclick="window.rrNext('${id}')">다음 →</button>
    </div>
  </div>`;
}

function renderRRStep(id) {
  const root = document.getElementById(id);
  const steps = JSON.parse(root.dataset.steps);
  const i = parseInt(root.dataset.current);
  const s = steps[i];
  root.querySelector(".rr-op").innerHTML = s.op ? `<span class="op-label">Step ${i + 1}</span> ${s.op}` : "";
  root.querySelector(".rr-matrix").innerHTML = matrix(s.rows, { hlRow: s.hlRow });
  root.querySelector(".cur").textContent = i + 1;
  const [prev, next] = root.querySelectorAll(".rr-controls button");
  prev.disabled = i === 0;
  next.disabled = i === steps.length - 1;
  if (window.renderMathInElement) window.renderMathInElement(root, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
}
window.rrNext = function (id) {
  const r = document.getElementById(id);
  const s = JSON.parse(r.dataset.steps);
  const i = parseInt(r.dataset.current);
  if (i < s.length - 1) { r.dataset.current = i + 1; renderRRStep(id); }
};
window.rrPrev = function (id) {
  const r = document.getElementById(id);
  const i = parseInt(r.dataset.current);
  if (i > 0) { r.dataset.current = i - 1; renderRRStep(id); }
};

// ============================================================
// 2D matrix transform visualizer (SVG).
// Shows grid + basis vectors + (optionally) eigenvectors under A.
// opts: { a, b, c, d, showEigen?: bool, size?: number }
// ============================================================
let mtCounter = 0;
function matrixTransform2D(opts = {}) {
  const id = `mt-${++mtCounter}`;
  const a = opts.a ?? 2, b = opts.b ?? 1, c = opts.c ?? 0, d = opts.d ?? 2;
  const showEigen = opts.showEigen !== false;
  return `<div class="mx-viz" id="${id}" data-show-eigen="${showEigen}">
    <div class="mx-viz-title">🔷 2D 선형변환 시각화 — $A = \\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix}$</div>
    <div class="mx-viz-body">
      <div class="mx-viz-canvas">
        <svg id="${id}-svg" viewBox="-5 -5 10 10" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="mx-viz-controls">
        <label>a = <span id="${id}-a-v">${a}</span>
          <input type="range" min="-3" max="3" step="0.1" value="${a}"
            oninput="window.mtUpdate('${id}', 'a', this.value)"></label>
        <label>b = <span id="${id}-b-v">${b}</span>
          <input type="range" min="-3" max="3" step="0.1" value="${b}"
            oninput="window.mtUpdate('${id}', 'b', this.value)"></label>
        <label>c = <span id="${id}-c-v">${c}</span>
          <input type="range" min="-3" max="3" step="0.1" value="${c}"
            oninput="window.mtUpdate('${id}', 'c', this.value)"></label>
        <label>d = <span id="${id}-d-v">${d}</span>
          <input type="range" min="-3" max="3" step="0.1" value="${d}"
            oninput="window.mtUpdate('${id}', 'd', this.value)"></label>
        <div class="mx-viz-info" id="${id}-info"></div>
      </div>
    </div>
  </div>`;
}

window.mtUpdate = function (id, key, val) {
  const root = document.getElementById(id);
  root.dataset[key] = parseFloat(val);
  document.getElementById(`${id}-${key}-v`).textContent = val;
  renderMT(id);
};

function renderMT(id) {
  const root = document.getElementById(id);
  const a = parseFloat(root.dataset.a ?? root.querySelector(`[oninput*="'a'"]`).value);
  const b = parseFloat(root.dataset.b ?? root.querySelector(`[oninput*="'b'"]`).value);
  const c = parseFloat(root.dataset.c ?? root.querySelector(`[oninput*="'c'"]`).value);
  const d = parseFloat(root.dataset.d ?? root.querySelector(`[oninput*="'d'"]`).value);
  const svg = document.getElementById(`${id}-svg`);
  const showEigen = root.dataset.showEigen === "true";

  // Compute eigenvalues of [[a,b],[c,d]]
  const tr = a + d, det = a * d - b * c;
  const disc = tr * tr - 4 * det;
  let evals = [], evecs = [];
  if (disc >= 0) {
    const s = Math.sqrt(disc);
    evals = [(tr + s) / 2, (tr - s) / 2];
    evecs = evals.map(l => {
      if (Math.abs(b) > 1e-9) return [b, l - a];
      if (Math.abs(c) > 1e-9) return [l - d, c];
      return [1, 0];
    }).map(v => {
      const n = Math.hypot(v[0], v[1]);
      return n > 1e-9 ? [v[0] / n * 3, v[1] / n * 3] : [0, 0];
    });
  }

  const apply = (x, y) => [a * x + b * y, c * x + d * y];

  // Build SVG: axes, original grid (faint), transformed grid, basis vectors
  let lines = `<defs>
    <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="3" refY="2"
      orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L4,2 L0,4 Z" fill="currentColor"/>
    </marker>
  </defs>`;
  // Axes
  lines += `<line x1="-5" y1="0" x2="5" y2="0" class="axis"/>`;
  lines += `<line x1="0" y1="-5" x2="0" y2="5" class="axis"/>`;
  // Original grid (faint)
  for (let i = -4; i <= 4; i++) {
    lines += `<line x1="${i}" y1="-4" x2="${i}" y2="4" class="grid0"/>`;
    lines += `<line x1="-4" y1="${i}" x2="4" y2="${i}" class="grid0"/>`;
  }
  // Transformed grid
  for (let i = -4; i <= 4; i++) {
    const [x1, y1] = apply(i, -4), [x2, y2] = apply(i, 4);
    lines += `<line x1="${x1}" y1="${-y1}" x2="${x2}" y2="${-y2}" class="grid1"/>`;
    const [x3, y3] = apply(-4, i), [x4, y4] = apply(4, i);
    lines += `<line x1="${x3}" y1="${-y3}" x2="${x4}" y2="${-y4}" class="grid1"/>`;
  }
  // Basis images: Ae1, Ae2
  const [ex, ey] = apply(1, 0), [fx, fy] = apply(0, 1);
  lines += arrow(0, 0, ex, -ey, "vec-i");
  lines += arrow(0, 0, fx, -fy, "vec-j");
  // Eigenvectors
  if (showEigen && evecs.length === 2) {
    evecs.forEach((v, k) => {
      lines += arrow(0, 0, v[0], -v[1], `vec-eig vec-eig-${k}`);
      lines += arrow(0, 0, -v[0], v[1], `vec-eig vec-eig-${k}`);
    });
  }
  svg.innerHTML = lines;

  // Info panel
  const info = document.getElementById(`${id}-info`);
  let infoHtml = `det = ${det.toFixed(2)}, tr = ${tr.toFixed(2)}<br>`;
  if (disc < 0) {
    const re = (tr / 2).toFixed(2);
    const im = (Math.sqrt(-disc) / 2).toFixed(2);
    infoHtml += `λ = ${re} ± ${im}i (복소 — 회전 포함)`;
  } else {
    infoHtml += `λ₁ = ${evals[0].toFixed(2)}, λ₂ = ${evals[1].toFixed(2)}`;
  }
  info.innerHTML = infoHtml;
}

function arrow(x1, y1, x2, y2, cls) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" marker-end="url(#arrowhead)"/>`;
}

// ============================================================
// Eigen checker — user enters v, we compute Av and Re-check if parallel.
// ============================================================
let ecCounter = 0;
function eigenChecker(A, label) {
  const id = `ec-${++ecCounter}`;
  const sA = JSON.stringify(A);
  return `<div class="eigen-check" id="${id}" data-a='${sA}'>
    <div class="ec-title">🔍 직접 확인 — ${label || "이 벡터가 eigenvector인가?"}</div>
    <div class="ec-input">
      A = $\\begin{bmatrix}${A[0][0]} & ${A[0][1]} \\\\ ${A[1][0]} & ${A[1][1]}\\end{bmatrix}$,
      v = $\\begin{bmatrix}$<input type="number" id="${id}-v1" value="1" step="1"/>$\\\\$<input type="number" id="${id}-v2" value="0" step="1"/>$\\end{bmatrix}$
      <button onclick="window.ecCheck('${id}')">확인</button>
    </div>
    <div class="ec-result" id="${id}-res"></div>
  </div>`;
}

window.ecCheck = function (id) {
  const root = document.getElementById(id);
  const A = JSON.parse(root.dataset.a);
  const v1 = parseFloat(document.getElementById(`${id}-v1`).value);
  const v2 = parseFloat(document.getElementById(`${id}-v2`).value);
  const Av1 = A[0][0] * v1 + A[0][1] * v2;
  const Av2 = A[1][0] * v1 + A[1][1] * v2;
  const res = document.getElementById(`${id}-res`);
  if (Math.abs(v1) < 1e-9 && Math.abs(v2) < 1e-9) {
    res.innerHTML = `<span class="bad">영벡터는 정의상 eigenvector가 될 수 없어.</span>`;
    return;
  }
  const cross = v1 * Av2 - v2 * Av1;
  const parallel = Math.abs(cross) < 1e-6;
  let lambda = null;
  if (Math.abs(v1) > 1e-9) lambda = Av1 / v1;
  else if (Math.abs(v2) > 1e-9) lambda = Av2 / v2;
  if (parallel && lambda !== null) {
    res.innerHTML = `<span class="good">✓ Eigenvector!</span> $Av = \\begin{bmatrix}${Av1}\\\\${Av2}\\end{bmatrix} = ${lambda.toFixed(3)} \\cdot v$, 즉 $\\lambda = ${lambda.toFixed(3)}$.`;
  } else {
    res.innerHTML = `<span class="bad">✗ Eigenvector 아님.</span> $Av = \\begin{bmatrix}${Av1}\\\\${Av2}\\end{bmatrix}$ — $v$와 평행하지 않아.`;
  }
  if (window.renderMathInElement) window.renderMathInElement(res, {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
  });
};
