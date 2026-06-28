registerPage("ch5-bibo", "BIBO Stability", () => `
<h1>Ch 5 — BIBO Stability</h1>
<p class="lead">${tag("자주 출제", "exam")} 족보 2015 #4(c), 과제 5.4·5.7. 족보 2017 robust에서 변형 출제.</p>

${profMemo(`<strong>판정 문제.</strong> 전달함수 주고 "BIBO stable인가?" — pole이 좌반평면인지만 확인. 2×2 상태공간 주고 전달함수 구해 pole 보는 확장 문제도 있음. 증명은 안 나옴.`)}

<h2>1. 정의</h2>
${defCard("BIBO Stable (Bounded-Input Bounded-Output)", `
모든 <strong>유계</strong> 입력에 대해 출력도 <strong>유계</strong> → ${term("bibo")}.<br>
수식: $|u(t)| \\le M \\Rightarrow |y(t)| \\le N$인 $M, N$이 존재.
`)}

${concept("실생활 비유 — 마이크와 앰프의 하울링", `
마이크 → 앰프 → 스피커 → (소리가 다시 마이크로) → 앰프 → ... 폐루프.<br><br>
<strong>BIBO stable:</strong> 가수가 노래해도 (유계 입력) 스피커 소리도 유계. 정상.<br>
<strong>BIBO unstable:</strong> 작은 잡음만 들어가도 스피커 소리가 점점 커지며 "삐~~" 하울링 폭발.<br><br>
정확히 시스템 pole이 우반평면(RHP)으로 넘어갔을 때의 모습. 작은 입력이 무한히 커지는 발산.
`)}

${concept("실생활 비유 2 — 자전거 균형", `
핸들이 살짝 기울었을 때:<br>
- BIBO stable: 자동으로 다시 똑바로 → 잘 가는 자전거<br>
- BIBO unstable: 점점 더 기울어 넘어짐<br><br>
세그웨이·거꾸로 진자는 본래 unstable이라 제어기로 안정화. 이게 제어공학의 출발점.
`)}

<h2>2. 판별 조건</h2>
${defCard("연속시간 LTI가 BIBO stable ⇔ 다음 중 하나", `
<ol>
  <li>임펄스응답이 <strong>절대 적분 가능</strong>: $\\int_0^\\infty |h(t)| dt < \\infty$</li>
  <li>전달함수의 모든 pole이 <strong>좌반평면(LHP)</strong>: $\\text{Re}(p_i) < 0 \\;\\forall i$</li>
</ol>
${term("impulse-response")} · ${term("transfer-function")} 참고.
`)}

${note(`<strong>주의:</strong> "허수축 위 ($\\text{Re} = 0$)"는 BIBO unstable! 예: $\\hat{g}(s) = 1/s$의 극은 $0$ → step 입력 → 출력 ramp ($t$) → 발산.`, "warn")}

${prereq("복소평면과 pole 위치", `
복소평면에서 실수축 기준:
<ul>
  <li><strong>좌반평면 (LHP):</strong> $\\text{Re}(s) < 0$. $e^{st}$가 감쇠.</li>
  <li><strong>우반평면 (RHP):</strong> $\\text{Re}(s) > 0$. $e^{st}$가 발산.</li>
  <li><strong>허수축:</strong> $\\text{Re}(s) = 0$. $e^{st}$가 진동 (sinusoidal).</li>
</ul>
pole이 허수축 위면 유계 sinusoidal 입력이 <em>공진</em>을 일으켜 출력이 발산 가능 → BIBO 엄밀히는 stable 아님.
`)}

<h2>3. 워크스루 — 과제 5.4</h2>

${walkthrough("$\\hat{g}(s) = e^{-2s}/(s+1)$ — time delay 포함", [
  {
    title: "임펄스응답 분석",
    body: `$e^{-2s}$ = 2초 time delay. 임펄스응답은<br>
    $h(t) = e^{-(t-2)} u_s(t-2)$ — 2초 지연된 지수감쇠.`
  },
  {
    title: "BIBO 검사",
    body: `$\\int_0^\\infty |h(t)| dt = \\int_2^\\infty e^{-(t-2)} dt = 1 < \\infty$ ✓<br>
    또는: 분모의 pole은 $s = -1$ (LHP) ✓ ($e^{-2s}$는 transcendental이라 pole이 없음)<br>
    $\\Rightarrow$ <strong>BIBO stable</strong>`
  }
])}

<h2>4. 워크스루 #2 — 과제 5.7 (상태공간 → BIBO)</h2>

${walkthrough("$\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 10 \\\\ 0 & 1\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}-2\\\\0\\end{bmatrix}u$, $y = [-2, 3]\\mathbf{x} - 2u$", [
  {
    title: "Eigenvalue 확인",
    body: `삼각행렬 → 대각원소가 eigenvalue: $\\lambda_1 = -1, \\lambda_2 = 1$.<br>
    $\\lambda_2 = 1 > 0$ → ${term("internal-stability", "internal stability")} 이미 깨짐. BIBO는 어떨까?`
  },
  {
    title: "전달함수 계산",
    body: `$sI - A = \\begin{bmatrix}s+1 & -10 \\\\ 0 & s-1\\end{bmatrix}$, $\\det = (s+1)(s-1)$<br>
    $(sI-A)^{-1} = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}s-1 & 10 \\\\ 0 & s+1\\end{bmatrix}$<br>
    $(sI-A)^{-1}B = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}-2(s-1)\\\\0\\end{bmatrix} = \\begin{bmatrix}-2/(s+1)\\\\0\\end{bmatrix}$<br><br>
    $C(sI-A)^{-1}B = [-2, 3] \\cdot \\begin{bmatrix}-2/(s+1)\\\\0\\end{bmatrix} = \\frac{4}{s+1}$<br>
    $\\hat{g}(s) = \\frac{4}{s+1} - 2 = \\frac{-2(s-1)}{s+1}$`
  },
  {
    title: "Pole-zero 분석",
    body: `Pole: $s = -1$ (LHP) → <strong>BIBO stable!</strong><br><br>
    <strong>관찰:</strong> 시스템에 unstable mode ($\\lambda = 1$)가 있어도, 그게 입출력 전달함수에서 <em>pole-zero 상쇄</em>되면 BIBO stable. 하지만 ${term("internal-stability", "internal stability")}는 여전히 깨짐. → <strong>BIBO ≠ Internal</strong>.`
  }
])}

${note(`<strong>핵심 통찰:</strong> BIBO = "외부에서 본" 안정도. Internal = "내부 모든 상태"의 안정도. 후자가 더 강한 조건. 둘이 일치하려면 controllable & observable (= minimal realization) 이어야 함.`, "tip")}

<h2>5. Discrete-time</h2>
${defCard("Discrete BIBO stable", `
<ul>
  <li>$\\sum_{k=0}^\\infty |h[k]| < \\infty$</li>
  <li>또는 모든 pole이 <strong>단위원 내부</strong>: $|p_i| < 1$</li>
</ul>
`)}

<h2>6. 체크</h2>

${mcQuiz(
  "$\\hat{g}(s) = \\frac{1}{s^2 + 2s + 5}$는 BIBO stable?",
  ["Yes", "No", "추가 정보 필요"],
  0,
  "Pole: $s = \\frac{-2 \\pm \\sqrt{4 - 20}}{2} = -1 \\pm 2j$. 실수부 $-1 < 0$ → LHP → BIBO stable."
)}

${mcQuiz(
  "$\\hat{g}(s) = \\frac{s}{s^2 + 1}$는 BIBO stable?",
  ["Yes", "No (pole이 허수축 위)", "Yes, 분자에 0 있어서"],
  1,
  "Pole: $s = \\pm j$. 실수부 0 → 허수축 위 → BIBO unstable. ($\\sin$ 입력에 공진 가능)"
)}

${mcQuiz(
  "Discrete-time 시스템의 pole이 $z = 0.5, -1.2$라면?",
  ["Stable, 둘 다 단위원 안에 있어 보이니까", "Unstable, $|-1.2| > 1$"],
  1,
  "Discrete은 unit circle 기준. $|-1.2| = 1.2 > 1$ → unstable."
)}
`);
