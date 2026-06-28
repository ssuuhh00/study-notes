registerPage("exam-2", "모의고사 2", () => `
<h1>📝 모의고사 2</h1>
<p class="lead">총 100점. 모의고사 1과 같은 난이도, 다른 토픽 조합 (BIBO/internal stability 포함).</p>

${note(`이번 시험엔 BIBO vs internal stability 같은 개념형 문제, MIMO realization 도 섞여 있음. 정의를 확실히 알면 어렵지 않음.`, "info")}

${examProblem({
  num: 1,
  points: 15,
  topic: "Convolution",
  statement: `Let $x(t) = u(t) - 2u(t-1) + u(t-2)$ and $h(t) = e^{-t}u(t)$. Compute $y(t) = (x*h)(t)$ in closed form for all $t \\geq 0$.`,
  koreanText: `$x(t) = u(t) - 2u(t-1) + u(t-2)$, $h(t) = e^{-t}u(t)$ 일 때 $y(t) = (x*h)(t)$ 를 모든 $t \\ge 0$ 에 대해 닫힌 형태로 구하라.`,
  answer: `
<p><strong>풀이 전략:</strong> $x(t)$ 가 step 의 선형결합이라 step response 트릭이 가장 빠름. <br>
($x(t) = u(t) - 2u(t-1) + u(t-2)$ 는 "0~1초 사이 +1, 1~2초 사이 −1" 모양의 짧은 양/음 펄스.)</p>

<p><strong>Step 1. $h$ 의 step response $s(t)$</strong></p>
<p>$$s(t) = \\int_0^t e^{-\\tau} d\\tau = [-e^{-\\tau}]_0^t = 1 - e^{-t}, \\quad t \\ge 0$$</p>

<p><strong>Step 2. 선형성으로 $y(t)$ 표현</strong></p>
<p>$$y(t) = s(t) - 2 s(t-1) + s(t-2)$$</p>
<p>(단, $s(t-k)$ 는 $t \\ge k$ 에서만 켜짐.)</p>

<p><strong>Step 3. 케이스 분리</strong></p>

<p><strong>● $0 \\le t < 1$:</strong> $s(t-1), s(t-2)$ 모두 0.</p>
<p>$$y(t) = s(t) = 1 - e^{-t}$$</p>

<p><strong>● $1 \\le t < 2$:</strong> $s(t-1)$ 만 추가.</p>
<p>$y(t) = (1 - e^{-t}) - 2(1 - e^{-(t-1)})$<br>
$\\quad = 1 - e^{-t} - 2 + 2e^{-(t-1)}$<br>
$\\quad = -1 - e^{-t} + 2e^{-(t-1)}$</p>
<p>$e^{-(t-1)} = e^{-t+1} = e \\cdot e^{-t}$ 이므로:</p>
<p>$y(t) = -1 - e^{-t} + 2e \\cdot e^{-t} = -1 + (2e - 1) e^{-t}$</p>

<p><strong>● $t \\ge 2$:</strong> 세 항 모두 켜짐. 상수 부분 ($1 - 2 + 1 = 0$) 상쇄:</p>
<p>$y(t) = -e^{-t} + 2e^{-(t-1)} - e^{-(t-2)}$<br>
$\\quad = -e^{-t} + 2e \\cdot e^{-t} - e^2 \\cdot e^{-t}$<br>
$\\quad = (-1 + 2e - e^2) e^{-t}$<br>
$\\quad = -(e^2 - 2e + 1) e^{-t}$<br>
$\\quad = -(e - 1)^2 e^{-t}$</p>
<p>(완전제곱 인수분해 — 음수임이 확인됨, $-(e-1)^2 \\approx -2.95$.)</p>

<p><strong>최종 답:</strong></p>
<p>$$\\boxed{y(t) = \\begin{cases} 1 - e^{-t} & 0 \\le t < 1 \\\\ -1 + (2e - 1) e^{-t} & 1 \\le t < 2 \\\\ -(e-1)^2 e^{-t} & t \\ge 2 \\end{cases}}$$</p>

<p><strong>검증 1 — 경계 $t = 1$ 에서 연속:</strong></p>
<p>첫 식: $1 - e^{-1} \\approx 0.632$<br>
둘째 식 ($t = 1$): $-1 + (2e - 1) e^{-1} = -1 + 2 - e^{-1} = 1 - e^{-1} \\approx 0.632$ ✓</p>

<p><strong>검증 2 — 경계 $t = 2$ 에서 연속:</strong></p>
<p>둘째 식 ($t = 2$): $-1 + (2e - 1) e^{-2}$<br>
셋째 식 ($t = 2$): $-(e - 1)^2 e^{-2} = -(e^2 - 2e + 1) e^{-2} = -1 + 2e \\cdot e^{-2} - e^{-2} = -1 + (2e - 1)e^{-2}$ ✓</p>

<p><strong>검증 3 — $t \\to \\infty$:</strong> $y \\to 0$ ✓ (입력이 짧은 펄스라 에너지 누적 0).</p>

<p><strong>해석:</strong> 처음엔 양의 펄스가 들어와 $y$ 증가, 1초부터 음의 펄스가 들어와 $y$ 가 음수로 떨어짐, 2초 이후 입력은 끝났지만 시스템 응답이 음에서 천천히 0 으로 회복 (지수 감쇠).</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$e^{-(t-1)}$ 을 $e^{-t-1}$ 로 잘못 전개 (부호!).</li>
  <li>각 케이스의 시작 시점에 새 항이 켜진다는 점 놓침.</li>
  <li>경계 연속성 검증 안 하면 부호 실수 못 찾음.</li>
</ul>
`
})}

${examProblem({
  num: 2,
  points: 30,
  topic: "Eigenvalue + Diagonalization + Cayley-Hamilton",
  statement: `Given $\\mathbf{A} = \\begin{bmatrix}-1 & 2 \\\\ 0 & -3\\end{bmatrix}$.<br>
  (a) Find eigenvalues and eigenvectors. (8 pts)<br>
  (b) Find $\\mathbf{P}$ that diagonalizes $\\mathbf{A}$. (8 pts)<br>
  (c) Compute $e^{\\mathbf{A}t}$ using Cayley-Hamilton. (14 pts)`,
  koreanText: `위 $\\mathbf{A}$ 에 대해 (a) eigenvalue/eigenvector, (b) 대각화 $\\mathbf{P}$, (c) Cayley-Hamilton 으로 $e^{\\mathbf{A}t}$.`,
  answer: `
<p><strong>(a) Eigenvalue & eigenvector</strong></p>

<p><strong>Step 1. Eigenvalue — 상삼각이라 한눈에</strong></p>
<p>$A$ 가 상삼각 (upper triangular) → eigenvalue = 대각 원소.</p>
<p>$$\\boxed{\\lambda_1 = -1, \\quad \\lambda_2 = -3}$$ <br>둘 다 LHP → asymptotically stable.</p>
<p><em>(왜? $\\det(\\lambda I - A)$ 가 상삼각의 대각 곱 $(\\lambda + 1)(\\lambda + 3)$ 가 되므로.)</em></p>

<p><strong>Step 2. $\\lambda_1 = -1$ 의 eigenvector</strong></p>
<p>$(-1)I - A = \\begin{bmatrix}-1 - (-1) & -2 \\\\ 0 & -1 - (-3)\\end{bmatrix} = \\begin{bmatrix}0 & -2 \\\\ 0 & 2\\end{bmatrix}$</p>
<p>둘 다 $-2v_2 = 0$ → $v_2 = 0$, $v_1$ 자유.<br>
$v_1 = 1$ 잡으면: $\\boxed{\\mathbf{v}_1 = \\begin{bmatrix}1\\\\0\\end{bmatrix}}$</p>
<p><em>검증:</em> $A\\mathbf{v}_1 = \\begin{bmatrix}-1\\\\0\\end{bmatrix} = -1 \\cdot \\mathbf{v}_1$ ✓</p>

<p><strong>Step 3. $\\lambda_2 = -3$ 의 eigenvector</strong></p>
<p>$(-3)I - A = \\begin{bmatrix}-3 - (-1) & -2 \\\\ 0 & -3 - (-3)\\end{bmatrix} = \\begin{bmatrix}-2 & -2 \\\\ 0 & 0\\end{bmatrix}$</p>
<p>$-2v_1 - 2v_2 = 0$ → $v_1 = -v_2$.<br>
$v_2 = -1$ 잡으면: $\\boxed{\\mathbf{v}_2 = \\begin{bmatrix}1\\\\-1\\end{bmatrix}}$</p>
<p><em>검증:</em> $A\\mathbf{v}_2 = \\begin{bmatrix}-1 + 2(-1) \\\\ 0 + (-3)(-1)\\end{bmatrix} = \\begin{bmatrix}-3\\\\3\\end{bmatrix} = -3 \\cdot \\mathbf{v}_2$ ✓</p>

<hr>

<p><strong>(b) Diagonalization</strong></p>

<p><strong>Step 1. $P$ 와 $D$ 구성</strong></p>
<p>$$P = [\\mathbf{v}_1 \\;|\\; \\mathbf{v}_2] = \\begin{bmatrix}1 & 1 \\\\ 0 & -1\\end{bmatrix}, \\quad D = \\begin{bmatrix}-1 & 0 \\\\ 0 & -3\\end{bmatrix}$$</p>

<p><strong>Step 2. $P^{-1}$ 계산</strong></p>
<p>$\\det P = (1)(-1) - (1)(0) = -1$</p>
<p>$P^{-1} = \\dfrac{1}{-1}\\begin{bmatrix}-1 & -1 \\\\ 0 & 1\\end{bmatrix} = \\begin{bmatrix}1 & 1 \\\\ 0 & -1\\end{bmatrix}$</p>
<p><em>(우연히 $P^{-1} = P$. $P \\cdot P = ?$ 검증:)</em><br>
$\\begin{bmatrix}1 & 1 \\\\ 0 & -1\\end{bmatrix}\\begin{bmatrix}1 & 1 \\\\ 0 & -1\\end{bmatrix} = \\begin{bmatrix}1 + 0 & 1 - 1 \\\\ 0 + 0 & 0 + 1\\end{bmatrix} = I$ ✓</p>

<p><strong>Step 3. $P^{-1} A P = D$ 검증</strong></p>
<p>$AP = \\begin{bmatrix}-1 & 2 \\\\ 0 & -3\\end{bmatrix}\\begin{bmatrix}1 & 1 \\\\ 0 & -1\\end{bmatrix} = \\begin{bmatrix}-1 + 0 & -1 - 2 \\\\ 0 + 0 & 0 + 3\\end{bmatrix} = \\begin{bmatrix}-1 & -3 \\\\ 0 & 3\\end{bmatrix}$</p>
<p>$P^{-1}(AP) = \\begin{bmatrix}1 & 1 \\\\ 0 & -1\\end{bmatrix}\\begin{bmatrix}-1 & -3 \\\\ 0 & 3\\end{bmatrix} = \\begin{bmatrix}-1 + 0 & -3 + 3 \\\\ 0 + 0 & 0 - 3\\end{bmatrix} = \\begin{bmatrix}-1 & 0 \\\\ 0 & -3\\end{bmatrix} = D$ ✓</p>

<hr>

<p><strong>(c) $e^{At}$ via Cayley-Hamilton</strong></p>

<p><strong>Step 1. 식 세우기 ($n = 2$, $\\lambda = -1, -3$)</strong></p>
<p>$e^{At} = \\beta_0 I + \\beta_1 A$, with:</p>
<p>(식①): $e^{-t} = \\beta_0 - \\beta_1$<br>
(식②): $e^{-3t} = \\beta_0 - 3\\beta_1$</p>

<p><strong>Step 2. 연립 풀이</strong></p>
<p>식① − 식②: $e^{-t} - e^{-3t} = 2\\beta_1$</p>
<p>$$\\boxed{\\beta_1(t) = \\dfrac{1}{2}(e^{-t} - e^{-3t})}$$</p>
<p>식①에 대입: $\\beta_0 = e^{-t} + \\beta_1 = e^{-t} + \\dfrac{1}{2}(e^{-t} - e^{-3t}) = \\dfrac{1}{2}(3e^{-t} - e^{-3t})$</p>
<p>$$\\boxed{\\beta_0(t) = \\dfrac{1}{2}(3e^{-t} - e^{-3t})}$$</p>

<p><strong>Step 3. $e^{At}$ 조립</strong></p>
<p>$e^{At} = \\dfrac{1}{2}\\left[(3e^{-t} - e^{-3t})I + (e^{-t} - e^{-3t})\\begin{bmatrix}-1 & 2 \\\\ 0 & -3\\end{bmatrix}\\right]$</p>
<p>각 원소:</p>
<ul>
  <li>$(1,1)$: $\\dfrac{1}{2}[(3e^{-t} - e^{-3t}) + (e^{-t} - e^{-3t})(-1)]$<br>
    $= \\dfrac{1}{2}[3e^{-t} - e^{-3t} - e^{-t} + e^{-3t}] = \\dfrac{1}{2}[2e^{-t}] = e^{-t}$</li>
  <li>$(1,2)$: $\\dfrac{1}{2}[0 + (e^{-t} - e^{-3t})(2)] = e^{-t} - e^{-3t}$</li>
  <li>$(2,1)$: $\\dfrac{1}{2}[0 + (e^{-t} - e^{-3t})(0)] = 0$</li>
  <li>$(2,2)$: $\\dfrac{1}{2}[(3e^{-t} - e^{-3t}) + (e^{-t} - e^{-3t})(-3)]$<br>
    $= \\dfrac{1}{2}[3e^{-t} - e^{-3t} - 3e^{-t} + 3e^{-3t}] = \\dfrac{1}{2}[2e^{-3t}] = e^{-3t}$</li>
</ul>

<p>$$\\boxed{e^{At} = \\begin{bmatrix} e^{-t} & e^{-t} - e^{-3t} \\\\ 0 & e^{-3t} \\end{bmatrix}}$$</p>

<p><strong>검증 1 ($t = 0$):</strong> $\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix} = I$ ✓</p>
<p><strong>검증 2 (구조):</strong> $A$ 가 상삼각 → $e^{At}$ 도 상삼각, 대각엔 $e^{\\lambda_i t}$. 패턴 확인 ✓</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>상삼각 행렬의 eigenvalue 가 대각이라는 점 잊고 characteristic poly 계산하다 시간 낭비.</li>
  <li>$\\beta_1$ 의 1/2 누락.</li>
  <li>마지막 조립에서 (1,2) 항을 빼먹어서 결과가 대각으로만 나오는 실수 (off-diagonal $A$ 의 영향).</li>
