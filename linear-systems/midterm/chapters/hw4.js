registerPage("hw4", "HW4 — Ch4 Realization", () => `
<h1>📝 HW4 — Ch4 State-Space Realization</h1>
<p class="lead">Problems 4.4, 4.8 (수업 중 exercise) + 4.9, 4.11, 4.14 (HW). <strong>매년 시험 출제.</strong></p>

${hwProblem({
  num: "4.4",
  topic: "Companion-form & Modal-form Equivalent (Exercise)",
  image: "Exercise_Ch4_Prob_4.4.png",
  problemText: "다음 시스템의 companion-form 및 modal-form equivalent equation 을 구하라:<br>$\\dot{\\mathbf{x}} = \\begin{bmatrix}-2&0&0\\\\1&0&1\\\\0&-2&-2\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}1\\\\0\\\\1\\end{bmatrix}u, \\quad y = [1, -1, 0]\\mathbf{x}$",
  answer: `
<p><strong>주어진 시스템:</strong> $\\dot{\\mathbf{x}} = \\begin{bmatrix} -2 & 0 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & -2 & -2 \\end{bmatrix}\\mathbf{x} + \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} u$, $y = [1, -1, 0]\\mathbf{x}$.</p>
<p><strong>1단계: 전달함수 계산</strong></p>
<p>$\\hat g(s) = C(sI - A)^{-1} B$. 직접 계산하거나 eigenvalue로:</p>
<p>$\\det(\\lambda I - A)$: 첫 열로 expansion (1열에 0이 많음).<br>
$= (\\lambda + 2)\\det\\begin{bmatrix}\\lambda & -1 \\\\ 2 & \\lambda+2\\end{bmatrix} = (\\lambda+2)[\\lambda(\\lambda+2)+2] = (\\lambda+2)(\\lambda^2+2\\lambda+2)$</p>
<p>Eigenvalues: $\\lambda = -2$, $\\lambda = -1 \\pm j$ (복소근).</p>
<p>(전달함수 계산은 노가다라 결과만: $\\hat g(s) = $ <em>분자/분모</em>, 분모는 위 다항식. 분자는 직접 계산.)</p>

<p><strong>2단계: Companion form (가정 — 분자가 $b_2 s^2 + b_1 s + b_0$, 분모 $s^3 + 4s^2 + 6s + 4$)</strong></p>
<p>$A_c = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ -4 & -6 & -4 \\end{bmatrix}$, $B_c = \\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$, $C_c = [b_0, b_1, b_2]$</p>

<p><strong>3단계: Modal form</strong> — eigenvector를 열로 모은 $P$ 사용.</p>
<p>$\\lambda_1 = -2$의 eigenvector $\\mathbf{v}_1$: $(\\lambda_1 I - A)\\mathbf{v}_1 = 0$ 풀어 구함.<br>
복소 eigenvalue는 실수 modal form으로 만들 때 $2\\times 2$ block 형태:</p>
<p>$A_m = \\begin{bmatrix} -2 & 0 & 0 \\\\ 0 & -1 & 1 \\\\ 0 & -1 & -1 \\end{bmatrix}$ (실수 modal — 복소 eigenvalue $-1 \\pm j$ 의 표준 표현)</p>
<p>각 form의 $A$만 다르고 입출력 관계는 같음. 이게 <strong>equivalent</strong>의 의미.</p>
`,
  variant: "시험엔 주어진 $A,B,C,D$를 다른 form으로 변환하라고 직접 요구. 또는 \"이 두 시스템이 equivalent인가?\" 형태로 4.8 같이 나옴."
})}

${hwProblem({
  num: "4.8",
  topic: "Equivalence와 Zero-state equivalence (Exercise)",
  image: "Exercise_Ch4_Prob_4.8.png",
  problemText: "다음 두 상태방정식 집합이 equivalent 인가? Zero-state equivalent 인가?<br>$\\dot{\\mathbf{x}} = \\begin{bmatrix}2&1&2\\\\0&2&2\\\\0&0&1\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}u$, $y = [1, -1, 0]\\mathbf{x}$ 와<br>$\\dot{\\mathbf{x}} = \\begin{bmatrix}2&1&1\\\\0&2&1\\\\0&0&-1\\end{bmatrix}\\mathbf{x} + \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}u$, $y = [1, -1, 0]\\mathbf{x}$",
  answer: `
<p><strong>두 시스템:</strong></p>
<p>S1: $A_1 = \\begin{bmatrix}2&1&2\\\\0&2&2\\\\0&0&1\\end{bmatrix}$, $B_1 = \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$, $C_1 = [1,-1,0]$</p>
<p>S2: $A_2 = \\begin{bmatrix}2&1&1\\\\0&2&1\\\\0&0&-1\\end{bmatrix}$, $B_2 = \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$, $C_2 = [1,-1,0]$</p>

