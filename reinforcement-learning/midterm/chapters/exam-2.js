registerPage("exam-2", "모의고사 2 (서술형)", () => `
<h1>📝 모의고사 2 — 서술형 (실전 포맷)</h1>
<p class="lead">교수님이 강의 중 명시적으로 언급한 출제 유형(MDP 정의, 유도, 코드 빈칸, 개념 설명)으로 구성. 실제 시험처럼 손으로 적으며 풀고 <strong>모범답안 숨긴 채</strong> 작성하세요.</p>

${note(`
<strong>💡 서술형 답안 작성 팁</strong><br>
① 수식은 가능하면 유도 과정 한두 줄이라도 써주세요 (교수님이 "식이 왜 그렇게 되는지 설명하라"고 하심).<br>
② 용어 정의를 먼저 쓰고 그 다음 본 답. "SARSA란 ... 이다. 따라서 ..."<br>
③ 예시 하나 드는 게 유리 — 개념형 문제는 예시 있으면 이해도 증명.
`, "tip")}

${examProblem({
  num: 1, points: 15, topic: "MDP 정의",
  statement: `아래 문제를 MDP $\\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle$로 정의하시오. 각 원소를 명확히 구분하고, 그 선택 이유를 한 줄씩 적으시오.`,
  koreanText: `<strong>문제 상황:</strong> 5×5 격자 도시의 자율주행 택시. 4개 픽업 지점 중 하나에서 승객을 태우고 4개 목적지 중 하나에 내려준다. 가능한 행동: 상하좌우 이동 + 픽업 + 드롭. 매 이동 보상 -1. 목적지에 승객 드롭 시 +20, 잘못된 위치 픽업/드롭 시 -10. 목적지 도착 시 에피소드 종료.`,
  answer: `<strong>$\\mathcal{S}$ (상태 집합)</strong>: (택시 x좌표, 택시 y좌표, 승객 위치, 목적지) 튜플.
<ul>
  <li>택시 위치: $5 \\times 5 = 25$</li>
  <li>승객 위치: 4 픽업지 중 하나 + 택시 안 = 5</li>
  <li>목적지: 4</li>
  <li><strong>총 $25 \\times 5 \\times 4 = 500$개</strong></li>
</ul>
$\\mathcal{S}$에 목적지를 포함해야 하는 이유: 같은 좌표·승객상태라도 목적지가 다르면 최적 액션이 다르므로.

<strong>$\\mathcal{A}$ (행동 집합)</strong>: $\\{$상, 하, 좌, 우, 픽업, 드롭$\\}$, 총 6개.

<strong>$\\mathcal{P}$ (전이 확률)</strong>:
<ul>
  <li>이동 액션: 선택한 방향 100%로 이동. 벽/경계면 만나면 제자리.</li>
  <li>픽업: 현재 좌표 = 승객 위치이면 승객을 택시 안으로, 아니면 상태 변화 없음.</li>
  <li>드롭: 택시 안에 승객 + 현재 좌표 = 목적지이면 종료, 아니면 위치에 승객 하차.</li>
</ul>
모두 결정적 (deterministic, 100%).

<strong>$\\mathcal{R}$ (보상함수)</strong>:
<ul>
  <li>이동 액션: 매 스텝 -1 (빨리 완료하란 신호)</li>
  <li>잘못된 픽업/드롭: -10</li>
  <li>목적지에 올바른 드롭: +20 및 종료</li>
</ul>

<strong>$\\gamma$ (감쇄 인자)</strong>: $0.99$ 제안. 에피소드가 끝나는 문제라 $\\gamma = 1$도 가능하지만, 수학적 안정성을 위해 $< 1$이 일반적.

<strong>[채점 기준]</strong> 5개 원소 각 3점, 합리적 이유 언급 시 가점.`
})}

${examProblem({
  num: 2, points: 10, topic: "Markov Property",
  statement: `Markov Property를 수식으로 쓰고, 한 문장으로 그 의미를 설명하고, 일상 예시 하나 드시오.`,
  answer: `<strong>수식:</strong>
$$\\mathbb{P}[S_{t+1} \\mid S_t] = \\mathbb{P}[S_{t+1} \\mid S_1, S_2, \\ldots, S_t]$$

<strong>의미:</strong> 미래 상태는 과거의 히스토리 전체가 아니라 오직 <u>현재 상태</u>에만 의존한다 (memoryless).

<strong>예시:</strong> 바둑에서 현재 반상 위의 돌 배치만 알면 다음 최선의 수를 결정할 수 있다. 돌들이 어떤 순서로 놓였는지는 무관.

<strong>[채점 기준]</strong> 수식 3점, 의미 설명 4점, 예시 적절 3점.`
})}

${examProblem({
  num: 3, points: 20, topic: "Bellman Expectation Eq 유도",
  statement: `$v_\\pi(s)$에 대한 Bellman Expectation Equation을 0단계부터 2단계까지 <u>단계별로 유도</u>하시오. 0단계 식에서 <strong>기댓값 $\\mathbb{E}$가 왜 필요한지</strong>도 설명하시오.`,
  answer: `<strong>0단계 유도:</strong>
$$\\begin{aligned}
v_\\pi(s_t) &= \\mathbb{E}_\\pi[G_t] \\\\
&= \\mathbb{E}_\\pi[r_{t+1} + \\gamma r_{t+2} + \\gamma^2 r_{t+3} + \\cdots] \\\\
&= \\mathbb{E}_\\pi[r_{t+1} + \\gamma (r_{t+2} + \\gamma r_{t+3} + \\cdots)] \\\\
&= \\mathbb{E}_\\pi[r_{t+1} + \\gamma G_{t+1}] \\\\
&= \\boxed{\\mathbb{E}_\\pi[r_{t+1} + \\gamma v_\\pi(s_{t+1})]}
\\end{aligned}$$

<strong>1단계 (두 식):</strong>
① $v$로부터 $q$ (또는 그 반대):
$$v_\\pi(s) = \\sum_{a \\in A} \\pi(a|s) \\, q_\\pi(s,a)$$
$$q_\\pi(s,a) = r_s^a + \\gamma \\sum_{s' \\in S} P_{ss'}^a \\, v_\\pi(s')$$

<strong>2단계 (대입으로 합치기):</strong>
① 식의 $q_\\pi(s,a)$ 자리에 ② 식 대입:
$$v_\\pi(s) = \\sum_a \\pi(a|s) \\left(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s')\\right)$$

<strong>기댓값이 필요한 이유:</strong> $s_t$에서 $s_{t+1}$로 가기까지 두 번의 확률 과정을 거친다.
<ol>
  <li>정책 $\\pi(a|s)$가 어떤 액션을 뽑을지 확률적으로 결정 (동전 1)</li>
  <li>환경의 전이확률 $P_{ss'}^a$가 어떤 다음 상태로 갈지 확률적으로 결정 (동전 2)</li>
</ol>
결과적으로 $s_{t+1}$은 확률변수이며, $r_{t+1}$과 $v_\\pi(s_{t+1})$도 이에 의해 결정되는 확률변수. 이들을 하나의 대표값으로 표현하려면 기댓값 $\\mathbb{E}$가 반드시 필요하다. 기댓값을 빼면 $v_\\pi(s_t) = r_{t+1} + \\gamma v_\\pi(s_{t+1})$ — 우변이 매 실행마다 달라지는 랜덤한 값이 되어 성립하지 않는다.

<strong>[채점 기준]</strong> 0단계 유도 5점, 1단계 두 식 각 3점, 2단계 4점, 기댓값 이유 설명 5점.`
})}

${examProblem({
  num: 4, points: 15, topic: "MC vs TD vs DP 비교",
  statement: `아래 표의 빈칸을 채우고, MC와 TD의 <u>bias/variance 특성이 다른 이유</u>를 2~3문장으로 설명하시오.
<table>
<tr><th>기준</th><th>DP</th><th>MC</th><th>TD(0)</th></tr>
<tr><td>MDP 지식 필요?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>Bootstrap?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>Sampling?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>에피소드 종료 필요?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>Bias / Variance</td><td>—</td><td>?</td><td>?</td></tr>
</table>`,
  answer: `<table>
<tr><th>기준</th><th>DP</th><th>MC</th><th>TD(0)</th></tr>
<tr><td>MDP 지식 필요?</td><td>O (P, R 모두)</td><td>X</td><td>X</td></tr>
<tr><td>Bootstrap?</td><td>O</td><td>X</td><td>O</td></tr>
<tr><td>Sampling?</td><td>X (모든 분기 전부 본다)</td><td>O</td><td>O</td></tr>
<tr><td>에피소드 종료 필요?</td><td>X</td><td>O ($G_t$ 계산)</td><td>X (한 스텝씩)</td></tr>
<tr><td>Bias / Variance</td><td>—</td><td>Unbiased, High Var</td><td>Biased, Low Var</td></tr>
</table>

<strong>Bias/Variance 다른 이유:</strong>
MC는 타깃으로 <u>실제 리턴 $G_t$</u>를 사용한다. $G_t$는 $v_\\pi(s)$의 불편 추정량(unbiased)이지만, 에피소드 전체에 걸친 수많은 확률적 상태 전이와 정책 결정이 누적되어 샘플 간 편차가 크다 → <strong>high variance</strong>.

반면 TD(0)는 타깃으로 <u>$r_{t+1} + \\gamma V(S_{t+1})$</u>를 쓴다. 한 스텝만 실제 샘플, 그 뒤는 학습 중인 추정값 $V(S_{t+1})$을 bootstrap으로 사용. 학습 초기엔 $V \\neq v_\\pi$이므로 <strong>biased</strong>. 그러나 한 스텝만 샘플이므로 확률 요소가 적어 <strong>low variance</strong>.

<strong>[채점 기준]</strong> 표 작성 각 칸 1점씩 12점, Bias/Variance 설명 3점.`
})}

${examProblem({
  num: 5, points: 15, topic: "코드 빈칸 채우기",
  statement: `아래는 $\\epsilon$-greedy 방식으로 액션을 선택하고 SARSA로 Q를 업데이트하는 Agent 코드다. 빈칸 ①~⑤를 채우시오.
<pre><code>class QAgent():
    def __init__(self):
        self.q_table = np.zeros((5, 7, 4))
        self.eps = 0.9
        self.alpha = 0.1

    def select_action(self, s):
        x, y = s
        coin = random.random()
        if coin < self.eps:
            action = ①____________      # ← 빈칸 ①
        else:
            action_val = self.q_table[x, y, :]
            action = ②____________      # ← 빈칸 ②
        return action

    def anneal_eps(self):
        self.eps -= 0.03
        self.eps = ③____________         # ← 빈칸 ③ (하한 0.1)

    def update_sarsa(self, transition):
        s, a, r, s_prime = transition
        x, y = s
        nx, ny = s_prime
        a_prime = ④____________          # ← 빈칸 ④
        self.q_table[x, y, a] = self.q_table[x, y, a] + self.alpha * (
            r + ⑤____________ - self.q_table[x, y, a])   # ← 빈칸 ⑤</code></pre>`,
  answer: `<strong>① <code>random.randint(0, 3)</code></strong> — ε 확률로 4개 액션 중 무작위 선택 (탐색).<br>
<strong>② <code>np.argmax(action_val)</code></strong> — 1-ε 확률로 Q값이 최대인 액션 선택 (활용).<br>
<strong>③ <code>max(self.eps, 0.1)</code></strong> — decaying 하되 0.1 아래로는 내려가지 않게 하한 유지.<br>
<strong>④ <code>self.select_action(s_prime)</code></strong> — 다음 상태에서 <u>실제로 선택할</u> 액션 (SARSA의 핵심 — '실제로 취한 $a'$'를 타깃에 사용).<br>
<strong>⑤ <code>self.q_table[nx, ny, a_prime]</code></strong> — SARSA 업데이트 식의 $\\gamma q(s', a')$ 부분. ($\\gamma$는 별도 변수 없으니 1로 가정하거나 $\\gamma$ 곱해도 OK)

<strong>보너스 질문 답:</strong> 만약 이 코드가 <u>Q-Learning</u>이라면 ④, ⑤는 어떻게 바뀔까?
<ul>
  <li>④는 삭제 (사용 안 함)</li>
  <li>⑤는 <code>np.amax(self.q_table[nx, ny, :])</code> — <strong>가능한 모든 액션 중 Q 최댓값</strong> 사용</li>
</ul>

<strong>[채점 기준]</strong> 각 3점.`
})}

${examProblem({
  num: 6, points: 10, topic: "개념 설명 (ε-greedy)",
  statement: `$\\epsilon$-greedy 정책이 무엇이며 왜 필요한지, 그리고 decaying(annealing)을 쓰는 이유를 설명하시오.`,
  answer: `<strong>$\\epsilon$-greedy 정책 정의:</strong>
$$\\pi(a|s) = \\begin{cases} 1 - \\epsilon + \\epsilon/|\\mathcal{A}| & a = \\arg\\max_a q(s,a) \\\\ \\epsilon/|\\mathcal{A}| & \\text{otherwise} \\end{cases}$$
확률 $1-\\epsilon$로 greedy (현재 알고 있는 최선 액션), 확률 $\\epsilon$로 무작위 액션 (탐색).

<strong>왜 필요한가 — No-Exploration 문제:</strong>
$q$를 0으로 초기화한 상태에서 순수 greedy를 쓰면, 우연히 한 액션의 Q만 조금 양수로 업데이트되는 순간부터 영원히 그 액션만 고른다. 다른 액션은 영영 시도 안 되어 더 좋은 선택이 있어도 발견 불가 → <u>Local Minimum</u>에 빠진다. $\\epsilon$ 확률의 무작위 행동이 이 문제를 해결한다.

<strong>Decaying(annealing)의 이유:</strong>
학습 초기에는 환경에 대한 정보가 거의 없으므로 탐색 비중을 높여야 한다. 그러나 학습이 진행되면서 Q값이 정확해질수록 탐색보다 활용(exploitation)에 집중해야 성능이 올라간다. 그래서 $\\epsilon$을 초기엔 크게(예: 0.9), 점점 감소시켜(예: 매 에피소드마다 0.03씩) 최종적으로 0.1 정도로 유지한다. 0으로 완전히 떨어뜨리지 않는 이유는 최소한의 탐색은 유지해 환경 변화에 대응하기 위함.

<strong>[채점 기준]</strong> 정의 3점, 필요 이유 4점, decaying 설명 3점.`
})}

${examProblem({
  num: 7, points: 15, topic: "SARSA vs Q-Learning",
  statement: `SARSA와 Q-Learning의 업데이트 식을 각각 쓰고, 어느 것이 On-Policy, 어느 것이 Off-Policy인지와 그 이유를 설명하시오. 또한 각 알고리즘이 어떤 Bellman 방정식에서 유도되는지 쓰시오.`,
  answer: `<strong>업데이트 식:</strong>
SARSA: $Q(S,A) \\leftarrow Q(S,A) + \\alpha(R + \\gamma Q(S',A') - Q(S,A))$<br>
Q-Learning: $Q(S,A) \\leftarrow Q(S,A) + \\alpha(R + \\gamma \\max_{A'} Q(S',A') - Q(S,A))$

<strong>On-Policy vs Off-Policy 판별:</strong>
<ul>
  <li><strong>SARSA = On-Policy</strong>. 타깃에 들어가는 $Q(S', A')$의 $A'$가 <u>현재 정책</u>($\\epsilon$-greedy)으로 실제로 선택한 액션이기 때문에. Behavior policy와 Target policy가 동일.</li>
  <li><strong>Q-Learning = Off-Policy</strong>. 타깃의 $\\max_{A'}$가 "가능한 최댓값"이므로 현재 정책과 무관. 탐험은 $\\epsilon$-greedy (behavior), 업데이트는 최적 greedy (target) → 두 정책이 다름.</li>
</ul>

<strong>이론적 유도:</strong>
<ul>
  <li>SARSA는 <strong>Bellman Expectation Equation</strong>에서 유도:
    $$q_\\pi(s,a) = \\mathbb{E}_\\pi[r_{t+1} + \\gamma q_\\pi(s_{t+1}, a_{t+1})]$$
    기댓값에 $\\mathbb{E}_\\pi$가 있어 $\\pi$를 따르는 경로를 샘플링해야 한다 → 자연스레 on-policy.</li>
  <li>Q-Learning은 <strong>Bellman Optimal Equation</strong>에서 유도:
    $$q_*(s,a) = \\mathbb{E}_{s'}[r + \\gamma \\max_{a'} q_*(s', a')]$$
    기댓값이 $\\mathbb{E}_{s'}$로 환경 전이만 포함하고 정책 $\\pi$가 식에 없다. 어떤 탐험 정책을 써도 식 그대로 유효 → off-policy.</li>
</ul>

<strong>[채점 기준]</strong> 업데이트 식 각 2점, On/Off 판별 각 2점, 이유 4점, Bellman 유도 3점.`
})}

<h2>🎯 시험 전 체크리스트</h2>

<div class="def-card">
<div class="def-title">마지막 점검</div>
<div class="def-body">
<ul>
  <li>☐ MDP 5-tuple 정의와 "정책은 MDP의 일부가 아니다" 포인트</li>
  <li>☐ Markov Property 수식</li>
  <li>☐ $v_\\pi$와 $q_\\pi$의 차이 (첫 액션 누가 정하는가)</li>
  <li>☐ Bellman Expectation Eq 0→1→2단계 손으로 유도</li>
  <li>☐ Bellman Expectation vs Optimal 차이 ($\\sum \\pi \\to \\max$)</li>
  <li>☐ DP 세 알고리즘과 각각 쓰는 Bellman 식</li>
  <li>☐ MC vs TD 비교표 (특히 bias/variance)</li>
  <li>☐ DP Control을 Model-free에 못 쓰는 2가지 이유와 해결책 3가지</li>
  <li>☐ $\\epsilon$-greedy 코드 구조 (select_action, anneal_eps)</li>
  <li>☐ SARSA 업데이트 식과 Q-Learning 업데이트 식 차이</li>
  <li>☐ SARSA 이름의 유래 (S-A-R-S'-A')</li>
  <li>☐ On-Policy와 Off-Policy 정의 + SARSA/Q-Learning 어느 쪽인지</li>
</ul>
</div>
</div>

${note(`
<strong>시험 당일:</strong> 계산기 챙기고(있으면), 시험 시작 직전 5분은 <u>Bellman Expectation Eq 0→1→2단계 유도</u>를 머릿속으로 한 번 돌려보세요. 이게 모든 후속 문제의 뿌리입니다.
`, "tip")}
`);
