registerPage("ch3-vectorspace", "Vector Space 기초", () => `
<h1>Ch 3.1 — Vector Space 기초</h1>
<p class="lead">${tag("선행지식", "concept")} 이 페이지는 시험에 직접 안 나와도, 뒷장 전부의 토대야. 익숙하면 훑고 넘어가도 OK.</p>

${profMemo(`이 주제 자체는 <strong>시험에 거의 안 나와</strong>. 1·2장도 별로 안 나옴. 단 <em>용어와 개념</em>을 알고 있어야 Ch3 뒷부분 (rank / eigen / diagonal) 문제를 풀 수 있어. 여기서 설명하는 정의들은 우측 패널에도 다 저장돼 있으니 언제든 꺼내 쓸 수 있음.`)}

<h2>1. Vector와 Vector Space</h2>

${defCard("Vector", `
$n$개의 숫자를 모아놓은 것. $\\mathbf{x} = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{bmatrix} \\in \\mathbb{R}^n$
<br>예: $\\mathbf{x} = \\begin{bmatrix} 3 \\\\ -1 \\\\ 2 \\end{bmatrix}$는 $\\mathbb{R}^3$의 벡터.
`)}

${defCard("Vector Space (벡터 공간)", `
벡터들의 집합 + 두 연산이 닫혀 있어야 함:
<ol>
  <li><strong>덧셈에 닫혀있음:</strong> $\\mathbf{x}, \\mathbf{y} \\in V \\Rightarrow \\mathbf{x} + \\mathbf{y} \\in V$</li>
  <li><strong>스칼라 곱에 닫혀있음:</strong> $\\mathbf{x} \\in V, c \\in \\mathbb{R} \\Rightarrow c\\mathbf{x} \\in V$</li>
</ol>
가장 흔한 예: $\\mathbb{R}^n$ 자체가 ${term("vector-space")}. 더 정확한 조건은 우측 패널의 ${term("vector-space", "Vector Space")} 항목 참고.
`)}

${note(`<strong>실생활 비유:</strong> RGB 색상 — 모든 색이 $(R, G, B)$ 세 성분으로 표현 가능. 빨강 + 파랑 = 보라. 빨강 × 0.5 = 어두운 빨강. 전형적 3차원 벡터 공간.`)}

${concept("더 많은 예시 — 벡터공간이 되는 것/안 되는 것", `
<strong>✅ 벡터 공간:</strong>
<ul>
  <li>$\\mathbb{R}^n$ (모든 $n$차원 실수 벡터)</li>
  <li>$n \\times m$ 실수 행렬 전체 — 행렬을 벡터로 봐도 됨</li>
  <li>차수 $\\le n$인 모든 다항식 — $a_0 + a_1 x + \\cdots + a_n x^n$</li>
  <li>$[0, T]$ 구간의 모든 연속 함수 (제어이론에서 신호 공간!)</li>
</ul>
<strong>❌ 벡터 공간 아님:</strong>
<ul>
  <li>$\\mathbb{R}^2$의 1사분면 (양수만) — $-1 \\cdot \\mathbf{x}$가 밖으로 나감</li>
  <li>단위원 위의 점들 — 두 점 더하면 원 밖</li>
  <li>정수 벡터들 — $0.5 \\cdot \\mathbf{x}$가 정수 아닐 수 있음</li>
</ul>
`)}

${note(`<strong>왜 알아야 하나:</strong> 시스템의 "상태(state)"가 벡터 공간 안에 살아. $\\dot{\\mathbf{x}} = A\\mathbf{x} + B\\mathbf{u}$ 같은 상태방정식의 $\\mathbf{x}(t)$가 정확히 이거. 진자 상태 = (각도, 각속도)로 $\\mathbb{R}^2$ 위의 점.`)}

<h2>2. Linear Combination (선형 결합)</h2>
${defCard("Linear Combination", `
벡터 $\\mathbf{v}_1, \\ldots, \\mathbf{v}_k$와 스칼라 $c_1, \\ldots, c_k$로 만든
$$c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 + \\cdots + c_k \\mathbf{v}_k$$
가 ${term("linear-combination")}. 즉 <em>"섞은 것"</em>. 가능한 모든 조합을 모으면 ${term("span")}이 됨.
`)}

${concept("간단 예시", `
$\\mathbf{v}_1 = \\begin{bmatrix}1\\\\0\\end{bmatrix}, \\mathbf{v}_2 = \\begin{bmatrix}0\\\\1\\end{bmatrix}$일 때
$$3\\mathbf{v}_1 + 2\\mathbf{v}_2 = \\begin{bmatrix}3\\\\2\\end{bmatrix}$$
모든 $(c_1, c_2)$ 조합으로 평면 전체 $\\mathbb{R}^2$를 "만들어낼 수 있음" → span = $\\mathbb{R}^2$.
`)}

<h2>3. Linear Independence (선형 독립)</h2>
${defCard("Linearly Independent", `
$c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 + \\cdots + c_k \\mathbf{v}_k = \\mathbf{0}$의 유일한 해가 $c_1 = c_2 = \\cdots = c_k = 0$일 때 ${term("linear-independence")}.<br><br>
직관: <strong>아무도 다른 것의 조합으로 만들 수 없을 때</strong>. 한 명이라도 다른 사람들의 조합으로 표현되면 선형 종속(dependent).
`)}

${note(`<strong>2D 직관:</strong> 두 벡터가 같은 직선 위에 있으면 dependent (한 명이 다른 명의 배수). 다른 방향이면 independent.`)}

${concept("3D 시각화로 이해하기", `
<strong>3개 벡터가 독립이려면</strong> 어떤 평면에도 다 같이 들어가지 않아야 해. 셋이 평면 위에 있으면 종속.<br><br>
$\\mathbf{v}_1 = \\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix}, \\mathbf{v}_2 = \\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix}, \\mathbf{v}_3 = \\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$ → x, y, z축. 셋이 한 평면에 못 들어감 → <strong>독립</strong>.<br><br>
$\\mathbf{v}_1 = \\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix}, \\mathbf{v}_2 = \\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix}, \\mathbf{v}_3 = \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$ → 셋 다 $z = 0$ 평면 위. <strong>종속</strong>.
`)}

${concept("판별 트릭 — 행렬식", `
벡터들을 열로 모은 행렬 $M$을 만들고:
<ul>
  <li>정사각: $\\det(M) \\neq 0$ ⇔ independent (그럼 ${term("nonsingular")})</li>
  <li>아니면: $\\text{rank}(M) = k$ (벡터 개수) ⇔ independent</li>