</ul>
`
})}

${examProblem({
  num: 3,
  points: 15,
  topic: "MIMO Realization (2-output)",
  statement: `Find a state-space realization of $\\hat{\\mathbf{G}}(s) = \\begin{bmatrix} \\dfrac{1}{s+1} \\\\ \\dfrac{s+2}{(s+1)(s+3)} \\end{bmatrix}$ (2 outputs, 1 input). Specify dimensions of $\\mathbf{A}, \\mathbf{B}, \\mathbf{C}, \\mathbf{D}$.`,
  koreanText: `위 $2\\times 1$ 전달함수 행렬의 상태공간 실현을 구하고 $\\mathbf{A}, \\mathbf{B}, \\mathbf{C}, \\mathbf{D}$ 의 차원을 명시하라.`,
  answer: `
<p><strong>전략:</strong> MIMO 도 SISO 와 같은 절차 — 다만 (1) 모든 항을 <strong>같은 분모</strong>로 정리, (2) 분자가 행렬 형태로 나오고 → $C$ 의 각 행이 그 분자의 계수.</p>

<p><strong>Step 1. 공통 분모로 정리</strong></p>
<p>두 분모: $s + 1$ 과 $(s+1)(s+3)$. LCM = $(s+1)(s+3) = s^2 + 4s + 3$.</p>
<p>1행 분자 보정: $\\dfrac{1}{s+1} = \\dfrac{s+3}{(s+1)(s+3)}$ → 분자 $s + 3$<br>
2행은 그대로: 분자 $s + 2$</p>
<p>$$\\hat{\\mathbf{G}}(s) = \\dfrac{1}{s^2 + 4s + 3}\\begin{bmatrix}s + 3 \\\\ s + 2\\end{bmatrix}$$</p>

