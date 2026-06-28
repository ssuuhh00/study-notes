registerPage("hw3", "HW3 — Ch3 선형대수 ②", () => `
<h1>📝 HW3 — Ch3 선형대수 (Problems 3.33, 3.34)</h1>
<p class="lead">Positive (semi-)definite, Singular Value Decomposition. Lyapunov stability와 직결.</p>

${hwProblem({
  num: "3.33",
  topic: "Positive Definite / Semidefinite 판정",
  image: "HW3_Ch3_Prob_3.33.png",
  problemText: "다음 행렬들이 positive definite 인지 또는 semidefinite 인지 확인하라:<br>$\\begin{bmatrix}2&3&2\\\\3&1&0\\\\2&0&2\\end{bmatrix}, \\quad \\begin{bmatrix}0&0&-1\\\\0&0&0\\\\-1&0&2\\end{bmatrix}, \\quad \\begin{bmatrix}a_1a_1&a_1a_2&a_1a_3\\\\a_2a_1&a_2a_2&a_2a_3\\\\a_3a_1&a_3a_2&a_3a_3\\end{bmatrix}$",
  answer: `
<p><strong>판정 도구 (대칭행렬에 한해):</strong></p>
<ul>
  <li><strong>방법 A (Sylvester):</strong> 모든 leading principal minor (좌상부분 행렬식) > 0 ⇔ positive definite. ≥ 0 ⇔ semidefinite. (단 semi의 경우 모든 minor 검사 필요)</li>
  <li><strong>방법 B (Eigenvalue):</strong> 모든 $\\lambda_i > 0$ ⇔ pd. 모든 $\\lambda_i \\ge 0$ ⇔ psd.</li>
  <li><strong>주의:</strong> 행렬이 대칭이 아니면 먼저 대칭화: $A_s = (A + A^T)/2$ 의 부호로 판정 ($\\mathbf{x}^T A \\mathbf{x} = \\mathbf{x}^T A_s \\mathbf{x}$).</li>
</ul>

<p><strong>행렬 1: $A_1 = \\begin{bmatrix} 2 & 3 & 2 \\\\ 3 & 1 & 0 \\\\ 2 & 0 & 2 \\end{bmatrix}$</strong></p>
<p>대칭. Leading principal minors:</p>
<ul>
  <li>$\\det[2] = 2 > 0$ ✓</li>
  <li>$\\det\\begin{bmatrix}2&3\\\\3&1\\end{bmatrix} = 2 - 9 = -7 < 0$ ✗</li>
</ul>
<p>두 번째에서 음수 → <strong>Indefinite</strong> (positive도 negative도 아님).</p>

<p><strong>행렬 2: $A_2 = \\begin{bmatrix} 0 & 0 & -1 \\\\ 0 & 0 & 0 \\\\ -1 & 0 & 2 \\end{bmatrix}$</strong></p>
<p>대칭. Eigenvalue 계산:</p>
<p>$\\det(\\lambda I - A_2) = \\det\\begin{bmatrix} \\lambda & 0 & 1 \\\\ 0 & \\lambda & 0 \\\\ 1 & 0 & \\lambda - 2 \\end{bmatrix}$<br>
2행/2열 expansion: $= \\lambda \\cdot \\det\\begin{bmatrix}\\lambda & 1 \\\\ 1 & \\lambda - 2\\end{bmatrix} = \\lambda(\\lambda^2 - 2\\lambda - 1)$<br>
근: $\\lambda = 0$, $\\lambda = 1 \\pm \\sqrt 2$.<br>
$1 - \\sqrt 2 \\approx -0.41 < 0$ 존재.</p>
<p>→ <strong>Indefinite</strong> (음수 eigenvalue 존재).</p>

<p><strong>행렬 3: $A_3 = \\begin{bmatrix} a_1 a_1 & a_1 a_2 & a_1 a_3 \\\\ a_2 a_1 & a_2 a_2 & a_2 a_3 \\\\ a_3 a_1 & a_3 a_2 & a_3 a_3 \\end{bmatrix} = \\mathbf{a}\\mathbf{a}^T$</strong></p>
<p>이게 outer product! 대칭. 임의의 $\\mathbf{x}$에 대해:</p>
<p>$\\mathbf{x}^T A_3 \\mathbf{x} = \\mathbf{x}^T \\mathbf{a}\\mathbf{a}^T \\mathbf{x} = (\\mathbf{a}^T \\mathbf{x})^2 \\ge 0$ ✓</p>
<p>같음 ($=0$) 은 $\\mathbf{a}^T \\mathbf{x} = 0$ 일 때 — 즉 $\\mathbf{x} \\perp \\mathbf{a}$ 인 모든 비영 벡터에서. <strong>Positive semidefinite</strong> (rank 1, eigenvalue: $\\|\\mathbf{a}\\|^2$ 하나, 나머지 0).</p>
`,
  variant: "Positive definite는 Lyapunov stability(과제 5.18-5.19)와 직결. 시험에 \"$M = A^T M + MA = -N$ 의 해 $M$이 pd인지 확인\" 같이 쓰임. 또한 quadratic form $\\mathbf{x}^T A \\mathbf{x}$의 최대/최소화 문제로 변형 가능."
})}

${hwProblem({
  num: "3.34",
  topic: "Singular Value Decomposition (SVD)",
  image: "HW3_Ch3_Prob_3.34.png",
  problemText: "다음 행렬들의 singular value 들을 계산하라: <br>$\\begin{bmatrix}-1&0&1\\\\2&-1&0\\end{bmatrix}, \\quad \\begin{bmatrix}-1&2\\\\2&4\\end{bmatrix}$",
  answer: `
<p><strong>Singular value 정의:</strong> $A^T A$ (또는 $AA^T$)의 eigenvalue의 양의 제곱근. $\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$.</p>

<p><strong>행렬 1: $A = \\begin{bmatrix} -1 & 0 & 1 \\\\ 2 & -1 & 0 \\end{bmatrix}$ ($2 \\times 3$)</strong></p>
<p>$A A^T$ ($2 \\times 2$가 더 작아서 편함):</p>
<p>$A A^T = \\begin{bmatrix}-1 & 0 & 1 \\\\ 2 & -1 & 0\\end{bmatrix}\\begin{bmatrix}-1 & 2 \\\\ 0 & -1 \\\\ 1 & 0\\end{bmatrix} = \\begin{bmatrix} 1+0+1 & -2+0+0 \\\\ -2+0+0 & 4+1+0 \\end{bmatrix} = \\begin{bmatrix}2 & -2 \\\\ -2 & 5\\end{bmatrix}$</p>
<p>Eigenvalue: $\\det(\\lambda I - AA^T) = (\\lambda - 2)(\\lambda - 5) - 4 = \\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6)$.<br>
$\\lambda = 1, 6$.</p>
<p>$$\\sigma_1 = \\sqrt 6, \\quad \\sigma_2 = 1$$</p>

