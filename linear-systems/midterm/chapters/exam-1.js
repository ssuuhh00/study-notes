registerPage("exam-1", "모의고사 1", () => `
<h1>📝 모의고사 1</h1>
<p class="lead">총 100점. 종이/펜으로 풀고, 다 푼 뒤 답안 펼쳐서 채점.</p>

${note(`<strong>응시 안내:</strong> 종이·펜만 사용. 풀이 과정도 같이 적기 (부분점수). 계산기 없이도 풀 수 있는 수준이지만 <em>암산</em>은 무리 — 손계산으로 차근차근.`, "info")}

${examProblem({
  num: 1,
  points: 15,
  topic: "Convolution",
  statement: `Let $x(t) = u(t) - u(t-1)$ and $h(t) = e^{-2t}u(t)$. Compute $y(t) = (x*h)(t)$ in closed form for all $t \\geq 0$.`,
  koreanText: `$x(t) = u(t) - u(t-1)$, $h(t) = e^{-2t}u(t)$ 일 때 $y(t) = (x*h)(t)$ 를 모든 $t \\geq 0$ 에 대해 닫힌 형태로 구하라.`,
  answer: `
<p><strong>풀이 전략:</strong> 입력 $x(t)$ 가 두 step의 차 ($u(t) - u(t-1)$) 이라서, 선형성을 이용해서 <strong>먼저 step 입력에 대한 응답(step response)을 구한 뒤, 시프트 빼기</strong>로 답을 만든다. 이게 합성곱 적분을 직접 케이스 나눠 푸는 것보다 훨씬 빠르고 실수 적음.</p>

<p><strong>Step 1. 시스템의 step response $s(t)$ 구하기</strong></p>
<p>$h(t) = e^{-2t}u(t)$ 인 시스템에 unit step 입력 $u(t)$ 가 들어왔을 때:</p>
<p>$$s(t) = \\int_0^t h(\\tau) d\\tau = \\int_0^t e^{-2\\tau} d\\tau = \\left[-\\frac{1}{2}e^{-2\\tau}\\right]_0^t = \\frac{1}{2}(1 - e^{-2t})$$</p>
<p>(단, $t \\ge 0$ 에서. $t < 0$ 에선 $s(t) = 0$.)</p>

<p><strong>Step 2. $x(t)$ 분해 & 응답 합치기</strong></p>
<p>$x(t) = u(t) - u(t-1)$ 이고, LTI 시스템은 입력의 선형결합에 같은 선형결합으로 반응:</p>
<p>$$y(t) = s(t) - s(t-1)$$</p>
<p>(시프트한 step의 응답은 시프트한 step response.)</p>

<p><strong>Step 3. 케이스 분리 — 시프트한 항이 언제 켜지는지</strong></p>
<ul>
  <li>$0 \\le t < 1$: $s(t-1)$ 은 아직 0 (인자가 음수이므로).<br>
    → $y(t) = s(t) = \\dfrac{1}{2}(1 - e^{-2t})$</li>
  <li>$t \\ge 1$: $s(t-1)$ 도 켜짐.<br>
    → $y(t) = \\dfrac{1}{2}(1 - e^{-2t}) - \\dfrac{1}{2}(1 - e^{-2(t-1)})$<br>
    $\\quad = \\dfrac{1}{2}\\left[e^{-2(t-1)} - e^{-2t}\\right]$ (1과 −1 상쇄)<br>
    $\\quad = \\dfrac{1}{2}\\left[e^{-2t} \\cdot e^{2} - e^{-2t}\\right]$ ($e^{-2(t-1)} = e^{-2t+2} = e^{-2t}\\cdot e^2$)<br>
    $\\quad = \\dfrac{1}{2}(e^2 - 1)\\, e^{-2t}$</li>
</ul>

<p><strong>최종 답:</strong></p>
<p>$$\\boxed{y(t) = \\begin{cases} \\dfrac{1}{2}(1 - e^{-2t}) & 0 \\le t < 1 \\\\ \\dfrac{1}{2}(e^2 - 1)\\, e^{-2t} & t \\ge 1 \\end{cases}}$$</p>

<p><strong>검증 1 (경계 $t = 1$ 에서 연속):</strong></p>
<p>첫 식: $\\dfrac{1}{2}(1 - e^{-2}) \\approx 0.432$<br>
둘째 식 ($t=1$): $\\dfrac{1}{2}(e^2 - 1)e^{-2} = \\dfrac{1}{2}(1 - e^{-2}) \\approx 0.432$ ✓ (같음)</p>

<p><strong>검증 2 ($t \\to \\infty$):</strong> $y \\to 0$ — 입력의 길이 1짜리 펄스가 끝나고도 시스템 응답이 점차 감쇠해 사라짐. ✓</p>

<p><strong>검증 3 ($t = 0$):</strong> $y(0) = \\dfrac{1}{2}(1 - 1) = 0$ — 응답이 0에서 시작. ✓ (causal LTI)</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$s(t-1)$ 이 $t \\ge 1$ 부터 켜진다는 점을 놓치고 모든 $t$ 에 대해 빼버림.</li>
  <li>$e^{-2(t-1)}$ 을 전개할 때 부호 실수 ($e^{-2t-2}$ 가 아님!).</li>
  <li>합성곱 적분을 직접 계산하려다 케이스 분리 늪에 빠짐 — step response 트릭으로 우회 권장.</li>
</ul>
`
})}

${examProblem({
  num: 2,
  points: 30,
  topic: "Eigenvalue + Diagonalization + Cayley-Hamilton",
  statement: `Given $\\mathbf{A} = \\begin{bmatrix}1 & -1 \\\\ 2 & 4\\end{bmatrix}$.<br>
  (a) Find eigenvalues and eigenvectors. (8 pts)<br>
  (b) Find $\\mathbf{P}$ that diagonalizes $\\mathbf{A}$. (8 pts)<br>
  (c) Compute $e^{\\mathbf{A}t}$ using Cayley-Hamilton theorem. (14 pts)`,
  koreanText: `위 $\\mathbf{A}$ 에 대해 (a) eigenvalue/eigenvector, (b) 대각화 $\\mathbf{P}$, (c) Cayley-Hamilton 으로 $e^{\\mathbf{A}t}$ 를 구하라.`,
  answer: `
<p><strong>(a) Eigenvalue & eigenvector</strong></p>

<p><strong>Step 1. Characteristic polynomial 만들기</strong></p>
<p>$\\lambda I - A = \\begin{bmatrix}\\lambda - 1 & 1 \\\\ -2 & \\lambda - 4\\end{bmatrix}$</p>
<p>$\\det(\\lambda I - A) = (\\lambda - 1)(\\lambda - 4) - (1)(-2)$</p>
<p>$= \\lambda^2 - 5\\lambda + 4 + 2$</p>
<p>$= \\lambda^2 - 5\\lambda + 6$</p>
<p>$= (\\lambda - 2)(\\lambda - 3)$</p>
<p>$$\\Rightarrow \\boxed{\\lambda_1 = 2, \\quad \\lambda_2 = 3}$$ <br>둘 다 양수 → 시스템 unstable (참고).</p>

<p><strong>Step 2. 각 eigenvalue 의 eigenvector</strong></p>
<p><strong>$\\lambda_1 = 2$:</strong> $(2I - A)\\mathbf{v} = \\mathbf{0}$ 풀이.</p>
<p>$2I - A = \\begin{bmatrix}1 & 1 \\\\ -2 & -2\\end{bmatrix}$</p>
<p>두 행이 평행 (둘째 행 = $-2 \\times$ 첫째 행) → 한 식만 보면 됨:<br>
$v_1 + v_2 = 0 \\Rightarrow v_2 = -v_1$<br>
$v_1 = 1$ 잡으면: $\\boxed{\\mathbf{v}_1 = \\begin{bmatrix}1 \\\\ -1\\end{bmatrix}}$</p>

<p><em>검증:</em> $A\\mathbf{v}_1 = \\begin{bmatrix}1 & -1 \\\\ 2 & 4\\end{bmatrix}\\begin{bmatrix}1 \\\\ -1\\end{bmatrix} = \\begin{bmatrix}1 \\cdot 1 + (-1)(-1) \\\\ 2 \\cdot 1 + 4 \\cdot (-1)\\end{bmatrix} = \\begin{bmatrix}2 \\\\ -2\\end{bmatrix} = 2\\mathbf{v}_1$ ✓</p>

<p><strong>$\\lambda_2 = 3$:</strong> $(3I - A)\\mathbf{v} = \\mathbf{0}$ 풀이.</p>
<p>$3I - A = \\begin{bmatrix}2 & 1 \\\\ -2 & -1\\end{bmatrix}$</p>
<p>$2v_1 + v_2 = 0 \\Rightarrow v_2 = -2v_1$<br>
$v_1 = 1$ 잡으면: $\\boxed{\\mathbf{v}_2 = \\begin{bmatrix}1 \\\\ -2\\end{bmatrix}}$</p>

<p><em>검증:</em> $A\\mathbf{v}_2 = \\begin{bmatrix}1 + 2 \\\\ 2 - 8\\end{bmatrix} = \\begin{bmatrix}3 \\\\ -6\\end{bmatrix} = 3\\mathbf{v}_2$ ✓</p>

<hr>

<p><strong>(b) Diagonalization</strong></p>

<p><strong>Step 1. $P$ 와 $D$ 만들기</strong></p>
<p>Eigenvector 를 열로 쌓아 $P$, 대응되는 eigenvalue 를 같은 순서로 대각에 놓아 $D$:</p>
<p>$$P = [\\mathbf{v}_1 \\;|\\; \\mathbf{v}_2] = \\begin{bmatrix}1 & 1 \\\\ -1 & -2\\end{bmatrix}, \\quad D = \\begin{bmatrix}2 & 0 \\\\ 0 & 3\\end{bmatrix}$$</p>

<p><strong>Step 2. $P^{-1}$ 계산 ($2\\times 2$ 공식)</strong></p>
<p>$\\begin{bmatrix}a & b \\\\ c & d\\end{bmatrix}^{-1} = \\dfrac{1}{ad - bc}\\begin{bmatrix}d & -b \\\\ -c & a\\end{bmatrix}$</p>
<p>$\\det P = (1)(-2) - (1)(-1) = -2 + 1 = -1$</p>
<p>$P^{-1} = \\dfrac{1}{-1}\\begin{bmatrix}-2 & -1 \\\\ 1 & 1\\end{bmatrix} = \\boxed{\\begin{bmatrix}2 & 1 \\\\ -1 & -1\\end{bmatrix}}$</p>

<p><strong>Step 3. 검증 — $P^{-1} A P = D$ 확인</strong></p>
<p>$AP = \\begin{bmatrix}1 & -1 \\\\ 2 & 4\\end{bmatrix}\\begin{bmatrix}1 & 1 \\\\ -1 & -2\\end{bmatrix} = \\begin{bmatrix}1+1 & 1+2 \\\\ 2-4 & 2-8\\end{bmatrix} = \\begin{bmatrix}2 & 3 \\\\ -2 & -6\\end{bmatrix}$</p>
<p>$P^{-1}(AP) = \\begin{bmatrix}2 & 1 \\\\ -1 & -1\\end{bmatrix}\\begin{bmatrix}2 & 3 \\\\ -2 & -6\\end{bmatrix} = \\begin{bmatrix}4-2 & 6-6 \\\\ -2+2 & -3+6\\end{bmatrix} = \\begin{bmatrix}2 & 0 \\\\ 0 & 3\\end{bmatrix} = D$ ✓</p>

<hr>

<p><strong>(c) $e^{At}$ via Cayley-Hamilton</strong></p>

<p><strong>전략:</strong> $n \\times n$ 행렬의 $e^{At}$ 는 Cayley-Hamilton 에 의해 $n - 1$ 차 다항식으로 표현 가능. $n = 2$ 라:</p>
<p>$$e^{At} = \\beta_0(t)\\, I + \\beta_1(t)\\, A$$</p>
<p>미지수 $\\beta_0, \\beta_1$ 는 각 eigenvalue 마다 식 하나씩.</p>

<p><strong>Step 1. 두 eigenvalue 로 식 세우기</strong></p>
<p>$e^{\\lambda t} = \\beta_0 + \\beta_1 \\lambda$ 에 $\\lambda = 2, 3$ 대입:</p>
<p>(식①): $e^{2t} = \\beta_0 + 2\\beta_1$<br>
(식②): $e^{3t} = \\beta_0 + 3\\beta_1$</p>

<p><strong>Step 2. 연립 풀이</strong></p>
<p>식② − 식①: $e^{3t} - e^{2t} = \\beta_1$</p>
<p>$$\\boxed{\\beta_1(t) = e^{3t} - e^{2t}}$$</p>
<p>식①에 대입: $\\beta_0 = e^{2t} - 2\\beta_1 = e^{2t} - 2(e^{3t} - e^{2t}) = e^{2t} - 2e^{3t} + 2e^{2t} = 3e^{2t} - 2e^{3t}$</p>
<p>$$\\boxed{\\beta_0(t) = 3e^{2t} - 2e^{3t}}$$</p>

<p><strong>Step 3. $e^{At}$ 조립</strong></p>
<p>$e^{At} = (3e^{2t} - 2e^{3t})\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix} + (e^{3t} - e^{2t})\\begin{bmatrix}1 & -1 \\\\ 2 & 4\\end{bmatrix}$</p>
<p>각 원소 계산 (한 줄씩):</p>
<ul>
  <li>$(1,1)$: $(3e^{2t} - 2e^{3t})(1) + (e^{3t} - e^{2t})(1)$ <br>$= 3e^{2t} - 2e^{3t} + e^{3t} - e^{2t} = 2e^{2t} - e^{3t}$</li>
  <li>$(1,2)$: $(3e^{2t} - 2e^{3t})(0) + (e^{3t} - e^{2t})(-1)$ <br>$= 0 - e^{3t} + e^{2t} = e^{2t} - e^{3t}$</li>
  <li>$(2,1)$: $(3e^{2t} - 2e^{3t})(0) + (e^{3t} - e^{2t})(2)$ <br>$= 2e^{3t} - 2e^{2t} = -2e^{2t} + 2e^{3t}$</li>
  <li>$(2,2)$: $(3e^{2t} - 2e^{3t})(1) + (e^{3t} - e^{2t})(4)$ <br>$= 3e^{2t} - 2e^{3t} + 4e^{3t} - 4e^{2t} = -e^{2t} + 2e^{3t}$</li>