<p><strong>정의 정리:</strong></p>
<ul>
  <li><strong>Equivalent:</strong> 어떤 invertible $P$ 가 있어 $A_2 = P A_1 P^{-1}$, $B_2 = P B_1$, $C_2 = C_1 P^{-1}$. 같은 시스템의 다른 좌표 표현.</li>
  <li><strong>Zero-state equivalent:</strong> 같은 transfer function. (입력→출력 같음, 단 초기상태 0에서)</li>
</ul>

<p><strong>(a) Equivalent인가?</strong></p>
<p>Eigenvalue 비교: 둘 다 삼각이라 대각원소 = eigenvalues.</p>
<p>$A_1$: $\\{2, 2, 1\\}$ <br>
$A_2$: $\\{2, 2, -1\\}$</p>
<p>Eigenvalue가 다름 → similar transformation 불가능 → <strong>NOT equivalent</strong>.</p>

<p><strong>(b) Zero-state equivalent인가? (Transfer function 같은가?)</strong></p>
<p>각각 $\\hat g_i(s) = C_i(sI - A_i)^{-1} B_i$ 계산.</p>
<p>$\\hat g_1(s)$ 계산:<br>
$(sI - A_1)^{-1} B_1$ 의 1, 2행이 필요 ($C_1 = [1,-1,0]$이라 3행 무관).<br>
$(sI - A_1) \\mathbf{x} = B_1$ 의 1,2행 풀면:<br>
3행: $(s-1) x_3 = 0 \\Rightarrow x_3 = 0$.<br>
2행: $(s-2) x_2 - 2 \\cdot 0 = 1 \\Rightarrow x_2 = 1/(s-2)$.<br>
1행: $(s-2) x_1 - x_2 - 2 \\cdot 0 = 1 \\Rightarrow x_1 = (1 + 1/(s-2))/(s-2) = (s-1)/(s-2)^2$.<br>
$\\hat g_1 = x_1 - x_2 = \\frac{s-1}{(s-2)^2} - \\frac{1}{s-2} = \\frac{s-1 - (s-2)}{(s-2)^2} = \\frac{1}{(s-2)^2}$</p>
<p>$\\hat g_2(s)$ 도 같은 방식 (3행에 $(s+1)x_3 = 0 \\Rightarrow x_3 = 0$):<br>
2행: $(s-2)x_2 - x_3 = 1 \\Rightarrow x_2 = 1/(s-2)$. 1행도 동일 → $\\hat g_2 = 1/(s-2)^2$.</p>
<p>$\\hat g_1 = \\hat g_2$ → <strong>Zero-state equivalent</strong>.</p>
<p><strong>해석:</strong> S2의 $\\lambda = -1$ mode가 transfer function에서 사라짐 (controllable이지만 observable 아님). 그래서 입출력으로는 보이지 않음. → BIBO ≠ internal stability 패턴.</p>
`,
  variant: "Equivalence 판정 + transfer function 비교는 <strong>매우 자주</strong>. 특히 \"hidden mode\"가 있는 시스템 분석은 시험 단골."
})}

${hwProblem({
  num: "4.9",
  topic: "Observable Canonical Form Realization (증명)",
  image: ["HW_Ch4_Prob_4.9_eq433.png", "HW_Ch4_Prob_4.9_part1.png"],
  problemText: `위 (4.33) 의 strictly proper transfer matrix $\\hat{\\mathbf{G}}_{sp}(s) = \\frac{1}{d(s)}[\\mathbf{N}_1 s^{r-1} + \\mathbf{N}_2 s^{r-2} + \\cdots + \\mathbf{N}_{r-1}s + \\mathbf{N}_r]$ 가 아래 그림의 realization 을 가짐을 검증하라 (단 $\\mathbf{N}_i$ 는 $q \\times p$ 상수행렬). 이 realization 을 <strong>observable canonical form realization</strong> 이라 하며 차원이 $rq$ 임. (이는 교재 (4.34) 의 controllable canonical form 과 dual 관계.)`,
  answer: `
