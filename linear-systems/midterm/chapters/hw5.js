registerPage("hw5", "HW5 — Ch5 Stability", () => `
<h1>📝 HW5 — Ch5 Stability (Problems 5.4, 5.7, 5.10, 5.13, 5.18, 5.19)</h1>
<p class="lead">BIBO, marginal/asymptotic, Lyapunov 방정식 — Ch5 통합 과제.</p>

${hwProblem({
  num: "5.4",
  topic: "BIBO Stability — Time delay 포함",
  image: "HW_Ch5a_Prob_5.4.png",
  problemText: "Transfer function $\\hat g(s) = e^{-2s}/(s+1)$ 인 시스템은 BIBO stable 한가?",
  answer: `
<p><strong>문제:</strong> $\\hat g(s) = e^{-2s}/(s+1)$ 는 BIBO stable?</p>
<p><strong>분석:</strong> $e^{-2s}$ 는 시간 지연 (2초). Impulse response는:</p>
<p>$h(t) = \\mathcal{L}^{-1}\\{e^{-2s}/(s+1)\\} = e^{-(t-2)} u_s(t-2)$</p>
<p>(2초 지연된 지수 감쇠.)</p>
<p><strong>BIBO 판정 (방법 1: 절대적분):</strong></p>
<p>$\\int_0^\\infty |h(t)| dt = \\int_2^\\infty e^{-(t-2)} dt$</p>
<p>치환 $\\tau = t - 2$:</p>
<p>$= \\int_0^\\infty e^{-\\tau} d\\tau = 1 < \\infty$ ✓</p>
<p><strong>BIBO 판정 (방법 2: pole):</strong></p>
<p>전달함수의 pole: $s + 1 = 0 \\Rightarrow s = -1$ (LHP). $e^{-2s}$는 entire function (pole 없음).</p>
<p>모든 pole LHP → <strong>BIBO stable</strong>.</p>
<p><strong>참고:</strong> 시간지연 $e^{-Ts}$는 시스템 안정성에 영향을 안 줌 (그 자체로는). 하지만 폐루프(feedback)에 들어가면 phase margin을 줄여 불안정 유발 가능.</p>
`,
  variant: "$\\hat g(s) = e^{-Ts}/p(s)$ 형태로 $T$만 바뀌어 출제 가능. 답은 항상 \"$p(s)$의 pole 위치만 보면 됨\"."
})}

${hwProblem({
  num: "5.7",
  topic: "BIBO ≠ Internal stability — Pole-zero cancellation",
  image: "HW_Ch5a_Prob_5.7.png",
  problemText: "다음 시스템을 고려하라. (BIBO stability 와 internal stability 를 각각 판정)<br>$\\dot{\\mathbf{x}} = \\begin{bmatrix}-1&10\\\\0&1\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}-2\\\\0\\end{bmatrix}u, \\quad y = [-2, 3]\\mathbf{x} - 2u$",
  answer: `
<p><strong>주어진 시스템:</strong> $\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 10 \\\\ 0 & 1\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}-2\\\\0\\end{bmatrix}u$, $y = [-2, 3]\\mathbf{x} - 2u$.</p>
<p><strong>1단계: Internal stability (eigenvalue)</strong></p>
<p>삼각행렬 → eigenvalue = 대각: $\\lambda_1 = -1, \\lambda_2 = 1$.</p>
<p>$\\lambda_2 = 1 > 0$ → <strong>Internally unstable</strong> (asymptotically stable이 아님).</p>
<p><strong>2단계: Transfer function 계산 → BIBO 판정</strong></p>
<p>$sI - A = \\begin{bmatrix}s+1 & -10 \\\\ 0 & s-1\\end{bmatrix}$, $\\det = (s+1)(s-1)$</p>
<p>$(sI - A)^{-1} = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}s-1 & 10 \\\\ 0 & s+1\\end{bmatrix}$</p>
<p>$(sI-A)^{-1} B = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}s-1 & 10 \\\\ 0 & s+1\\end{bmatrix}\\begin{bmatrix}-2\\\\0\\end{bmatrix} = \\frac{1}{(s+1)(s-1)}\\begin{bmatrix}-2(s-1) \\\\ 0\\end{bmatrix} = \\begin{bmatrix}-2/(s+1) \\\\ 0\\end{bmatrix}$</p>
<p>$C(sI-A)^{-1}B = [-2, 3]\\begin{bmatrix}-2/(s+1) \\\\ 0\\end{bmatrix} = \\frac{4}{s+1}$</p>
<p>$\\hat g(s) = \\frac{4}{s+1} - 2 = \\frac{4 - 2(s+1)}{s+1} = \\frac{-2s+2}{s+1} = \\frac{-2(s-1)}{s+1}$</p>
<p><strong>핵심:</strong> $s = 1$ 의 unstable mode가 transfer function에 안 보임 (영점-극점 상쇄!)</p>
<p>Pole: $s = -1$ (LHP) → <strong>BIBO stable</strong>.</p>
<p><strong>결론:</strong> Internally unstable 이지만 BIBO stable. 외부 입출력으로는 안정해 보이지만, 내부에 발산하는 mode가 있음 (uncontrollable 또는 unobservable mode).</p>
`,
  variant: "<strong>매우 자주 출제!</strong> \"이 시스템이 BIBO stable한가? Internally stable한가? 둘이 다른 이유는?\" 형태로. 단답형 시험 요약: <em>BIBO ⇔ transfer function pole 위치, internal ⇔ A의 eigenvalue 위치</em>."
})}

${hwProblem({
  num: "5.10",
  topic: "Continuous-time Marginal vs Asymptotic Stability",
  image: "HW_Ch5a_Prob_5.10.png",
  problemText: "다음 homogeneous 상태방정식이 marginally stable 인가? Asymptotically stable 인가?<br>$\\dot{\\mathbf{x}} = \\begin{bmatrix}-1&0&1\\\\0&0&0\\\\0&0&0\\end{bmatrix}\\mathbf{x}$",
  answer: `
