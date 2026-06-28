registerPage("ch6-observability", "Observability & 쌍대성", () => `
<h1>Ch 6 — Observability (가관측성) & Duality</h1>
<p class="lead">${tag("시험빈출", "exam")} 가관측성은 가제어성의 "거울상". ${term("duality", "쌍대성")}만 알면 가제어성에서 배운 걸 전치(transpose)해서 그대로 재사용할 수 있음.</p>

${profMemo(`<strong>시험 팁:</strong> 가관측성 판정은 ${term("observability-matrix", "가관측성 행렬")} $\\mathcal O$의 rank만 보면 됨. 2×2면 $\\det\\ne0$ 한 줄로 끝. 그리고 <strong>쌍대성</strong>이 단답 개념으로 자주 나옴 — "관측기(observer) 설계 = 전치한 state feedback"이라는 한 문장을 기억할 것. 가제어성 결과를 $A\\to A^T,\\ B\\to C^T$로 바꿔 끼우기만 하면 됨.`)}

${recall("이 페이지에 필요한 선행 개념", "가관측성 판정도 결국 <strong>rank 계산</strong>임 — 이번엔 $\\mathcal O$ 행렬. 쌍대성의 '전치($A\\to A^T$)'는 행·열을 뒤집는 것뿐이라 <strong>rank</strong>만 탄탄하면 그대로 따라옴.", "ch3-rank", "Rank · Null Space 복습")}

<h2>1. 직관 — 출력만 보고 내부를 역추적</h2>
${defCard("Observability (가관측성)", `
$\\dot{\\mathbf x}=A\\mathbf x,\\ y=C\\mathbf x$에서, 유한시간 동안의 출력 $y(t)$(와 입력 $u$)만으로 초기상태 $\\mathbf x_0$를 <strong>유일하게</strong> 결정할 수 있으면 ${term("observability", "observable")}임. ($\\mathbf x_0$를 알면 시스템 방정식으로 전 구간 상태를 다 복원함.)
<br><br>
가제어성이 "입력으로 상태를 <em>만들 수</em> 있나"라면, 가관측성은 "출력으로 상태를 <em>알아낼 수</em> 있나" — 정확히 거울상임. 센서($C$)로 안 보이는 내부 상태가 있으면 unobservable.
<br><br>
비유하면 형사가 현장 <strong>증거(출력 $y$)</strong>만으로 "범인이 누구였고 어떻게 움직였나(초기상태 $\\mathbf x_0$)"를 역추적하는 것. 증거가 충분하면(observable) 범인을 유일하게 특정하고, 결정적 증거가 사라졌으면(unobservable) 서로 다른 두 시나리오가 같은 증거를 남겨 구분 불가. 이 "출력으로 상태 추정" 아이디어가 곧 상태추정기(observer, Ch8)로 이어짐.
`)}

<h2>2. 판정법 ① — 가관측성 행렬</h2>
${defCard("Observability Matrix", `
$$\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\CA^2\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix},\\qquad \\rho(\\mathcal O)=n\\ \\Leftrightarrow\\ \\text{observable}.$$
가제어성 행렬은 가로로 붙였는데, ${term("observability-matrix", "가관측성 행렬")}은 <strong>세로로 쌓음</strong>(transpose 느낌). 단일출력($C$가 행벡터 1개)이면 $\\mathcal O$가 $n\\times n$ 정방이라 $\\det(\\mathcal O)\\ne0$ 하나만 보면 됨 — 가제어성과 완전히 대칭임.
`)}

<h2>3. 판정법 ② — PBH</h2>
${defCard("PBH for Observability", `
$A$의 모든 eigenvalue $\\lambda$에 대해
$$\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$$
이면 observable. 어떤 $\\lambda$에서 rank가 떨어지면 <strong>그 mode가 unobservable</strong>(출력에 안 나타남). ${term("pbh-test", "PBH")} 가제어성 PBH는 $[\\,A-\\lambda I\\ \\ B\\,]$를 <strong>가로</strong>로, 가관측성은 $\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}$를 <strong>세로</strong>로 붙임 — 모양만 봐도 전치 관계가 보임.
`)}

<h2>4. ⭐ Duality (쌍대성) — 핵심 중의 핵심</h2>
${defCard("Duality", `
$$\\{A,B\\}\\ \\text{controllable}\\ \\Longleftrightarrow\\ \\{A^T,B^T\\}\\ \\text{observable}$$
$$\\{A,C\\}\\ \\text{observable}\\ \\Longleftrightarrow\\ \\{A^T,C^T\\}\\ \\text{controllable}$$
${term("duality", "쌍대성")} — 가관측성 문제는 <strong>전치해서 가제어성 결과로 그대로 푼다</strong>.
<br><br>
왜 성립하나: $\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}$를 전치하면 $\\mathcal O^T=[\\,C^T\\ \\ A^TC^T\\ \\cdots\\ (A^T)^{n-1}C^T\\,]$로, 정확히 $\\{A^T,C^T\\}$의 <strong>가제어성 행렬</strong> 모양임. $\\rho(\\mathcal O)=\\rho(\\mathcal O^T)$(전치해도 rank 불변)이니 $\\{A,C\\}$ observable ⟺ $\\{A^T,C^T\\}$ controllable.
<br><br>
실전 효과: 가관측성·관측기 정리를 따로 증명할 필요 없이, 가제어성·상태궤환에서 증명한 걸 $A\\to A^T,\\ B\\to C^T,\\ K\\to L^T$로 치환하면 끝. <strong>"Observer 설계 = 전치한 state feedback"</strong>이 바로 이 얘기.
`)}

<h2>5. 2×2 가관측성 판정</h2>
${tryIt("", `$A=\\begin{bmatrix}0 & 1 \\\\ -2 & -3\\end{bmatrix},\\ C=[1\\ \\ 0]$이 observable인가? (쌍대성으로 교차검증까지.)`, [
  {
    title: "$CA$ 계산",
    body: `$n=2$이니 $\\mathcal O=\\begin{bmatrix}C\\\\CA\\end{bmatrix}$.<br>
    $CA=[1\\ \\ 0]\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}=[\\,1\\cdot0+0\\cdot(-2)\\ \\ \\ 1\\cdot1+0\\cdot(-3)\\,]=[0\\ \\ 1]$`
  },
  {
    title: "$\\mathcal O$ 세우고 $\\det$ 판정",
    body: `$$\\mathcal O=\\begin{bmatrix}C\\\\CA\\end{bmatrix}=\\begin{bmatrix}1 & 0\\\\ 0 & 1\\end{bmatrix}=I.$$
    단일출력 → $2\\times2$ 정방. $\\det(\\mathcal O)=1\\ne0$ → $\\rho=2=n$ → <strong>observable ✓</strong>`
  },
  {
    title: "쌍대성으로 교차검증",
    body: `$\\{A,C\\}$ obsv ⟺ $\\{A^T,C^T\\}$ ctrb. $A^T=\\begin{bmatrix}0&-2\\\\1&-3\\end{bmatrix},\\ C^T=\\begin{bmatrix}1\\\\0\\end{bmatrix}$.<br>
    $A^TC^T=\\begin{bmatrix}0\\\\1\\end{bmatrix}$ → $\\mathcal C'=\\begin{bmatrix}1&0\\\\0&1\\end{bmatrix}$, $\\det=1\\ne0$ → controllable ✓ — 전치만으로 가제어성 결과를 그대로 빌려 씀.`
  },
  {
    title: "반대 예 — unobservable은 어떻게 생겼나",
    body: `$A=\\begin{bmatrix}1&0\\\\0&2\\end{bmatrix},\\ C=[1\\ \\ 0]$이면 $CA=[1\\ \\ 0]$ → $\\mathcal O=\\begin{bmatrix}1&0\\\\1&0\\end{bmatrix}$, 두 행이 같아 $\\rho=1<2$ → <strong>unobservable</strong>.<br>
    대각이라 mode가 분리됐는데 $C$가 둘째 상태($\\lambda=2$)를 전혀 안 봄. PBH로도 $\\lambda=2$에서 $\\begin{bmatrix}A-2I\\\\C\\end{bmatrix}=\\begin{bmatrix}-1&0\\\\0&0\\\\1&0\\end{bmatrix}$ → 2열이 전부 0이라 rank 1 → $\\lambda=2$ mode가 출력에 안 나타남.`
  }
])}