<p><strong>Step 2. 분자를 $s$ 거듭제곱별로 분리</strong></p>
<p>각 행을 $b_1 s + b_0$ 형태로:<br>
1행: $s + 3$ → $b_0 = 3, b_1 = 1$<br>
2행: $s + 2$ → $b_0 = 2, b_1 = 1$</p>
<p>$$\\hat{\\mathbf{G}}(s) = \\dfrac{1}{s^2 + 4s + 3}\\left( \\underbrace{\\begin{bmatrix}1 \\\\ 1\\end{bmatrix}}_{N_1} s + \\underbrace{\\begin{bmatrix}3 \\\\ 2\\end{bmatrix}}_{N_0}\\right)$$</p>
<p><em>(통상 표기는 $N_1 s^{r-1} + \\cdots + N_r$ 인데, 여기선 $r = 2$ 라 $N_1 s + N_0$ 형태.)</em></p>

<p>분모 계수: $a_0 = 3, a_1 = 4$. 차수 $r = 2$.</p>

<p><strong>Step 3. 공식 적용 — Controllable canonical form (입력 1개)</strong></p>
<p>$$\\boxed{A = \\begin{bmatrix}0 & 1 \\\\ -3 & -4\\end{bmatrix}, \\quad B = \\begin{bmatrix}0 \\\\ 1\\end{bmatrix}}$$</p>
<p>$C$ 의 각 행은 그 출력의 분자 계수 $[b_0, b_1]$:</p>
<p>$$\\boxed{C = \\begin{bmatrix}3 & 1 \\\\ 2 & 1\\end{bmatrix}, \\quad D = \\begin{bmatrix}0 \\\\ 0\\end{bmatrix}}$$</p>

