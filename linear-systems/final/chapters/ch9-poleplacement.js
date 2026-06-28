registerPage("ch9-poleplacement", "Coprime Fraction 극배치", () => `
<h1>Ch 9 — Coprime Fraction 극배치 (Sylvester)</h1>
<p class="lead">${tag("매우 출제 유력", "must")} ${tag("Ch9 핵심", "exam")} 교수님이 0526·0528 두 번 같은 예제로 풀어줌. <strong>거의 확정으로 나온다고 보고 절차를 손에 익혀야 함.</strong></p>

${profMemo(`<strong>"중학생도 푸는 연립방정식 낸다"</strong>는 게 교수님 워딩. 행렬 세우고($S_m$) 계수 비교해서 연립 푸는 게 전부임. 손계산으로 깔끔히 떨어지게 출제하니 ① 전달함수 → $N,D$ 계수 뽑기 ② 제어기 차수 $m=n-1$ 정하기 ③ $F=DA+NB$ 전개해 계수 비교 ④ 연립 풀기 — 이 4단계를 기계적으로. 마지막에 $F(s)$ 전개로 검산까지 하면 만점.`)}

${recall("이 페이지에 필요한 선행 개념", "여기선 상태공간 대신 <strong>전달함수 $G(s)=N/D$로만</strong> 설계함. 전달함수↔실현 변환과 다항식 계수 비교가 흐릿하면 복습.", [["ch4-realization", "전달함수 · 실현 복습"]])}

<h2>1. 구조 — 플랜트와 제어기를 분수로</h2>
${defCard("Coprime Fraction 설계", `
플랜트 ${term("transfer-function", "전달함수")}를 분수로 $G(s)=\\dfrac{N(s)}{D(s)}$ (분모 차수 $n$, ${term("coprime", "coprime")} 가정), 제어기도 $C(s)=\\dfrac{B(s)}{A(s)}$ (차수 $m$). 단위궤환(unity feedback)으로 닫으면 폐루프 ${term("characteristic-polynomial", "특성다항식")}은
$$\\boxed{F(s)=D(s)A(s)+N(s)B(s)}$$
이 $F(s)$를 <strong>우리가 원하는 극의 다항식</strong>과 같게 만드는 $A,B$를 구하는 게 ${term("coprime-fraction", "극배치")}임.
<br><br>
상태궤환(Ch8)은 상태 $\\mathbf x$를 다 측정해야 했지만, 여기선 <strong>입출력 전달함수만</strong> 갖고 설계함 — 측정 가능한 $y$만 쓰는 출력궤환이라 현실적임.
`)}

<h2>2. Sylvester 행렬 $S_m$과 해 존재 조건</h2>
${defCard("$S_m$과 Theorem 9.M", `
$F=DA+NB$는 다항식 항등식이라, 양변의 $s$ 차수별 계수를 맞추면 $A,B$ 계수에 대한 <strong>선형 연립방정식</strong>이 됨. 그 계수행렬이 ${term("sylvester-resultant", "Sylvester resultant matrix")} $S_m$ — $D$ 계수 열과 $N$ 계수 열을 <strong>한 칸씩 아래로 shift</strong>하며 번갈아 쌓음. 제어기 차수 $m$이면 미지수 $2(m{+}1)$개, $S_m$은 $(n{+}m{+}1)\\times 2(m{+}1)$.
$$S_m\\,\\begin{bmatrix}a_0\\\\b_0\\\\a_1\\\\b_1\\\\\\vdots\\end{bmatrix}=\\begin{bmatrix}f_0\\\\f_1\\\\\\vdots\\\\f_{n+m}\\end{bmatrix}\\quad(F\\text{의 계수}).$$
<strong>해 존재 조건 (Theorem 9.M):</strong> $S_m$이 <strong>full column rank</strong>여야 임의의 $F$에 대해 해가 존재함. 그러려면 ① 제어기 차수 $m\\ge n-1$ ② $D,N$이 coprime. 이 둘이면 $m=n-1$에서 $S_m$이 정방·nonsingular라 <strong>유일해</strong>가 나옴(coprime이 곧 ${term("bezout", "Bezout")} 존재성).
<br><br>
<strong>왜 $m\\ge n-1$?</strong> $F$ 차수가 $n+m$이라 계수가 $n+m+1$개, 미지수는 $2(m+1)$개. 미지수 ≥ 식이려면 $2(m+1)\\ge n+m+1 \\Rightarrow m\\ge n-1$. 직관: 원하는 극을 다 박으려면 제어기에 다이얼이 충분히 많아야 함.
`)}

<h2>3. ⭐ 핵심 예제 — $G(s)=\\dfrac{s-2}{s^2-1}$</h2>
${tryIt("", `교수님이 두 번 푼 그 예제. $G(s)=\\dfrac{s-2}{s^2-1}$ ($n=2$)에 극 $\\{-1,-2,-3\\}$을 배치하라. ($m=n-1=1$, 제어기 1차.)`, [
  {
    title: "$N,D$ 계수 뽑기 + 제어기 차수",
    body: `$$N(s)=s-2=-2+1\\cdot s,\\qquad D(s)=s^2-1=-1+0\\cdot s+1\\cdot s^2.$$
    $n=2$ → $m=n-1=1$. 제어기 $A(s)=a_0+a_1s,\\ B(s)=b_0+b_1s,\\ C=\\dfrac{B}{A}$. 미지수 4개.<br>
    coprime 확인: $D=0$의 근 $\\pm1$, $N=0$의 근 $2$ → 공통근 없음 → <strong>coprime ✓</strong> → $m=1$에서 유일해.`
  },
  {
    title: "원하는 특성다항식 $F(s)$",
    body: `폐루프 차수 $n+m=3$. 극 $\\{-1,-2,-3\\}$이면
    $$F(s)=(s+1)(s+2)(s+3)=s^3+6s^2+11s+6.$$
    계수 $f_0=6,\\ f_1=11,\\ f_2=6,\\ f_3=1$ ($s^0\\!\\to\\!s^3$).`
  },
  {
    title: "$F=DA+NB$ 전개",
    body: `$$DA=(-1+s^2)(a_0+a_1s)=-a_0-a_1s+a_0s^2+a_1s^3$$
    $$NB=(-2+s)(b_0+b_1s)=-2b_0+(b_0-2b_1)s+b_1s^2$$
    차수별로 모으면 $F=(-a_0-2b_0)+(-a_1+b_0-2b_1)s+(a_0+b_1)s^2+a_1s^3$.`
  },
  {
    title: "계수 비교 → Sylvester 연립",
    body: `$F$ 계수 $=\\{6,11,6,1\\}$로 놓으면:
    ${matrix([
      ["-1","0","-2","0","a_0","6"],
      ["0","-1","1","-2","a_1","11"],
      ["1","0","0","1","b_0","6"],
      ["0","1","0","0","b_1","1"]
    ])}
    왼쪽 $4\\times4$가 $S_m$. 식으로:
    $$\\begin{aligned}-a_0-2b_0&=6\\\\-a_1+b_0-2b_1&=11\\\\a_0+b_1&=6\\\\a_1&=1\\end{aligned}$$`
  },
  {
    title: "연립 풀기",
    body: `$a_1=1$. 셋째 식 $a_0=6-b_1$. 첫째 식에 넣으면 $b_1-2b_0=12$, 둘째 식은 $b_0-2b_1=12$. 두 식을 빼면 $b_1=b_0$, 대입하면 $-b_0=12$ → $b_0=b_1=-12$, $a_0=6-(-12)=18$.
    $$\\boxed{a_0=18,\\ a_1=1,\\ b_0=-12,\\ b_1=-12}$$`
  },
  {
    title: "제어기 + 검산",
    body: `$$\\boxed{C(s)=\\frac{B}{A}=\\frac{-12s-12}{s+18}=\\frac{-12(s+1)}{s+18}}$$
    검산: $DA=(s^2-1)(s+18)=s^3+18s^2-s-18$, $NB=(s-2)(-12s-12)=-12s^2+12s+24$. 합 $=s^3+6s^2+11s+6$ ✓ — 원하던 $(s+1)(s+2)(s+3)$ 그대로.`
  },
  {
    title: "Tracking 확인 (DC gain)",
    body: `폐루프 $r\\to y$는 $\\dfrac{NB}{F}$. ${term("final-value-theorem", "최종값 정리")}로 step 정상값 = DC gain:
    $$\\left.\\frac{NB}{F}\\right|_{s=0}=\\frac{(-2)(-12)}{6}=4\\ne1.$$
    극은 원하는 대로 갔지만 <strong>DC gain이 1이 아니라 step을 정확히 추종 못 함</strong>. 극배치는 <strong>극 위치(안정성)만</strong> 보장하니, 정확 추종하려면 ${term("feedforward-gain", "전향이득")}을 곱하거나 ${term("internal-model-principle", "internal model")}(적분기)을 넣어야 함 — 바로 다음 페이지.`
  },
])}

${tryIt("족보 2013 Q3-d·e", `Q3의 $A=\\begin{bmatrix}-1&1\\\\0&1\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\1\\end{bmatrix},\\ C=[1\\ 0]$을 <strong>output feedback</strong>(전달함수 제어기)으로 극 $\\{-2,-3\\}$에 배치하라. 그리고 a)의 state feedback과 비교(e).`, [
  {
    title: "플랜트 전달함수 $G(s)$",
    body: `$sI-A=\\begin{bmatrix}s+1&-1\\\\0&s-1\\end{bmatrix}$, $(sI-A)^{-1}B=\\dfrac1{(s+1)(s-1)}\\begin{bmatrix}1\\\\s+1\\end{bmatrix}$ →
    $$G(s)=C(sI-A)^{-1}B=\\frac{1}{s^2-1}.$$
    $N=1,\\ D=s^2-1$ ($n=2$), coprime ✓.`
  },
  {
    title: "제어기 차수 + 극 개수",
    body: `$m=n-1=1$ → 제어기 $C(s)=\\dfrac{B_c}{A_c}=\\dfrac{b_0+b_1s}{a_0+a_1s}$. 폐루프 차수 $n+m=3$ → <strong>극 3개</strong>가 필요함. 원하는 $-2,-3$에 더해 셋째 극을 stable하게(예: $-4$) 잡아야 함.<br>
    $$F=(s+2)(s+3)(s+4)=s^3+9s^2+26s+24.$$`
  },
  {
    title: "$F=DA_c+NB_c$ 전개·비교",
    body: `$$DA_c+NB_c=(s^2-1)(a_0+a_1s)+(b_0+b_1s)=a_1s^3+a_0s^2+(b_1-a_1)s+(b_0-a_0).$$
    $s^3{:}\\ a_1=1$, $s^2{:}\\ a_0=9$, $s^1{:}\\ b_1-a_1=26\\Rightarrow b_1=27$, $s^0{:}\\ b_0-a_0=24\\Rightarrow b_0=33$.
    $$\\boxed{C(s)=\\frac{27s+33}{s+9}}$$`
  },
  {
    title: "(e) state feedback(a)과 비교",
    body: `<strong>a) state feedback</strong> $u=-Kx$: 정적 이득 $K=[2\\ 5]$ 하나로 극 2개를 바로 배치 — 단 <strong>상태 $x$ 전부 측정</strong> 필요.<br>
    <strong>d) output feedback</strong>: 출력 $y$만 쓰지만 <strong>1차 동적 제어기</strong>(분모 $s+9$)가 붙어 폐루프 차수가 3으로 늘고 <strong>여분의 극을 추가 지정</strong>해야 함.<br>
    본질: output feedback ≈ <strong>state feedback + observer</strong>(추정기로 못 보는 상태를 복원). 측정 비용 ↓ 대신 제어기 동역학·차수 ↑ — ${term("separation-principle", "separation")}로 둘을 따로 설계한 게 이 동적 제어기와 같은 얘기.`
  }
])}

<h2>4. Mason's Gain Rule (보조 도구)</h2>
${defCard("Mason 이득 공식", `
블록선도에서 입력→출력 전달함수를 한 번에 구하는 공식 — ${term("mason-gain", "Mason's Gain Rule")}:
$$T=\\frac{\\sum_k P_k\\,\\Delta_k}{\\Delta},\\qquad \\Delta=1-\\sum_i L_i+\\sum_{i,j}L_iL_j-\\cdots$$
$P_k$는 $k$번째 forward path(입력→출력) 이득, $L_i$는 loop 이득, $\\Delta_k$는 $P_k$에 <strong>안 닿는(non-touching)</strong> loop만 남긴 $\\Delta$.
<br><br>
단순 단위궤환 예: $G$ 앞에 $C$, 음의 단위궤환이면 forward path $P_1=CG$ 하나, loop $L_1=-CG$ 하나. $\\Delta=1-L_1=1+CG$, $P_1$이 그 loop에 닿으니 $\\Delta_1=1$ → $T=\\dfrac{CG}{1+CG}$. 익숙한 폐루프 공식이 그대로 나옴 — $\\frac{NB}{DA+NB}$ 같은 식 손유도할 때 씀.
`)}

<h2>5. 시험 직전 체크</h2>
${mcQuiz(
  "플랜트 차수 $n=3$, $N,D$ coprime일 때 임의 극배치를 위한 제어기 최소 차수 $m$은?",
  ["$m=1$", "$m=2$", "$m=3$", "$m=n=3$"],
  1,
  "$m\\ge n-1=2$. coprime이면 $m=n-1=2$에서 $S_m$이 정방·nonsingular라 유일해가 나옴."
)}

${mcQuiz(
  "$F(s)=D(s)A(s)+N(s)B(s)$에서 $F$가 의미하는 것은?",
  ["플랜트의 극다항식", "폐루프 특성다항식 (원하는 극)", "제어기 분자", "제어기 분모"],
  1,
  "$F$는 닫힌 루프의 특성다항식. 이 $F$를 원하는 극의 곱으로 잡고 $A,B$를 역으로 구하는 게 극배치."
)}

${mcQuiz(
  "Sylvester 행렬 $S_m$이 full column rank가 아니면(=$N,D$가 공통근으로 약분되면)?",
  ["여전히 항상 유일해", "임의의 $F$에 대해 해가 존재하지 않을 수 있음", "제어기 차수를 낮추면 됨", "Mason 공식을 써야 함"],
  1,
  "rank가 부족하면 어떤 원하는 극($=F$)은 만들 수 없음. 이게 $D,N$ coprime을 요구하는 이유고, 약분된 unstable mode는 total stability도 깨뜨림."
)}

${mcQuiz(
  "위 예제에서 극은 원하는 대로 갔는데 step 추종오차가 남는 근본 이유는?",
  ["제어기가 unstable해서", "폐루프 DC gain $\\tfrac{N(0)B(0)}{F(0)}\\ne1$ 이라서", "Sylvester 행렬이 singular라서", "플랜트가 non-minimum phase라서"],
  1,
  "극배치는 극 위치만 맞춤. DC gain이 1이 아니면 정상상태에서 $y\\ne r$. 적분기(internal model)나 feedforward gain으로 보정해야 함."
)}

${note(`<strong>정리:</strong> $G=N/D$ coprime이면 $m=n-1$ 제어기로 $F=DA+NB$를 원하는 극다항식과 계수 비교 → 유일해. 손계산은 ①계수뽑기 ②$m$정하기 ③전개·비교 ④연립 ⑤검산. 단 극만 맞춰선 DC gain≠1이라 추종이 안 됨 — 다음은 적분기를 박아 강인하게 추종하는 ${term("internal-model-principle", "Internal Model & Robust Tracking")}!`, "tip")}
`);
