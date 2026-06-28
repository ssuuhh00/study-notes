registerPage("ch4-realization", "State-Space Realization", () => `
<h1>Ch 4 — State-Space Realization</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #3, 2015 #4(a), 과제 4.9·4.11·4.14. 전달함수 → 상태공간 변환.</p>

${profMemo(`<strong>공식 대입 문제.</strong> 전달함수 계수 → controllable canonical form으로 바로 옮기는 패턴이라 손계산이 거의 필요 없음. <em>외우다시피</em> 하면 2~3분 내로 풀고 배점 받음. MIMO는 시험에 나와도 $1\\times 2$ 수준.`)}

<h2>1. 무엇을 하는 건가?</h2>
${defCard("Realization 문제", `
주어진 전달함수 $\\hat{g}(s)$ 또는 행렬 $\\hat{G}(s)$에 대해, 다음을 만족하는 $(A, B, C, D)$ 찾기 → ${term("state-space")}:
$$\\dot{\\mathbf{x}} = A\\mathbf{x} + B\\mathbf{u}, \\quad \\mathbf{y} = C\\mathbf{x} + D\\mathbf{u}$$
$$\\hat{G}(s) = C(sI - A)^{-1} B + D$$
자세한 관계는 ${term("transfer-function")} 참고.
`)}

${note(`<strong>핵심:</strong> ${term("transfer-function", "전달함수")}는 입출력만 보는 외부 모델, ${term("state-space", "상태공간")}은 내부 상태까지 보는 모델. 둘이 동치인 변환을 찾는 게 realization.`)}

${concept("실생활 비유 — 블랙박스 vs 엔진 내부", `
<strong>전달함수 $\\hat{g}(s)$</strong>: 액셀 누르면 속도 변화. 입출력 관계만.<br>
<strong>상태공간 $(A, B, C, D)$</strong>: 액셀 → 연료분사 → 연소 → 토크 → 바퀴회전 → 속도. 내부 상태까지 모두 추적.<br><br>
같은 자동차지만 두 가지 표현. 외부에서만 보면 같은 시스템이라도 내부 구조는 여러 가지 가능 → <strong>realization은 유일하지 않다!</strong> (${term("similarity", "닮음변환")}으로 연결된 모든 형식이 같은 $\\hat{g}(s)$를 준다.)
`)}

${concept("왜 '실현(realization)'이라 부르나?", `
전달함수는 추상적인 식. 상태공간 $(A, B, C, D)$는 그 식을 <em>물리적으로 실현</em>한 회로/시스템.<br><br>
- Controllable canonical: "입력 쪽에서 보기 좋게" (${term("companion", "companion form")} 형태)<br>
- Observable canonical: "출력 쪽에서 보기 좋게"<br>
- Modal form: "각 mode가 분리되게" — 사실상 ${term("diagonalization", "대각화")}된 realization<br>
같은 시스템의 다른 "각도".
`)}

${prereq("Laplace 변환 복습", `
시간 영역 $f(t) \\to$ 복소 영역 $F(s) = \\int_0^\\infty f(t) e^{-st} dt$.<br>
미분 → 대수식: $\\mathcal{L}\\{\\dot f\\} = sF(s) - f(0)$.<br>
상태방정식에 Laplace 적용 → $s\\mathbf{X}(s) - \\mathbf{x}(0) = A\\mathbf{X}(s) + B\\mathbf{U}(s)$ → 정리하면<br>
$\\mathbf{Y}(s) = [C(sI-A)^{-1}B + D]\\,\\mathbf{U}(s)$ (초기조건 0 가정).<br>
대괄호 안이 곧 ${term("transfer-function", "전달함수")}.
`)}

<h2>2. SISO Controllable Canonical Form (가장 자주 출제)</h2>
${defCard("Strictly proper SISO", `
$$\\hat{g}(s) = \\frac{b_{n-1} s^{n-1} + \\cdots + b_1 s + b_0}{s^n + a_{n-1} s^{n-1} + \\cdots + a_1 s + a_0}$$
의 controllable canonical form:
$$A = \\begin{bmatrix} 0 & 1 & 0 & \\cdots & 0 \\\\ 0 & 0 & 1 & \\cdots & 0 \\\\ \\vdots & & & \\ddots & \\vdots \\\\ 0 & 0 & 0 & \\cdots & 1 \\\\ -a_0 & -a_1 & -a_2 & \\cdots & -a_{n-1} \\end{bmatrix}, \\quad B = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\\\ 1 \\end{bmatrix}$$
$$C = \\begin{bmatrix} b_0 & b_1 & \\cdots & b_{n-1} \\end{bmatrix}, \\quad D = 0$$
`)}

${note(`<strong>외우는 법:</strong> $A$는 분모 계수를 <em>마지막 행에 부호 바꿔</em>, 위쪽은 단위행렬 시프트. $B$는 마지막만 1. $C$는 분자 계수. 이 패턴이 ${term("companion", "companion 행렬")}.`, "tip")}

<h2>3. 워크스루 — 족보 2015 #4(a)</h2>

${walkthrough("$G(s) = \\frac{1}{s^2 + 3s + 2}$ realization", [
  {
    title: "분모/분자 계수 추출",
    body: `분모: $s^2 + 3s + 2$ → $a_0 = 2, a_1 = 3$<br>
    분자: $1$ → $b_0 = 1, b_1 = 0$`
  },
  {
    title: "공식 대입",
    body: `$$A = \\begin{bmatrix} 0 & 1 \\\\ -2 & -3 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$$
    $$C = \\begin{bmatrix} 1 & 0 \\end{bmatrix}, \\quad D = 0$$`
  },
  {
    title: "검증",
    body: `$C(sI - A)^{-1} B$를 계산해 $G(s)$ 나오는지:<br>
    $sI - A = \\begin{bmatrix} s & -1 \\\\ 2 & s+3 \\end{bmatrix}$, $\\det = s(s+3) + 2 = s^2 + 3s + 2$ ✓<br>
    $(sI - A)^{-1} = \\frac{1}{s^2+3s+2}\\begin{bmatrix} s+3 & 1 \\\\ -2 & s \\end{bmatrix}$<br>
    $(sI-A)^{-1}B = \\frac{1}{s^2+3s+2}\\begin{bmatrix} 1 \\\\ s \\end{bmatrix}$<br>
    $C(sI-A)^{-1}B = \\frac{1}{s^2+3s+2} \\cdot 1 = G(s)$ ✓`
  }
])}

<h2>4. 워크스루 #2 — 족보 2013 #3 (벡터 출력)</h2>

${walkthrough("$\\hat{G}(s) = \\begin{bmatrix} \\frac{1}{s+1} \\\\ \\frac{1}{(s+1)(s+2)} \\end{bmatrix}$ realization", [
  {
    title: "공통분모로 정리",
    body: `2-출력 1-입력. 공통분모 $(s+1)(s+2) = s^2 + 3s + 2$:<br>
    $$\\hat{G}(s) = \\frac{1}{s^2 + 3s + 2} \\begin{bmatrix} s+2 \\\\ 1 \\end{bmatrix}$$
    분자 행렬 $N(s) = \\begin{bmatrix} s + 2 \\\\ 1 \\end{bmatrix}$.`
  },
  {
    title: "분모 동일 → controllable form 채택",
    body: `$d(s) = s^2 + 3s + 2$, $a_0 = 2, a_1 = 3$, $n = 2$.<br>
    $$A = \\begin{bmatrix} 0 & 1 \\\\ -2 & -3 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$$`
  },
  {
    title: "$C$ 행렬 세우기",
    body: `각 출력의 분자 → $C$의 행:<br>
    1번째 분자 $s + 2$: $b_0 = 2, b_1 = 1$ → $[2, 1]$<br>
    2번째 분자 $1$: $b_0 = 1, b_1 = 0$ → $[1, 0]$<br>
    $$C = \\begin{bmatrix} 2 & 1 \\\\ 1 & 0 \\end{bmatrix}, \\quad D = \\begin{bmatrix}0\\\\0\\end{bmatrix}$$`
  },
  {
    title: "검증",
    body: `$C(sI-A)^{-1}B = \\frac{1}{s^2+3s+2} \\begin{bmatrix} 2 & 1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ s \\end{bmatrix} = \\frac{1}{s^2+3s+2}\\begin{bmatrix} 2 + s \\\\ 1 \\end{bmatrix}$ ✓`
  }
])}

<h2>5. Proper (not strictly) 처리</h2>

${note(`<strong>주의:</strong> 분자 차수 = 분모 차수 (proper but not strictly proper) → $D \\neq 0$.<br>
분자를 분모로 나눠서 $\\hat{g}(s) = D + \\frac{\\text{strictly proper}}{\\text{denom}}$로 분리. $D = \\lim_{s \\to \\infty} \\hat{g}(s)$.`, "warn")}

<h2>6. MIMO — Observable Canonical (참고)</h2>

${defCard("Observable Canonical Form", `
MIMO에서는 controllable form 대신 observable canonical form 자주 사용:
$$A = \\begin{bmatrix} -\\alpha_1 I_q & I_q & 0 & \\cdots & 0 \\\\ -\\alpha_2 I_q & 0 & I_q & \\cdots & 0 \\\\ \\vdots & & & \\ddots & \\vdots \\\\ -\\alpha_r I_q & 0 & 0 & \\cdots & 0 \\end{bmatrix}, \\quad B = \\begin{bmatrix} N_1 \\\\ N_2 \\\\ \\vdots \\\\ N_r \\end{bmatrix}, \\quad C = [I_q, 0, \\ldots, 0]$$
$N_i$는 분자행렬을 분모로 펼친 계수 행렬.
`)}

${note(`시험에 MIMO가 나오면 $1\\times 2$ 또는 $2 \\times 1$ 수준. 위의 #2 워크스루 패턴으로 충분.`)}

<h2>7. 체크</h2>

${mcQuiz(
  "$G(s) = \\frac{s+1}{s^2 + 4s + 3}$의 controllable canonical form의 $A$는?",
  ["$\\begin{bmatrix}0&1\\\\-3&-4\\end{bmatrix}$", "$\\begin{bmatrix}0&1\\\\-4&-3\\end{bmatrix}$", "$\\begin{bmatrix}-3&-4\\\\1&0\\end{bmatrix}$"],
  0,
  "$a_0 = 3, a_1 = 4$. 마지막 행 $[-a_0, -a_1] = [-3, -4]$."
)}

${mcQuiz(
  "위 문제에서 $C$는?",
  ["$[1, 0]$", "$[1, 1]$", "$[0, 1]$", "$[3, 4]$"],
  1,
  "분자 $s+1$: $b_0 = 1, b_1 = 1$ → $C = [1, 1]$."
)}
`);
