registerPage("ch5-mc", "Ch 5. Monte Carlo", () => `
<h1>Ch 5 — Monte Carlo Learning</h1>
<p class="lead">${term("mdp", "MDP")}를 모를 때 가치를 어떻게 구할까? 답: <strong>일단 해보고 평균 내라</strong>. 여러 에피소드를 굴려 받은 ${term("return", "리턴")}의 평균을 $v(s)$로 삼는 방법.</p>

${note(`
<strong>📖 Ch 4 복습:</strong> ${term("dp", "DP")}는 Bellman 2단계 식으로 계산. 하지만 $r_s^a, P_{ss'}^a$를 <u>알아야만</u> 가능. 현실에선 모르는 경우가 훨씬 많아요 (자율주행의 교통 전이확률? 바둑의 상대 수 확률?).<br>
→ <strong>${term("model-free", "Model-free")}</strong> 세계로 진입. 이번 장은 그 첫 알고리즘 ${term("mc", "MC")}.
`, "tip")}

${prereq("📔 이 장 용어 빠른 참조", `
  ${term("mc")} · ${term("td")} · ${term("model-free")} · ${term("return")} · ${term("value-function")} · ${term("prediction-vs-control")} · ${term("markov-property")}
`)}

${note(`
<strong>⚑ 교수님 중간 정리:</strong> "<em>MC는 끝까지 갈 수 있는 터미네이티드 MDP에 쓸 수 있고, 얘(TD)는 그렇지 않은 데도 쓸 수 있어요. 얘는 전체를 다 해봐 시간이 많이 걸려요. 언바이어 세일즈. 경험에 의해 보면은 꽤 정확하더라.</em>" (0414-1 녹음)
`, "warn")}

<h2>1. Monte Carlo의 아이디어 — 동전 비유</h2>

${defCard("Monte Carlo Method", `
기댓값의 이론적 계산이 어려울 때, <strong>많은 샘플의 평균</strong>으로 근사하는 방법.
`)}

${note(`
<strong>동전 비유:</strong> 무게가 한쪽으로 치우친 동전이 있어요. 앞면 나올 확률이 50%가 아닙니다. 진짜 확률을 모를 때 어떻게 알 수 있을까?<br>
→ <strong>100번 던져서 앞면이 35번 나왔다 → "확률 35%쯤이겠구나"</strong>. 이게 Monte Carlo.<br><br>
시행 횟수를 늘릴수록 <strong>대수의 법칙</strong>에 의해 표본 평균이 진짜 확률(기댓값)에 수렴.
`)}

${concept("⚫⚪ 바둑에 MC 적용 — 교수님 강의자료 예제", `
  <p><strong>문제</strong>: 지금 이 바둑 상황의 <u>가치</u>는 얼마인가? (보상: 흑 승 = 1, 패 = 0)</p>
  <ul>
    <li>모델을 모르므로 Bellman 식 직접 계산 불가</li>
    <li>대신 — 이 상태에서 시작하는 <strong>1만 개의 경기</strong>를 (시뮬레이션으로) 진행</li>
    <li>그중 흑이 <strong>6,000번 승</strong> → 평균 리턴 = $\\frac{6000 \\times 1 + 4000 \\times 0}{10000} = 0.6$</li>
    <li>따라서 <strong>$v(\\text{현 상태}) \\approx 0.6$</strong></li>
  </ul>
  <p>시행 횟수 $\\uparrow$ → 추정치는 참값으로 수렴(대수의 법칙). 1만 번이 부족하면 10만 번, 100만 번 더 돌리면 됨. <strong>환경 모델 없이 순전히 경험만으로</strong> 상태의 가치를 매기는 게 MC의 본질.</p>
  <p><em>💡 연결: AlphaGo도 비슷한 아이디어(MCTS + NN)를 쓰는데, 학기말에 다룹니다.</em></p>
`)}

<h2>2. MC를 RL에 적용 — Policy Evaluation</h2>

<p>목표: $v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t = s]$</p>
<p>기댓값 계산 못 하니까 → <strong>$G_t$ 여러 개 모아서 평균</strong>!</p>

${defCard("MC Policy Evaluation 절차", `
<ol>
  <li>테이블 $N(s), V(s)$를 모두 0으로 초기화</li>
  <li>정책 $\\pi$로 에피소드 하나 굴림: $S_0, A_0, R_1, S_1, A_1, R_2, \\ldots, S_T$</li>
  <li>에피소드 내의 각 상태 $s$에 대해 (방문한 순간):
    <ul>
      <li>$N(s) \\leftarrow N(s) + 1$</li>
      <li>$V(s) \\leftarrow V(s) + G_t$</li>
    </ul>
  </li>
  <li>2~3 여러 번 반복 → 최종: $V(s) / N(s)$가 $v_\\pi(s)$의 추정치</li>
</ol>
대수의 법칙: $N(s) \\to \\infty$일 때 $V(s)/N(s) \\to v_\\pi(s)$ 수렴 보장.
`)}

<h3>First-Visit vs Every-Visit</h3>
<p>한 에피소드 내에서 상태 $s$가 여러 번 나타날 수 있습니다. 어떻게 카운트?</p>
<ul>
  <li><strong>First-Visit MC</strong>: 해당 에피소드의 <u>첫 방문만</u> 카운트</li>
  <li><strong>Every-Visit MC</strong>: 방문할 때마다 <u>모두</u> 카운트</li>
</ul>
<p>둘 다 수렴 보장. 실용적으로 차이 크지 않음.</p>

<h2>3. Incremental Mean — 매번 평균 다시 계산하지 않는 트릭</h2>

${walkthrough("Incremental Mean 유도", [
  {
    title: "평균의 정의",
    body: `$k$개 샘플의 평균:
    $$\\mu_k = \\frac{1}{k}\\sum_{j=1}^{k} x_j$$
    매번 재계산하면 비효율. 점화식을 만들 수 있다.`
  },
  {
    title: "$x_k$ 분리",
    body: `$$\\mu_k = \\frac{1}{k}\\left(x_k + \\sum_{j=1}^{k-1} x_j\\right)$$`
  },
  {
    title: "$\\sum_{j=1}^{k-1} x_j = (k-1)\\mu_{k-1}$ 치환",
    body: `$$\\mu_k = \\frac{1}{k}(x_k + (k-1)\\mu_{k-1})$$
    전개하면:
    $$\\mu_k = \\mu_{k-1} + \\frac{1}{k}(x_k - \\mu_{k-1})$$`
  },
  {
    title: "해석 — 오차를 학습률로 당겨 업데이트",
    body: `$$\\mu_k \\leftarrow \\mu_{k-1} + \\alpha(x_k - \\mu_{k-1}), \\quad \\alpha = \\frac{1}{k}$$
    <ul>
      <li>$x_k - \\mu_{k-1}$ = 새 샘플과 현재 평균의 차이 (오차)</li>
      <li>$\\alpha$ = 학습률 (update step size)</li>
    </ul>
    매번 $N(s)$ 저장할 필요 없이 테이블 값만 업데이트 가능.`
  }
])}

<h3>MC 업데이트 공식</h3>

$$\\boxed{V(S_t) \\leftarrow V(S_t) + \\alpha \\left( G_t - V(S_t) \\right)}$$

${breakdown({
  symbols: `<ul>
    <li>$V(S_t)$ — 현재 저장되어 있는 <strong>추정치</strong> (좌변에서는 업데이트 대상, 우변에서는 이전 값)</li>
    <li>$G_t$ — 이번 에피소드에서 <strong>실제로 얻은 리턴</strong> (진짜 답에 가까운 샘플)</li>
    <li>$\\alpha$ — <strong>학습률</strong> (0~1, 얼마나 새 정보로 당겨갈지)</li>
    <li>화살표 $\\leftarrow$ — 대입. 우변 계산 후 좌변 값을 덮어씀</li>
  </ul>`,
  combinations: `<ul>
    <li>$G_t - V(S_t)$ — <strong>오차(error)</strong>. "실제 결과가 내 추정보다 얼마나 큰가/작은가"</li>
    <li>$\\alpha \\, (G_t - V(S_t))$ — 그 오차를 학습률만큼 축소한 값 = <strong>이번에 당길 크기</strong></li>
    <li>$V(S_t) + \\alpha(G_t - V(S_t))$ — 이전 추정값에 그 보정량을 더함</li>
  </ul>`,
  whole: `"<strong>현재 추정값을 실제 결과 방향으로 $\\alpha$만큼 살살 당겨간다</strong>".<br>
  • $\\alpha = 1$이면 $V \\leftarrow G_t$로 통째로 덮어쓰기 (너무 과격)<br>
  • $\\alpha = 0$이면 절대 안 바뀜 (학습 X)<br>
  • $\\alpha$를 작게 하면 여러 $G_t$의 평균으로 서서히 수렴 (noise 완화)<br>
  이 "추정값을 목표값 방향으로 당긴다" 패턴은 TD, SARSA, Q-Learning까지 공통. 타깃만 $G_t \\to r + \\gamma V(s') \\to \\ldots$로 바뀔 뿐.`
})}

