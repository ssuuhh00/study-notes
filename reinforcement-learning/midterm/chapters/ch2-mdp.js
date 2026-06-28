registerPage("ch2-mdp", "Ch 2. MDP", () => `
<h1>Ch 2 — 문제 정의 (MDP)</h1>
<p class="lead">지난 장의 "환경/상태/보상"을 수식으로 적는 틀. ${term("mp", "MP")} → ${term("mrp", "MRP")} → ${term("mdp", "MDP")}로 한 층씩 쌓아 올립니다.</p>

${note(`
<strong>📖 Ch 1 복습:</strong> ${term("agent-env", "Agent가 Environment")}와 루프를 돌면서 누적 보상을 최대화하는 행동을 배운다 — 이게 RL. 이번 장에서 이 문장을 <u>수학으로 옮깁니다</u>.
`, "tip")}

${prereq("📔 이 장 용어 빠른 참조 — 클릭해서 설명 보기", `
  ${term("markov-property")} · ${term("mp")} · ${term("mrp")} · ${term("mdp")} · ${term("policy")} · ${term("return")} · ${term("gamma")} · ${term("value-function")} · ${term("q-function")} · ${term("prediction-vs-control")}
`)}

${note(`
<strong>⚑ 교수님 중간 정리 (2장):</strong> "<em>문제가 있을 때 MDP를 정의해봐라. S, A, P, R, γ의 집합을 정의할 수 있어야 함. MDP state transition graph 그림을 주고 개념을 물어볼 수 있음 (응용 문제).</em>"<br>
→ 이 장의 최우선 시험 출제 포인트. 특히 ⑤번 섹션(Policy) 이후의 예제와 Grid World를 꼭 돌려보세요.
`, "warn")}

<h2>1. Markov Property (마코프 성질)</h2>

${defCard("Markov Property", `
상태 $S_t$가 <strong>마코프 성질</strong>을 가진다:
$$\\boxed{\\mathbb{P}[S_{t+1} \\mid S_t] = \\mathbb{P}[S_{t+1} \\mid S_1, S_2, \\ldots, S_t]}$$
말로: "<strong>미래는 오직 현재 상태에만 의존한다</strong>" (memoryless)
`)}

${note(`
<strong>직관 — 바둑판</strong>: 지금 반상 위의 돌 배치만 알면, 이 돌들이 <em>어떤 순서로 놓였는지</em> 몰라도 다음 최선의 수를 결정할 수 있어요. 이게 마코프 성질. 과거 히스토리가 필요 없음.
`)}

${note(`
<strong>⚑ 시험 포인트:</strong> "Markov Property를 수식으로 쓰고 한 문장으로 의미를 설명하라" 같은 서술형이 충분히 가능. 0414-1 강의에서 "머릿속에 그림이 딱 그려져야 돼"라고 강조한 개념 중 하나.
`, "warn")}

<h2>2. Markov Process (MP) — 확률적 상태 전이만</h2>

${defCard("Markov Process (= Markov Chain)", `
$$\\text{MP} = \\langle \\mathcal{S}, \\mathcal{P} \\rangle$$
<ul>
  <li>$\\mathcal{S}$ : 상태 집합 (유한)</li>
  <li>$\\mathcal{P}$ : 상태 전이 확률 행렬, $P_{ss'} = \\mathbb{P}[S_{t+1}=s' \\mid S_t=s]$</li>
</ul>
각 행의 합은 1 (한 상태에서 어디로든 반드시 가야 하므로).
`)}

<h3>예제: 아이 잠들기 MP</h3>

<div style="text-align:center;margin:16px 0">
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <defs>
    <marker id="ar-mp" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <circle cx="80" cy="140" r="36" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="80" y="137" text-anchor="middle" font-size="12" font-weight="bold">S0</text>
  <text x="80" y="153" text-anchor="middle" font-size="10">누움</text>
  <circle cx="190" cy="55" r="36" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="190" y="52" text-anchor="middle" font-size="12" font-weight="bold">S1</text>
  <text x="190" y="68" text-anchor="middle" font-size="10">일어남</text>
  <circle cx="290" cy="140" r="36" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="290" y="137" text-anchor="middle" font-size="12" font-weight="bold">S2</text>
  <text x="290" y="153" text-anchor="middle" font-size="10">눈감음</text>
  <circle cx="430" cy="140" r="36" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="430" y="137" text-anchor="middle" font-size="12" font-weight="bold">S3</text>
  <text x="430" y="153" text-anchor="middle" font-size="10">잠이옴</text>
  <circle cx="570" cy="140" r="36" fill="none" stroke="#b91c1c" stroke-width="3"/>
  <text x="570" y="137" text-anchor="middle" font-size="12" font-weight="bold">S4</text>
  <text x="570" y="153" text-anchor="middle" font-size="10">잠듦</text>

  <path d="M 160 55 Q 190 20 220 55" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="190" y="18" text-anchor="middle" font-size="11">90%</text>

  <line x1="100" y1="115" x2="175" y2="80" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="120" y="95" font-size="11">10%</text>
  <line x1="175" y1="80" x2="100" y2="115" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="155" y="110" font-size="11">40%</text>

  <line x1="116" y1="140" x2="254" y2="140" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="185" y="135" text-anchor="middle" font-size="11">60%</text>

  <line x1="326" y1="140" x2="394" y2="140" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="360" y="135" text-anchor="middle" font-size="11">70%</text>

  <line x1="466" y1="140" x2="534" y2="140" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="500" y="135" text-anchor="middle" font-size="11">100%</text>

  <path d="M 310 110 Q 440 25 555 113" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-mp)"/>
  <text x="430" y="55" text-anchor="middle" font-size="11">30%</text>
</svg>
</div>

<p>전이 행렬 형태:</p>
<table style="font-size:0.9rem">
<tr><th></th><th>S0</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th></tr>
<tr><th>S0</th><td></td><td>0.4</td><td>0.6</td><td></td><td></td></tr>
<tr><th>S1</th><td>0.1</td><td>0.9</td><td></td><td></td><td></td></tr>
<tr><th>S2</th><td></td><td></td><td></td><td>0.7</td><td>0.3</td></tr>
<tr><th>S3</th><td></td><td></td><td></td><td></td><td>1.0</td></tr>
<tr><th>S4</th><td></td><td></td><td></td><td></td><td>1.0</td></tr>
</table>
<p style="font-size:0.85rem;color:var(--text-dim)">빈칸 = 0. 각 행 합은 1.</p>

<h2>3. Markov Reward Process (MRP) — 보상 추가</h2>

${defCard("MRP", `
$$\\text{MRP} = \\langle \\mathcal{S}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle$$
신규 원소:
<ul>
  <li>$\\mathcal{R}$ — 보상 함수: $\\mathcal{R}_s = \\mathbb{E}[R_{t+1} \\mid S_t = s]$</li>
  <li>$\\gamma \\in [0,1]$ — 감쇄 인자 (discount factor)</li>
</ul>
`)}

${concept("🍼 구체 예제 — 아기 잠들기 MRP의 완전한 정의 (교수님 강의자료 수치)", `
  <p>위 MP에 <strong>보상</strong>과 <strong>감쇄</strong>를 붙여 MRP로 만든 실제 예:</p>

  <h4>상태별 보상 (어떤 상태에 <u>도착</u>하면 받는 기대 보상)</h4>
  <table>
    <tr><th>상태</th><th>설명</th><th>보상 $\\mathcal{R}_s$</th><th>직관</th></tr>
    <tr><td>$S_0$</td><td>누움</td><td>$-1$</td><td>가만히 누워있는 상태, 아이 입장에서 조금 답답</td></tr>
    <tr><td>$S_1$</td><td>일어남</td><td>$+1$</td><td>일어나 노는 상태 — 당장 즐거움</td></tr>
    <tr><td>$S_2$</td><td>눈감음</td><td>$-1$</td><td>눈 감은 상태 — 아직 답답</td></tr>
    <tr><td>$S_3$</td><td>잠이옴</td><td>$0$</td><td>서서히 잠이 오는 상태 — 중립</td></tr>
    <tr><td>$S_4$</td><td>잠듦</td><td>$+10$</td><td>잠든 상태 (최종 목표) — 큰 보상</td></tr>
  </table>

  <h4>전이 확률 행렬 $\\mathcal{P}$</h4>
  <p>위 MP 섹션의 표와 동일 (아래 요약):</p>
  <ul>
    <li>$S_0 \\to S_1$: 0.4,  $S_0 \\to S_2$: 0.6</li>
    <li>$S_1 \\to S_0$: 0.1,  $S_1 \\to S_1$: 0.9</li>
    <li>$S_2 \\to S_3$: 0.7,  $S_2 \\to S_4$: 0.3</li>
    <li>$S_3 \\to S_4$: 1.0  (다음 스텝 확실히 잠듦)</li>
    <li>$S_4 \\to S_4$: 1.0  (terminal, 자기 자신 유지)</li>
  </ul>

  <h4>감쇄 $\\gamma$</h4>
  <p>$\\gamma = 0.9$로 가정 (강의자료 설정). γ < 1이므로 먼 미래의 $+10$ 보상이 현재 가치에 할인되어 반영됨.</p>

  <h4>💡 이 데이터로 무엇을 계산할 수 있나?</h4>
  <p>상태 가치 $v(s) = \\mathbb{E}[G_t | S_t = s]$를 구할 수 있어요. 여러 궤적을 시뮬레이션해 리턴 평균을 내거나 (→ Ch 5 MC), Bellman 식으로 직접 풀 수 있음 (→ Ch 3~4).</p>
  <p>아래 collapse 박스(에피소드별 Return 계산)에서 실제 수치로 확인해보세요.</p>
`)}

<h3>Return $G_t$ — 진짜 최대화할 대상</h3>

<p>강화학습이 최대화하는 건 한 번의 보상이 아니라 <strong>감쇄 누적 보상 (return)</strong>:</p>

$$G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}$$

${breakdown({
  symbols: `<ul>
    <li>$G_t$ — 시점 $t$에서 출발해서 받게 될 <strong>리턴(return)</strong>의 기호</li>
    <li>$R_{t+1}$ — 시점 $t+1$에 받는 <em>한 순간</em>의 보상 (첫 보상)</li>
    <li>$R_{t+2}, R_{t+3}, \\ldots$ — 그 뒤로 차례차례 받는 보상들</li>
    <li>$\\gamma$ — 감쇄 인자(discount factor), 0에서 1 사이 값</li>
    <li>$\\gamma^k$ — $\\gamma$를 $k$번 곱함. $k$가 커질수록 점점 작아져 (0 &lt; $\\gamma$ &lt; 1일 때)</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\gamma R_{t+2}$ — 2번째 보상에 $\\gamma$가 한 번 곱해짐 → "한 스텝 미뤄지면 이만큼 깎아줘"</li>
    <li>$\\gamma^2 R_{t+3}$ — 3번째 보상은 $\\gamma$ 두 번 곱함 → "두 스텝 미뤄진 만큼 더 깎아줘"</li>
    <li>$\\gamma^k R_{t+k+1}$ — $k$스텝 뒤의 보상은 $\\gamma^k$배 할인. <strong>멀어질수록 지수적으로 가치 하락</strong></li>
    <li>$\\sum_{k=0}^{\\infty}$ — 처음부터 끝까지 할인된 보상을 전부 더함</li>
  </ul>`,
  whole: `"시점 $t$부터 무한한 미래까지 받을 <strong>모든 보상을 <em>미래일수록 더 할인</em>해서 합친 값</strong>". Agent가 진짜로 최대화하고 싶은 것은 $R_{t+1}$ 하나가 아니라 이 $G_t$ 전체. 쉽게 말해 "당장 1원 받는 게 나중에 1원 받는 것보다 더 값지다"를 수식화한 것.`
})}

${note(`
<strong>왜 $\\gamma$ (감쇄)를 쓰나?</strong><br>
① <strong>수학적 편의</strong> — 순환 MDP에서 무한 리턴 방지. 에피소드 종료 시에는 $\\gamma=1$도 가능<br>
② <strong>인간의 선호</strong> — 지금 보상이 나중 보상보다 값짐 (이자율 개념)<br>
③ <strong>미래의 불확실성</strong> — 먼 미래는 확실치 않으니 덜 반영<br><br>
• $\\gamma \\approx 0$ → <em>근시적(myopic)</em>, 눈앞만 봄<br>
• $\\gamma \\approx 1$ → <em>원시적(far-sighted)</em>, 먼 미래까지 고려
`)}

<h3>Value Function $v(s)$</h3>

$$\\boxed{v(s) = \\mathbb{E}[G_t \\mid S_t = s]}$$

${breakdown({
  symbols: `<ul>
    <li>$v(s)$ — 상태 $s$의 <strong>가치(value)</strong>. 결과로 나오는 하나의 숫자</li>
    <li>$G_t$ — 위에서 정의한 리턴 (할인된 누적 보상)</li>
    <li>$S_t = s$ — "지금 $t$시점에 우리는 상태 $s$에 있다"는 조건</li>
    <li>$\\mathbb{E}[\\cdot]$ — <strong>기댓값</strong>. 여러 번 실행해서 얻을 $G_t$들의 평균 (한 번 실행은 매번 달라지니까)</li>
    <li>$\\mathbb{E}[\\,\\cdot \\mid \\cdot\\,]$ — 조건부 기댓값. "조건을 만족할 때의" 평균</li>
  </ul>`,
  combinations: `<ul>
    <li>$G_t \\mid S_t = s$ — "$s$에서 출발했다고 가정했을 때의" 리턴 하나 (확률변수)</li>
    <li>$\\mathbb{E}[G_t \\mid S_t=s]$ — 그 리턴을 <strong>수없이 많이 시뮬레이션해서 평균</strong>을 낸 값. 매 실행마다 궤적이 달라서 $G_t$ 값도 다르니까 평균을 취함</li>
  </ul>`,
  whole: `"상태 $s$에서 출발했을 때 <strong>평균적으로 얻게 될 총 할인 보상</strong>". 이 숫자 하나로 "이 상태에 있는 게 얼마나 좋은가"를 나타냄.<br>예) 아기재우기에서 $v(\\text{잠듦}) = 0$(끝났으니 더 받을 보상 없음), $v(\\text{누움}) \\approx 4.5$(평균적으로 잠들기까지 얻을 할인 보상).`
})}

${collapse("예제: 아이재우기 에피소드별 Return 계산 ($\\gamma = 0.9$)", `
보상 설정: 누움(-1), 일어남(+1), 눈감음(-1), 잠이옴(0), 잠듦(+10)<br>
<table>
<tr><th>에피소드</th><th>궤적</th><th>Return 계산</th></tr>
<tr><td>1</td><td>누움→일어남→누움→눈감음→잠이옴→잠듦</td><td>$-1 + 1(0.9) - 1(0.9^2) - 1(0.9^3) + 0(0.9^4) + 10(0.9^5) \\approx 4.3$</td></tr>
<tr><td>2</td><td>누움→일어남→일어남→누움→눈감음→잠이옴→잠듦</td><td>$\\approx 4.6$</td></tr>
<tr><td>3</td><td>누움→눈감음→잠듦</td><td>$-1 - 1(0.9) + 10(0.9^2) = 6.2$</td></tr>
<tr><td>4</td><td>누움→눈감음→잠이옴→잠듦</td><td>$-1 - 1(0.9) + 0 + 10(0.9^3) \\approx 5.4$</td></tr>
</table>
<strong>같은 출발 상태라도 궤적에 따라 Return이 다릅니다.</strong> 그래서 $v(s)$를 <em>기댓값</em>으로 정의하는 거예요.
`)}

<h2>4. Markov Decision Process (MDP) — 액션 추가</h2>

${defCard("MDP — 이번 학기의 주인공", `
$$\\text{MDP} = \\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle$$
<ul>
  <li>$\\mathcal{S}$ : 상태 집합</li>
  <li>$\\mathcal{A}$ : <strong>행동 집합</strong> ← MRP에서 추가됨</li>
  <li>$\\mathcal{P}_{ss'}^a = \\mathbb{P}[S_{t+1}=s' \\mid S_t=s, A_t=a]$ — 이제 <u>액션에 따라</u> 전이 다름</li>
  <li>$\\mathcal{R}_s^a = \\mathbb{E}[R_{t+1} \\mid S_t=s, A_t=a]$ — 이제 <u>액션에 따른</u> 보상</li>
  <li>$\\gamma$ : 감쇄 인자</li>
