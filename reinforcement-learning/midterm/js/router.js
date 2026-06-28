// Hash-based router for RL midterm notes

const PAGE_ORDER = [
  "intro",
  "ch1-rl-basics",
  "ch2-mdp",
  "ch3-bellman",
  "ch4-dp",
  "ch5-mc",
  "ch6-td",
  "ch7-control",
  "exam-1",
  "exam-2",
  "glossary-index",
];

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
  if (!PAGES[id]) return;
  location.hash = id;
  renderPage(id);
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
  document.querySelectorAll(".walkthrough").forEach(w => renderWalkStep(w.id));
  if (window.gwInitAll) window.gwInitAll();
  if (window.glInitAll) window.glInitAll();
  document.querySelectorAll("#chapter-nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === id);
  });
  if (window.closeTerm) window.closeTerm();
  window.scrollTo(0, 0);
}

window.refreshNav = function () {
  document.querySelectorAll("#chapter-nav a").forEach(a => {
    if (a.dataset.page && isComplete(a.dataset.page)) a.classList.add("done");
    else a.classList.remove("done");
  });
  const total = PAGE_ORDER.filter(p => PAGES[p]).length;
  const done = PAGE_ORDER.filter(p => isComplete(p)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("progress-pill").textContent = `진도 ${pct}%`;
};
