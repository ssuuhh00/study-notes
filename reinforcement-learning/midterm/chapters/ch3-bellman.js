registerPage("ch3-bellman", "Ch 3. Bellman Equation", () => `
<h1>Ch 3 — Bellman Equation</h1>
<p class="lead">${term("value-function", "가치함수")}의 <strong>재귀 관계</strong>. "지금의 가치 = 지금 보상 + $\\gamma$ × 다음 상태 가치". 이 재귀가 앞으로 나올 <u>모든</u> RL 알고리즘의 뿌리.</p>

${note(`
<strong>📖 Ch 2 복습:</strong> $v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t = s]$를 정의했지만, 무한합 $G_t$의 기댓값을 직접 계산할 순 없어요. <u>다음 상태 가치</u>로 표현하는 재귀식을 세우면 계산 가능해집니다. 그게 ${term("bellman-expectation", "Bellman")}.
`, "tip")}

${prereq("📔 이 장 용어 빠른 참조", `
  ${term("bellman-expectation")} · ${term("bellman-optimal")} · ${term("bellman-decomp")} · ${term("value-function")} · ${term("q-function")} · ${term("policy")} · ${term("return")} · ${term("mdp")} · ${term("markov-property")}
`)}

${note(`
<strong>⚑ 시험 포인트 (0407 강의 명시):</strong> "<em>식도 이해해야 되고 식이 왜 이렇게 나왔는지 설명할 수 있어야 된다</em>". 0→1→2단계 유도 과정을 손으로 쓸 수 있어야 합니다.
`, "warn")}

<h2>1. 0단계 — 현재 가치와 다음 가치 관계</h2>

${defCard("Bellman Expectation Equation (0단계)", `
$$\\boxed{v_\\pi(s_t) = \\mathbb{E}_\\pi[r_{t+1} + \\gamma v_\\pi(s_{t+1})]}$$
$$q_\\pi(s_t, a_t) = \\mathbb{E}_\\pi[r_{t+1} + \\gamma q_\\pi(s_{t+1}, a_{t+1})]$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$v_\\pi(s_t)$ — <strong>현재</strong>($t$시점) 상태의 가치 (우리가 구하고 싶은 것)</li>
    <li>$r_{t+1}$ — 한 스텝 앞으로 가면 받는 <strong>즉시 보상</strong> (확률변수: 매번 다를 수 있음)</li>
    <li>$v_\\pi(s_{t+1})$ — 한 스텝 뒤 도착한 상태의 가치 (확률변수: $s_{t+1}$이 어디로 갈지 모름)</li>
    <li>$\\gamma$ — 감쇄 인자. "한 스텝 미래는 이만큼 할인"</li>
    <li>$\\mathbb{E}_\\pi[\\cdot]$ — 정책 $\\pi$ 아래에서의 기댓값. 정책과 환경 둘 다 확률적이니 평균 필요</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\gamma \\, v_\\pi(s_{t+1})$ — 다음 상태 가치를 <strong>한 번 할인</strong>한 값</li>
    <li>$r_{t+1} + \\gamma \\, v_\\pi(s_{t+1})$ — "<u>한 스텝 걸어보고 얻은 즉시 보상</u> + <u>거기서부터 받을 (할인된) 미래 가치</u>". 이것 자체가 <strong>$s_t$에서 출발한 한 번의 시뮬레이션 리턴</strong>의 축약형</li>
    <li>$\\mathbb{E}_\\pi[r_{t+1} + \\gamma v_\\pi(s_{t+1})]$ — 한 스텝 시뮬레이션을 <strong>수없이 반복해서 평균</strong>낸 값</li>
  </ul>`,
  whole: `"<strong>현재 가치 = (한 스텝 앞으로 갔을 때의 즉시 보상 + 할인된 다음 상태 가치)의 평균</strong>"<br><br>
  핵심 아이디어: $G_t$(무한 합)를 풀어 쓸 필요 없이, <u>바로 다음 상태의 $v_\\pi$</u>만 알면 현재 $v_\\pi$를 구할 수 있다는 <strong>재귀 관계</strong>. 이 재귀 때문에 반복 계산(다음 장 DP)이 가능해짐.`
})}

<h3>📐 유도 Walkthrough — $v_\\pi$ 0단계 식</h3>

${walkthrough("$v_\\pi(s) = \\mathbb{E}_\\pi[r_{t+1} + \\gamma v_\\pi(s_{t+1})]$ 유도", [
  {
    title: "출발점 — $v_\\pi$의 정의",
    body: `Ch 2에서 정의한 대로:
    $$v_\\pi(s_t) = \\mathbb{E}_\\pi[G_t \\mid S_t = s_t]$$
    기댓값 안의 $G_t$를 풀어 쓸 수 있는 형태로 바꾸는 게 목표.`
  },
  {
    title: "Return의 정의 대입",
    body: `$G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$ 이었으니:
    $$v_\\pi(s_t) = \\mathbb{E}_\\pi[R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots]$$`
  },
  {
    title: "$\\gamma$ 뽑아내기 — 괄호로 묶기",
    body: `$\\gamma$가 두 번째 항부터 들어가므로 하나 묶어낼 수 있음:
    $$v_\\pi(s_t) = \\mathbb{E}_\\pi[R_{t+1} + \\gamma(R_{t+2} + \\gamma R_{t+3} + \\cdots)]$$
    괄호 안의 것은 $t+1$ 시점에서 본 Return. 즉 $G_{t+1}$.`
  },
  {
    title: "$G_{t+1}$로 치환",
    body: `$$v_\\pi(s_t) = \\mathbb{E}_\\pi[R_{t+1} + \\gamma G_{t+1}]$$
    이제 $G_{t+1}$을 다시 value function으로 바꿀 수 있다.`
  },
  {
    title: "결론 — 재귀 형태 완성",
    body: `Value function 정의에 의해 $v_\\pi(s_{t+1}) = \\mathbb{E}_\\pi[G_{t+1} \\mid S_{t+1}]$이므로:
    $$\\boxed{v_\\pi(s_t) = \\mathbb{E}_\\pi[R_{t+1} + \\gamma v_\\pi(s_{t+1})]}$$
    <strong>이게 Bellman Expectation Equation 0단계</strong>. "현재 가치"를 "보상 + 감쇄된 다음 가치"로 재귀적으로 표현.`
  }
])}

<h3>🚨 주의 — 기댓값 $\\mathbb{E}$는 왜 꼭 있어야 하나?</h3>

${note(`
<strong>자주 틀리는 포인트:</strong><br>
$v_\\pi(s_t) = r_{t+1} + \\gamma v_\\pi(s_{t+1})$ (기댓값 빼고) ← <strong>틀린 식!</strong><br><br>

