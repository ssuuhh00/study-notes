registerPage("exam-2", "모의고사 2", () => `
<h1>📝 모의고사 2</h1>
<p class="lead">총 100점 · 6문제. 모의고사 1과 같은 난이도, 다른 숫자·유형 조합 (coprimeness, duality, internal model, separation 포함).</p>

${note(`<strong>응시 안내:</strong> 모의고사 1과 동일 기조 — 개념 정의 + 표준 절차 적용. 행렬 2×2~3×3, 손계산 가능. 배점 큰 문제 3·4(각 20점)를 비중 있게.`, "info")}

${examProblem({
  num: 1,
  points: 15,
  topic: "Ch7 · Coprimeness 판정 + 최소실현 차수",
  statement: `Consider the transfer function
  $$\\hat{g}(s) = \\frac{(s-1)(s+2)}{(s-1)(s+3)} = \\frac{s^2 + s - 2}{s^2 + 2s - 3}.$$
  (a) Are the numerator $N(s)$ and denominator $D(s)$ (as written, degree 2) coprime? (5 pts)<br>
  (b) What is the degree of a minimal realization of $\\hat{g}(s)$? (5 pts)<br>
  (c) Does the un-cancelled form hide an internal stability problem? Explain. (5 pts)`,
  koreanText: `전달함수 $\\hat g(s)=\\frac{(s-1)(s+2)}{(s-1)(s+3)}$ 에 대해 (a) (2차로 쓴) 분자·분모가 coprime 인지, (b) 최소실현 차수, (c) 약분 전 형태가 내부 안정성 문제를 숨기는지 설명하라.`,
  answer: `
<p><strong>핵심:</strong> coprime = 두 다항식이 <strong>공통근(common factor)</strong> 이 없음. 최소실현 차수 = 기약분수로 줄인 뒤 분모 차수 = controllable & observable 한 실현의 상태 개수.</p>

<p><strong>(a) Coprimeness</strong></p>
<p>2차로 쓴 형태: $N(s) = s^2 + s - 2 = (s-1)(s+2)$, $D(s) = s^2 + 2s - 3 = (s-1)(s+3)$.</p>
<p>근: $N$ 의 근 $\\{1, -2\\}$, $D$ 의 근 $\\{1, -3\\}$. <strong>공통근 $s = 1$ 존재.</strong></p>
<p>$\\Rightarrow$ $\\boxed{N,D \\text{ NOT coprime}}$ (공통인수 $(s-1)$).</p>
<p><em>(동치 확인: 공통근이 있으므로 Sylvester resultant $= 0$.)</em></p>

<hr>

<p><strong>(b) 최소실현 차수</strong></p>
<p>공통인수 $(s-1)$ 약분:</p>
<p>$$\\hat{g}(s) = \\frac{(s-1)(s+2)}{(s-1)(s+3)} = \\frac{s+2}{s+3}.$$</p>
<p>기약분수 분모 차수 $= 1$.</p>
<p>$\\Rightarrow$ $\\boxed{\\text{minimal realization degree} = 1}$.</p>
<p>(주의: $\\frac{s+2}{s+3}$ 은 proper 이지만 strictly proper 아님 → $D = 1$ ($d = \\lim_{s\\to\\infty}\\hat g = 1$), $A,B,C$ 는 1차원. 예: $\\hat g = 1 - \\frac{1}{s+3}$ → $A=-3,\\,B=1,\\,C=-1,\\,D=1$.)</p>

<hr>

<p><strong>(c) 숨겨진 내부 안정성 문제?</strong></p>
<p>약분된 mode 는 $s = 1$, 즉 <strong>RHP(unstable)</strong> pole-zero 쌍. 이것이 핵심.</p>
<ul>
  <li>입출력 $\\hat g(s) = \\frac{s+2}{s+3}$ 만 보면 pole $-3$ → BIBO stable 처럼 보임.</li>
  <li>그러나 약분 전 원래 시스템(2차 실현)에는 $\\lambda = 1$ mode 가 물리적으로 존재. 이 mode 가 <strong>uncontrollable 또는 unobservable</strong> 이라 전달함수에서 사라졌을 뿐, 내부 상태로는 살아 발산($e^{t}$).</li>
  <li>$\\lambda=1$ 이 unstable 이므로 시스템은 <strong>not asymptotically stable</strong> 이고, stabilizable/detectable 조건도 깨질 수 있음.</li>
</ul>
<p><strong>결론:</strong> $\\boxed{\\text{예 — unstable pole-zero cancellation 이 내부 불안정을 숨김.}}$ 출력만 안정해 보여도 내부 상태가 발산 → 실제 시스템은 saturate/burn-out. <em>unstable mode 는 약분으로 제거 불가</em>.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$\\frac{s+2}{s+3}$ 만 보고 "stable, 문제없음" 결론 — 약분된 게 RHP 면 위험.</li>
  <li>최소실현 차수를 약분 <em>전</em> 분모 차수(2)로 답함. 반드시 기약분수 기준.</li>
  <li>$\\frac{s+2}{s+3}$ 을 strictly proper 로 착각 → $D=0$ 으로 잘못 둠(실제 $D=1$).</li>
</ul>
`
})}

${examProblem({
  num: 2,
  points: 15,
  topic: "Ch6 · Observability + Duality",
  statement: `Consider $\\dot{\\mathbf{x}} = A\\mathbf{x}$, $y = C\\mathbf{x}$ with
  $$A = \\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix},\\qquad C = \\begin{bmatrix}1 & 1\\end{bmatrix}.$$
  (a) Is $\\{A,C\\}$ observable? (6 pts)<br>
  (b) Using duality, restate the test as a controllability problem for $\\{A^{T}, C^{T}\\}$ and verify the result is consistent. (6 pts)<br>
  (c) Identify the unobservable mode via the PBH test. (3 pts)`,
  koreanText: `위 $(A,C)$ 에 대해 (a) $\\{A,C\\}$ 가관측성 판정, (b) 쌍대성으로 $\\{A^T,C^T\\}$ 가제어성 문제로 바꿔 결과 일치 확인, (c) PBH 로 unobservable mode 식별.`,
  answer: `