<p><strong>차원 정리:</strong></p>
<table>
  <tr><th>행렬</th><th>차원</th><th>의미</th></tr>
  <tr><td>$A$</td><td>$2 \\times 2$</td><td>상태 변수 2개 ($r = 2$)</td></tr>
  <tr><td>$B$</td><td>$2 \\times 1$</td><td>입력 1개 ($p = 1$)</td></tr>
  <tr><td>$C$</td><td>$2 \\times 2$</td><td>출력 2개 ($q = 2$), 상태 2개</td></tr>
  <tr><td>$D$</td><td>$2 \\times 1$</td><td>출력 2개, 입력 1개 (strictly proper 라 0)</td></tr>
</table>

<p><strong>Step 4. 검증 — 두 행 모두 원본과 일치하는지</strong></p>
<p>먼저 $(sI - A)^{-1} B$:<br>
$sI - A = \\begin{bmatrix}s & -1 \\\\ 3 & s+4\\end{bmatrix}$, $\\det = s^2 + 4s + 3$<br>
$(sI - A)^{-1} = \\dfrac{1}{s^2+4s+3}\\begin{bmatrix}s+4 & 1 \\\\ -3 & s\\end{bmatrix}$<br>
$(sI - A)^{-1}B = \\dfrac{1}{s^2+4s+3}\\begin{bmatrix}1 \\\\ s\\end{bmatrix}$</p>