</ul>

<p>$$\\boxed{e^{At} = \\begin{bmatrix} 2e^{2t} - e^{3t} & e^{2t} - e^{3t} \\\\ -2e^{2t} + 2e^{3t} & -e^{2t} + 2e^{3t} \\end{bmatrix}}$$</p>

<p><strong>검증 ($t = 0$):</strong> 각 원소에 $e^0 = 1$ 대입:</p>
<ul>
  <li>$(1,1)$: $2 - 1 = 1$ ✓</li>
  <li>$(1,2)$: $1 - 1 = 0$ ✓</li>
  <li>$(2,1)$: $-2 + 2 = 0$ ✓</li>
  <li>$(2,2)$: $-1 + 2 = 1$ ✓</li>
</ul>
<p>$e^{A \\cdot 0} = I$ — 통과.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>Characteristic poly에서 $\\det = (\\lambda-1)(\\lambda-4) - (1)(-2)$ — <strong>−</strong> 부호와 $(1)(-2) = -2$ 의 <strong>−</strong> 부호 두 번 처리해서 $+2$ 가 됨. 실수가 정말 자주 일어나는 곳.</li>
  <li>$\\beta$ 부호 실수: 식② − 식① 인지 ① − ② 인지.</li>
  <li>마지막 조립에서 행렬 원소별 계산할 때 한 곳 실수하면 전체가 무너짐 → $t=0$ 검증 필수.</li>
