registerPage("exam-1", "모의고사 1 (객관식)", () => `
<h1>📝 모의고사 1 — 객관식</h1>
<p class="lead">15문제. 개념을 빠르게 훑어 빈틈 찾기용. 교수님 실제 시험은 서술형 비중이 높으니, 점수 확인 후 <strong>모의고사 2</strong>로 실전 연습하세요.</p>

${note(`
<strong>진단 기준</strong>:<br>
12~15점 → 개념 숙지 양호 → 모의고사 2 바로 진행<br>
9~11점 → 보통 → 틀린 챕터 재복습<br>
0~8점 → 기초부터 다시 — Ch3 Bellman 특히 중요
`, "tip")}

<h2>Part 1 — 기초 개념 (Ch 1~2)</h2>

${mcQuiz(
  "<strong>[1]</strong> Reward $R_t$의 특징으로 <u>틀린</u> 것은?",
  [
    "스칼라 값이어야 한다",
    "희소(sparse)하거나 지연(delayed)될 수 있다",
    "어떻게 해야 높은 보상을 받을지 방법까지 알려준다",
    "얼마나 잘하고 있는지 평가 신호"
  ],
  2,
  "보상은 '얼마나'는 알려주지만 '어떻게'는 알려주지 않음. 지도학습의 정답 레이블과의 근본적 차이."
)}

${mcQuiz(
  "<strong>[2]</strong> MDP의 5-tuple은 $\\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle$다. <u>포함되지 않는</u> 것은?",
  ["상태 집합", "행동 집합", "정책 $\\pi$", "감쇄 인자"],
  2,
  "정책은 Agent의 행동 규칙으로, MDP(환경)의 구성 요소가 아님."
)}

${mcQuiz(
  "<strong>[3]</strong> Markov Property의 정확한 표현은?",
  [
    "$\\mathbb{P}[S_{t+1} | S_t] = \\mathbb{P}[S_{t+1} | S_1, ..., S_t]$",
    "$\\mathbb{E}[S_{t+1}] = \\mathbb{E}[S_t]$",
    "$\\mathbb{P}[S_{t+1}] = \\mathbb{P}[S_t]$",
    "$\\mathbb{P}[S_1, ..., S_t] = \\prod \\mathbb{P}[S_i]$"
  ],
  0,
  "미래는 과거의 히스토리 전체와 무관하고 오직 현재에만 의존 = memoryless."
)}

${mcQuiz(
  "<strong>[4]</strong> $v_\\pi(s)$와 $q_\\pi(s,a)$의 가장 정확한 차이는?",
  [
    "$v$는 정책 사용, $q$는 사용 안 함",
    "$v$는 $\\pi$가 첫 액션 선택, $q$는 외부에서 $a$로 고정. 이후는 둘 다 $\\pi$ 따라감",
    "$v$는 현재 보상만, $q$는 미래 보상만",
    "둘은 항상 같은 값"
  ],
  1,
  "'첫 액션을 누가 결정하는가'가 차이. 이후 경로는 둘 다 $\\pi$."
)}

<h2>Part 2 — Bellman & DP (Ch 3~4)</h2>

${mcQuiz(
  "<strong>[5]</strong> Bellman Expectation Equation 0단계에서 기댓값 $\\mathbb{E}$가 필요한 이유는?",
  [
    "수식 간결성",
    "$s_{t+1}$이 <u>정책</u>과 <u>전이확률</u> 두 확률 과정을 거치는 확률변수",
    "$r$이 스칼라이기 때문",
    "$\\gamma$ 때문"
  ],
  1,
  "정책 $\\pi(a|s)$ + 환경 $P_{ss'}^a$ = 두 번의 확률 → 기댓값 필요."
)}

${mcQuiz(
  "<strong>[6]</strong> $\\pi(a_1|s) = 0.3, \\pi(a_2|s) = 0.7$, $q(s,a_1) = 10, q(s,a_2) = 0$. $v_\\pi(s)$는?",
  ["10", "0", "3", "7"],
  2,
  "$v_\\pi(s) = \\sum \\pi(a|s) q(s,a) = 0.3 \\times 10 + 0.7 \\times 0 = 3$. (Expectation Eq, 가중평균)"
)}

${mcQuiz(
  "<strong>[7]</strong> $r_s^a = 1, \\gamma = 0.9$. 액션 $a$ 후 50%로 $v(s_1)=4$, 50%로 $v(s_2)=-2$. $q(s,a)$는?",
  [
    "$1 + 0.9 \\times 1 = 1.9$",
    "$1 + 0.9 \\times 4 = 4.6$",
    "$1 + 0.9 \\times (0.5 \\times 4 + 0.5 \\times (-2)) = 1.9$",
    "$0.9 \\times 1 = 0.9$"
  ],
  2,
  "공식 $q = r_s^a + \\gamma \\sum P v(s')$. 가중평균값 $0.5(4) + 0.5(-2) = 1$, 즉 $q = 1 + 0.9 \\times 1 = 1.9$."
)}

${mcQuiz(
  "<strong>[8]</strong> Bellman Expectation Eq과 Optimal Eq의 <u>핵심 차이</u>는?",
  [
    "$\\gamma$ 사용 여부",
    "$\\sum_a \\pi(a|s)$ vs <strong>$\\max_a$</strong>",
    "상태 집합 정의",
    "감쇄 인자 부호"
  ],
  1,
  "Expectation = 정책에 따른 가중평균 / Optimal = 최고 액션 선택 ($\\max$)"
)}

${mcQuiz(
  "<strong>[9]</strong> Value Iteration이 명시적 정책을 쓰지 않는 이유는?",
  [
    "정책이 원래 필요없음",
    "$\\max_a$ 자체가 greedy policy 역할",
    "감쇄 인자 때문",
    "DP에선 정책 불필요"
  ],
  1,
  "Bellman Optimal Eq의 $\\max_a$가 '최선 액션 선택'을 이미 포함. 수렴 후 $\\arg\\max$로 정책 추출."
)}

${mcQuiz(
  "<strong>[10]</strong> DP가 MDP에 적용 가능한 <u>근본 이유</u>는?",
  [
    "유한 상태",
    "Bellman eq = optimal substructure(재귀), value function = overlapping(캐시)",
    "Markov Property만",
    "Stationary 정책 때문"
  ],
  1,
  "DP의 두 조건을 MDP가 모두 만족. Bellman eq가 재귀, value function이 캐시."
)}

<h2>Part 3 — MC, TD, Control (Ch 5~7)</h2>

${mcQuiz(
  "<strong>[11]</strong> MC와 TD의 bias/variance 특성은?",
  [
    "MC: high variance, zero bias / TD: low variance, biased",
    "MC: low variance / TD: high variance",
    "둘 다 unbiased",
    "둘 다 biased"
  ],
  0,
  "MC는 실제 $G_t$의 평균(unbiased)이지만 경로 전체 확률이 누적되어 variance 큼. TD는 한 스텝만 샘플(low variance)이지만 target에 추정값($V(s')$)이 섞여 biased."
)}

${mcQuiz(
  "<strong>[12]</strong> Non-episodic(종료 없는) MDP에 MC를 적용할 수 있나?",
  [
    "가능",
    "가능, $\\gamma$만 조정",
    "<strong>불가능</strong> — $G_t$ 계산에 에피소드 종료 필요",
    "TD와 동일"
  ],
  2,
  "MC는 $G_t = \\sum \\gamma^k R_{t+k+1}$을 에피소드 끝까지 더해야 함. 끝이 없으면 못 구함 → TD가 필요한 이유."
)}

${mcQuiz(
  "<strong>[13]</strong> DP Control을 Model-free에 <u>직접 못 쓰는 이유</u> 2가지는?",
  [
    "① 2단계 Bellman Eq 계산에 $r_s^a, P_{ss'}^a$ 필요 ② $v$만으로 greedy 선택 불가",
    "① 상태 크기 ② 메모리",
    "① Markov 위반 ② 비종료",
    "① $\\gamma$ 값 ② $\\alpha$ 값"
  ],
  0,
  "Evaluation과 Improvement 모두 막힘. 해결: ① MC/TD로 평가 ② $q$ 사용. 여기에 ③ $\\epsilon$-greedy 추가로 No-Exploration 문제도 해결."
)}

${mcQuiz(
  "<strong>[14]</strong> SARSA와 Q-Learning의 업데이트 타깃 차이는?",
  [
    "SARSA: $r + \\gamma q(s',a')$ / Q-Learning: $r + \\gamma \\max_{a'} q(s',a')$",
    "SARSA: $\\max$ / Q-Learning: 기댓값",
    "SARSA off-policy / Q-Learning on-policy",
    "동일"
  ],
  0,
  "타깃에서 $a'$를 어떻게 정하는지 — '실제 취할 액션' vs '가능한 최댓값'. 이 차이가 on/off-policy를 가름."
)}

${mcQuiz(
  "<strong>[15]</strong> $\\epsilon$-greedy에서 decaying(annealing)을 하는 이유는?",
  [
    "계산 속도",
    "초반 탐색 → 후반 활용 전환",
    "메모리 절약",
    "Markov 유지"
  ],
  1,
  "학습 초기엔 환경 모르니 탐색 필요 → 정보가 쌓이면 최선 선택 집중. $\\epsilon$을 점점 줄여 자연스러운 전환."
)}

<h2>정답 채점</h2>

<div class="def-card">
<div class="def-title">📊 자가 채점</div>
<div class="def-body">
각 문제 클릭 즉시 채점되었습니다. 아래 기준으로 공부 강도 조절하세요.
<table>
<tr><th>점수</th><th>진단</th><th>다음 할 일</th></tr>
<tr><td>13~15</td><td>개념 정리 탄탄</td><td>모의고사 2 서술형으로 실전 연습</td></tr>
<tr><td>10~12</td><td>기본은 OK, 디테일 구멍</td><td>틀린 챕터 재독 후 모의고사 2</td></tr>
<tr><td>7~9</td><td>주요 개념 혼동</td><td>Ch3 Bellman, Ch6 MC vs TD 표 재학습 필수</td></tr>
<tr><td>~6</td><td>기초 재정비 필요</td><td>Ch1부터 차근차근. 빠르게 푸는 게 목적이면 Ch3 먼저</td></tr>
</table>
</div>
</div>

${note(`
<strong>📖 모의고사 2 준비:</strong> 교수님 실제 시험은 서술형·유도·코드 빈칸이 메인이에요. 객관식은 개념 점검용으로만 쓰고, 답안 작성 연습은 모의고사 2에서 하세요.
`, "tip")}
`);