$s_t$에서 $s_{t+1}$로 가기까지 <u>두 번의 확률 과정</u>이 끼어들어요:
<ol>
  <li><strong>정책의 동전</strong>: $\\pi(a|s)$ — 어떤 액션을 뽑을까? (확률적)</li>
  <li><strong>환경의 동전</strong>: $P_{ss'}^a$ — 어떤 다음 상태로 갈까? (확률적)</li>
</ol>
그래서 <strong>$s_{t+1}$은 확률변수</strong>, 따라서 $r_{t+1}$과 $v_\\pi(s_{t+1})$도 확률변수. 대표값을 쓰려면 $\\mathbb{E}$가 <u>반드시</u> 필요합니다.
`, "warn")}

<div style="text-align:center;margin:16px 0">
<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <defs>
    <marker id="ar-e" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <circle cx="60" cy="110" r="28" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="60" y="116" text-anchor="middle" font-size="14" font-weight="bold">$s_t$</text>
  <text x="60" y="165" text-anchor="middle" font-size="10" fill="#2563eb">정책 동전 π</text>

  <circle cx="230" cy="60" r="6" fill="currentColor"/>
  <circle cx="230" cy="160" r="6" fill="currentColor"/>
  <line x1="85" y1="100" x2="215" y2="65" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-e)"/>
  <line x1="85" y1="120" x2="215" y2="155" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-e)"/>
  <text x="150" y="70" font-size="11">$a_1$ (60%)</text>
  <text x="150" y="150" font-size="11">$a_2$ (40%)</text>

  <text x="290" y="15" text-anchor="middle" font-size="10" fill="#b45309">환경 동전 P</text>
  <line x1="240" y1="55" x2="360" y2="35" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-e)"/>
  <line x1="240" y1="65" x2="360" y2="85" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-e)"/>
  <line x1="240" y1="155" x2="360" y2="135" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-e)"/>
  <line x1="240" y1="165" x2="360" y2="185" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-e)"/>
  <text x="290" y="40" font-size="10">70%</text>
  <text x="290" y="80" font-size="10">30%</text>
  <text x="290" y="130" font-size="10">50%</text>
  <text x="290" y="180" font-size="10">50%</text>

  <circle cx="390" cy="30" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="390" y="35" text-anchor="middle" font-size="12">$s_1$</text>
  <circle cx="390" cy="90" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="390" y="95" text-anchor="middle" font-size="12">$s_2$</text>
  <circle cx="390" cy="130" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="390" y="135" text-anchor="middle" font-size="12">$s_3$</text>
  <circle cx="390" cy="190" r="22" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <text x="390" y="195" text-anchor="middle" font-size="12">$s_4$</text>

  <text x="490" y="110" text-anchor="middle" font-size="13" fill="#6b7280" font-style="italic">동전 2번 ⇒ $s_{t+1}$은 확률변수</text>
  <text x="490" y="130" text-anchor="middle" font-size="13" fill="#6b7280" font-style="italic">∴ 기댓값 $\\mathbb{E}$ 필요</text>
</svg>
</div>

<h2>2. 1단계 — $v$ ↔ $q$ 관계</h2>

<h3>① $q$로부터 $v$ 계산</h3>

$$\\boxed{v_\\pi(s) = \\sum_{a \\in A} \\pi(a|s) \\, q_\\pi(s,a)}$$

${breakdown({
  symbols: `<ul>
    <li>$v_\\pi(s)$ — $s$의 상태 가치 (구하려는 값)</li>
    <li>$a \\in A$ — $s$에서 가능한 <strong>모든 액션</strong>에 대해 차례로 훑음</li>
    <li>$\\pi(a|s)$ — 정책이 상태 $s$에서 액션 $a$를 선택할 <strong>확률</strong> (0~1 사이)</li>
    <li>$q_\\pi(s,a)$ — 그 액션 $a$를 골랐을 때의 가치 (첫 액션 고정, 이후 $\\pi$)</li>
    <li>$\\sum$ — 모든 액션에 대한 합</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\pi(a|s) \\, q_\\pi(s,a)$ — "이 액션을 고를 확률 × 이 액션의 가치" = <strong>이 액션이 $v$에 기여하는 정도</strong></li>
    <li>$\\sum_a \\pi(a|s) \\, q_\\pi(s,a)$ — 모든 액션의 기여도를 더함 = <strong>정책 $\\pi$가 만들어내는 $q$의 기댓값</strong> (확률 $\\pi$로 가중평균한 값)</li>
  </ul>`,
  whole: `"상태 $s$의 가치 = <strong>$s$에서 가능한 모든 액션의 $q$값을, 그 액션을 뽑을 확률로 가중평균</strong>한 것"<br><br>
  직관: 내가 $s$에 있을 때, $\\pi$는 확률적으로 액션을 뽑아줌. 그러니 $v$는 가능한 결과들의 평균이 되어야 함.<br>
  <em>예:</em> $\\pi(a_1|s)=0.6, \\pi(a_2|s)=0.4$이고 $q(s,a_1)=1, q(s,a_2)=2$이면 $v_\\pi(s) = 0.6 \\times 1 + 0.4 \\times 2 = 1.4$.`
})}

<h3>② $v$로부터 $q$ 계산</h3>

$$\\boxed{q_\\pi(s,a) = r_s^a + \\gamma \\sum_{s' \\in S} P_{ss'}^a \\, v_\\pi(s')}$$

${breakdown({
  symbols: `<ul>
    <li>$q_\\pi(s,a)$ — "$s$에서 $a$를 한 번 하고 이후 $\\pi$"의 가치 (구하려는 값)</li>
    <li>$r_s^a$ — $s$에서 $a$를 하면 <strong>즉시 받는</strong> 기대 보상 (환경이 정함)</li>
    <li>$P_{ss'}^a$ — $s$에서 $a$를 한 뒤 $s'$로 갈 <strong>전이 확률</strong> (환경이 정함)</li>
    <li>$v_\\pi(s')$ — 도착한 $s'$의 가치 (재귀: 이미 정의된 값을 씀)</li>
    <li>$\\gamma$ — 감쇄 인자 (한 스텝 미래 가치 할인)</li>
  </ul>`,
  combinations: `<ul>
    <li>$P_{ss'}^a \\, v_\\pi(s')$ — "그 $s'$로 갈 확률 × 그 $s'$의 가치" = <strong>이 $s'$가 미래 가치에 기여하는 정도</strong></li>
    <li>$\\sum_{s'} P_{ss'}^a \\, v_\\pi(s')$ — 가능한 모든 다음 상태에 대해 합 = <strong>다음 상태 가치의 기댓값</strong> (환경이 확률적이니 평균 필요)</li>
    <li>$\\gamma \\sum_{s'} P_{ss'}^a \\, v_\\pi(s')$ — 그 기댓값을 한 번 할인 = <strong>할인된 미래 가치의 기댓값</strong></li>
    <li>$r_s^a + \\gamma \\sum_{s'} P_{ss'}^a \\, v_\\pi(s')$ — 즉시 보상 + 할인된 미래 기댓값</li>
  </ul>`,
  whole: `"$(s,a)$의 가치 = <strong>즉시 보상</strong> + <strong>감쇄된 다음 상태 가치 기댓값</strong>"<br><br>
  직관: 액션 $a$를 하면 (1) 바로 보상 $r_s^a$를 받고 (2) 환경이 확률적으로 $s'$ 중 하나로 보냄. 그 $s'$의 가치를 전이확률로 가중평균한 뒤 할인해서 합침.<br>
  <em>예:</em> $r_s^a=0.5, \\gamma=1$, 70%로 $v(s_1)=1.5$, 30%로 $v(s_2)=-1$로 가면:<br>
  $q(s,a) = 0.5 + 1 \\cdot (0.7 \\times 1.5 + 0.3 \\times (-1)) = 0.5 + 1.05 - 0.3 = 1.25$.`
})}

<h2>3. 2단계 — 두 식 합치기 (대입)</h2>

${walkthrough("2단계 식 유도 (1단계 두 식을 합치기)", [
  {
    title: "1단계 두 식 나란히",
    body: `① $v_\\pi(s) = \\sum_a \\pi(a|s) q_\\pi(s,a)$<br>
    ② $q_\\pi(s,a) = r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s')$`
  },
  {
    title: "① 식의 $q_\\pi(s,a)$ 자리에 ② 식 통째로 대입",
    body: `$$v_\\pi(s) = \\sum_a \\pi(a|s) \\underbrace{\\left( r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s') \\right)}_{= q_\\pi(s,a)}$$
    → <strong>2단계 $v_\\pi$ 식</strong>이 나옴:
    $$\\boxed{v_\\pi(s) = \\sum_a \\pi(a|s) \\left( r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s') \\right)}$$
    <br><strong>이 식을 읽는 법:</strong>
    <ul>
      <li>안쪽 괄호 $r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s')$는 <u>액션 $a$의 가치</u>($q$)</li>
      <li>바깥 $\\sum_a \\pi(a|s)$는 그 $q$를 <u>액션 선택 확률로 가중평균</u></li>
      <li>즉 "모든 액션에 대해 (액션 선택확률 × 그 액션이 가져올 즉시보상·미래가치)를 더함"</li>
    </ul>
    <strong>$\\mathbb{E}$ 기호 없이도 계산 가능한 형태</strong>가 됨. 단, $r_s^a, P_{ss'}^a$를 알아야 함.`
  },
  {
    title: "반대로 ② 식에 ① 식 대입",
    body: `② 식의 $v_\\pi(s')$ 자리에 ① 식 (아래첨자만 $s \\to s'$)을 넣으면:
    $$\\boxed{q_\\pi(s,a) = r_s^a + \\gamma \\sum_{s'} P_{ss'}^a \\sum_{a'} \\pi(a'|s') q_\\pi(s', a')}$$
    이게 2단계 $q_\\pi$ 식.`
  },
  {
    title: "왜 2단계 식이 중요한가?",
    body: `<strong>2단계 식의 모든 항이 "환경의 파라미터"로만 표현됨</strong>. 구체적으로:<br>
    • $\\pi(a|s)$ — Agent의 정책 (우리가 안다)<br>
    • $r_s^a, P_{ss'}^a$ — <u>환경의 정의</u> (이게 있으면 "MDP를 안다"고 함)<br>
    • $v_\\pi(s')$ — 다음 상태 가치<br><br>
    즉 환경을 알면 <strong>기댓값을 뽑지 않고도 직접 계산 가능</strong>. 이게 다음 장(DP)의 핵심.`
  }
])}

<h2>4. 0단계 vs 2단계 — ${term("dp", "Model-based")}와 ${term("model-free", "Model-free")}의 갈림길</h2>

${note(`
<strong>💡 결정적 인사이트:</strong><br>
<ul>
  <li><strong>0단계</strong> — 기댓값 $\\mathbb{E}$로 간결하게 표현. 계산하려면 분포를 알아야 하거나, <u>샘플로 근사</u>해야 함.</li>
  <li><strong>2단계</strong> — $\\mathbb{E}$를 $\\sum_a \\pi(a|s) \\sum_{s'} P_{ss'}^a$로 풀어 씀. <u>$r_s^a, P_{ss'}^a$를 알아야만 계산 가능</u>.</li>
</ul>
이게 바로 다음의 분기점:
`, "tip")}

<table>
<tr><th></th><th>Model-based (Planning, Ch 4)</th><th>Model-free (Experience, Ch 5~7)</th></tr>
<tr><th>상황</th><td>$r_s^a, P_{ss'}^a$ 아는 경우 (= MDP 안다)</td><td>$r_s^a, P_{ss'}^a$ 모름</td></tr>
<tr><th>방법</th><td>실제 환경 상호작용 불필요. 머릿속 계산만으로.</td><td>환경에서 직접 경험(샘플)해야 학습 가능</td></tr>
<tr><th>사용하는 식</th><td><strong>2단계</strong> Bellman Eq로 iterative 계산</td><td><strong>0단계</strong> Bellman Eq + 샘플 평균</td></tr>
<tr><th>알고리즘</th><td>Iterative Policy Eval, Policy/Value Iteration</td><td>MC, TD, SARSA, Q-Learning</td></tr>
</table>

<h2>5. Bellman Optimal Equation — 최적용</h2>

${defCard("Optimal Value & Policy", `
모든 정책 중 가장 좋은 $\\pi_*$가 만들어내는 가치:
$$v_*(s) = \\max_\\pi v_\\pi(s), \\quad q_*(s,a) = \\max_\\pi q_\\pi(s,a)$$
<strong>정리</strong>: 어떤 MDP든 $\\pi_* \\geq \\pi$ (모든 $\\pi$에 대해)를 만족하는 최적 정책이 <u>반드시 존재</u>한다.
`)}

<h3>0단계</h3>
$$v_*(s) = \\max_a \\mathbb{E}[r + \\gamma v_*(s') \\mid s_t = s, a_t = a]$$
$$q_*(s,a) = \\mathbb{E}_{s'}\\left[r + \\gamma \\max_{a'} q_*(s', a')\\right]$$

${breakdown({
  symbols: `<ul>
    <li>$v_*(s), q_*(s,a)$ — <strong>최적</strong> 가치 함수 (별표 *). 어떤 정책도 이보다 높은 가치를 낼 수 없음</li>
    <li>$\\max_a$ — "가능한 액션 중 <strong>가장 좋은 것 하나를 선택</strong>" (이게 Expectation Eq과의 결정적 차이)</li>
    <li>$\\mathbb{E}_{s'}[\\cdot]$ — 환경 전이의 기댓값 ($q_*$에서만 사용 — $\\pi$에 의존 안 함)</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\max_a \\mathbb{E}[\\ldots]$ (상단 식) — 각 액션마다 "한 스텝 결과의 기댓값"을 구해놓고, <strong>그중 최댓값을 고름</strong></li>
    <li>$r + \\gamma \\max_{a'} q_*(s', a')$ — 한 스텝 앞의 $s'$에서도 <strong>최선의 $a'$를 고를 것</strong>이라 가정. 그 최고 $q$를 타깃으로 씀</li>
  </ul>`,
  whole: `"최적 정책을 따라갈 때의 가치 = 매 상태마다 <strong>최고의 액션을 고른 뒤</strong> 그 결과의 기댓값". Expectation Eq의 $\\sum_a \\pi(a|s)$가 $\\max_a$로 바뀐 것이 핵심. 이 식이 Ch 7의 <strong>Q-Learning</strong>의 이론적 근거.`
})}

<h3>1단계</h3>
$$v_*(s) = \\max_a q_*(s,a)$$
$$q_*(s,a) = r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_*(s')$$

${breakdown({
  symbols: `<ul>
    <li>$\\max_a q_*(s,a)$ — $s$에서 가능한 모든 액션의 최적 Q값 중 <strong>최댓값</strong></li>
    <li>$r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_*(s')$ — Expectation 1단계 ②와 구조 동일. 차이는 $v$ 자리에 $v_*$(최적값)이 들어감</li>
  </ul>`,
  combinations: `<ul>
    <li>$v_*(s) = \\max_a q_*(s,a)$ — "최적 상태 가치 = 최적 액션의 Q 최댓값". 이게 Expectation Eq의 $v_\\pi(s) = \\sum \\pi(a|s) q_\\pi(s,a)$와 완전히 대조 (가중평균 → max)</li>
    <li>$q_*(s,a)$ 식의 모양은 Expectation과 같지만 뒤에 나오는 $v_*(s')$가 "이후로도 최선을 다한다"를 내포</li>
  </ul>`,
  whole: `"최적 상태 가치 = 최고 액션의 가치" + "최적 액션 가치 = 즉시 보상 + 감쇄된 다음 상태 최적 가치 기댓값". 두 식이 서로 맞물려 $v_*$와 $q_*$를 재귀 정의.`
})}

<h3>2단계</h3>
$$v_*(s) = \\max_a \\left[ r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_*(s') \\right]$$
$$q_*(s,a) = r_s^a + \\gamma \\sum_{s'} P_{ss'}^a \\max_{a'} q_*(s', a')$$

${breakdown({
  symbols: `<ul>
    <li>바깥의 $\\max_a$ — 현재 상태에서 최고 액션 선택</li>
    <li>대괄호 안 $r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_*(s')$ — 그 액션을 했을 때 얻을 (즉시 보상 + 감쇄된 다음 상태 최적 가치 기댓값)</li>
    <li>$q_*$ 식의 $\\max_{a'}$ — 다음 상태에서도 최고 액션 선택 (재귀)</li>
  </ul>`,
  combinations: `<ul>
    <li>각 액션 $a$에 대해 대괄호 안 값을 계산 → $q_*(s,a)$ 후보값</li>
    <li>그 중 최댓값 = $v_*(s)$. <strong>"만약 $a$를 골랐다면 얼마나 좋았을까?"를 모든 $a$에 대해 계산해본 뒤 최고를 채택</strong></li>
  </ul>`,
  whole: `"최적 가치 = <strong>각 액션 후보의 (즉시보상 + 감쇄된 미래 최적가치 기댓값)을 계산한 뒤, 그 중 최댓값을 채택</strong>"<br>
  이 식이 Ch 4 <strong>Value Iteration</strong>의 업데이트 규칙.`
})}

<h2>6. Expectation vs Optimal — 핵심 차이</h2>

${note(`
<strong>단 하나의 차이</strong>: Expectation Eq에서 $\\sum_a \\pi(a|s)$ (정책에 따른 가중 평균) 자리에 <strong>$\\max_a$ (최고 액션 선택)</strong>이 들어갑니다.<br><br>
• <em>Expectation</em>: "정책 $\\pi$ 따라갈 때의 가치" (평균)<br>
• <em>Optimal</em>: "가장 좋은 액션만 고를 때의 가치" (최대)<br><br>
이 차이가 나중에 SARSA (Expectation Eq) vs Q-Learning (Optimal Eq)의 학습식 차이로 이어집니다.
`, "tip")}

<h2>7. 퀴즈 — 유도 확인</h2>

${mcQuiz(
  "Bellman Expectation Equation 0단계에서 기댓값 $\\mathbb{E}$가 반드시 필요한 이유는?",
  [
    "수식이 예뻐 보이게 하려고",
    "$s_{t+1}$이 정책과 전이확률 두 확률과정을 거치는 확률변수이기 때문",
    "보상 $r$이 항상 스칼라라서",
    "감쇄 인자 $\\gamma$ 때문"
  ],
  1,
  "정책의 동전 $\\pi(a|s)$와 환경의 동전 $P_{ss'}^a$ 두 확률이 순차적으로 작용하므로 $s_{t+1}$은 확률변수. 따라서 $r_{t+1}$과 $v(s_{t+1})$도 확률변수. 기댓값 빼고 쓰면 <strong>틀린 식</strong>입니다."
)}

${mcQuiz(
  "$\\pi(a_1|s) = 0.5, \\pi(a_2|s) = 0.5$, $q(s,a_1) = 4, q(s,a_2) = -2$일 때 $v_\\pi(s)$는?",
  [
    "4 (최댓값)",
    "$-2$ (최솟값)",
    "2",
    "1"
  ],
  3,
  "1단계 ① 공식: $v_\\pi(s) = \\sum \\pi(a|s) q(s,a) = 0.5(4) + 0.5(-2) = 1$. $\\max$가 아닌 가중평균이에요. 최적이면 $v_* = \\max = 4$지만, 여기는 <strong>Expectation Eq</strong>."
)}

${mcQuiz(
  "$r_s^a = 2, \\gamma = 0.9$. 액션 $a$ 후 60%로 $s_1$($v(s_1) = 10$), 40%로 $s_2$($v(s_2) = 0$)에 도착. $q_\\pi(s,a)$는?",
  [
    "$2 + 0.9 \\times 6 = 7.4$",
    "$2 + 0.9 \\times 10 = 11$",
    "$2 \\times 0.6 + 10 = 11.2$",
    "$0.9 \\times (0.6 \\times 10 + 0.4 \\times 0) = 5.4$"
  ],
  0,
  "1단계 ② 공식: $q = r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v(s') = 2 + 0.9 \\cdot (0.6 \\cdot 10 + 0.4 \\cdot 0) = 2 + 0.9 \\cdot 6 = 2 + 5.4 = 7.4$"
)}

${mcQuiz(
  "Bellman Expectation Eq와 Bellman Optimal Eq의 <u>가장 큰 차이</u>는?",
  [
    "$\\gamma$를 쓰냐 안 쓰냐",
    "$\\sum_a \\pi(a|s)$ 대신 $\\max_a$가 들어감",
    "상태 집합 $\\mathcal{S}$가 다름",
    "액션 집합 $\\mathcal{A}$가 다름"
  ],
  1,
  "Expectation은 '정책 따라 가중 평균', Optimal은 '최고 액션만 선택'. 이 차이가 나중에 SARSA(Expectation Eq 기반)와 Q-Learning(Optimal Eq 기반)의 학습식 차이로 연결됩니다."
)}

${mcQuiz(
  "2단계 Bellman Expectation Eq $v_\\pi(s) = \\sum_a \\pi(a|s)(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s'))$를 <u>계산</u>하려면 무엇을 알아야 하나?",
  [
    "정책 $\\pi$만",
    "정책 $\\pi$와 환경 파라미터 $r_s^a, P_{ss'}^a$",
    "아무 것도 몰라도 됨",
    "에피소드 전체 궤적"
  ],
  1,
  "2단계 식을 계산하려면 $\\pi$(Agent 소유)와 <strong>환경 파라미터 $r_s^a, P_{ss'}^a$</strong>가 필요. 후자를 아는 경우를 'MDP를 안다'라 부르고, 이 가정이 Ch 4 DP의 전제입니다. 모르면 Ch 5~7의 Model-free."
)}

<h2>8. 이 장 요약 + 다음 장 예고</h2>

${note(`
<strong>✓ Ch 3에서 가져가야 할 것:</strong><br>
① 0단계 유도 과정 (4~5줄) ② 1단계 ①, ② 두 식과 의미 ③ 2단계 = 1단계 대입 ④ <u>$\\mathbb{E}$가 꼭 필요한 이유</u> ⑤ Expectation vs Optimal ($\\sum_a \\pi \\to \\max_a$) ⑥ Model-based vs Model-free 분기점.
`, "tip")}

${note(`
<strong>📖 Ch 4 예고:</strong> Bellman 2단계 식을 <u>반복</u> 적용하면 MDP를 풀 수 있어요. 이 반복 계산을 <strong>Dynamic Programming</strong>이라 하고, 구체적으로 <em>Iterative Policy Evaluation</em>(prediction)과 <em>Policy/Value Iteration</em>(control)이 나옵니다. Grid World 예제를 단계별로 풀어볼 거예요.
`)}
`);
