registerPage("ch4-dp", "Ch 4. Dynamic Programming", () => `
<h1>Ch 4 — MDP 알 때 Planning (Dynamic Programming)</h1>
<p class="lead">${term("mdp", "MDP")}의 $r_s^a, P_{ss'}^a$를 <strong>완전히 알 때</strong>, ${term("bellman-expectation", "Bellman 식")}을 반복 적용해서 문제를 푸는 방법. 환경에서 실제로 움직이지 않고 <strong>머릿속 계산만으로</strong> 정답을 찾아요.</p>

${note(`
<strong>📖 Ch 3 복습:</strong> Bellman 2단계 식 $v_\\pi(s) = \\sum_a \\pi(a|s)\\bigl(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s')\\bigr)$. 환경 파라미터를 아니까 <u>기댓값 없이 직접 계산 가능</u>. "이 식을 어떻게 실제로 푸냐"가 이번 장.
`, "tip")}

${prereq("DP(Dynamic Programming)가 뭐였더라?", `
  <p><strong>다이나믹 프로그래밍</strong>은 수업 바깥에서 먼저 나온 일반 알고리즘 기법이에요. 알고리즘 시간에 배운 분들도 있을 것.</p>
  <ul>
    <li><strong>큰 문제</strong>를 <strong>작은 부분 문제</strong>로 쪼개고</li>
    <li>부분 문제의 해를 <strong>테이블(캐시)</strong>에 저장해두고</li>
    <li>같은 부분 문제가 다시 나오면 다시 계산하지 않고 테이블에서 꺼내 씀</li>
  </ul>
  <p>대표 예시: 피보나치 수열 (<code>fib(n) = fib(n-1) + fib(n-2)</code>), 최단 경로 (Bellman-Ford, Floyd-Warshall), 배낭 문제 등.</p>
  <p>강화학습에서의 DP도 같은 철학입니다. "상태의 가치"라는 부분 문제 해를 테이블(V 또는 Q)에 저장하고, Bellman 식으로 서로를 계산.</p>
  <p>참고: <u>DP라는 이름을 만든 사람</u>(Richard Bellman)과 <u>Bellman Equation을 만든 사람</u>이 <strong>동일인</strong>입니다. 놀라운 사실이 아니라 당연한 말일 수 있는데, 강화학습에서 DP와 Bellman이 자연스럽게 엮이는 이유가 여기 있어요.</p>
`)}

<h2>1. ⚑ 언제 DP를 쓸 수 있나? — 시험 핵심</h2>

${note(`
<strong>⚑ 교수님 직접 강조 (0414-1 녹음):</strong><br>
"다이나믹 프로그램은 어느 때 쓴다고 그랬죠? <strong>그 어느 때 쓴다라는 거를 알고 있어야 돼요.</strong> 아무 때나 쓰는 게 아니라 MDP 문제여야 되고, 벨만 이큐에이션을 써야 되는데 그러려면 이런 문제여야 된다. <u>디컴포지션이 돼야 되고</u>, 또 하나는 <u>리컬시브한 문제로 서브 프라그램이 같은 리컬시브 문제로 정의될 수 있어야 된다</u>. 이 두 가지예요."
`, "warn")}

${defCard("DP가 가능한 3 조건", `
<ol>
  <li><strong>MDP를 안다</strong> — 상태 전이확률 $P_{ss'}^a$와 보상 함수 $r_s^a$를 알고 있어야 함. 이게 없으면 Bellman 2단계 식의 우변을 계산 못 하니까 DP 자체가 불가능. <em>모르면 → Ch 5~7 (${term("model-free", "Model-free")})</em></li>
  <li><strong>Decomposition</strong> — 전체 문제를 작은 부분 문제로 쪼갤 수 있어야 함. ${term("mdp", "MDP")}는 ${term("markov-property", "Markov Property")} 덕분에 "현재 상태의 가치 = 다음 상태들의 가치의 함수"로 쪼개짐 → ✓</li>
  <li><strong>Recursive</strong> — 부분 문제가 원래 문제와 <u>같은 형태</u>로 재귀적으로 정의돼야 함. Bellman Equation이 바로 이 재귀식 → ✓</li>
</ol>
`)}

${concept("📐 왜 MDP에서 decomposition + recursive가 저절로 성립하나?", `
  <p>핵심은 ${term("markov-property", "Markov Property")}: $P(s_{t+1} | s_t) = P(s_{t+1} | s_1, \\dots, s_t)$. 미래가 <strong>현재 상태만으로</strong> 결정되니까:</p>
  <ul>
    <li>"$s$에서 시작한 문제" = "다음 상태 $s'$에서 시작한 문제들"의 조합 ← <strong>Decomposition</strong></li>
    <li>"$s$에서 시작한 문제"를 풀려면 "$s'$에서 시작한 문제"를 풀어야 하고, 그건 또 같은 종류의 문제 ← <strong>Recursive</strong></li>
  </ul>
  <p>수식으로 정확히 적은 게 ${term("bellman-expectation", "Bellman Expectation Equation")}:
  $$v_\\pi(s) = \\sum_a \\pi(a|s)\\bigl(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a \\underbrace{v_\\pi(s')}_{\\text{더 작은 문제의 해}}\\bigr)$$</p>
  <p>즉 "MDP의 Bellman Eq가 재귀 정의"라는 사실 자체가 두 조건을 모두 담고 있어요. 그래서 MDP + Bellman이면 자동으로 DP 가능.</p>
`)}

<h2>2. DP로 풀 수 있는 문제 — ${term("prediction-vs-control", "Prediction vs Control")}</h2>

<table>
<tr><th>문제 종류</th><th>묻는 것</th><th>쓰는 Bellman 식</th><th>알고리즘</th></tr>
<tr><td><strong>Prediction</strong></td><td>$\\pi$ 주어짐 → $v_\\pi$는?</td><td>Expectation</td><td>Iterative Policy Evaluation</td></tr>
<tr><td><strong>Control</strong></td><td>최적 $\\pi_*, v_*$는?</td><td>Expectation + Greedy</td><td>Policy Iteration</td></tr>
<tr><td><strong>Control</strong></td><td>최적 $\\pi_*, v_*$는?</td><td>Optimal (max)</td><td>Value Iteration</td></tr>
</table>

${note(`
순서대로 익히면 됩니다: <strong>Iterative Policy Evaluation</strong> (Prediction의 기본) → <strong>Policy Iteration</strong> (Evaluation에 greedy 개선 추가) → <strong>Value Iteration</strong> (max로 간결화).
`)}

<h2>3. Iterative Policy Evaluation (Prediction)</h2>

${defCard("업데이트 규칙", `
정책 $\\pi$가 주어질 때 $v_\\pi(s)$를 <strong>반복적으로</strong> 구하는 알고리즘. ${term("bellman-expectation", "Bellman Expectation 2단계 식")}을 <u>대입 업데이트</u>로 사용:
$$\\boxed{v_{k+1}(s) \\leftarrow \\sum_a \\pi(a|s) \\left( r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_k(s') \\right)}$$
`)}

${breakdown({
  symbols: `<ul>
    <li>$v_k(s)$ — <strong>$k$번째 반복</strong>에서 테이블에 저장된 상태 $s$의 값</li>
    <li>$v_{k+1}(s)$ — 새로 계산해서 덮어쓸 값 (좌변)</li>
    <li>$\\pi(a|s), r_s^a, P_{ss'}^a$ — 모두 알고 있는 파라미터 (정책 + 환경)</li>
    <li>$\\gamma$ — 감쇄 인자</li>
  </ul>`,
  combinations: `<ul>
    <li>우변은 Bellman Expectation 2단계 식과 동일한데, $v_\\pi(s')$ 대신 <u>이전 반복의 $v_k(s')$</u>를 재료로 씀</li>
    <li>전체 반복: $v_0 \\to v_1 \\to v_2 \\to \\cdots \\to v_\\infty$</li>
    <li>"현재 테이블의 $v_k(s')$ 값들로 우변 계산 → 그걸 $v_{k+1}(s)$로 저장" — 한 번의 스윕이 한 iteration</li>
  </ul>`,
  whole: `"Bellman eq의 <strong>다음 상태 가치 자리</strong>를 <strong>이전 반복의 테이블 값</strong>으로 대체해서 반복하면, 결국 진짜 $v_\\pi$로 수렴한다."<br>
  수식으로는 $v = \\mathcal{T}^\\pi v$(Bellman operator) 의 고정점을 찾는 것과 같음.`
})}

${concept("🔬 왜 수렴하나? — Banach Fixed-Point의 직관", `
  <p>Bellman operator $\\mathcal{T}^\\pi$는 <strong>$\\gamma$-contraction</strong>입니다. 즉 두 value function의 거리를 $\\gamma$배로 줄여요:</p>
  $$\\|\\mathcal{T}^\\pi v - \\mathcal{T}^\\pi u\\|_\\infty \\le \\gamma \\|v - u\\|_\\infty$$
  <p>어떤 초기값 $v_0$에서 시작해도 반복하면 거리가 매 스텝 $\\gamma$배씩 줄어듦 → 유일한 고정점에 기하급수적으로 수렴. 그 고정점이 바로 $v_\\pi$.</p>
  <p>$\\gamma = 1$이어도 에피소드가 반드시 종료되는 MDP (proper policy)면 수렴. Grid World처럼 terminal state가 있으면 OK.</p>
`)}

<h3>🎮 직접 돌려보기 — Grid World Iterative Policy Eval</h3>

<p>설정: 4×4 격자, 우하단 (3,3)이 terminal, 매 스텝 보상 $r = -1$, $\\gamma = 1$, 정책은 4방향 uniform random $\\pi(a|s) = 0.25$. 벽 밖으로 가려고 하면 제자리.</p>

${gridWorld({
  title: "Iterative Policy Evaluation (4×4, uniform π)",
  rows: 4, cols: 4,
  reward: -1, gamma: 1,
  terminal: [[3, 3]],
  initialValue: 0,
  algorithm: "policy-eval"
})}

${note(`
<strong>써보는 법:</strong><br>
① <strong>▶ 1 iter</strong>를 눌러 한 스텝씩 진행 — 모든 셀이 한 번씩 업데이트됨<br>
② 아무 셀이나 <strong>클릭</strong>하면 그 셀의 Bellman 업데이트가 오른쪽에 <u>현재 $v$값이 대입된 실제 수치</u>로 나타남<br>
③ <strong>▶▶ 수렴까지</strong>는 $|v_{k+1}-v_k| < 10^{-4}$까지 자동 반복<br>
<br>
$v_1$에서 모든 내부 셀이 $-1.0$이 되는 이유? 모든 $v_0 = 0$이니까 $r = -1$만 남아서. $v_2$부터 terminal 근처 셀부터 값이 달라지기 시작 — 수식을 클릭해서 확인!
`, "tip")}

${pyCode(`"""
============================================================
 Iterative Policy Evaluation  (Ch4 — Prediction)
============================================================
◎ 하고 싶은 것
   주어진 정책 π가 각 상태에서 얼마나 좋은지 (v_π(s)) 계산.

◎ 업데이트 규칙 (Bellman Expectation Eq 2단계)
   v_{k+1}(s) ← Σ_a π(a|s) · ( r_s^a + γ · Σ_s' P_ss'^a · v_k(s') )

◎ 왜 "Iterative"?
   v_π를 직접 풀 수 없으니 (무한 재귀) 초기값에서 시작해
   위 식을 "대입"하며 반복 → 고정점에 수렴 (Banach contraction).

◎ 전제
   MDP를 완전히 안다 (r_s^a, P_ss'^a 알고 있음).
   여기서는 결정적 전이 + uniform π라 매우 단순해짐.
============================================================
"""
import numpy as np

# ---------------- 환경 상수 ----------------
ROWS, COLS = 4, 4
GAMMA      = 1.0                   # 감쇄 인자. 에피소드가 종료되는 문제라 1.0도 OK
REWARD     = -1                    # 매 스텝 -1 (빨리 terminal로 가란 의미)
TERMINAL   = {(3, 3)}              # 우하단만 terminal (도달하면 에피소드 종료)
ACTIONS    = [(-1, 0),             # ↑ (row-1)
              ( 1, 0),             # ↓ (row+1)
              ( 0,-1),             # ← (col-1)
              ( 0, 1)]             # → (col+1)

def step(r, c, a):
    """
    (r,c)에서 액션 a를 적용했을 때 다음 상태 반환.
    grid 밖으로 나가려 하면 제자리 (Grid World 표준 규약).
    """
    nr, nc = r + a[0], c + a[1]
    if not (0 <= nr < ROWS and 0 <= nc < COLS):
        nr, nc = r, c              # 벽 → 제자리
    return nr, nc

def policy_eval(theta=1e-4, max_iter=1000):
    """
    theta   : 수렴 판정 임계값.  max_s |v_{k+1}(s) - v_k(s)| < theta 면 중단
    max_iter: 최대 반복 수 (안전장치)
    """
    # V는 v_π의 추정 테이블.  모두 0으로 초기화가 관례.
    # (다른 값으로 시작해도 수렴 보장되지만 terminal은 늘 0 유지해야 함)
    V = np.zeros((ROWS, COLS))

    for k in range(max_iter):                      # k = 0, 1, 2, ... iteration 번호
        delta = 0.0                                # 이번 iteration의 최대 변화량
        V_new = V.copy()                           # 🔑 Synchronous backup:
                                                   #    모든 s 업데이트 시 "이전 V_k"를 참조해야 함.
                                                   #    V_new에 쓰고 sweep 끝나면 V ← V_new.

        # ----- 한 sweep: 모든 상태를 훑으며 업데이트 -----
        for r in range(ROWS):
            for c in range(COLS):
                if (r, c) in TERMINAL:
                    continue                       # terminal은 v = 0 고정 (업데이트 X)

                # === Bellman Expectation Eq 2단계 우변 계산 ===
                # v(s) = Σ_a π(a|s) · (r_s^a + γ · Σ_s' P_ss'^a · v(s'))
                #
                # 이 환경에서는:
                #   - π(a|s) = 1/4  (uniform random 정책)
                #   - P_ss'^a = 1   (선택 방향으로 100% 이동)
                # 따라서 안쪽 Σ_s'는 단일 항 (step(r,c,a)로 바로 결정)
                v = 0.0
                for a in ACTIONS:                  # 4방향에 대해 가중합
                    nr, nc = step(r, c, a)
                    # π(a|s)=1/4 × (즉시 보상 + γ × 다음 상태 가치 v_k(s'))
                    v += 0.25 * (REWARD + GAMMA * V[nr, nc])

                V_new[r, c] = v                    # 새 테이블에 저장 (아직 V는 V_k 유지)
                delta = max(delta, abs(v - V[r, c]))  # 이번 셀의 변화량 갱신

        V = V_new                                  # sweep 끝 → V ← V_{k+1}

        # ----- 수렴 체크 -----
        # 모든 셀의 변화가 theta보다 작으면 사실상 고정점 도달
        if delta < theta:
            print(f"수렴: k = {k} iteration 만에 max 변화량 {delta:.6f}")
            break

    return V

# =============== 실행 ===============
V = policy_eval()
print("\\nv_π (uniform random policy):")
print(np.round(V, 1))
# 기대 결과: terminal(3,3)에서 멀수록 값이 음수로 더 크게 (평균 스텝 ↑)
# 좌상단 근처는 ~-59 정도, terminal 근처는 ~-14 정도 나옴.`, { title: "Iterative Policy Evaluation (Prediction)" })}

<h2>4. Greedy Policy Improvement</h2>

${defCard("Greedy Policy", `
$v_\\pi$를 구한 뒤, 각 상태에서 <strong>다음 상태 가치가 가장 높아지는 액션</strong>을 고르는 새 정책:
$$\\boxed{\\pi'(s) = \\arg\\max_a q_\\pi(s,a) = \\arg\\max_a \\left( r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s') \\right)}$$
`)}

${concept("📜 Policy Improvement Theorem", `
  <p>새 정책 $\\pi'$이 위처럼 greedy하게 만들어졌다면, 모든 상태에서 $v_{\\pi'}(s) \\ge v_\\pi(s)$가 <strong>수학적으로 보장</strong>됩니다.</p>
  <p><strong>증명 스케치</strong>: $\\pi'$의 정의에 의해 $q_\\pi(s, \\pi'(s)) \\ge v_\\pi(s)$. 양변에 $\\pi'$를 한 번 더 적용, $v_\\pi(s) \\le q_\\pi(s,\\pi'(s)) \\le \\mathbb{E}[r + \\gamma q_\\pi(s', \\pi'(s')) | s] \\le \\cdots \\le v_{\\pi'}(s)$.</p>
  <p><strong>따름정리</strong>: 만약 $\\pi' = \\pi$이면 (더 이상 개선 안 됨) $v_\\pi = v_*$ 이고 $\\pi = \\pi_*$. 이게 Policy Iteration의 종료 조건.</p>
`)}

<h2>5. Policy Iteration (Control #1)</h2>

${defCard("Policy Iteration", `
<ol>
  <li>초기 정책 $\\pi_0$ (예: uniform random)</li>
  <li><strong>Evaluation</strong>: Iterative Policy Eval로 $v_{\\pi_0}$ 계산</li>
  <li><strong>Improvement</strong>: $\\pi_1 \\leftarrow \\text{greedy}(v_{\\pi_0})$</li>
  <li>정책이 안 바뀔 때까지 2→3 반복. 끝나면 $\\pi_* = \\pi$.</li>
</ol>
`)}

<div style="text-align:center;margin:16px 0">
<svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:var(--bg-2);border:1px solid var(--border);border-radius:8px;padding:10px">
  <defs>
    <marker id="ar-pi" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
    </marker>
  </defs>
  <rect x="80" y="100" width="120" height="60" fill="none" stroke="#2563eb" stroke-width="2" rx="8"/>
  <text x="140" y="135" text-anchor="middle" font-weight="bold" fill="#2563eb" font-size="18">π</text>

  <rect x="300" y="100" width="120" height="60" fill="none" stroke="#b45309" stroke-width="2" rx="8"/>
  <text x="360" y="135" text-anchor="middle" font-weight="bold" fill="#b45309" font-size="18">$v_π$</text>

  <path d="M 200 115 Q 250 85 300 115" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-pi)"/>
  <text x="250" y="75" text-anchor="middle" font-size="13">Evaluation (v ← $v_π$)</text>

  <path d="M 300 145 Q 250 175 200 145" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#ar-pi)"/>
  <text x="250" y="195" text-anchor="middle" font-size="13">Improvement (π ← greedy)</text>

  <text x="250" y="240" text-anchor="middle" font-size="12" fill="#6b7280" font-style="italic">수렴할 때까지 반복 → $π_*$</text>
</svg>
</div>

${note(`
<strong>구조 특징</strong>: <u>외부 루프(개선) 안에 내부 루프(평가)</u>가 들어있어요. 내부 루프가 수렴까지 돌면 비싸므로, 실무에서는 내부 Eval을 <em>몇 번만</em> 돌리고 Improvement로 넘어가는 방식(<strong>Generalized Policy Iteration</strong>)이 일반적. 극단적으로 한 번만 돌리면 → Value Iteration.
`)}

${pyCode(`"""
============================================================
 Policy Iteration  (Ch4 — Control, DP #1)
============================================================
◎ 아이디어: 두 단계를 번갈아 반복
   (1) Evaluation:  현재 정책 π로 v_π 계산 (앞의 Iterative Policy Eval)
   (2) Improvement: v_π를 보고 greedy 정책 π' 생성
   (3) π가 더 이상 안 바뀌면 → π는 최적 정책 π*

◎ Policy Improvement Theorem
   π' = greedy(v_π) 로 만들면 v_{π'} ≥ v_π 가 수학적으로 보장됨.
   π' = π 인 순간이 수렴 지점 (v_π = v_*, π = π*).

◎ 구조적 특징
   외부 루프(improvement) 안에 내부 루프(evaluation) → 이중 루프.
   내부가 비싸므로 실무에선 Eval을 수렴까지 안 돌리고 몇 번만 → GPI.
============================================================
"""
import numpy as np

ROWS, COLS = 4, 4
GAMMA      = 1.0
REWARD     = -1
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]   # ↑ ↓ ← →

def step(r, c, a):
    """Grid World 전이. 벽에 부딪히면 제자리."""
    nr, nc = r + a[0], c + a[1]
    if not (0 <= nr < ROWS and 0 <= nc < COLS):
        nr, nc = r, c
    return nr, nc

# ------------------------------------------------------------
# (1) Evaluation 단계: Iterative Policy Evaluation
# ------------------------------------------------------------
def eval_policy(pi, theta=1e-4):
    """
    pi[(r,c)] : 상태별 정책. {action_idx: prob} 형태의 딕셔너리.
                 예) {0: 0.5, 2: 0.5} → ↑와 ← 중 각 50% 선택
    """
    V = np.zeros((ROWS, COLS))
    while True:                                    # 수렴할 때까지 반복
        delta = 0.0
        V_new = V.copy()                           # Synchronous backup
        for r in range(ROWS):
            for c in range(COLS):
                if (r, c) in TERMINAL:
                    continue
                # Bellman Expectation: v(s) = Σ_a π(a|s) · (r + γ·v(s'))
                v = 0.0
                for ai, a in enumerate(ACTIONS):
                    p = pi[(r, c)].get(ai, 0.0)    # 이 액션을 취할 확률
                    if p == 0:                     # 0이면 기여 없음 → skip
                        continue
                    nr, nc = step(r, c, a)
                    v += p * (REWARD + GAMMA * V[nr, nc])
                V_new[r, c] = v
                delta = max(delta, abs(v - V[r, c]))
        V = V_new
        if delta < theta:
            return V                               # v_π 반환

# ------------------------------------------------------------
# (2) Improvement 단계: v에서 greedy 정책 추출
# ------------------------------------------------------------
def greedy_from(V):
    """
    각 상태에서 q(s, a) = r + γ·v(s') 를 계산한 뒤 argmax 선택.
    동점이 있으면 동점 액션들에 확률 균등 분배 (tie-breaking).
    """
    pi = {}
    for r in range(ROWS):
        for c in range(COLS):
            if (r, c) in TERMINAL:
                pi[(r, c)] = {}                    # terminal은 정책 없음
                continue

            # 이 상태에서 가능한 4가지 액션의 q값
            qs = []
            for a in ACTIONS:
                nr, nc = step(r, c, a)
                qs.append(REWARD + GAMMA * V[nr, nc])   # q(s,a) 후보

            best = max(qs)                         # 최대 q값
            # 동점 액션 인덱스 모음 (float 비교이므로 epsilon 사용)
            bests = [i for i, q in enumerate(qs) if abs(q - best) < 1e-9]
            prob  = 1.0 / len(bests)               # 동점 개수만큼 분배
            pi[(r, c)] = {i: prob for i in bests}
    return pi

# ------------------------------------------------------------
# 초기 정책: uniform random (4방향 각 25%)
# ------------------------------------------------------------
pi = {(r, c): {0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25}
      for r in range(ROWS) for c in range(COLS)}

# ------------------------------------------------------------
# Policy Iteration 외부 루프
# ------------------------------------------------------------
for it in range(100):
    V      = eval_policy(pi)                      # (1) 평가
    new_pi = greedy_from(V)                       # (2) 개선
    if new_pi == pi:                              # (3) 변화 없음 → 수렴
        print(f"수렴: iteration = {it} (π가 더 이상 안 바뀜)")
        break
    pi = new_pi                                   # 다음 반복을 위해 교체

print("\\nv_{π*} (under optimal policy):")
print(np.round(V, 1))
# 이 결과의 V값은 Iterative Policy Eval의 -59 계열이 아닌
# 더 작은 음수 (평균 스텝이 짧기 때문)`, { title: "Policy Iteration (Control)" })}

<h2>6. Value Iteration (Control #2)</h2>

${defCard("Value Iteration", `
${term("bellman-optimal", "Bellman Optimal Eq")}를 반복 대입해서 $v_*$를 바로 찾는 방법. <em>명시적 정책 없음</em>:
$$\\boxed{v_{k+1}(s) \\leftarrow \\max_a \\left[ r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_k(s') \\right]}$$
수렴 후 $\\pi_*(s) = \\arg\\max_a q_*(s,a)$로 최종 정책 추출.
`)}

${breakdown({
  symbols: `<ul>
    <li>$v_k(s')$ — 이전 반복의 테이블 값 (최적값 추정 진행 중)</li>
    <li>$\\max_a$ — 모든 액션 중 대괄호 안 값이 가장 큰 것을 선택</li>
    <li>대괄호 안 — 액션 $a$ 한 번 썼을 때 "즉시 보상 + 감쇄된 다음 상태 가치 기댓값"</li>
  </ul>`,
  combinations: `<ul>
    <li>각 액션 $a$마다 대괄호 안 값(= $q$ 후보) 계산</li>
    <li>그중 최댓값 채택 → <u>"최선을 다했을 때의 가치"</u></li>
    <li>정확히 Bellman Optimal 2단계 식의 우변. 그걸 그대로 $v_{k+1}$에 저장</li>
  </ul>`,
  whole: `"각 상태마다 '<strong>가장 좋은 액션의 결과</strong>'를 테이블에 계속 써넣으며 반복"하면 $v_*$에 수렴. Policy Iteration과 달리 <u>정책을 명시적으로 유지하지 않음</u>. $\\max_a$가 "최선 액션 선택"이라는 greedy를 <strong>매 업데이트에 내재</strong>.`
})}

<h3>🎮 직접 돌려보기 — Value Iteration (같은 grid)</h3>

${gridWorld({
  title: "Value Iteration (4×4, Bellman Optimal)",
  rows: 4, cols: 4,
  reward: -1, gamma: 1,
  terminal: [[3, 3]],
  initialValue: 0,
  algorithm: "value-iter"
})}

${note(`
<strong>관찰 포인트:</strong><br>
① 같은 grid인데 수렴 값이 <u>완전히 달라짐</u>. Policy Eval에서는 $v_\\pi \\approx -50, -60$까지 내려가지만, Value Iter의 $v_*$는 각 셀에서 <u>최단 거리</u>와 같은 값 (terminal까지의 맨해튼 거리의 음수).<br>
② 수렴에 필요한 iteration 수가 훨씬 적음 (보통 6회 정도).<br>
③ <strong>우하단 각 셀에 화살표</strong>가 나타남 → 현재 V 기준의 greedy 액션. 수렴 후 이게 $\\pi_*$.<br>
④ 셀 클릭 시 max가 어떻게 계산되는지 실제 수치로 볼 수 있음 (best action도 표시).
`, "tip")}

${pyCode(`"""
============================================================
 Value Iteration  (Ch4 — Control, DP #2)
============================================================
◎ 아이디어
   Policy Iteration과 달리 "정책"을 명시적으로 유지하지 않는다.
   Bellman Optimal Eq 2단계 식을 그대로 반복 적용 → v* 바로 수렴.

◎ 업데이트 규칙 (Bellman Optimal Eq 2단계)
   v_{k+1}(s) ← max_a [ r_s^a + γ · Σ_s' P_ss'^a · v_k(s') ]

   ⚑ Expectation Eq와 단 하나 차이:  Σ_a π(a|s)  →  max_a
     → 이 max가 "greedy policy"를 내재적으로 수행.

◎ 최종 단계
   수렴 후 π*(s) = argmax_a [r + γ·Σ v*(s')]로 정책 추출.

◎ 구조적 특징
   한 종류 업데이트 (정책 개선 내포) → 이터레이션당 비용 ↓
   하지만 수렴까지 이터레이션 수 ↑ 경향.
============================================================
"""
import numpy as np

ROWS, COLS = 4, 4
GAMMA      = 1.0
REWARD     = -1
TERMINAL   = {(3, 3)}
ACTIONS    = [(-1, 0), (1, 0), (0, -1), (0, 1)]
SYM        = ['↑', '↓', '←', '→']                 # 화살표 기호 (표시용)

def step(r, c, a):
    nr, nc = r + a[0], c + a[1]
    if not (0 <= nr < ROWS and 0 <= nc < COLS):
        nr, nc = r, c                              # 벽 → 제자리
    return nr, nc

def value_iteration(theta=1e-4, max_iter=1000):
    """
    Bellman Optimal Eq 2단계 식을 반복 적용해서 v* 찾기.
    """
    V = np.zeros((ROWS, COLS))                     # v*의 추정. 0으로 초기화.

    for k in range(max_iter):
        delta = 0.0
        V_new = V.copy()                           # Synchronous backup

        for r in range(ROWS):
            for c in range(COLS):
                if (r, c) in TERMINAL:
                    continue                       # terminal은 v = 0 고정

                # === 각 액션의 q값 후보 계산 ===
                # q(s,a) = r_s^a + γ · Σ_s' P_ss'^a · v_k(s')
                # 이 환경은 deterministic이라 Σ_s'는 한 항만 남음
                qs = []
                for a in ACTIONS:
                    nr, nc = step(r, c, a)
                    qs.append(REWARD + GAMMA * V[nr, nc])   # q 후보 4개

                # === 🔑 핵심: max 적용 (Bellman Optimal) ===
                # Expectation Eq은 Σ_a π(a|s)·qs[a]
                # Optimal Eq은 max(qs) — "최선을 다했다 치고"
                V_new[r, c] = max(qs)

                delta = max(delta, abs(V_new[r, c] - V[r, c]))

        V = V_new
        if delta < theta:
            print(f"수렴: k = {k} iteration")
            break

    return V

def extract_policy(V):
    """
    수렴된 V로부터 최적 정책 π*(s) = argmax_a q*(s,a) 추출.
    학습 중에는 정책이 없다가, 마지막에 한 번 계산.
    """
    pi = np.full((ROWS, COLS), '·', dtype=object)
    for r in range(ROWS):
        for c in range(COLS):
            if (r, c) in TERMINAL:
                pi[r, c] = 'T'                     # terminal 표시
                continue
            qs = []
            for a in ACTIONS:
                nr, nc = step(r, c, a)
                qs.append(REWARD + GAMMA * V[nr, nc])
            pi[r, c] = SYM[int(np.argmax(qs))]     # argmax → 화살표
    return pi

# =============== 실행 ===============
V = value_iteration()
print("V*:")
print(np.round(V, 1))
# 기대 결과: terminal까지의 맨해튼 거리의 음수 (최단 경로 비용)
# 예: (0,0)에서 (3,3)까지 맨해튼 = 6, 따라서 V*[0,0] = -6

print("\\nπ*:")
print(extract_policy(V))
# 모든 셀의 화살표가 terminal(3,3)로 향하는 최적 방향을 가리킴`, { title: "Value Iteration (Control)" })}

<h2>7. Policy Iteration vs Value Iteration</h2>

<table>
<tr><th></th><th>Policy Iteration</th><th>Value Iteration</th></tr>
<tr><td>사용 식</td><td>Bellman <strong>Expectation</strong> Eq</td><td>Bellman <strong>Optimal</strong> Eq</td></tr>
<tr><td>구조</td><td>Eval (내부 루프) + Improvement</td><td>한 종류 업데이트만</td></tr>
<tr><td>명시적 정책</td><td>매 iteration마다 존재</td><td>없음 (최종에 추출)</td></tr>
<tr><td>한 번 업데이트의 의미</td><td>정확한 $v_\\pi$ 얻기 (이중 반복 필요)</td><td>$v$ 한 번 업데이트 = 정책 개선 효과 포함</td></tr>
<tr><td>이터레이션당 비용</td><td>Eval 내부 루프 때문에 비쌈</td><td>저렴</td></tr>
<tr><td>수렴까지 iteration 수</td><td>적음 (정책이 빨리 고정)</td><td>많을 수 있음</td></tr>
</table>

${concept("🤔 결과가 같은데 왜 두 개를 배우나?", `
  <p>둘 다 $v_*$, $\\pi_*$로 수렴합니다. 차이는 <strong>iteration당 비용 vs iteration 수</strong>의 trade-off.</p>
  <ul>
    <li>Policy Iter: 매 iter 비쌈, iter 수 적음</li>
    <li>Value Iter: 매 iter 저렴, iter 수 많음</li>
  </ul>
  <p>실무에서는 중간: <strong>Generalized Policy Iteration (GPI)</strong> — Eval을 수렴까지 돌리지 말고 몇 번만 돌리고 바로 Improvement. Sutton 교재에서 프리 RL의 거의 모든 알고리즘이 GPI의 변형이라 말합니다.</p>
`)}

<h2>8. Synchronous vs Asynchronous DP</h2>

${note(`
<strong>Synchronous DP</strong> (지금까지 우리가 본 것) — 한 iteration에 <u>모든 상태</u>를 한 번씩 업데이트. 단순하지만 상태 공간이 $10^{170}$ 체스판이면 비현실적.<br>
<strong>Asynchronous DP</strong> — 상태를 하나씩(또는 일부만) 골라 업데이트. 전체 상태가 <u>무한 반복 시 결국 모두 방문</u>되면 수렴 보장. 계산량 대폭 절감, 실제 Deep RL의 online 업데이트에 가까워짐.
`, "tip")}

${concept("Asynchronous DP의 세 가지 아이디어", `
  <ul>
    <li><strong>In-place DP</strong>: $v_{k+1}$ 별도 배열 안 만들고, 업데이트를 $v$에 곧바로 덮어쓰기. 최근 업데이트된 값을 같은 iteration 안에서 재사용 → 수렴이 더 빠를 수 있음</li>
    <li><strong>Prioritised Sweeping</strong>: Bellman error가 큰 상태부터 먼저 업데이트</li>
    <li><strong>Real-time DP</strong>: Agent가 실제로 방문한 상태만 업데이트 → 방문 가능성 낮은 구석 상태에 시간 낭비 안 함</li>
  </ul>
`)}

<h2>9. 📍 수식 지도 — 이 장 전체 연결</h2>

${note(`
한 장으로 정리하면:<br>
① Bellman 2단계 <strong>Expectation Eq</strong>를 반복 대입 → <u>Iterative Policy Evaluation</u> (${term("prediction-vs-control", "Prediction")} 완성)<br>
② ①의 결과를 greedy로 개선 → <u>Policy Iteration</u> (Control 방법 1)<br>
③ ①과 개선을 합쳐 <strong>Optimal Eq</strong> $\\max_a$로 표현 → <u>Value Iteration</u> (Control 방법 2)<br>
<br>
공통 구조: <strong>"Bellman Eq를 반복 대입한다"</strong>. 사용 식(Expectation vs Optimal)과 개선 포함 여부만 다름.
`, "tip")}

<h2>10. 퀴즈 — 개념 확인</h2>

${mcQuiz(
  "(⚑ 시험 직결) DP를 MDP 문제에 적용할 수 있는 조건은?",
  [
    "상태 공간이 유한하기만 하면 됨",
    "MDP를 알고(P, R), 문제가 <strong>decomposition</strong>되고 <strong>recursive</strong>하게 정의될 수 있어야 함",
    "정책이 stationary하기만 하면 됨",
    "γ가 1보다 작기만 하면 됨"
  ],
  1,
  "교수님이 녹음에서 직접 강조: '어느 때 쓴다라는 거를 알고 있어야 돼요'. MDP를 알고 있어야 Bellman 2단계 식 우변을 계산 가능, 그리고 decomposition + recursive 두 조건이 필요. MDP에서 이 두 조건은 Markov Property 덕분에 자동 성립."
)}

${mcQuiz(
  "Iterative Policy Evaluation은 어떤 Bellman 식을 업데이트 규칙으로 사용하나?",
  [
    "0단계 Bellman Expectation Eq",
    "<strong>2단계</strong> Bellman Expectation Eq",
    "2단계 Bellman Optimal Eq",
    "어느 것이든 OK"
  ],
  1,
  "환경 파라미터 $r_s^a, P_{ss'}^a$를 알 때 <u>기댓값 없이 직접 계산 가능한</u> 형태가 2단계 식. 0단계는 $\\mathbb{E}$ 형태라 직접 못 씀. Optimal Eq는 $\\max_a$라 정책 평가가 아닌 최적화용."
)}

${mcQuiz(
  "Policy Iteration과 Value Iteration의 <u>구조적</u> 차이는?",
  [
    "Policy Iteration은 내부에 Policy Evaluation 루프가 있고, Value Iteration은 없다",
    "Value Iteration은 더 많은 메모리를 쓴다",
    "Policy Iteration은 연속 상태 공간에서만 가능",
    "두 알고리즘은 완전히 동일하다"
  ],
  0,
  "Policy Iteration = 외부(개선) + 내부(평가)의 이중 루프. Value Iteration = $\\max$ 덕분에 한 종류 업데이트만. 결과는 같지만 구조가 다름."
)}

${mcQuiz(
  "Value Iteration이 <u>명시적 정책을 쓰지 않는</u> 이유는?",
  [
    "정책이 원래 필요 없어서",
    "$\\max_a$가 '가장 좋은 액션 선택'이라는 greedy policy 역할을 이미 하기 때문",
    "감쇄 인자 $\\gamma$ 때문",
    "MDP를 모르기 때문"
  ],
  1,
  "Value Iteration 업데이트의 $\\max_a$는 '그 상태에서 최선의 액션을 고름'과 동일. 별도 $\\pi$ 테이블 불필요. 수렴 후 $\\arg\\max$로 $\\pi_*$ 추출."
)}

${mcQuiz(
  "4×4 Grid World, uniform π, 보상 -1, γ = 1. 모든 $v_0 = 0$에서 Iterative Policy Eval 1회 후 terminal 바로 옆 상태(예: s14)의 $v_1$ 값은?",
  [
    "-1.0",
    "-0.75",
    "-1.25",
    "0.0"
  ],
  0,
  "$v_1(s) = \\sum_a 0.25 (r + \\gamma v_0(s'))$. 모든 $v_0 = 0$이라 방향 무관하게 $r = -1$만 남음: $4 \\times 0.25 \\times (-1) = -1$. $v_2$부터 terminal 근처 상태가 다른 값을 가지기 시작. 인터랙티브에서 셀 클릭해 확인 가능!"
)}

${mcQuiz(
  "다음 중 <strong>Asynchronous DP</strong>에 해당하는 아이디어가 아닌 것은?",
  [
    "In-place update (별도 배열 없이 곧바로 덮어쓰기)",
    "Prioritised sweeping (Bellman error 큰 상태 우선 업데이트)",
    "Real-time DP (에이전트가 방문한 상태만 업데이트)",
    "모든 상태를 매 iteration마다 한 번씩 균일하게 업데이트"
  ],
  3,
  "④는 Synchronous DP. Async는 상태 업데이트의 순서/빈도를 유연하게 가져가는 계열 — in-place, prioritised, real-time 셋이 대표."
)}

<h2>11. 이 장 요약 + Ch 5 예고</h2>

${note(`
<strong>✓ Ch 4에서 가져가야 할 것:</strong><br>
① <strong>DP 쓸 수 있는 조건 3개</strong>: MDP 알기 + decomposition + recursive (⚑ 시험)<br>
② Iterative Policy Eval = Bellman Expectation 2단계 식 반복 (Prediction)<br>
③ Greedy Policy Improvement + Policy Improvement Theorem<br>
④ Policy Iteration = Eval + Improvement 이중 반복 (Control)<br>
⑤ Value Iteration = Bellman Optimal 식 반복, 명시적 정책 없음 (Control)<br>
⑥ Sync vs Async DP의 차이와 Async 세 종류<br>
⑦ 파이썬 코드 3개 — 교수님이 "코드에 빈칸 뚫어놓고 채우기" 시험 가능성 명시 (0414-1 녹음)
`, "tip")}

${note(`
<strong>📖 Ch 5 예고:</strong> DP는 강력하지만 <u>$r_s^a, P_{ss'}^a$를 알아야만</u> 가능. 현실에서 자율주행 차의 교통 상태 전이확률을 어떻게 알겠어요? 그럼 모르면 어떻게 할까?<br>
→ <strong>${term("mc", "Monte Carlo")}</strong>: "일단 에피소드를 끝까지 돌려보고 실제 리턴 평균을 가치로 삼아라" (${term("model-free", "Model-free")}의 시작)<br>
→ <strong>${term("td", "Temporal Difference")}</strong>: "한 스텝만 가보고 이전 추정값으로 타깃을 만들어라" (bootstrap)<br>
→ 두 방법의 장단점 비교가 시험 포인트 (0414-1 녹음).
`)}
`);
