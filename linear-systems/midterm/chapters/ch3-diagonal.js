registerPage("ch3-diagonal", "Diagonalization", () => `
<h1>Ch 3.4 — Diagonalization</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #2(b) — eigenvalue 구한 뒤 자연스럽게 따라옴.</p>

${profMemo(`<strong>eigenvalue 문제와 세트로 출제.</strong> 거의 "eigenvalue 구하기 → $P$, $D$ 구하기 → (Cayley-Hamilton으로) $e^{At}$" 순. 2×2가 주로 나오니까 $P^{-1}$ 계산(2×2 역행렬 공식)이 빠르게 되도록 연습.`)}

<h2>1. 핵심 아이디어</h2>
${defCard("Diagonalization", `
$A$가 $n$개의 선형독립 ${term("eigenvector")}를 가지면, eigenvector들을 열로 모은 행렬 $P$로:
$$\\boxed{P^{-1} A P = D}$$
여기서 $D = \\text{diag}(\\lambda_1, \\lambda_2, \\ldots, \\lambda_n)$은 ${term("eigenvalue")}을 대각에 가진 대각행렬. 자세한 조건은 ${term("diagonalization")} 참고.
`)}

${note(`<strong>왜 중요?</strong> 대각행렬은 거듭제곱·지수함수 계산이 압도적으로 쉬움:<br>
$D^k = \\text{diag}(\\lambda_1^k, \\ldots, \\lambda_n^k)$<br>
$e^{Dt} = \\text{diag}(e^{\\lambda_1 t}, \\ldots, e^{\\lambda_n t})$<br>
그래서 $e^{At} = P e^{Dt} P^{-1}$로 한 번에 풀림. 다음 페이지 (${term("matrix-exp", "matrix exponential")})의 핵심.`, "tip")}

${concept("직관 — '제대로 된 각도에서 보기'", `
복잡하게 얽힌 시스템도 <strong>적절한 좌표축 (= eigenvector)</strong>으로 바꿔서 보면 단순해져.<br><br>
비유: 회전한 직사각형이 표준 좌표에선 복잡한 부등식이지만, 직사각형 변과 평행한 좌표축으로 바꾸면 $|x'| \\le a, |y'| \\le b$로 단순.<br><br>
$P$ = 좌표 변환 행렬 (${term("representation", "표현")}이 바뀜), $D$ = 새 좌표에서 본 시스템. 이 아이디어가 곧 ${term("similarity", "닮음변환")}.
`)}

${concept("물리적 예시 — 진동의 모드 분해", `
복잡한 진동도 <strong>모드별로 분해</strong>하면 단순. 각 모드는 독립적인 단순 진동.<br><br>
기타 줄을 튕기면 → 기본음 + 2배음 + 3배음 + ...이 동시에 울림. 각 음이 하나의 eigenvector(모드 형상), 주파수가 eigenvalue.<br><br>
$P$ = 모드 형상들의 행렬, $D$ = 각 모드의 주파수. 복잡한 진동을 모드별로 분리해서 분석한 뒤 다시 합침.
`)}

<h2>2. 시각화 — 대각화는 격자가 "축에 맞는" 기저를 찾는 것</h2>

<p>슬라이더로 $A$를 바꿔보면서 <span style="color:#a855f7;">보라/주황 점선</span>(eigenvector) 방향을 관찰해. 그 방향에서는 격자가 <em>꺾이지 않고</em> 늘어나기만 함 — 그게 $D$가 대각행렬이 되는 이유.</p>

${matrixTransform2D({ a: 2, b: 0.5, c: 0.5, d: 2 })}

<h2>3. 절차 (외우기)</h2>
<ol>
  <li>Eigenvalue $\\lambda_1, \\ldots, \\lambda_n$ 찾기</li>
  <li>각 $\\lambda_i$에 대한 eigenvector $\\mathbf{v}_i$ 찾기</li>
  <li>$P = [\\mathbf{v}_1 \\;|\\; \\mathbf{v}_2 \\;|\\; \\cdots \\;|\\; \\mathbf{v}_n]$ — 열로 쌓기</li>
  <li>$D = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)$ (또는 검산으로 $D = P^{-1} A P$)</li>
</ol>

${note(`강의자료/족보에 <strong>$P A P^{-1}$</strong>로 쓴 경우도 있음 (Chen 교재 표기 약속이 다를 뿐). 결과 행렬 구조는 같음.`, "warn")}

${prereq("2×2 역행렬 공식 복습", `
$A = \\begin{bmatrix}a & b\\\\ c & d\\end{bmatrix}$일 때
$$A^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix}d & -b \\\\ -c & a\\end{bmatrix}$$
$ad - bc = \\det A$가 0이면 역행렬 없음 (= ${term("nonsingular")} 아님).<br>
3×3까지가 시험 범위라서 이 공식은 시험장에서 매번 써야 해.
`)}

<h2>4. 워크스루 — 족보 2013 #2(b)</h2>

${walkthrough("$A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$를 대각화하는 $P$ 찾기", [
  {
    title: "이전 결과 가져오기",
    body: `${term("eigenvalue")} 페이지에서 구함:<br>
    $\\lambda_1 = -1, \\mathbf{v}_1 = \\begin{bmatrix}2\\\\1\\end{bmatrix}$<br>
    $\\lambda_2 = -2, \\mathbf{v}_2 = \\begin{bmatrix}1\\\\1\\end{bmatrix}$`
  },
  {
    title: "$P$ 만들기",
    body: `Eigenvector를 열로:
    $$P = \\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix}$$`
  },
  {
    title: "$P^{-1}$ 계산",
    body: `$\\det P = 2 \\cdot 1 - 1 \\cdot 1 = 1$<br>
    $$P^{-1} = \\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$$`
  },
  {
    title: "$D = P^{-1} A P$ 검산",
    body: `$AP = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix} = \\begin{bmatrix}-2 & -2 \\\\ -1 & -2\\end{bmatrix}$<br>
    $P^{-1}(AP) = \\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}\\begin{bmatrix}-2 & -2 \\\\ -1 & -2\\end{bmatrix} = \\begin{bmatrix}-1 & 0 \\\\ 0 & -2\\end{bmatrix} = D$ ✓`
  }
])}

<h2>5. 대각화 가능 조건</h2>
${defCard("Diagonalizable ↔ ?", `
$n \\times n$ 행렬 $A$가 대각화 가능 ⇔ <strong>$n$개의 선형독립 eigenvector를 가짐</strong>.<br><br>
충분조건들:
<ul>
  <li>$n$개의 서로 다른(distinct) eigenvalue → 무조건 가능</li>
  <li>${term("symmetric", "대칭행렬")} ($A = A^T$) → 무조건 가능 (${term("orthogonal-matrix", "직교행렬")} $P$로)</li>
