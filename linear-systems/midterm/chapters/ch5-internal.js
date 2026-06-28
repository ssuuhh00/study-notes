registerPage("ch5-internal", "Internal Stability · Lyapunov", () => `
<h1>Ch 5 — Internal Stability & Lyapunov</h1>
<p class="lead">${tag("개념출제", "concept")} 과제 5.10·5.13·5.18·5.19. 정의 위주 또는 Lyapunov 방정식 문제.</p>

${profMemo(`<strong>정의 구분이 핵심.</strong> asymptotic vs marginal vs unstable을 eigenvalue 위치로 판정. 족보 2017에선 stabilizable/detectable도 물음 — 중간 범위에선 정의 정도만 알면 OK. Lyapunov는 "이런 방정식이 있구나" 수준으로 인식하고, 증명은 안 나오니 부담 X.`)}

<h2>1. 세 가지 stability</h2>
<table>
  <tr><th>종류</th><th>의미</th><th>조건 (LTI)</th></tr>
  <tr><td>Marginally stable<br>(Lyapunov sense)</td><td>해가 유계로 머무름</td><td>모든 $\\lambda$가 $\\text{Re}(\\lambda) \\le 0$이고, 허수축 위 $\\lambda$는 simple</td></tr>
  <tr><td>Asymptotically stable</td><td>$t \\to \\infty$에서 $\\mathbf{x} \\to 0$</td><td>모든 $\\lambda$가 $\\text{Re}(\\lambda) < 0$</td></tr>
  <tr><td>Unstable</td><td>하나 이상 발산</td><td>위 둘 다 아닌 경우</td></tr>
</table>

${note(`Asymptotic ⊂ Marginal. Asymptotic은 "강한 안정 (0으로 수렴)", marginal은 "약한 안정 (안 터지기만)".`)}

${concept("실생활 비유 — 그릇 · 평지 · 언덕", `
공을 놓았을 때:<br>
🥣 <strong>그릇 안</strong>: 마찰로 결국 바닥에 멈춤 → <strong>Asymptotically stable</strong><br>
🛹 <strong>평지</strong>: 어디든 가만히 있음. 굴러가도 멈추지 않지만 발산도 안 함 → <strong>Marginally stable</strong><br>
⛰️ <strong>언덕 꼭대기</strong>: 살짝만 건드려도 굴러내려감 → <strong>Unstable</strong><br><br>
Eigenvalue: LHP = 그릇, 허수축 = 평지, RHP = 언덕.
`)}

${concept("물리 예시 — 진자 vs 거꾸로 진자", `
<strong>일반 진자 (아래로):</strong> 마찰 없으면 영원히 진동 → marginal. 마찰 있으면 천천히 멈춤 → asymptotic.<br>
<strong>거꾸로 진자 (위로 세움):</strong> 살짝만 건드려도 떨어짐 → unstable.<br><br>
세그웨이·로켓·드론 — 본질 unstable 시스템에 제어기를 더해 stable로 만드는 것.
`)}

<h2>2. Discrete-time 버전</h2>
<table>
  <tr><th>종류</th><th>조건 (LTI discrete)</th></tr>
  <tr><td>Marginally stable</td><td>모든 $|\\lambda| \\le 1$, $|\\lambda| = 1$인 건 simple</td></tr>
  <tr><td>Asymptotically stable</td><td>모든 $|\\lambda| < 1$</td></tr>
</table>

<h2>3. 워크스루 — 과제 5.10</h2>

${walkthrough("$\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0\\end{bmatrix}\\mathbf{x}$의 안정도", [
  {
    title: "Eigenvalue 구하기",
    body: `$\\det(\\lambda I - A) = \\det\\begin{bmatrix}\\lambda+1 & 0 & -1 \\\\ 0 & \\lambda & 0 \\\\ 0 & 0 & \\lambda\\end{bmatrix}$<br>
    상삼각이라 대각곱: $(\\lambda+1) \\cdot \\lambda \\cdot \\lambda = \\lambda^2(\\lambda+1)$<br>
    $\\lambda = -1, 0, 0$`
  },
  {
    title: "$\\lambda = 0$의 중복도 분석",
    body: `Algebraic multiplicity = 2.<br>
    Asymptotic: $\\text{Re}(0) = 0$ → 아님.<br>
    Marginal: $\\lambda = 0$이 simple한지 — ${term("geom-mult", "geometric multiplicity")} 확인.<br>
    $\\dim N(A - 0 \\cdot I) = \\dim N(A) = n - \\rho(A)$.<br>
    rank$(A)$: 1행 $= [-1, 0, 1]$, 2·3행은 0 → rank 1 → nullity $= 3 - 1 = 2$.`
  },
  {
    title: "결론",
    body: `Geometric mult = algebraic mult = 2 → $\\lambda = 0$의 ${term("jordan", "Jordan block")}이 모두 1×1 → simple.<br>
    $\\Rightarrow$ <strong>marginally stable</strong>, not asymptotically.`
  }
])}

${note(`<strong>검증법:</strong> $\\lambda = 0$ 중복이고 geom < alg면 Jordan block 2×2 이상 → $tA$ 같은 항이 생겨서 $t \\to \\infty$에 발산. 이 경우 unstable.`, "warn")}

<h2>4. Lyapunov Equation (과제 5.18·5.19)</h2>

${defCard("Continuous Lyapunov", `
${term("lyapunov")}:
$$A^T M + M A = -N$$
$N \\succ 0$ (대칭 양정부호) 주면 ⇒ 유일한 대칭 양정부호 $M$ 존재 ⇔ <strong>$A$의 모든 eigenvalue가 LHP (asymptotically stable)</strong>.
`)}

${defCard("Discrete Lyapunov", `
$$M - A^T M A = N$$
유일한 $M \\succ 0$ 존재 ⇔ 모든 eigenvalue가 <strong>단위원 내부</strong>.
`)}

${note(`이 정리의 의의: eigenvalue 직접 계산 없이 행렬 방정식 풀이로 안정도 판정. 큰 시스템·비선형·robust 분석에서 핵심 도구.`, "tip")}

${prereq("양정부호(Positive Definite) 행렬", `
$M$이 대칭이고 모든 $x \\neq 0$에 대해 $x^T M x > 0$이면 ${term("positive-definite")}.<br>
동치 조건:
<ul>
  <li>모든 eigenvalue > 0</li>
  <li>모든 leading principal minor > 0 (Sylvester)</li>
  <li>$M = L L^T$ ($L$이 nonsingular)</li>
</ul>
$V(x) = x^T M x$를 "에너지 함수"로 해석할 때 항상 양수 보장.
`)}

${concept("Lyapunov의 직관 — 에너지 함수", `
$V(\\mathbf{x}) = \\mathbf{x}^T M \\mathbf{x}$를 시스템 "에너지"로 (양정부호 $M$이면 항상 ≥ 0).<br><br>
에너지 변화율:<br>
$\\dot V = \\dot{\\mathbf{x}}^T M \\mathbf{x} + \\mathbf{x}^T M \\dot{\\mathbf{x}} = \\mathbf{x}^T(A^T M + MA)\\mathbf{x}$<br><br>
$A^T M + MA = -N$ ($N \\succ 0$)이면 $\\dot V = -\\mathbf{x}^T N \\mathbf{x} < 0$ (0이 아닌 $\\mathbf{x}$에 대해).<br><br>
<strong>해석:</strong> 에너지가 항상 감소 → 상태가 0으로 수렴 → stable.<br>
<strong>비유:</strong> 마찰 있는 진자의 운동에너지+위치에너지 = $V$. 마찰로 에너지 계속 빠짐 → 결국 정지.
`)}

<h2>5. 과제 5.18 — 일반화된 Continuous Lyapunov</h2>
${defCard("$A$의 모든 $\\lambda$가 $\\text{Re}(\\lambda) < -\\mu$ ⇔", `
임의의 $N \\succ 0$ 대칭 행렬에 대해
$$A^T M + M A + 2\\mu M = -N$$
가 유일한 $M \\succ 0$ 해를 가짐.
`)}

${concept("증명 스케치", `
변수치환 $\\tilde A = A + \\mu I$. 그러면
$\\tilde A^T M + M \\tilde A = (A^T + \\mu I)M + M(A + \\mu I) = A^T M + MA + 2\\mu M$<br>
표준 Lyapunov가 $\\tilde A$에 대해 $\\tilde A^T M + M\\tilde A = -N$ 형태.<br>
$\\tilde A$의 eigenvalue $= \\lambda + \\mu$. $\\text{Re}(\\lambda + \\mu) < 0 \\Leftrightarrow \\text{Re}(\\lambda) < -\\mu$ ✓
`)}

<h2>6. 과제 5.19 — Discrete 일반화</h2>
${defCard("$A$의 모든 $\\lambda$가 $|\\lambda| < \\rho$ ⇔", `
임의의 $N \\succ 0$에 대해
$$\\rho^2 M - A^T M A = \\rho^2 N$$
가 유일한 $M \\succ 0$ 해.
`)}

${concept("증명 스케치", `
양변을 $\\rho^2$로 나누면 $M - (A/\\rho)^T M (A/\\rho) = N$.<br>
$\\tilde A = A/\\rho$의 표준 discrete Lyapunov. $\\tilde A$의 eigenvalue $= \\lambda/\\rho$.<br>
$|\\lambda/\\rho| < 1 \\Leftrightarrow |\\lambda| < \\rho$ ✓
`)}

<h2>7. Stabilizable & Detectable (참고, 주로 기말)</h2>
${defCard("Stabilizable", `
Unstable mode들이 모두 controllable. state feedback $u = Fx$로 unstable 부분을 안정화 가능.
`)}
${defCard("Detectable", `
Unstable mode들이 모두 observable. 출력 $y$로부터 unstable 상태 추정 가능.
`)}

<h2>8. 체크</h2>

${mcQuiz(
  "$A$가 eigenvalue $-1, -2, 0$을 갖고 $\\lambda = 0$이 simple이면?",
  ["Asymptotically stable", "Marginally stable but not asymptotically", "Unstable"],
  1,
  "$\\text{Re}(0) = 0$이라 asymptotic 아님. simple이라 marginal."
)}

${mcQuiz(
  "$A$의 eigenvalue가 $-1, j, -j$ (모두 simple)?",
  ["Asymptotically stable", "Marginally stable", "Unstable"],
  1,
  "$\\pm j$는 허수축 위 simple → marginal. Sinusoidal mode가 안 사라지니 asymptotic 아님."
)}

${mcQuiz(
  "Discrete-time $A$의 eigenvalue가 $0.5, 0.9, 1$ (1 simple)이면?",
  ["Asymptotically stable", "Marginally stable", "Unstable"],
  1,
  "$|1| = 1$이지만 simple → marginal. Asymptotic은 $|\\lambda| < 1$ 필요."
)}

${note(`<strong>중간 시험 범위 끝.</strong> 이제 모의고사 풀어보자!`, "tip")}
`);
