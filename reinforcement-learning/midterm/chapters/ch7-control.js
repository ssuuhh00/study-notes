registerPage("ch7-control", "Ch 7. Model-Free Control", () => `
<h1>Ch 7 — Model-Free Control (MC Control · SARSA · Q-Learning)</h1>
<p class="lead">${term("mdp", "MDP")} 모를 때 최적 정책 $\\pi_*$ 찾기. 세 가지 알고리즘과 $\\epsilon$-greedy. <strong>시험에서 가장 많은 출제 포인트가 몰려 있는 장</strong>.</p>

${note(`
<strong>📖 Ch 5~6 복습:</strong> ${term("mdp", "MDP")} 모를 때 $v_\\pi$를 구하는 법 (${term("mc", "MC")}, ${term("td", "TD")})까지 왔어요. 이제 $v$가 아닌 <strong>최적 정책</strong>을 찾을 차례.
`, "tip")}

${prereq("📔 이 장 용어 빠른 참조", `
  ${term("sarsa")} · ${term("q-learning")} · ${term("td")} · ${term("mc")} · ${term("bellman-expectation")} · ${term("bellman-optimal")} · ${term("q-function")} · ${term("model-free")} · ${term("prediction-vs-control")}
`)}

${note(`
<strong>⚑ 교수님 시험 출제 명시 (0414-1 녹음):</strong><br>
① "<em>이 코드에 어느 부분을 뻥 뚫어놓고 여기에 들어갈 코드를 써봐라</em>" — <strong>코드 빈칸 채우기</strong><br>
② "<em>자기가 외운 코드를 가지고 딱 어떤 알고리즘을 짜봐라</em>" — <strong>알고리즘 직접 작성</strong><br>
③ "<em>입실론 그리디가 뭐냐 또 아닐링 방법 디케잉 방법이 뭐냐 왜 하고 있느냐 이런 걸 시험 문제 낼 거예요</em>" — <strong>개념 설명</strong><br>
④ SARSA vs Q-Learning, On/Off-policy 차이<br>
→ 이 장의 파이썬 코드 3개(MC Control, SARSA, Q-Learning)는 <u>직접 타이핑할 수 있을 수준으로</u> 익혀두세요.
`, "warn")}

<h2>1. 왜 DP Control을 그냥 못 쓰나? — 두 가지 이유</h2>

${note(`
<strong>⚑ 시험 포인트:</strong> "DP Control을 Model-free에 왜 못 쓰나?" 류 서술형이 충분히 가능. 아래 2가지 이유를 쓸 수 있어야 함.
`, "warn")}

<h3>이유 1 — Policy Evaluation 계산 불가</h3>
<p>2단계 Bellman Expectation Eq:</p>
$$v_\\pi(s) = \\sum_a \\pi(a|s) \\left( \\underbrace{r_s^a}_{\\text{unknown}} + \\gamma \\sum_{s'} \\underbrace{P_{ss'}^a}_{\\text{unknown}} v_\\pi(s') \\right)$$
<p>$r_s^a, P_{ss'}^a$를 모르므로 이 식 자체를 계산할 수 없음. → <u>MC 또는 TD로 대체해야 함</u>.</p>

<h3>이유 2 — Greedy Improvement 불가</h3>
<p>$v$만 알면 각 상태의 가치는 알 수 있지만, "이 액션을 하면 어디로 갈까?"를 모름 (전이확률 unknown). 그러면 <u>greedy action을 고를 수 없음</u>.</p>

<div style="text-align:center;margin:16px 0">
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <defs><marker id="ar-c" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>
  <circle cx="50" cy="100" r="28" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="50" y="105" text-anchor="middle" font-size="14" font-weight="bold">$s_t$</text>
  <circle cx="200" cy="60" r="6" fill="currentColor"/>
  <circle cx="200" cy="140" r="6" fill="currentColor"/>
  <line x1="75" y1="90" x2="185" y2="65" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-c)"/>
  <line x1="75" y1="110" x2="185" y2="135" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-c)"/>
  <text x="130" y="70" font-size="11">$a_1$</text>
  <text x="130" y="130" font-size="11">$a_2$</text>

  <rect x="260" y="40" width="80" height="50" fill="rgba(185,28,28,0.1)" stroke="#b91c1c" stroke-dasharray="4,4"/>
  <text x="300" y="60" text-anchor="middle" font-size="11" fill="#b91c1c">70% ?</text>
  <text x="300" y="78" text-anchor="middle" font-size="11" fill="#b91c1c">30% ?</text>
  <rect x="260" y="120" width="80" height="50" fill="rgba(185,28,28,0.1)" stroke="#b91c1c" stroke-dasharray="4,4"/>
  <text x="300" y="140" text-anchor="middle" font-size="11" fill="#b91c1c">50% ?</text>
  <text x="300" y="158" text-anchor="middle" font-size="11" fill="#b91c1c">50% ?</text>

  <circle cx="420" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="420" y="45" text-anchor="middle" font-size="11">$v=1$</text>
  <circle cx="420" cy="85" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="420" y="90" text-anchor="middle" font-size="11">$v=2$</text>
  <circle cx="420" cy="130" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="420" y="135" text-anchor="middle" font-size="11">$v=3$</text>
  <circle cx="420" cy="175" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="420" y="180" text-anchor="middle" font-size="11">$v=4$</text>

  <text x="520" y="90" text-anchor="middle" font-size="12" fill="#b91c1c" font-style="italic">전이확률 ?</text>
  <text x="520" y="108" text-anchor="middle" font-size="12" fill="#b91c1c" font-style="italic">greedy 불가</text>
</svg>
</div>

<h2>2. 해결책 3가지</h2>

<div class="stepper" style="margin:16px 0">
<ol>
<li><strong>Policy Evaluation에 MC/TD 사용</strong> — 이유 1 해결. 경험 평균으로 value 추정.</li>
<li><strong>$v$ 대신 $q(s,a)$ 사용</strong> — 이유 2 해결. $q$를 알면 $\\arg\\max_a q(s,a)$로 바로 greedy 가능.</li>
<li><strong>$\\epsilon$-greedy</strong> — 탐색(exploration) 보장. 순수 greedy의 <em>No-Exploration 문제</em> 해결.</li>
</ol>
</div>

<h3>왜 $q$를 쓰면 되나?</h3>
${note(`
$q(s,a_1) = 1, q(s,a_2) = 2$이면 <u>전이확률 몰라도</u> $a_2$ 고르면 됨.<br>
반면 $v$만 알면 "$a_1$ 하면 어느 $s'$로?" 를 알아야 다음 상태 가치 비교 가능 → 전이확률 필요.
`, "tip")}

<h3>$\\epsilon$-greedy — No-Exploration 문제 해결</h3>

${note(`
<strong>No-Exploration 문제:</strong><br>
$q$를 모두 0으로 초기화. 우연히 $q(s,a_1) = 0.1$로 업데이트되면 순수 greedy는 영원히 $a_1$만 뽑음. 다른 액션 $a_2, a_3, a_4$는 영원히 시도 안 됨 → 더 나은 액션이 있어도 발견 못 함 → <u>Local Minimum</u>.
`, "warn")}

${defCard("$\\epsilon$-greedy Policy", `
$$\\pi(a|s) = \\begin{cases} 1 - \\epsilon + \\epsilon/|\\mathcal{A}| & \\text{if } a = \\arg\\max_a q(s,a) \\\\ \\epsilon/|\\mathcal{A}| & \\text{otherwise} \\end{cases}$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$\\pi(a|s)$ — 상태 $s$에서 액션 $a$를 고를 확률</li>
    <li>$\\epsilon$ — 탐색 비율 (0~1, 작은 값. 예: 0.1)</li>
    <li>$|\\mathcal{A}|$ — 전체 액션의 개수</li>
    <li>$\\arg\\max_a q(s,a)$ — Q값이 최대인 액션 (= greedy 액션)</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\epsilon / |\\mathcal{A}|$ — "무작위로 뽑았을 때 특정 액션이 걸릴 확률" (예: $\\epsilon=0.1$, 액션 4개면 각 액션당 0.025)</li>
    <li>하단 줄 ($a$가 greedy 아닐 때): 확률 $\\epsilon/|\\mathcal{A}|$ — <strong>무작위 선택으로만</strong> 뽑힐 수 있음</li>
    <li>상단 줄 ($a$가 greedy일 때): $1-\\epsilon + \\epsilon/|\\mathcal{A}|$ — <strong>greedy로 직접 뽑힐 확률 $(1-\\epsilon)$ + 무작위로도 우연히 같은 액션이 뽑힐 확률 $\\epsilon/|\\mathcal{A}|$</strong>의 합</li>
  </ul>`,
  whole: `"<strong>$\\epsilon$ 확률로는 무작위, $1-\\epsilon$ 확률로는 greedy를 선택</strong>"하는 정책.<br>
  전체 확률의 합 = $(1-\\epsilon+\\epsilon/|\\mathcal{A}|) + (|\\mathcal{A}|-1) \\cdot \\epsilon/|\\mathcal{A}| = 1$ (정상).<br>
  • 구현은 단순: <code>if rand() &lt; ε: random action else: argmax</code><br>
  • 효과: greedy가 놓칠 수 있는 액션들이 일정 확률로 계속 시도됨 → 탐색 보장.`
})}

${defCard("Decaying $\\epsilon$-greedy (Annealing)", `
$\\epsilon$을 학습 진행에 따라 <strong>점점 줄임</strong>.<br>
• 초기 — $\\epsilon$ 크게 (많이 탐색, 환경 파악)<br>
• 학습 진행 — $\\epsilon$ 작게 (이미 얻은 정보로 최선 선택)<br><br>
구현: <code>eps -= 0.03; eps = max(eps, 0.1)</code> (최솟값 하한 유지)
`)}

${note(`
<strong>⚑ 시험 포인트 (0414-1 강의 명시):</strong> "<em>입실론 그리디가 뭐냐 또 아닐링 방법 디케잉 방법이 뭐냐 왜 하고 있느냐 이런 걸 시험 문제 낼 거예요</em>". $\\epsilon$-greedy 정의, 왜 필요한지, decaying의 의미를 설명할 수 있어야.
`, "warn")}

<h2>3. MC Control</h2>

${defCard("Monte Carlo Control", `
<ol>
  <li>$q(s,a)$ 테이블 초기화</li>
  <li><strong>Policy Evaluation (Shallow)</strong>: $\\epsilon$-greedy 정책으로 에피소드 굴리고, 끝난 후 리턴으로 업데이트
    $$q[s,a] \\leftarrow q[s,a] + \\alpha(G - q[s,a])$$
  </li>
  <li><strong>Policy Improvement</strong>: 업데이트된 $q$로 decaying $\\epsilon$-greedy 정책 만들기</li>
  <li>2-3 반복 → 수렴 시 $\\pi_*$</li>
</ol>
`)}

<h2>4. SARSA — TD Control, On-Policy</h2>

${defCard("SARSA 업데이트", `
MC 대신 TD 쓰는 버전. <strong>한 스텝마다</strong> 업데이트.
$$\\boxed{q(s,a) \\leftarrow q(s,a) + \\alpha(r + \\gamma \\, q(s',a') - q(s,a))}$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$q(s,a)$ — 상태 $s$에서 액션 $a$의 Q 추정값 (업데이트 대상)</li>
    <li>$r$ — 한 스텝 걸어 받은 <strong>즉시 보상</strong> (샘플)</li>
    <li>$s'$ — 한 스텝 후 도달한 다음 상태 (샘플)</li>
    <li>$a'$ — $s'$에서 <strong>실제로 선택한 다음 액션</strong> ($\\epsilon$-greedy 정책으로 뽑음)</li>
    <li>$q(s', a')$ — 그 $(s', a')$의 Q 추정값 (<u>학습 중인 테이블에서 바로 가져옴</u> = bootstrap)</li>
    <li>$\\alpha$ — 학습률</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\gamma \\, q(s', a')$ — 다음 상태·액션의 Q 추정을 한 번 할인</li>
    <li>$r + \\gamma \\, q(s', a')$ = <strong>SARSA의 타깃</strong> — "한 스텝 실제 보상 + 거기서 내 정책이 실제로 골랐을 액션의 Q". TD Target과 같은 구조인데 $V(s')$ 대신 $q(s', a')$ 사용</li>
    <li>$r + \\gamma \\, q(s', a') - q(s,a)$ — 타깃과 현재 추정의 차 (TD Error의 Q 버전)</li>
    <li>$\\alpha \\cdot (\\ldots)$ — 그 오차를 학습률만큼 당김</li>
  </ul>`,
  whole: `"<strong>$(s,a)$의 Q를, '한 스텝 실제 보상 + 다음에 실제로 고를 액션의 Q' 방향으로 $\\alpha$만큼 당긴다</strong>".<br>
  핵심은 타깃의 $a'$가 <u>실제로 취할 액션</u>이라는 점. 내가 지금 $\\epsilon$-greedy라면 타깃도 $\\epsilon$-greedy가 고르는 액션을 반영 → <strong>behavior policy와 target policy가 일치</strong> → On-Policy.`
})}

