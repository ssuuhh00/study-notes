// Central glossary — click a term() link to pop up the right panel.
// Keys are kebab-case. Keep entries crisp; definition supports HTML + KaTeX.

window.GLOSSARY = {
  // ============ Ch1~2: AI / ML foundations ============
  "symbolic-ai": {
    term: "Symbolic AI",
    short: "규칙(Rule) 기반 인공지능. 기호를 명시적으로 조작해서 추론.",
    definition: `
      <p>사람이 만든 <strong>규칙·논리식·기호(symbol)</strong>를 조작해서 지능적 행동을 만드는 방식. 대표: Expert System, Prolog, 1st-order logic.</p>
      <h4>특징</h4>
      <ul>
        <li>해석 가능성이 높음 — 왜 그 결론을 냈는지 규칙으로 설명됨</li>
        <li>지식 엔지니어가 규칙을 직접 주입 (사람이 만든 feature)</li>
        <li>데이터가 적어도 동작 가능</li>
        <li>새로운 상황 대응이 약함 (규칙 밖은 모름)</li>
      </ul>
    `,
    related: ["subsymbolic-ai", "ml", "dl"]
  },
  "subsymbolic-ai": {
    term: "Sub-symbolic AI",
    short: "기호 대신 숫자 벡터·가중치로 표현하는 AI. NN이 대표.",
    definition: `
      <p>명시적 규칙 없이 <strong>연속적인 수치 표현(벡터, 가중치)</strong>으로 지능을 만드는 방식. 뉴럴넷이 전형적 예.</p>
      <h4>NN이 왜 subsymbolic인가? (시험 포인트)</h4>
      <ul>
        <li>정보가 weight/activation에 <strong>분산 표현</strong>됨 — 특정 규칙이 아닌 수많은 파라미터의 조합</li>
        <li>feature도 사람이 정의하지 않고 <strong>데이터로부터 학습</strong></li>
        <li>해석 불투명 (black box)</li>
        <li>데이터가 많아야 성능이 나옴</li>
      </ul>
    `,
    related: ["symbolic-ai", "dl", "nn"]
  },
  "ml": {
    term: "Machine Learning",
    short: "데이터로부터 패턴을 배우는 방법론 전반.",
    definition: `
      <p>명시적 프로그래밍 없이, <strong>데이터</strong>로부터 모델의 파라미터를 학습.</p>
      <h4>ML vs DL의 차이 (시험 포인트)</h4>
      <ul>
        <li><strong>Feature 설계</strong>: 일반 ML은 사람이 feature를 정의(human feature engineering). 딥러닝은 모델이 end-to-end로 feature를 학습</li>
        <li>딥러닝은 파라미터 수가 훨씬 많고 데이터가 더 필요</li>
        <li>통계 → ML → DL로 갈수록 데이터 요구량이 기하급수적으로 증가</li>
      </ul>
    `,
    related: ["dl", "supervised", "unsupervised", "rl-def"]
  },
  "dl": {
    term: "Deep Learning",
    short: "깊은 뉴럴넷을 쓰는 ML의 한 갈래.",
    definition: `
      <p>다층 NN으로 feature와 결정을 동시에 학습. <strong>Data-driven inference approach</strong>의 끝 단계: 통계적 방법 → ML → DL로 갈수록 데이터 양이 많이 필요하고, 머신 성능(GPU)이 좋아지며 가능해짐.</p>
    `,
    related: ["ml", "nn", "subsymbolic-ai"]
  },
  "nn": {
    term: "Neural Network",
    short: "뉴런 모델을 다층으로 연결한 함수 근사기.",
    definition: `
      <p>입력 x → (선형 + 비선형 활성) × 여러 층 → 출력. 파라미터를 gradient descent로 갱신.</p>
      <p>강화학습에서는 Q나 policy를 NN으로 근사할 때 <em>Deep RL</em>이라 부름.</p>
    `,
    related: ["dl", "subsymbolic-ai"]
  },
  "supervised": {
    term: "Supervised Learning",
    short: "(x, 정답 y) 쌍으로 학습.",
    definition: `
      <p>정답 label이 있는 데이터가 많이 필요. 회귀/분류.</p>
      <p>RL과의 대비: RL은 정답이 없고 <u>보상</u>만 있음.</p>
    `,
    related: ["unsupervised", "rl-def"]
  },
  "unsupervised": {
    term: "Unsupervised Learning",
    short: "정답 없는 데이터에서 구조를 찾는 학습.",
    definition: `
      <p>Clustering, autoencoder(semi-supervised의 확장) 등. 정답은 없지만 데이터는 많은 상황.</p>
    `,
    related: ["supervised", "rl-def"]
  },

  // ============ RL core ============
  "rl-def": {
    term: "Reinforcement Learning",
    short: "Agent가 환경과 상호작용하며 보상으로 학습.",
    definition: `
      <p>정답 데이터가 없고, <strong>경험(state, action, reward, next state)</strong>으로 정책을 개선.</p>
      <h4>기본 구조</h4>
      <ul>
        <li><strong>Agent</strong>: 의사결정자</li>
        <li><strong>Environment</strong>: 행동을 받아 다음 상태와 보상을 반환</li>
        <li>상호작용: <code>action → reward + state/observation → action → …</code></li>
      </ul>
    `,
    related: ["mdp", "agent-env", "supervised", "unsupervised"]
  },
  "agent-env": {
    term: "Agent-Environment Loop",
    short: "에이전트와 환경이 action/state/reward로 주고받는 루프.",
    definition: `
      <p>매 스텝: Agent가 <code>a_t</code>를 고르면 Environment가 <code>(s_{t+1}, r_{t+1})</code>을 반환.</p>
      <p>Observation과 State는 다를 수 있음 (부분관찰 → POMDP).</p>
    `,
    related: ["rl-def", "mdp"]
  },

  // ============ Ch3: MDP ============
  "markov-property": {
    term: "Markov Property",
    short: "미래는 현재 상태만 주어지면 과거와 독립.",
    definition: `
      <p>$$P(S_{t+1} \\mid S_t) = P(S_{t+1} \\mid S_1, \\dots, S_t)$$</p>
      <p>현재 상태 $S_t$가 <u>과거 전체의 정보를 충분히 요약</u>한다는 조건. 이게 있어야 MDP 모델링이 타당해지고, DP의 <strong>recursive decomposition</strong>이 가능해짐.</p>
    `,
    related: ["mdp", "mp", "bellman-decomp"]
  },
  "mp": {
    term: "Markov Process (Markov Chain)",
    short: "상태와 전이확률 (S, P)만 있는 확률과정.",
    definition: `
      <p>$\\langle S, P \\rangle$. 보상도 액션도 없는 순수 확률 연쇄.</p>
    `,
    related: ["mrp", "mdp", "markov-property"]
  },
  "mrp": {
    term: "Markov Reward Process",
    short: "MP + 보상 + 감쇄. (S, P, R, γ).",
    definition: `
      <p>$\\langle S, P, R, \\gamma \\rangle$. 정책은 아직 없음. 주어진 dynamics에서 return의 기댓값을 정의할 수 있는 단계.</p>
    `,
    related: ["mp", "mdp", "gamma"]
  },
  "mdp": {
    term: "Markov Decision Process (MDP)",
    short: "강화학습의 표준 문제 형태. ⟨S, A, P, R, γ⟩.",
    definition: `
      <p>$\\langle \\mathcal{S}, \\mathcal{A}, P, R, \\gamma \\rangle$</p>
      <ul>
        <li>$\\mathcal{S}$: 상태 집합</li>
        <li>$\\mathcal{A}$: 액션 집합</li>
        <li>$P_{ss'}^a = P(s'|s,a)$: 상태전이확률</li>
        <li>$R_s^a = \\mathbb{E}[r_{t+1}|s,a]$: 기대 보상</li>
        <li>$\\gamma \\in [0,1]$: 감쇄 인자</li>
      </ul>
      <h4>시험 포인트 (교수님 명시)</h4>
      <p>문제가 주어지면 그 문제에 대한 <strong>S, A, P, R, γ를 정의할 수 있어야</strong> 함. State Transition Graph를 주고 응용 문제를 낼 수 있음.</p>
    `,
    related: ["markov-property", "mrp", "mp", "policy", "bellman-expectation"]
  },
  "policy": {
    term: "Policy (정책) π",
    short: "상태에서 액션을 뽑는 규칙. π(a|s).",
    definition: `
      <p>$\\pi(a|s) = P(A_t = a \\mid S_t = s)$. 확률적(stochastic) 또는 결정적(deterministic).</p>
      <p>정책 π 아래 가치: $v_\\pi(s) = \\mathbb{E}_\\pi[G_t | S_t=s]$.</p>
    `,
    related: ["mdp", "value-function", "q-function"]
  },
  "return": {
    term: "Return G_t",
    short: "t 시점부터 받을 감쇄 합산 보상.",
    definition: `
      <p>$$G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$$</p>
      <p>Random variable. value function은 이 return의 기댓값.</p>
    `,
    related: ["gamma", "value-function"]
  },
  "gamma": {
    term: "Discount factor γ",
    short: "미래 보상의 할인율. 0~1.",
    definition: `
      <p>γ = 0이면 즉각 보상만, γ = 1이면 모든 미래를 동등하게 본다. 일반적으로 0.9~0.99.</p>
      <p>γ < 1은 <strong>무한 합의 수렴</strong>을 보장하고, 가까운 미래를 선호하게 만든다.</p>
    `,
    related: ["return", "value-function"]
  },
  "value-function": {
    term: "State-value function v_π(s)",
    short: "정책 π를 따를 때 s에서 시작한 return의 기댓값.",
    definition: `
      <p>$$v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t = s]$$</p>
      <p>"이 상태에서 π대로 계속 가면 얼마나 좋을까?"</p>
    `,
    related: ["q-function", "bellman-expectation", "return"]
  },
  "q-function": {
    term: "Action-value function q_π(s,a)",
    short: "s에서 a를 고르고 이후 π를 따를 때의 기대 리턴.",
    definition: `
      <p>$$q_\\pi(s,a) = \\mathbb{E}_\\pi[G_t \\mid S_t=s, A_t=a]$$</p>
      <p>Control(액션 선택)에 직접 쓰임. 모델을 몰라도 q만 있으면 greedy로 액션 결정 가능 → <strong>model-free control의 핵심</strong>.</p>
    `,
    related: ["value-function", "bellman-expectation"]
  },

  // ============ Ch4: Bellman ============
  "bellman-expectation": {
    term: "Bellman Expectation Equation",
    short: "정책 π 하의 가치함수 재귀식. 평균/가중합 형태.",
    definition: `
      <p><strong>0단계</strong>: $v_\\pi(s) = \\mathbb{E}_\\pi[r_{t+1} + \\gamma v_\\pi(s_{t+1})]$</p>
      <p><strong>2단계</strong>: $v_\\pi(s) = \\sum_a \\pi(a|s)\\left(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s')\\right)$</p>
      <p>모든 액션을 확률(π)로 가중평균. <u>정책 평가(Prediction)</u>에 사용.</p>
    `,
    related: ["bellman-optimal", "policy", "policy-eval", "bellman-decomp"]
  },
  "bellman-optimal": {
    term: "Bellman Optimal Equation",
    short: "최적 가치함수의 재귀식. max 형태.",
    definition: `
      <p><strong>2단계</strong>: $v_*(s) = \\max_a\\left(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_*(s')\\right)$</p>
      <p>Expectation과 단 하나 차이: <strong>$\\sum_a \\pi(a|s) \\to \\max_a$</strong>. Control(최적 정책 찾기)에 사용.</p>
      <p>Value Iteration, Q-Learning의 이론적 근거.</p>
    `,
    related: ["bellman-expectation", "value-iter", "q-learning"]
  },
  "bellman-decomp": {
    term: "Bellman Decomposition / Recurrence",
    short: "DP를 쓸 수 있게 해주는 두 가지 조건.",
    definition: `
      <p>교수님 강조: 다이나믹 프로그래밍은 <strong>아무 때나 쓰는 게 아님</strong>. 두 조건이 필요:</p>
      <ol>
        <li><strong>Decomposition</strong>: 문제를 작은 부분 문제로 쪼갤 수 있어야 함</li>
        <li><strong>Recursive</strong>: 부분 문제가 같은 형태로 재귀적으로 정의될 수 있어야 함 (optimal substructure)</li>
      </ol>
      <p>MDP는 Markov Property 덕분에 이 두 조건을 만족 → Bellman Equation이 재귀식이라 DP 적용 가능.</p>
    `,
    related: ["dp", "markov-property", "bellman-expectation"]
  },

  // ============ Ch5: DP / Planning ============
  "dp": {
    term: "Dynamic Programming (Planning)",
    short: "MDP의 P·R을 알 때 Bellman 식을 반복 적용해 푸는 방법.",
    definition: `
      <p><strong>전제</strong>: MDP의 dynamics($P_{ss'}^a, R_s^a$)를 안다 (= <em>Model-based / Planning</em>).</p>
      <p><strong>핵심 아이디어</strong>: Bellman 2단계 식을 고정점 반복(fixed-point iteration)으로 풀어서 $v_\\pi$ 또는 $v_*$에 수렴시킨다.</p>
      <h4>세 가지 종류</h4>
      <ul>
        <li><strong>Iterative Policy Evaluation</strong>: 주어진 π의 $v_\\pi$ 계산 (Prediction)</li>
        <li><strong>Policy Iteration</strong>: Eval + Greedy Improvement 반복 (Control)</li>
        <li><strong>Value Iteration</strong>: Bellman Optimal로 직접 $v_*$ 계산 (Control)</li>
      </ul>
    `,
    related: ["policy-eval", "policy-iter", "value-iter", "bellman-decomp", "model-free"]
  },
  "policy-eval": {
    term: "Iterative Policy Evaluation",
    short: "주어진 π의 v_π를 Bellman Expectation으로 반복 계산.",
    definition: `
      <p>업데이트: $v_{k+1}(s) \\leftarrow \\sum_a \\pi(a|s)\\bigl(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_k(s')\\bigr)$</p>
      <p>모든 상태를 스윕하면서 k → ∞일 때 $v_\\pi$로 수렴. <u>Prediction</u> 문제.</p>
    `,
    related: ["dp", "bellman-expectation", "policy-iter"]
  },
  "policy-iter": {
    term: "Policy Iteration",
    short: "Evaluate(π → v_π) → Greedy Improve(v_π → π') 반복.",
    definition: `
      <p><strong>Policy Iteration 루프</strong>:</p>
      <ol>
        <li><em>Evaluation</em>: 현재 π로 $v_\\pi$ 계산 (위 Iterative Policy Eval)</li>
        <li><em>Improvement</em>: $\\pi'(s) = \\arg\\max_a\\bigl(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_\\pi(s')\\bigr)$ — Greedy</li>
        <li>π = π'로 바꾸고 1로 돌아가기</li>
      </ol>
      <p>π' 개선이 없으면 $v_\\pi = v_*$, $\\pi = \\pi_*$. <strong>Policy Improvement Theorem</strong>이 수렴을 보장.</p>
    `,
    related: ["policy-eval", "value-iter", "dp"]
  },
  "value-iter": {
    term: "Value Iteration",
    short: "Bellman Optimal을 바로 반복. Eval 단계 없이 v_*를 직접 찾음.",
    definition: `
      <p>업데이트: $v_{k+1}(s) \\leftarrow \\max_a\\bigl(r_s^a + \\gamma \\sum_{s'} P_{ss'}^a v_k(s')\\bigr)$</p>
      <p>중간 정책이 없음 — 매 스텝 즉시 greedy($\\max$)를 적용. 수렴 후 $\\pi_*(s) = \\arg\\max_a(\\dots)$로 정책을 추출.</p>
      <p>Policy Iteration보다 이터레이션당 계산이 가볍지만 수렴까지 더 많은 반복이 필요한 경향.</p>
    `,
    related: ["policy-iter", "bellman-optimal", "dp"]
  },

  // ============ Ch5~7 preview ============
  "model-free": {
    term: "Model-free RL",
    short: "P와 R을 모를 때 샘플(경험)로 학습하는 접근.",
    definition: `
      <p>DP와의 대비: DP는 $P_{ss'}^a, r_s^a$를 알아야 2단계 식을 계산 가능. 모르면 DP 불가 → <strong>샘플로 근사</strong>.</p>
      <ul>
        <li><strong>Monte Carlo</strong>: 에피소드 끝까지 돌려서 실제 return 평균</li>
        <li><strong>Temporal Difference</strong>: 한 스텝만 보고 target $r + \\gamma v(s')$로 업데이트 (bootstrap)</li>
      </ul>
    `,
    related: ["mc", "td", "dp"]
  },
  "mc": {
    term: "Monte Carlo (MC) Learning",
    short: "에피소드 종료 후 실제 리턴의 평균으로 v 추정.",
    definition: `
      <p>$V(S_t) \\leftarrow V(S_t) + \\alpha(G_t - V(S_t))$. <strong>$G_t$는 에피소드 끝까지 진행한 실제 return</strong>.</p>
      <h4>특징 (교수님 강조)</h4>
      <ul>
        <li><strong>터미널 상태가 있어야</strong> 사용 가능 (끝까지 가야 $G_t$가 확정)</li>
        <li>에피소드 하나 끝나야 업데이트 → 업데이트가 느림</li>
        <li>Unbiased estimate (편향 없음) / 분산 큼</li>
        <li>Bootstrapping 안 함</li>
      </ul>
    `,
    related: ["td", "model-free", "return"]
  },
  "td": {
    term: "Temporal Difference (TD) Learning",
    short: "한 스텝 target으로 즉시 업데이트. Bootstrapping.",
    definition: `
      <p>$V(S_t) \\leftarrow V(S_t) + \\alpha\\bigl(R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)\\bigr)$</p>
      <h4>특징 (교수님 강조)</h4>
      <ul>
        <li>한 스텝마다 업데이트 가능 → <strong>빠름</strong></li>
        <li>터미널 없어도 사용 가능 (continuing tasks OK)</li>
        <li><strong>Biased</strong> (현재 V 추정값을 target에 쓰므로) — 하지만 실용적으로 꽤 정확</li>
        <li>분산 작음 / Bootstrapping 함</li>
      </ul>
      <p>n-step TD로 일반화 가능 (n=∞면 MC).</p>
    `,
    related: ["mc", "model-free", "sarsa", "q-learning"]
  },
  "prediction-vs-control": {
    term: "Prediction vs Control",
    short: "정책 평가 vs 최적 정책 찾기.",
    definition: `
      <ul>
        <li><strong>Prediction</strong>: π가 주어졌을 때 $v_\\pi$를 구하는 것 (평가 문제). $V$값을 다룸.</li>
        <li><strong>Control</strong>: $\\pi_*$와 $v_*$를 동시에 찾기. $Q$값을 다룸 (액션 선택에 편리).</li>
      </ul>
      <p>DP/MC/TD 각각에서 Prediction과 Control 버전이 따로 있음.</p>
    `,
    related: ["policy-eval", "q-function", "sarsa", "q-learning"]
  },
  "sarsa": {
    term: "SARSA",
    short: "On-policy TD Control. (s,a,r,s',a') 다섯 개로 업데이트.",
    definition: `
      <p>$Q(s,a) \\leftarrow Q(s,a) + \\alpha\\bigl(r + \\gamma Q(s',a') - Q(s,a)\\bigr)$</p>
      <p>$a'$는 다음에 <strong>실제로 취할 액션</strong>. On-policy (경험을 만드는 정책 = 개선하는 정책).</p>
    `,
    related: ["q-learning", "td", "prediction-vs-control"]
  },
  "q-learning": {
    term: "Q-Learning",
    short: "Off-policy TD Control. target에 max 사용.",
    definition: `
      <p>$Q(s,a) \\leftarrow Q(s,a) + \\alpha\\bigl(r + \\gamma \\max_{a'} Q(s',a') - Q(s,a)\\bigr)$</p>
      <p>target이 <strong>Bellman Optimal</strong> 기반. Off-policy: 데이터를 만든 정책과 학습하는 정책이 달라도 됨 → 경험 재사용 가능. DQN·알파고의 기반.</p>
    `,
    related: ["sarsa", "td", "bellman-optimal"]
  }
};
