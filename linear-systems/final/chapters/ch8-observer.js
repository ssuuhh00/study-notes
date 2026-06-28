registerPage("ch8-observer", "State Estimator & Separation", () => `
<h1>Ch 8 — State Estimator (Observer) & Separation Principle</h1>
<p class="lead">${tag("매년출제", "must")} observer gain $L$ 설계 + duality + separation principle.</p>

${profMemo(`<strong>두 덩어리.</strong> ① 2×2에서 $\\det(sI-(A-LC))$를 원하는 특성다항식과 매칭해 $L$ 구하기 (state feedback과 데칼코마니 — duality). ② Separation Principle 단답: 추정상태로 궤환해도 폐루프 극이 {제어 극}∪{estimator 극}으로 분리됨. 이 두 개만 확실히 하면 됨.`)}

${recall("이 페이지에 필요한 선행 개념", "관측오차 $\\dot e=(A-LC)e$의 수렴은 <strong>행렬지수 $e^{(A-LC)t}$</strong> 이야기고, 설계 자체는 가제어성의 <strong>전치(duality)</strong>임. 행렬지수·상태해가 흐릿하면 복습.", [["ch4-solution", "상태방정식 해 · 행렬지수 복습"], ["ch3-cayley", "행렬지수 계산 복습"]])}

<h2>1. Observer가 왜 필요한가</h2>
${defCard("State Estimator (Observer)", `
State feedback $u=-K\\mathbf x$는 상태 $\\mathbf x$ <strong>전부</strong>를 알아야 쓸 수 있음. 그런데 현실에선 센서로 출력 $y=C\\mathbf x$만 측정되지 내부 상태 전부를 직접 못 보는 경우가 많음.
<br><br>
그래서 출력 $y$와 입력 $u$만 보고 내부 상태를 <strong>추정</strong>하는 모델을 따로 돌림 — 이게 ${term("state-estimator", "observer(상태추정기)")}임. 추정값 $\\hat{\\mathbf x}$가 진짜 $\\mathbf x$에 빨리 수렴하면, 그걸 $\\mathbf x$ 대신 써서 궤환함.
`)}

<h2>2. Full-order Observer</h2>
${defCard("Full-order Observer & 추정오차", `
$$\\dot{\\hat{\\mathbf x}} = (A-LC)\\hat{\\mathbf x} + B\\mathbf u + L\\mathbf y$$
플랜트 복제($A\\hat x+Bu$)에 출력 보정항 $L(y-C\\hat x)$를 더한 것, $L$이 observer gain. 추정오차 $\\mathbf e=\\mathbf x-\\hat{\\mathbf x}$를 미분하면 $B\\mathbf u$와 $\\mathbf x$ 항이 깨끗이 사라지고
$$\\dot{\\mathbf e}=(A-LC)\\mathbf e$$
— 오차가 입력·상태와 무관하게 자기들끼리 $(A-LC)$로 진화함. (유도: $\\dot e=(Ax+Bu)-((A-LC)\\hat x+Bu+Ly)$에 $y=Cx$ 대입 → $A(x-\\hat x)-LC(x-\\hat x)=(A-LC)e$.)
<br><br>
그러니 $A-LC$의 eigenvalue를 LHP에 두면 $\\mathbf e\\to0$. 그게 가능한 조건은 <strong>$\\{A,C\\}$ observable ⟺ $A-LC$ 극 임의배치 가능</strong>. state feedback에서 controllable이 하던 역할을 여기선 ${term("observability", "observable")}이 함.
`)}

<h2>3. Duality — 전치한 state feedback</h2>
${defCard("Duality (쌍대성)", `
$A-LC$의 극배치는 $(A-LC)^T=A^T-C^TL^T$의 극배치와 같음 — $L^T$를 "state feedback의 $K$"로 보면 $\\{A^T,C^T\\}$에 대한 state feedback과 똑같은 꼴. 즉 <strong>Observer 설계 = 전치한 시스템의 state feedback</strong>(${term("duality", "쌍대성")}).
<br><br>
그래서 $K$ 구하는 법만 알면 $L$은 공짜 — $A\\to A^T,\\ B\\to C^T,\\ K\\to L^T$로 바꿔 똑같이 계수 비교하면 됨. transpose는 eigenvalue를 안 바꾸니 특성다항식은 그대로임.
`)}

<h2>4. 2×2 Observer gain $L$ 설계</h2>
${tryIt("", `$A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix},\\ C=[1\\ \\ 0]$, 원하는 estimator 극 $\\{-6,-6\\}$ → observer gain $L$ 설계.`, [
  {
    title: "observable 확인",
    body: `${term("observability-matrix")} $\\mathcal O=\\begin{bmatrix}C\\\\CA\\end{bmatrix}=\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$, $\\rho=2$ → observable ✓. $L$ 임의배치 가능.`
  },
  {
    title: "$A-LC$ 만들기",
    body: `$L=\\begin{bmatrix}l_1\\\\l_2\\end{bmatrix}$이면 $LC=\\begin{bmatrix}l_1 & 0\\\\l_2 & 0\\end{bmatrix}$이므로
    $$A-LC=\\begin{bmatrix}-l_1 & 1\\\\-2-l_2 & -3\\end{bmatrix}.$$`
  },
  {
    title: "$\\det(sI-(A-LC))$ 전개",
    body: `$$\\det\\begin{bmatrix}s+l_1 & -1\\\\2+l_2 & s+3\\end{bmatrix}=(s+l_1)(s+3)-(-1)(2+l_2)=s^2+(l_1+3)s+(3l_1+2+l_2).$$`
  },
  {
    title: "계수 비교 → $L$",
    body: `극 $\\{-6,-6\\}$ → $\\Delta_d(s)=(s+6)^2=s^2+12s+36$.<br>
    • $s^1$: $l_1+3=12 \\Rightarrow l_1=9$<br>
    • $s^0$: $3(9)+2+l_2=36 \\Rightarrow l_2=7$
    $$\\boxed{L=\\begin{bmatrix}9\\\\7\\end{bmatrix}}$$
    <strong>$L$은 크게 잡아도 됨.</strong> estimator 극은 제어 극보다 2~5배 왼쪽으로 잡아 추정이 먼저 수렴하게 하는데, observer는 소프트웨어 계산뿐이라 비용이 없음 — 액추에이터 saturation 때문에 못 키우는 제어 $K$와 대조됨.`
  }
])}

${tryIt("족보 2013 Q3-c", `같은 시스템 $A=\\begin{bmatrix}-1&1\\\\0&1\\end{bmatrix},\\ C=[\\,1\\ 0\\,]$에서 estimator 극 $\\{-6,-10\\}$인 observer gain $L$을 구하라.`, [
  {
    title: "observable 확인",
    body: `$CA=[\\,1\\ 0\\,]\\begin{bmatrix}-1&1\\\\0&1\\end{bmatrix}=[\\,-1\\ 1\\,]$ → $\\mathcal O=\\begin{bmatrix}1&0\\\\-1&1\\end{bmatrix}$, $\\det=1\\ne0$ → observable ✓.`
  },
  {
    title: "$A-LC$ 전개",
    body: `$L=\\begin{bmatrix}l_1\\\\l_2\\end{bmatrix}$, $LC=\\begin{bmatrix}l_1&0\\\\l_2&0\\end{bmatrix}$ →
    $$A-LC=\\begin{bmatrix}-1-l_1&1\\\\-l_2&1\\end{bmatrix},\\quad \\det(sI-\\cdot)=s^2+l_1 s+(l_2-1-l_1).$$`
  },
  {
    title: "계수 비교 → $L$",
    body: `극 $\\{-6,-10\\}$ → $\\Delta_d=(s+6)(s+10)=s^2+16s+60$.<br>
    • $s^1$: $l_1=16$<br>
    • $s^0$: $l_2-1-l_1=60\\Rightarrow l_2=60+1+16=77$
    $$\\boxed{L=\\begin{bmatrix}16\\\\77\\end{bmatrix}}$$
    estimator 극($-6,-10$)을 제어 극($-2,-3$, Q3-a)보다 훨씬 왼쪽에 둬 추정이 먼저 수렴 — $L$은 소프트웨어라 크게 잡아도 비용 없음.`
  }
])}

${note(`<strong>📝 족보 2015 Q5 (서술형):</strong> "state estimator의 일반구조와 estimator 극 배치 방법을 설명하라." → ① 구조 $\\dot{\\hat x}=(A-LC)\\hat x+Bu+Ly$(§2) → ② 오차 $\\dot e=(A-LC)e$(입력 무관) → ③ $\\{A,C\\}$ observable이면 $A-LC$ 극 임의배치, duality로 state feedback처럼 계수비교(§3·§4)로 $L$ 결정.`, "tip")}

<h2>5. Reduced-order Estimator</h2>
${defCard("Reduced-order Estimator", `
출력 $y$가 $q$개면 그 $q$개 상태는 이미 직접 알 수 있으니, 나머지 $n-q$개만 추정하면 됨 — ${term("reduced-order-estimator")}는 차원이 $n-q$로 줄어듦($F$는 $(n-q)$차 stable, eigenvalue가 $A$와 겹치면 안 됨).
<br><br>
예로 $y=x_1$이면 $x_1$은 센서로 바로 읽으니 추정할 필요가 없고 $x_2$ 하나만 추정 → full-order(2차) 대신 1차로 충분, 계산량 절약. 단 측정 잡음이 많으면 full-order가 더 robust할 수 있다는 trade-off가 있음.
`)}

<h2>6. Separation Principle</h2>
${defCard("Separation Principle", `
추정상태로 궤환($u=-K\\hat x$)해도 폐루프 전체의 eigenvalue는
$$\\{\\,A-BK\\text{의 극}\\,\\}\\ \\cup\\ \\{\\,A-LC\\text{의 극}\\,\\}$$
즉 ${term("separation-principle")}: <strong>제어 극과 estimator 극이 분리</strong>돼 서로 영향 안 줌 → $K$와 $L$을 <strong>독립적으로</strong> 설계해도 됨.
<br><br>
왜 분리되나: 좌표를 $(x,\\,e)$ ($e=x-\\hat x$)로 잡으면 폐루프 행렬이 블록 상삼각이 됨:
$$\\begin{bmatrix}\\dot x\\\\\\dot e\\end{bmatrix}=\\begin{bmatrix}A-BK & BK\\\\0 & A-LC\\end{bmatrix}\\begin{bmatrix}x\\\\e\\end{bmatrix}.$$
좌하단이 0이라 둘이 안 섞이고, eigenvalue는 대각 블록들의 합집합. 게다가 $r\\to y$ 전달함수는 estimator가 없는(상태 전부 측정) 경우와 동일 — estimator 극이 약분돼 사라짐.
`)}

<h2>7. 체크</h2>
${mcQuiz(
  "추정오차 $e=x-\\hat x$의 동역학 $\\dot e=(A-LC)e$가 의미하는 것은?",
  ["오차가 입력 $u$에 비례", "오차가 입력·상태와 무관하게 $(A-LC)$로 수렴", "오차가 항상 0", "오차가 $C$에만 의존"],
  1,
  "$Bu$와 $x$ 항이 사라져 오차는 자기들끼리 $(A-LC)$로 진화. $A-LC$를 LHP로 두면 $e\\to0$."
)}

${mcQuiz(
  "$A-LC$의 극을 임의 배치할 수 있는 조건은?",
  ["$\\{A,B\\}$ controllable", "$\\{A,C\\}$ observable", "$A$가 stable", "$C$가 정방행렬"],
  1,
  "Observer는 state feedback의 dual. controllable이 하던 역할을 observable이 함."
)}

${mcQuiz(
  "Separation principle에 따라 $\\hat x$로 궤환한 폐루프 전체 극은?",
  ["{제어 극}만", "{estimator 극}만", "{제어 극} ∪ {estimator 극} (독립 설계 가능)", "둘의 곱"],
  2,
  "블록 상삼각 구조라 두 극 집합의 합집합. $K$와 $L$을 따로 설계해도 됨."
)}

${note(`<strong>정리:</strong> observer는 state feedback의 dual — observable이면 $A-LC$ 극 임의배치($A\\to A^T,\\ C\\to B$로 똑같이 계수비교), separation으로 $K$·$L$ 독립 설계. 여기까지가 상태공간(Ch8) 설계. 다음 Ch9는 상태 없이 <strong>전달함수만으로</strong> 극을 배치하는 ${term("coprime-fraction", "Coprime Fraction 극배치")}!`, "tip")}
`);