<p><strong>핵심:</strong> Duality — $\\{A,C\\}$ observable $\\iff$ $\\{A^T, C^T\\}$ controllable. observability 계산을 controllability 로 옮겨 동일한 답을 얻는지 교차검증.</p>

<p><strong>(a) Observability — $\\mathcal{O}=\\begin{bmatrix}C\\\\CA\\end{bmatrix}$</strong></p>
<p><strong>Step 1.</strong> $CA = [1\\;\\;1]\\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix} = [\\,0 - 2 \\quad 1 - 3\\,] = [-2\\;\\;-2]$</p>
<p><strong>Step 2.</strong> $\\mathcal{O} = \\begin{bmatrix}1 & 1 \\\\ -2 & -2\\end{bmatrix}$, $\\det\\mathcal{O} = (1)(-2) - (1)(-2) = -2 + 2 = 0$.</p>
<p>$\\rho(\\mathcal{O}) = 1 < 2 \\Rightarrow \\boxed{\\{A,C\\}\\text{ NOT observable}}$.</p>

<hr>

<p><strong>(b) Duality 로 controllability 문제 변환</strong></p>
<p>쌍대 시스템: $A^{T} = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$, $C^{T} = \\begin{bmatrix}1\\\\1\\end{bmatrix}$ (입력행렬 역할).</p>
<p>controllability matrix $\\mathcal{C}^{*} = [C^{T}\\;\\;A^{T}C^{T}]$:</p>
<p><strong>Step 1.</strong> $A^{T}C^{T} = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\begin{bmatrix}1\\\\1\\end{bmatrix} = \\begin{bmatrix}0 - 2\\\\1 - 3\\end{bmatrix} = \\begin{bmatrix}-2\\\\-2\\end{bmatrix}$</p>
<p><strong>Step 2.</strong> $\\mathcal{C}^{*} = \\begin{bmatrix}1 & -2 \\\\ 1 & -2\\end{bmatrix}$, $\\det = (1)(-2) - (-2)(1) = -2 + 2 = 0$.</p>
<p>$\\rho(\\mathcal{C}^{*}) = 1 < 2 \\Rightarrow \\{A^{T}, C^{T}\\}$ NOT controllable.</p>
<p><strong>일치 확인:</strong> $\\{A^{T},C^{T}\\}$ uncontrollable $\\iff$ $\\{A,C\\}$ unobservable. (a) 와 동일한 결론 ✓. (사실 $\\mathcal{C}^{*} = \\mathcal{O}^{T}$ 이므로 두 rank 가 항상 같음 — 여기서도 $\\mathcal{O}^T = \\begin{bmatrix}1 & -2\\\\1 & -2\\end{bmatrix} = \\mathcal{C}^*$.)</p>

