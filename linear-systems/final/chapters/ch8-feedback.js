registerPage("ch8-feedback", "State Feedback 극배치", () => `
<h1>Ch 8 — State Feedback 극배치 (Pole Placement)</h1>
<p class="lead">${tag("매년출제", "must")} 족보 p3-1(4) 류. 손계산 2×2로 $K$ 구하기 + Lyapunov 방법 + feedforward gain.</p>

${profMemo(`<strong>핵심은 단 하나.</strong> ${term("controllability", "controllable")}이면 폐루프 극을 <strong>아무 데나</strong> 옮길 수 있음. 시험은 거의 다 "2×2에서 원하는 극 주고 $K=[k_1\\ k_2]$ 구해라"임. $\\det(sI-(A-BK))$ 전개 → 원하는 특성다항식과 계수 비교 → 연립. 이거 하나만 손에 익히면 절반은 먹고 들어감.`)}

${recall("이 페이지에 필요한 선행 개념", "극배치는 $\\det(sI-(A-BK))$를 <strong>원하는 특성다항식과 계수 비교</strong>하는 것. 특성다항식·고유값과 동반형(companion)이 흐릿하면 복습.", [["ch3-eigen", "고유값 · 특성다항식 복습"], ["ch4-realization", "동반형(companion) 복습"]])}

<h2>1. State Feedback이 뭐냐</h2>
${defCard("State Feedback (상태궤환)", `
상태 $\\mathbf x$를 전부 측정해서 입력으로 되먹임:
$$\\mathbf u = r - K\\mathbf x \\;\\Rightarrow\\; \\dot{\\mathbf x}=A\\mathbf x+B(r-K\\mathbf x)=(A-BK)\\mathbf x + Br.$$
즉 ${term("state-feedback")}으로 시스템 행렬이 $A \\to A-BK$로 바뀜. 우리가 손댈 수 있는 건 $K$뿐임.
<br><br>
비유하면 원래 $A$는 "차가 굴러가는 대로"의 자연 동역학이고, $-K\\mathbf x$는 운전자가 <strong>현재 상태(속도·방향)를 보고 핸들을 꺾는</strong> 것. $K$를 잘 잡으면 휘청대던 차($A$의 안 좋은 극)를 안정하게($A-BK$의 좋은 극) 만듦 — ${term("eigenvalue")}가 mode $e^{\\lambda t}$를 정하니, 극을 왼쪽으로 옮길수록 빨리 안정됨.
<br><br>
<strong>핵심 정리:</strong> $\\{A,B\\}$가 controllable이면 ${term("pole-placement", "극배치")}로 $A-BK$의 eigenvalue를 <strong>임의의 위치</strong>에 둘 수 있음(복소근은 켤레쌍으로). controllable이 아니면 안 옮겨지는 mode가 남음(→ ${term("stabilizable")}와 연결).
`)}

<h2>2. 방법 1 — 계수 비교 (단일입력, 시험 메인)</h2>
${defCard("계수 비교 절차", `
단일입력 손계산의 정석. ① $K=[k_1\\ k_2]$로 두고 $A-BK$ 계산 → ② $\\det(sI-(A-BK))$ 전개해 $s$의 다항식 → ③ 원하는 극의 특성다항식 $\\Delta_d(s)$ 전개 → ④ 같은 차수 계수끼리 놓고 연립. 단, 계산 전에 $\\{A,B\\}$가 <strong>controllable인지부터 확인</strong> — 아니면 못 옮기는 극이 있어 계수 비교에서 모순이 남.
`)}

${tryIt("", `$A=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix},\\ B=\\begin{bmatrix}1\\\\0\\end{bmatrix}$ (족보 p3-1(4) 류). 원하는 극 $\\{-2,-4\\}$로 $K=[k_1\\ k_2]$를 구해보라.`, [
  {
    title: "$A-BK$ 만들기",
    body: `$BK=\\begin{bmatrix}1\\\\0\\end{bmatrix}[k_1\\ k_2]=\\begin{bmatrix}k_1 & k_2\\\\0&0\\end{bmatrix}$ 이므로
    $$A-BK=\\begin{bmatrix}-k_1 & 1-k_2\\\\0 & -3\\end{bmatrix}.$$
    $B$의 둘째 성분이 0이라 둘째 행은 안 건드려짐 — 입력이 첫 상태에만 들어가서 그럼. (벌써 수상함.)`
  },
  {
    title: "$\\det(sI-(A-BK))$ 전개",
    body: `하삼각이라 대각곱:
    $$\\det\\begin{bmatrix}s+k_1 & -(1-k_2)\\\\0 & s+3\\end{bmatrix}=(s+k_1)(s+3)=s^2+(k_1+3)s+3k_1.$$`
  },
  {
    title: "계수 비교 → 모순 발견",
    body: `원하는 극 $\\{-2,-4\\}$ → $\\Delta_d(s)=(s+2)(s+4)=s^2+6s+8$.<br>
    • $s^1$: $k_1+3=6 \\Rightarrow k_1=3$<br>
    • $s^0$: $3k_1=8 \\Rightarrow 3\\cdot3=9\\ne8$ — <strong>모순!</strong> 둘째 극이 $-3$에 묶여 안 옮겨짐.`
  },
  {
    title: "원인 — uncontrollable이라 (+ 진짜 시험 형태)",
    body: `${term("controllability-matrix")} $\\mathcal C=[B\\ AB]=\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $\\rho=1\\ne2$ → <strong>uncontrollable</strong>. $\\lambda=-3$은 고정, 옮길 수 있는 건 $-k_1$ 하나뿐이라 원하는 극을 $\\{-2,-3\\}$처럼 잡아야 풀림($k_1=2$).
    <br><br>
    <strong>시험에선 controllable한 $A,B$가 나옴.</strong> 예로 $A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\1\\end{bmatrix}$ (동반형)이면 $A-BK=\\begin{bmatrix}0&1\\\\-2-k_1&-3-k_2\\end{bmatrix}$, $\\det(sI-\\cdot)=s^2+(3+k_2)s+(2+k_1)$이라 계수 비교가 깔끔하게 떨어짐.`
  }
])}

${tryIt("족보 2013 Q3-a", `$A=\\begin{bmatrix}-1&1\\\\0&1\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\1\\end{bmatrix},\\ C=[\\,1\\ 0\\,]$. 폐루프 극을 $\\{-2,-3\\}$으로 만드는 state feedback $K$를 구하라. <em>(같은 시스템이 b·c·d로 이어짐 — Ch8 tracking, observer, Ch9 output feedback에서 계속.)</em>`, [
  {
    title: "controllable 확인",
    body: `$AB=\\begin{bmatrix}-1&1\\\\0&1\\end{bmatrix}\\begin{bmatrix}0\\\\1\\end{bmatrix}=\\begin{bmatrix}1\\\\1\\end{bmatrix}$ → $\\mathcal C=\\begin{bmatrix}0&1\\\\1&1\\end{bmatrix}$, $\\det=-1\\ne0$ → controllable ✓. (eigenvalue $-1,\\,1$ — $\\lambda{=}1$이 unstable이라 안정화가 필요.)`
  },
  {
    title: "$A-BK$ 전개",
    body: `$K=[\\,k_1\\ k_2\\,]$, $BK=\\begin{bmatrix}0&0\\\\k_1&k_2\\end{bmatrix}$ →
    $$A-BK=\\begin{bmatrix}-1&1\\\\-k_1&1-k_2\\end{bmatrix}.$$
    $$\\det(sI-(A-BK))=(s+1)(s-1+k_2)+k_1=s^2+k_2\\,s+(k_2-1+k_1).$$`
  },
  {
    title: "계수 비교 → $K$",
    body: `원하는 $\\Delta_d=(s+2)(s+3)=s^2+5s+6$.<br>
    • $s^1$: $k_2=5$<br>
    • $s^0$: $k_2-1+k_1=6\\Rightarrow 4+k_1=6\\Rightarrow k_1=2$
    $$\\boxed{K=[\\,2\\ \\ 5\\,]}$$
    검산: $A-BK=\\begin{bmatrix}-1&1\\\\-2&-4\\end{bmatrix}$, $\\text{tr}=-5,\\ \\det=6$ → $s^2+5s+6$ ✓.`
  }
])}

<h2>3. 방법 2 — Lyapunov / Sylvester 방정식 (다입력도 가능)</h2>
${defCard("Sylvester 방정식 방법", `
원하는 eigenvalue를 가진 행렬 $F$를 먼저 정하고 ${term("lyapunov-equation")} $AT-TF=B\\bar K$를 풀어 $T$를 구한 뒤 $K=\\bar K\\,T^{-1}$. 그러면
$$(A-BK)T=TF \\;\\Rightarrow\\; A-BK=TFT^{-1}$$
이 ${term("similarity-transform", "닮음변환")}이라 $A-BK$의 eigenvalue $=$ $F$의 eigenvalue. (유도: $\\bar K=KT$를 대입하면 $AT-BKT=TF$, 양변 오른쪽에 $T^{-1}$.)
<br><br>
<strong>교수님 반복 강조 — necessary vs sufficient.</strong> "$\\{A,B\\}$ controllable & $\\{F,\\bar K\\}$ observable이면 $T$가 nonsingular"는 <strong>necessary 조건이지 sufficient가 아님.</strong> 만족해도 $T$가 singular일 수 있고, 그러면 $\\bar K$를 다른 값으로 다시 잡아 재시도. 단답으로 이 구분을 묻기도 하니 문장째 외워둘 것.
<br><br>
또 $F$의 eigenvalue가 $A$의 eigenvalue와 <strong>겹치면 안 됨</strong> — 겹치면 $AT-TF=B\\bar K$가 유일해를 못 가짐(실무에선 $-1\\to-1.01$로 살짝 옮겨 회피). 방법 1이 단일입력 손계산용이라면, 방법 2는 선형 대수방정식이라 차수가 커지거나 <strong>다입력</strong>일 때 전산으로 풀기 좋음.
`)}

${note(`<strong>📝 족보 2015 Q4 (서술형):</strong> "Lyapunov 방정식으로 eigenvalue를 배치하는 방법을 설명하라." → 위 4단계(① 원하는 극의 $F$ 설계 → ② $\\{F,\\bar K\\}$ observable하게 $\\bar K$ → ③ $AT-TF=B\\bar K$로 $T$ → ④ $K=\\bar K T^{-1}$)를 적고, 조건($A,F$ 공통 eigenvalue 금지, $T$ nonsingular은 necessary)을 덧붙이면 만점.`, "tip")}

<h2>4. Feedforward gain — 정상상태 추종</h2>
${defCard("Feedforward gain $p$", `
$\\mathbf u=r-K\\mathbf x$만 쓰면 폐루프 DC gain이 1이 아니라 $y(\\infty)\\ne r$. 그래서 ${term("feedforward-gain")} $p$를 붙임:
$$\\mathbf u=pr-K\\mathbf x,\\qquad p=\\frac1{G_{cl}(0)},\\quad G_{cl}(s)=C(sI-(A-BK))^{-1}B.$$
${term("final-value-theorem")}로 step 입력 $r/s$에 대해 $y(\\infty)=p\\,G_{cl}(0)\\,r$이니, $p=1/G_{cl}(0)$이면 DC gain이 1이 되어 $y(\\infty)=r$ (단 폐루프가 안정해야 최종값 정리가 유효).
<br><br>
<strong>주의 — $K$는 무작정 크게 못 잡음.</strong> $K$를 키워 극을 멀리 왼쪽으로 보내면 빨라지지만 초기 입력 $u$가 폭발함. 비행기 에일러론은 물리적으로 $\\pm15^\\circ$밖에 못 꺾는데 제어기가 $+60^\\circ$를 명령하면 포화(saturation)돼 설계대로 안 움직임. (반면 ${term("state-estimator", "observer")}의 $L$은 소프트웨어 계산이라 크게 잡아도 됨 — 다음 페이지의 비대칭 포인트.)
`)}

<h2>5. 체크</h2>
${mcQuiz(
  "$\\{A,B\\}$가 controllable일 때 state feedback $u=r-Kx$로 할 수 있는 것은?",
  ["$A-BK$의 eigenvalue를 임의의 위치로 배치", "$B$를 바꿔 입력 채널 추가", "관측 안 되는 상태 추정", "전달함수의 zero를 임의로 배치"],
  0,
  "controllable ⟺ 폐루프 극 임의배치. zero는 $C,B$ 구조라 state feedback으로 자유롭게 못 옮김(극만 옮김)."
)}

${mcQuiz(
  "Lyapunov 방법에서 $F$의 eigenvalue 선택 시 반드시 피해야 하는 것은?",
  ["$F$를 대각행렬로", "$F$의 eigenvalue가 $A$의 eigenvalue와 겹치는 것", "$F$를 stable하게", "$F$를 2×2로"],
  1,
  "$A$와 $F$가 공통 eigenvalue면 Sylvester 방정식 $AT-TF=B\\bar K$가 유일해를 못 가짐. 겹치면 살짝 옮김."
)}

${mcQuiz(
  "feedforward gain $p$를 $1/G_{cl}(0)$로 잡는 이유는?",
  ["폐루프를 안정화", "극을 더 왼쪽으로", "정상상태에서 $y(\\infty)=r$ (DC gain을 1로)", "saturation 방지"],
  2,
  "$y(\\infty)=p\\,G_{cl}(0)\\,r$이라 $p=1/G_{cl}(0)$이면 DC gain 1 → step 추종. 안정화는 $K$의 몫."
)}

${note(`<strong>정리:</strong> controllable이면 $K$로 폐루프 극을 임의 배치 — 방법1(계수비교)은 단일입력 손계산, 방법2(Lyapunov)는 다입력·전산용. $p=1/G_{cl}(0)$로 DC gain까지 맞추면 step 추종. 단 $p$는 <strong>모델이 정확해야</strong> 맞음 — 모델이 틀리거나 외란이 있으면? 다음은 적분기로 강인하게 추종하는 ${term("robust-tracking", "Robust Tracking & 적분제어")}!`, "tip")}
`);
