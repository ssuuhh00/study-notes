registerPage("ch4-solution", "상태방정식 풀이", () => `
<h1>Ch 4 — 상태방정식의 해 (State Equation Solution)</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #2, 2015 #4(b)(d). 풀이 공식 + 정상상태(steady-state) 응답.</p>

${profMemo(`<strong>두 파트 패턴.</strong> ① $e^{At}$ 이용해서 $x(t), y(t)$ 풀이 (Ch3 Cayley-Hamilton과 직결) ② Sinusoidal 입력에 대한 steady-state (주파수응답). 두 개 다 공식 기반이라 숫자 대입 위주.`)}

<h2>1. 일반해 공식</h2>
${defCard("LTI 상태방정식의 해", `
$\\dot{\\mathbf{x}} = A\\mathbf{x} + B\\mathbf{u}$, $\\mathbf{x}(0) = \\mathbf{x}_0$의 해:
$$\\boxed{\\mathbf{x}(t) = e^{At} \\mathbf{x}_0 + \\int_0^t e^{A(t-\\tau)} B \\mathbf{u}(\\tau) d\\tau}$$
출력: $\\mathbf{y}(t) = C\\mathbf{x}(t) + D\\mathbf{u}(t)$. $e^{At}$는 ${term("matrix-exp")} 참고.
`)}

${note(`<strong>두 부분:</strong><br>
• Zero-input response $e^{At}\\mathbf{x}_0$: 초기조건만에 의한 응답<br>
• Zero-state response $\\int_0^t e^{A(t-\\tau)} B \\mathbf{u}(\\tau) d\\tau$: 입력만에 의한 응답<br>
LTI의 ${term("convolution", "합성곱")} 구조 — Ch2와 직결.`)}

${concept("실생활 비유 — 그네 타기", `
<strong>Zero-input:</strong> 미리 앉혀놓고 손 뗐을 때 → 마찰로 멈춤. 초기조건만 결정.<br>
<strong>Zero-state:</strong> 정지한 그네를 계속 밀어줌 → 입력 $u(t)$에만 의한 응답.<br>
<strong>실제:</strong> 둘이 합쳐져 그네 움직임.<br><br>
이게 linearity의 의미: 입력과 초기조건 효과가 깔끔히 분리돼 더해짐. 비선형 시스템은 이게 안 됨.
`)}

${concept("적분의 의미 — 입력의 누적 효과 = 합성곱", `
$\\int_0^t e^{A(t-\\tau)} B \\mathbf{u}(\\tau) d\\tau$를 풀어보면:<br><br>
$\\tau$ 시점의 입력 $\\mathbf{u}(\\tau)$가 $B$로 시스템에 들어와 → $t-\\tau$ 시간 동안 $e^{A(t-\\tau)}$만큼 진화 → 현재($t$) 영향.<br><br>
모든 과거 시점의 영향을 합한 게 적분. <strong>${term("convolution", "합성곱")} 구조 그 자체.</strong> 출력 $y = C\\mathbf{x} + D\\mathbf{u}$를 풀면 정확히 $y = (g * u)$ 형태 — 그래서 Ch2 합성곱이 Ch4와 직결됨.
`)}

<h2>2. 워크스루 — 족보 2013 #2 (통합)</h2>

${walkthrough("$\\dot{\\mathbf{x}} = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}0\\\\1\\end{bmatrix}u$, $y = [0, 1]\\mathbf{x}$, $\\mathbf{x}(0)=[1,0]^T$, $u(t)=1$", [
  {
    title: "$e^{At}$ 가져오기",
    body: `${term("cayley-hamilton", "Cayley-Hamilton")} 페이지에서 이미 구함:<br>
    $$e^{At} = \\begin{bmatrix}2e^{-t} - e^{-2t} & -2e^{-t} + 2e^{-2t} \\\\ e^{-t} - e^{-2t} & -e^{-t} + 2e^{-2t}\\end{bmatrix}$$`
  },
  {
    title: "Zero-input 부분",
    body: `$e^{At}\\mathbf{x}_0 = e^{At}\\begin{bmatrix}1\\\\0\\end{bmatrix} = \\begin{bmatrix}2e^{-t} - e^{-2t} \\\\ e^{-t} - e^{-2t}\\end{bmatrix}$`
  },
  {
    title: "Zero-state 부분",
    body: `$u = 1$이라 $B u = \\begin{bmatrix}0\\\\1\\end{bmatrix}$.<br>
    $e^{A(t-\\tau)} B$ = $e^{At}$의 둘째 열에 $\\tau$ 시프트:
    $\\begin{bmatrix} -2e^{-(t-\\tau)} + 2e^{-2(t-\\tau)} \\\\ -e^{-(t-\\tau)} + 2e^{-2(t-\\tau)} \\end{bmatrix}$<br><br>
    $y = [0, 1]\\mathbf{x}$이라 둘째 성분만 필요:<br>
    $\\int_0^t (-e^{-(t-\\tau)} + 2e^{-2(t-\\tau)}) d\\tau$<br>
    $\\int_0^t e^{-(t-\\tau)} d\\tau = 1 - e^{-t}$<br>
    $\\int_0^t 2 e^{-2(t-\\tau)} d\\tau = 1 - e^{-2t}$<br>
    합: $-(1 - e^{-t}) + (1 - e^{-2t}) = e^{-t} - e^{-2t}$`
  },
  {
    title: "총 $y(t)$",
    body: `$y(t) = $ (zero-input 둘째성분) + (zero-state 둘째성분)<br>
    $= (e^{-t} - e^{-2t}) + (e^{-t} - e^{-2t})$<br>
    $$\\boxed{y(t) = 2e^{-t} - 2e^{-2t}}$$<br>
    검증: $y(0) = 0$ ✓ ($\\mathbf{x}(0)=[1,0]^T$이고 $y = x_2 = 0$)`
  }
])}

<h2>3. Steady-state Response (정상상태 응답)</h2>

${defCard("Steady-state란?", `
$t \\to \\infty$에서 시스템 응답. <strong>안정한 시스템</strong>에 한해 의미 있음 (불안정하면 발산). 조건은 ${term("internal-stability")} 참고.
`)}

<h3>유형 1: Step 입력 steady-state</h3>
${note(`안정한 LTI에 $u(t) = 1$ (step):
$$y_{ss} = \\hat{g}(0) = -CA^{-1}B + D$$
Final value theorem으로 $\\hat g(s)$의 $s = 0$ 값.`, "tip")}

<h3>유형 2: Sinusoidal 입력 — 족보 2015 #4(d)</h3>

${defCard("주파수 응답", `
안정한 LTI에 $u(t) = \\sin(\\omega t)$:
$$y_{ss}(t) = |\\hat{g}(j\\omega)| \\sin(\\omega t + \\angle \\hat{g}(j\\omega))$$
같은 주파수의 사인파인데 크기는 $|\\hat g(j\\omega)|$ 배, 위상은 $\\angle \\hat g(j\\omega)$만큼 이동.
`)}

${prereq("복소수 크기·각도 복습", `
복소수 $z = a + bj$에서
<ul>
  <li>크기: $|z| = \\sqrt{a^2 + b^2}$</li>
  <li>각도: $\\angle z = \\arctan(b/a)$ (사분면 주의!)</li>
</ul>
분수 $\\frac{1}{a+bj}$의 크기·각도 구할 때는 켤레곱 $\\frac{a-bj}{a^2+b^2}$로 정리.
`)}

${walkthrough("족보 2015 #4(d): $G(s) = \\frac{1}{s^2+3s+2}$에 $u(t) = \\sin(2t)$", [
  {
    title: "$\\omega = 2$ 대입",
    body: `$G(j2) = \\frac{1}{(j2)^2 + 3(j2) + 2} = \\frac{1}{-4 + 6j + 2} = \\frac{1}{-2 + 6j}$`
  },
  {
    title: "분모 정리 (켤레곱)",
    body: `$\\frac{1}{-2 + 6j} \\cdot \\frac{-2 - 6j}{-2 - 6j} = \\frac{-2 - 6j}{4 + 36} = \\frac{-2 - 6j}{40} = -\\frac{1}{20} - \\frac{3}{20}j$`
  },
  {
    title: "Magnitude & phase",
    body: `$|G(j2)| = \\sqrt{(-1/20)^2 + (-3/20)^2} = \\frac{1}{20}\\sqrt{10} = \\frac{1}{2\\sqrt{10}}$<br>
    $\\angle G(j2)$: 분자/분모 모두 음 → 3사분면 → $\\arctan(3) - \\pi \\approx -108.4°$`
  },
  {
    title: "최종",
    body: `$$\\boxed{y_{ss}(t) = \\frac{1}{2\\sqrt{10}} \\sin(2t - 108.4°)}$$<br>
    족보 2013 #4도 같은 형식: $G(s)$를 $j\\omega$로 평가해서 magnitude/phase 구하면 끝.`
  }
])}

