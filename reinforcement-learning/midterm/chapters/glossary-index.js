registerPage("glossary-index", "📔 용어 사전", () => {
  const categories = [
    {
      title: "1. AI · ML 기초 (Ch 1~2)",
      keys: ["symbolic-ai", "subsymbolic-ai", "ml", "dl", "nn", "supervised", "unsupervised"]
    },
    {
      title: "2. RL 기본 · MDP (Ch 3)",
      keys: ["rl-def", "agent-env", "markov-property", "mp", "mrp", "mdp", "policy", "return", "gamma", "value-function", "q-function"]
    },
    {
      title: "3. Bellman · Dynamic Programming (Ch 4)",
      keys: ["bellman-expectation", "bellman-optimal", "bellman-decomp", "dp", "policy-eval", "policy-iter", "value-iter"]
    },
    {
      title: "4. Model-free (Ch 5~7 — 시험 범위 끝)",
      keys: ["model-free", "mc", "td", "prediction-vs-control", "sarsa", "q-learning"]
    }
  ];

  const total = categories.reduce((s, c) => s + c.keys.length, 0);

  let html = `<h1>📔 용어 사전</h1>
  <p class="lead">시험 범위에 나오는 모든 용어를 한눈에. 카드를 클릭하면 오른쪽 패널로 상세 설명이 열려요. <strong>내가 모르는 용어가 있는지</strong> 체크용으로 써보세요. 총 <strong>${total}개</strong>.</p>
  ${note(`
    <strong>Tip:</strong> 패널 안의 용어도 모두 클릭 가능합니다 → 타고 들어갈 수 있어요. 왼쪽에 <strong>← 뒤로</strong> 버튼, 왼쪽 가장자리 드래그로 <strong>너비 조절</strong>, 바깥 클릭 또는 <kbd>Esc</kbd>로 닫기.
  `, "tip")}`;

  for (const cat of categories) {
    html += `<h2>${cat.title}</h2><div class="glossary-grid">`;
    for (const k of cat.keys) {
      const g = (window.GLOSSARY || {})[k];
      if (!g) continue;
      html += `<div class="gi-card" onclick="window.openTerm('${k}')" role="button" tabindex="0">
        <div class="gi-term">${g.term}</div>
        <div class="gi-short">${g.short || ""}</div>
      </div>`;
    }
    html += `</div>`;
  }

  return html;
});