<p><strong>1행 검증:</strong> $C_1 \\cdot = [3, 1] \\cdot \\dfrac{[1, s]^T}{s^2+4s+3} = \\dfrac{3 + s}{(s+1)(s+3)} = \\dfrac{s+3}{(s+1)(s+3)} = \\dfrac{1}{s+1}$ ✓</p>

<p><strong>2행 검증:</strong> $[2, 1] \\cdot \\dfrac{[1, s]^T}{s^2+4s+3} = \\dfrac{2 + s}{(s+1)(s+3)} = \\dfrac{s+2}{(s+1)(s+3)}$ ✓</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>각 출력에 대해 따로 realization 만들고 합치기 (state 가 4개로 늘어남, minimal 아님).</li>
  <li>공통 분모 정리 안 하면 다음 단계 시작 못 함.</li>
  <li>$C$ 행 순서 — $[b_0, b_1]$ 즉 $s$ 의 차수 낮은 것부터.</li>
</ul>
`
})}

${examProblem({
  num: 4,
  points: 25,
  topic: "State equation 풀이 + steady state",
  statement: `Consider $\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 0 \\\\ 0 & -2\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}1\\\\1\\end{bmatrix}u$, $y = [1, 1]\\mathbf{x}$, $\\mathbf{x}(0) = \\begin{bmatrix}1\\\\0\\end{bmatrix}$, $u(t) = u_s(t)$.<br>
  (a) Find $y(t)$ for $t \\geq 0$. (20 pts)<br>
  (b) Find the steady-state $y(\\infty)$. (5 pts)`,
  koreanText: `대각 $\\mathbf{A}$, $\\mathbf{B} = [1,1]^T$, $\\mathbf{x}(0) = [1, 0]^T$, unit step 입력. (a) $y(t)$, (b) $y(\\infty)$.`,
  answer: `
