registerPage("exam-1", "모의고사 1", () => `
<h1>📝 모의고사 1</h1>
<p class="lead">총 100점 · 6문제. 기말 전 범위(Ch6~Ch9) 골고루. 종이/펜으로 풀고, 다 푼 뒤 답안 펼쳐 채점.</p>

${note(`<strong>응시 안내:</strong> 계산기 없이 손계산 가능한 수준이지만 풀이 과정도 같이 적기(부분점수). 행렬은 모두 2×2~3×3. 배점이 큰 <strong>문제 5(Coprime fraction 극배치, 25점)</strong>를 비중 있게 풀어라.`, "info")}

${examProblem({
  num: 1,
  points: 15,
  topic: "Ch6 · Controllability / Observability 판정",
  statement: `Consider the system $\\dot{\\mathbf{x}} = A\\mathbf{x} + B u,\\; y = C\\mathbf{x}$ with
  $$A = \\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix},\\quad B = \\begin{bmatrix}0\\\\1\\end{bmatrix},\\quad C = \\begin{bmatrix}1 & 0\\end{bmatrix}.$$
  (a) Is $\\{A,B\\}$ controllable? (5 pts)<br>
  (b) Is $\\{A,C\\}$ observable? (5 pts)<br>
  (c) Verify controllability of $\\{A,B\\}$ using the PBH test. (5 pts)`,
  koreanText: `위 $(A,B,C)$ 시스템에 대해 (a) $\\{A,B\\}$ 가제어성, (b) $\\{A,C\\}$ 가관측성을 판정하고, (c) PBH 검정으로 가제어성을 다시 확인하라.`,
  answer: `
<p><strong>전략:</strong> $n=2$ 라 controllability matrix $\\mathcal{C}=[B\\;\\;AB]$, observability matrix $\\mathcal{O}=\\begin{bmatrix}C\\\\CA\\end{bmatrix}$ 의 rank(=det 0 여부)만 보면 끝. PBH 는 각 eigenvalue 마다 $\\rho([A-\\lambda I\\;\\;B])=n$ 확인.</p>

<p><strong>(a) Controllability — $\\mathcal{C}=[B\\;\\;AB]$</strong></p>
<p><strong>Step 1.</strong> $AB$ 계산:</p>
<p>$AB = \\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix}\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\begin{bmatrix}1\\\\-3\\end{bmatrix}$</p>
<p><strong>Step 2.</strong> 행렬 구성·rank:</p>
<p>$$\\mathcal{C} = [B\\;\\;AB] = \\begin{bmatrix}0 & 1 \\\\ 1 & -3\\end{bmatrix},\\qquad \\det\\mathcal{C} = (0)(-3) - (1)(1) = -1 \\neq 0$$</p>
<p>$\\rho(\\mathcal{C}) = 2 = n$ $\\Rightarrow$ $\\boxed{\\{A,B\\}\\text{ controllable}}$ ✓</p>

<hr>

<p><strong>(b) Observability — $\\mathcal{O}=\\begin{bmatrix}C\\\\CA\\end{bmatrix}$</strong></p>
<p><strong>Step 1.</strong> $CA$ 계산:</p>
<p>$CA = \\begin{bmatrix}1 & 0\\end{bmatrix}\\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix} = \\begin{bmatrix}0 & 1\\end{bmatrix}$</p>
<p><strong>Step 2.</strong> 행렬 구성·rank:</p>
<p>$$\\mathcal{O} = \\begin{bmatrix}C\\\\CA\\end{bmatrix} = \\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix},\\qquad \\det\\mathcal{O} = 1 \\neq 0$$</p>
<p>$\\rho(\\mathcal{O}) = 2 = n$ $\\Rightarrow$ $\\boxed{\\{A,C\\}\\text{ observable}}$ ✓</p>

<hr>