<h2>6. 가제어성 ↔ 가관측성 한눈 대조표</h2>
<table>
  <tr><th></th><th>Controllability</th><th>Observability</th></tr>
  <tr><td>질문</td><td>$u$로 상태를 만들 수 있나</td><td>$y$로 상태를 알 수 있나</td></tr>
  <tr><td>판정행렬</td><td>$[B\\ AB\\cdots A^{n-1}B]$ (가로)</td><td>$\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}$ (세로)</td></tr>
  <tr><td>PBH</td><td>$\\rho([A-\\lambda I\\ B])=n$</td><td>$\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$</td></tr>
  <tr><td>쌍대</td><td>$\\{A^T,B^T\\}$ obsv</td><td>$\\{A^T,C^T\\}$ ctrb</td></tr>
</table>

<h2>7. Jordan form으로 c/o 판정 (교수님 강조)</h2>
${defCard("Jordan block 독립성 판정", `
대각화·Jordan형으로 바꿔놓으면 c/o를 <strong>eigenvalue별로</strong> 눈으로 읽을 수 있음.
<br><br>
<strong>Jordan형이 뭔가:</strong> 닮음변환으로 행렬을 <strong>최대한 대각에 가깝게</strong> 만든 표준형임. 대각엔 고유값 $\\lambda$가 오고, 일부 $\\lambda$ 바로 위(초대각선)에 $1$이 붙은 <strong>Jordan block</strong>들이 블록대각으로 늘어선 모양. 고유벡터가 모자라 <strong>대각화가 안 되는</strong> 행렬도 이 형태로는 항상 바꿀 수 있어서, 대각화의 일반판이라고 보면 됨.
<br><br>
<strong>예시:</strong> $A=\\begin{bmatrix}1&1\\\\-1&3\\end{bmatrix}$는 특성다항식이 $(\\lambda-2)^2$라 $\\lambda=2$가 중복인데, $\\rho(A-2I)=1$ → 독립 고유벡터가 <strong>1개뿐</strong>(부족) → <strong>대각화 불가</strong>. 그래서 대각이 아니라 크기-2 block 하나인 Jordan형 $J=\\begin{bmatrix}2&1\\\\0&2\\end{bmatrix}$이 됨 — 초대각선의 $1$이 "고유벡터가 모자라다"는 표식임. 반대로 고유값이 서로 <strong>다 다르면</strong> block이 전부 크기 1이라 $J$는 그냥 <strong>대각행렬</strong>(=대각화)이고 $1$은 안 나옴.
<br><br>
같은 eigenvalue $\\lambda$에 ${term("rank")}-결손만큼 <strong>Jordan block이 여러 개</strong> 생김(block 수 $=$ 기하적 중복도 $=n-\\rho(A-\\lambda I)$). 그 $\\lambda$에 대해:
<ul>
<li><strong>Controllable</strong> ⟺ 각 block의 <strong>마지막 행</strong>에 해당하는 $B$의 행들이 서로 <strong>independent</strong>.</li>
<li><strong>Observable</strong> ⟺ 각 block의 <strong>첫 열</strong>에 해당하는 $C$의 열들이 서로 <strong>independent</strong>.</li>
</ul>
직관: 한 eigenvalue에 block이 $k$개면 입력이 그 $k$개를 <strong>각각 독립으로</strong> 흔들 수 있어야 전부 제어됨 — 그래서 그 $\\lambda$가 controllable하려면 입력 채널이 최소 $k$개($\\rho(B)\\ge k$) 필요. block이 하나뿐인 $\\lambda$는 해당 행/열이 <strong>0만 아니면</strong> 됨. (이게 PBH가 각 $\\lambda$에서 rank를 보는 것과 같은 얘기 — Jordan은 그 구조를 눈에 보이게 만든 것.)
`)}