</ul>
`)}

${note(`
<strong>MP → MRP → MDP 흐름 한 줄 정리</strong><br>
• MP: 환경의 확률적 상태 전이만 있음<br>
• MRP: MP + 보상 + $\\gamma$ — "환경이 보상까지 줌"<br>
• MDP: MRP + 행동 — "Agent가 행동으로 전이·보상에 영향"<br>
→ 이제 "정책 $\\pi$를 어떻게 설정할까?"가 풀어야 할 문제.
`, "tip")}

<h3>아기 재우기 MDP 예제</h3>
<p>같은 아이 재우기 문제에 액션 추가:</p>
<ul>
  <li>$\\mathcal{A} = \\{a_0, a_1\\}$ — $a_0$: 자장가 불러줌, $a_1$: 같이 놀아줌</li>
  <li>같은 상태 $s$에서도 어떤 액션을 고르냐에 따라 다음 상태·보상이 달라짐</li>
  <li>예: $P_{s_2, s_0}^{a_1} = 0.3, P_{s_2, s_1}^{a_1} = 0.7$ (눈감은 상태에서 놀아주면 다시 일어나거나 누운 상태로)</li>
</ul>

<h2>5. Policy $\\pi$ — Agent의 행동 규칙</h2>

${defCard("Policy", `
$$\\pi(a \\mid s) = \\mathbb{P}[A_t = a \\mid S_t = s]$$
"상태 $s$에서 행동 $a$를 할 확률"
<ul>
  <li><strong>결정적(Deterministic)</strong>: $\\pi(s) = a$ — 항상 같은 액션</li>
  <li><strong>확률적(Stochastic)</strong>: $\\pi(a|s)$ — 확률분포</li>