<p><strong>(c) PBH test (가제어성)</strong></p>
<p><strong>Step 1. Eigenvalue 먼저.</strong> $\\det(\\lambda I - A) = \\lambda(\\lambda+3) - (-1)(2) = \\lambda^2 + 3\\lambda + 2 = (\\lambda+1)(\\lambda+2)$ → $\\lambda = -1, -2$ (둘 다 LHP).</p>
<p><strong>Step 2.</strong> 각 $\\lambda$ 에서 $\\rho([A-\\lambda I\\;\\;B]) = 2$ 인지 확인 ($2\\times 3$ 행렬, rank 2 면 full).</p>
<p><strong>$\\lambda = -1$:</strong></p>
<p>$[A+I\\;\\;B] = \\begin{bmatrix}0+1 & 1 & | & 0 \\\\ -2 & -3+1 & | & 1\\end{bmatrix} = \\begin{bmatrix}1 & 1 & | & 0 \\\\ -2 & -2 & | & 1\\end{bmatrix}$</p>
<p>1, 2열은 평행하지만 $B=[0,1]^T$ 열이 둘째 행을 살려줌. 예: 1열 $[1,-2]^T$ 와 3열 $[0,1]^T$ 가 독립 → rank 2 ✓</p>
<p><strong>$\\lambda = -2$:</strong></p>
<p>$[A+2I\\;\\;B] = \\begin{bmatrix}2 & 1 & | & 0 \\\\ -2 & -1 & | & 1\\end{bmatrix}$</p>
<p>1열 $[2,-2]^T$, 3열 $[0,1]^T$ 독립 → rank 2 ✓</p>
<p>모든 eigenvalue 에서 full rank $\\Rightarrow$ $\\boxed{\\text{controllable}}$ — (a) 와 일치 ✓</p>

<p><strong>검산:</strong> (참고) controllable canonical form 의 $A$ 이므로 $\\{A,B\\}$ 가 controllable 인 것은 당연. $C=[1\\;0]$ 도 observability matrix 가 항등행렬이 되어 자동으로 observable. 두 결과 모두 구조적으로 정합.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$\\mathcal{O}$ 의 행 순서 — $C$ 가 위, $CA$ 가 아래. 뒤집으면 의미는 같으나 헷갈림.</li>
  <li>PBH 에서 eigenvalue 가 아닌 임의의 $s$ 에서 검사 — eigenvalue 가 아니면 $A-sI$ 자체가 full rank 라 항상 통과(무의미). <strong>반드시 eigenvalue 에서만</strong>.</li>
  <li>$AB$ 곱셈 순서 실수 ($BA$ 는 차원이 안 맞음).</li>
</ul>
`
})}

${examProblem({
  num: 2,
  points: 15,
  topic: "Ch6 · Stabilizable / Detectable 판정",
  statement: `Consider
  $$\\dot{\\mathbf{x}} = \\begin{bmatrix}0 & 1 \\\\ 0 & -3\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}1\\\\0\\end{bmatrix}u,\\qquad y = \\begin{bmatrix}0 & 1\\end{bmatrix}\\mathbf{x}.$$
  (a) Determine controllability and observability. (5 pts)<br>
  (b) Is the system stabilizable? Use the PBH test to identify the uncontrollable mode. (5 pts)<br>
  (c) Is the system detectable? Explain. (5 pts)`,
  koreanText: `위 시스템에 대해 (a) 가제어성·가관측성 판정, (b) PBH 로 uncontrollable mode 를 찾고 stabilizable 여부 판정, (c) detectable 여부를 설명하라.`,
  answer: `
<p><strong>핵심 정의:</strong> <strong>Stabilizable</strong> = 모든 <em>unstable</em> mode 가 controllable. <strong>Detectable</strong> = 모든 <em>unstable</em> mode 가 observable. (안정한 mode 는 uncontrollable/unobservable 여도 무방.)</p>
<p>먼저 eigenvalue: $A$ 가 상삼각 → $\\lambda = 0,\\,-3$. 여기서 $\\lambda=0$ 은 LHP 가 아님(허수축) → <strong>unstable mode</strong>(엄밀히는 marginally; asymptotic stability 기준으로 unstable 취급). $\\lambda=-3$ 은 stable.</p>

<p><strong>(a) Controllability & Observability</strong></p>
<p><strong>Controllability:</strong> $AB = \\begin{bmatrix}0 & 1 \\\\ 0 & -3\\end{bmatrix}\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\begin{bmatrix}0\\\\0\\end{bmatrix}$</p>
<p>$\\mathcal{C} = [B\\;\\;AB] = \\begin{bmatrix}1 & 0 \\\\ 0 & 0\\end{bmatrix}$, $\\det = 0$, $\\rho(\\mathcal{C}) = 1 < 2$ → <strong>not controllable</strong>.</p>
<p><strong>Observability:</strong> $CA = \\begin{bmatrix}0 & 1\\end{bmatrix}\\begin{bmatrix}0 & 1 \\\\ 0 & -3\\end{bmatrix} = \\begin{bmatrix}0 & -3\\end{bmatrix}$</p>
<p>$\\mathcal{O} = \\begin{bmatrix}0 & 1 \\\\ 0 & -3\\end{bmatrix}$, $\\det = 0$, $\\rho(\\mathcal{O}) = 1 < 2$ → <strong>not observable</strong>.</p>

<hr>