<p><strong>주어진:</strong> $\\dot{\\mathbf{x}} = \\begin{bmatrix}-1 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0\\end{bmatrix}\\mathbf{x}$ — Marginally stable? Asymptotically stable?</p>
<p><strong>1단계: Eigenvalue</strong></p>
<p>$\\det(\\lambda I - A) = \\det\\begin{bmatrix}\\lambda + 1 & 0 & -1 \\\\ 0 & \\lambda & 0 \\\\ 0 & 0 & \\lambda\\end{bmatrix}$ — 상삼각.</p>
<p>대각곱: $(\\lambda+1) \\cdot \\lambda \\cdot \\lambda = \\lambda^2(\\lambda+1)$.</p>
<p>Eigenvalues: $\\lambda = -1, 0, 0$. ($\\lambda = 0$이 algebraic mult. 2)</p>
<p><strong>2단계: Asymptotic stability?</strong></p>
<p>$\\lambda = 0$ → $\\text{Re}(0) = 0$ ≮ 0. <strong>Asymptotically stable 아님</strong>.</p>
<p><strong>3단계: Marginal stability — $\\lambda = 0$의 simple 여부 판정</strong></p>
<p>Algebraic mult. 2이므로, geometric mult.가 2인지 확인:</p>
<p>$\\dim N(A - 0 \\cdot I) = \\dim N(A) = n - \\text{rank}(A)$.</p>
<p>$\\text{rank}(A)$: 1행 $[-1, 0, 1]$ — 비영. 2행, 3행 모두 0. → rank = 1.</p>
<p>nullity = $3 - 1 = 2$ = algebraic mult.</p>
<p>$\\lambda = 0$ 의 모든 Jordan block 크기 1 → <strong>simple</strong>.</p>
<p><strong>결론:</strong> 모든 $\\lambda$가 $\\text{Re}(\\lambda) \\le 0$, 그리고 $\\lambda = 0$이 simple → <strong>Marginally stable, but not asymptotically stable</strong>.</p>
<p><strong>물리적 의미:</strong> $\\lambda = -1$ 모드는 감쇠하지만, $\\lambda = 0$ 모드는 그대로 유지 (드리프트 없이) → 상태가 발산도 0 수렴도 아닌 상수로 머묾.</p>
`,
  variant: "Eigenvalue 0이나 허수축 위 eigenvalue가 있을 때 marginal vs asymptotic 판정. <strong>핵심 함정:</strong> 중복근일 때 Jordan block 크기 확인 필수."
})}

${hwProblem({
  num: "5.13",
  topic: "Discrete-time Stability",
  image: "HW_Ch5a_Prob_5.13.png",
  problemText: "다음 discrete-time homogeneous 상태방정식이 marginally stable 인가? Asymptotically stable 인가?<br>$\\mathbf{x}[k+1] = \\begin{bmatrix}0.9&0&1\\\\0&1&1\\\\0&0&1\\end{bmatrix}\\mathbf{x}[k]$",
  answer: `