<h3>왜 이름이 SARSA?</h3>
<p>업데이트에 쓰는 데이터가 <strong>S — A — R — S' — A'</strong> 순서여서.</p>

<div style="text-align:center;margin:16px 0">
<svg viewBox="0 0 500 140" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <defs><marker id="ar-sa" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>
  <circle cx="60" cy="70" r="28" fill="none" stroke="#2563eb" stroke-width="2"/>
  <text x="60" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#2563eb">S</text>
  <line x1="88" y1="70" x2="172" y2="70" stroke="currentColor" stroke-width="2" marker-end="url(#ar-sa)"/>
  <text x="130" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#2563eb">A</text>
  <circle cx="200" cy="70" r="28" fill="none" stroke="#2563eb" stroke-width="2"/>
  <text x="200" y="75" text-anchor="middle" font-size="14" font-weight="bold" fill="#2563eb">S'</text>
  <line x1="228" y1="70" x2="312" y2="70" stroke="currentColor" stroke-width="2" marker-end="url(#ar-sa)"/>
  <text x="270" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#2563eb">A'</text>
  <circle cx="340" cy="70" r="28" fill="none" stroke="#2563eb" stroke-width="2"/>
  <text x="340" y="75" text-anchor="middle" font-size="12" fill="#2563eb">next</text>
  <text x="130" y="35" text-anchor="middle" font-size="14" fill="#b91c1c" font-weight="bold">+R</text>
  <text x="400" y="75" font-size="12" fill="#6b7280" font-style="italic">→ 업데이트</text>