<p><strong>(b) Stabilizable? — PBH 로 uncontrollable mode 찾기</strong></p>
<p>각 eigenvalue 에서 $\\rho([A-\\lambda I\\;\\;B])$ 확인.</p>
<p><strong>$\\lambda = 0$:</strong></p>
<p>$[A-0I\\;\\;B] = \\begin{bmatrix}0 & 1 & | & 1 \\\\ 0 & -3 & | & 0\\end{bmatrix}$ — 2열 $[1,-3]^T$, 3열 $[1,0]^T$ 독립 → rank 2 = $n$ → $\\lambda=0$ 은 <strong>controllable mode</strong> ✓</p>
<p><strong>$\\lambda = -3$:</strong></p>
<p>$[A+3I\\;\\;B] = \\begin{bmatrix}3 & 1 & | & 1 \\\\ 0 & 0 & | & 0\\end{bmatrix}$ — 둘째 행이 통째로 0 → rank 1 $< 2$ → $\\lambda=-3$ 이 <strong>uncontrollable mode</strong>.</p>
<p><strong>판정:</strong> uncontrollable 인 mode 가 $\\lambda=-3$ (stable). unstable mode($\\lambda=0$)는 controllable. <br>
$\\Rightarrow$ "모든 unstable mode 가 controllable" 충족 $\\Rightarrow$ $\\boxed{\\text{Stabilizable (안정화 가능)}}$ ✓</p>

<hr>

<p><strong>(c) Detectable? — PBH observability</strong></p>
<p>각 eigenvalue 에서 $\\rho\\!\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}$ 확인.</p>
<p><strong>$\\lambda = 0$:</strong></p>
<p>$\\begin{bmatrix}A-0I\\\\C\\end{bmatrix} = \\begin{bmatrix}0 & 1 \\\\ 0 & -3 \\\\ 0 & 1\\end{bmatrix}$ — 1열이 전부 0 → rank 1 $< 2$ → $\\lambda=0$ 이 <strong>unobservable mode</strong>.</p>
<p><strong>판정:</strong> unobservable 인 mode 가 $\\lambda=0$ (unstable). 즉 <strong>unstable mode 가 observable 하지 않음</strong>. <br>
$\\Rightarrow$ $\\boxed{\\text{NOT detectable (가검출성 없음)}}$</p>
<p><em>해석:</em> 출력 $y=x_2$ 만 보면 $x_1$ 방향(=$\\lambda=0$ 모드)에서 일어나는 발산을 전혀 감지 못 함. observer 를 설계해도 그 모드의 오차가 0 으로 수렴하지 않는다.</p>

<p><strong>검산(요약표):</strong></p>
<table>
  <tr><th>mode $\\lambda$</th><th>controllable?</th><th>observable?</th><th>stable?</th></tr>
  <tr><td>$0$</td><td>O</td><td>X</td><td>X(unstable)</td></tr>
  <tr><td>$-3$</td><td>X</td><td>O</td><td>O(stable)</td></tr>
</table>
<p>unstable mode($0$): controllable O → <strong>stabilizable</strong>. observable X → <strong>not detectable</strong>. 표와 결론 정합 ✓</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>"not controllable = not stabilizable" 로 착각. stabilizable 은 <em>unstable</em> mode 만 보면 됨.</li>
  <li>$\\lambda=0$ 을 stable 로 분류 — 허수축 위는 asymptotic stability 기준으로 unstable.</li>
  <li>detectability 와 observability 를 동일시 — observable 이 아니어도 detectable 일 수 있음(이 문제는 둘 다 X 지만 이유가 다름).</li>
</ul>
`
})}

${examProblem({
  num: 3,
  points: 20,
  topic: "Ch8 · State feedback 극배치",
  statement: `For the plant
  $$\\dot{\\mathbf{x}} = \\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}0\\\\1\\end{bmatrix}u,$$
  design a state feedback $u = r - K\\mathbf{x}$, $K=[k_1\\;\\;k_2]$, so that the closed-loop poles are at $-2$ and $-3$. (15 pts)<br>
  Then find the feedforward gain $p$ in $u = pr - K\\mathbf{x}$ so that $y(\\infty)=r$ for a step, given $C=[1\\;0]$. (5 pts)`,
  koreanText: `위 플랜트에 대해 폐루프 극이 $-2, -3$ 이 되도록 상태궤환 $u=r-K\\mathbf{x}$, $K=[k_1\\;k_2]$ 를 설계하라. 이후 $C=[1\\;0]$ 일 때 step 입력에 $y(\\infty)=r$ 가 되도록 feedforward gain $p$ 를 구하라.`,
  answer: `