<p><strong>전략:</strong> $A$ 가 대각이라 $e^{At}$ 가 한 줄 — zero-input 응답이 매우 쉬움. zero-state 는 Laplace + 부분분수.</p>

<p><strong>(a) $y(t)$</strong></p>

<p><strong>Step 1. $e^{At}$ — 대각 $A$ 라 즉시</strong></p>
<p>$$e^{At} = \\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-2t}\\end{bmatrix}$$</p>

<p><strong>Step 2. Zero-input 응답</strong></p>
<p>$e^{At}\\mathbf{x}_0 = \\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-2t}\\end{bmatrix}\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\begin{bmatrix}e^{-t}\\\\0\\end{bmatrix}$</p>
<p>$y_{zi}(t) = C \\cdot = [1, 1]\\begin{bmatrix}e^{-t}\\\\0\\end{bmatrix} = e^{-t}$</p>

<p><strong>Step 3. Transfer function 계산 (zero-state 용)</strong></p>
<p>$\\hat g(s) = C(sI-A)^{-1}B$<br>
$(sI - A)^{-1} = \\begin{bmatrix}1/(s+1) & 0 \\\\ 0 & 1/(s+2)\\end{bmatrix}$ (대각이라 즉시)<br>
$(sI-A)^{-1} B = \\begin{bmatrix}1/(s+1) \\\\ 1/(s+2)\\end{bmatrix}$<br>
$\\hat g(s) = [1, 1] \\cdot = \\dfrac{1}{s+1} + \\dfrac{1}{s+2}$</p>