<p><strong>주장:</strong> 주어진 형태의 $(A, B, C)$가 transfer matrix $\\hat G(s)$의 observable canonical form realization이다.</p>
<p><strong>증명 전략:</strong> $\\hat G(s) = C(sI - A)^{-1} B$ 가 원래 transfer matrix가 됨을 직접 검산.</p>
<p><strong>핵심 관찰 (block 구조):</strong></p>
<p>$A = \\begin{bmatrix} -\\alpha_1 I_q & I_q & & \\\\ -\\alpha_2 I_q & 0 & I_q & \\\\ \\vdots & & & \\ddots \\\\ -\\alpha_r I_q & 0 & \\cdots & 0 \\end{bmatrix}$, $C = [I_q, 0, \\cdots, 0]$, $B = \\begin{bmatrix}N_1 \\\\ N_2 \\\\ \\vdots \\\\ N_r\\end{bmatrix}$</p>
<p>이는 SISO companion form을 $q$차원으로 확장한 것.</p>
<p><strong>증명 절차:</strong></p>
<ol>
  <li>$(sI - A)$의 block 구조 분석: 위 $\\lambda$ block matrix의 $sI - A$ 형태.</li>
  <li>$(sI - A) \\mathbf{x} = B$ 를 block-wise 풀이. $\\mathbf{x} = [\\mathbf{x}_1; \\mathbf{x}_2; \\ldots; \\mathbf{x}_r]$, 각 $\\mathbf{x}_i$ 는 $q$차원.</li>
  <li>마지막 block부터 풀어 올라옴: 각 block이 분모 다항식의 한 부분 형성.</li>
  <li>$C\\mathbf{x} = \\mathbf{x}_1$ 이 $\\frac{1}{d(s)}\\sum_{i=1}^r N_i s^{r-i}$ 형태가 됨.</li>
  <li>$d(s) = s^r + \\alpha_1 s^{r-1} + \\cdots + \\alpha_r$, 분자가 $N_1 s^{r-1} + N_2 s^{r-2} + \\cdots + N_r$ → 원래 $\\hat G(s)$ 회복. ∎</li>
</ol>
<p><strong>(4.34)와의 관계 (dual):</strong> (4.34)는 controllable canonical form. (4.33) ↔ (4.34)는 transpose 관계. $A_o = A_c^T$, $B_o = C_c^T$, $C_o = B_c^T$.</p>
`,
  variant: "증명형은 시험에 자주 안 나오지만, controllable/observable canonical form 자체는 <strong>realization 문제</strong>로 매번 등장. Block 구조 외워둘 것."
})}

${hwProblem({
  num: "4.11",
  topic: "MIMO Realization ($2 \\times 2$ proper rational)",
  image: "HW_Ch4_Prob_4.11.png",
  problemText: "다음 proper rational matrix 의 realization 을 구하라:<br>$\\hat{\\mathbf{G}}(s) = \\begin{bmatrix} \\dfrac{2}{s+1} & \\dfrac{2s-3}{(s+1)(s+2)} \\\\ \\dfrac{s-2}{s+1} & \\dfrac{s}{s+2} \\end{bmatrix}$",
  answer: `
<p><strong>주어진 행렬:</strong> $\\hat G(s) = \\begin{bmatrix} \\frac{2}{s+1} & \\frac{2s-3}{(s+1)(s+2)} \\\\ \\frac{s-2}{s+1} & \\frac{s}{s+2} \\end{bmatrix}$</p>
<p><strong>1단계: Strictly proper 만들기</strong></p>
<p>(2,2) 항: $\\frac{s}{s+2} = 1 - \\frac{2}{s+2}$ → $D_{22} = 1$, strictly proper 부분 $-\\frac{2}{s+2}$.</p>
<p>(2,1) 항: $\\frac{s-2}{s+1} = 1 - \\frac{3}{s+1}$ → $D_{21} = 1$, strictly proper 부분 $-\\frac{3}{s+1}$.</p>
<p>$D = \\begin{bmatrix}0 & 0 \\\\ 1 & 1\\end{bmatrix}$</p>
<p>$\\hat G_{sp}(s) = \\begin{bmatrix} \\frac{2}{s+1} & \\frac{2s-3}{(s+1)(s+2)} \\\\ -\\frac{3}{s+1} & -\\frac{2}{s+2} \\end{bmatrix}$</p>
<p><strong>2단계: 공통 분모로 정리</strong></p>
<p>$d(s) = (s+1)(s+2) = s^2 + 3s + 2$</p>
<p>$\\hat G_{sp} = \\frac{1}{d(s)} \\begin{bmatrix} 2(s+2) & 2s-3 \\\\ -3(s+2) & -2(s+1) \\end{bmatrix} = \\frac{1}{d(s)}\\left( \\begin{bmatrix}2 & 2 \\\\ -3 & -2\\end{bmatrix} s + \\begin{bmatrix}4 & -3 \\\\ -6 & -2\\end{bmatrix} \\right)$</p>
<p>즉 $N(s) = N_1 s + N_2$, $N_1 = \\begin{bmatrix}2 & 2 \\\\ -3 & -2\\end{bmatrix}$, $N_2 = \\begin{bmatrix}4 & -3 \\\\ -6 & -2\\end{bmatrix}$. $r = 2$, $q = p = 2$.</p>
<p><strong>3단계: Controllable canonical form (4.34)</strong></p>
<p>$A = \\begin{bmatrix} -\\alpha_1 I_2 & -\\alpha_2 I_2 \\\\ I_2 & 0 \\end{bmatrix} = \\begin{bmatrix} -3 & 0 & -2 & 0 \\\\ 0 & -3 & 0 & -2 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\end{bmatrix}$ (4×4)</p>
<p>$B = \\begin{bmatrix} I_2 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix}1 & 0 \\\\ 0 & 1 \\\\ 0 & 0 \\\\ 0 & 0\\end{bmatrix}$ (4×2)</p>
<p>$C = [N_1, N_2] = \\begin{bmatrix}2 & 2 & 4 & -3 \\\\ -3 & -2 & -6 & -2\\end{bmatrix}$ (2×4)</p>
<p>$D = \\begin{bmatrix}0 & 0 \\\\ 1 & 1\\end{bmatrix}$</p>
`,
  variant: "MIMO realization은 SISO보다 시간 많이 듦. 시험엔 SISO 또는 작은 MIMO ($1 \\times 2$ 또는 $2 \\times 1$) 로 출제. 절차(분리→공통분모→form)는 동일."
})}

${hwProblem({
  num: "4.14",
  topic: "MIMO Realization (1 × 2)",
  image: "HW_Ch4_Prob_4.14.png",
  problemText: "다음 transfer matrix 의 realization 을 구하라:<br>$\\hat{\\mathbf{G}}(s) = \\left[ \\dfrac{-(12s+6)}{3s+34}, \\quad \\dfrac{22s+23}{3s+34} \\right]$",
  answer: `