<p><strong>전략:</strong> $\\{A,B\\}$ controllable(문제1 에서 확인) → 극 임의배치 가능. $\\det(sI-(A-BK))$ 의 계수를 원하는 특성다항식 $\\Delta_d(s)$ 와 매칭해 $K$ 를 푼다. 이 $A,B$ 는 controllable canonical form 이라 계산이 깔끔.</p>

<p><strong>Step 1. 원하는 특성다항식</strong></p>
<p>$\\Delta_d(s) = (s+2)(s+3) = s^2 + 5s + 6$</p>

<p><strong>Step 2. $A - BK$ 구성</strong></p>
<p>$BK = \\begin{bmatrix}0\\\\1\\end{bmatrix}[k_1\\;\\;k_2] = \\begin{bmatrix}0 & 0 \\\\ k_1 & k_2\\end{bmatrix}$</p>
<p>$A - BK = \\begin{bmatrix}0 & 1 \\\\ -2 - k_1 & -3 - k_2\\end{bmatrix}$</p>

<p><strong>Step 3. 특성다항식 전개</strong></p>
<p>$sI - (A-BK) = \\begin{bmatrix}s & -1 \\\\ 2+k_1 & s+3+k_2\\end{bmatrix}$</p>
<p>$\\det = s(s+3+k_2) - (-1)(2+k_1) = s^2 + (3+k_2)s + (2+k_1)$</p>

<p><strong>Step 4. 계수 매칭</strong></p>
<p>$s^1$: $3 + k_2 = 5 \\Rightarrow \\boxed{k_2 = 2}$<br>
$s^0$: $2 + k_1 = 6 \\Rightarrow \\boxed{k_1 = 4}$</p>
<p>$$\\boxed{K = [\\,4\\quad 2\\,]}$$</p>

<p><strong>검산:</strong> $A - BK = \\begin{bmatrix}0 & 1 \\\\ -6 & -5\\end{bmatrix}$. 특성다항식 $= s^2 + 5s + 6 = (s+2)(s+3)$ ✓ — 원하는 극 그대로.</p>

<hr>

<p><strong>Feedforward gain $p$ — step tracking</strong></p>
<p>$u = pr - Kx$ 이면 폐루프 $\\dot x = (A-BK)x + Bp\\,r$, $y = Cx$. 폐루프 전달함수의 DC gain:</p>
<p>$$G_{cl}(0) = C(-(A-BK))^{-1}B \\cdot p = -C(A-BK)^{-1}B \\cdot p$$</p>
<p><strong>Step 1.</strong> $A_{cl} = A-BK = \\begin{bmatrix}0 & 1 \\\\ -6 & -5\\end{bmatrix}$, $A_{cl}^{-1} = \\dfrac{1}{\\det}\\begin{bmatrix}-5 & -1 \\\\ 6 & 0\\end{bmatrix}$, $\\det A_{cl} = 0\\cdot(-5) - (1)(-6) = 6$.</p>
<p>$A_{cl}^{-1} = \\dfrac{1}{6}\\begin{bmatrix}-5 & -1 \\\\ 6 & 0\\end{bmatrix}$</p>
<p><strong>Step 2.</strong> $A_{cl}^{-1}B = \\dfrac{1}{6}\\begin{bmatrix}-5 & -1 \\\\ 6 & 0\\end{bmatrix}\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\dfrac{1}{6}\\begin{bmatrix}-1\\\\0\\end{bmatrix}$</p>
<p>$C A_{cl}^{-1}B = [1\\;0]\\cdot \\dfrac{1}{6}\\begin{bmatrix}-1\\\\0\\end{bmatrix} = -\\dfrac{1}{6}$</p>
<p><strong>Step 3.</strong> DC gain (단위 $p$ 일 때) $= -CA_{cl}^{-1}B = \\dfrac{1}{6}$. tracking 조건 $G_{cl}(0)\\cdot p = 1$:</p>
<p>$$\\dfrac{1}{6}\\,p = 1 \\;\\Rightarrow\\; \\boxed{p = 6}$$</p>
<p><strong>검산(빠른 길):</strong> 폐루프 전달함수 $= \\dfrac{p\\cdot N(s)}{\\Delta_d(s)}$. 여기서 plant 분자 $N(s)=1$(원래 $C(sI-A)^{-1}B = \\frac{1}{s^2+3s+2}$ 의 분자), 그래서 $G_{cl}(0) = \\dfrac{p\\cdot 1}{6}$. $=1$ 되려면 $p=6$ ✓.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$A-BK$ 의 마지막 행 부호: $-2-k_1,\\,-3-k_2$ 인데 $+$ 로 적기 쉬움.</li>
  <li>feedforward 에서 DC gain 을 $\\hat g(0)$ 대신 open-loop 로 계산. 반드시 <em>폐루프</em> $A-BK$ 로.</li>
  <li>$K$ 자체가 안정성을 보장하지 feedforward $p$ 는 안정성과 무관(정상상태 크기만 맞춤)임을 혼동.</li>