<hr>

<p><strong>(c) PBH 로 unobservable mode 찾기</strong></p>
<p>eigenvalue: $\\det(\\lambda I - A) = \\lambda^2 + 3\\lambda + 2 = (\\lambda+1)(\\lambda+2)$ → $\\lambda = -1, -2$.</p>
<p>각 $\\lambda$ 에서 $\\rho\\!\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix} < n$ 인 것이 unobservable mode.</p>
<p><strong>$\\lambda = -1$:</strong> $\\begin{bmatrix}A+I\\\\C\\end{bmatrix} = \\begin{bmatrix}1 & 1 \\\\ -2 & -2 \\\\ 1 & 1\\end{bmatrix}$ — 모든 행이 $[1,1]$ 의 배수 → rank 1 $< 2$ → <strong>$\\lambda=-1$ unobservable</strong>.</p>
<p><strong>$\\lambda = -2$:</strong> $\\begin{bmatrix}A+2I\\\\C\\end{bmatrix} = \\begin{bmatrix}2 & 1 \\\\ -2 & -1 \\\\ 1 & 1\\end{bmatrix}$ — 1행 $[2,1]$, 3행 $[1,1]$ 독립 → rank 2 → observable mode.</p>
<p>$\\Rightarrow$ unobservable mode 는 $\\boxed{\\lambda = -1}$. ($-1$ 은 stable 이므로 시스템은 여전히 <strong>detectable</strong>: 모든 unstable mode 가 observable — 여기선 unstable mode 자체가 없음.)</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$CA$ 행벡터 곱 순서 — $C$($1\\times2$)$\\times A$($2\\times2$)$=1\\times2$. $AC$ 는 차원 안 맞음.</li>
  <li>duality 변환 시 $A^T$ 와 $C^T$ 동시에 전치하지 않고 하나만.</li>
  <li>"not observable = not detectable" 착각. unobservable mode 가 stable($-1$) 이라 detectable 은 유지.</li>
</ul>
`
})}

${examProblem({
  num: 3,
  points: 20,
  topic: "Ch9 · Coprime fraction 극배치 (Sylvester)",
  statement: `For the plant $\\hat{g}(s) = \\dfrac{1}{s^2 + s} = \\dfrac{1}{s(s+1)}$, design a unity-feedback controller $C(s) = \\dfrac{B(s)}{A(s)}$ so that the closed-loop characteristic polynomial is
  $$F(s) = (s+2)^3 = s^3 + 6s^2 + 12s + 8.$$
  (a) Give the minimal controller degree and confirm $D,N$ coprime. (4 pts)<br>
  (b) Solve for $A(s)=a_1 s + a_0$, $B(s)=b_1 s + b_0$. (12 pts)<br>
  (c) Write $C(s)$ and check that the closed loop tracks a unit step. (4 pts)`,
  koreanText: `플랜트 $\\hat g(s)=\\frac{1}{s(s+1)}$ 에 대해 폐루프 특성다항식이 $(s+2)^3=s^3+6s^2+12s+8$ 이 되도록 제어기 $C(s)=B/A$ 를 설계하라. (a) 최소 차수·coprime 확인, (b) 계수 풀이, (c) $C(s)$ 와 step 추종 확인.`,
  answer: `
<p><strong>구조:</strong> $F(s) = D(s)A(s) + N(s)B(s)$. 플랜트 $\\hat g = N/D$, 제어기 $C = B/A$.</p>

<p><strong>(a) 차수 & coprime</strong></p>
<p>$D(s) = s^2 + s$ ($n=2$), $N(s) = 1$.</p>
<p>$N(s)=1$ 은 근이 없음 → $D$ 와 공통근 불가능 → <strong>coprime</strong> ✓.</p>
<p>최소 제어기 차수 $m = n - 1 = 1$ → $A(s)=a_1 s + a_0$, $B(s)=b_1 s + b_0$ (미지수 4). $F$ 는 3차(계수 4) → 정사각 ✓.</p>
<p><em>참고:</em> 플랜트가 이미 $s=0$ 에 pole(적분기) 을 갖고 있어 step 추종이 자동으로 따라옴(아래 (c)).</p>

<hr>