</ul>
중복된 eigenvalue가 있으면 eigenvector가 모자랄 수 있음 → ${term("jordan", "Jordan form")} 써야 함. 개수 차이는 ${term("geom-mult", "geometric multiplicity")}와 ${term("alg-mult", "algebraic multiplicity")}의 차이로 본다.
`)}

${mcQuiz(
  "$A = \\begin{bmatrix}1 & 1 \\\\ 0 & 1\\end{bmatrix}$은 대각화 가능?",
  ["가능, 항등행렬과 닮았으니까", "불가능. eigenvalue 1이 중복인데 독립 eigenvector가 1개뿐", "가능. 모든 $2 \\times 2$는 대각화됨"],
  1,
  "$\\lambda = 1$ 중복근. $(A - I)\\mathbf{v} = \\mathbf{0}$ 풀면 $\\mathbf{v} = [1, 0]^T$ 하나만 → 독립 eigenvector 1개 → 대각화 불가. (Jordan form 필요)"
)}

${mcQuiz(
  "대각화 $P^{-1} A P = D$가 성립할 때, $A^{10}$은?",
  ["$P D^{10} P^{-1}$", "$P^{10} D P^{-1}$", "$D^{10}$", "$P^{-1} D^{10} P$"],
  0,
  "$A = PDP^{-1}$이므로 $A^k = PD^kP^{-1}$. 중간 $P^{-1}P$가 다 상쇄됨."
)}

${note(`<strong>다음 페이지 예고:</strong> $P, D$가 손에 들어오면 ${term("matrix-exp", "$e^{At}$")}가 단순 곱셈으로 풀려. 그게 시험의 핵심.`, "tip")}
`);