</ul>
`
})}

${examProblem({
  num: 4,
  points: 15,
  topic: "Ch8 · Observer gain $L$ 설계",
  statement: `For the plant of Problem 3 with output $y = C\\mathbf{x}$, $C=[1\\;\\;0]$, design a full-order state observer
  $$\\dot{\\hat{\\mathbf{x}}} = A\\hat{\\mathbf{x}} + Bu + L(y - C\\hat{\\mathbf{x}}),\\quad L = \\begin{bmatrix}l_1\\\\l_2\\end{bmatrix},$$
  so that the observer error poles are both at $-6$. (15 pts)`,
  koreanText: `문제3의 플랜트와 $C=[1\\;0]$ 출력에 대해, 관측오차 극이 모두 $-6$ 이 되도록 full-order observer 의 $L$ 을 설계하라.`,
  answer: `
<p><strong>전략:</strong> 추정오차 $e=\\mathbf{x}-\\hat{\\mathbf{x}}$ 는 $\\dot e = (A-LC)e$ 를 따름(입력·상태와 decouple). $\\{A,C\\}$ observable(문제1) 이므로 $A-LC$ 극 임의배치 가능. $\\det(sI-(A-LC))$ 를 $\\Delta_d(s)$ 와 매칭.</p>

<p><strong>Step 1. 원하는 오차 특성다항식</strong></p>
<p>$\\Delta_d(s) = (s+6)^2 = s^2 + 12s + 36$</p>

<p><strong>Step 2. $A - LC$ 구성</strong></p>
<p>$LC = \\begin{bmatrix}l_1\\\\l_2\\end{bmatrix}[1\\;\\;0] = \\begin{bmatrix}l_1 & 0 \\\\ l_2 & 0\\end{bmatrix}$</p>
<p>$A - LC = \\begin{bmatrix}0 - l_1 & 1 \\\\ -2 - l_2 & -3\\end{bmatrix} = \\begin{bmatrix}-l_1 & 1 \\\\ -2-l_2 & -3\\end{bmatrix}$</p>

<p><strong>Step 3. 특성다항식 전개</strong></p>
<p>$sI - (A-LC) = \\begin{bmatrix}s + l_1 & -1 \\\\ 2+l_2 & s+3\\end{bmatrix}$</p>
<p>$\\det = (s+l_1)(s+3) - (-1)(2+l_2)$<br>
$= s^2 + (3 + l_1)s + 3l_1 + (2 + l_2)$<br>
$= s^2 + (3 + l_1)s + (3l_1 + l_2 + 2)$</p>

<p><strong>Step 4. 계수 매칭</strong></p>
<p>$s^1$: $3 + l_1 = 12 \\Rightarrow \\boxed{l_1 = 9}$<br>
$s^0$: $3l_1 + l_2 + 2 = 36 \\Rightarrow 27 + l_2 + 2 = 36 \\Rightarrow \\boxed{l_2 = 7}$</p>
<p>$$\\boxed{L = \\begin{bmatrix}9\\\\7\\end{bmatrix}}$$</p>

<p><strong>검산:</strong> $A - LC = \\begin{bmatrix}-9 & 1 \\\\ -9 & -3\\end{bmatrix}$.<br>
특성다항식 $= (s+9)(s+3) - (-1)(9) = s^2 + 12s + 27 + 9 = s^2 + 12s + 36 = (s+6)^2$ ✓</p>

<p><em>설계 관점:</em> 관측기 극 $-6$ 은 제어 극($-2,-3$)보다 왼쪽에 있어 추정오차가 제어 동역학보다 빠르게 0 으로 수렴 → separation principle 에서 권장되는 배치.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$LC$ vs $CL$ 혼동. $L$ 은 $2\\times1$, $C$ 는 $1\\times2$ → $LC$ 는 $2\\times2$.</li>
  <li>$A-LC$ 의 $(2,1)$ 원소: $-2 - l_2$ 인데 $C$ 의 1열만 영향받음(2열 성분은 $0$). $C=[1\\;0]$ 라 첫 열만.</li>
  <li>관측기 극을 제어 극보다 오른쪽(느리게) 잡는 것 — 추정이 느려 전체 성능 저하.</li>