</svg>
</div>

<h2>5. On-Policy vs Off-Policy</h2>

${defCard("두 정책 개념", `
<ul>
  <li><strong>Target Policy $\\pi$</strong> — 학습 대상이 되는 정책 ("학습자의 정책")</li>
  <li><strong>Behavior Policy $\\mu$</strong> — 실제 환경에서 경험 쌓는 정책 ("행위자의 정책")</li>
</ul>
<strong>On-Policy</strong>: $\\pi = \\mu$ — "Learn on the job" (직접 경험)<br>
<strong>Off-Policy</strong>: $\\pi \\neq \\mu$ — "Look over someone's shoulder" (간접 경험)
`)}

${note(`
<strong>PC방 비유 (교수님 수업 원본 — 스타크래프트):</strong> PC방에 두 사람 있음.<br>
• <strong>민준이</strong> — 직접 스타크래프트를 플레이 중. 자기 플레이를 보며 배움 → <em>On-Policy</em> (SARSA)<br>
• <strong>찬우</strong> — 민준이 어깨너머로 구경. 직접 플레이는 안 하는데 배움 → <em>Off-Policy</em> (Q-Learning)<br><br>
<strong>찬우가 어떻게 배우는가?</strong><br>
&nbsp;&nbsp;민준이: "일꾼 10마리 뽑고 병영을 지었더니 초반은 강한데 후반 지원이 부족하네…"<br>
&nbsp;&nbsp;찬우: "<u>아, 나는 일꾼 15마리 뽑고 병영을 지어야겠다</u>" — 민준이와 <em>다른 정책</em>을 세움<br>
&nbsp;&nbsp;민준이: (다음 판) "이렇게 했더니 취약하구나"<br>
&nbsp;&nbsp;찬우: "<u>나는 그렇게 안 해야겠다</u>" — 남의 경험에서 교훈만 뽑아내 내 정책 개선<br><br>
→ <strong>찬우는 민준이의 정책과 달라도 OK</strong>. 심지어 여러 명(N명의 민준이)을 동시에 관찰해서 배워도 됨 (병렬 학습). 이게 Off-Policy의 힘.
`)}

${concept("🎮 Off-Policy의 실제 활용 — 알파고 + 경험 재사용", `
  <p><strong>알파고</strong>가 Off-Policy를 어떻게 썼나 (교수님 강의자료 0414-1 녹음 인용):</p>
  <ul>
    <li><strong>1단계 — 기보 데이터로 supervised pre-training</strong>: 기보 사이트에 쌓인 <u>다른 사람들의 경험</u>(= behavior policy)으로 먼저 NN을 학습</li>
    <li><strong>2단계 — 자기 경험 쌓기</strong>: 그 후 자기 자신과 강화학습 (self-play)</li>
    <li><strong>3단계 — 병렬 자가 학습</strong>: 같은 알파고 수십~수백 개를 동시에 돌려 서로의 경험을 공유 → 학습 가속</li>
  </ul>
  <p>On-Policy(SARSA)였다면 이게 불가능 — 정책이 바뀌는 순간 이전 경험이 다 폐기돼야 하니까. Off-Policy는 <strong>경험을 저장소(buffer)에 쌓아 재사용</strong>할 수 있어 데이터 효율이 압도적으로 높음.</p>
  <p>이 아이디어가 <strong>DQN의 Experience Replay</strong>로 확장돼 Deep RL 시대를 열었어요 (기말 범위).</p>
`)}

<h3>Off-Policy의 장점</h3>
<ul>
  <li><strong>과거 경험 재활용</strong> — on-policy는 정책 바뀌면 이전 경험 폐기해야 함</li>
  <li><strong>전문가 데이터 활용</strong> — 프로 기보로 바둑 AI 학습 가능</li>
  <li><strong>병렬 학습</strong> — 1-to-N, N-to-1 학습</li>
</ul>

<h2>6. Q-Learning — TD Control, Off-Policy</h2>

${defCard("Q-Learning 업데이트", `
SARSA와 타깃만 다름:
$$\\boxed{q(s,a) \\leftarrow q(s,a) + \\alpha\\left(r + \\gamma \\, \\textcolor{#b91c1c}{\\max_{a'}} q(s',a') - q(s,a)\\right)}$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$q(s,a), r, s', \\alpha, \\gamma$ — SARSA와 동일</li>
    <li>$\\max_{a'} q(s', a')$ — $s'$에서 취할 수 있는 <strong>모든 액션 중 Q가 최대</strong>인 값 (실제로 뭘 고를지는 상관 없음)</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\gamma \\max_{a'} q(s', a')$ — 다음 상태에서 <u>가능한 최선의 Q</u>를 할인</li>
    <li>$r + \\gamma \\max_{a'} q(s', a')$ = <strong>Q-Learning의 타깃</strong> — "한 스텝 실제 보상 + 다음 상태의 <u>최고</u> Q"<br>(SARSA의 타깃에서 $q(s', a')$ → $\\max_{a'} q(s', a')$로 단 한 글자 차이)</li>
    <li>나머지 구조 (타깃 - 현재, × $\\alpha$, 더하기)는 SARSA와 동일</li>
  </ul>`,
  whole: `"<strong>$(s,a)$의 Q를, '한 스텝 실제 보상 + 다음 상태의 가능한 최대 Q' 방향으로 당긴다</strong>".<br>
  핵심 차이: 타깃이 <u>실제로 취할 액션 $a'$</u>와 무관하게 <strong>항상 최선을 가정</strong>. 즉 target policy는 순수 greedy인데, 탐험은 $\\epsilon$-greedy (behavior)로 함. 두 정책이 다름 → <strong>Off-Policy</strong>.<br>
  Bellman Optimal Eq $q_*(s,a) = \\mathbb{E}_{s'}[r + \\gamma \\max_{a'} q_*(s', a')]$에 직접 대응.`
})}