</ul>
자세한 성질은 ${term("determinant")} / ${term("rank")} 참고.
`)}

${mcQuiz(
  "다음 두 벡터는 선형 독립일까? $\\mathbf{v}_1 = \\begin{bmatrix}1\\\\2\\end{bmatrix}, \\mathbf{v}_2 = \\begin{bmatrix}2\\\\4\\end{bmatrix}$",
  ["독립 (independent)", "종속 (dependent)", "판단 불가"],
  1,
  "$\\mathbf{v}_2 = 2\\mathbf{v}_1$이므로 종속. 즉 $2\\mathbf{v}_1 - \\mathbf{v}_2 = \\mathbf{0}$인 자명하지 않은 해가 있음."
)}

${mcQuiz(
  "세 벡터 $\\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix}, \\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix}, \\begin{bmatrix}1\\\\1\\\\0\\end{bmatrix}$는?",
  ["독립", "종속", "판단 불가"],
  1,
  "셋째 = 첫째 + 둘째. $\\det \\begin{bmatrix}1&0&1\\\\0&1&1\\\\0&0&0\\end{bmatrix} = 0$."
)}

<h2>4. Basis와 Dimension</h2>
${defCard("Basis (기저)", `
벡터 공간 $V$를 <strong>(1) 다 만들어낼 수 있고 (2) 서로 독립인</strong> 벡터들의 모임 = ${term("basis")}.<br>
예: $\\{\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3\\}$는 $\\mathbb{R}^3$의 표준기저.
`)}

${defCard("Dimension (차원)", `
${term("dimension")} = basis에 들어있는 벡터의 개수. $\\dim(\\mathbb{R}^n) = n$.
`)}

${note(`<strong>중요:</strong> $\\mathbb{R}^n$의 어떤 $n$개의 독립 벡터든 기저가 될 수 있어. 표준기저만 기저가 아니라는 뜻.`)}

${concept("같은 공간, 다른 기저", `
2D 평면을 표현하는 두 방식:<br><br>
<strong>표준 기저:</strong> $\\mathbf{e}_1 = \\begin{bmatrix}1\\\\0\\end{bmatrix}, \\mathbf{e}_2 = \\begin{bmatrix}0\\\\1\\end{bmatrix}$ → 보통의 격자<br>
<strong>회전된 기저:</strong> $\\mathbf{b}_1 = \\begin{bmatrix}1\\\\1\\end{bmatrix}, \\mathbf{b}_2 = \\begin{bmatrix}-1\\\\1\\end{bmatrix}$ → 45° 기울어진 격자<br><br>
같은 점 $(3, 1)$:
<ul>
  <li>표준 기저 ${term("representation", "표현")}: $3\\mathbf{e}_1 + 1\\mathbf{e}_2$ → $(3, 1)$</li>
  <li>회전 기저 표현: $2\\mathbf{b}_1 + (-1)\\mathbf{b}_2$ → $(2, -1)$</li>
</ul>
<strong>같은 점인데 좌표가 다름.</strong> 이게 뒤에 나오는 ${term("similarity", "닮음변환")}과 ${term("diagonalization", "대각화")}의 핵심 — 행렬 $A$를 보기 좋은 기저로 바꾸면 단순한 형태가 돼.
`)}

<h2>5. 체크</h2>
${mcQuiz(
  "$\\mathbb{R}^4$의 차원은?",
  ["3", "4", "16", "그때그때 다름"],
  1,
  "차원의 정의대로 4. 표준기저 $\\mathbf{e}_1, \\ldots, \\mathbf{e}_4$가 4개."
)}

${mcQuiz(
  "벡터 $\\mathbf{v}_1, \\mathbf{v}_2$가 dependent라는 것은?",
  ["둘 중 하나가 영벡터다", "한 명이 다른 명의 스칼라 배수다", "둘 다 영벡터다"],
  1,
  "정확히 그 의미. (또는 더 일반적으로, 자명하지 않은 선형결합으로 영벡터를 만들 수 있다.)"
)}

${note(`다음 페이지에서는 $A\\mathbf{x} = \\mathbf{b}$의 해를 구하는 법, ${term("rank")}/${term("null-space", "null space")} 개념을 다룰게. 시험에 자주 나와.`, "tip")}
`);