</ul>
`
})}

${examProblem({
  num: 3,
  points: 15,
  topic: "$A\\mathbf{x} = \\mathbf{b}$ 일반해 (rank, nullity)",
  statement: `For $\\mathbf{A} = \\begin{bmatrix}1 & 2 & 1 & 3 \\\\ 2 & 4 & 3 & 7 \\\\ 1 & 2 & 2 & 4\\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix}1\\\\3\\\\2\\end{bmatrix}$, find:<br>
  (a) rank of $\\mathbf{A}$ and nullity (3 pts)<br>
  (b) general solution of $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ (12 pts)`,
  koreanText: `위 $3 \\times 4$ $\\mathbf{A}, \\mathbf{b}$ 에 대해 (a) rank 와 nullity, (b) 일반해를 구하라.`,
  answer: `
<p><strong>전략:</strong> $A$ 와 $b$ 를 augmented matrix $[A | b]$ 로 묶어 한 번에 가우스 소거. Rank 와 일반해를 동시에 얻는다.</p>

<p><strong>(a) Rank & Nullity</strong></p>

<p><strong>Step 1. 가우스 소거 (RREF 까지)</strong></p>
<p>시작: $[A | b] = \\begin{bmatrix}1 & 2 & 1 & 3 & | & 1 \\\\ 2 & 4 & 3 & 7 & | & 3 \\\\ 1 & 2 & 2 & 4 & | & 2\\end{bmatrix}$</p>
<p>R2 ← R2 − 2R1: $[2, 4, 3, 7 | 3] - 2 \\cdot [1, 2, 1, 3 | 1] = [0, 0, 1, 1 | 1]$<br>
R3 ← R3 − R1: $[1, 2, 2, 4 | 2] - [1, 2, 1, 3 | 1] = [0, 0, 1, 1 | 1]$</p>
<p>$\\to \\begin{bmatrix}1 & 2 & 1 & 3 & | & 1 \\\\ 0 & 0 & 1 & 1 & | & 1 \\\\ 0 & 0 & 1 & 1 & | & 1\\end{bmatrix}$</p>
<p>R3 ← R3 − R2: $[0, 0, 0, 0 | 0]$</p>
<p>$\\to \\begin{bmatrix}1 & 2 & 1 & 3 & | & 1 \\\\ 0 & 0 & 1 & 1 & | & 1 \\\\ 0 & 0 & 0 & 0 & | & 0\\end{bmatrix}$ — 마지막 행 모두 0 → consistent (해 존재) ✓</p>

