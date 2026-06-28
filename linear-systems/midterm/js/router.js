// Tiny hash-based router

const PAGE_ORDER = [
  "intro", "glossary-index",
  "ch2-convolution",
  "ch3-vectorspace", "ch3-rank", "ch3-eigen", "ch3-diagonal", "ch3-cayley",
  "ch4-realization", "ch4-solution",
  "ch5-bibo", "ch5-internal",
  "hw1", "hw2", "hw3", "hw4", "hw5",
  "exam-1", "exam-2",
];

// Strip any query-string from hash id.
function parseHashId(raw) {
  return (raw || "").split("?")[0];
}

function neighbors(id) {
  const i = PAGE_ORDER.indexOf(id);
  const prev = i > 0 ? PAGE_ORDER[i - 1] : null;
  const next = i < PAGE_ORDER.length - 1 ? PAGE_ORDER[i + 1] : null;
  return {
    prev: prev && PAGES[prev] ? { id: prev, title: PAGES[prev].title } : null,
    next: next && PAGES[next] ? { id: next, title: PAGES[next].title } : null,
  };
}

window.go = function (id) {
  const pageId = parseHashId(id);
  if (!PAGES[pageId]) return;
  location.hash = id;
  renderPage(pageId);
};

function renderPage(id) {
  const page = PAGES[id];
  const content = document.getElementById("content");
  if (!page) {
    content.innerHTML = `<h1>준비 중</h1><p>아직 작성되지 않은 페이지입니다.</p>`;
    return;
  }
  const { prev, next } = neighbors(id);
  content.innerHTML = page.render() + completeBtn(id) + pageNav(prev, next);
  if (window.renderMathInElement) {
    window.renderMathInElement(content, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
    });
  }
  // Init walkthroughs
  document.querySelectorAll(".walkthrough").forEach(w => renderWalkStep(w.id));
  // Init row-reduce steppers
  document.querySelectorAll(".row-reduce").forEach(r => renderRRStep(r.id));
  // Init 2D matrix transforms
  document.querySelectorAll(".mx-viz").forEach(m => renderMT(m.id));
  // Update nav highlight
  document.querySelectorAll("#chapter-nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === id);
  });
  window.scrollTo(0, 0);
}

window.refreshNav = function () {
  document.querySelectorAll("#chapter-nav a").forEach(a => {
    if (a.dataset.page && isComplete(a.dataset.page)) a.classList.add("done");
    else a.classList.remove("done");
  });
  // Progress %
  const total = PAGE_ORDER.filter(p => PAGES[p]).length;
  const done = PAGE_ORDER.filter(p => isComplete(p)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("progress-pill").textContent = `진도 ${pct}%`;
};
