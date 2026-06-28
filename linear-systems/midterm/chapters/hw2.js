registerPage("hw2", "HW2 — Ch3 선형대수 ①", () => `
<h1>📝 HW2 — Ch3 선형대수 (Problems 3.8, 3.14, 3.18)</h1>
<p class="lead">Linear equation 일반해, Companion matrix, Characteristic/Minimal polynomial. <strong>매년 시험에 직결.</strong></p>

${hwProblem({
  num: "3.8",
  topic: "Linear Equation 일반해 (족보 2015 #3과 동일!)",
  image: "HW2_Ch3_Prob_3.8.png",
  problemText: "다음 방정식의 일반해(general solution)를 구하라. 자유 파라미터(free parameters) 의 개수는 몇 개인가? <br>$\\begin{bmatrix}1&2&3&4\\\\0&-1&-2&2\\\\0&0&0&1\\end{bmatrix}\\mathbf{x} = \\begin{bmatrix}3\\\\2\\\\1\\end{bmatrix}$",
  answer: `
<p><strong>문제:</strong> $A\\mathbf{x} = \\mathbf{b}$, $A = \\begin{bmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & 2 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix} 3 \\\\ 2 \\\\ 1 \\end{bmatrix}$. 파라미터 개수?</p>
<p><strong>1단계: rank 확인.</strong> 이미 row echelon. 0이 아닌 행 3개 → $\\text{rank}(A) = 3$. 열 개수 $n=4$ → nullity = $4-3 = 1$. <strong>자유 파라미터 1개</strong>.</p>
<p><strong>2단계: Pivot/free variable 식별.</strong> Pivot은 1열, 2열, 4열. <strong>3열이 free</strong>.</p>
<p><strong>3단계: Particular solution $\\mathbf{x}_p$</strong> ($x_3 = 0$ 으로):</p>
<p>3행: $x_4 = 1$<br>
2행: $-x_2 + 2 \\cdot 1 = 2 \\Rightarrow x_2 = 0$<br>
1행: $x_1 + 0 + 0 + 4 = 3 \\Rightarrow x_1 = -1$</p>
<p>$$\\mathbf{x}_p = \\begin{bmatrix} -1 \\\\ 0 \\\\ 0 \\\\ 1 \\end{bmatrix}$$</p>
<p><strong>4단계: Homogeneous solution $\\mathbf{x}_h$</strong> ($A\\mathbf{x} = \\mathbf{0}$, $x_3 = t$):</p>
<p>3행: $x_4 = 0$<br>
2행: $-x_2 - 2t = 0 \\Rightarrow x_2 = -2t$<br>
1행: $x_1 - 4t + 3t = 0 \\Rightarrow x_1 = t$</p>
<p>$$\\mathbf{x}_h = t\\begin{bmatrix} 1 \\\\ -2 \\\\ 1 \\\\ 0 \\end{bmatrix}$$</p>
<p><strong>최종 일반해:</strong></p>
<p>$$\\boxed{\\mathbf{x} = \\begin{bmatrix} -1 \\\\ 0 \\\\ 0 \\\\ 1 \\end{bmatrix} + t\\begin{bmatrix} 1 \\\\ -2 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\quad t \\in \\mathbb{R}}$$</p>
<p>파라미터 개수 = <strong>1개</strong>.</p>
`,
  variant: "<strong>족보 2015 #3과 100% 동일!</strong> 시험엔 행렬 entries만 다른 형태로 거의 그대로 출제 가능성. rank/nullity 개념과 풀이 절차는 동일. 다른 행렬에 같은 절차 적용 연습 필수."
})}

${hwProblem({
  num: "3.14",
  topic: "Companion-form Matrix의 Characteristic Polynomial & Eigenvector (증명형)",
  image: "HW2_Ch3_Prob_3.14.png",
  problemText: `다음 companion-form 행렬을 고려하라:
  $$\\mathbf{A} = \\begin{bmatrix} -\\alpha_1 & -\\alpha_2 & -\\alpha_3 & -\\alpha_4 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\end{bmatrix}$$
  이 행렬의 characteristic polynomial 이 $\\Delta(\\lambda) = \\lambda^4 + \\alpha_1 \\lambda^3 + \\alpha_2 \\lambda^2 + \\alpha_3 \\lambda + \\alpha_4$ 임을 보여라. <br>
  또한 $\\lambda_i$ 가 $\\mathbf{A}$ 의 eigenvalue (즉 $\\Delta(\\lambda) = 0$ 의 해) 일 때, $[\\lambda_i^3, \\lambda_i^2, \\lambda_i, 1]^T$ 가 $\\lambda_i$ 에 대응하는 eigenvector 임을 보여라.`,
  answer: `
<p><strong>주어진 행렬 (Companion form):</strong></p>
<p>$A = \\begin{bmatrix} -\\alpha_1 & -\\alpha_2 & -\\alpha_3 & -\\alpha_4 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\end{bmatrix}$</p>
<p><strong>(a) Characteristic polynomial 증명</strong></p>
<p>$\\det(\\lambda I - A) = \\det\\begin{bmatrix} \\lambda + \\alpha_1 & \\alpha_2 & \\alpha_3 & \\alpha_4 \\\\ -1 & \\lambda & 0 & 0 \\\\ 0 & -1 & \\lambda & 0 \\\\ 0 & 0 & -1 & \\lambda \\end{bmatrix}$</p>
<p><strong>마지막 열 cofactor expansion (또는 첫 행).</strong> 패턴이 재귀적:</p>
<p>$\\Delta(\\lambda) = (\\lambda + \\alpha_1) \\cdot \\det\\begin{bmatrix} \\lambda & 0 & 0 \\\\ -1 & \\lambda & 0 \\\\ 0 & -1 & \\lambda \\end{bmatrix} - \\alpha_2 \\cdot \\det\\begin{bmatrix} -1 & 0 & 0 \\\\ 0 & \\lambda & 0 \\\\ 0 & -1 & \\lambda \\end{bmatrix} + \\cdots$</p>
<p>각 항을 계산해 정리:</p>
<p>$$\\Delta(\\lambda) = \\lambda^4 + \\alpha_1 \\lambda^3 + \\alpha_2 \\lambda^2 + \\alpha_3 \\lambda + \\alpha_4$$</p>
<p><strong>핵심 통찰:</strong> Companion matrix의 첫 행 = 분모 다항식의 계수 (부호 반대). 즉 행렬을 보면 즉시 다항식을 알 수 있음.</p>
<p><strong>(b) Eigenvector 증명</strong></p>
<p>$\\mathbf{v} = [\\lambda^3, \\lambda^2, \\lambda, 1]^T$ 로 두고 $A\\mathbf{v}$ 직접 계산:</p>
<ul>
  <li>1행: $-\\alpha_1 \\lambda^3 - \\alpha_2 \\lambda^2 - \\alpha_3 \\lambda - \\alpha_4$. 그런데 $\\lambda$가 근이므로 $\\Delta(\\lambda) = 0$, 즉 $\\lambda^4 = -\\alpha_1\\lambda^3 - \\alpha_2\\lambda^2 - \\alpha_3\\lambda - \\alpha_4$. 따라서 1행 $= \\lambda^4 = \\lambda \\cdot \\lambda^3$.</li>
  <li>2행: $1 \\cdot \\lambda^3 = \\lambda^3 = \\lambda \\cdot \\lambda^2$.</li>
  <li>3행: $1 \\cdot \\lambda^2 = \\lambda \\cdot \\lambda$.</li>
  <li>4행: $1 \\cdot \\lambda = \\lambda \\cdot 1$.</li>
</ul>
<p>그러므로 $A\\mathbf{v} = \\lambda \\mathbf{v}$. ∎</p>
`,
  variant: "Companion form은 Ch4 Realization과 직결. 시험엔 \"$G(s)$의 controllable canonical form $A$ 행렬을 쓰고 그 eigenvalue를 구하라\" 같이 변형."
})}

${hwProblem({
  num: "3.18",
  topic: "Characteristic & Minimal Polynomial (Jordan 블록 4개)",
  image: "HW2_Ch3_Prob_3.18.png",
  problemText: "다음 네 개 행렬 각각의 characteristic polynomial 과 minimal polynomial 을 구하라. (행렬들은 모두 Jordan-like 형태로, eigenvalue 의 algebraic multiplicity 와 Jordan block 구조가 어떻게 minimal polynomial 에 반영되는지 비교해보는 문제.)",
  answer: `
<p><strong>핵심 정의:</strong></p>
<ul>
  <li><strong>Characteristic polynomial $\\Delta(\\lambda)$:</strong> $\\det(\\lambda I - A)$. 모든 eigenvalue를 algebraic multiplicity와 함께.</li>
  <li><strong>Minimal polynomial $\\psi(\\lambda)$:</strong> $\\psi(A) = 0$인 monic 다항식 중 차수 최소. 각 eigenvalue의 <strong>가장 큰 Jordan block 크기</strong> 만큼 인수.</li>
</ul>

<p><strong>행렬 (1):</strong> $\\begin{bmatrix} \\lambda_1 & 1 & 0 & 0 \\\\ 0 & \\lambda_1 & 1 & 0 \\\\ 0 & 0 & \\lambda_1 & 0 \\\\ 0 & 0 & 0 & \\lambda_2 \\end{bmatrix}$ — $\\lambda_1$ 의 $3 \\times 3$ Jordan block + $\\lambda_2$ 의 $1\\times 1$.</p>
<p>$\\Delta(\\lambda) = (\\lambda - \\lambda_1)^3 (\\lambda - \\lambda_2)$<br>
$\\psi(\\lambda) = (\\lambda - \\lambda_1)^3 (\\lambda - \\lambda_2)$ (가장 큰 block은 3, $\\lambda_2$는 1)<br>
같음.</p>

<p><strong>행렬 (2):</strong> $\\begin{bmatrix} \\lambda_1 & 1 & 0 & 0 \\\\ 0 & \\lambda_1 & 1 & 0 \\\\ 0 & 0 & \\lambda_1 & 0 \\\\ 0 & 0 & 0 & \\lambda_1 \\end{bmatrix}$ — $\\lambda_1$의 $3 \\times 3$ + $1 \\times 1$.</p>
<p>$\\Delta(\\lambda) = (\\lambda - \\lambda_1)^4$<br>
$\\psi(\\lambda) = (\\lambda - \\lambda_1)^3$ (가장 큰 block만)</p>

<p><strong>행렬 (3):</strong> $\\begin{bmatrix} \\lambda_1 & 1 & 0 & 0 \\\\ 0 & \\lambda_1 & 0 & 0 \\\\ 0 & 0 & \\lambda_1 & 0 \\\\ 0 & 0 & 0 & \\lambda_1 \\end{bmatrix}$ — $\\lambda_1$의 $2 \\times 2$ + $1 \\times 1$ + $1 \\times 1$.</p>
<p>$\\Delta(\\lambda) = (\\lambda - \\lambda_1)^4$<br>
$\\psi(\\lambda) = (\\lambda - \\lambda_1)^2$</p>

<p><strong>행렬 (4):</strong> $\\lambda_1 I$ — 모두 $1 \\times 1$ block 4개.</p>
<p>$\\Delta(\\lambda) = (\\lambda - \\lambda_1)^4$<br>
$\\psi(\\lambda) = (\\lambda - \\lambda_1)$ (가장 큰 block 크기 = 1)</p>

<p><strong>핵심 통찰:</strong> Characteristic polynomial은 같아도 minimal polynomial은 다를 수 있음 → Jordan structure 정보가 minimal에 들어있음.</p>
`,
  variant: "시험에 \"행렬 $A$가 diagonalizable인지 판정\" 형태로 자주 변형. <strong>판정법:</strong> minimal polynomial이 distinct linear factors의 곱이면 diagonalizable. 즉 $\\psi$에 중근이 없으면 OK."
})}

${note(`<strong>HW2 핵심 정리:</strong> 3.8은 시험에 거의 그대로 나올 가능성 매우 높음 (족보 2015 #3 패턴). 3.14는 companion matrix가 Ch4 realization으로 이어지는 다리 역할. 3.18은 minimal polynomial 개념 — diagonalizability 판정.`, "tip")}
`);