<p><strong>행렬 2: $A = \\begin{bmatrix} -1 & 2 \\\\ 2 & 4 \\end{bmatrix}$ ($2 \\times 2$ — 대칭이 아님)</strong></p>
<p>$A^T A = \\begin{bmatrix}-1 & 2 \\\\ 2 & 4\\end{bmatrix}\\begin{bmatrix}-1 & 2 \\\\ 2 & 4\\end{bmatrix} = \\begin{bmatrix} 1+4 & -2+8 \\\\ -2+8 & 4+16 \\end{bmatrix} = \\begin{bmatrix}5 & 6 \\\\ 6 & 20\\end{bmatrix}$</p>
<p>Eigenvalue: $(\\lambda-5)(\\lambda-20) - 36 = \\lambda^2 - 25\\lambda + 100 - 36 = \\lambda^2 - 25\\lambda + 64$.<br>
$\\lambda = \\frac{25 \\pm \\sqrt{625 - 256}}{2} = \\frac{25 \\pm \\sqrt{369}}{2}$<br>
$\\sqrt{369} \\approx 19.21$. → $\\lambda_1 \\approx 22.10$, $\\lambda_2 \\approx 2.90$.</p>
<p>$$\\sigma_1 \\approx 4.70, \\quad \\sigma_2 \\approx 1.70$$</p>
<p>(또는 정확히: $\\sigma_{1,2} = \\sqrt{(25 \\pm \\sqrt{369})/2}$)</p>

<p><strong>SVD의 직관:</strong> $A = U \\Sigma V^T$ — 직교 행렬 $V$로 입력 회전 → $\\Sigma$로 축별 늘림 → $U$로 출력 회전. 어떤 행렬이든 \"회전 → 늘림 → 회전\"으로 분해 가능.</p>

<p><strong>왜 중요?</strong></p>
<ul>
  <li>$\\sigma_{\\max}$ = $\\|A\\|_2$ (operator norm)</li>
  <li>비정칙 행렬도 \"의사역행렬\" 정의 가능 ($\\sigma_i$로 나누기)</li>
  <li>Robust control의 H∞ norm = max singular value of frequency response</li>
</ul>
`,
  variant: "Singular value는 컨트롤이론 후반(robust control)에서 더 중요. 중간고사 범위 내에선 \"$AA^T$의 eigenvalue 구하기\" 식으로 위장해서 출제될 수 있음."
})}

${note(`<strong>HW3 핵심 정리:</strong> 3.33의 outer product $\\mathbf{a}\\mathbf{a}^T$ 가 PSD인 사실은 통계(공분산 행렬), 머신러닝(커널), Lyapunov 등 어디서나 등장. 외워둘 가치 있음.`, "tip")}
`);