<p><strong>(b) 계수 풀이</strong></p>
<p><strong>Step 1. 곱 전개</strong></p>
<p>$D(s)A(s) = (s^2 + s)(a_1 s + a_0) = a_1 s^3 + a_0 s^2 + a_1 s^2 + a_0 s = a_1 s^3 + (a_0 + a_1)s^2 + a_0 s$</p>
<p>$N(s)B(s) = 1\\cdot(b_1 s + b_0) = b_1 s + b_0$</p>
<p>$F(s) = D A + N B$ 의 계수:</p>
<table>
  <tr><th>차수</th><th>계수식</th><th>= 목표</th></tr>
  <tr><td>$s^3$</td><td>$a_1$</td><td>$1$</td></tr>
  <tr><td>$s^2$</td><td>$a_0 + a_1$</td><td>$6$</td></tr>
  <tr><td>$s^1$</td><td>$a_0 + b_1$</td><td>$12$</td></tr>
  <tr><td>$s^0$</td><td>$b_0$</td><td>$8$</td></tr>
</table>

<p><strong>Step 2. 순차 풀이</strong> (윗줄부터 바로 떨어짐)</p>
<p>① $a_1 = 1$.<br>
② $a_0 + a_1 = 6 \\Rightarrow a_0 = 5$.<br>
③ $a_0 + b_1 = 12 \\Rightarrow 5 + b_1 = 12 \\Rightarrow b_1 = 7$.<br>
④ $b_0 = 8$.</p>
<p>$$\\boxed{a_0 = 5,\\; a_1 = 1,\\; b_0 = 8,\\; b_1 = 7}$$</p>

<p><strong>검산:</strong> $D A + N B = (s^2+s)(s+5) + (7s+8)$<br>
$= s^3 + 5s^2 + s^2 + 5s + 7s + 8 = s^3 + 6s^2 + 12s + 8 = (s+2)^3$ ✓</p>

<hr>

<p><strong>(c) 제어기 & step 추종</strong></p>
<p>$$\\boxed{C(s) = \\frac{B(s)}{A(s)} = \\frac{7s + 8}{s + 5}}$$</p>
<p>proper ✓, 폐루프 극 $-2,-2,-2$ 모두 LHP ✓.</p>
<p><strong>DC gain 확인:</strong> $r\\to y$ 폐루프 $= \\dfrac{N(s)B(s)}{F(s)}$. $s=0$:</p>
<p>$N(0)=1,\\;B(0)=8,\\;F(0)=8$ → $\\dfrac{1\\cdot 8}{8} = 1$.</p>
<p>$\\Rightarrow$ DC gain $= 1$ → $\\boxed{y(\\infty)=r,\\text{ step 완전 추종}}$ ✓ (별도 feedforward 불필요).</p>
<p><em>이유:</em> 플랜트 분모에 $s$(적분기) 가 이미 있어 internal model principle 이 자연 충족 — 정상상태 오차 0.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$D = s^2 + s$ 에서 $a_0 s$ 교차항 누락(전개 시 $s\\cdot a_0$).</li>
  <li>$N=1$ 이라 $NB = B$ 인데 굳이 곱셈 단계에서 헷갈림.</li>
  <li>DC gain 안 보고 추종 결론 — 이 문제는 우연히 1 이지만 항상 확인해야.</li>
</ul>
`
})}

${examProblem({
  num: 4,
  points: 20,
  topic: "Ch8 · Robust tracking / Internal model (적분제어)",
  statement: `For the plant $\\dot{x} = -2x + u$, $y = x$, design an integral-augmented controller for robust step tracking.<br>
  (a) Form the augmented system with integrator state $x_a$ where $\\dot{x}_a = r - y$. (5 pts)<br>
  (b) With $u = -k_1 x + k_a x_a$, place the closed-loop poles at $-2$ and $-3$; solve for $k_1, k_a$. (10 pts)<br>
  (c) Argue, via the internal model principle, that $y(\\infty)=r$ for a step even if the plant parameter $-2$ drifts. (5 pts)`,
  koreanText: `플랜트 $\\dot x=-2x+u$, $y=x$ 에 대해 적분 augmented 제어기로 robust step tracking 을 설계하라. (a) 적분상태 $x_a$ ($\\dot x_a = r-y$) 로 augmented 시스템 구성, (b) $u=-k_1 x + k_a x_a$ 로 폐루프 극을 $-2,-3$ 에 배치하고 $k_1,k_a$ 풀이, (c) internal model 원리로 plant 파라미터가 변해도 step 추종됨을 논증.`,
  answer: `