<h2>4. 주의 — 안정성 먼저</h2>
${note(`Steady-state 응답은 시스템이 <em>안정</em>할 때만 의미 있음. 불안정하면 천천히/빠르게 발산. → 다음 챕터 ${term("bibo", "BIBO")}에서 확인법 다룸.`, "warn")}

<h2>5. 체크</h2>

${mcQuiz(
  "안정한 시스템 $G(s)$에 unit step 입력 시 steady-state 출력은?",
  ["$G(\\infty)$", "$G(0)$", "$\\lim_{s\\to 0} sG(s)$", "$G$의 pole의 합"],
  1,
  "Final value theorem: $\\lim_{t \\to \\infty} y(t) = \\lim_{s \\to 0} s \\cdot \\frac{1}{s} G(s) = G(0)$. step 입력 Laplace가 $1/s$."
)}

${mcQuiz(
  "$\\dot{\\mathbf{x}} = A\\mathbf{x}$ ($\\mathbf{u} = 0$)의 해는?",
  ["$\\mathbf{x}(t) = A\\mathbf{x}_0 t$", "$\\mathbf{x}(t) = e^{At}\\mathbf{x}_0$", "$\\mathbf{x}(t) = \\mathbf{x}_0 e^{At}$", "$\\mathbf{x}(t) = (sI-A)^{-1}\\mathbf{x}_0$"],
  1,
  "표준 zero-input 응답. 행렬 곱 순서 주의 — 벡터가 오른쪽."
)}
`);