<p><strong>Step 2. Pivot 식별 → rank</strong></p>
<p>비영 행이 2개. Pivot은 1열, 3열. 그러므로:</p>
<p>$$\\boxed{\\text{rank}(A) = 2, \\quad \\text{nullity} = n - \\text{rank} = 4 - 2 = 2}$$</p>

<hr>

<p><strong>(b) 일반해 = 특수해 + 동차해</strong></p>

<p><strong>Step 1. Free vs pivot 구분</strong></p>
<p>Pivot 변수: $x_1$ (1열), $x_3$ (3열).<br>
Free 변수: $x_2$ (2열), $x_4$ (4열). → 자유도 2개 (= nullity ✓)</p>

<p><strong>Step 2. Particular solution $\\mathbf{x}_p$ — free 변수 모두 0 으로</strong></p>
<p>$x_2 = 0, x_4 = 0$ 잡고:</p>
<p>3행 (RREF 둘째 행): $x_3 + x_4 = 1 \\Rightarrow x_3 = 1$<br>
1행: $x_1 + 2x_2 + x_3 + 3x_4 = 1 \\Rightarrow x_1 + 0 + 1 + 0 = 1 \\Rightarrow x_1 = 0$</p>
<p>$$\\mathbf{x}_p = \\begin{bmatrix}0 \\\\ 0 \\\\ 1 \\\\ 0\\end{bmatrix}$$</p>
<p><em>검증:</em> $A\\mathbf{x}_p = $ 1열 (×0) + 2열 (×0) + 3열 (×1) + 4열 (×0) = 3열 = $[1, 3, 2]^T = b$ ✓</p>

