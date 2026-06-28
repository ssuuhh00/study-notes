registerPage("ch3-rank", "Rank · Null Space · 일반해", () => `
<h1>Ch 3.2 — Rank, Null Space, 일반해</h1>
<p class="lead">${tag("시험빈출", "exam")} 족보 2015 #3, 과제 3.8에 그대로 출제. $A\\mathbf{x} = \\mathbf{b}$의 일반해 구하기.</p>

${profMemo(`<strong>시험 패턴:</strong> $A$와 $\\mathbf{b}$ 주고 "일반해를 구하고 파라미터 개수는?"처럼 그대로 나와. 3×3 또는 3×4 크기라 손계산 가능. 증명 X, 계산 위주. Row echelon form에서 pivot·자유변수만 구분하면 됨.`)}

<h2>1. Rank (계수)</h2>
${defCard("Rank of $A$", `
행렬 $A$의 <strong>독립인 열(또는 행)의 최대 개수</strong> = ${term("rank")}.<br>
$A$가 $m \\times n$이면 $\\rho(A) \\le \\min(m, n)$.<br><br>
구하는 법: 가우스 소거 → 0이 아닌 행(= pivot 행) 개수.
`)}

${note(`<strong>직관:</strong> rank는 "정보의 양". 행렬이 담고 있는 독립적인 방향의 개수.`)}

${concept("실생활 비유 — 설문조사", `
100명에게 5개 질문 (만족도·가격·디자인·품질·구매의향) → $100 \\times 5$ 행렬.<br>
<strong>Rank 5</strong>: 모든 질문이 독립 정보.<br>
<strong>Rank 3</strong>: 5개 중 2개는 다른 3개로 표현 가능 (예: "구매의향 = 0.5×만족도 + 0.5×품질"). <em>중복 질문</em>.<br><br>
PCA(주성분 분석)의 핵심 = 큰 데이터의 진짜 차원(= rank) 찾기.
`)}

${concept("간단 예시", `
$A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 0 & 1 & 1 \\end{bmatrix}$<br>
둘째 행 = 첫 행의 2배. 독립 행은 2개. $\\rho(A) = 2$.
`)}

<h2>2. Null Space (영공간)</h2>
${defCard("Null Space $N(A)$", `
$A\\mathbf{x} = \\mathbf{0}$을 만족하는 모든 $\\mathbf{x}$의 집합 = ${term("null-space")}.<br>
차원 $\\dim N(A) = n - \\rho(A)$ = ${term("nullity")}.
`)}

${defCard("Rank-Nullity Theorem", `
$$\\boxed{\\rho(A) + \\text{nullity}(A) = n}$$
($n$은 $A$의 <strong>열 개수</strong>). 시험에서 매우 자주 사용.
`)}

${concept("왜 합이 $n$인가? — 열공간과 영공간의 상보성", `
$A$의 각 열을 $\\mathbb{R}^m$ 벡터로 보면:
<ul>
  <li>독립인 열 개수 = rank → 그 열들이 ${term("range-space", "range space")}를 span함 (차원 = rank)</li>
  <li>"종속"인 열이 나머지 → 그 종속 관계가 null space의 basis를 만듦 (차원 = nullity)</li>
</ul>
독립 + 종속 = 총 열 수 = $n$. 그래서 rank + nullity = $n$.
`)}

<h2>3. $A\\mathbf{x} = \\mathbf{b}$의 일반해</h2>

${note(`<strong>일반해 = 특수해 + 동차해</strong><br>
$\\mathbf{x} = \\mathbf{x}_p + \\mathbf{x}_h$<br>
• $\\mathbf{x}_p$: $A\\mathbf{x}_p = \\mathbf{b}$를 만족하는 아무 한 해<br>
• $\\mathbf{x}_h \\in N(A)$: $A\\mathbf{x}_h = \\mathbf{0}$의 모든 해 (${term("nullity")}만큼의 자유 파라미터)<br>
자세한 설명은 ${term("general-solution")} 항목에.`, "tip")}

${prereq("가우스 소거(Row Reduction)가 뭐더라?", `
행렬을 "사다리꼴(row echelon form)"로 바꾸는 작업. 세 가지 행 연산만 사용:
<ol>
  <li>한 행에 상수 곱하기</li>
  <li>두 행을 서로 바꾸기</li>
  <li>한 행의 상수배를 다른 행에 더하기</li>
</ol>
이렇게 만들면 각 행의 첫 0이 아닌 원소(= pivot)가 계단식으로 내려옴. 해의 존재/일반해/rank를 다 여기서 읽어낼 수 있어.
`)}

<h2>4. 워크스루 — 과제 3.8 / 족보 2015 #3</h2>
${walkthrough("$A\\mathbf{x} = \\mathbf{b}$ 일반해 풀기", [
  {
    title: "문제 셋업",
    body: `$A = \\begin{bmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & 2 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}$, $\\mathbf{b} = \\begin{bmatrix} 3 \\\\ 2 \\\\ 1 \\end{bmatrix}$.<br>
    "파라미터 개수는?"도 같이 묻는 문제.`
  },
  {
    title: "Rank 확인",
    body: `이미 row echelon 형태. 0이 아닌 행 3개 → $\\rho(A) = 3$.<br>
    열 개수 $n = 4$. 따라서 nullity $= 4 - 3 = 1$. <strong>자유 파라미터 1개</strong>.`
  },
  {
    title: "Particular solution $\\mathbf{x}_p$ 찾기",
    body: `Pivot 위치: 1행→1열, 2행→2열, 3행→4열. <strong>3열이 자유변수</strong>. $x_3 = 0$ 놓으면:<br>
    3행: $x_4 = 1$<br>
    2행: $-x_2 + 2x_4 = 2 \\Rightarrow x_2 = 0$<br>
    1행: $x_1 + 0 + 0 + 4 = 3 \\Rightarrow x_1 = -1$<br>
    $$\\mathbf{x}_p = \\begin{bmatrix}-1\\\\0\\\\0\\\\1\\end{bmatrix}$$`
  },
  {
    title: "Homogeneous solution $\\mathbf{x}_h$ — null space",
    body: `$A\\mathbf{x} = \\mathbf{0}$ 풀기. 자유변수 $x_3 = t$ 놓으면:<br>
    3행: $x_4 = 0$<br>
    2행: $-x_2 - 2t + 0 = 0 \\Rightarrow x_2 = -2t$<br>
    1행: $x_1 - 4t + 3t + 0 = 0 \\Rightarrow x_1 = t$<br>
    $$\\mathbf{x}_h = t\\begin{bmatrix}1\\\\-2\\\\1\\\\0\\end{bmatrix}$$`
  },
  {
    title: "최종 일반해",
    body: `$$\\mathbf{x} = \\mathbf{x}_p + \\mathbf{x}_h = \\begin{bmatrix}-1\\\\0\\\\0\\\\1\\end{bmatrix} + t\\begin{bmatrix}1\\\\-2\\\\1\\\\0\\end{bmatrix}, \\quad t \\in \\mathbb{R}$$
    <strong>파라미터 개수: 1</strong> (= nullity).`
  }
])}

<h2>5. 행 연산 단계별 보기 — 3×4 예제</h2>

<p>$A = \\begin{bmatrix}1 & 2 & 1 & 3 \\\\ 2 & 4 & 3 & 8 \\\\ 1 & 2 & 2 & 5\\end{bmatrix}$을 row echelon form으로. 각 단계의 변화된 행이 <span style="color:#f59e0b;">주황</span>으로 표시돼.</p>

${rowReduce([
  {
    op: "시작 행렬",
    rows: [["1","2","1","3"],["2","4","3","8"],["1","2","2","5"]],
  },
  {
    op: "$R_2 \\leftarrow R_2 - 2R_1$",
    rows: [["1","2","1","3"],["0","0","1","2"],["1","2","2","5"]],
    hlRow: 1,
  },
  {
    op: "$R_3 \\leftarrow R_3 - R_1$",
    rows: [["1","2","1","3"],["0","0","1","2"],["0","0","1","2"]],
    hlRow: 2,
  },
  {
    op: "$R_3 \\leftarrow R_3 - R_2$",
    rows: [["1","2","1","3"],["0","0","1","2"],["0","0","0","0"]],
    hlRow: 2,
  },
  {
    op: "Row echelon 완료. Pivot 2개 (1열, 3열) → $\\rho(A) = 2$, nullity = $4 - 2 = 2$.",
    rows: [["1","2","1","3"],["0","0","1","2"],["0","0","0","0"]],
  },
])}

<h2>6. 해의 존재성 — 한눈에</h2>
<table>
  <tr><th>조건</th><th>해의 상황</th></tr>
  <tr><td>$\\rho(A) = \\rho([A\\,|\\,\\mathbf{b}]) = n$</td><td>유일한 해</td></tr>
  <tr><td>$\\rho(A) = \\rho([A\\,|\\,\\mathbf{b}]) < n$</td><td>무수히 많음 ($n - \\rho$개 자유변수)</td></tr>
  <tr><td>$\\rho(A) < \\rho([A\\,|\\,\\mathbf{b}])$</td><td>해 없음 (inconsistent)</td></tr>
</table>

${mcQuiz(
  "$A$가 $3 \\times 5$이고 $\\rho(A) = 3$이면 $A\\mathbf{x} = \\mathbf{b}$의 해는?",
  ["존재하지 않을 수 있음", "유일한 해", "2개의 자유변수를 가지는 무한 많은 해", "3개의 자유변수"],
  2,
  "$\\rho(A) = 3 = m$이라 항상 해 존재. 자유변수 = $n - \\rho = 5 - 3 = 2$."
)}

${mcQuiz(
  "정사각행렬 $A$가 invertible 일 동치 조건이 <strong>아닌</strong> 것은?",
  ["$\\det(A) \\neq 0$", "rank가 full ($n$)", "$N(A) = \\{\\mathbf{0}\\}$", "$A$의 모든 entry가 0이 아님"],
  3,
  "Entry 자체와는 무관. 나머지 셋은 모두 nonsingular와 동치 (invertible matrix theorem)."
)}

${note(`<strong>시험 팁:</strong> rank/null/일반해 문제는 계산 실수가 절반. 가우스 소거를 한 단계씩 깔끔히 적고, 자유변수 → particular → homogeneous 순으로 나열하면 부분점수도 잘 받아.`, "tip")}
`);
