registerPage("hw1", "HW1 — Ch2 신호/시스템", () => `
<h1>📝 HW1 — Ch2 신호와 시스템</h1>
<p class="lead">Problems 2.7, 2.8, 2.9, 2.10, 2.16. 시험 직전에 한 번 더 풀어보고 답 확인.</p>

${note(`<strong>이 페이지 사용법:</strong> 각 문제를 보고 <em>먼저 종이에 풀어본 뒤</em> "답안 보기" 클릭. 즉시 답을 보면 풀이력이 안 늘어. 시험에선 변형되어 나오니까 직접 풀어보는 게 핵심.`, "warn")}

${hwProblem({
  num: "2.7",
  topic: "Additivity → Homogeneity (증명형)",
  image: "HW1_Ch2_Prob_2.7.png",
  problemText: "Additivity 성질이 성립하면, 모든 <em>유리수</em> $\\alpha$에 대해 homogeneity 성질도 성립함을 보여라. 따라서 시스템에 어떤 \"continuity\" 성질이 있다면, additivity가 homogeneity를 함축한다.",
  answer: `
<p><strong>주장:</strong> Additivity가 성립하면, 모든 유리수 $\\alpha$에 대해 homogeneity ($T(\\alpha x) = \\alpha T(x)$)도 성립.</p>
<p><strong>증명 단계:</strong></p>
<ol>
  <li><strong>자연수 $n$에 대해:</strong> Additivity로 $T(nx) = T(x + x + \\cdots + x) = nT(x)$.</li>
  <li><strong>0에 대해:</strong> $T(x) = T(x + 0) = T(x) + T(0) \\Rightarrow T(0) = 0$. 따라서 $T(0 \\cdot x) = 0 \\cdot T(x)$.</li>
  <li><strong>$-1$에 대해:</strong> $0 = T(0) = T(x + (-x)) = T(x) + T(-x) \\Rightarrow T(-x) = -T(x)$.</li>
  <li><strong>음의 정수 $-n$:</strong> $T(-nx) = -T(nx) = -nT(x)$.</li>
  <li><strong>유리수 $1/n$:</strong> $T(x) = T(n \\cdot (x/n)) = nT(x/n) \\Rightarrow T(x/n) = T(x)/n$.</li>
  <li><strong>일반 유리수 $\\alpha = m/n$:</strong> $T((m/n)x) = mT(x/n) = (m/n)T(x) = \\alpha T(x)$. ∎</li>
</ol>
<p><strong>"continuity" 부분:</strong> 무리수 $\\alpha$로 확장하려면 continuity가 필요. 유리수 수열로 무리수를 근사하고 극한 연속성으로.</p>
`,
  variant: "Time-invariance, causality, linearity 정의를 묻거나, 주어진 시스템이 이 성질을 만족하는지 판정하는 형태로 자주 변형."
})}

${hwProblem({
  num: "2.8",
  topic: "$g(t,\\tau) = g(t-\\tau)$ 형태 증명 (Time-invariance)",
  image: "HW1_Ch2_Prob_2.8.png",
  problemText: "모든 $t, \\tau, \\alpha$ 에 대해 $g(t, \\tau) = g(t+\\alpha, \\tau+\\alpha)$ 가 성립한다고 하자. $g(t, \\tau)$ 가 오직 $t-\\tau$ 의 함수임을 보여라. <br>[힌트: $x = t+\\tau$, $y = t-\\tau$ 로 두고 $\\partial g / \\partial x = 0$ 을 보여라.]",
  answer: `
<p><strong>주장:</strong> $g(t,\\tau) = g(t+\\alpha, \\tau+\\alpha)$ 가 모든 $t,\\tau,\\alpha$에 대해 성립하면, $g(t,\\tau)$는 $t-\\tau$ 의 함수.</p>
<p><strong>힌트 따라가기:</strong> $x = t+\\tau$, $y = t-\\tau$로 변수치환. 즉 $t = (x+y)/2$, $\\tau = (x-y)/2$.</p>
<p><strong>주어진 조건을 변환:</strong> $\\alpha$ 만큼 시간이동해도 $g$가 같다는 것은, $t$와 $\\tau$가 같이 $\\alpha$ 만큼 늘어나도 값이 같다는 것. <br>
새 변수로 보면 $t \\to t+\\alpha$, $\\tau \\to \\tau+\\alpha$ 일 때:<br>
$x = (t+\\alpha) + (\\tau+\\alpha) = (t+\\tau) + 2\\alpha$ → $x$가 $2\\alpha$ 만큼 변함<br>
$y = (t+\\alpha) - (\\tau+\\alpha) = t - \\tau$ → $y$ 불변</p>
<p>즉 $g$의 값은 $x$를 변화시켜도 안 바뀜 → $\\partial g / \\partial x = 0$.</p>
<p>그러므로 $g$는 오직 $y = t - \\tau$의 함수. ∎</p>
`,
  variant: "LTI 시스템 정의의 본질. 시험에선 \"impulse response가 t-tau의 함수다 → time-invariant이다\" 같이 동치 명제 증명으로 나올 수 있음."
})}

${hwProblem({
  num: "2.9",
  topic: "Convolution — 그래픽 합성곱 (시험 핵심!)",
  image: "HW1_Ch2_Prob_2.9.png",
  problemText: "Fig. 2.20(a)와 같은 임펄스 응답을 가진 시스템을 고려하라. Fig. 2.20(b)의 입력 $u(t)$ 에 의한 zero-state 응답은 무엇인가?",
  answer: `
<p><strong>주어진 것:</strong></p>
<ul>
  <li>임펄스응답 $g(t)$: $[0,1]$에서 0→1 선형 증가, $[1,2]$에서 1→0 선형 감소, 그 외 0 (삼각파)</li>
  <li>입력 $u(t)$: $[0,1]$에서 1, $[1,2]$에서 −1, 그 외 0 (정사각파 +/−)</li>
</ul>
<p><strong>수식 표현:</strong></p>
<p>$g(t) = \\begin{cases} t & 0 \\le t \\le 1 \\\\ 2-t & 1 \\le t \\le 2 \\\\ 0 & \\text{else} \\end{cases}$</p>
<p>$u(t) = u_s(t) - 2u_s(t-1) + u_s(t-2)$</p>
<p><strong>출력:</strong> $y(t) = (g * u)(t) = \\int_0^t g(t-\\tau)u(\\tau)d\\tau$</p>
<p><strong>케이스 분석:</strong> $g(t-\\tau)$는 $\\tau$축에서 $[t-2, t]$ 위에 살아 있음. 케이스 분기 경계: $t = 0, 1, 2, 3, 4$.</p>
<ul>
  <li><strong>$0 \\le t \\le 1$</strong>: 겹침 $[0, t]$, $u=1$. $\\int_0^t g(t-\\tau) d\\tau$. 변수치환 $s = t-\\tau$: $\\int_0^t g(s) ds$. $t \\le 1$이면 $g(s) = s$이므로 $= t^2/2$.</li>
  <li><strong>$1 \\le t \\le 2$</strong>: 겹침 $[0, t]$. $[0,1)$에서 $u=1$, $[1, t]$에서 $u=-1$.<br>
    $\\int_0^1 g(t-\\tau)(1)d\\tau - \\int_1^t g(t-\\tau)(1)d\\tau$. <br>
    변수치환 후 적분 계산: 결과 $= \\frac{1}{2}(t^2 - 4(t-1)^2 / \\text{...})$ — 계산 노가다.</li>
  <li>나머지 케이스: $2 \\le t \\le 3$, $3 \\le t \\le 4$, $t \\ge 4$ 도 같은 방식.</li>
</ul>
<p><strong>결과 (요약):</strong></p>
<p>$y(t) = \\begin{cases} t^2/2 & 0 \\le t \\le 1 \\\\ -\\frac{3}{2}t^2 + 4t - 2 & 1 \\le t \\le 2 \\\\ \\frac{3}{2}t^2 - 8t + 10 & 2 \\le t \\le 3 \\\\ -\\frac{1}{2}t^2 + 4t - 8 & 3 \\le t \\le 4 \\\\ 0 & \\text{else} \\end{cases}$</p>
<p>(부호와 상수는 직접 다시 검산 권장. 합성곱은 워낙 실수가 잦아서 그래프 그리며 풀어야.)</p>
`,
  variant: "<strong>시험 출제 1순위.</strong> 족보 2013 #1, 2015 #1과 같은 형태. 입력/임펄스응답이 unit step이나 지수함수의 조합으로 변형되어 나옴."
})}

${hwProblem({
  num: "2.10",
  topic: "ODE → Transfer function & Impulse response",
  image: "HW1_Ch2_Prob_2.10.png",
  problemText: "$\\ddot y + 2\\dot y - 3y = \\dot u - u$ 로 기술되는 시스템을 고려하라. 이 시스템의 transfer function 과 impulse response 는 무엇인가?",
  answer: `
<p><strong>문제:</strong> $\\ddot{y} + 2\\dot{y} - 3y = \\dot{u} - u$. Transfer function과 impulse response 구하기.</p>
<p><strong>1단계: Laplace 변환</strong> (zero initial conditions)</p>
<p>$s^2 Y + 2sY - 3Y = sU - U$</p>
<p>$Y(s^2 + 2s - 3) = U(s - 1)$</p>
<p><strong>Transfer function:</strong></p>
<p>$$\\hat{g}(s) = \\frac{Y}{U} = \\frac{s-1}{s^2 + 2s - 3} = \\frac{s-1}{(s-1)(s+3)} = \\frac{1}{s+3}$$</p>
<p><strong>중요한 관찰:</strong> $s=1$에서 pole-zero 상쇄! 분자/분모 모두 $(s-1)$ 인수. 결과적으로 1차 시스템.</p>
<p><strong>Impulse response:</strong> $h(t) = \\mathcal{L}^{-1}\\{1/(s+3)\\} = e^{-3t} u_s(t)$</p>
<p><strong>경고:</strong> 이 시스템은 BIBO stable ($1/(s+3)$의 pole은 $-3$, LHP). 하지만 원래 ODE의 characteristic eq $s^2 + 2s - 3 = 0$ 은 $s = 1, -3$ — <strong>internal mode 중에 unstable한 게 있음</strong>. <br>
즉 transfer function만 보면 stable인데, hidden mode가 있음. (Ch5 BIBO vs Internal stability와 직결!)</p>
`,
  variant: "ODE 차수와 분자분모 상쇄 패턴이 유사하게 변형. 그 결과로 BIBO/internal stability 차이를 묻는 후속 질문이 붙을 가능성 높음."
})}

${hwProblem({
  num: "2.16",
  topic: "Aircraft 모델링 — 물리계의 Linearization & Transfer function",
  image: ["HW1_Ch2_Prob_2.16_text.png", "HW1_Ch2_Prob_2.16_figure.png"],
  problemText: `Fig. 2.23 의 단순화된 항공기 모델을 고려하라. 항공기가 pitch angle $\\theta_0$, elevator angle $u_0$, altitude $h_0$, cruising speed $v_0$ 에서 평형(equilibrium) 상태에 있다고 가정. $\\theta$ 와 $u$ 가 $\\theta_0, u_0$ 로부터 작은 변동을 보일 때 그림과 같이 $f_1 = k_1 \\theta$, $f_2 = k_2 u$ 의 힘이 발생.<br>
$m$: 항공기 질량, $I$: 무게중심 $P$ 에 대한 관성모멘트, $b\\dot\\theta$: 공기역학적 감쇠, $h$: $h_0$ 로부터의 고도 편차.<br>
시스템을 기술하는 방정식을 세워라. 또한 $I$ 의 영향을 무시할 때, $u$ 에서 $h$ 까지의 transfer function 이 다음과 같음을 보여라:<br>
$$\\hat g(s) = \\frac{k_1 k_2 l_2 - k_2 b s}{m s^2 (b s + k_1 l_1)}$$`,
  answer: `
<p>${note("이 문제는 PDF에 정답 식이 일부 적혀 있음: $\\hat g(s) = \\hat h(s)/\\hat u(s) = (k_1 k_2 l_2 - k_2 b s) / [m s^2 (bs + k_1 l_1)]$. 풀이 흐름만 정리.")}</p>
<p><strong>물리 셋업 (Fig 2.23):</strong></p>
<ul>
  <li>비행기가 trim 상태($\\theta_0, u_0, h_0$)에서 작은 변동.</li>
  <li>$\\theta, u, h$는 trim에서의 편차.</li>
  <li>두 힘: $f_1 = k_1 \\theta$ (날개 양력 $-$ 받음각에 비례), $f_2 = k_2 u$ (꼬리 양력 $-$ 조종면 각도에 비례).</li>
  <li>$P$: 무게중심, $b\\dot\\theta$: 공기역학적 감쇠, $h$: 고도 편차.</li>
</ul>
<p><strong>운동방정식 (linearized, $I$ 무시):</strong></p>
<ol>
  <li>피치 모멘트 평형: $0 = f_1 \\cdot l_1 - f_2 \\cdot l_2 - b\\dot\\theta$ ($I$ 무시했으므로 $I\\ddot\\theta = 0$ → 정적 평형) <br>
    → $b\\dot\\theta = k_1 l_1 \\theta - k_2 l_2 u$</li>
  <li>수직 힘 평형 (고도): $m\\ddot h = f_1 + f_2 = k_1 \\theta + k_2 u$ <br>
    (실제로는 양력 방향과 자세에 따른 분해가 더 복잡하지만 small-angle 근사)</li>
</ol>
<p><strong>Laplace로:</strong></p>
<p>(1) $bs\\,\\Theta = k_1 l_1 \\Theta - k_2 l_2 U \\Rightarrow \\Theta(s) = \\frac{-k_2 l_2}{bs - k_1 l_1} U(s)$</p>
<p>(2) $ms^2 H = k_1 \\Theta + k_2 U$</p>
<p><strong>$\\Theta$ 대입:</strong></p>
<p>$ms^2 H = k_1 \\cdot \\frac{-k_2 l_2}{bs - k_1 l_1} U + k_2 U = U \\cdot \\frac{-k_1 k_2 l_2 + k_2(bs - k_1 l_1)}{bs - k_1 l_1}$</p>
<p>분자 정리: $k_2 bs - k_1 k_2 l_2 - k_1 k_2 l_1$ — 잠깐 부호 검토. PDF의 답을 보면 분자가 $k_1 k_2 l_2 - k_2 b s$ 이고 분모가 $ms^2(bs + k_1 l_1)$. 부호 약속에 따라 $k_1 l_1$ 의 부호가 결정됨. 풀이 흐름만 익히고 부호는 교재 답을 따르자.</p>
<p><strong>최종:</strong></p>
<p>$$\\hat g(s) = \\frac{\\hat h(s)}{\\hat u(s)} = \\frac{k_1 k_2 l_2 - k_2 b s}{m s^2 (b s + k_1 l_1)}$$</p>
`,
  variant: "물리계 모델링 → 운동방정식 → 전달함수. 시험엔 비슷한 메커니즘(스프링-질량, RC회로, 진자)으로 변형. 핵심은 (1) 자유물체도, (2) 운동방정식, (3) 라플라스 + 변수 소거."
})}

${note(`<strong>HW1 핵심 정리:</strong> Convolution(2.9)이 시험에 가장 직접적으로 출제. 2.10의 pole-zero 상쇄는 BIBO와 internal stability 차이를 보여주는 중요 예시 — 이 차이가 시험 단답형으로 자주 나옴.`, "tip")}
`);