${note(`
<strong>$\\alpha$를 고정값(예: 0.01)으로 쓰는 경우:</strong><br>
$V(s) \\leftarrow (1-\\alpha) \\cdot V(s) + \\alpha \\cdot G_t$ 꼴이 되어, <u>최근 경험에 더 가중치</u>를 줍니다 (running mean).<br>
→ <strong>Non-stationary 환경</strong>(시간 따라 환경이 변함)에서 유리. "옛날 데이터는 잊어라".
`)}

<h2>4. MC Backup 트리 그림</h2>

${note(`
DP와 MC의 backup 구조를 트리로 보면:<br>
<strong>DP</strong>: 한 단계 펼침 + 모든 분기를 전부 본 뒤 기댓값 계산 (full, shallow)<br>
<strong>MC</strong>: <u>에피소드 끝까지 한 경로만</u> 따라가서 실제 리턴 얻음 (sample, deep)<br><br>
→ MC는 "끝까지 가본 결과"가 필요하므로 <strong>에피소드가 끝나야</strong> 업데이트 가능.
`)}

<h2>5. MC Prediction 코드 (실행 가능)</h2>

${pyCode(`"""
============================================================
 Monte Carlo Prediction  (Ch5 — Every-Visit MC)
============================================================
◎ 아이디어
   MDP를 모를 때 → 기댓값 직접 계산 불가 → 샘플 평균으로 근사!
   에피소드를 여러 번 굴려서 받은 리턴 G_t의 평균을 v_π로 삼는다.

◎ 업데이트 규칙 (incremental mean 형식)
   V(S_t) ← V(S_t) + α · (G_t - V(S_t))
   - α = 1/N  →  정확한 평균 (stationary 환경)
   - α = 고정 →  최근 경험 가중 (non-stationary 대응)

◎ 중요한 성질
   ① terminal이 있어야만 사용 가능 (G_t 계산에 에피소드 끝 필요)
   ② Unbiased (G_t는 v_π의 정확한 샘플)
   ③ Variance 크다 (궤적 전체의 확률이 누적)
   ④ Bootstrapping 안 함 (실제 G_t만 사용)

◎ 환경: 4x4 Grid World (Ch4와 동일). uniform random 정책.
   → 같은 MDP라 MC 결과가 DP의 Iterative Policy Eval 결과와 근사해야 함
     (수렴 값 ≈ 좌상단 -59, terminal 근처 -14)
============================================================
"""
import numpy as np, random

# ---------------- 환경 설정 ----------------
ROWS, COLS = 4, 4
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]   # ↑ ↓ ← →

class GridWorld:
    """
    MDP를 캡슐화한 환경 클래스.
    Agent는 step()으로만 상호작용 — 내부 전이확률/보상함수는 접근 불가 (Model-free).
    """
    def reset(self):
        """에피소드 시작: 좌상단에서 출발"""
        self.s = (0, 0)
        return self.s

    def step(self, a_idx):
        """
        액션 인덱스(0~3)를 받아 다음 (state, reward, done) 반환.
        이게 실제 RL 환경에서 Agent가 얻는 유일한 정보 통로.
        """
        r, c = self.s
        dr, dc = ACTIONS[a_idx]
        nr, nc = r + dr, c + dc
        if not (0 <= nr < ROWS and 0 <= nc < COLS):
            nr, nc = r, c              # 벽 → 제자리
        self.s = (nr, nc)
        done = self.s in TERMINAL
        return self.s, -1, done        # reward는 항상 -1

# ---------------- MC Prediction ----------------
def mc_prediction(n_episodes=50000, alpha=1e-4, gamma=1.0):
    """
    n_episodes : 에피소드 수 (많을수록 수렴)
    alpha      : 학습률. 1/k 대신 고정값 사용 (running mean 효과)
    gamma      : 감쇄 인자
    """
    env = GridWorld()
    V = np.zeros((ROWS, COLS))                    # v의 추정 테이블

    for ep in range(n_episodes):
        # ========== ① 에피소드 생성 (정책으로 한 판 굴림) ==========
        history = []                              # (state, reward) 기록
        s = env.reset()
        done = False
        while not done:
            a = random.randint(0, 3)              # uniform random π
            s_next, r, done = env.step(a)
            history.append((s, r))                # 방문한 (상태, 받은 보상) 저장
            s = s_next
        # 이 시점에 history = [(s_0, r_1), (s_1, r_2), ..., (s_{T-1}, r_T)]

        # ========== ② Backward로 G_t 누적 + V 업데이트 ==========
        # G_t를 역방향으로 계산하면 O(T)로 끝남 (forward는 O(T^2))
        #   G_T      = r_{T+1}
        #   G_{t}    = r_{t+1} + γ · G_{t+1}
        G = 0
        for (s, r) in reversed(history):
            G = r + gamma * G                     # G_t 역방향 누적
            # Every-Visit MC 업데이트:
            #   V(s) ← V(s) + α · (G_t - V(s))
            # (같은 s를 한 에피소드에서 여러 번 만나면 그때마다 업데이트)
            V[s] = V[s] + alpha * (G - V[s])

    return V

# =============== 실행 ===============
V = mc_prediction()
print("MC estimate of v_π (uniform random):")
print(np.round(V, 1))
# ⚑ Ch4 DP의 Iterative Policy Eval 결과와 거의 같게 나옴
#   (양쪽 다 같은 v_π를 다른 방식으로 추정)`, { title: "MC Prediction (Every-Visit MC)" })}