<p><strong>전략:</strong> step 을 정확·robust 하게 추종하려면 제어기에 적분기($\\phi(s)=s$) 를 포함시켜야 함(internal model principle). 상태공간에선 에러 적분 $x_a$ 를 상태로 augment 한 뒤 augmented 시스템에 극배치.</p>

<p><strong>(a) Augmented 시스템</strong></p>
<p>적분상태: $\\dot{x}_a = r - y = r - x$. 원 plant: $\\dot{x} = -2x + u$. 합치면:</p>
<p>$$\\begin{bmatrix}\\dot{x}\\\\\\dot{x}_a\\end{bmatrix} = \\underbrace{\\begin{bmatrix}-2 & 0 \\\\ -1 & 0\\end{bmatrix}}_{A_a}\\begin{bmatrix}x\\\\x_a\\end{bmatrix} + \\underbrace{\\begin{bmatrix}1\\\\0\\end{bmatrix}}_{B_a}u + \\begin{bmatrix}0\\\\1\\end{bmatrix}r$$</p>
<p><strong>controllability 확인 (Thm 8.5):</strong> 원 plant controllable(1차, $B=1\\neq0$) 이고 plant 가 $s=0$ 에 zero 없음($N(s)=1$) → augmented plant controllable → 극 임의배치 가능 ✓<br>
직접 확인: $\\mathcal{C}_a = [B_a\\;\\;A_a B_a] = \\begin{bmatrix}1 & -2 \\\\ 0 & -1\\end{bmatrix}$, $\\det = -1 \\neq 0$ ✓</p>

<hr>

<p><strong>(b) 극배치</strong></p>
<p>제어법칙 $u = -k_1 x + k_a x_a = -[k_1\\;\\;-k_a]\\begin{bmatrix}x\\\\x_a\\end{bmatrix}$. 폐루프 $A_{cl} = A_a - B_a[k_1\\;\\;-k_a]$:</p>
<p>$B_a[k_1\\;\\;-k_a] = \\begin{bmatrix}1\\\\0\\end{bmatrix}[k_1\\;\\;-k_a] = \\begin{bmatrix}k_1 & -k_a \\\\ 0 & 0\\end{bmatrix}$</p>
<p>$$A_{cl} = \\begin{bmatrix}-2 - k_1 & 0 - (-k_a) \\\\ -1 & 0\\end{bmatrix} = \\begin{bmatrix}-2 - k_1 & k_a \\\\ -1 & 0\\end{bmatrix}$$</p>
<p><strong>특성다항식:</strong></p>
<p>$sI - A_{cl} = \\begin{bmatrix}s + 2 + k_1 & -k_a \\\\ 1 & s\\end{bmatrix}$</p>
<p>$\\det = s(s + 2 + k_1) - (-k_a)(1) = s^2 + (2 + k_1)s + k_a$</p>
<p><strong>원하는 다항식:</strong> $(s+2)(s+3) = s^2 + 5s + 6$.</p>
<p>매칭:<br>
$s^1$: $2 + k_1 = 5 \\Rightarrow \\boxed{k_1 = 3}$<br>
$s^0$: $\\boxed{k_a = 6}$</p>
<p><strong>검산:</strong> $A_{cl} = \\begin{bmatrix}-5 & 6 \\\\ -1 & 0\\end{bmatrix}$, $\\det = 0 - (6)(-1) = 6$, $\\text{tr} = -5$ → 특성다항식 $s^2 + 5s + 6 = (s+2)(s+3)$ ✓</p>

<hr>

