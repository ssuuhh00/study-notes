registerPage("ch3-cayley", "Cayley-Hamilton & e^At", () => `
<h1>Ch 3.5 — Cayley-Hamilton & $e^{At}$</h1>
<p class="lead">${tag("100% 출제", "must")} 족보 2013, 2015, 과제 모두 등장. <strong>이 페이지가 중간고사의 핵심</strong>.</p>

${profMemo(`<strong>이건 무조건 나와.</strong> "그대로 출제" 패턴이라 족보 풀이를 통째로 외워가도 됨. 계산은 2×2 기준이라 $\\beta_0, \\beta_1$ 두 개만 풀면 되고, $t = 0$ 대입 sanity check로 검산까지 가능. 시간 안 남으면 이거 하나만 확실히 챙겨도 배점 큼.`)}

<h2>1. Matrix Exponential $e^{At}$</h2>
${defCard("$e^{At}$ 정의", `
스칼라 지수함수의 Taylor 전개를 행렬로 확장 → ${term("matrix-exp")}:
$$e^{At} = I + At + \\frac{(At)^2}{2!} + \\frac{(At)^3}{3!} + \\cdots = \\sum_{k=0}^{\\infty} \\frac{(At)^k}{k!}$$
`)}

${note(`<strong>왜 중요?</strong> 상태방정식 $\\dot{\\mathbf{x}} = A\\mathbf{x}$의 해가 정확히 $\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$. 시스템 응답 = $e^{At}$ 계산. 중간고사 한 문제는 무조건 이거.`, "tip")}

${prereq("Taylor 전개 복습", `
스칼라 함수를 다항식 무한합으로: $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$<br><br>
여기서 $x$ 자리에 $At$ (행렬 × 스칼라)를 넣어도 같은 형태가 됨. $A^0 = I$ 규약이라 첫 항이 $I$.<br><br>
수렴 이유: $A^k / k!$의 norm이 $k$ 커지면서 빠르게 0으로 가기 때문.
`)}

${concept("스칼라와 비교 — 왜 $e^{At}$인가?", `
스칼라 미분방정식 $\\dot x = ax$의 해는 $x(t) = e^{at} x(0)$. 이걸 행렬 버전으로 일반화한 게 $\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$.<br><br>
스칼라: $a < 0$이면 감쇠, $a > 0$이면 발산, $a = 0$이면 정지.<br>
행렬: 각 eigenvalue $\\lambda_i$가 $a$의 역할 → 모드별 $e^{\\lambda_i t}$. <strong>eigenvalue가 시스템의 운명을 결정</strong>. 이게 ${term("internal-stability", "안정도")}의 핵심.
`)}

<h2>2. 계산 방법 — 3가지 중 2개만 잘 알면 됨</h2>
<table>
  <tr><th>방법</th><th>장점</th><th>단점</th></tr>
  <tr><td>1. ${term("diagonalization", "Diagonalization")} 이용</td><td>대각화 되면 한 줄</td><td>중복 eigenvalue면 막힘</td></tr>
  <tr><td>2. <strong>${term("cayley-hamilton", "Cayley-Hamilton")}</strong></td><td>모든 경우 OK, 시험 정답 방법</td><td>설명이 좀 김</td></tr>
  <tr><td>3. Laplace ($\\mathcal{L}^{-1}\\{(sI-A)^{-1}\\}$)</td><td>직관적</td><td>역행렬 + 부분분수 → 노가다</td></tr>
</table>

<h2>3. 방법 1: Diagonalization으로</h2>
${defCard("$A = PDP^{-1}$이면", `
$$\\boxed{e^{At} = P e^{Dt} P^{-1}, \\qquad e^{Dt} = \\text{diag}(e^{\\lambda_1 t}, \\ldots, e^{\\lambda_n t})}$$
`)}

${concept("이전 예제 이어서 — $A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$", `
$P = \\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix}$, $P^{-1} = \\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$, $D = \\text{diag}(-1, -2)$.<br><br>
$e^{Dt} = \\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-2t}\\end{bmatrix}$<br><br>
$e^{At} = P e^{Dt} P^{-1} = \\begin{bmatrix}2 & 1 \\\\ 1 & 1\\end{bmatrix}\\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-2t}\\end{bmatrix}\\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$<br><br>
중간 단계: $\\begin{bmatrix}2e^{-t} & e^{-2t} \\\\ e^{-t} & e^{-2t}\\end{bmatrix}\\begin{bmatrix}1 & -1 \\\\ -1 & 2\\end{bmatrix}$<br><br>
$$e^{At} = \\begin{bmatrix}2e^{-t} - e^{-2t} & -2e^{-t} + 2e^{-2t} \\\\ e^{-t} - e^{-2t} & -e^{-t} + 2e^{-2t}\\end{bmatrix}$$
`)}

<h2>4. 방법 2: Cayley-Hamilton ⭐</h2>
${defCard("Cayley-Hamilton Theorem", `
모든 정사각 행렬은 자기 자신의 특성다항식을 만족 → ${term("cayley-hamilton")}.<br>
$\\Delta(\\lambda) = \\lambda^n + a_{n-1}\\lambda^{n-1} + \\cdots + a_0$이면:
$$\\boxed{\\Delta(A) = A^n + a_{n-1} A^{n-1} + \\cdots + a_0 I = 0}$$
`)}

${note(`<strong>의미:</strong> $A^n$은 더 낮은 차수 $A^{n-1}, \\ldots, I$의 선형결합으로 표현 가능. → $A$의 모든 다항식은 $n-1$차로 줄어듦. → <strong>$e^{At}$도 $n-1$차 다항식</strong>으로 표현 가능!`, "tip")}

<h3>핵심 공식 (외워!)</h3>
$n \\times n$ 행렬 $A$에 대해:
$$\\boxed{e^{At} = \\beta_0(t) I + \\beta_1(t) A + \\beta_2(t) A^2 + \\cdots + \\beta_{n-1}(t) A^{n-1}}$$

$\\beta_i(t)$는 각 eigenvalue $\\lambda_i$마다 1식을 세워 연립으로 푼다:
$$e^{\\lambda_i t} = \\beta_0(t) + \\beta_1(t) \\lambda_i + \\beta_2(t) \\lambda_i^2 + \\cdots + \\beta_{n-1}(t) \\lambda_i^{n-1}$$

${concept("중복 eigenvalue가 있으면?", `
그 식의 양변을 $\\lambda$에 대해 <strong>미분</strong>해서 추가 식을 만든다. 예: $\\lambda_1$이 중근이면<br>
- 식1: $e^{\\lambda_1 t} = \\beta_0 + \\beta_1 \\lambda_1 + \\beta_2 \\lambda_1^2 + \\cdots$<br>
- 식2 (1차 미분): $t\\,e^{\\lambda_1 t} = \\beta_1 + 2\\beta_2 \\lambda_1 + 3\\beta_3 \\lambda_1^2 + \\cdots$<br>
3중근이면 2차 미분식까지. 이렇게 해서 미지수 $\\beta_i$ 개수와 식 개수를 맞춤.
`)}

<h2>5. 워크스루 — 족보 2013 #2(c)</h2>

${walkthrough("$A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$, eigenvalue $-1, -2$로 $e^{At}$", [
  {
    title: "공식 형태 적기",
    body: `$n = 2$이므로:
    $$e^{At} = \\beta_0(t) I + \\beta_1(t) A$$
    미지수 $\\beta_0, \\beta_1$ 두 개.`
  },
  {
    title: "각 eigenvalue로 식 세우기",
    body: `$\\lambda_1 = -1$: $\\quad e^{-t} = \\beta_0 + \\beta_1 (-1) = \\beta_0 - \\beta_1$<br>
    $\\lambda_2 = -2$: $\\quad e^{-2t} = \\beta_0 + \\beta_1 (-2) = \\beta_0 - 2\\beta_1$`
  },
  {
    title: "연립방정식 풀기",
    body: `식1 − 식2: $e^{-t} - e^{-2t} = \\beta_1$<br>
    $\\boxed{\\beta_1(t) = e^{-t} - e^{-2t}}$<br><br>
    식1에 대입: $\\beta_0 = e^{-t} + \\beta_1 = 2e^{-t} - e^{-2t}$<br>
    $\\boxed{\\beta_0(t) = 2e^{-t} - e^{-2t}}$`
  },
  {
    title: "$e^{At}$ 조립",
    body: `$e^{At} = \\beta_0 I + \\beta_1 A$<br>
    $= (2e^{-t} - e^{-2t})\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix} + (e^{-t} - e^{-2t})\\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$<br><br>
    $(1,1)$: $(2e^{-t} - e^{-2t}) + 0 = 2e^{-t} - e^{-2t}$<br>
    $(1,2)$: $0 + (e^{-t} - e^{-2t})(-2) = -2e^{-t} + 2e^{-2t}$<br>
    $(2,1)$: $0 + (e^{-t} - e^{-2t})(1) = e^{-t} - e^{-2t}$<br>
    $(2,2)$: $(2e^{-t} - e^{-2t}) + (e^{-t} - e^{-2t})(-3) = -e^{-t} + 2e^{-2t}$<br><br>
    $$\\boxed{e^{At} = \\begin{bmatrix}2e^{-t} - e^{-2t} & -2e^{-t} + 2e^{-2t} \\\\ e^{-t} - e^{-2t} & -e^{-t} + 2e^{-2t}\\end{bmatrix}}$$<br>
    방법 1과 같은 답. ✓`
  },
  {
    title: "Sanity check (필수!)",
    body: `$t = 0$ 대입 → $I$가 나와야 함.<br>
    $(1,1)$: $2 - 1 = 1$ ✓<br>
    $(1,2)$: $-2 + 2 = 0$ ✓<br>
    $(2,1)$: $1 - 1 = 0$ ✓<br>
    $(2,2)$: $-1 + 2 = 1$ ✓<br>
    답 확정.`
  }
])}

<h2>6. 워크스루 #2 — 족보 2015 #2(b) (3×3)</h2>

${walkthrough("$A = \\begin{bmatrix}1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & 1\\end{bmatrix}$", [
  {
    title: "Eigenvalue 구하기",
    body: `$\\det(\\lambda I - A)$를 첫 행 cofactor expansion:<br>
    $(\\lambda-1)[(\\lambda-1)^2 - 1] - 0 + (-1)[0 - (-(\\lambda-1))]$<br>
    $= (\\lambda-1)[(\\lambda-1)^2 - 1] - (\\lambda-1)$<br>
    $= (\\lambda-1)[(\\lambda-1)^2 - 2]$<br>
    $= (\\lambda-1)(\\lambda - 1 - \\sqrt 2)(\\lambda - 1 + \\sqrt 2)$<br><br>
    $$\\lambda_1 = 1, \\quad \\lambda_2 = 1 + \\sqrt 2, \\quad \\lambda_3 = 1 - \\sqrt 2$$
    모두 distinct → 일반 공식 적용.`
  },
  {
    title: "공식 세우기",
    body: `$n = 3$이므로 $e^{At} = \\beta_0 I + \\beta_1 A + \\beta_2 A^2$, 각 eigenvalue로 식 3개.<br><br>
    (1): $e^{t} = \\beta_0 + \\beta_1 + \\beta_2$<br>
    (2): $e^{(1+\\sqrt 2)t} = \\beta_0 + (1+\\sqrt 2)\\beta_1 + (3 + 2\\sqrt 2)\\beta_2$<br>
    (3): $e^{(1-\\sqrt 2)t} = \\beta_0 + (1-\\sqrt 2)\\beta_1 + (3 - 2\\sqrt 2)\\beta_2$`
  },
  {
    title: "연립방정식 정리",
    body: `(2) − (3): $e^{(1+\\sqrt 2)t} - e^{(1-\\sqrt 2)t} = 2\\sqrt 2\\, \\beta_1 + 4\\sqrt 2\\, \\beta_2$<br>
    (2) + (3): $e^{(1+\\sqrt 2)t} + e^{(1-\\sqrt 2)t} = 2\\beta_0 + 2\\beta_1 + 6\\beta_2$<br>
    이 두 식과 (1)을 조합해서 $\\beta_0, \\beta_1, \\beta_2$ 풀면 됨. 노가다지만 절차는 2×2와 동일.`
  },
  {
    title: "중복 eigenvalue였다면?",
    body: `eigenvalue가 $\\lambda_1$ (중복) 과 $\\lambda_2$였다면 미분식으로 보충:<br>
    (1): $e^{\\lambda_1 t} = \\beta_0 + \\beta_1 \\lambda_1 + \\beta_2 \\lambda_1^2$<br>
    (2, $\\lambda$에 대한 1차 미분): $t\\,e^{\\lambda_1 t} = \\beta_1 + 2\\beta_2 \\lambda_1$<br>
    (3): $e^{\\lambda_2 t} = \\beta_0 + \\beta_1 \\lambda_2 + \\beta_2 \\lambda_2^2$<br>
    미지수 3개, 식 3개로 맞춤.`
  }
])}

<h2>7. 시험 직전 체크</h2>
${mcQuiz(
  "$2 \\times 2$ 행렬 $A$의 $e^{At}$를 Cayley-Hamilton으로 구할 때 형태는?",
  ["$\\beta_0(t) I$", "$\\beta_0(t) I + \\beta_1(t) A$", "$\\beta_0(t) I + \\beta_1(t) A + \\beta_2(t) A^2$", "$e^{\\lambda t} I$"],
  1,
  "$n = 2$이므로 $n-1 = 1$차까지. 즉 $\\beta_0 I + \\beta_1 A$. 미지수 2개라 eigenvalue 2개 식으로 풀림."
)}

${mcQuiz(
  "$e^{At}$의 sanity check는?",
  ["$e^{A \\cdot 0} = 0$", "$e^{A \\cdot 0} = I$", "$\\det(e^{At}) = 0$"],
  1,
  "$t = 0$에서 $e^{0} = I$. 항상 이걸로 검증해."
)}

${mcQuiz(
  "$A = \\begin{bmatrix}-1 & 0 \\\\ 0 & -3\\end{bmatrix}$일 때 $e^{At}$는?",
  ["$\\begin{bmatrix}e^{-t} & 0 \\\\ 0 & e^{-3t}\\end{bmatrix}$", "$\\begin{bmatrix}-e^{-t} & 0 \\\\ 0 & -e^{-3t}\\end{bmatrix}$", "$e^{-4t} I$"],
  0,
  "이미 대각이라 $e^{At} = \\text{diag}(e^{-t}, e^{-3t})$. 이런 거 나오면 1초 만에 풀어."
)}

${note(`<strong>시험장 시간 절약:</strong><br>
1. 행렬이 대각/삼각인지 먼저 확인 → 그러면 즉시 답<br>
2. $2 \\times 2$면 Cayley-Hamilton이 가장 빠름 (보통 5분 내)<br>
3. 마지막에 $t = 0$으로 검증 — 1점이라도 더 챙김`, "tip")}
`);
