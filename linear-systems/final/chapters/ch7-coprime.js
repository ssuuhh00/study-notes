registerPage("ch7-coprime", "Minimal Realization & Coprimeness", () => `
<h1>Ch 7 — Minimal Realization & Coprimeness (최소실현·서로소)</h1>
${note(`<strong>⚠️ 이번 기말 시험범위 아님</strong> — 교수님 복습강의(0609)에서 시험은 <strong>6·8·9장</strong>이라고 명시. 다만 <strong>coprime(서로소) 개념은 Ch9 극배치의 해 존재 조건</strong>으로 계속 쓰이고, 최소실현(=controllable & observable)도 Ch6 Kalman 분해와 직결되니 <strong>개념만 가볍게 참고</strong>할 것. 손계산 연습은 6·8·9장에 집중.`, "warn")}
<p class="lead">${tag("시험 제외", "concept")} coprimeness 판정과 minimal realization 차수 — 시험엔 안 나오지만 <strong>Ch9 극배치의 해 존재 조건이 바로 coprime</strong>이라 개념은 알아두면 좋음.</p>

${profMemo(`이 단원은 계산이 무겁지 않음. "공통근 있냐 없냐" 그 하나를 여러 방법으로 확인하는 게 전부임. 대신 <strong>왜</strong> 공통근이 중요한지 묻는 서술/개념 문제가 잘 나옴 — pole-zero cancellation → not minimal → Ch9 total stability 깨짐, 이 연결고리를 한 문장으로 말할 수 있으면 끝남.`)}

${recall("이 페이지에 필요한 선행 개념", "최소실현은 <strong>전달함수 $G(s)=N/D$ ↔ 상태공간 실현</strong> 사이의 이야기임. 실현(realization)과 내부안정이 흐릿하면 먼저 복습하고 올 것.", [["ch4-realization", "실현(realization) 복습"], ["ch5-internal", "내부안정 복습"]])}

<h2>1. Minimal Realization (최소실현)</h2>
${defCard("Minimal Realization", `
전달함수 $G(s)$를 실현(realize)하는 상태공간 $(A,B,C,D)$는 무수히 많음. 그중 <strong>차수($A$의 크기)가 가장 작은</strong> 것이 ${term("minimal-realization")}임.
$$G(s) = C(sI-A)^{-1}B + D \\quad\\text{를 실현하는 최소 차수 } (A,B,C,D)$$
판정은 한 줄로 끝남:
$$(A,B,C,D)\\text{ minimal} \\iff \\{A,B\\}\\ controllable \\;\\textbf{AND}\\; \\{A,C\\}\\ observable.$$
즉 가제어성(${term("controllability")})과 가관측성(${term("observability")})을 <strong>동시에</strong> 만족해야 함.
<br><br>
<strong>왜 둘 다?</strong> controllable이 아니면 입력이 못 건드리는 mode가 있고, observable이 아니면 출력에 안 비치는 mode가 있음. 둘 중 하나라도 빠진 mode는 입력→출력 $G(s)$에 아예 안 나타나니, 그냥 빼버려도 같은 $G(s)$가 나옴 — 차수를 더 줄일 수 있다는 뜻이라 minimal이 아님.
`)}

<h2>2. 최소 차수 = 기약분수 분모 차수 (SISO)</h2>
${defCard("최소 차수 구하기 — 약분 끝까지", `
스칼라(SISO)면 위 판정을 계산할 것도 없이 분수만 보면 됨. $G(s)=\\dfrac{N(s)}{D(s)}$를 <strong>약분 끝까지 한 기약분수(irreducible)</strong>로 줄였을 때, 그 <strong>분모 차수</strong>가 곧 minimal 차수임.
$$\\deg(\\text{minimal}) = \\deg\\big(D_{\\text{기약}}(s)\\big)$$
이게 controllable & observable과 같은 말인 이유: $G=N/D$를 controllable canonical form으로 실현하면 차수가 $\\deg D$이고 항상 controllable임. 여기에 $N,D$의 공통근이 없을 때 비로소 observable도 됨. 공통근 $s=p$가 있으면 그 $p$가 "uncontrollable이거나 unobservable한 mode"로 나타나 입출력에 안 비치고, 약분하면 사라짐. 그래서 <strong>약분이 다 끝난(=공통근 없는) 분모 차수</strong>가 최소 차수가 됨.
<br><br>
그래서 위험 신호가 하나 있음: $N,D$가 공통근을 가지면(=약분되면) 그건 ${term("pole-zero-cancellation")}이고, 그 실현은 <strong>minimal이 아님</strong>. 특히 <strong>unstable한($\\text{Re}\\ge0$) pole-zero가 약분</strong>되면 겉보긴 안정해 보여도 그 mode가 noise를 타고 발산해 Ch9의 ${term("total-stability")}까지 깨짐.
`)}

${tryIt("", `$G(s)=\\dfrac{s+1}{(s+1)(s+2)}$의 minimal realization 차수는? <strong>약분 → 기약분수 → 분모 차수</strong> 순으로.`, [
  {
    title: "겉보기 차수부터",
    body: `$$G(s)=\\frac{s+1}{(s+1)(s+2)}=\\frac{s+1}{s^2+3s+2}.$$
    분모를 전개하면 $s^2+3s+2$ → <strong>겉보기 차수 2</strong>. 하지만 이게 minimal이라고 단정하면 안 됨 — 먼저 약분되는지 확인.`
  },
  {
    title: "공통근(공통인수) 찾기",
    body: `$N=s+1$의 근 $\\{-1\\}$, $D=(s+1)(s+2)$의 근 $\\{-1,-2\\}$.<br>
    $s=-1$이 <strong>분자·분모에 동시에</strong> 있음 → 공통근! → pole-zero cancellation이라 원래 2차 실현은 minimal이 아님.`
  },
  {
    title: "약분해서 기약분수로",
    body: `공통인수 $(s+1)$ 약분:
    $$G(s)=\\frac{\\cancel{(s+1)}}{\\cancel{(s+1)}(s+2)}=\\frac{1}{s+2}.$$
    분자 $1$(근 없음)과 분모 $s+2$(근 $-2$)는 공통근이 없음 → <strong>coprime, 기약분수 완성</strong>.`
  },
  {
    title: "분모 차수 = minimal 차수",
    body: `기약분수 $\\dfrac{1}{s+2}$의 분모는 1차.
    $$\\therefore\\ \\deg(\\text{minimal}) = 1.$$
    겉보기 2차였지만 약분된 mode($s=-1$) 하나가 uncontrollable-or-unobservable이라 빠지고 <strong>최소 차수는 1</strong>. 실현 예: $A=-2,\\,B=1,\\,C=1,\\,D=0$ → $C(sI-A)^{-1}B=\\dfrac{1}{s+2}$ ✓<br>
    (반대로 $G=\\dfrac{s+1}{(s+2)(s+3)}$처럼 약분이 안 되면 겉보기 차수 2가 그대로 minimal 차수임.)`
  },
])}

<h2>3. Coprime (서로소)</h2>
${defCard("Coprime", `
앞에서 "약분되면 minimal이 아니다"를 봤음. 그 <strong>"약분 안 되는 상태"</strong>에 이름을 붙인 게 coprime임. 두 다항식 $N(s),D(s)$가 <strong>공통근(common root)을 하나도 안 가지면</strong> ${term("coprime")}(서로소).
$$N(s),\\,D(s)\\text{ coprime} \\iff \\text{공통근 없음} \\iff \\dfrac{N}{D}\\text{가 이미 기약분수}.$$
한 줄 직관: coprime = "약분 안 됨". 더 줄일 게 없으니 그 분모 차수가 그대로 minimal 차수가 됨. 그래서 <strong>"minimal realization 차수 구하기" 문제는 결국 "$N,D$가 coprime이 되도록 약분한 뒤 분모 차수 세기"와 같은 일</strong>임.
`)}

<h2>4. Coprime 판정 3가지</h2>
<table>
  <tr><th>방법</th><th>아이디어</th><th>언제 쓰나</th></tr>
  <tr><td>① 공통인수 직접 확인</td><td>$N,D$의 근을 나열해 겹치는 근이 있나 본다</td><td>손계산 2~3차, 시험 기본 (아래 예제)</td></tr>
  <tr><td>② Sylvester resultant</td><td>${term("sylvester-resultant")} $\\ne 0$ ⟺ coprime</td><td>인수분해 귀찮은 고차, 기계적 판정</td></tr>
  <tr><td>③ ${term("bezout", "Bezout 항등식")}</td><td>$A(s)N(s)+B(s)D(s)=1$ 해 존재 ⟺ coprime</td><td>이론적 근거, Ch9 극배치로 연결</td></tr>
</table>

${defCard("② Sylvester Resultant", `
$D,N$의 계수를 한 칸씩 밀어가며 쌓은 정방행렬 ${term("sylvester-resultant")}의 행렬식(resultant)을 봄.
$$\\text{Resultant}(N,D)\\ne 0 \\iff N,D\\text{ coprime}.$$
근을 직접 안 구해도 되니 인수분해가 어려운 고차에서 편함. 작은 예로 $N=s+1$(계수 $[1,1]$), $D=s+2$(계수 $[1,2]$)면
$$S=\\begin{bmatrix}1&2\\\\1&1\\end{bmatrix},\\quad \\det S=-1\\ne0 \\Rightarrow \\text{coprime}$$
(실제 근 $-1,-2$로 다름). 반대로 $N=D=s+1$이면 $S=\\begin{bmatrix}1&1\\\\1&1\\end{bmatrix}$, $\\det=0$ → 공통근 있음($-1$) → not coprime.
`)}

${defCard("③ Bezout 항등식", `
$N,D$가 coprime ⟺ 어떤 다항식 $A(s),B(s)$가 존재해 $A(s)N(s)+B(s)D(s)=1$을 만족함. 이게 ${term("bezout", "Bezout(베주) 항등식")}임.
<br><br>
직관은 <strong>정수의 $\\gcd$와 똑같음</strong>: $\\gcd(N,D)=1$일 때만 $aN+bD=1$ 해가 있음(예 $\\gcd(3,5)=1$이라 $2\\cdot3+(-1)\\cdot5=1$). 공통근 $p$가 있으면 $s=p$에서 좌변이 $0$이라 절대 $1$이 못 됨.
<br><br>
이게 <strong>Ch9 극배치의 뿌리</strong>임: ${term("coprime-fraction", "coprime fraction")} 설계에서 제어기 계수를 $D(s)A(s)+N(s)B(s)=F(s)$로 푸는데($F$는 원하는 극의 다항식), $N,D$가 coprime이면 우변을 <strong>임의의 $F$</strong>로 바꿔도 항상 해가 존재함(${term("sylvester-resultant")}가 full rank). 즉 "$N,D$ coprime ⟹ 원하는 극을 항상 배치 가능"이 Ch9 핵심 정리고, 그 근거가 바로 Bezout임.
`)}

${tryIt("", `족보 p3-4: $G(s)=\\dfrac{1}{s+1}$, $H(s)=\\dfrac{(s+3)(s+4)}{(s+1)(s+2)}$ — 직렬 연결 시 약분(공통근)되는 게 있나? 즉 coprime인가? <strong>무엇과 무엇</strong>의 공통근을 보는지가 함정.`, [
  {
    title: "각 다항식의 분자·분모 분리",
    body: `coprime은 <strong>두 다항식</strong> 사이 성질이고, 직렬 연결의 약분은 "한쪽 분자 vs 다른 쪽 분모"가 같은 근을 가질 때 일어남.<br>
    $G=\\dfrac{N_G}{D_G}=\\dfrac{1}{s+1}$, $H=\\dfrac{N_H}{D_H}=\\dfrac{(s+3)(s+4)}{(s+1)(s+2)}$.`
  },
  {
    title: "근(roots) 나열",
    body: `$N_G=1$: 근 없음. $D_G=s+1$: 근 $\\{-1\\}$.<br>
    $N_H=(s+3)(s+4)$: 근 $\\{-3,-4\\}$. $D_H=(s+1)(s+2)$: 근 $\\{-1,-2\\}$.`
  },
  {
    title: "함정 — 공통근을 어디서 찾나",
    body: `$D_G$와 $D_H$가 둘 다 $s=-1$을 가지지만 이건 <strong>분모끼리</strong>라 약분 대상이 아님(분자×분모로 만나야 cancellation).<br>
    실제로 봐야 할 건:<br>
    • $N_G=1$ vs $D_H=(s+1)(s+2)$ → $N_G$엔 근이 없어 공유 불가.<br>
    • $N_H=(s+3)(s+4)$ vs $D_G=s+1$ → $\\{-3,-4\\}$ vs $\\{-1\\}$, 안 겹침.`
  },
  {
    title: "결론 — coprime",
    body: `분자 쪽 근과 분모 쪽 근이 하나도 안 겹침 → 약분되는 pole-zero 없음 → <strong>coprime</strong>.
    $$\\therefore\\ \\text{공통근 없음} \\Rightarrow \\textbf{coprime}.$$
    <strong>답안 팁:</strong> "근 나열 → 분자근·분모근 안 겹침 → 공통근 없음 → coprime" 이 4줄이면 만점. $s=-1$이 분모끼리 겹친다고 "약분된다"고 쓰면 감점임 — 분자·분모가 만나야 약분.`
  },
])}

<h2>5. 큰 그림 — 왜 이게 Ch9로 이어지나</h2>
${defCard("연결고리 한눈에", `
<strong>coprime / minimal</strong> → <strong>pole-zero cancellation 없음</strong> → <strong>total stability 안전</strong> → <strong>극배치 해 존재</strong>.
<br><br>
• not coprime(약분됨) ⟹ realization not minimal.<br>
• 특히 <strong>unstable</strong> pole-zero가 약분 ⟹ ${term("total-stability")} 깨짐(noise로 발산).<br>
• $N,D$ coprime ⟹ ${term("bezout")}/${term("sylvester-resultant")}로 ${term("pole-placement", "극배치")} 해가 항상 존재(${term("coprime-fraction")}, Ch9).
<br><br>
시험용 한 문장: <strong>"$N,D$가 coprime이어야 minimal이 되고, 그래야 unstable pole-zero cancellation 없이 원하는 극을 안정적으로 배치할 수 있음."</strong> 이걸 말로 풀어낼 수 있으면 이 단원은 졸업임.
`)}

<h2>6. 체크</h2>
${mcQuiz(
  "$G(s)=\\dfrac{s+2}{(s+2)(s-1)}$의 minimal realization 차수는?",
  ["2", "1", "3", "0"],
  1,
  "분자근 $\\{-2\\}$, 분모근 $\\{-2,1\\}$ → $s=-2$가 공통근이라 약분됨. $G=\\dfrac{1}{s-1}$ → 기약분수 분모 $s-1$은 1차. 따라서 minimal 차수 = <strong>1</strong>. (덤: 약분된 게 $s=-2$로 stable이라 total stability엔 문제 없지만, minimal이 아닌 건 분명.)"
)}

${mcQuiz(
  "$N(s)=s+3$, $D(s)=s^2+5s+6$이 coprime인지 판정하면?",
  [
    "coprime이다 (공통근 없음)",
    "coprime 아니다 ($s=-3$이 공통근)",
    "coprime 아니다 ($s=-2$가 공통근)",
    "판정 불가"
  ],
  1,
  "$D=s^2+5s+6=(s+2)(s+3)$, 근 $\\{-2,-3\\}$. $N=s+3$의 근 $\\{-3\\}$. $s=-3$이 양쪽 공통 → 약분됨 → <strong>coprime 아님</strong>. (Sylvester로 봐도 resultant $=0$.)"
)}

${mcQuiz(
  "$(A,B,C,D)$가 minimal realization일 필요충분조건은?",
  [
    "$\\{A,B\\}$ controllable만 하면 된다",
    "$\\{A,C\\}$ observable만 하면 된다",
    "$\\{A,B\\}$ controllable 그리고 $\\{A,C\\}$ observable",
    "$A$가 stable이기만 하면 된다"
  ],
  2,
  "minimal ⟺ controllable <strong>AND</strong> observable. 둘 중 하나라도 빠지면 입출력에 안 비치는 mode가 있어 차수를 더 줄일 수 있다 = minimal 아님."
)}

${mcQuiz(
  "다항식 $N,D$에 대해 Bezout 항등식 $A(s)N(s)+B(s)D(s)=1$의 해 $A,B$가 존재한다는 것은?",
  [
    "$N,D$가 coprime이라는 뜻",
    "$N,D$가 공통근을 가진다는 뜻",
    "$N=D$라는 뜻",
    "항상 성립하므로 아무 정보도 없다"
  ],
  0,
  "Bezout 항등식의 해 존재 ⟺ $N,D$ coprime. 공통근 $p$가 있으면 $s=p$에서 좌변이 $0$이 되어 절대 $1$이 될 수 없음. 이게 Ch9 극배치 해 존재성($DA+NB=F$)의 근거임."
)}

${note(`<strong>정리:</strong> $N,D$가 <strong>coprime ⟺ 기약분수 ⟺ minimal realization</strong>. 약분되는 pole-zero가 있으면 not minimal이고, unstable 약분이면 Ch9의 ${term("total-stability", "total stability")}까지 깨짐. 다음은 상태를 직접 되먹여 극을 옮기는 ${term("state-feedback", "State Feedback 극배치")}!`, "tip")}
`);