<p><strong>(c) Internal model principle 으로 robust tracking 논증</strong></p>
<p>제어기가 에러 $e = r - y$ 의 <strong>적분</strong>을 포함($x_a = \\int e\\,dt$) → 제어기 전달함수가 $s=0$ 에 극(=$1/s$, internal model of step) 을 가짐.</p>
<p><strong>핵심 논리:</strong> 폐루프가 안정한 한, 정상상태에서 모든 신호가 정착하려면 $\\dot{x}_a = e \\to 0$ 이어야 함(안 그러면 $x_a$ 가 계속 증가 → 정착 모순). 즉 $\\boxed{e(\\infty) = r - y(\\infty) = 0 \\Rightarrow y(\\infty) = r}$.</p>
<p><strong>왜 robust 한가:</strong> 이 논리는 plant 의 파라미터 값(여기 $-2$) 에 <em>전혀 의존하지 않음</em>. 파라미터가 $-2 \\to -2.1$ 등으로 drift 해도, (i) 폐루프가 여전히 안정하고 (ii) 적분기가 살아 있는 한 $e(\\infty)=0$ 은 그대로 유지. 정상상태 오차가 plant gain 에 의존하던 순수 비례제어(feedforward) 와 대조적. 이것이 적분(internal model) 제어의 강건성.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$u = -k_1 x + k_a x_a$ 의 부호를 $-[k_1\\;\\;-k_a]$ 로 바르게 옮기지 못해 $A_{cl}$ 의 $(1,2)$ 성분 부호 틀림.</li>
  <li>적분상태 정의 $\\dot x_a = r - y$ (출력에서 reference 빼는 게 아니라 reference 에서 출력 뺌) 부호.</li>
  <li>Thm 8.5 의 "plant 가 $s=0$ 에 zero 없음" 조건 누락 — zero 있으면 적분기와 약분돼 추종 실패.</li>
</ul>
`
})}

${examProblem({
  num: 5,
  points: 15,
  topic: "Ch8 · Separation principle (state feedback + observer)",
  statement: `For the plant
  $$\\dot{\\mathbf{x}} = \\begin{bmatrix}0 & 1 \\\\ 0 & -2\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}0\\\\1\\end{bmatrix}u,\\quad y = \\begin{bmatrix}1 & 0\\end{bmatrix}\\mathbf{x},$$
  (a) Find $K$ for controller poles at $-2,-3$. (5 pts)<br>
  (b) Find $L$ for observer error poles at $-10,-10$. (5 pts)<br>
  (c) State the full set of closed-loop poles when the estimated state is fed back, and name the principle used. (5 pts)`,
  koreanText: `위 플랜트에 대해 (a) 제어극 $-2,-3$ 을 위한 $K$, (b) 관측오차극 $-10,-10$ 을 위한 $L$ 을 구하고, (c) 추정상태를 궤환했을 때 전체 폐루프 극 집합과 사용된 원리를 서술하라.`,
  answer: `
<p><strong>전략:</strong> separation principle — $K$ 와 $L$ 을 독립적으로 설계하면 전체 폐루프 극 = {제어극} ∪ {관측극}. 먼저 controllable·observable 확인.</p>
<p>$\\mathcal{C} = [B\\;AB] = \\begin{bmatrix}0 & 1 \\\\ 1 & -2\\end{bmatrix}$, $\\det = -1 \\neq 0$ → controllable ✓.<br>
$\\mathcal{O} = \\begin{bmatrix}C\\\\CA\\end{bmatrix} = \\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix}$, $\\det = 1$ → observable ✓.</p>

<p><strong>(a) State feedback $K = [k_1\\;\\;k_2]$</strong></p>
<p>$A - BK = \\begin{bmatrix}0 & 1 \\\\ -k_1 & -2 - k_2\\end{bmatrix}$</p>
<p>$\\det(sI - (A-BK)) = s(s + 2 + k_2) + k_1 = s^2 + (2 + k_2)s + k_1$</p>
<p>원하는 $(s+2)(s+3) = s^2 + 5s + 6$:<br>
$k_1 = 6$, $2 + k_2 = 5 \\Rightarrow k_2 = 3$.</p>
<p>$$\\boxed{K = [\\,6 \\quad 3\\,]}$$</p>
<p><em>검산:</em> $A-BK = \\begin{bmatrix}0&1\\\\-6&-5\\end{bmatrix}$, 특성다항식 $s^2+5s+6$ ✓</p>

<hr>

<p><strong>(b) Observer gain $L = [l_1\\;\\;l_2]^{T}$</strong></p>
<p>$LC = \\begin{bmatrix}l_1\\\\l_2\\end{bmatrix}[1\\;\\;0] = \\begin{bmatrix}l_1 & 0 \\\\ l_2 & 0\\end{bmatrix}$, $A - LC = \\begin{bmatrix}-l_1 & 1 \\\\ -l_2 & -2\\end{bmatrix}$</p>
<p>$sI - (A-LC) = \\begin{bmatrix}s + l_1 & -1 \\\\ l_2 & s+2\\end{bmatrix}$</p>
<p>$\\det = (s+l_1)(s+2) - (-1)(l_2) = s^2 + (l_1 + 2)s + (2l_1 + l_2)$</p>
<p>원하는 $(s+10)^2 = s^2 + 20s + 100$:<br>
$l_1 + 2 = 20 \\Rightarrow l_1 = 18$<br>
$2l_1 + l_2 = 100 \\Rightarrow 36 + l_2 = 100 \\Rightarrow l_2 = 64$.</p>
<p>$$\\boxed{L = \\begin{bmatrix}18\\\\64\\end{bmatrix}}$$</p>
<p><em>검산:</em> $A-LC = \\begin{bmatrix}-18 & 1 \\\\ -64 & -2\\end{bmatrix}$, $\\det = 36 + 64 = 100$, $\\text{tr} = -20$ → $s^2 + 20s + 100 = (s+10)^2$ ✓</p>

