registerPage("ch3-eigen", "Eigenvalue · Eigenvector", () => `
<h1>Ch 3.3 — Eigenvalue · Eigenvector</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #2(a), 2017 #1, 과제 3.14 모두 이거. 시스템의 "고유 모드" — 이번 시험의 심장부.</p>

${profMemo(`<strong>핵심이야.</strong> 5장까지 시험 → 그중 이 주제는 매년 직접 풀이 출제. 계산은 2×2·3×3까지만 나오니 손으로 빠르게 구할 수 있게 연습하고, $e^{At}$(Cayley-Hamilton)이랑 Diagonalization과 연결되어 등장하는 게 패턴.`)}

<h2>1. 무엇을 구하는가</h2>

${defCard("Eigenvalue · Eigenvector", `
정사각 행렬 $A$ 에 대해, 영이 아닌 벡터 $\\mathbf{v}$ 와 스칼라 $\\lambda$가
$$\\boxed{\\,A\\mathbf{v} = \\lambda \\mathbf{v}\\,}$$
를 만족하면 $\\lambda$ = ${term("eigenvalue")}, $\\mathbf{v}$ = (해당 $\\lambda$의) ${term("eigenvector")}.
`)}

${note(`<strong>한 줄 직관:</strong> $A$를 곱해도 <em>방향이 안 바뀌는</em> 특별한 방향이 eigenvector. 그때 늘어나는 비율이 eigenvalue.`, "tip")}

${prereq("선형변환이란? (선형대수 복습)", `
행렬 $A$를 벡터 $\\mathbf{v}$에 곱한다는 건 $\\mathbf{v}$를 "또 다른 벡터 $A\\mathbf{v}$"로 옮기는 변환이야.
대부분의 방향은 $A$를 곱하면 <strong>회전 + 크기 변화</strong>가 둘 다 일어나는데,
eigenvector는 "회전 없이 크기만 $\\lambda$배로 변하는" 예외적인 방향이야. 그래서 '고유한 방향'이라 부름.<br><br>
영벡터는 $A \\cdot \\mathbf{0} = \\mathbf{0} = \\lambda \\cdot \\mathbf{0}$이 모든 $\\lambda$에 대해 성립해버리기 때문에 정의에서 제외함.
`)}

${note(`<strong>왜 시스템론에서 중요?</strong> $\\dot{\\mathbf{x}} = A\\mathbf{x}$의 해는 $\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$인데, eigenvalue가 $\\lambda$면 그 모드는 $e^{\\lambda t}$로 진화. $\\text{Re}(\\lambda) < 0$이면 ${term("internal-stability", "내부 안정")}, $> 0$이면 발산. 이게 ${term("bibo", "Ch5 안정도")}의 뼈대.`)}

<h2>2. 눈으로 보자 — 2D 선형변환</h2>
<p>슬라이더를 움직여 $A = \\begin{bmatrix}a & b\\\\ c & d\\end{bmatrix}$ 성분을 바꿔봐.
<span style="color:#e11d48;">빨간 화살표</span>는 $A\\mathbf{e}_1$(첫 열),
<span style="color:#16a34a;">초록</span>은 $A\\mathbf{e}_2$(둘째 열),
<span style="color:#a855f7;">보라/주황</span>은 eigenvector 방향.
격자가 $A$에 의해 어떻게 휘는지 보이지?</p>

${matrixTransform2D({ a: 2, b: 1, c: 0, d: 2 })}

${concept("슬라이더로 확인할 수 있는 패턴들", `
<ul>
<li><strong>$b = c = 0$</strong>로 두면 순수 대각행렬 → x,y 축이 그대로 eigenvector. 격자가 직각을 유지하며 늘어나기만 함.</li>
<li><strong>$a = d$, $b = -c$</strong>이면 회전 행렬에 가까워 eigenvalue가 복소수 쌍, 실수 eigenvector가 없음 → 격자가 회전.</li>
<li><strong>det &lt; 0</strong>이면 격자가 뒤집힘(반사).</li>
<li><strong>det = 0</strong>이면 2D → 1D로 찌부러짐, rank 1 행렬.</li>
</ul>
`)}

<h2>3. 어떻게 구하는가</h2>

${defCard("Characteristic Polynomial (특성다항식)", `
$$\\Delta(\\lambda) = \\det(\\lambda I - A) = 0$$
이 방정식의 근이 eigenvalue. 부호만 뒤집은 $\\det(A - \\lambda I) = 0$도 같은 근.
`)}

${concept("왜 $\\det(\\lambda I - A) = 0$ 인가?", `
$A\\mathbf{v} = \\lambda\\mathbf{v}$ ⇔ $(\\lambda I - A)\\mathbf{v} = \\mathbf{0}$.<br>
$\\mathbf{v} \\neq \\mathbf{0}$인 해가 존재하려면 $(\\lambda I - A)$가 ${term("nonsingular")}이면 안 됨 →
즉 $\\det(\\lambda I - A) = 0$이어야 해. 이게 특성방정식이 나오는 이유.
`)}

<h3>풀이 절차 (3단계)</h3>
<ol>
  <li>$\\det(\\lambda I - A) = 0$을 전개해서 $\\lambda$에 대한 다항식 만들기</li>
  <li>다항식의 근 = eigenvalues</li>
  <li>각 $\\lambda_i$에 대해 $(\\lambda_i I - A)\\mathbf{v} = \\mathbf{0}$을 풀어 eigenvector 구하기</li>
</ol>

${note(`<strong>$2\\times 2$ 단축 공식:</strong> $A = \\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}$이면 $\\Delta(\\lambda) = \\lambda^2 - \\text{tr}(A)\\lambda + \\det(A)$. 시험장에서는 이거로 바로 풀어.`, "tip")}

<h2>4. 워크스루 — 족보 2013 #2(a) 스타일</h2>

<p>$A = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}$의 eigenvalue와 eigenvector를 구해보자. 단계별로 아래에 쌓여가니까 앞 단계 그대로 참고하면서 따라와.</p>

${walkthrough("2×2 고유값·고유벡터 풀이", [
  {
    title: "Characteristic polynomial 세우기",
    body: `
      $\\lambda I - A = \\begin{bmatrix}\\lambda & 2\\\\ -1 & \\lambda + 3\\end{bmatrix}$
      <br>$\\det(\\lambda I - A) = \\lambda(\\lambda+3) - (2)(-1) = \\lambda^2 + 3\\lambda + 2$
      <br><br>
      또는 단축: $\\text{tr} = 0 + (-3) = -3$, $\\det = 0\\cdot(-3) - (-2)\\cdot 1 = 2$.
      따라서 $\\Delta(\\lambda) = \\lambda^2 - (-3)\\lambda + 2 = \\lambda^2 + 3\\lambda + 2$. 같음 ✓
    `
  },
  {
    title: "근 구하기",
    body: `$\\lambda^2 + 3\\lambda + 2 = (\\lambda+1)(\\lambda+2) = 0$
    $$\\lambda_1 = -1, \\quad \\lambda_2 = -2$$
    둘 다 음수 → ${term("internal-stability", "내부 안정")}.`
  },
  {
    title: "Eigenvector for $\\lambda_1 = -1$",
    body: `$(\\lambda_1 I - A)\\mathbf{v} = \\mathbf{0}$은
    $\\begin{bmatrix}-1 & 2 \\\\ -1 & 2\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix} = \\mathbf{0}$.
    두 행이 같은 식 ($-v_1 + 2v_2 = 0$) → 자유도 1.
    $v_2 = 1$을 잡으면 $v_1 = 2$.
    $$\\mathbf{v}_1 = \\begin{bmatrix}2\\\\1\\end{bmatrix}$$`
  },
  {
    title: "Eigenvector for $\\lambda_2 = -2$",
    body: `$\\begin{bmatrix}-2 & 2 \\\\ -1 & 1\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix} = \\mathbf{0}$.
    $-v_1 + v_2 = 0$ → $v_2 = 1$ 잡으면 $v_1 = 1$.
    $$\\mathbf{v}_2 = \\begin{bmatrix}1\\\\1\\end{bmatrix}$$`
  },
  {
    title: "검산",
    body: `$A\\mathbf{v}_1 = \\begin{bmatrix}0 & -2 \\\\ 1 & -3\\end{bmatrix}\\begin{bmatrix}2\\\\1\\end{bmatrix} = \\begin{bmatrix}-2\\\\-1\\end{bmatrix} = -1 \\cdot \\mathbf{v}_1$ ✓<br>
    $A\\mathbf{v}_2 = \\begin{bmatrix}-2\\\\-2\\end{bmatrix} = -2 \\cdot \\mathbf{v}_2$ ✓`
  }
])}

<h2>5. 직접 확인해보기</h2>

<p>아래 checker에 $\\mathbf{v}$ 성분을 넣어봐. 위에서 구한 $\\mathbf{v}_1 = (2,1)$이나 $\\mathbf{v}_2 = (1,1)$을 넣으면 eigenvector라고 알려주고 $\\lambda$도 보여줄 거야. 엉뚱한 벡터 $(1, 0)$ 같은 걸 넣으면 "아니다"라고 함.</p>

${eigenChecker([[0, -2], [1, -3]], "$A = \\begin{bmatrix}0 & -2\\\\ 1 & -3\\end{bmatrix}$에서")}

<h2>6. 자주 나오는 성질 (시험 단골)</h2>
<ul>
  <li><strong>${term("trace")} $ = \\sum \\lambda_i$</strong>: 대각원소 합 = 모든 eigenvalue의 합</li>
  <li><strong>${term("determinant")} $ = \\prod \\lambda_i$</strong>: 행렬식 = eigenvalue의 곱</li>
  <li>대각/삼각행렬의 eigenvalue = 대각 원소 그대로</li>
  <li>$A^k$의 eigenvalue = $\\lambda^k$, eigenvector는 그대로</li>
  <li>$A^{-1}$의 eigenvalue = $1/\\lambda$ (0이 아닐 때)</li>
  <li>${term("similarity")}: $\\bar A = Q^{-1}AQ$ ⇒ eigenvalue 그대로 보존</li>
  <li>${term("symmetric", "대칭행렬")} $\\Rightarrow$ 모든 eigenvalue가 실수, eigenvector는 직교</li>
</ul>

${concept("Trace = 합, Det = 곱 인 이유", `
특성다항식을 인수분해하면
$\\Delta(\\lambda) = \\det(\\lambda I - A) = (\\lambda - \\lambda_1)(\\lambda - \\lambda_2)\\cdots(\\lambda - \\lambda_n)$.<br>
전개하면 $\\lambda^n - (\\sum \\lambda_i)\\lambda^{n-1} + \\cdots + (-1)^n \\prod \\lambda_i$.<br><br>
한편 $\\det(\\lambda I - A)$를 직접 전개하면 $\\lambda^{n-1}$의 계수는 $-\\text{tr}(A)$,
상수항은 $(-1)^n \\det(A)$. 두 전개를 비교하면 끝.
`)}

<h2>7. 빠른 체크</h2>

${mcQuiz(
  "$A = \\begin{bmatrix}3 & 0 \\\\ 0 & -1\\end{bmatrix}$의 eigenvalue는?",
  ["3과 0", "3과 −1", "0과 −1", "3과 −3"],
  1,
  "대각행렬이라 대각원소 = eigenvalues. $\\lambda_1 = 3, \\lambda_2 = -1$."
)}

${mcQuiz(
  "$A$가 $3\\times 3$이고 $\\det(A) = 6$, 두 eigenvalue가 $1, 2$라면 셋째는?",
  ["3", "−3", "1/3", "구할 수 없음"],
  0,
  "$\\det = \\prod \\lambda_i = 1 \\cdot 2 \\cdot \\lambda_3 = 6 \\Rightarrow \\lambda_3 = 3$."
)}

${mcQuiz(
  "$\\text{tr}(A) = 5$이고 $A$가 $2\\times 2$, 한 eigenvalue가 $2$라면 다른 하나는?",
  ["3", "2.5", "5", "−2"],
  0,
  "trace = 합. $2 + \\lambda_2 = 5 \\Rightarrow \\lambda_2 = 3$."
)}

${saQuiz(
  "$A = \\begin{bmatrix}2 & 1\\\\ 0 & 2\\end{bmatrix}$의 eigenvalue (작은 값부터 콤마로, 예: 1,2)",
  ["2,2", "2"],
  "상삼각행렬 → 대각원소가 eigenvalue. 둘 다 $\\lambda = 2$ (중복). 이 경우 선형독립 eigenvector는 1개뿐이라 <strong>defective</strong> — Jordan form 필요."
)}

<h2>8. 과제 3.14 — Companion 행렬 (증명형, 시험은 계산 위주)</h2>

${note(`시험에 증명은 안 나와. 하지만 ${term("companion", "companion form")}은 <a href="#ch4-realization" onclick="window.go('ch4-realization')">Ch4 state-space realization</a>에서 그대로 등장하니 형태는 외워두자.`)}

${collapse("과제 3.14 풀이 스케치", `
Companion 행렬:
$$A = \\begin{bmatrix}-\\alpha_1 & -\\alpha_2 & -\\alpha_3 & -\\alpha_4 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 1 & 0\\end{bmatrix}$$
<strong>(a) 특성다항식:</strong> $\\det(\\lambda I - A)$를 첫 행 cofactor expansion → 재귀적으로
$\\Delta(\\lambda) = \\lambda^4 + \\alpha_1 \\lambda^3 + \\alpha_2 \\lambda^2 + \\alpha_3 \\lambda + \\alpha_4$.
즉 <strong>계수들이 그대로</strong> 나타남.<br><br>
<strong>(b) Eigenvector = $[\\lambda^3, \\lambda^2, \\lambda, 1]^T$:</strong> 직접 $A\\mathbf{v}$를 계산.
<ul>
<li>1행: $-\\alpha_1\\lambda^3 - \\alpha_2\\lambda^2 - \\alpha_3\\lambda - \\alpha_4$. $\\lambda$가 근이라 $\\lambda^4 = -\\alpha_1\\lambda^3 - \\cdots$.
따라서 1행 = $\\lambda^4 = \\lambda \\cdot \\lambda^3$.</li>
<li>2행: $1 \\cdot \\lambda^3 = \\lambda \\cdot \\lambda^2$.</li>
<li>3행: $\\lambda^2 = \\lambda \\cdot \\lambda$.</li>
<li>4행: $\\lambda = \\lambda \\cdot 1$.</li>
</ul>
모든 행이 $\\lambda \\times$(해당 성분)이므로 $A\\mathbf{v} = \\lambda \\mathbf{v}$. ✓
`)}

<h2>9. 다음 단계</h2>
<p>eigenvalue를 구했으니
<a href="#ch3-diagonal" onclick="window.go('ch3-diagonal')">대각화(Diagonalization)</a>에서 $A = QDQ^{-1}$을 만들고,
<a href="#ch3-cayley" onclick="window.go('ch3-cayley')">Cayley-Hamilton</a>으로 $e^{At}$를 계산하는 게 다음 코스.
두 주제 모두 이 페이지 내용을 재료로 쓰니 여기가 확실해야 거기가 쉬워.</p>
`);