<p><strong>Step 3. Homogeneous solutions $\\mathbf{n}_1, \\mathbf{n}_2$ — 각 free 변수 한 번씩 1로</strong></p>
<p>$A\\mathbf{x} = \\mathbf{0}$ 풀이.</p>

<p><strong>$\\mathbf{n}_1$:</strong> $x_2 = 1, x_4 = 0$:<br>
3행: $x_3 + 0 = 0 \\Rightarrow x_3 = 0$<br>
1행: $x_1 + 2(1) + 0 + 0 = 0 \\Rightarrow x_1 = -2$<br>
$\\mathbf{n}_1 = [-2, 1, 0, 0]^T$</p>

<p><strong>$\\mathbf{n}_2$:</strong> $x_2 = 0, x_4 = 1$:<br>
3행: $x_3 + 1 = 0 \\Rightarrow x_3 = -1$<br>
1행: $x_1 + 0 + (-1) + 3(1) = 0 \\Rightarrow x_1 = -2$<br>
$\\mathbf{n}_2 = [-2, 0, -1, 1]^T$</p>

<p><em>검증:</em> $A\\mathbf{n}_1 = [-2 + 2, -4 + 4, -2 + 2]^T = [0,0,0]^T$ ✓<br>
$A\\mathbf{n}_2 = [-2 + 0 + (-1) + 3, -4 + 0 + (-3) + 7, -2 + 0 + (-2) + 4]^T = [0,0,0]^T$ ✓</p>

<p><strong>Step 4. 일반해 조립</strong></p>
<p>$$\\boxed{\\mathbf{x} = \\begin{bmatrix}0\\\\0\\\\1\\\\0\\end{bmatrix} + \\alpha\\begin{bmatrix}-2\\\\1\\\\0\\\\0\\end{bmatrix} + \\beta\\begin{bmatrix}-2\\\\0\\\\-1\\\\1\\end{bmatrix}, \\quad \\alpha, \\beta \\in \\mathbb{R}}$$</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>Augmented 행렬 마지막 행이 $[0, 0, 0, 0 | k]$ ($k \\neq 0$) 이면 inconsistent → 해 없음. 이번 문제는 $k = 0$ 이라 OK.</li>
  <li>Free variable 잡을 때 한 번에 둘 다 1로 잡으면 안 됨 — 각각 따로 (basis 의 의미).</li>
  <li>일반해 마지막에 "$\\alpha, \\beta \\in \\mathbb{R}$" 안 적으면 부분 감점.</li>