<p><strong>주어진:</strong> $\\mathbf{x}[k+1] = \\begin{bmatrix}0.9 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1\\end{bmatrix}\\mathbf{x}[k]$ — Marginally stable? Asymptotically stable?</p>
<p><strong>Discrete-time 기준: $|\\lambda| < 1$ → asymptotic, $|\\lambda| \\le 1$ + $|\\lambda|=1$ simple → marginal.</strong></p>
<p><strong>1단계: Eigenvalue</strong></p>
<p>상삼각 → 대각원소: $\\lambda = 0.9, 1, 1$. ($\\lambda = 1$이 mult. 2)</p>
<p><strong>2단계: Asymptotic?</strong></p>
<p>$|1| = 1$ ≮ 1 → <strong>asymptotic 아님</strong>.</p>
<p><strong>3단계: $\\lambda = 1$의 simple 여부</strong></p>
<p>$A - I = \\begin{bmatrix}-0.1 & 0 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0\\end{bmatrix}$</p>
<p>$\\text{rank}(A - I)$: 1행 비영 ($[-0.1, 0, 1]$), 2행 비영 ($[0, 0, 1]$), 3행 0. <br>
1행과 2행이 독립인지: 1열에서 첫행만 비영 → 독립. 즉 rank = 2.</p>
<p>$\\dim N(A-I) = 3 - 2 = 1$. Algebraic mult.가 2인데 geometric mult.가 1 → <strong>$\\lambda = 1$이 simple이 아님!</strong></p>
<p><strong>결론:</strong> $\\lambda = 1$이 unit circle 위에 있는데 non-simple → <strong>Unstable</strong> (marginal도 아님).</p>
<p><strong>왜 unstable?</strong> Non-simple unit-circle eigenvalue는 $A^k$ 에서 $k \\cdot \\lambda^k$ 같은 항이 생겨 → $k$ 곱해진 만큼 발산.</p>
`,
  variant: "Continuous (5.10) ↔ Discrete (5.13) 대응 시험에 자주 나옴. \"같은 eigenvalue 패턴인데 LHP/unit circle 기준 차이\" 짚는 문제."
})}

${note(`<strong>5.4 ~ 5.13 핵심 정리:</strong><br>
- 5.7은 \"BIBO ≠ Internal\" 단골 예시<br>
- 5.10/5.13은 \"중복 eigenvalue + simple 판정\" → 시험엔 algebraic vs geometric multiplicity 묻는 형태<br>
- Continuous는 LHP, discrete는 unit circle — 매번 헷갈리니 외워둘 것.`, "tip")}

<hr style="margin: 40px 0; border: none; border-top: 2px dashed var(--border);">

<h2>📐 Lyapunov Equation 일반화 (Problems 5.18, 5.19)</h2>
<p class="lead">표준 Lyapunov 정리의 일반화 — 증명형 문제. 증명 절차 외워두면 핵심 통찰 얻음.</p>

${note(`<strong>먼저 표준 Lyapunov 정리 복습:</strong><br>
[Continuous] $A^T M + MA = -N$ ($N > 0$)이 unique pd $M$을 가짐 ⇔ $A$의 모든 eigenvalue가 LHP ($\\text{Re}(\\lambda) < 0$).<br>
[Discrete] $M - A^T M A = N$ ($N > 0$)이 unique pd $M$을 가짐 ⇔ $A$의 모든 eigenvalue $|\\lambda| < 1$.`, "info")}

${hwProblem({
  num: "5.18",
  topic: "Lyapunov for $\\text{Re}(\\lambda) < -\\mu$ (일반화된 Hurwitz)",
  image: "HW_Ch5b_Prob_5.18.png",
  problemText: "$\\mathbf{A}$ 의 모든 eigenvalue 의 실수부가 $-\\mu < 0$ 보다 작다는 것이, 임의의 주어진 positive definite symmetric matrix $\\mathbf{N}$ 에 대해 다음 방정식이 unique symmetric solution $\\mathbf{M}$ 을 가지며 그 $\\mathbf{M}$ 이 positive definite 임과 동치임을 보여라:<br>$$\\mathbf{A}'\\mathbf{M} + \\mathbf{M}\\mathbf{A} + 2\\mu \\mathbf{M} = -\\mathbf{N}$$",
  answer: `