<h2>8. ⭐ 족보 — 3×3 c/o 판정</h2>
${tryIt("", `$$\\dot{\\mathbf x}=\\begin{bmatrix}1&1&0\\\\0&1&0\\\\0&1&2\\end{bmatrix}\\mathbf x+\\begin{bmatrix}0\\\\1\\\\0\\end{bmatrix}u,\\qquad y=[\\,1\\ 0\\ 0\\,]\\mathbf x$$ (족보 2015) controllability·observability를 판정하라.`, [
  {
    title: "eigenvalue & Jordan 구조",
    body: `상삼각 비슷 → $\\det(A-\\lambda I)=(2-\\lambda)(1-\\lambda)^2$ → $\\lambda=2$(단순), $\\lambda=1$(중복 2).<br>
    $\\lambda=1$: $A-I=\\begin{bmatrix}0&1&0\\\\0&0&0\\\\0&1&1\\end{bmatrix}$, $\\rho=2$ → block 수 $=3-2=1$ → <strong>크기 2짜리 Jordan block 하나</strong>. $\\lambda=2$는 $1\\times1$.`
  },
  {
    title: "Controllability — PBH로 각 $\\lambda$",
    body: `$\\lambda=1$: $[A-I\\ \\ B]=\\begin{bmatrix}0&1&0&0\\\\0&0&0&1\\\\0&1&1&0\\end{bmatrix}$ → rank 3 ✓.<br>
    $\\lambda=2$: $[A-2I\\ \\ B]=\\begin{bmatrix}-1&1&0&0\\\\0&-1&0&1\\\\0&1&0&0\\end{bmatrix}$ → rank 3 ✓.<br>
    두 $\\lambda$ 모두 full rank → <strong>controllable ✓</strong>. (각 $\\lambda$가 block 1개뿐이라 해당 행이 0만 아니면 OK인 상황.)`
  },
  {
    title: "Observability — $\\mathcal O$ rank",
    body: `$CA=[\\,1\\ 1\\ 0\\,]$, $CA^2=[\\,1\\ 2\\ 0\\,]$ → $\\mathcal O=\\begin{bmatrix}1&0&0\\\\1&1&0\\\\1&2&0\\end{bmatrix}$. 3열이 전부 0 → $\\rho=2<3$ → <strong>NOT observable</strong>.`
  },
  {
    title: "어느 mode가 안 보이나 — PBH",
    body: `$\\lambda=2$: $\\begin{bmatrix}A-2I\\\\C\\end{bmatrix}=\\begin{bmatrix}-1&1&0\\\\0&-1&0\\\\0&1&0\\\\1&0&0\\end{bmatrix}$ → 3열 전부 0 → rank $2<3$ → <strong>$\\lambda=2$ mode가 unobservable</strong>. 출력 $y=x_1$인데 $\\lambda=2$ mode는 $x_3$ 방향이라 $y$에 전혀 안 잡힘. 앞 단계에서 이 mode는 controllable이었으니 결국 <strong>cō (controllable · unobservable)</strong> 부분임.`
  },
  {
    title: "🔁 같은 문제를 Jordan으로 — 변환 $Q$ 만들기",
    body: `같은 답을 Jordan 방식으로도 확인해보자. $\\lambda=1$은 크기-2 block 하나라 <strong>사슬(chain)</strong>이 필요함.<br>
    $\\lambda=1$ 고유벡터 $(A-I)v_1=0$ → $v_1=\\begin{bmatrix}1\\\\0\\\\0\\end{bmatrix}$, 사슬 $(A-I)v_2=v_1$ → $v_2=\\begin{bmatrix}0\\\\1\\\\-1\\end{bmatrix}$.<br>
    $\\lambda=2$ 고유벡터 $(A-2I)v_3=0$ → $v_3=\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$.<br>
    열로 쌓으면
    $$Q=[\\,v_1\\ v_2\\ v_3\\,]=\\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&-1&1\\end{bmatrix},\\qquad Q^{-1}=\\begin{bmatrix}1&0&0\\\\0&1&0\\\\0&1&1\\end{bmatrix}.$$`
  },
  {
    title: "Jordan 좌표의 $\\bar B,\\bar C$로 c/o 읽기",
    body: `$B,C$도 같은 좌표로 옮김:
    $$J=Q^{-1}AQ=\\begin{bmatrix}1&1&0\\\\0&1&0\\\\0&0&2\\end{bmatrix},\\quad \\bar B=Q^{-1}B=\\begin{bmatrix}0\\\\1\\\\1\\end{bmatrix},\\quad \\bar C=CQ=[\\,1\\ 0\\ 0\\,].$$
    <strong>Controllable</strong> — 각 block <strong>마지막 행</strong>의 $\\bar B$: $\\lambda=1$ block(행 1·2)의 마지막은 행2 $=1\\ne0$ ✓, $\\lambda=2$ block(행 3) $=1\\ne0$ ✓ → <strong>controllable</strong>.<br>
    <strong>Observable</strong> — 각 block <strong>첫 열</strong>의 $\\bar C$: $\\lambda=1$ block(열 1·2)의 첫 열은 열1 $=1\\ne0$ ✓, $\\lambda=2$ block(열 3) $=0$ ✗ → <strong>$\\lambda=2$가 unobservable</strong>.<br>
    PBH로 낸 결과와 정확히 일치 — $\\bar C$의 $\\lambda=2$ 자리(열 3)가 $0$이라 출력이 그 block을 전혀 못 봄(<strong>cō</strong>).`
  },
  {
    title: "결론",
    body: `<strong>controllable이지만 observable은 아님</strong>($\\lambda=2$ mode가 cō). 전달함수로 보면 이 mode는 약분돼 안 나타남 → 이 실현은 minimal이 아님. controllability와 observability는 <strong>완전히 독립</strong>이라 항상 따로 판정해야 한다는 걸 보여주는 예.`
  }
])}