</ul>
MDP에서 정책은 <em>현재 상태에만</em> 의존하고(히스토리 X), <em>시간에 무관(stationary)</em>합니다.
`)}

${note(`
<strong>주의:</strong> 정책 $\\pi$는 MDP 튜플 $\\langle S, A, P, R, \\gamma \\rangle$의 <u>구성요소가 아닙니다</u>. MDP는 환경, $\\pi$는 그 위에서 Agent가 선택하는 행동 규칙이에요.
`, "warn")}

<h2>6. $v_\\pi(s)$ vs $q_\\pi(s,a)$ — 시험 단골</h2>

${defCard("두 가치 함수", `
<strong>상태 가치 함수</strong>:
$$v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t = s]$$
<strong>액션 가치 함수 (= Q-function)</strong>:
$$q_\\pi(s,a) = \\mathbb{E}_\\pi[G_t \\mid S_t = s, A_t = a]$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$v_\\pi(s)$, $q_\\pi(s,a)$ — 결과값. 아래첨자 $\\pi$가 붙은 이유는 "어떤 정책 $\\pi$를 따를 때"의 가치이기 때문. 정책이 다르면 값도 다름</li>
    <li>$\\mathbb{E}_\\pi[\\cdot]$ — 정책 $\\pi$ 아래에서의 기댓값. "$\\pi$가 뽑아주는 대로 액션하며 시뮬레이션한 결과들의 평균"</li>
    <li>$S_t = s$ — "지금 $s$에 있다"는 조건 (공통)</li>
    <li>$A_t = a$ — "지금 $s$에서 액션 $a$를 한다"는 <strong>추가 조건</strong> ($q$에만 있음)</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\mathbb{E}_\\pi[G_t \\mid S_t=s]$ — "$s$에 있을 때, <strong>정책 $\\pi$가 첫 액션을 뽑고</strong> 그 뒤로도 $\\pi$대로 행동하며 끝까지 갔을 때의 리턴 평균"</li>
    <li>$\\mathbb{E}_\\pi[G_t \\mid S_t=s, A_t=a]$ — "$s$에 있을 때, <strong>첫 액션을 외부에서 $a$로 강제 지정</strong>하고, 그 뒤로는 $\\pi$대로 행동하며 끝까지 갔을 때의 리턴 평균"</li>
  </ul>`,
  whole: `두 식의 <strong>결정적 차이는 "첫 액션을 누가 정하는가"</strong>뿐.<br>
  • $v$ — $\\pi$가 정함 (정책이 알아서)<br>
  • $q$ — 외부에서 $a$로 고정 (해보고 싶은 액션을 특정)<br>
  둘 다 <u>첫 액션 이후엔 $\\pi$를 따라</u>가며 리턴을 계산함. 그래서 $q(s,a)$는 "이 상태에서 이 액션을 골랐을 때의 가치"를 직접 평가할 수 있음.`
})}

${note(`
<strong>왜 $q$가 중요한가?</strong> — 나중에 Ch 7에서 나오지만, MDP를 모를 때 <u>$v$만 가지고는 최적 액션을 고를 수 없어요</u> (전이확률 모르니까). 반면 $q(s,a)$를 알면 $\\arg\\max_a q(s,a)$로 바로 최적 액션 선택 가능. 그래서 Model-free 알고리즘은 대부분 $q$를 학습합니다.
`, "tip")}

<h2>7. Prediction vs Control — 두 가지 과제</h2>

${defCard("강화학습이 푸는 두 문제", `
<strong>Prediction (정책 평가)</strong>: 정책 $\\pi$가 주어졌을 때 $v_\\pi(s)$를 <u>구하라</u>.<br>
<strong>Control (최적 정책)</strong>: 가장 좋은 정책 $\\pi_*$를 <u>찾아라</u>.
`)}

${note(`
<strong>이 분류가 왜 중요한가?</strong><br>
앞으로 배울 모든 알고리즘이 이 둘 중 하나로 분류됩니다:<br>
• <em>Prediction</em>: Iterative Policy Evaluation (DP), MC Prediction, TD Prediction<br>
• <em>Control</em>: Policy Iteration, Value Iteration (DP), MC Control, SARSA, Q-Learning<br><br>
시험 문제에서 "이 알고리즘이 푸는 문제는?"을 묻는다면 이 분류로 답하세요.
`, "tip")}

<h2>8. Grid World — 이후 모든 장에서 쓸 예제</h2>

${note(`
<strong>중요:</strong> Grid World는 Ch4 DP, Ch5 MC, Ch6 TD에서 <u>똑같은 예제</u>로 계속 등장합니다. 여기서 확실히 감 잡아두세요.
`, "tip")}

<p>4×4 격자에서 '출발'에서 '종료'까지 가는 문제:</p>
<table style="text-align:center; width:auto; margin:16px auto; font-size:0.9rem; max-width:320px">
<tr><td style="background:rgba(180,83,9,0.15);font-weight:bold">출발</td><td>s1</td><td>s2</td><td>s3</td></tr>
<tr><td>s4</td><td>s5</td><td>s6</td><td>s7</td></tr>
<tr><td>s8</td><td>s9</td><td>s10</td><td>s11</td></tr>
<tr><td>s12</td><td>s13</td><td>s14</td><td style="background:rgba(21,128,61,0.2);font-weight:bold">종료</td></tr>
</table>

<p><strong>MDP로 정의하면:</strong></p>
<ul>
  <li>$\\mathcal{S}$ : 16개 격자 (출발, s1~s14, 종료)</li>
  <li>$\\mathcal{A}$ : \\{N, S, E, W\\} (상하좌우)</li>
  <li>$\\mathcal{P}$ : 선택 방향으로 100% 이동, 가장자리 넘어가려 하면 제자리</li>
  <li>$\\mathcal{R}$ : 매 스텝 -1 (빨리 종료하란 신호)</li>
  <li>$\\gamma$ : 편의상 1 (종료되는 문제라 발산 안 함)</li>
</ul>

<p>예시 정책: 4방향 랜덤 — $\\pi(N|s) = \\pi(S|s) = \\pi(E|s) = \\pi(W|s) = 0.25$</p>

<h2>9. 퀴즈 — 개념 확인</h2>

${mcQuiz(
  "MDP의 구성 원소 5-tuple에 포함되는 것이 <u>아닌</u> 것은?",
  [
    "상태 집합 $\\mathcal{S}$",
    "행동 집합 $\\mathcal{A}$",
    "정책 $\\pi$",
    "감쇄 인자 $\\gamma$"
  ],
  2,
  "MDP는 $\\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle$ 5개. <strong>정책 $\\pi$는 환경(MDP)의 일부가 아니라 Agent의 행동 규칙</strong>입니다. MDP는 환경, $\\pi$는 그 위에서 Agent가 고르는 것."
)}

${mcQuiz(
  "$v_\\pi(s)$와 $q_\\pi(s,a)$의 가장 정확한 차이는?",
  [
    "$v$는 정책을 쓰고 $q$는 안 쓴다",
    "첫 액션을 $v$는 $\\pi$가 뽑고, $q$는 외부에서 $a$로 고정한다. 그 이후엔 둘 다 $\\pi$ 따라감",
    "$v$는 현재 보상, $q$는 미래 보상만 계산한다",
    "두 값이 항상 같다"
  ],
  1,
  "핵심: '<strong>$s$에서 첫 액션을 누가 정하나</strong>'. $q$는 '일단 $a$를 하고 봐', $v$는 '$\\pi$ 시키는 대로'. 이후엔 둘 다 $\\pi$를 따릅니다."
)}

${mcQuiz(
  "$\\gamma$의 값이 클수록(예: $\\gamma = 0.99$) Agent는 어떻게 행동하나?",
  [
    "당장의 보상만 챙기는 근시적 행동",
    "먼 미래의 보상까지 고려하는 원시적 행동",
    "완전히 무작위로 행동",
    "상태 전이를 무시"
  ],
  1,
  "$\\gamma \\to 1$이면 먼 미래 보상의 가중치가 높아져 <strong>원시적(far-sighted)</strong> 행동. $\\gamma \\to 0$이면 $G_t \\approx R_{t+1}$이 되어 <strong>근시적(myopic)</strong>."
)}

${mcQuiz(
  "4×4 Grid World에서 4방향 랜덤 정책. 매 스텝 보상 -1, $\\gamma=1$. '종료' 상태의 value $v_\\pi(\\text{종료})$는?",
  [
    "-1 (한 번 더 움직여야 하니까)",
    "0 (종료 상태는 끝이라 이후 보상 없음)",
    "-∞ (영원히 못 나감)",
    "알 수 없음"
  ],
  1,
  "종료(terminal) 상태는 에피소드가 끝나는 곳이라 이후 보상이 없어요. 그래서 $v(\\text{종료}) = 0$. Grid World에서 다른 상태의 value를 계산할 때 이 <strong>경계 조건</strong>을 먼저 확실히 해야 합니다."
)}

${mcQuiz(
  "다음 중 <u>Prediction 문제</u>는?",
  [
    "주어진 정책 $\\pi$에 대해 $v_\\pi(s)$를 구하기",
    "최적 정책 $\\pi_*$를 찾기",
    "최적 가치 $v_*$를 구하기",
    "새로운 MDP 환경을 설계하기"
  ],
  0,
  "Prediction = 정책 주어진 상태에서 value 평가. Control = 최적 정책 찾기. ②③은 Control, ④는 문제 설정."
)}

<h2>10. 이 장 요약 + 다음 장 예고</h2>

${note(`
<strong>✓ Ch 2에서 가져가야 할 것:</strong><br>
① Markov Property 수식과 직관 ② MP → MRP → MDP로 원소가 하나씩 추가되는 흐름 ③ MDP 5-tuple 암기 ④ Return $G_t$의 정의와 $\\gamma$의 의미 ⑤ $v_\\pi(s)$와 $q_\\pi(s,a)$의 차이 ⑥ Prediction vs Control 분류.
`, "tip")}

${note(`
<strong>📖 Ch 3 예고:</strong> 지금 $v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t=s]$ 정의가 있지만, 이 기댓값을 <u>계산할 수 있는 형태</u>로 바꿔야 합니다. 그게 <strong>Bellman 방정식</strong>. "$s$의 가치를 다음 상태 $s'$의 가치로 표현"하는 재귀 관계예요.<br>
0단계 → 1단계 → 2단계로 풀어 쓰는 과정이 시험 단골. 다음 장에서 walkthrough로 한 단계씩 유도합니다.
`)}
`);