<p><strong>주장:</strong> $A$의 모든 eigenvalue가 $\\text{Re}(\\lambda) < -\\mu < 0$ ⇔ 임의의 pd 대칭 $N$에 대해 $A'M + MA + 2\\mu M = -N$이 unique pd 대칭 $M$을 가짐.</p>
<p><strong>증명 전략:</strong> 변수치환으로 표준 Lyapunov 정리에 환원.</p>

<p><strong>Step 1: 새 행렬 $\\tilde A$ 정의</strong></p>
<p>$\\tilde A := A + \\mu I$ 로 놓자.</p>
<p>$\\tilde A$의 eigenvalue = $\\lambda(A) + \\mu$ (행렬 덧셈으로 eigenvalue도 더해짐, $I$와 $A$가 commute하니까).</p>

<p><strong>Step 2: $A'M + MA + 2\\mu M$ 을 $\\tilde A$ 로 표현</strong></p>
<p>$\\tilde A' M + M \\tilde A = (A' + \\mu I) M + M (A + \\mu I)$<br>
$= A'M + \\mu M + MA + \\mu M$<br>
$= A'M + MA + 2\\mu M$</p>
<p>그러므로 주어진 방정식은:</p>
<p>$$\\tilde A' M + M \\tilde A = -N$$</p>
<p>이는 표준 (continuous) Lyapunov 방정식 (단 $A$ 자리에 $\\tilde A$).</p>

<p><strong>Step 3: 표준 정리 적용</strong></p>
<p>표준 정리: $\\tilde A' M + M \\tilde A = -N$ 이 unique pd $M$ 을 가짐 ⇔ $\\tilde A$ 의 모든 eigenvalue가 LHP.</p>
<p>$\\tilde A$의 eigenvalue = $\\lambda(A) + \\mu$. 이게 LHP에 있다는 것은:</p>
<p>$\\text{Re}(\\lambda + \\mu) < 0 \\Leftrightarrow \\text{Re}(\\lambda) < -\\mu$</p>
<p>$\\therefore$ 동치 성립. ∎</p>

<p><strong>해석:</strong> $\\mu$ 만큼 \"안정도 마진\"을 요구하는 정리. Robust control에서 \"$\\alpha$-shifted Lyapunov\" 라 부름.</p>
`,
  variant: "변수치환으로 표준 정리에 환원하는 패턴은 시험에 다양한 형태로 출제 — 예: 실수만 다른 행렬 $A + cI$, $A^k$, $cA$ 등의 stability."
})}

${hwProblem({
  num: "5.19",
  topic: "Discrete Lyapunov for $|\\lambda| < \\rho$",
  image: "HW_Ch5b_Prob_5.19.png",
  problemText: "$\\mathbf{A}$ 의 모든 eigenvalue 의 크기가 $\\rho$ 보다 작다는 것이, 임의의 주어진 positive definite symmetric matrix $\\mathbf{N}$ 에 대해 다음 방정식이 unique symmetric solution $\\mathbf{M}$ 을 가지며 그 $\\mathbf{M}$ 이 positive definite 임과 동치임을 보여라:<br>$$\\rho^2 \\mathbf{M} - \\mathbf{A}'\\mathbf{M}\\mathbf{A} = \\rho^2 \\mathbf{N}$$",
  answer: `