<p>학습 결과 (50000 에피소드 후):</p>
<pre style="text-align:center;font-size:13px">
[-57.09  -55.47  -53.65  -52.21]
[-55.20  -52.98  -48.91  -44.84]
[-51.92  -47.76  -40.20  -30.06]
[-48.98  -42.62  -29.37    0.00]
</pre>
<p>Ch4 DP 결과($-59.4, \\ldots, -30, 0$)와 <strong>거의 같은 값</strong>이 나옵니다. 환경 파라미터 없이 경험만으로 학습한 결과예요.</p>

<h2>6. MC의 한계</h2>

${note(`
<strong>치명적 한계: 에피소드가 끝나야만 업데이트 가능</strong><br>
$G_t$를 계산하려면 에피소드 끝까지 리턴이 정해져야 해요. 그런데:<br>
• 자율주행 — 끝이 없음<br>
• 게임이 너무 길어짐 — 끝나기 전 중단하면 데이터 못 씀<br><br>
<strong>Non-Episodic MDP</strong>(종료 상태가 없는 MDP)에는 MC 적용 불가. 이게 다음 장 <em>TD</em>가 등장하는 이유.
`, "warn")}

<h2>7. 퀴즈 — 개념 확인</h2>

${mcQuiz(
  "MC Policy Evaluation의 핵심 아이디어는?",
  [
    "Bellman 방정식을 직접 풀기",
    "기댓값을 <strong>많은 샘플의 평균</strong>으로 근사",
    "전이확률을 추정한 뒤 DP 적용",
    "최적 정책 먼저 찾고 value 구함"
  ],
  1,
  "Monte Carlo의 정체는 '기댓값 → 샘플 평균'. 대수의 법칙이 보장해줍니다. MDP 파라미터 몰라도 OK."
)}