</ul>
`
})}

${examProblem({
  num: 4,
  points: 15,
  topic: "State-space realization",
  statement: `Find the controllable canonical form realization of $\\hat g(s) = \\dfrac{s + 2}{s^2 + 4s + 3}$. Verify by computing $\\mathbf{C}(s\\mathbf{I} - \\mathbf{A})^{-1}\\mathbf{B}$.`,
  koreanText: `위 전달함수의 controllable canonical form 실현을 구하고, $\\mathbf{C}(s\\mathbf{I} - \\mathbf{A})^{-1}\\mathbf{B}$ 로 검증하라.`,
  answer: `
<p><strong>전략:</strong> 분모/분자 다항식 계수만 추출하면 공식에 그대로 대입. SISO controllable canonical form 은 외울 정도로 자주 쓰임.</p>

<p><strong>Step 1. 계수 추출</strong></p>
<ul>
  <li>분모 $d(s) = s^2 + 4s + 3$: $a_0 = 3$ (상수항), $a_1 = 4$ ($s$ 의 계수). 차수 $n = 2$.</li>
  <li>분자 $n(s) = s + 2$: $b_0 = 2, b_1 = 1$. 차수 1 ($< n$ → strictly proper → $D = 0$).</li>
</ul>

<p><strong>Step 2. 공식 적용 (SISO controllable canonical form, $n = 2$)</strong></p>
<p>$$A = \\begin{bmatrix}0 & 1 \\\\ -a_0 & -a_1\\end{bmatrix} = \\begin{bmatrix}0 & 1 \\\\ -3 & -4\\end{bmatrix}, \\quad B = \\begin{bmatrix}0 \\\\ 1\\end{bmatrix}$$</p>
<p>$$C = [b_0, \\, b_1] = [2, \\, 1], \\quad D = 0$$</p>

<p><strong>Step 3. 검증 — $C(sI-A)^{-1}B$ 계산</strong></p>

<p><strong>① $sI - A$ 와 행렬식:</strong></p>
<p>$sI - A = \\begin{bmatrix}s & -1 \\\\ 3 & s+4\\end{bmatrix}$<br>
$\\det(sI - A) = s(s+4) - (-1)(3) = s^2 + 4s + 3$ ✓ (분모와 일치)</p>

<p><strong>② $(sI-A)^{-1}$:</strong></p>
<p>$$(sI-A)^{-1} = \\dfrac{1}{s^2+4s+3}\\begin{bmatrix}s+4 & 1 \\\\ -3 & s\\end{bmatrix}$$</p>

<p><strong>③ $(sI-A)^{-1} B$:</strong></p>
<p>$(sI-A)^{-1}\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\dfrac{1}{s^2+4s+3}\\begin{bmatrix}s+4 & 1 \\\\ -3 & s\\end{bmatrix}\\begin{bmatrix}0\\\\1\\end{bmatrix} = \\dfrac{1}{s^2+4s+3}\\begin{bmatrix}1 \\\\ s\\end{bmatrix}$</p>

<p><strong>④ $C(sI-A)^{-1}B$:</strong></p>
<p>$[2, 1] \\cdot \\dfrac{1}{s^2+4s+3}\\begin{bmatrix}1\\\\s\\end{bmatrix} = \\dfrac{2 \\cdot 1 + 1 \\cdot s}{s^2+4s+3} = \\boxed{\\dfrac{s+2}{s^2+4s+3}}$ ✓</p>

<p>원래 $\\hat g(s)$ 와 일치 — realization 정확.</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>$A$ 의 마지막 행 부호 — $[-a_0, -a_1]$ 인데 양수로 적기 쉬움.</li>
  <li>$C$ 의 순서 — $[b_0, b_1]$ ($s^0, s^1$ 순) 이지 그 반대 아님.</li>
  <li>분자 차수 = 분모 차수면 strictly proper 가 아니라 $D \\neq 0$. 이번 문제는 1 < 2 라 $D = 0$.</li>
</ul>
`
})}

${examProblem({
  num: 5,
  points: 25,
  topic: "State equation 풀이 + steady state",
  statement: `Using $(\\mathbf{A}, \\mathbf{B}, \\mathbf{C})$ from Problem 4, with $\\mathbf{x}(0) = \\begin{bmatrix}1\\\\0\\end{bmatrix}$ and $u(t) = u_s(t)$:<br>
  (a) Find $y(t)$ for $t \\geq 0$ (zero-input + zero-state). (20 pts)<br>
  (b) Compute the steady-state $y(\\infty)$. (5 pts)`,
  koreanText: `문제 4의 $(\\mathbf{A}, \\mathbf{B}, \\mathbf{C})$, $\\mathbf{x}(0) = [1,0]^T$, unit step 입력일 때 (a) $y(t)$ (zero-input + zero-state), (b) $y(\\infty)$.`,
  answer: `