<p><strong>Step 4. Zero-state 응답 — Laplace + 부분분수</strong></p>
<p>$Y_{zs}(s) = \\hat g(s) \\cdot U(s) = \\left(\\dfrac{1}{s+1} + \\dfrac{1}{s+2}\\right) \\cdot \\dfrac{1}{s} = \\dfrac{1}{s(s+1)} + \\dfrac{1}{s(s+2)}$</p>
<p>각 항 부분분수:</p>
<p>$\\dfrac{1}{s(s+1)} = \\dfrac{1}{s} - \\dfrac{1}{s+1}$ → 역변환: $1 - e^{-t}$</p>
<p>$\\dfrac{1}{s(s+2)} = \\dfrac{1/2}{s} - \\dfrac{1/2}{s+2}$ → 역변환: $\\dfrac{1}{2}(1 - e^{-2t})$</p>
<p>$y_{zs}(t) = (1 - e^{-t}) + \\dfrac{1}{2}(1 - e^{-2t}) = \\dfrac{3}{2} - e^{-t} - \\dfrac{1}{2}e^{-2t}$</p>

<p><strong>Step 5. 합치기</strong></p>
<p>$y(t) = y_{zi}(t) + y_{zs}(t)$<br>
$= e^{-t} + \\left(\\dfrac{3}{2} - e^{-t} - \\dfrac{1}{2}e^{-2t}\\right)$</p>
<p>$e^{-t}$ 항 상쇄:</p>
<p>$$\\boxed{y(t) = \\dfrac{3}{2} - \\dfrac{1}{2}e^{-2t}}$$</p>

<p><strong>검증 ($t = 0$):</strong> $\\dfrac{3}{2} - \\dfrac{1}{2} = 1$. <br>
직접: $y(0) = C\\mathbf{x}(0) = [1, 1]\\begin{bmatrix}1\\\\0\\end{bmatrix} = 1$ ✓</p>

<p><strong>흥미로운 관찰:</strong> $e^{-t}$ 모드가 zero-input 과 zero-state 사이에서 정확히 상쇄됐어. <br>
이유: $\\mathbf{x}_0 = [1, 0]^T$ 가 $\\lambda = -1$ 의 eigenvector 방향이라 zero-input 에선 $e^{-t}$ 만 보임. Zero-state 에선 step 입력이 두 mode 모두 흥분시키지만 결과적으로 $e^{-t}$ 부분이 zero-input 과 부호 반대로 나옴 → 상쇄. 일반적이진 않고 이번 문제의 우연.</p>

<hr>

<p><strong>(b) Steady state</strong></p>
<p>BIBO stable 확인 (eigenvalue $-1, -2$ 모두 LHP). Final value theorem:</p>
<p>$y(\\infty) = \\hat g(0) \\cdot 1 = \\left(\\dfrac{1}{1} + \\dfrac{1}{2}\\right) = \\dfrac{3}{2}$</p>
<p>$$\\boxed{y(\\infty) = \\dfrac{3}{2}}$$</p>
<p>위 식의 $t \\to \\infty$ 와 일치 ✓</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>대각 $A$ 인데도 굳이 Cayley-Hamilton 돌림 — 시간 낭비.</li>
  <li>Zero-input 빼먹기. 초기조건이 0 이 아닌 데 주의.</li>
  <li>Final value theorem 의 전제 (stability) 안 확인하고 대입.</li>
</ul>
`
})}

${examProblem({
  num: 5,
  points: 15,
  topic: "BIBO vs Internal Stability",
  statement: `Consider $\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 0 \\\\ 0 & 2\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}1\\\\1\\end{bmatrix}u$, $y = [1, 0]\\mathbf{x}$.<br>
  (a) Is the system asymptotically stable (internally)? (5 pts)<br>
  (b) Is the system BIBO stable? Compute the transfer function. (7 pts)<br>
  (c) Briefly explain the discrepancy. (3 pts)`,
  koreanText: `위 시스템에 대해 (a) 점근(내부) 안정성, (b) BIBO 안정성 (전달함수 계산), (c) 둘의 차이를 간단히 설명.`,
  answer: `