<p><strong>주장:</strong> $A$의 모든 eigenvalue $|\\lambda| < \\rho$ ⇔ 임의의 pd 대칭 $N$에 대해 $\\rho^2 M - A'MA = \\rho^2 N$이 unique pd 대칭 $M$을 가짐.</p>
<p><strong>증명 전략:</strong> 양변을 $\\rho^2$로 나눠 $\\tilde A = A/\\rho$ 로 치환 → 표준 discrete Lyapunov.</p>

<p><strong>Step 1: 양변 $\\rho^2$ 로 나누기</strong></p>
<p>$M - \\frac{1}{\\rho^2} A' M A = N$<br>
$M - \\left(\\frac{A}{\\rho}\\right)' M \\left(\\frac{A}{\\rho}\\right) = N$</p>
<p>$\\tilde A := A/\\rho$ 로 놓으면:</p>
<p>$$M - \\tilde A' M \\tilde A = N$$</p>
<p>표준 discrete Lyapunov 방정식.</p>

<p><strong>Step 2: 표준 정리 적용</strong></p>
<p>표준 정리: $M - \\tilde A' M \\tilde A = N$ 이 unique pd $M$ ⇔ $\\tilde A$ 의 모든 eigenvalue $|\\tilde\\lambda| < 1$.</p>
<p>$\\tilde A = A/\\rho$ 의 eigenvalue = $\\lambda(A)/\\rho$. 그러므로:</p>
<p>$|\\tilde \\lambda| = |\\lambda|/\\rho < 1 \\Leftrightarrow |\\lambda| < \\rho$</p>
<p>$\\therefore$ 동치 성립. ∎</p>

<p><strong>해석:</strong> Discrete-time 안정 영역(unit circle)을 반지름 $\\rho$ circle로 일반화. $\\rho < 1$ 이면 \"빠르게 감쇠\", $\\rho = 1$ 이면 표준 stability.</p>
`,
  variant: "Discrete 일반화. 같은 변수치환 트릭으로 \"$|\\lambda| < r$\" 형태의 다른 영역 안정성 정리도 만들 수 있음."
})}

${note(`<strong>5.18, 5.19 핵심:</strong><br>
- 두 문제 모두 \"표준 Lyapunov + 변수치환\" 패턴.<br>
- 시험에 직접 증명 출제 가능성보단, <strong>Lyapunov 방정식 자체의 의미와 응용</strong>을 묻는 단답형이 더 자주 나옴.<br>
- 핵심 fact: \"<em>안정도 ⇔ 적절한 Lyapunov 방정식의 pd 해 존재</em>\"는 한 줄로 외워둘 것.`, "tip")}

<h2>전체 과제 요약 — 시험 직전 체크리스트</h2>

<table>
  <tr><th>HW</th><th>핵심 스킬</th><th>시험 직결도</th></tr>
  <tr><td>HW1 / Ch2</td><td>Convolution (그래픽)</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>HW1 / Ch2</td><td>ODE → Transfer function (Pole-zero 상쇄)</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>HW2 / Ch3</td><td>$A\\mathbf{x}=\\mathbf{b}$ 일반해 (rank/nullity)</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>HW2 / Ch3</td><td>Companion matrix → eigenvalue/vector</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>HW2 / Ch3</td><td>Characteristic vs Minimal polynomial</td><td>${tag("개념", "concept")}</td></tr>
  <tr><td>HW3 / Ch3</td><td>Positive (semi-)definite 판정</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>HW3 / Ch3</td><td>Singular value</td><td>${tag("개념", "concept")}</td></tr>
  <tr><td>HW4 / Ch4</td><td>Realization (controllable/observable canonical form)</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>HW4 / Ch4</td><td>Equivalence vs zero-state equivalence</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>HW5 / Ch5</td><td>BIBO stability (transfer function pole)</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>HW5 / Ch5</td><td>BIBO ≠ Internal (Pole-zero cancellation)</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>HW5 / Ch5</td><td>Marginal vs Asymptotic (continuous & discrete)</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>HW5 / Ch5</td><td>Lyapunov 방정식 (정리 진술 + 응용)</td><td>${tag("개념", "concept")}</td></tr>
</table>
`);