<p><strong>전략:</strong> $y(t) = y_{zi}(t) + y_{zs}(t)$ — 두 부분 따로 계산 후 합산. <br>
- Zero-input ($y_{zi}$): $C e^{At} \\mathbf{x}_0$ 직접 계산.<br>
- Zero-state ($y_{zs}$): Laplace + 부분분수 가 합성곱 적분보다 훨씬 빠름.</p>

<p><strong>(a) $y(t)$</strong></p>

<p><strong>Step 1. $e^{At}$ 부터 (Cayley-Hamilton)</strong></p>
<p>$A = \\begin{bmatrix}0 & 1 \\\\ -3 & -4\\end{bmatrix}$. Characteristic polynomial $s^2 + 4s + 3 = (s+1)(s+3)$ → $\\lambda = -1, -3$ (둘 다 LHP — 시스템 BIBO stable).</p>
<p>$e^{At} = \\beta_0 I + \\beta_1 A$:<br>
$e^{-t} = \\beta_0 - \\beta_1$<br>
$e^{-3t} = \\beta_0 - 3\\beta_1$</p>
<p>첫째 − 둘째: $e^{-t} - e^{-3t} = 2\\beta_1$ → $\\beta_1 = \\dfrac{1}{2}(e^{-t} - e^{-3t})$<br>
첫째 식: $\\beta_0 = e^{-t} + \\beta_1 = e^{-t} + \\dfrac{1}{2}(e^{-t} - e^{-3t}) = \\dfrac{1}{2}(3e^{-t} - e^{-3t})$</p>

<p><strong>Step 2. Zero-input 응답 — $\\mathbf{x}_0 = [1, 0]^T$ 라서 $e^{At}$ 의 1열만 필요</strong></p>
<p>$e^{At}$ 의 1열 $= \\beta_0 \\begin{bmatrix}1\\\\0\\end{bmatrix} + \\beta_1 A \\begin{bmatrix}1\\\\0\\end{bmatrix}$</p>
<p>$A\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\begin{bmatrix}0 \\\\ -3\\end{bmatrix}$ ($A$ 의 1열)</p>
<p>$\\to e^{At}\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\beta_0\\begin{bmatrix}1\\\\0\\end{bmatrix} + \\beta_1\\begin{bmatrix}0\\\\-3\\end{bmatrix} = \\begin{bmatrix}\\beta_0\\\\-3\\beta_1\\end{bmatrix}$</p>
<p>$= \\begin{bmatrix}\\frac{1}{2}(3e^{-t} - e^{-3t}) \\\\ -3 \\cdot \\frac{1}{2}(e^{-t} - e^{-3t})\\end{bmatrix} = \\begin{bmatrix}\\frac{1}{2}(3e^{-t} - e^{-3t}) \\\\ \\frac{1}{2}(-3e^{-t} + 3e^{-3t})\\end{bmatrix}$</p>
<p>$y_{zi}(t) = C \\cdot$ = $[2, 1]\\begin{bmatrix}\\frac{1}{2}(3e^{-t} - e^{-3t}) \\\\ \\frac{1}{2}(-3e^{-t} + 3e^{-3t})\\end{bmatrix}$</p>
<p>$= \\dfrac{1}{2}[2(3e^{-t} - e^{-3t}) + (-3e^{-t} + 3e^{-3t})]$<br>
$= \\dfrac{1}{2}[6e^{-t} - 2e^{-3t} - 3e^{-t} + 3e^{-3t}]$<br>
$= \\dfrac{1}{2}[3e^{-t} + e^{-3t}]$<br>
$= \\dfrac{3}{2}e^{-t} + \\dfrac{1}{2}e^{-3t}$</p>

<p><strong>Step 3. Zero-state 응답 — Laplace + 부분분수</strong></p>
<p>$\\hat g(s) = \\dfrac{s+2}{(s+1)(s+3)}$, $U(s) = \\dfrac{1}{s}$</p>
<p>$Y_{zs}(s) = \\hat g(s) \\cdot U(s) = \\dfrac{s+2}{s(s+1)(s+3)}$</p>
<p><strong>부분분수 분해:</strong> $\\dfrac{s+2}{s(s+1)(s+3)} = \\dfrac{A}{s} + \\dfrac{B}{s+1} + \\dfrac{C}{s+3}$</p>
<p><strong>덮개 trick (cover-up method):</strong></p>
<ul>
  <li>$A$: 양변에 $s$ 곱하고 $s = 0$: $A = \\dfrac{0 + 2}{(0+1)(0+3)} = \\dfrac{2}{3}$</li>
  <li>$B$: 양변에 $(s+1)$ 곱하고 $s = -1$: $B = \\dfrac{-1 + 2}{(-1)(-1+3)} = \\dfrac{1}{-2} = -\\dfrac{1}{2}$</li>
  <li>$C$: 양변에 $(s+3)$ 곱하고 $s = -3$: $C = \\dfrac{-3 + 2}{(-3)(-3+1)} = \\dfrac{-1}{6} = -\\dfrac{1}{6}$</li>
