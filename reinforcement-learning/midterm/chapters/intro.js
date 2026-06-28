registerPage("intro", "전체 흐름 · 시험 정보", () => `
<h1>🎯 강화학습개론 중간 대비</h1>
<p class="lead">이수행 교수님 / 강의자료 03~07장 / 시험까지 남은 시간에 맞춰 순서대로 진행.</p>

<h2>🗺️ 전체 로드맵 — 모든 내용이 한 문장에서 출발한다</h2>

${note(`
<strong>이 과목의 핵심 질문:</strong><br>
"환경에서 <strong>누적 보상을 최대화</strong>하는 행동 규칙(정책)을 어떻게 찾을까?"<br><br>
그리고 교수님 강의자료 표지에 있던 <strong>"ML 접근법 분기도"</strong>가 모든 장의 뼈대입니다. 아래 그림이 <u>이번 학기 내용을 한 장으로 요약</u>한 거예요. 각 챕터는 이 그림의 한 칸을 채웁니다.
`, "tip")}

<div class="def-card">
<div class="def-title">📍 MDP 문제크기와 조건에 따른 ML 접근법 (교수님 슬라이드 재현)</div>
<div class="def-body">
<div style="text-align:center;margin:10px 0">
<svg viewBox="0 0 880 540" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <!-- 상단 축: 문제 크기 -->
  <text x="440" y="18" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor" opacity="0.7">— 문제 크기 $(s_t, a_t)$ —</text>
  <text x="230" y="42" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">작다 (tabular)</text>
  <text x="650" y="42" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">크다 (high-dim)</text>

  <!-- 좌측 축: MDP 지식 -->
  <text x="18" y="280" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor" opacity="0.7" transform="rotate(-90 18 280)">— MDP 지식 —</text>
  <text x="55" y="170" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" transform="rotate(-90 55 170)">안다 (Model-based)</text>
  <text x="55" y="410" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" transform="rotate(-90 55 410)">모른다 (Model-free)</text>

  <!-- Cell 1: 작다 × 안다 = DP (Ch 4) -->
  <rect x="85" y="60" width="290" height="220" fill="rgba(37,99,235,0.08)" stroke="#2563eb" stroke-width="2" rx="8"/>
  <text x="230" y="87" text-anchor="middle" font-size="15" font-weight="700" fill="#2563eb">📗 Ch 4 · Dynamic Programming</text>
  <text x="230" y="105" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.65" font-style="italic">Model-based · Full Calculation</text>
  <text x="105" y="140" font-size="12" font-weight="700" fill="#15803d">Prediction (V값)</text>
  <text x="120" y="160" font-size="12" fill="currentColor">• Iterative Policy Evaluation</text>
  <text x="105" y="195" font-size="12" font-weight="700" fill="#15803d">Control (Q값)</text>
  <text x="120" y="215" font-size="12" fill="currentColor">• Policy Iteration</text>
  <text x="120" y="233" font-size="12" fill="currentColor">• Value Iteration</text>
  <text x="230" y="268" text-anchor="middle" font-size="10" fill="#2563eb" font-weight="600">⚑ 중간시험 범위</text>

  <!-- Cell 2: 작다 × 모른다 = Model-Free (Ch 5~7) -->
  <rect x="85" y="300" width="290" height="230" fill="rgba(37,99,235,0.08)" stroke="#2563eb" stroke-width="2" rx="8"/>
  <text x="230" y="327" text-anchor="middle" font-size="15" font-weight="700" fill="#2563eb">📕 Ch 5~7 · Model-Free</text>
  <text x="230" y="345" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.65" font-style="italic">Experience-based · Sampling</text>
  <text x="105" y="378" font-size="12" font-weight="700" fill="#15803d">Prediction (V값)</text>
  <text x="120" y="398" font-size="12" fill="currentColor">• Monte Carlo (Ch 5)</text>
  <text x="120" y="416" font-size="12" fill="currentColor">• TD · n-step TD (Ch 6)</text>
  <text x="105" y="448" font-size="12" font-weight="700" fill="#15803d">Control (Q값)</text>
  <text x="120" y="468" font-size="12" fill="currentColor">• MC Control (Ch 7)</text>
  <text x="120" y="486" font-size="12" fill="currentColor">• SARSA — On-Policy (Ch 7)</text>
  <text x="120" y="504" font-size="12" fill="currentColor">• Q-Learning — Off-Policy (Ch 7)</text>
  <text x="230" y="521" text-anchor="middle" font-size="10" fill="#2563eb" font-weight="600">⚑ 중간시험 범위</text>

  <!-- Cell 3 (full col): 크다 = Deep RL -->
  <rect x="420" y="60" width="420" height="470" fill="rgba(156,163,175,0.06)" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="6,4" rx="8"/>
  <text x="630" y="87" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor" opacity="0.7">🧠 Deep Reinforcement Learning</text>
  <text x="630" y="105" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.55" font-style="italic">DNN으로 Value/Policy 함수 근사 · 기말시험 범위</text>

  <text x="440" y="145" font-size="12" font-weight="700" fill="currentColor" opacity="0.7">1. Value-based Agent</text>
  <text x="460" y="165" font-size="11" fill="currentColor" opacity="0.7">• DQN = Q-Learning (Q Network)</text>
  <text x="480" y="181" font-size="11" fill="currentColor" opacity="0.7">+ Experience Replay</text>
  <text x="480" y="197" font-size="11" fill="currentColor" opacity="0.7">+ Separate Target Network</text>

  <text x="440" y="238" font-size="12" font-weight="700" fill="currentColor" opacity="0.7">2. Policy-based Agent</text>
  <text x="460" y="258" font-size="11" fill="currentColor" opacity="0.7">• REINFORCE Algorithm</text>

  <text x="440" y="300" font-size="12" font-weight="700" fill="currentColor" opacity="0.7">3. Actor-Critic (Value + Policy)</text>
  <text x="460" y="320" font-size="11" fill="currentColor" opacity="0.7">• Q Actor-Critic</text>
  <text x="460" y="336" font-size="11" fill="currentColor" opacity="0.7">• Advantage Actor-Critic (A2C/A3C)</text>
  <text x="460" y="352" font-size="11" fill="currentColor" opacity="0.7">• TD Actor-Critic</text>

  <text x="630" y="430" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.55" font-style="italic">(최신: PPO, SAC, DDPG, TD3, ...)</text>
  <text x="630" y="465" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.55" font-weight="600">중간시험 범위 아님</text>
</svg>
</div>
<strong>가로축</strong> — <em>문제 크기</em>(상태·액션 공간): 작으면 테이블, 크면 DNN 근사<br>
<strong>세로축</strong> — <em>MDP 지식 유무</em>: 안다 → 계산, 모른다 → 경험<br>
<strong>각 셀 내</strong> — Prediction(정책 평가, V값) · Control(최적정책, Q값)으로 또 갈라짐<br><br>
<em>이번 중간고사 범위는 파란 박스 두 개 (Ch4~Ch7). Deep RL은 기말.</em>
</div>
</div>

${note(`
<strong>🔑 한 번에 보는 세 가지 Prediction의 Backup 구조</strong> (교수님 슬라이드 "Value Backup in Cache")<br>
• <strong>Dynamic Planning</strong> — full-width, shallow bootstrap (모든 분기 펼치고 한 스텝만)<br>
• <strong>Monte Carlo</strong> — sample path, deep (한 경로만 샘플링하되 에피소드 끝까지)<br>
• <strong>Temporal Difference</strong> — sample path, shallow bootstrap (한 경로 + 한 스텝만)<br>
→ 이 "Sampling × Bootstrapping" 축 비교가 Ch6 핵심 시험 포인트.
`, "tip")}

<h2>📎 교수님 강의자료 PDF ↔ 이 사이트 챕터 매핑</h2>

${note(`
교수님 PDF 파일명과 사이트 챕터가 한 칸씩 어긋나는 이유: 교수님은 AI/ML을 별도 차시로 다뤘지만, 중간시험 범위(Ch 4~7)가 아니라 여기선 Ch 1의 <u>📘 사전 지식 토글</u>로 통합했어요.
`, "tip")}

<table>
<tr><th>교수님 강의자료 PDF</th><th>이 사이트</th><th>비고</th></tr>
<tr><td>01 · 강의 개론</td><td>—</td><td>수업 admin (여기선 생략)</td></tr>
<tr><td>02-01 · Intro to AI</td><td rowspan="3"><strong>Ch 1</strong></td><td>AI · Symbolic/Subsymbolic → Ch 1 prereq</td></tr>
<tr><td>02-02 · Intro to ML</td><td>ML vs DL · Data-driven 진화 → Ch 1 prereq</td></tr>
<tr><td>03-01 · Intro to RL</td><td>Ch 1 본문</td></tr>
<tr><td>03-02 · MDP</td><td><strong>Ch 2</strong></td><td>MP → MRP → MDP 체인</td></tr>
<tr><td>04 · Bellman Equation</td><td><strong>Ch 3</strong></td><td>0 → 1 → 2단계 유도</td></tr>
<tr><td>05 · Planning by DP</td><td><strong>Ch 4</strong></td><td>Policy/Value Iteration</td></tr>
<tr><td rowspan="2">06 · Model-Free Value Prediction</td><td><strong>Ch 5</strong></td><td>Monte Carlo Prediction</td></tr>
<tr><td><strong>Ch 6</strong></td><td>Temporal Difference · MC vs TD</td></tr>
<tr><td>07 · Model-Free Control</td><td><strong>Ch 7</strong></td><td>MC Control · SARSA · Q-Learning</td></tr>
</table>

<h2>📚 장별 스토리 흐름</h2>
<table>
<tr><th>장</th><th>핵심 질문</th><th>도구</th></tr>
<tr><td>Ch 1</td><td>강화학습이란 무엇이며 지도학습과 왜 다른가?</td><td>Agent-Env 루프, 보상 특징</td></tr>
<tr><td>Ch 2</td><td>RL 문제를 수학으로 어떻게 표현하나?</td><td>MDP 5-tuple $\\langle S,A,P,R,\\gamma \\rangle$, $v$ vs $q$</td></tr>
<tr><td>Ch 3</td><td>가치함수들 사이의 재귀 관계는?</td><td>Bellman Expectation/Optimal, 0→1→2단계</td></tr>
<tr><td>Ch 4</td><td>MDP를 <u>알 때</u> 어떻게 푸나?</td><td>Iterative Policy Eval, Policy/Value Iteration</td></tr>
<tr><td>Ch 5</td><td>MDP를 <u>모를 때</u> 가치를 어떻게 추정?</td><td>Monte Carlo (에피소드 평균)</td></tr>
<tr><td>Ch 6</td><td>MC의 단점을 어떻게 극복?</td><td>TD Learning, 추측을 추측으로 업데이트</td></tr>
<tr><td>Ch 7</td><td>MDP 모를 때 최적 정책 찾기?</td><td>MC Control, SARSA, Q-Learning, $\\epsilon$-greedy</td></tr>
</table>

${note(`
<strong>💡 챕터 간 이어지는 줄기:</strong><br>
Ch1에서 문제를 그림으로 보고 → Ch2에서 수식으로 쓰고 → Ch3에서 재귀 관계를 뽑고 → Ch4에서 MDP 전체를 알 때 푸는 법 → Ch5~6에서 모를 때 가치를 구하고 → Ch7에서 모를 때 최적 정책까지.<br>
<strong>Ch3 Bellman이 모든 후속 알고리즘의 출발점</strong>입니다. 여기서 막히면 뒤가 다 흐려져요.
`)}

<h2>📝 시험 정보 (녹취록 기반)</h2>
<table>
<tr><th>항목</th><th>내용</th><th>출처</th></tr>
<tr><td>시험 주차</td><td>8주차 화요일</td><td>0303 강의</td></tr>
<tr><td>시험 시간</td><td>3시~5시 사이 2시간 이내</td><td>0414-1 강의</td></tr>
<tr><td>장소</td><td>공대 C동 487 (공지 확인 필요)</td><td>0414-1 강의</td></tr>
<tr><td>형식</td><td>클로즈드북, 서술 + 코드 빈칸 + 개념 설명</td><td>0303, 0414-1 강의</td></tr>
<tr><td>배점</td><td>중간 35% · 기말 35% · 논문 20% · 출석 10%</td><td>0303 강의</td></tr>
</table>

<h2>🎯 교수님이 강의 중 명시적으로 "시험 낸다"고 한 포인트</h2>

${note(`
<strong>⚑ 0407 강의 — "반드시 낸다" 선언 항목</strong><br>
<ul>
  <li>Intro / MDP / Bellman Equation 및 Dynamic Programming / <strong>Model-Free Value Prediction</strong> / <strong>Model-Free Control</strong>까지 전부</li>
  <li>"<em>식도 이해해야 되고 식이 왜 이렇게 나왔는지 설명할 수 있어야 되고, 바이어스/언바이어스 이런 얘기도 물어볼 것</em>" — 수식 유도가 핵심</li>
  <li>"<em>다이나믹 프로그래밍 · MC · TD 이 세 가지를 비교하는 문제</em>"</li>
</ul>
`, "warn")}

${note(`
<strong>⚑ 0414-1 강의 — 구체적 출제 유형 예고</strong><br>
<ul>
  <li><strong>코드 빈칸 채우기</strong>: "<em>이 코드에 어느 부분을 뻥 뚫어놓고 여기에 들어갈 코드를 써봐라</em>" (ε-greedy annealing/decaying 예제 코드)</li>
  <li><strong>MDP 정의 문제</strong>: "<em>예제를 하나 딱 주고 이것에 마르코프 디시전 프로세스를 정의해 봐라</em>"</li>
  <li><strong>개념 설명형</strong>: "<em>ε-greedy가 뭐냐, 어닐링/디케잉 방법이 뭐냐, 왜 하고 있느냐</em>"</li>
  <li><strong>유도 설명</strong>: "<em>이 식이 왜 이렇게 써지는지, 왜 정답으로 가는지 설명하라</em>"</li>
</ul>
`, "warn")}

<h2>📋 사용법</h2>
<ul>
  <li>왼쪽 메뉴 순서대로 진행하면 돼요. 각 장 끝에 <strong>다음 장 프리뷰</strong>가 연결돼 있습니다.</li>
  <li>페이지 하단의 <strong>"학습 완료"</strong> 버튼을 누르면 상단 진도율에 반영 (브라우저 localStorage에 자동 저장).</li>
  <li>객관식 퀴즈는 즉시 채점, <strong>Walkthrough</strong>는 "다음" 버튼으로 한 단계씩 펼쳐집니다 — 특히 Bellman 유도에서 활용하세요.</li>
  <li>수식은 KaTeX로 렌더링. <strong>눈으로만 보지 말고 손으로 써보세요</strong> — 교수님이 "식이 왜 이렇게 되는지 설명하라"고 하셨어요.</li>
  <li>모의고사는 두 세트: 객관식으로 감 잡기 → 서술형으로 실전 연습.</li>
</ul>

<h2>🗓️ 권장 학습 순서</h2>
<table>
<tr><th>Day</th><th>범위</th><th>체크포인트</th></tr>
<tr><td>1</td><td>Ch 1 + Ch 2</td><td>MDP 5-tuple을 예제 하나에 정의해볼 수 있다</td></tr>
<tr><td>2</td><td>Ch 3 Bellman</td><td>0→1→2단계를 손으로 유도할 수 있다</td></tr>
<tr><td>3</td><td>Ch 4 DP</td><td>Grid World에서 Policy Iteration 한 바퀴 돌릴 수 있다</td></tr>
<tr><td>4</td><td>Ch 5 MC + Ch 6 TD</td><td>MC vs TD 표를 암기하지 않고 설명할 수 있다</td></tr>
<tr><td>5</td><td>Ch 7 Control</td><td>SARSA 업데이트식을 외우고, Q-Learning과의 차이를 설명</td></tr>
<tr><td>6</td><td>모의고사 1 (객관식) + 오답 복습</td><td>70% 이상 목표</td></tr>
<tr><td>7</td><td>모의고사 2 (서술형) + 전체 복기</td><td>작성 시간을 재보면서 풀기</td></tr>
</table>

<h2>📂 참고 자료</h2>
<ul>
  <li>📘 강의자료: <code>~/Documents/강화학습개론 중간/강의자료/</code> (PDF 9개)</li>
  <li>🎙️ 녹취록: <code>~/Documents/강화학습개론 중간/0303.txt ~ 0414-2.txt</code></li>
  <li>📖 (선택) Sutton & Barto, <em>Reinforcement Learning: An Introduction</em> — 표준 교재</li>
</ul>
`);