</ul>
`
})}

${examProblem({
  num: 5,
  points: 25,
  topic: "Ch9 · Coprime fraction 극배치 (Sylvester)",
  statement: `For the plant $\\hat{g}(s) = \\dfrac{s-2}{s^2 - 1}$, design a feedback controller $C(s) = \\dfrac{B(s)}{A(s)}$ so that the closed-loop characteristic polynomial is
  $$F(s) = (s+1)(s+2)(s+3) = s^3 + 6s^2 + 11s + 6.$$
  (a) Determine the minimal controller degree $m$ and verify coprimeness of $D(s),N(s)$. (5 pts)<br>
  (b) Set up the Sylvester (resultant) equation and solve for the controller coefficients. (15 pts)<br>
  (c) Write $C(s)$ and check the closed-loop DC gain $\\dfrac{N(0)B(0)}{F(0)}$. (5 pts)`,
  koreanText: `플랜트 $\\hat g(s)=\\frac{s-2}{s^2-1}$ 에 대해 폐루프 특성다항식이 $(s+1)(s+2)(s+3)=s^3+6s^2+11s+6$ 이 되도록 제어기 $C(s)=B(s)/A(s)$ 를 설계하라. (a) 최소 제어기 차수 $m$ 과 $D,N$ coprime 확인, (b) Sylvester 방정식 세워 계수 풀이, (c) $C(s)$ 와 폐루프 DC gain 확인.`,
  answer: `
<p><strong>구조:</strong> 단위궤환 폐루프 특성다항식 $F(s) = D(s)A(s) + N(s)B(s)$. 여기서 플랜트 $\\hat g = N/D$, 제어기 $C = B/A$.</p>

<p><strong>(a) 차수 & coprimeness</strong></p>
<p>$D(s) = s^2 - 1$ ($n=2$), $N(s) = s - 2$.</p>
<p><strong>Coprime?</strong> $D = (s-1)(s+1)$ 의 근 $s = 1, -1$. $N(s) = s-2$ 의 근 $s = 2$. 공통근 없음 → <strong>coprime</strong> ✓ (Sylvester resultant $\\neq 0$ 와 동치, 아래 $S$ 의 가역성으로 재확인됨).</p>
<p>최소 제어기 차수: $\\boxed{m = n - 1 = 1}$. 그러면 $A(s) = a_1 s + a_0$, $B(s) = b_1 s + b_0$ — 미지수 4개. $F(s)$ 는 3차 → 계수 4개. 정사각 연립 ✓</p>

<hr>

<p><strong>(b) Sylvester 방정식</strong></p>
<p><strong>Step 1. 계수 표기</strong> (오름차순):<br>
$D(s) = -1 + 0\\cdot s + 1\\cdot s^2$ → $(d_0,d_1,d_2) = (-1, 0, 1)$<br>
$N(s) = -2 + 1\\cdot s$ → $(n_0,n_1) = (-2, 1)$</p>

<p><strong>Step 2. 곱 전개</strong> (직접 전개가 Sylvester 행렬 만드는 것보다 빠르고 안전):</p>
<p>$D(s)A(s) = (s^2 - 1)(a_1 s + a_0) = a_1 s^3 + a_0 s^2 - a_1 s - a_0$</p>
<p>$N(s)B(s) = (s - 2)(b_1 s + b_0) = b_1 s^2 + b_0 s - 2b_1 s - 2b_0 = b_1 s^2 + (b_0 - 2b_1)s - 2b_0$</p>
<p>$F(s) = D A + N B$ 의 계수:</p>
<table>
  <tr><th>차수</th><th>계수식</th><th>= 목표</th></tr>
  <tr><td>$s^3$</td><td>$a_1$</td><td>$1$</td></tr>
  <tr><td>$s^2$</td><td>$a_0 + b_1$</td><td>$6$</td></tr>
  <tr><td>$s^1$</td><td>$-a_1 + b_0 - 2b_1$</td><td>$11$</td></tr>
  <tr><td>$s^0$</td><td>$-a_0 - 2b_0$</td><td>$6$</td></tr>
</table>

<p><strong>Step 3. 동일한 식의 Sylvester 행렬 형태</strong> (검토용): $S\\,[a_0,a_1,b_0,b_1]^T = [6,11,6,1]^T$ 에서 (낮은 차수부터)
$$S = \\begin{bmatrix} -1 & 0 & -2 & 0 \\\\ 0 & -1 & 1 & -2 \\\\ 1 & 0 & 0 & 1 \\\\ 0 & 1 & 0 & 0 \\end{bmatrix},\\quad S\\begin{bmatrix}a_0\\\\a_1\\\\b_0\\\\b_1\\end{bmatrix} = \\begin{bmatrix}6\\\\11\\\\6\\\\1\\end{bmatrix}.$$
$\\det S \\neq 0$ (coprime 이라 보장) → 유일해.</p>