</ul>
<p>$Y_{zs}(s) = \\dfrac{2/3}{s} - \\dfrac{1/2}{s+1} - \\dfrac{1/6}{s+3}$</p>
<p>역변환: $y_{zs}(t) = \\dfrac{2}{3} - \\dfrac{1}{2}e^{-t} - \\dfrac{1}{6}e^{-3t}$</p>

<p><strong>Step 4. 두 응답 합치기</strong></p>
<p>$y(t) = y_{zi}(t) + y_{zs}(t)$</p>
<p>$= \\left(\\dfrac{3}{2}e^{-t} + \\dfrac{1}{2}e^{-3t}\\right) + \\left(\\dfrac{2}{3} - \\dfrac{1}{2}e^{-t} - \\dfrac{1}{6}e^{-3t}\\right)$</p>
<p>상수: $\\dfrac{2}{3}$<br>
$e^{-t}$: $\\dfrac{3}{2} - \\dfrac{1}{2} = 1$<br>
$e^{-3t}$: $\\dfrac{1}{2} - \\dfrac{1}{6} = \\dfrac{3 - 1}{6} = \\dfrac{2}{6} = \\dfrac{1}{3}$</p>
<p>$$\\boxed{y(t) = \\dfrac{2}{3} + e^{-t} + \\dfrac{1}{3}e^{-3t}}$$</p>

<p><strong>검증 ($t = 0$):</strong> $\\dfrac{2}{3} + 1 + \\dfrac{1}{3} = 2$. <br>
직접 계산: $y(0) = C\\mathbf{x}(0) + D \\cdot u(0) = [2, 1]\\begin{bmatrix}1\\\\0\\end{bmatrix} + 0 = 2$ ✓</p>

<hr>

<p><strong>(b) Steady state $y(\\infty)$</strong></p>
<p>시스템 BIBO stable (pole $-1, -3$ 모두 LHP) → step 입력의 정상상태 응답이 의미 있음.</p>
<p><strong>방법 1 (식에서):</strong> $y(t) \\to \\dfrac{2}{3} + 0 + 0 = \\dfrac{2}{3}$ as $t \\to \\infty$.</p>
<p><strong>방법 2 (Final Value Theorem 으로 빠르게):</strong></p>
<p>$y(\\infty) = \\hat g(0) \\cdot U_{\\text{const}} = \\dfrac{0 + 2}{0 + 0 + 3} \\cdot 1 = \\dfrac{2}{3}$</p>
<p>$$\\boxed{y(\\infty) = \\dfrac{2}{3}}$$</p>

<p><strong>흔한 실수:</strong></p>
<ul>
  <li>Zero-input 만 계산하고 zero-state 빼먹기 (또는 그 반대).</li>
  <li>부분분수 계수에서 부호 실수 — 특히 $B, C$ 의 분모에 음수가 들어가서 헷갈림.</li>
  <li>Final value theorem 사용 전에 stability 확인 안 함 (불안정 시스템엔 못 씀).</li>
</ul>
`
})}

${note(`<strong>채점 가이드:</strong><br>
- Q1 합성곱: step response 트릭 안 쓰고 직접 합성곱 적분해도 OK, 단 케이스 분기 정확해야.<br>
- Q2 Cayley-Hamilton: $e^{At}$ 까지 도달 못 했어도 $\\beta_0, \\beta_1$ 정확히 풀었으면 70%.<br>
- Q3: rank 정확 + 자유변수 개수 맞추면 절반, 최종 일반해까지 가야 만점.<br>
- Q4: 부호 실수 자주 — $A$의 마지막 행 $[-a_0, -a_1]$ 주의.<br>
- Q5: 부분분수 → Laplace 역변환이 핵심. 한 계수 틀리면 $-3$ ~ $-5$.<br><br>
<strong>예상 점수대:</strong> 75점 이상이면 시험 무난, 60점 미만이면 약점 챕터 한 번 더.`, "tip")}
`);