<h3>SARSA vs Q-Learning 한 줄 차이</h3>
<ul>
  <li><strong>SARSA</strong>: $r + \\gamma \\, q(s', \\textcolor{#2563eb}{a'})$ — <u>실제로 선택한</u> $a'$의 Q값</li>
  <li><strong>Q-Learning</strong>: $r + \\gamma \\, \\textcolor{#b91c1c}{\\max_{a'}} q(s', a')$ — 가능한 액션 중 <u>최대</u>의 Q값</li>
</ul>

<h2>7. 이론적 배경 — 어떤 Bellman Eq에서 유도?</h2>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0">
<div style="background:var(--bg-2);padding:16px;border-radius:6px;border:1px solid var(--border)">
<h4 style="margin-top:0;color:var(--accent)">SARSA ← Bellman Expectation Eq</h4>
$$q_\\pi(s,a) = \\mathbb{E}_\\pi[r + \\gamma q_\\pi(s',a')]$$
기댓값 안에 $\\mathbb{E}_\\pi$가 있음 → 경로도 $\\pi$ 따라야 함 → On-Policy
</div>
<div style="background:var(--bg-2);padding:16px;border-radius:6px;border:1px solid var(--border)">
<h4 style="margin-top:0;color:var(--accent)">Q-Learning ← Bellman Optimal Eq</h4>
$$q_*(s,a) = \\mathbb{E}_{s'}[r + \\gamma \\max_{a'} q_*(s',a')]$$
$\\mathbb{E}_{s'}$는 환경 전이만. 정책 $\\pi$가 식에 없음 → 어떤 정책으로 탐험해도 OK → Off-Policy
</div>
</div>

<h2>8. Behavior Policy vs Target Policy 정리</h2>

<table>
<tr><th></th><th>SARSA</th><th>Q-Learning</th></tr>
<tr><th>Behavior Policy<br>(select_action)</th><td>$Q$에 대한 $\\epsilon$-greedy</td><td>$Q$에 대한 $\\epsilon$-greedy</td></tr>
<tr><th>Target Policy<br>(update_table)</th><td>$Q$에 대한 $\\epsilon$-greedy</td><td>$Q$에 대한 순수 <strong>greedy</strong> ($\\max$)</td></tr>
<tr><th>일치 여부</th><td>O → On-policy</td><td>X → Off-policy</td></tr>
</table>

<h2>9. 🎮 Upgraded Grid World — 강의자료 예제 그대로</h2>

<p>교수님이 MC Control · SARSA · Q-Learning을 모두 시연하신 <strong>5×7 벽 있는 Grid World</strong>. <strong>S</strong>(2,0) 출발 → <strong>G</strong>(4,6) 도착, 회색은 벽(통과 불가), 매 스텝 보상 $-1$ (최단거리가 목표).</p>

${gridWorld({
  title: "Upgraded Grid World — Value Iteration으로 최적 정책 찾기",
  rows: 5, cols: 7,
  reward: -1, gamma: 0.9,
  walls: [[0,2],[1,2],[2,2], [2,4],[3,4],[4,4]],
  start: [2, 0],
  terminal: [[4, 6]],
  initialValue: 0,
  algorithm: "value-iter"
})}

${note(`
<strong>관찰 포인트:</strong><br>
① <strong>▶▶ 수렴까지</strong>를 누르면 각 셀에 화살표(optimal policy)가 나타남 — <u>벽을 피해</u> 최단 거리로 G에 도달하는 경로가 보입니다.<br>
② S(2,0)에서 G(4,6)로 가는 <strong>두 가지 우회 경로</strong>:
<ul>
  <li>위로 돌아서 col 4 위쪽(row 0~1)으로 통과</li>
  <li>아래로 돌아서 col 2 아래쪽(row 3~4)으로 통과</li>
</ul>
양쪽 모두 γ=0.9, r=-1이면 같은 길이라 최적 V값이 같아요 (알고리즘이 하나를 임의 선택).<br>
③ 벽 셀(회색)은 업데이트 안 됨. 셀 클릭 시 "벽은 통과 불가"로 표시.<br>
④ 인접 셀이 벽을 향해 가려하면 제자리 유지 (수식 클릭으로 확인).
`, "tip")}

<p>이 환경이 MC Control, SARSA, Q-Learning 모두의 <strong>공통 테스트베드</strong>였어요. 교수님 강의자료의 "학습 결과 Visualization" 슬라이드에서 세 알고리즘 모두 같은 목표(G 도달)를 향한 정책을 만들어냄을 보였습니다. 단, ε-greedy 때문에 매 실행마다 약간 다른 경로가 나올 수 있음.</p>

<h3>9-1. 같은 환경에서 SARSA 직접 돌려보기</h3>

<p>위 Value Iteration은 "MDP를 안다"고 가정한 <u>이상적 정답</u>. 여기서부턴 <strong>MDP를 모른다</strong>고 가정하고 ε-greedy로 직접 경험하며 학습 — 진짜 Model-free 상황.</p>

${gridLearn({
  title: "SARSA on Upgraded Grid (on-policy, ε-greedy + decay)",
  rows: 5, cols: 7,
  reward: -1, gamma: 0.9,
  walls: [[0,2],[1,2],[2,2], [2,4],[3,4],[4,4]],
  start: [2, 0],
  terminal: [[4, 6]],
  algorithm: "sarsa",
  alpha: 0.1,
  initialEps: 0.9,
  epsMin: 0.05,
  epsDecay: 0.002
})}

<h3>9-2. 같은 환경에서 Q-Learning 직접 돌려보기</h3>

${gridLearn({
  title: "Q-Learning on Upgraded Grid (off-policy, ε-greedy + decay)",
  rows: 5, cols: 7,
  reward: -1, gamma: 0.9,
  walls: [[0,2],[1,2],[2,2], [2,4],[3,4],[4,4]],
  start: [2, 0],
  terminal: [[4, 6]],
  algorithm: "q-learning",
  alpha: 0.1,
  initialEps: 0.9,
  epsMin: 0.05,
  epsDecay: 0.002
})}

${note(`
<strong>관찰 포인트 (두 알고리즘 나란히 돌려보세요):</strong><br>
① <strong>초반 1~5 에피소드</strong> — ε = 0.9 수준, 거의 랜덤. 긴 궤적이 사방으로 흩어짐. Q값이 아직 0에 가까움 (히트맵 약함)<br>
② <strong>100 에피소드 후</strong> — 화살표가 G를 향해 정렬되기 시작. 궤적이 짧아지고 경로 셀들의 파란색 히트맵이 진해짐<br>
③ <strong>1000 에피소드 후</strong> — ε가 0.05로 떨어지고 최적 경로가 선명해짐. SARSA vs Q-Learning이 유사한 정책에 수렴 (하지만 미세하게 다름)<br>
④ <strong>셀 클릭</strong> — 해당 상태의 Q(s, ↑↓←→) 4값을 실시간으로 확인. argmax가 화살표 방향<br>
⑤ <strong>노란 outline</strong> — 방금 진행한 에피소드의 궤적
`, "tip")}

${concept("🔬 SARSA vs Q-Learning — 왜 결과가 미묘하게 달라지나?", `
  <p>둘 다 같은 ε-greedy로 <strong>행동</strong>하지만, <strong>학습 타깃</strong>이 다릅니다:</p>
  <ul>
    <li><strong>SARSA</strong>: r + γ·Q(s', <u>a'</u>) — a'는 다음에 <em>실제로 취할</em> 액션 (ε-greedy라 가끔 랜덤)</li>
    <li><strong>Q-Learning</strong>: r + γ·<u>max</u> Q(s', a') — 다음 액션은 <em>항상 최선을 가정</em></li>
  </ul>
  <p>따라서:</p>
  <ul>
    <li>Q-Learning은 "ε 때문에 이상한 선택을 해도, target은 항상 최선" → 결과적으로 <strong>Bellman Optimal에 대응하는 Q*</strong>로 수렴. 조금 더 공격적인 경로 선택.</li>
    <li>SARSA는 "ε 때문에 실수할 가능성까지 포함한 기대값" → <strong>ε-soft policy의 Q_π</strong>로 수렴. 조금 더 안전한 경로 선호 (cliff 문제 등에서 유명한 차이).</li>
  </ul>
  <p>이 grid는 낭떠러지 같은 위험 요소가 없어서 두 결과가 거의 같지만, Cliff Walking 같은 환경에서는 SARSA가 안전한 우회로를 선택하고 Q-Learning은 최단이지만 가끔 떨어지는 경로를 학습합니다.</p>
`)}

${concept("💡 왜 Value Iteration이 더 빨랐나?", `
  <p>위 9번 Value Iteration은 6 iteration 만에 정답 수렴. SARSA/Q-Learning은 수백~수천 에피소드 필요. 왜?</p>
  <ul>
    <li>Value Iteration은 <strong>MDP 알고</strong>, 매 iteration에 <u>모든 셀 × 모든 액션</u>을 동시에 업데이트 (full sweep)</li>
    <li>Model-free는 <strong>에피소드 한 번에 한 경로</strong>만 경험. 방문한 셀만 업데이트. 경험 못 한 셀은 0으로 남음</li>
    <li>게다가 ε-greedy는 초반에 탐색(랜덤)이 많아 비효율적 경로가 대부분</li>
  </ul>
  <p>하지만 Model-free의 핵심 가치는 <u>MDP를 몰라도 된다</u>는 점 — 자율주행·바둑처럼 환경 모델 세우기 불가능한 문제에는 이게 유일한 방법이에요.</p>
`)}

<h2>10. ⚑ 시험 필수 코드 — 암기 + 빈칸 대비</h2>

<h3>9-1. QAgent 클래스 (교수님 수업 원본 구조)</h3>

${pyCode(`"""
============================================================
 QAgent Class — 교수님 수업 원본 구조  (Ch7)
============================================================
◎ 이 클래스 하나에 ε-greedy 선택, annealing, SARSA/Q-Learning
  업데이트까지 다 들어있음. 시험 빈칸 출제 단골.

◎ 시험 대비 체크포인트
   ① select_action : ε-greedy 분기 (탐색 vs 활용)
   ② anneal_eps    : ε 감소 방법 + 하한
   ③ update_sarsa  : target에 Q(s', a')   — a'는 실제 취할 액션
   ④ update_qlearn : target에 max Q(s',·) — 실제 선택과 무관
============================================================
"""
import numpy as np
import random

class QAgent:
    def __init__(self):
        # Q 테이블: 상태 (x, y)마다 액션 4개의 Q값 → 3차원 배열
        # 수업 예제 환경이 5x7 grid이므로 shape = (5, 7, 4)
        # 모두 0으로 초기화 (관례)
        self.q_table = np.zeros((5, 7, 4))
        self.eps   = 0.9                        # 초기 ε: 탐색 비율 (90%)
        self.alpha = 0.01                       # 학습률

    # ------------------------------------------------------------
    # ε-greedy 액션 선택 — 탐색(Exploration) vs 활용(Exploitation)
    # ------------------------------------------------------------
    def select_action(self, s):
        """
        ε 확률로 무작위 (탐색), 1-ε 확률로 greedy (활용).
        → local minimum에 빠지지 않게 탐험 기회 보장.
        """
        x, y = s
        coin = random.random()                  # [0, 1) 난수 한 번 뽑기
        if coin < self.eps:
            # === 탐색 ===
            # 현재 Q 테이블과 무관하게 4가지 중 하나 무작위
            # → 가본 적 없는 액션도 가끔 시도 → state 공간 전체 탐색 보장
            action = random.randint(0, 3)
        else:
            # === 활용 ===
            # 이 상태에서 Q값이 가장 큰 액션 선택 (greedy)
            action_val = self.q_table[x, y, :]  # shape (4,) 벡터
            action = np.argmax(action_val)
        return action

    # ------------------------------------------------------------
    # ε annealing (= ε decaying) — 학습이 진행될수록 탐색 비율 감소
    # ------------------------------------------------------------
    def anneal_eps(self):
        """
        에피소드 하나 끝날 때마다 호출.
        초기에는 많이 탐색 (ε 크게), 후반에는 exploitation 집중 (ε 작게).
        완전히 0으로 만들면 다시 찾을 수 없을 때 탐색 불가 → 하한 유지.
        """
        self.eps -= 0.03                        # 매 에피소드마다 0.03씩 감소
        self.eps = max(self.eps, 0.1)           # 하한 0.1 (완전 탐색 중단 방지)

    # ------------------------------------------------------------
    # SARSA 업데이트 — On-policy TD Control
    # ------------------------------------------------------------
    def update_sarsa(self, transition):
        """
        transition = (s, a, r, s')
          - s, a  : 현재 상태와 실제 취한 액션
          - r     : 받은 보상
          - s'    : 다음 상태

        SARSA 타깃: r + γ·Q(s', a')  ← a'도 지금 정책(ε-greedy)으로 뽑음
        → behavior policy = target policy → On-Policy
        """
        s, a, r, s_prime = transition
        x, y       = s
        nx, ny     = s_prime
        a_prime    = self.select_action(s_prime)   # 🔑 다음에 실제로 취할 액션 (ε-greedy)

        # Q(s,a) ← Q(s,a) + α·[ r + Q(s', a') - Q(s,a) ]
        # ※ 이 코드에선 γ가 생략돼 있음 (암묵적 γ=1). 실전에선 γ*Q(...) 필요.
        self.q_table[x, y, a] = self.q_table[x, y, a] + self.alpha * (
            r + self.q_table[nx, ny, a_prime] - self.q_table[x, y, a])

    # ------------------------------------------------------------
    # Q-Learning 업데이트 — Off-policy TD Control
    # ------------------------------------------------------------
    def update_qlearn(self, transition):
        """
        transition = (s, a, r, s')   ← a'가 없다! 필요 없음.

        Q-Learning 타깃: r + γ·max_a' Q(s', a')
        → 다음 액션을 '항상 최선'이라 가정하고 target 구성
        → 실제 취한 액션(behavior)과 무관 → Off-Policy
        """
        s, a, r, s_prime = transition
        x, y   = s
        nx, ny = s_prime

        # Q(s,a) ← Q(s,a) + α·[ r + max_a' Q(s', a') - Q(s,a) ]
        # np.amax(self.q_table[nx, ny, :]) = 다음 상태의 4개 Q값 중 최대
        self.q_table[x, y, a] = self.q_table[x, y, a] + self.alpha * (
            r + np.amax(self.q_table[nx, ny, :]) - self.q_table[x, y, a])

# ============================================================
# ⚑ 시험 빈칸 단골 포인트
# ============================================================
# 1) random.randint(0, 3)          ← ε-greedy의 '탐색' 부분
# 2) np.argmax(action_val)         ← ε-greedy의 '활용' 부분
# 3) max(self.eps, 0.1)            ← ε 하한 (decaying)
# 4) self.select_action(s_prime)   ← SARSA target의 a'
# 5) np.amax(self.q_table[nx,ny,:]) ← Q-Learning target의 max`, { title: "QAgent — 수업 원본 구조" })}

<h3>빈칸 출제 예상 포인트</h3>
<ul>
  <li><code>random.randint(0, 3)</code> — 탐색(exploration) 부분</li>
  <li><code>np.argmax(action_val)</code> — 활용(exploitation) greedy</li>
  <li><code>max(self.eps, 0.1)</code> — $\\epsilon$ 하한 (decaying 방식)</li>
  <li><code>self.select_action(s_prime)</code> (SARSA) vs <code>np.amax(self.q_table[nx, ny, :])</code> (Q-Learning) — 타깃의 결정적 차이</li>
</ul>

<h3>9-2. MC Control — 전체 실행 가능 코드 (4×4 Grid World)</h3>

${pyCode(`"""
============================================================
 MC Control — On-policy, ε-greedy + decaying  (Ch7)
============================================================
◎ 구조: Simplified Policy Iteration
   (1) Shallow Policy Evaluation : 에피소드 하나로 q 업데이트
   (2) Policy Improvement        : 업데이트된 q + ε-greedy

◎ Ch4 DP Control을 Model-free로 바꾼 3가지 변경
   - v 대신 q(s,a) 사용 — 전이확률 모르므로 argmax_a v로 못 고름
   - 정책 평가에 Bellman Eq 대신 MC 샘플 평균 사용
   - Greedy 대신 ε-greedy — exploration 보장

◎ 업데이트 식
   Q(s,a) ← Q(s,a) + α · (G_t - Q(s,a))
   ※ G_t는 에피소드 전체를 끝까지 돌려서 얻은 실제 return

◎ 왜 terminal 필요? → G_t가 에피소드 종료에 의존.
============================================================
"""
import numpy as np, random

ROWS, COLS = 4, 4
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]   # ↑ ↓ ← →
SYM        = ['↑', '↓', '←', '→']

class GridWorld:
    """환경 클래스 — Agent는 step()으로만 상호작용 (Model-free)."""
    def reset(self):
        self.s = (0, 0); return self.s
    def step(self, a_idx):
        r, c = self.s
        dr, dc = ACTIONS[a_idx]
        nr, nc = r + dr, c + dc
        if not (0 <= nr < ROWS and 0 <= nc < COLS):
            nr, nc = r, c          # 벽 → 제자리
        self.s = (nr, nc)
        return self.s, -1, self.s in TERMINAL

def mc_control(n_episodes=20000, alpha=0.01, gamma=1.0):
    """
    n_episodes : 에피소드 수
    alpha      : 학습률 (fixed step size → running mean)
    gamma      : 감쇄 인자
    """
    # Q 테이블: (r, c, a) 축. Model-free Control은 항상 Q를 씀.
    Q   = np.zeros((ROWS, COLS, 4))
    eps = 0.9                                     # 초기 ε
    env = GridWorld()

    for ep in range(n_episodes):
        # ========== ① 에피소드 생성 (ε-greedy로) ==========
        s = env.reset()
        history = []                              # (s, a, r) 기록
        done = False
        while not done:
            # ---- ε-greedy 액션 선택 ----
            if random.random() < eps:
                a = random.randint(0, 3)          # 탐색: 무작위
            else:
                a = int(np.argmax(Q[s[0], s[1], :]))   # 활용: greedy
            # ----------------------------

            s_next, r, done = env.step(a)
            history.append((s, a, r))             # (현재 상태, 취한 액션, 받은 보상)
            s = s_next

        # ========== ② Backward로 G_t 누적 + Q 업데이트 ==========
        # G_t = r_{t+1} + γ·G_{t+1} 관계로 역방향 누적이 O(T)로 가능
        G = 0
        for (s, a, r) in reversed(history):
            G = r + gamma * G
            # 🔑 MC Control 업데이트:
            #   Q(s,a) ← Q(s,a) + α · (G_t - Q(s,a))
            Q[s[0], s[1], a] += alpha * (G - Q[s[0], s[1], a])

        # ========== ③ ε annealing (decaying) ==========
        # 20000 에피소드 동안 0.9 → 약 0.3까지 감소, 최소 0.1 유지
        eps = max(eps - 3e-5, 0.1)

    return Q

# =============== 실행 ===============
Q = mc_control()

# --- 정책 추출: π*(s) = argmax_a Q(s,a) ---
pi = np.full((ROWS, COLS), '·', dtype=object)
for r in range(ROWS):
    for c in range(COLS):
        if (r, c) in TERMINAL:
            pi[r, c] = 'T'
            continue
        pi[r, c] = SYM[int(np.argmax(Q[r, c, :]))]

print("MC Control π*:")
print(pi)
# 기대 결과: 모든 셀이 terminal 쪽으로 향하는 화살표`, { title: "MC Control (On-policy, ε-greedy)" })}

<h3>9-3. SARSA — 전체 실행 가능 코드</h3>

${pyCode(`"""
============================================================
 SARSA — On-policy TD Control  (Ch7)
============================================================
◎ 이름의 유래
   업데이트에 필요한 데이터 순서 = S → A → R → S' → A'
   → S A R S A → "SARSA"

◎ 업데이트 식
   Q(s,a) ← Q(s,a) + α · ( r + γ·Q(s', a') - Q(s,a) )
                            └──────────┘
                            TD target (a'는 실제 취할 액션)

◎ MC Control과의 차이
   - MC : 에피소드 끝난 뒤 G_t로 업데이트 (한 번에 여러 Q)
   - SARSA : 한 스텝마다 즉시 업데이트 (target이 한 스텝 추정)
   → Non-terminating MDP에서도 OK, 더 빠른 학습

◎ 왜 On-Policy?
   target의 a'를 "지금 내 정책(ε-greedy)이 실제로 뽑는 액션"으로 씀
   → 학습하는 정책 = 경험을 만드는 정책 → On-Policy
   → 유도: Bellman Expectation Eq  q_π(s,a) = E_π[ r + γ·q_π(s',a') ]
============================================================
"""
import numpy as np, random

ROWS, COLS = 4, 4
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]
SYM        = ['↑', '↓', '←', '→']

class GridWorld:
    def reset(self):
        self.s = (0, 0); return self.s
    def step(self, a_idx):
        r, c = self.s
        dr, dc = ACTIONS[a_idx]
        nr, nc = r + dr, c + dc
        if not (0 <= nr < ROWS and 0 <= nc < COLS):
            nr, nc = r, c
        self.s = (nr, nc)
        return self.s, -1, self.s in TERMINAL

def eps_greedy(Q, s, eps):
    """ε-greedy 액션 선택 — 세 알고리즘(MC/SARSA/Q) 공통 헬퍼."""
    if random.random() < eps:
        return random.randint(0, 3)              # 탐색
    return int(np.argmax(Q[s[0], s[1], :]))      # 활용

def sarsa(n_episodes=20000, alpha=0.1, gamma=1.0):
    Q   = np.zeros((ROWS, COLS, 4))
    eps = 0.9
    env = GridWorld()

    for ep in range(n_episodes):
        s = env.reset()
        # 🔑 SARSA는 첫 액션을 에피소드 시작 전에 미리 뽑음
        #    (MC/Q-Learning은 while 루프 내부에서 그때그때 뽑음)
        a = eps_greedy(Q, s, eps)
        done = False

        while not done:
            # 1) 액션 실행 → 다음 상태·보상 관찰
            s_next, r, done = env.step(a)

            # 2) 다음 액션도 정책(ε-greedy)으로 선택 ⚑ SARSA 핵심
            #    이 a_next가 update의 target에 그대로 들어감
            a_next = eps_greedy(Q, s_next, eps)

            # 3) SARSA 업데이트 식
            #    Q(s,a) ← Q(s,a) + α·(r + γ·Q(s', a') - Q(s,a))
            #    terminal이면 s_next에서 Q(s_next, a_next)는 사실상 무의미
            #    (Q 테이블에 terminal 셀도 0으로 유지되므로 수식상 문제 없음)
            Q[s[0], s[1], a] += alpha * (
                r + gamma * Q[s_next[0], s_next[1], a_next] - Q[s[0], s[1], a])

            # 4) 다음 스텝으로: (s, a) ← (s', a')
            #    ⚑ a도 함께 넘어간다는 점이 Q-Learning과 다름
            s, a = s_next, a_next

        eps = max(eps - 3e-5, 0.1)               # annealing

    return Q

# =============== 실행 ===============
Q = sarsa()
pi = np.full((ROWS, COLS), '·', dtype=object)
for r in range(ROWS):
    for c in range(COLS):
        pi[r, c] = 'T' if (r, c) in TERMINAL else SYM[int(np.argmax(Q[r, c, :]))]
print("SARSA π*:")
print(pi)`, { title: "SARSA (On-policy TD Control)" })}

<h3>9-4. Q-Learning — 전체 실행 가능 코드</h3>

${pyCode(`"""
============================================================
 Q-Learning — Off-policy TD Control  (Ch7)
============================================================
◎ 업데이트 식
   Q(s,a) ← Q(s,a) + α · ( r + γ · max_a' Q(s', a') - Q(s,a) )
                                └──────────────┘
                                 target (항상 최선을 가정)

◎ SARSA와의 핵심 차이 한 줄
   SARSA    : target에 Q(s', a')        ← a' = ε-greedy가 '실제' 뽑을 액션
   Q-Learn  : target에 max_a' Q(s', a') ← 실제 선택과 무관, '최선' 가정

◎ 왜 Off-Policy?
   - Behavior policy(경험 생성) : ε-greedy
   - Target policy (학습 대상)  : 순수 greedy (max)
   → 두 정책이 다르므로 "Off-Policy"
   → 유도: Bellman Optimal Eq  q_*(s,a) = E_s'[r + γ·max_a' q_*(s',a')]

◎ Off-Policy의 실용적 장점
   ① 과거 경험 재사용 가능 (replay buffer) → DQN의 기반
   ② 전문가 데이터 활용 (AlphaGo의 기보)
   ③ 병렬로 수집한 경험 결합
============================================================
"""
import numpy as np, random

ROWS, COLS = 4, 4
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]
SYM        = ['↑', '↓', '←', '→']

class GridWorld:
    def reset(self):
        self.s = (0, 0); return self.s
    def step(self, a_idx):
        r, c = self.s
        dr, dc = ACTIONS[a_idx]
        nr, nc = r + dr, c + dc
        if not (0 <= nr < ROWS and 0 <= nc < COLS):
            nr, nc = r, c
        self.s = (nr, nc)
        return self.s, -1, self.s in TERMINAL

def eps_greedy(Q, s, eps):
    if random.random() < eps:
        return random.randint(0, 3)
    return int(np.argmax(Q[s[0], s[1], :]))

def q_learning(n_episodes=20000, alpha=0.1, gamma=1.0):
    Q   = np.zeros((ROWS, COLS, 4))
    eps = 0.9
    env = GridWorld()

    for ep in range(n_episodes):
        s = env.reset()
        done = False

        while not done:
            # 1) 액션 선택: ε-greedy (behavior policy)
            #    SARSA와 다르게 '에피소드 시작 전 미리 뽑는' 단계가 없다
            a = eps_greedy(Q, s, eps)

            # 2) 환경에서 한 스텝 실행
            s_next, r, done = env.step(a)

            # 3) Q-Learning 업데이트
            #    target에 np.max() 사용 ⚑ SARSA와의 결정적 차이
            #    "다음 상태에서 가능한 4개 액션 중 Q가 가장 큰 것"을 target에 씀
            #    → 실제로 다음 step에서 뭘 뽑을지는 상관 없음 (off-policy)
            Q[s[0], s[1], a] += alpha * (
                r + gamma * np.max(Q[s_next[0], s_next[1], :]) - Q[s[0], s[1], a])

            # 4) 다음 스텝: s만 넘김 (a는 다음 iteration에서 새로 뽑음)
            #    ⚑ SARSA는 (s, a)를 같이 넘기지만 Q-Learning은 s만
            s = s_next

        eps = max(eps - 3e-5, 0.1)

    return Q

# =============== 실행 ===============
Q = q_learning()
pi = np.full((ROWS, COLS), '·', dtype=object)
for r in range(ROWS):
    for c in range(COLS):
        pi[r, c] = 'T' if (r, c) in TERMINAL else SYM[int(np.argmax(Q[r, c, :]))]
print("Q-Learning π*:")
print(pi)
# ⚑ SARSA와 비교해보면:
#   - 단순한 grid (벽 없음)에서는 거의 같은 정책에 수렴
#   - Cliff Walking 같은 "위험한 shortcut이 있는 환경"에서는
#     Q-Learning이 더 공격적(최단)으로, SARSA가 더 보수적(안전)으로 학습`, { title: "Q-Learning (Off-policy TD Control)" })}

${note(`
<strong>세 코드의 구조적 차이를 한 줄로 외우기</strong>:<br>
• <strong>MC Control</strong>: 에피소드 끝까지 굴린 후 backward로 $G_t$ 누적, Q 업데이트<br>
• <strong>SARSA</strong>: 한 스텝마다 <code>a_next = eps_greedy(Q, s_next, eps)</code>로 <u>실제 다음 액션</u>을 뽑아 target 구성<br>
• <strong>Q-Learning</strong>: 한 스텝마다 <code>np.max(Q[s_next, :])</code>로 <u>가능한 최대 Q</u>를 target에 사용 — <u>실제 선택과 무관</u>
`, "tip")}

<h2>11. 퀴즈 — 개념 확인</h2>

${mcQuiz(
  "DP Control을 Model-free에 직접 못 쓰는 <u>두 가지 이유</u>는?",
  [
    "① 상태 공간이 너무 큼 ② 메모리 부족",
    "① 2단계 Bellman Eq 계산에 $r_s^a, P_{ss'}^a$ 필요 ② $v$만 알면 greedy 액션 선택 불가",
    "① Markov Property 위반 ② 에피소드가 종료 안 됨",
    "① $\\gamma$가 1이라서 ② 학습률 $\\alpha$ 결정 불가"
  ],
  1,
  "정확히 두 이유. ① Evaluation: 환경 파라미터 unknown이라 2단계 식 못 씀. ② Improvement: $v$만 있으면 greedy 못 함 (전이확률 필요). 그래서 MC/TD + $q$ + $\\epsilon$-greedy 조합 등장."
)}

${mcQuiz(
  "SARSA가 On-Policy인 이유로 가장 정확한 것은?",
  [
    "학습률 $\\alpha$가 고정이라서",
    "업데이트 타깃 $Q(s', a')$의 $a'$를 <strong>현재 정책</strong>($\\epsilon$-greedy)으로 뽑기 때문",
    "Bellman Optimal Eq를 쓰기 때문",
    "$\\epsilon$-greedy 대신 greedy 쓰기 때문"
  ],
  1,
  "SARSA는 target에 '실제로 취할' $a'$의 Q를 씀 → behavior = target policy. Q-Learning은 $\\max_{a'}$라 <u>현재 정책과 무관</u> (off-policy)."
)}

${mcQuiz(
  "$\\epsilon$-greedy의 <u>decaying(annealing)</u>이 필요한 이유는?",
  [
    "계산 속도를 위해",
    "에피소드 길이 단축",
    "초반엔 탐색 많이, 학습되면 exploitation에 집중하려고",
    "Markov property 유지"
  ],
  2,
  "초기엔 환경 정보 없음 → 다양하게 탐색. 충분히 학습되면 → 최선 선택에 집중. $\\epsilon$을 줄이면 이 전환이 자연스럽게 일어남."
)}

${mcQuiz(
  "SARSA와 Q-Learning의 업데이트식 <u>타깃</u>의 차이는?",
  [
    "SARSA: $r + \\gamma q(s', a')$ / Q-Learning: $r + \\gamma \\max_{a'} q(s', a')$",
    "SARSA: $\\max$ / Q-Learning: 기댓값",
    "SARSA는 off-policy / Q-Learning은 on-policy",
    "두 알고리즘은 동일"
  ],
  0,
  "SARSA는 실제로 취할 $a'$(ε-greedy 결과), Q-Learning은 가능한 $a'$ 중 <strong>최대 Q</strong>. 이 한 글자 차이가 on/off-policy를 가름."
)}

${mcQuiz(
  "Model-free Control에서 $v$ 대신 $q$를 쓰는 이유는?",
  [
    "메모리를 덜 써서",
    "계산이 빨라서",
    "$q$를 알면 <strong>전이확률 몰라도</strong> $\\arg\\max_a q(s,a)$로 바로 greedy 가능",
    "Markov property 때문"
  ],
  2,
  "$v$만 알면 '어느 액션이 어느 상태로 갈지'에 전이확률이 필요. $q(s,a)$는 액션 자체의 가치를 직접 주므로 확률 몰라도 비교 가능."
)}

${mcQuiz(
  "Off-Policy 학습의 <u>장점이 아닌</u> 것은?",
  [
    "과거 경험을 재활용할 수 있다",
    "전문가의 기존 데이터로 학습할 수 있다",
    "동시에 여러 정책 학습이 가능하다",
    "<strong>항상 on-policy보다 수렴이 빠르다</strong>"
  ],
  3,
  "수렴 속도는 문제 따라. Off-policy는 데이터 효율성·재활용·병렬성 장점이지만, on-policy보다 항상 빠르진 않음. Q-Learning은 함수 근사에서 발산 가능성도 있음."
)}

<h2>12. 이 장 요약 + 중간고사 준비 완료</h2>

${note(`
<strong>✓ Ch 7에서 가져가야 할 것:</strong><br>
① DP Control 못 쓰는 2가지 이유 ② 해결책 3가지 ($q$, MC/TD, $\\epsilon$-greedy) ③ $\\epsilon$-greedy와 decaying 의미 ④ MC Control 절차 ⑤ SARSA 업데이트식 ⑥ On-Policy vs Off-Policy 정의 ⑦ Q-Learning 업데이트식 ⑧ SARSA/Q-Learning이 각각 어떤 Bellman Eq에서 유도되는지 ⑨ $\\epsilon$-greedy 코드 구조.
`, "tip")}

${note(`
<strong>🎯 Ch 1~7을 한 장으로 통합:</strong><br>
Ch1 (왜 RL?) → Ch2 (MDP로 정의) → Ch3 (Bellman 재귀) → Ch4 (MDP 알 때: DP) → Ch5 (MC) → Ch6 (TD) → Ch7 (Control).<br>
이 흐름 그대로 머릿속에 그릴 수 있어야 시험에 자신감 있게 임할 수 있어요.<br><br>
<strong>📝 모의고사로 점검하세요</strong>: 객관식(Ex1)으로 개념 빈틈 찾고, 서술형(Ex2)으로 실제 답안 작성 연습.
`, "tip")}
`);
