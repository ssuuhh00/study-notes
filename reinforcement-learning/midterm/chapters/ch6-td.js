registerPage("ch6-td", "Ch 6. TD & MC vs TD", () => `
<h1>Ch 6 — Temporal Difference · MC vs TD</h1>
<p class="lead">${term("mc", "MC")}의 "끝나야 학습 가능" 한계를 깨는 방법. "추측을 추측으로 업데이트" (update a guess towards a guess).</p>

${note(`
<strong>📖 Ch 5 복습:</strong> ${term("mc", "MC")}는 $G_t$를 얻어야 업데이트 가능 → 에피소드 종료 필요. Non-episodic MDP에서는 무용지물. 이걸 어떻게 해결?
`, "tip")}

${prereq("📔 이 장 용어 빠른 참조", `
  ${term("td")} · ${term("mc")} · ${term("model-free")} · ${term("bellman-expectation")} · ${term("value-function")} · ${term("prediction-vs-control")}
`)}

${note(`
<strong>⚑ 교수님 중간 정리 (0414-1 녹음):</strong> "<em>얘는 업데이트가 빨라... 얘는 시간이 적게 걸려 얘가 제일 적게 걸리는 지금 빨리빨리 업데이트해서 빨리 가는데 <strong>문제는 언바이어스 때 에스메이트예요. 틀린 방향으로 갈 수가 있어.</strong> 근데 경험에 의해서 보면은 꽤 정확하더라.</em>"<br>
→ TD는 biased지만 실용적으로 정확. 그리고 "<em>좀 더 정확하게 하려면 엔 스텝 가서 한다</em>" (n-step TD로 연결).
`, "warn")}

<h2>1. TD의 아이디어 — 일요일 비 예측</h2>

${note(`
<strong>비 예측 비유:</strong><br>
• 금요일 — "일요일에 비 올 확률 50%"라 추정<br>
• 토요일 — 상황이 더 명확해져서 "비 확률 80%"라 업데이트<br>
• 일요일 — 실제로 비 내림<br><br>
<strong>MC</strong>: 일요일까지 기다림 → 실제 결과 보고 금요일 예측 수정<br>
<strong>TD</strong>: 토요일의 <u>새 예측</u>(80%)을 보고 <u>바로</u> 금요일 예측을 위로 수정. "추측을 추측으로 업데이트".
`)}

<h2>2. TD(0) 업데이트</h2>

${defCard("TD(0) — 가장 단순한 TD", `
$$\\boxed{V(S_t) \\leftarrow V(S_t) + \\alpha \\left( \\underbrace{R_{t+1} + \\gamma V(S_{t+1})}_{\\text{TD Target}} - V(S_t) \\right)}$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$V(S_t)$ — 현재 상태의 추정치 (업데이트 대상)</li>
    <li>$R_{t+1}$ — 한 스텝 걸어 <strong>실제로 받은</strong> 즉시 보상 (샘플 1개)</li>
    <li>$V(S_{t+1})$ — 다음 상태의 추정치 (<u>학습 중인 값</u>을 그대로 가져다 씀 ← bootstrap)</li>
    <li>$\\gamma$ — 감쇄 인자</li>
    <li>$\\alpha$ — 학습률</li>
  </ul>`,
  combinations: `<ul>
    <li>$\\gamma V(S_{t+1})$ — 다음 상태의 추정 가치를 한 번 할인</li>
    <li>$R_{t+1} + \\gamma V(S_{t+1})$ = <strong>TD Target</strong> — "한 스텝 실제로 걸어보고, 거기서부터는 기존 추정을 믿고 계산한 새 추정치"<br>(MC의 $G_t$를 대신하는 역할)</li>
    <li>$R_{t+1} + \\gamma V(S_{t+1}) - V(S_t) = \\delta_t$ = <strong>TD Error</strong> — 새 추정과 기존 추정의 차 (= 오차)</li>
    <li>$\\alpha \\, \\delta_t$ — 학습률만큼 줄인 오차 = 이번에 당길 크기</li>
  </ul>`,
  whole: `"<strong>$V(S_t)$를 한 스텝 걸어본 결과가 알려주는 방향으로 $\\alpha$만큼 당긴다</strong>".<br>
  MC와의 차이는 단 한 글자: 타깃이 <strong>$G_t$ → $R_{t+1} + \\gamma V(S_{t+1})$</strong>.<br>
  • MC: "에피소드 끝까지 가서 얻은 실제 결과"<br>
  • TD: "한 스텝만 걸어 실제 보상 + 이후엔 학습 중인 추정 $V(S_{t+1})$"<br>
  → 한 스텝 업데이트로 가능 + non-terminating MDP에도 적용 가능.`
})}

<p><strong>TD의 두 핵심 용어:</strong></p>
<ul>
  <li><strong>TD Target</strong>: $R_{t+1} + \\gamma V(S_{t+1})$ — 한 스텝 걸어보고 얻은 새 추정치</li>
  <li><strong>TD Error</strong>: $\\delta_t = \\text{TD Target} - V(S_t)$ — 오차</li>
</ul>

${note(`
<strong>MC vs TD 업데이트식 비교 (한 줄 차이)</strong>:<br>
MC: $V(S_t) \\leftarrow V(S_t) + \\alpha(\\textcolor{#15803d}{G_t} - V(S_t))$<br>
TD: $V(S_t) \\leftarrow V(S_t) + \\alpha(\\textcolor{#2563eb}{R_{t+1} + \\gamma V(S_{t+1})} - V(S_t))$<br><br>
<strong>목표값(target)만 다릅니다.</strong> $G_t$(실제 전체 리턴) vs $R_{t+1} + \\gamma V(S_{t+1})$(한 스텝 + 다음 상태 추정).
`, "tip")}

<h2>3. 이론적 근거</h2>

<div class="two-col" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0">
<div style="background:var(--bg-2);padding:16px;border-radius:6px;border:1px solid var(--border)">
<h4 style="margin-top:0;color:var(--accent)">MC</h4>
$$v_\\pi(s_t) = \\mathbb{E}_\\pi[G_t]$$
$G_t$를 많이 모을수록 평균은 $v_\\pi$에 수렴 (대수의 법칙).<br>
$G_t$는 $v_\\pi$의 <strong>unbiased 추정</strong>.
</div>
<div style="background:var(--bg-2);padding:16px;border-radius:6px;border:1px solid var(--border)">
<h4 style="margin-top:0;color:var(--accent)">TD</h4>
$$v_\\pi(s_t) = \\mathbb{E}_\\pi[r_{t+1} + \\gamma v_\\pi(s_{t+1})]$$
(0단계 Bellman Eq)<br>
$r_{t+1} + \\gamma v_\\pi(s_{t+1})$를 모을수록 $v_\\pi$ 수렴. 한 스텝씩 업데이트 가능.
</div>
</div>

<h2>4. MC vs TD 비교표 — 시험 단골</h2>

${note(`
<strong>⚑ 시험 포인트 (0407 강의 명시):</strong> "MC와 TD를 비교하는 문제, bias/variance 이런 얘기도 물어볼 것". 이 표는 <u>암기 수준</u>으로.
`, "warn")}

<table>
<tr><th>기준</th><th>Monte Carlo</th><th>Temporal Difference</th></tr>
<tr><td><strong>학습 시점</strong></td><td>에피소드 종료 후</td><td>한 스텝마다 (online)</td></tr>
<tr><td><strong>적용 MDP</strong></td><td>Episodic MDP만 (종료 필수)</td><td>Non-Episodic 가능</td></tr>
<tr><td><strong>업데이트 타깃</strong></td><td>$G_t$ — 실제 전체 리턴</td><td>$R_{t+1} + \\gamma V(S_{t+1})$ — 추정 포함</td></tr>
<tr><td><strong>Bias (편향)</strong></td><td><strong>Unbiased</strong> (편향 없음) — $G_t$는 정확한 샘플</td><td><strong>Biased</strong> — $V(S_{t+1})$이 부정확한 추정값</td></tr>
<tr><td><strong>Variance (분산)</strong></td><td><strong>High</strong> — 에피소드 내 수많은 확률 요소 누적</td><td><strong>Low</strong> — 한 스텝만 보므로 확률 요소 적음</td></tr>
<tr><td><strong>Bootstrapping</strong></td><td>X — 실제 결과만 사용</td><td>O — 다른 추정값($V(s_{t+1})$)을 사용</td></tr>
<tr><td><strong>Sampling</strong></td><td>O — 경험 샘플 사용</td><td>O — 샘플 사용</td></tr>
<tr><td><strong>초기값 민감도</strong></td><td>둔감</td><td>민감 ($V$ 초기값이 target에 섞임)</td></tr>
<tr><td><strong>수렴성</strong></td><td>함수 근사여도 좋음</td><td>TD(0) 수렴 보장, 함수 근사에선 항상 X</td></tr>
</table>

<h2>5. Bias/Variance 직관</h2>

${note(`
<strong>왜 MC는 High Variance?</strong><br>
$G_t$를 얻으려면 에피소드 전체(수십~수백 스텝)를 돌아야 함. 각 스텝마다 확률적 결정이 있으므로, <u>이 모든 확률 요소가 누적</u>된 결과가 $G_t$. 샘플이 평균에서 멀리 떨어져 나올 수 있음 → 분산 큼.<br><br>
<strong>왜 TD는 Low Variance but Biased?</strong><br>
한 스텝만 샘플링 → 확률 요소 적음 → 분산 작음.<br>
하지만 타깃 $r + \\gamma V(s')$에 <u>학습 중인 $V$</u>가 들어있음 → 시작할 땐 부정확. → bias.<br>
⚠ 에피소드 끝나고 계산된 <em>참</em>값 $r + \\gamma v_\\pi(s')$는 unbiased지만, 실제로 쓰는 $r + \\gamma V(s')$는 biased.
`, "tip")}

<h2>6. DP · MC · TD 통합 뷰 — Backup 트리</h2>

${defCard("세 방법을 한 장에", `
Bellman backup을 두 축으로 분류:
<ul>
  <li><strong>Sampling</strong>(가로축): 샘플로 기댓값 근사할까? 모든 분기 다 볼까?</li>
  <li><strong>Bootstrapping</strong>(세로축): 업데이트에 추정값 쓸까? 끝까지 가서 실제 결과만 쓸까?</li>
</ul>
`)}

<table>
<tr><th></th><th>Sampling 안함 (Full, 모든 분기)</th><th>Sampling 함 (한 경로만)</th></tr>
<tr><td><strong>Bootstrap 함 (Shallow)</strong></td><td><strong>DP</strong></td><td><strong>TD</strong></td></tr>
<tr><td><strong>Bootstrap 안함 (Deep)</strong></td><td>Exhaustive Search</td><td><strong>MC</strong></td></tr>
</table>

${note(`
<strong>한 문장 정리:</strong><br>
• DP: full-width(모든 분기) + bootstrap(한 스텝만 펼침)<br>
• MC: sample(한 경로) + no bootstrap(끝까지)<br>
• TD: sample(한 경로) + bootstrap(한 스텝만)<br><br>
TD는 <em>DP의 bootstrap</em>과 <em>MC의 sampling</em>을 <u>둘 다</u> 취한 하이브리드.
`, "tip")}

<h2>7. n-Step TD — MC와 TD 사이의 다리</h2>

<p>TD(0) = 1스텝 후 bootstrap. MC = 끝까지. <strong>중간</strong>도 가능:</p>

$$G_t^{(n)} = R_{t+1} + \\gamma R_{t+2} + \\cdots + \\gamma^{n-1} R_{t+n} + \\gamma^n V(S_{t+n})$$

<table>
<tr><th>n</th><th>이름</th><th>특성</th></tr>
<tr><td>1</td><td>TD(0)</td><td>Bias 높음, Variance 낮음</td></tr>
<tr><td>중간</td><td>n-step TD</td><td>둘 사이 타협</td></tr>
<tr><td>$\\infty$</td><td>MC</td><td>Bias 낮음 (0), Variance 높음</td></tr>
</table>

<p><strong>n이 커질수록</strong> Bias↓, Variance↑. MDP에 따라 적절한 $n$ 선택이 중요.</p>

<h2>8. TD(0) Prediction 코드 (실행 가능)</h2>

${pyCode(`"""
============================================================
 Temporal Difference (TD) Prediction — TD(0)  (Ch6)
============================================================
◎ 핵심 아이디어
   "추측을 추측으로 업데이트 (update a guess towards a guess)"
   MC처럼 에피소드 끝까지 기다리지 않고 한 스텝마다 즉시 업데이트.

◎ 업데이트 규칙
   V(S_t) ← V(S_t) + α · ( R_{t+1} + γ·V(S_{t+1}) - V(S_t) )
                         └────────  TD Target ─────────┘
                         └──────── TD Error (δ_t) ──────────┘

◎ MC와의 차이는 타깃 한 줄
   MC : V(S_t) ← V(S_t) + α · (G_t - V(S_t))
   TD : V(S_t) ← V(S_t) + α · (R_{t+1} + γ·V(S_{t+1}) - V(S_t))
        └ G_t 전체 대신 "한 스텝 실제 + 이후 추정"을 사용 ─┘

◎ 중요한 성질
   ① 한 스텝마다 업데이트 (online)
   ② Non-terminating MDP에도 사용 가능 ⚑ MC와 결정적 차이
   ③ Biased (V(s')가 추정값이라 target도 추정)
   ④ Variance 작다 (한 스텝만 샘플링)
   ⑤ Bootstrapping 함 (추정값을 target에 사용)

◎ 0단계 Bellman Expectation 식의 샘플 버전이기도 함:
   v_π(s_t) = E[r_{t+1} + γ·v_π(s_{t+1})]
   ↓ 기댓값 → 샘플 평균
   V(s_t) ≈ R_{t+1} + γ·V(s_{t+1}) (여러 번 모으면 수렴)
============================================================
"""
import numpy as np, random

ROWS, COLS = 4, 4
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]

class GridWorld:
    """Ch5와 동일한 환경. Model-free 상황이라 Agent는 MDP 구조를 모름."""
    def reset(self):
        self.s = (0, 0)
        return self.s
    def step(self, a_idx):
        r, c = self.s
        dr, dc = ACTIONS[a_idx]
        nr, nc = r + dr, c + dc
        if not (0 <= nr < ROWS and 0 <= nc < COLS):
            nr, nc = r, c
        self.s = (nr, nc)
        done = self.s in TERMINAL
        return self.s, -1, done

def td0_prediction(n_episodes=50000, alpha=0.01, gamma=1.0):
    """
    n_episodes : 에피소드 수
    alpha      : 학습률. TD는 분산이 작아 MC보다 더 크게 잡아도 됨
                 (MC는 1e-4, TD는 1e-2 정도가 실험적 통용값)
    gamma      : 감쇄
    """
    env = GridWorld()
    V = np.zeros((ROWS, COLS))                   # v_π의 추정 테이블

    for ep in range(n_episodes):
        s = env.reset()
        done = False

        # ========== 에피소드 진행 중 실시간 업데이트 ==========
        # MC와 다르게 history를 따로 저장하지 않음.
        # 스텝 하나 끝날 때마다 V(s)가 즉시 갱신됨.
        while not done:
            a = random.randint(0, 3)             # uniform random π
            s_next, r, done = env.step(a)

            # === 🔑 TD(0) 업데이트 식 ===
            # target = R + γ·V(s')
            # error  = target - V(s)
            # 한 스텝 안에 '실제 보상 R' + '학습 중인 V(s')'를 바로 사용
            V[s] = V[s] + alpha * (r + gamma * V[s_next] - V[s])
            #              └────────────── TD target ─────────┘
            #     └────────────── TD error · α ──────────────────┘

            s = s_next                           # 다음 스텝으로

            # ⚑ 주의: terminal에 도달하면 env가 done=True 반환.
            #   그 시점 V[s_next]는 학습 중인 값이지만, 관례적으로
            #   terminal의 V는 0으로 유지되므로 그대로 써도 OK.

    return V

# =============== 실행 ===============
V = td0_prediction()
print("TD(0) estimate of v_π (uniform random):")
print(np.round(V, 1))
# ⚑ MC 결과와 근사하게 같은 값에 수렴 (같은 v_π를 추정하므로)
#   다만 TD는 수렴 속도가 다르고, 중간 과정에서 bias 있음`, { title: "TD(0) Prediction" })}

<p>MC와 비교해보세요 (위 코드 복사 + 같은 폴더의 MC 코드):</p>
<ul>
  <li>MC는 에피소드 끝난 뒤 <code>history</code>를 backward로 돌며 업데이트</li>
  <li>TD는 각 스텝마다 <u>즉시</u> 업데이트 (<code>history</code> 불필요)</li>
  <li>$\\alpha$가 MC보다 크게 설정 가능 (TD가 variance 작으니까)</li>
  <li>수렴 결과는 이론적으로 동일 $v_\\pi$</li>
</ul>

<p>MC와 비교:</p>
<ul>
  <li>MC는 에피소드 끝난 뒤 <code>history</code>를 backward로 돌며 업데이트</li>
  <li>TD는 각 스텝마다 <u>즉시</u> 업데이트 (<code>history</code> 필요 없음)</li>
  <li>$\\alpha$ 값이 MC보다 크게 설정 가능 (TD가 variance 작으니까)</li>
</ul>

<h2>9. 퀴즈 — 개념 확인</h2>

${mcQuiz(
  "TD의 한 문장 요약은?",
  [
    "끝까지 기다려 진짜 리턴으로 업데이트",
    "<strong>추측을 추측으로 업데이트</strong> (update a guess towards a guess)",
    "정확한 MDP 파라미터가 필요",
    "에피소드 마다 한 번씩 업데이트"
  ],
  1,
  "TD의 본질: target $R + \\gamma V(s')$에 학습 중인 $V$가 들어가 있음 = 추측. 그 추측을 바탕으로 현재 $V$를 당기는 것."
)}

${mcQuiz(
  "MC와 TD의 Bias/Variance 특성을 올바르게 짝지은 것은?",
  [
    "MC: high variance, zero bias / TD: low variance, some bias",
    "MC: low variance, zero bias / TD: high variance, some bias",
    "둘 다 unbiased, variance만 다름",
    "둘 다 biased, 차이 없음"
  ],
  0,
  "MC는 실제 $G_t$의 평균이라 unbiased지만 경로 전체의 확률이 쌓여 high variance. TD는 한 스텝만 봐서 low variance지만 target에 추정값 섞여 biased. <strong>전형적 bias-variance tradeoff</strong>."
)}

${mcQuiz(
  "Bootstrapping의 정의로 맞는 것은?",
  [
    "샘플로 기댓값 근사",
    "업데이트할 때 <strong>추정값</strong>을 사용",
    "에피소드를 끝까지 돌리기",
    "Markov Property 이용"
  ],
  1,
  "Bootstrapping = 업데이트에 현재 추정치를 사용. DP와 TD는 bootstrap, MC는 안 함. Sampling은 샘플 사용. MC와 TD는 sample, DP는 안 함 (모든 분기 다 보니까)."
)}

${mcQuiz(
  "n-step TD에서 $n = \\infty$이면?",
  [
    "발산한다",
    "DP와 같아진다",
    "<strong>MC와 같아진다</strong> (끝까지 감)",
    "동작하지 않는다"
  ],
  2,
  "$G_t^{(n)}$의 $n$을 늘리면 뒤쪽 bootstrap항이 사라지고 실제 보상만 남음. $n = \\infty$는 에피소드 끝까지 = MC."
)}

${mcQuiz(
  "같은 Grid World에 DP, MC, TD를 적용했을 때 최종 수렴값은?",
  [
    "세 방법 모두 다름",
    "MC와 TD만 같고 DP는 다름",
    "<strong>세 방법 모두 (이론적으로) 같은 $v_\\pi$로 수렴</strong>",
    "DP가 가장 정확하고 나머지는 근사"
  ],
  2,
  "세 방법 모두 $v_\\pi$를 추정하는 서로 다른 방식일 뿐, 무한히 반복하면 이론적으로 같은 값에 수렴. Grid World 실험에서 MC와 DP 결과가 거의 같게 나오는 이유 (-59, -57, ...)."
)}

<h2>10. 이 장 요약 + 다음 장 예고</h2>

${note(`
<strong>✓ Ch 6에서 가져가야 할 것:</strong><br>
① TD(0) 업데이트식과 TD target, TD error 정의 ② MC vs TD 비교표 (bias/variance, 학습시점, 에피소드 종료 여부) ③ Bootstrapping과 Sampling 정의 ④ DP/MC/TD 통합 뷰 ⑤ n-step TD 바이어스/분산 스펙트럼.
`, "tip")}

${note(`
<strong>📖 Ch 7 예고:</strong> 지금까지는 <em>Prediction</em>(정책이 주어졌을 때 $v$ 구하기)만 했어요. 이제 <em>Control</em>(최적 정책 찾기)를 Model-free로 할 차례.<br>
핵심 아이디어 3개: ① $v$ 대신 $q$ 사용 ② Evaluation에 MC/TD 사용 ③ Greedy 대신 $\\epsilon$-greedy. 이걸 조합하면 <strong>MC Control, SARSA, Q-Learning</strong>이 나옵니다. 모두 다음 장에서.
`)}
`);