<h2>9. 체크</h2>
${mcQuiz(
  "Duality에 따라 $\\{A,C\\}$가 observable인 것과 동치인 것은?",
  ["$\\{A,C\\}$가 controllable", "$\\{A^T,C^T\\}$가 controllable", "$\\{A^T,C\\}$가 observable", "$\\{A,C^T\\}$가 controllable"],
  1,
  "$\\mathcal O^T=[C^T\\ A^TC^T\\cdots]$가 $\\{A^T,C^T\\}$의 가제어성 행렬이고 전치는 rank 불변. 그래서 $\\{A,C\\}$ obsv ⟺ $\\{A^T,C^T\\}$ ctrb."
)}

${mcQuiz(
  "단일출력 $n\\times n$ 시스템의 가관측성 판정으로 옳은 것은?",
  ["$\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}$의 $\\det\\ne0$", "$C$가 영벡터가 아니면 항상 observable", "$A$가 stable이면 observable", "$CB\\ne0$이면 observable"],
  0,
  "단일출력이면 $\\mathcal O$가 $n\\times n$ 정방이라 $\\det\\ne0$ ⟺ full rank ⟺ observable. 나머지는 충분조건이 아님."
)}

${mcQuiz(
  "Observer(상태추정기) 설계가 state feedback 설계와 쌍대 관계라는 말의 의미는?",
  ["둘은 전혀 무관하다", "$A\\to A^T,\\ B\\to C^T,\\ K\\to L^T$로 치환하면 같은 문제가 된다", "observer는 controllability만 필요하다", "state feedback은 observability만 필요하다"],
  1,
  "쌍대성 덕에 가제어성/상태궤환의 결과를 전치해서 가관측성/관측기에 그대로 옮길 수 있음. 그래서 따로 증명할 필요가 없음."
)}

${note(`<strong>정리:</strong> 가관측성 = 가제어성의 전치판. $\\mathcal O$ rank로 판정, PBH로 mode 진단, ${term("duality", "쌍대성")}으로 기존 결과 재사용. 다음은 약화된 버전인 ${term("stabilizable", "Stabilizable")}·${term("detectable", "Detectable")}과 ${term("controllability-index", "가제어성 지수")}!`, "tip")}
`);