<p><strong>(a) Internal (asymptotic) stability</strong></p>
<p>$A$ 가 대각 → eigenvalue = 대각 원소: $\\lambda_1 = -1, \\lambda_2 = +2$.</p>
<p>$\\lambda_2 = 2 > 0$ — 우반평면 (RHP) 에 eigenvalue 존재.</p>
<p>$\\Rightarrow$ <strong>Internally unstable</strong> (asymptotic stable 아님).</p>
<p><em>해석:</em> 내부 상태 $x_2(t)$ 는 $\\dot x_2 = 2 x_2 + u$ 로 발산.</p>

<hr>

<p><strong>(b) BIBO stability</strong></p>

<p><strong>Step 1. $(sI - A)^{-1}$</strong></p>
<p>대각이라 즉시: $(sI - A)^{-1} = \\begin{bmatrix}\\dfrac{1}{s+1} & 0 \\\\ 0 & \\dfrac{1}{s-2}\\end{bmatrix}$</p>

<p><strong>Step 2. $(sI-A)^{-1}B$</strong></p>
<p>$(sI-A)^{-1}\\begin{bmatrix}1\\\\1\\end{bmatrix} = \\begin{bmatrix}1/(s+1) \\\\ 1/(s-2)\\end{bmatrix}$</p>

<p><strong>Step 3. $\\hat g(s) = C(sI-A)^{-1}B$</strong></p>
<p>$\\hat g(s) = [1, 0] \\cdot \\begin{bmatrix}1/(s+1) \\\\ 1/(s-2)\\end{bmatrix} = \\dfrac{1}{s+1}$</p>
<p><strong>핵심:</strong> $C = [1, 0]$ 이 둘째 성분 ($1/(s-2)$, unstable mode) 을 곱하기 0 으로 죽여버림 → transfer function 에 안 보임.</p>

<p><strong>Step 4. Pole 분석</strong></p>
<p>$\\hat g(s) = 1/(s+1)$. Pole: $s = -1$ (LHP).</p>
<p>$\\Rightarrow$ <strong>BIBO stable</strong>.</p>

<hr>

<p><strong>(c) 차이 설명</strong></p>
<p>Unstable mode $\\lambda = 2$ (= 상태 $x_2$) 가 출력 $y$ 에 안 보임 → <strong>unobservable</strong>.</p>
<p>입출력만 측정하는 BIBO 관점: 발산하는 게 안 보이니 stable 처럼 행세.<br>
내부 상태 관점: $x_2$ 는 입력에 의해 (B 의 둘째 성분 = 1 이라 controllable) 흥분되어 무한대로 발산.</p>
<p><strong>요약:</strong></p>
<ul>
  <li>BIBO ⇔ <em>transfer function</em> 의 pole 위치</li>
  <li>Internal (asymptotic) ⇔ <em>$A$ 의 eigenvalue</em> 위치</li>
  <li>둘이 일치 ⇔ <em>minimal realization</em> (controllable & observable)</li>
</ul>
<p><em>실용적 위험:</em> 출력 안정해 보여도 내부 신호가 발산하면 회로가 saturate · 부품이 burn-out · 안전장치 trip 등 실제 시스템 망가짐. 그래서 control 설계에선 internal stability 필수.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$\\hat g(s) = 1/(s+1)$ 만 보고 stable 이라 결론 → internal 도 stable 이라 착각.</li>
  <li>둘째 mode 가 controllable 인지 (B 가 영 아닌지) 확인 안 함 → "uncontrollable mode" 와 "unobservable mode" 혼동.</li>
</ul>
`
})}

${note(`<strong>채점 가이드:</strong> 모의고사 1과 동일.<br><br>
<strong>모의고사 1, 2 모두 70~80점이면 시험 무난.</strong> 90점 가능. 60점 이하면 약점 챕터 한 번 더.`, "tip")}
`);