<hr>

<p><strong>(c) 전체 폐루프 극 & 원리</strong></p>
<p>추정상태 궤환 $u = r - K\\hat{\\mathbf{x}}$ 를 쓰면, 좌표 $(\\mathbf{x}, e)$ ($e=\\mathbf{x}-\\hat{\\mathbf{x}}$) 에서 시스템 행렬이
$$\\begin{bmatrix}A - BK & BK \\\\ 0 & A - LC\\end{bmatrix}$$
블록 상삼각이 됨 → 고유값 = $\\{A-BK\\text{ 의 극}\\} \\cup \\{A-LC\\text{ 의 극}\\}$ — 서로 영향 없음.</p>
<p>$$\\boxed{\\text{closed-loop poles} = \\{-2,\\,-3\\} \\cup \\{-10,\\,-10\\} = \\{-2,\\,-3,\\,-10,\\,-10\\}}$$</p>
<p>사용 원리: $\\boxed{\\text{Separation Principle (분리 원리)}}$ — 제어기와 추정기를 따로 설계해도 합쳐지면 각자의 극이 그대로 보존. 또한 입출력 전달함수는 관측기가 없는 것($u=r-K\\mathbf{x}$)과 동일($e$ mode 는 uncontrollable from $r$, 상쇄됨).</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>전체 극을 4개($n + n = 2+2$)가 아닌 2개로 답함 — augmented 차원은 $2n$.</li>
  <li>관측극을 제어극보다 느리게 잡음. 보통 훨씬 왼쪽(여기 $-10$).</li>
  <li>$L$ 의 $(2,1)$ 성분 부호 ($-l_2$) 누락.</li>
</ul>
`
})}

${examProblem({
  num: 6,
  points: 15,
  topic: "Ch9 · 개념 (internal model / model matching / total stability)",
  statement: `(a) State the <em>internal model principle</em> and give $\\phi(s)$ for tracking a step and a sinusoid $\\sin(\\omega t)$. (5 pts)<br>
  (b) Explain the difference between <em>pole placement</em> and <em>model matching</em>. (5 pts)<br>
  (c) Give the condition (Corollary 9.3) for robust tracking via internal model, and a numerical example showing why robustness matters when the plant drifts. (5 pts)`,
  koreanText: `(a) internal model principle 서술 및 step·$\\sin(\\omega t)$ 추종용 $\\phi(s)$, (b) pole placement 와 model matching 차이, (c) internal model robust tracking 의 조건(Corollary 9.3)과 plant 변동 시 robustness 가 필요한 수치 예.`,
  answer: `
<p><strong>(a) Internal Model Principle</strong></p>
<p><strong>서술:</strong> reference $r$ (및 disturbance $w$) 를 정상상태 오차 0 으로 추종/제거하려면, 그 신호의 <em>unstable mode 를 생성하는 모델</em>(generator) 을 <strong>제어기 분모(feedback loop 내부)</strong>에 포함시켜야 한다. 그러면 폐루프가 안정한 한 plant 파라미터 변동에도 robust 하게 추종.</p>
<p>$\\phi(s)$ = $r,w$ 의 unstable pole 들의 LCM(최소공배수):</p>
<ul>
  <li><strong>step</strong> ($r = a/s$): unstable pole $s=0$ → $\\boxed{\\phi(s) = s}$ (적분기 $1/s$).</li>
  <li><strong>$\\sin(\\omega t)$</strong> (pole $s=\\pm j\\omega$): $\\boxed{\\phi(s) = s^2 + \\omega^2}$.</li>
</ul>
<p>제어기 분모에 $\\phi(s)$ 를 넣음: $C(s) = \\dfrac{B(s)}{A(s)\\phi(s)}$.</p>

<hr>