${mcQuiz(
  "MC를 <u>에피소드가 끝나지 않는 MDP</u>에 적용 가능한가?",
  [
    "가능. 매 스텝마다 업데이트하면 됨",
    "가능. $\\gamma$만 조정",
    "<strong>불가능</strong>. $G_t$ 계산이 에피소드 종료를 요구",
    "가능, TD와 동일하게 동작"
  ],
  2,
  "MC는 $G_t = R_{t+1} + \\gamma R_{t+2} + \\ldots + \\gamma^{T-1}R_T$를 써야 하는데, $T$(종료)가 없으면 이 값을 얻을 수 없음. 이 한계가 TD 등장의 이유."
)}

${mcQuiz(
  "First-Visit MC와 Every-Visit MC의 차이는?",
  [
    "First-Visit은 한 에피소드에서 첫 방문만, Every-Visit은 모든 방문을 카운트",
    "Every-Visit만 수렴 보장됨",
    "First-Visit은 TD와 동일",
    "계산량이 정반대"
  ],
  0,
  "이름 그대로. 한 에피소드에서 같은 상태를 여러 번 방문할 때 어떻게 카운트하느냐의 차이. 둘 다 수렴 보장."
)}

${mcQuiz(
  "Incremental Mean 공식 $\\mu_k = \\mu_{k-1} + \\frac{1}{k}(x_k - \\mu_{k-1})$에서 $\\frac{1}{k}$ 대신 고정값 $\\alpha = 0.01$을 쓰면?",
  [
    "계산이 틀려진다",
    "최근 샘플에 더 큰 가중치가 실린다 (running mean) — Non-stationary 환경에 유리",
    "수렴이 빨라진다",
    "감쇄 인자 $\\gamma$ 역할"
  ],
  1,
  "$\\alpha$ 고정 시 옛날 평균이 지수적으로 잊혀짐. 환경이 변하는 경우 좋음. Stationary 환경에서는 $1/k$가 수렴 속도는 최적."
)}