<p><strong>Step 4. 연립 풀이</strong></p>
<p>① $a_1 = 1$.<br>
② $a_0 + b_1 = 6 \\Rightarrow a_0 = 6 - b_1$.<br>
③ $-1 + b_0 - 2b_1 = 11 \\Rightarrow b_0 - 2b_1 = 12$.<br>
④ $-a_0 - 2b_0 = 6 \\Rightarrow a_0 + 2b_0 = -6$.</p>
<p>②를 ④에 대입: $(6 - b_1) + 2b_0 = -6 \\Rightarrow 2b_0 - b_1 = -12$.<br>
③에서 $b_0 = 12 + 2b_1$. 대입:<br>
$2(12 + 2b_1) - b_1 = -12 \\Rightarrow 24 + 4b_1 - b_1 = -12 \\Rightarrow 3b_1 = -36 \\Rightarrow b_1 = -12$.<br>
$b_0 = 12 + 2(-12) = -12$.<br>
$a_0 = 6 - (-12) = 18$.</p>
<p>$$\\boxed{a_0 = 18,\\; a_1 = 1,\\; b_0 = -12,\\; b_1 = -12}$$</p>

<p><strong>검산(전 계수 재대입):</strong><br>
$s^3$: $a_1 = 1$ ✓<br>
$s^2$: $a_0 + b_1 = 18 - 12 = 6$ ✓<br>
$s^1$: $-a_1 + b_0 - 2b_1 = -1 - 12 - 2(-12) = -13 + 24 = 11$ ✓<br>
$s^0$: $-a_0 - 2b_0 = -18 - 2(-12) = -18 + 24 = 6$ ✓</p>

<hr>

<p><strong>(c) 제어기 & DC gain</strong></p>
<p>$$\\boxed{C(s) = \\frac{B(s)}{A(s)} = \\frac{-12s - 12}{s + 18} = \\frac{-12(s+1)}{s + 18}}$$</p>
<p>proper(분자·분모 모두 1차) ✓. 폐루프 안정(극 $-1,-2,-3$ 모두 LHP) ✓.</p>
<p><strong>DC gain 확인:</strong> $r\\to y$ 폐루프 전달함수 $= \\dfrac{N(s)B(s)}{F(s)}$. $s=0$ 에서:</p>
<p>$N(0) = -2,\\; B(0) = -12,\\; F(0) = 6$<br>
$\\dfrac{N(0)B(0)}{F(0)} = \\dfrac{(-2)(-12)}{6} = \\dfrac{24}{6} = 4$</p>
<p>DC gain $= 4 \\neq 1$ → 이 제어기는 <strong>극배치만</strong> 달성하고 step 을 1:1 추종하지는 못함. 정확한 추종을 원하면 (i) reference 앞에 feedforward $1/4$ 를 곱하거나 (ii) 제어기 분모에 적분기 $\\phi(s)=s$ 를 포함하는 <em>robust tracking(internal model)</em> 설계가 필요 — 이것이 다음 단계(Ch9 internal model) 로 이어짐.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$D(s)$ 계수에서 $s^1$ 항을 빠뜨림($D=s^2-1$ 은 $0\\cdot s$ 포함). Sylvester 행렬/전개 모두 0 자리를 정확히.</li>
  <li>$(s-2)(b_1 s + b_0)$ 의 교차항 $-2b_1 s$ 부호 누락.</li>
  <li>극배치 성공 = 추종 성공 으로 착각. DC gain 따로 확인 필수.</li>
  <li>제어기 차수를 $m < n-1$ 로 잡으면 미지수 부족 → 일반적으로 해 없음.</li>
</ul>
`
})}

${examProblem({
  num: 6,
  points: 10,
  topic: "Ch9 · 개념 (well-posed / total stability / implementable)",
  statement: `(a) Define <em>well-posedness</em> of a feedback system and state the condition in terms of $G(\\infty)$ and $C(\\infty)$. (3 pts)<br>
  (b) Define <em>total stability</em> and explain why an unstable pole-zero cancellation between plant and controller destroys it. (4 pts)<br>
  (c) State the three conditions for a transfer function to be <em>implementable</em>. (3 pts)`,
  koreanText: `(a) 피드백 시스템의 well-posedness 정의와 $G(\\infty),C(\\infty)$ 로 표현한 조건, (b) total stability 정의 및 unstable pole-zero cancellation 이 이를 깨는 이유, (c) transfer function 이 implementable 하기 위한 세 조건을 서술하라.`,
  answer: `