<p><strong>(b) Pole placement vs Model matching</strong></p>
<table>
  <tr><th></th><th>Pole placement</th><th>Model matching</th></tr>
  <tr><td>목표</td><td>폐루프 <em>극(pole)</em> 만 원하는 위치로</td><td>$r\\to y$ 전달함수 전체($=G_o(s)$, 극+영점)를 목표모델과 일치</td></tr>
  <tr><td>자유도</td><td>특성다항식 계수 매칭</td><td>$G_o(s)$ 의 분자·분모 모두 지정</td></tr>
  <tr><td>한계</td><td>zero 는 제어 못 함, DC gain 별도</td><td>plant 의 RHP zero 는 제거 불가(implementable 제약)</td></tr>
</table>
<p>요약: pole placement 는 안정성·과도응답 형상만, model matching 은 입출력 동특성 전체를 설계. $G_o(s)=1$ 이면 "조종간 그대로 출력"(best possible) 이지만 RHP zero/relative degree 때문에 항상 가능하진 않음.</p>

<hr>

<p><strong>(c) Robust tracking 조건 + 수치 예</strong></p>
<p><strong>Corollary 9.3 조건:</strong></p>
<ol>
  <li>plant $N,D$ <strong>coprime</strong>.</li>
  <li>$\\phi(s)$ 의 근이 $N(s)$ 의 <strong>zero 가 아님</strong> (겹치면 internal model 이 plant zero 와 약분 → 추종 실패).</li>
</ol>
<p>두 조건 충족 + 폐루프 안정이면 $r,w$ 의 그 모드에 대해 정상상태 오차 0, 그리고 plant 파라미터 변동에 robust.</p>
<p><strong>수치 예 (왜 robust 가 필요한가):</strong> 적분기 <em>없이</em> 순수 feedforward gain 으로 step 추종을 맞췄다고 하자. 예컨대 plant $G_0(s) = \\dfrac{s-2}{s^2 - 1}$ 의 DC gain $G_0(0) = \\dfrac{-2}{-1} = 2$ 에 맞춰 feedforward $1/2$ 를 곱해 $y(\\infty)=r$ 을 맞춤.<br>
그런데 plant 가 $G_1(s) = \\dfrac{s - 2.1}{s^2 - 0.95}$ 로 drift 하면 $G_1(0) = \\dfrac{-2.1}{-0.95} \\approx 2.21$. feedforward 는 여전히 $1/2$ 이므로 폐루프 DC gain $\\approx \\dfrac{2.21}{2} = 1.105$ → step 의 <strong>약 10% 추종오차</strong> 발생.<br>
반면 internal model(적분기 $\\phi=s$) 제어기는 폐루프가 안정하기만 하면 DC 에서 오차를 강제로 0 으로 만들어 — 위 drift 에도 $y(\\infty)=r$ 유지. 이것이 robustness 의 본질.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$\\phi(s)$ 를 reference 의 <em>모든</em> pole 로 잡음 — <strong>unstable</strong> pole 만(stable pole 은 어차피 감쇠).</li>
  <li>Corollary 9.3 의 "$\\phi$ 근 ≠ $N$ zero" 조건 누락 — step($\\phi=s$, 근 0)인데 plant 가 $s=0$ 에 zero 있으면 실패.</li>
  <li>model matching 에서 RHP zero 도 옮길 수 있다고 착각(불가, implementable 위반).</li>
</ul>
`
})}

${note(`<strong>채점 가이드:</strong><br>
- Q1: not coprime(공통근 $s=1$) + 최소차수 1 + RHP cancellation 위험 언급.<br>
- Q2: not observable + duality 로 $\\mathcal{C}^*=\\mathcal{O}^T$ 일치 + unobservable mode $-1$.<br>
- Q3: $a=(5,1),b=(8,7)$, $C(s)=\\frac{7s+8}{s+5}$, DC gain 1(추종).<br>
- Q4: $k_1=3,k_a=6$, internal model 로 robust 논증.<br>
- Q5: $K=[6\\;3]$, $L=[18\\;64]^T$, 극 $\\{-2,-3,-10,-10\\}$, separation principle.<br>
- Q6: $\\phi(s)=s$ / $s^2+\\omega^2$, pole placement vs model matching, Corollary 9.3 두 조건.<br><br>
<strong>모의고사 1·2 모두 75점 이상이면 시험 무난.</strong> 60점 미만이면 약점 챕터 한 번 더.`, "tip")}
`);