${mcQuiz(
  "MC 업데이트 식 $V(S_t) \\leftarrow V(S_t) + \\alpha(G_t - V(S_t))$에서 $(G_t - V(S_t))$의 의미는?",
  [
    "감쇄 인자",
    "상태 전이 확률",
    "오차 (현재 추정과 실제 리턴의 차이)",
    "정책 확률"
  ],
  2,
  "TD와 공통 패턴: 목표값 − 현재 추정값 = 오차. 이 오차 방향으로 $\\alpha$ 만큼 당겨서 업데이트. TD의 업데이트도 완전히 같은 구조 (다음 장에서 확인)."
)}

<h2>8. 이 장 요약 + 다음 장 예고</h2>

${note(`
<strong>✓ Ch 5에서 가져가야 할 것:</strong><br>
① MC 아이디어 = 기댓값 → 샘플 평균 ② First-Visit vs Every-Visit ③ Incremental Mean 공식 유도 ④ MC 업데이트식 $V \\leftarrow V + \\alpha(G_t - V)$ ⑤ <strong>MC는 에피소드 종료가 필수</strong>.
`, "tip")}

${note(`
<strong>📖 Ch 6 예고:</strong> MC의 "끝나야 함" 한계를 깨는 방법이 <strong>Temporal Difference(TD)</strong>. "끝까지 기다리지 말고, <u>다음 상태에서의 새 추정</u>만 보고 바로 업데이트하자".<br>
$V \\leftarrow V + \\alpha(G_t - V)$ 에서 $G_t$ 자리를 <strong>$r_{t+1} + \\gamma V(s_{t+1})$</strong>로 바꾸는 게 전부. 하지만 bias/variance 성질이 완전히 달라져요. 이게 시험 단골 비교 포인트.
`)}
`);
