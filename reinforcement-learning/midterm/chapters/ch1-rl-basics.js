registerPage("ch1-rl-basics", "Ch 1. 강화학습 기초", () => `
<h1>Ch 1 — 강화학습 기초</h1>
<p class="lead">${term("rl-def", "강화학습")}이 뭐고 ${term("supervised", "지도학습")}과 뭐가 다른지. 이 장이 끝나면 "왜 ${term("mdp", "MDP")}라는 모델이 필요한지" 감이 잡힙니다.</p>

${prereq("🎓 교수님 1장 — AI · Symbolic/Subsymbolic · ML vs DL (⚑ 시험 포인트)", `
  <h4>AI의 정의</h4>
  <p><strong>AI = intelligent behavior를 할 수 있는 것</strong>. 네 가지 요소: <em>perception(지각) · task(과제) · action(행동) · goal(목표)</em>.</p>

  <h4>${term("symbolic-ai", "Symbolic")} vs ${term("subsymbolic-ai", "Sub-symbolic")} AI</h4>
  <p>교수님 직접 강조: "<strong>${term("nn", "NN")}이 왜 subsymbolic이냐?</strong> 물어보면 특징을 가지고 설명해야 함."</p>
  <ul>
    <li><strong>Symbolic</strong>: 사람이 만든 명시적 <u>규칙·기호</u>로 추론 (전문가 시스템, 논리식). 해석 가능성 ↑, 규칙 밖은 X.</li>
    <li><strong>Sub-symbolic</strong>: 정보가 <u>weight/activation에 분산</u> 표현. 사람이 feature를 정의하지 않고 <u>데이터로부터 학습</u>. NN이 전형. 해석 불투명, 데이터 많이 필요.</li>
  </ul>

  <h4>${term("ml", "ML")} vs ${term("dl", "DL")}</h4>
  <p>핵심 차이 = <strong>feature 설계를 누가 하는가</strong>.</p>
  <ul>
    <li><strong>ML</strong>: 사람이 feature 설계 (human feature engineering) 후 모델 학습</li>
    <li><strong>DL</strong>: feature도 모델이 함께 학습 (end-to-end) — "feature도 맡김"</li>
  </ul>

  <h4>Data-driven inference approach의 진화</h4>
  <p><strong>통계적 방법(샘플링) → ML → DL</strong>. 뒤로 갈수록 데이터 요구량이 기하급수적으로 증가. 컴퓨터 성능이 좋아지면서 가능해진 흐름.</p>

  <div class="note warn" style="margin-top:14px">
    <span class="label">⚑ 시험 출제 패턴</span> 교수님 중간 정리 원문: "symbolic·subsymbolic <strong>각각의 특징 설명, 예를 들 수 있어야 함</strong>", "ML vs DL의 차이점 — <strong>human feature vs feature도 맡김</strong>".
  </div>
`)}

<h2>1. 머신러닝의 세 종류</h2>

${defCard("머신러닝 분류 기준 = 학습에 사용하는 신호", `
<table>
<tr><th>종류</th><th>학습 신호</th><th>예시</th></tr>
<tr><td><strong>지도학습</strong> (Supervised)</td><td>정답 레이블 <em>(입력 → 정답)</em></td><td>이미지 분류, 스팸 판별</td></tr>
<tr><td><strong>비지도학습</strong> (Unsupervised)</td><td>없음 (데이터 자체 패턴)</td><td>군집화 (K-Means)</td></tr>
<tr><td><strong>강화학습</strong> (Reinforcement)</td><td>보상(reward) 신호</td><td>바둑, 로봇, 자율주행</td></tr>
</table>
`)}

${note(`
<strong>자전거 배우기 비유</strong>:<br>
• 지도학습 — 아빠가 옆에서 "<em>지금 왼쪽! 지금 오른쪽!</em>" 하나하나 정답을 지시<br>
• 강화학습 — 혼자 타다 넘어지면 아프고(-), 굴러가면 재밌고(+). 이 신호로 스스로 배움<br><br>
<strong>결정적 차이:</strong> 강화학습에서는 "<u>올바른 입출력 쌍 (correct input/output pairs)이 주어지지 않습니다</u>".
`)}

<h2>2. 강화학습의 정확한 정의</h2>

${defCard("강화학습", `
<strong>순차적 의사결정(Sequential Decision Making)</strong> 문제에서<br>
<strong>누적 보상(Cumulative Reward = Return)을 최대화</strong>하기 위해<br>
<strong>시행착오를 통해 행동을 교정</strong>하는 학습 과정
`)}

<p>단어 세 개를 풀어보면:</p>
<ul>
  <li><strong>Sequential</strong>: 매 순간 내리는 결정이 <u>이후 결정에 영향</u>을 준다. (운전, 바둑, 주식)</li>
  <li><strong>Cumulative Reward</strong>: 한 번의 보상이 아니라 <u>쭉 모은 총합</u>을 최대화</li>
  <li><strong>Trial and Error</strong>: 일단 해보고 결과로 배운다</li>
</ul>

<h2>3. 보상(Reward) $R_t$의 세 가지 특징</h2>

${note(`
<strong>⚑ 시험 포인트:</strong> 교수님이 0407 강의에서 "바이어스/언바이어스 이런 얘기도 물어볼 것"이라 한 만큼, 보상의 정의·특성도 기본으로 알고 있어야 합니다.
`, "warn")}

<h3>① "어떻게"에 대한 정보가 없다</h3>
<p>보상은 <em>얼마나</em> 잘했는지만 알려줄 뿐, <em>어떻게</em> 하면 잘하는지는 안 알려줘요. 이게 지도학습의 '정답'과의 결정적 차이입니다.</p>

<h3>② 스칼라(Scalar) 값이다</h3>
<p>보상은 단일 숫자여야 해요. 여러 목표가 있으면 <strong>가중합</strong>으로 만듭니다.</p>

${note(`
<strong>예시:</strong> "대학생활 잘하기" 문제. 목표가 (학점 X, 동아리 Y, 연애 Z) 세 가지라면:<br>
$$R = 0.5X + 0.25Y + 0.25Z$$
이런 식으로 하나의 스칼라로 만들어야 강화학습 적용 가능.
`)}

<h3>③ 희소(Sparse)하거나 지연(Delayed)될 수 있다</h3>
<p>바둑은 200수 넘게 둬야 승패가 나옵니다. 매 수마다 "잘했어/못했어" 피드백이 바로 오지 않아요. 이게 강화학습을 어렵게 만드는 핵심 요인 중 하나.</p>

<h2>4. ${term("agent-env", "Agent-Environment")} 루프</h2>

${defCard("RL의 기본 상호작용 구조", `
<strong>Agent</strong>(${term("policy", "정책")} $\\pi$를 가진 주체)와 <strong>Environment</strong>(상태 전이와 보상을 결정)가 매 타임스텝 $t$마다 주고받습니다:
<ol>
  <li>Agent가 환경에서 상태 $s_t$와 보상 $r_t$를 관찰</li>
  <li>정책 $\\pi(a|s)$에 따라 행동 $a_t$를 결정해 환경에 전달</li>
  <li>환경은 전이확률 $P(s_{t+1} | s_t, a_t)$로 다음 상태를, 보상함수 $R(s_t, a_t)$로 다음 보상 생성</li>
</ol>
이 루프를 <strong>목표 달성 또는 에피소드 종료까지 반복</strong>.
`)}

<div style="text-align:center;margin:20px 0">
<svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <defs>
    <marker id="arrow1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"/>
    </marker>
  </defs>
  <rect x="50" y="80" width="170" height="90" fill="none" stroke="#2563eb" stroke-width="2.5" rx="8"/>
  <text x="135" y="115" text-anchor="middle" font-weight="bold" fill="#2563eb" font-size="16">Agent</text>
  <text x="135" y="140" text-anchor="middle" font-size="13" fill="currentColor">정책 π(a|s)</text>

  <ellipse cx="460" cy="125" rx="110" ry="55" fill="none" stroke="#b45309" stroke-width="2.5"/>
  <text x="460" y="118" text-anchor="middle" font-weight="bold" fill="#b45309" font-size="16">Environment</text>
  <text x="460" y="140" text-anchor="middle" font-size="12" fill="currentColor">P(s'|s,a), R(s,a)</text>

  <line x1="220" y1="105" x2="350" y2="105" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1)"/>
  <text x="285" y="95" text-anchor="middle" font-size="13" fill="currentColor">action $a_t$</text>

  <line x1="350" y1="150" x2="220" y2="150" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow1)"/>
  <text x="285" y="170" text-anchor="middle" font-size="13" fill="currentColor">state $s_{t+1}$, reward $r_{t+1}$</text>

  <text x="300" y="210" text-anchor="middle" font-size="12" fill="#6b7280" font-style="italic">매 타임스텝 반복 → 에피소드 종료까지</text>
</svg>
</div>

${note(`
<strong>왜 이 루프 그림이 중요하냐면</strong> — 이후 나올 <em>모든</em> 알고리즘(DP, MC, TD, SARSA, Q-Learning)이 전부 이 그림 위에서 돌아갑니다. Agent가 어떻게 정책을 개선하는지만 다를 뿐이에요.
`, "tip")}

<h2>5. 강화학습이 잘 동작하는 문제의 공통점</h2>
<ul>
  <li>상태 → 행동 → 다음 상태 전이가 정의 가능</li>
  <li>스칼라 보상 신호로 목표를 표현 가능</li>
  <li>충분히 많은 시행착오가 가능 (시뮬레이터 존재하면 좋음)</li>
</ul>

<p>강화학습의 성공 사례:</p>
<ul>
  <li><strong>AlphaGo / AlphaZero</strong>: 바둑, 체스, 쇼기</li>
  <li><strong>Atari DQN</strong>: 벽돌깨기, 스페이스 인베이더 등 고전 게임</li>
  <li><strong>로봇 팔 제어</strong>: 복잡한 조작 동작 학습</li>
  <li><strong>추천/광고</strong>: 장기 사용자 만족도 최대화</li>
</ul>

<h2>6. 퀴즈 — 개념 확인</h2>

${mcQuiz(
  "다음 중 강화학습의 보상(Reward) 특징으로 <u>틀린</u> 것은?",
  [
    "스칼라(scalar) 값이어야 한다",
    "어떻게 해야 보상을 많이 받을지 구체적인 방법까지 알려준다",
    "희소(sparse)하거나 지연(delayed)될 수 있다",
    "얼마나 잘하고 있는지 평가하는 신호다"
  ],
  1,
  "보상은 '<strong>얼마나</strong>'는 알려주지만 '<strong>어떻게</strong>'는 안 알려줍니다. 이게 지도학습의 '정답' 레이블과의 가장 큰 차이예요. 방법은 시행착오로 스스로 찾아야 합니다."
)}

${mcQuiz(
  "다음 중 <u>강화학습</u>으로 푸는 문제로 가장 적절한 것은?",
  [
    "사진을 개/고양이로 분류하기",
    "고객 이메일을 주제별로 자동 군집화",
    "주식 포트폴리오 운용 — 매 시점 매매 결정을 내려 장기 수익 최대화",
    "주어진 문장의 감성이 긍정인지 부정인지 예측"
  ],
  2,
  "① 지도학습(정답 레이블 있음) ② 비지도학습(레이블 없이 패턴) ④ 지도학습. ③은 <strong>순차적 의사결정</strong>이고 이번 매매가 다음 매매에 영향을 주며 누적 수익을 최대화하는 전형적 RL 문제입니다."
)}

${mcQuiz(
  "목표가 세 개(학점 X, 동아리 Y, 연애 Z)인 대학생활 문제에 강화학습을 적용하려 한다. 보상을 어떻게 설계해야 하나?",
  [
    "보상을 벡터 $[X, Y, Z]$로 정의한다",
    "세 개의 독립적인 Agent를 만든다",
    "가중합 $R = 0.5X + 0.25Y + 0.25Z$ 같은 <strong>스칼라</strong>로 합친다",
    "Y만 보상으로 쓰고 나머지는 제약조건으로 넣는다"
  ],
  2,
  "강화학습은 <strong>스칼라 보상</strong>만 지원합니다. 여러 목표가 있으면 가중합으로 하나의 숫자를 만들어야 해요. 가중치를 어떻게 정하느냐가 문제 설계의 핵심."
)}

${mcQuiz(
  "지도학습(Supervised)과 강화학습(RL)의 가장 근본적인 차이는?",
  [
    "지도학습은 딥러닝을 쓰고 RL은 안 쓴다",
    "지도학습은 <strong>올바른 입출력 쌍</strong>을 받지만, RL은 받지 않는다 (시행착오 + 보상만)",
    "RL은 연속 공간 문제에만 쓸 수 있다",
    "지도학습은 레이블이 없어도 된다"
  ],
  1,
  "강의자료에서 굵게 강조된 한 문장: '<em>RL differs from the supervised learning problem in that correct input/output pairs are never presented</em>'. 이게 본질적 차이입니다."
)}

<h2>7. 이 장 요약 + 다음 장 예고</h2>
${note(`
<strong>✓ Ch 1에서 가져가야 할 것:</strong><br>
① 머신러닝 3분류 중 RL의 위치 ② RL의 정의(Sequential + Cumulative Reward + Trial&Error) ③ 보상의 3특징 ④ Agent-Environment 루프 그림.
`, "tip")}

${note(`
<strong>📖 Ch 2 예고:</strong> 지금까지 "환경" "상태" "보상" 같은 말로 설명했는데, 이걸 <u>수식으로</u> 쓰려면 <strong>MDP(Markov Decision Process)</strong>라는 틀이 필요해요.<br>
다음 장에서 <strong>Markov Property → Markov Process → Markov Reward Process → Markov Decision Process</strong> 순서로 차근차근 쌓아 올립니다. 이 틀이 있어야 비로소 Bellman 방정식이 나와요.
`)}
`);