<p><strong>(a) Well-posedness</strong></p>
<p><strong>정의:</strong> 피드백 시스템의 <em>모든</em> input–output pair 의 폐루프 전달함수가 <strong>proper</strong>(분모차수 ≥ 분자차수) 한 것. 비proper 가 하나라도 있으면 그 경로는 물리적으로 실현 불가(미분기 필요, 무한 high-frequency gain).</p>
<p><strong>조건:</strong> 폐루프(단위궤환)에서 well-posed $\\iff$
$$1 + G(\\infty)C(\\infty) \\neq 0,\\quad\\text{즉}\\quad G(\\infty)C(\\infty) \\neq -1.$$
plant 가 strictly proper 이면 $G(\\infty)=0$ 이라 자동으로 만족.</p>

<hr>

<p><strong>(b) Total stability</strong></p>
<p><strong>정의:</strong> 시스템 내부의 <em>모든</em> input–output pair (예: $r\\to y$, noise $\\to y$, $r\\to u$ 등) 의 전달함수가 전부 BIBO stable. 단순히 $r\\to y$ 만 안정한 것으로는 부족.</p>
<p><strong>unstable pole-zero cancellation 이 깨는 이유:</strong> 제어기의 zero 가 플랜트의 unstable pole(예 $s=2$) 을 약분하면 $r\\to y$ 전달함수에서는 $s=2$ 가 사라져 안정해 <em>보인다</em>. 그러나 그 약분은 종이 위에서만 일어나고 실제 신호 경로엔 그 mode 가 살아 있다. 다른 입출력 쌍(특히 noise/disturbance $\\to$ 내부신호 $u$ 또는 $y$)의 전달함수에는 $s=2$ 가 <strong>그대로 극으로 남아</strong> 작은 잡음에도 발산. 따라서 total stability 가 깨진다. (교재 Fig 9.3 의 $s-2$ 예제.)</p>
<p><em>요점:</em> unstable mode 는 약분으로 "지울" 수 없다 — 반드시 피드백으로 LHP 로 <em>이동</em>시켜야 한다.</p>

<hr>

<p><strong>(c) Implementable transfer function 의 세 조건</strong></p>
<p>주어진 목표 전달함수 $G_o(s)$ 가 주어진 플랜트 $G(s)$ 에 대해 implementable 하려면:</p>
<ol>
  <li><strong>Proper</strong>: 제어기가 proper 해야 함 (분모차수 ≥ 분자차수). 미분 불필요, 잡음에 강건.</li>
  <li><strong>No leakage (입력 경로 강제)</strong>: $r\\to y$ 가 반드시 플랜트 $G$ 를 통과해야 함. 즉 $G_o(s)$ 가 $G(s)$ 의 zero 를 모두 포함(특히 RHP zero 는 제거 불가) — "눈 가리고 아웅" 식으로 플랜트를 우회하면 안 됨.</li>
  <li><strong>Total stability</strong>: 위 (b) 의 의미로 모든 input–output pair 가 BIBO stable — unstable pole-zero cancellation 금지.</li>
</ol>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>well-posed 와 total stable 혼동: well-posed 는 <em>proper</em>(실현가능), total stable 는 <em>BIBO</em>(안정). 둘은 별개.</li>
  <li>"$r\\to y$ 안정하면 충분" — 다른 입출력 쌍 누락이 핵심 함정.</li>
  <li>implementable 조건에서 플랜트의 RHP zero/pole 제약을 빠뜨림.</li>
</ul>
`
})}

${note(`<strong>채점 가이드:</strong><br>
- Q1: rank/det 정확 + PBH 를 eigenvalue 에서만 수행했는지.<br>
- Q2: stabilizable=O, detectable=X 결론 + 이유(어느 mode 가 어떤 성질) 일치해야 만점.<br>
- Q3: $K=[4\\;2]$, $p=6$. $K$ 부호 실수 잦음.<br>
- Q4: $L=[9\\;7]^T$. 검산까지.<br>
- Q5(최대 배점): coprime 확인 + Sylvester 연립 + $C(s)=\\frac{-12(s+1)}{s+18}$ + DC gain 4. 한 계수 틀려도 부분점수.<br>
- Q6: 정의 키워드(proper / 모든 input-output pair BIBO / no cancellation) 들어가면 점수.<br><br>
<strong>예상 점수대:</strong> 75점 이상이면 무난, 60점 미만이면 약점 챕터 복습.`, "tip")}
`);