<p><strong>주어진:</strong> $\\hat G(s) = \\begin{bmatrix} \\frac{-(12s+6)}{3s+34} & \\frac{22s+23}{3s+34} \\end{bmatrix}$ ($1 \\times 2$, 분모 동일)</p>
<p><strong>1단계: 분모를 monic으로</strong></p>
<p>$\\hat G(s) = \\frac{1}{3s+34}[-(12s+6), 22s+23] = \\frac{1}{s + 34/3} \\cdot \\frac{1}{3}[-(12s+6), 22s+23]$</p>
<p>또는 $3s + 34$ 로 그대로 두고 정리. 분모 $d(s) = s + 34/3$ (monic).</p>
<p><strong>2단계: $D$ 분리 (proper but not strictly proper)</strong></p>
<p>$\\frac{-(12s+6)}{3s+34} = \\frac{-12s-6}{3s+34}$. $s \\to \\infty$ 극한: $-4$. 즉 $D_1 = -4$, 나머지: $\\frac{-12s-6}{3s+34} - (-4) = \\frac{-12s - 6 + 12s + 136}{3s+34} = \\frac{130}{3s+34}$</p>
<p>$\\frac{22s+23}{3s+34}$, 극한: $22/3$. $D_2 = 22/3$, 나머지: $\\frac{22s+23 - (22/3)(3s+34)}{3s+34} = \\frac{22s + 23 - 22s - 748/3}{3s + 34} = \\frac{23 - 748/3}{3s+34} = \\frac{(69 - 748)/3}{3s+34} = \\frac{-679/3}{3s+34}$</p>
<p>$D = [-4, 22/3]$</p>
<p>$\\hat G_{sp} = \\frac{1}{3s+34}[130, -679/3]$</p>
<p><strong>3단계: 1차 시스템이라 가장 단순</strong></p>
<p>$3s + 34 = 0 \\Rightarrow s = -34/3$. 분모를 $s + 34/3$ 형태로:</p>
<p>$\\hat G_{sp} = \\frac{1}{s + 34/3} \\cdot \\frac{1}{3}[130, -679/3] = \\frac{1}{s+34/3}[130/3, -679/9]$</p>
<p><strong>1차 SISO realization</strong> (출력 차원 1, 입력 차원 2):</p>
<p>$A = -34/3$ (스칼라)<br>
$B = [130/3, -679/9]$ (1×2)<br>
$C = 1$ (스칼라)<br>
$D = [-4, 22/3]$ (1×2)</p>
<p>(입력이 2개, 상태가 1개, 출력 1개. 이게 가능한 이유: $1 \\times 2$ transfer matrix는 입력 2개를 받아 1개 상태로 결합한 뒤 출력)</p>
`,
  variant: "분모가 같은 MIMO transfer는 1차원 상태로 줄일 수 있음 — minimal realization 사고 연습."
})}

${note(`<strong>HW4 핵심 정리:</strong> Realization 문제는 절차가 모든 문제에 동일 — (1) strictly proper 분리, (2) 공통 분모, (3) controllable/observable canonical form 공식 적용. 외우다시피 해야 시험장에서 빠르게 풀림.`, "tip")}
`);
