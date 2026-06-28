registerPage("ch9-internal-model", "Robust Tracking & Internal Model", () => `
<h1>Ch 9 — Robust Tracking & Internal Model Principle</h1>
<p class="lead">${tag("출제 가능", "exam")} ${tag("개념+설계", "concept")} 교수님이 "이거 기억해야 된다"고 강조한 부분. 앞 페이지 극배치에 <strong>적분기(internal model)</strong>를 더하는 이야기.</p>

${profMemo(`핵심 메시지: <strong>극배치만으론 정상상태 추종이 안 됨</strong>(DC gain≠1, 게다가 플랜트가 조금만 변해도 어긋남). 해결책은 레퍼런스/외란의 unstable mode를 제어기 분모에 박는 것 = ${term("internal-model-principle", "Internal Model Principle")}. step이면 $\\phi(s)=s$(적분기), PID의 I가 이거임. 시험엔 ① 개념 단답(왜 robust한가, $\\phi$는 뭔가) ② 적분기 포함 제어기 설계가 나올 수 있음.`)}

${recall("이 페이지에 필요한 선행 개념", "추종오차(DC gain) 확인은 <strong>최종값 정리</strong>로 함(step $=1/s$). 라플라스·최종값 정리가 흐릿하면 복습.", [["ch4-solution", "라플라스 · 최종값 정리 복습"]])}

<h2>1. 왜 robust가 필요한가</h2>
${defCard("극배치만으론 부족한 이유", `
앞 페이지 예제에서 극은 $\\{-1,-2,-3\\}$로 잘 박았는데 폐루프 DC gain이 4였음. ${term("feedforward-gain", "feedforward gain")} $p=1/4$를 곱해 억지로 1로 맞췄다고 하자. 그런데 <strong>플랜트 파라미터가 살짝 변하면</strong>(부품 노화·온도) 그 정밀하게 맞춘 gain이 어긋남 — 예컨대 DC gain이 $0.7875$가 되면 step $r=1$에 $y(\\infty)\\approx0.7875$, <strong>약 21% 추종오차</strong>가 그대로 남음. feedforward는 정확한 플랜트 값을 알아야 하니 변동에 무력.
<br><br>
<strong>적분기는 다름.</strong> 제어기에 $\\dfrac1s$가 있으면 오차 $e=r-y$가 조금이라도 남는 한 적분값 $\\int e\\,dt$가 계속 쌓여 입력을 밀어붙이고, 정상상태($\\dot{}=0$)가 되려면 <strong>반드시 $e=0$</strong>이어야 함. 이 조건은 플랜트 값을 몰라도 성립 → 파라미터 변동에 강인.
`)}

<h2>2. Internal Model Principle</h2>
${defCard("$\\phi(s)$와 Internal Model Principle", `
레퍼런스 $r$과 ${term("disturbance-rejection", "외란")} $w$의 <strong>unstable pole들의 최소공배수(LCM)</strong>를 $\\phi(s)$라 하자.
<table>
<tr><th>신호</th><th>Laplace</th><th>$\\phi(s)$</th></tr>
<tr><td>step (상수)</td><td>$1/s$</td><td>$s$ (적분기)</td></tr>
<tr><td>ramp</td><td>$1/s^2$</td><td>$s^2$</td></tr>
<tr><td>$\\sin\\omega t$</td><td>$\\omega/(s^2+\\omega^2)$</td><td>$s^2+\\omega^2$</td></tr>
</table>
${term("robust-tracking", "강인 추종")}/외란제거가 되려면 <strong>$\\phi(s)$를 제어기 분모에 포함</strong>시킴:
$$C(s)=\\frac{B(s)}{A(s)\\,\\phi(s)}.$$
"제어기 안에 추종할 신호의 모델(internal model)을 갖고 있어야 그 신호를 완벽히 따라간다." ${term("integral-control", "적분제어")}($\\phi=s$)가 가장 단순한 형태이고 PID의 I항이 이거임.
<br><br>
<strong>성립 조건 (Corollary 9.3):</strong> ① $\\phi(s)$의 근이 $N(s)$의 zero가 아닐 것 — 겹치면 ${term("pole-zero-cancellation", "약분")}돼 internal model이 무력화돼 추종 실패. ② $N,D$가 ${term("coprime", "coprime")}일 것(극배치 자체의 전제). 직관: 적분기 극 $s=0$이 플랜트 zero($N(0)=0$)와 겹치면 플랜트가 그 신호를 못 통과시켜 적분기가 일을 못 함.
`)}

<h2>3. 두 가지 구현법</h2>
${defCard("$\\phi$를 제어기 분모에 넣는 두 방법", `
<strong>방법 ① $\\phi$ 분리:</strong> 일반 극배치로 $B/A$를 구한 뒤 분모에 $\\phi$를 곱해 $C=\\dfrac{B}{A}\\cdot\\dfrac1\\phi$로 둠. $\\phi$ 차수만큼 폐루프 차수가 늘어 그만큼 극을 더 정해줘야 함.
<br><br>
<strong>방법 ② 차수 1 높이고 $a_0=0$ 강제:</strong> 제어기 차수를 $m=n$으로 올려 free parameter를 하나 더 만든 뒤 $A(s)$의 상수항 $a_0=0$으로 강제 → $A(s)=s(a_1+a_2s+\\cdots)$라 적분기 $\\phi=s$가 자연히 포함됨. $a_0=0$을 박으면 미지수가 하나 줄어 $S_m$이 한 열 축소돼 오히려 풀기 쉬움. step 추종($\\phi=s$)엔 방법 ②가 깔끔함.
<br><br>
이건 <strong>Ch8 적분제어(augmented state)와 같은 얘기</strong>임: $\\dot x_a=\\int(r-y)\\,dt$ → 라플라스 $\\dfrac1s$ → $\\phi=s$가 제어기 분모에 들어간 것과 동일. Ch8의 "플랜트가 $s=0$에 zero 없을 것"(Thm 8.5)이 여기 Corollary 9.3의 "$\\phi=s$ 근이 $N$ zero 아닐 것"($N(0)\\ne0$)과 정확히 같음. 상태공간이든 전달함수든 <strong>적분기를 루프에 넣는다</strong>는 본질은 동일하고, internal model 하나로 $r$ 추종과 step 외란 제거를 동시에 해결.
`)}

<h2>4. ⭐ 예제 — step 추종 PI 제어기</h2>
${tryIt("", `플랜트 $G(s)=\\dfrac1{s+1}$ ($n=1$)에 step을 정확히 추종시켜라. 적분기를 넣으면 제어기는 PI 형태가 됨.`, [
  {
    title: "왜 적분기가 필요한지 먼저",
    body: `적분기 없이 상수 제어기 $C=k$만 쓰면 폐루프 DC gain은
    $$\\left.\\frac{kG}{1+kG}\\right|_{s=0}=\\frac{k}{1+k}\\ne1.$$
    $k$를 키워도 1에 가까워질 뿐 정확히 1은 안 됨(게다가 $k$ 크면 saturation). → 적분기가 답.`
  },
  {
    title: "적분기 포함 제어기 형태",
    body: `$\\phi(s)=s$를 분모에 박은 PI 제어기:
    $$C(s)=\\frac{B(s)}{A(s)}=\\frac{b_0+b_1s}{s}.$$
    즉 $A(s)=a_1 s$ (상수항 $a_0=0$ → 적분기 포함), $B=b_0+b_1s$. $N=1,\\ D=s+1$.`
  },
  {
    title: "$F=DA+NB$ 전개",
    body: `폐루프 차수 $1+1=2$. 극 $\\{-2,-3\\}$이면 $F=(s+2)(s+3)=s^2+5s+6$.
    $$F=(s+1)(a_1 s)+(b_0+b_1s)=a_1 s^2+(a_1+b_1)s+b_0.$$`
  },
  {
    title: "계수 비교 → 풀기",
    body: `$s^2$: $a_1=1$. $s^1$: $a_1+b_1=5 \\Rightarrow b_1=4$. $s^0$: $b_0=6$.
    $$\\boxed{C(s)=\\frac{4s+6}{s}=4+\\frac{6}{s}}\\quad(\\text{PI: }K_P=4,\\ K_I=6)$$`
  },
  {
    title: "tracking 검산 — 이번엔 정확히 1",
    body: `폐루프 DC gain:
    $$\\left.\\frac{N(s)B(s)}{F(s)}\\right|_{s=0}=\\frac{1\\cdot 6}{6}=1.\\ ✓$$
    적분기 덕에 정확히 $y(\\infty)=r$. 플랜트 $\\frac1{s+1}$의 "1"이나 "+1"이 변동돼도 분모에 $s$가 살아있는 한 정상상태 오차는 0 — 이게 robust.<br>
    <strong>왜 분자 $B$엔 $\\phi$를 안 넣나?</strong> $\\phi$는 제어기 <strong>분모</strong>에만 있어야 적분기 극 $s=0$이 살아남음. 분자에 $s$가 있으면 약분돼 internal model이 사라짐 — Corollary 9.3의 "약분 금지"가 이거.`
  },
])}

<h2>5. 시험 직전 체크</h2>
${mcQuiz(
  "$\\sin 3t$ 형태의 레퍼런스를 정확히 추종하려면 제어기 분모에 넣어야 할 $\\phi(s)$는?",
  ["$s$", "$s^2$", "$s^2+9$", "$s+3$"],
  2,
  "$\\sin\\omega t$의 Laplace 극은 $s=\\pm j\\omega$, 즉 분모 $s^2+\\omega^2$. $\\omega=3$이면 $\\phi=s^2+9$. 이걸 제어기 분모에 넣어야 그 주파수를 오차 없이 추종."
)}

${mcQuiz(
  "적분제어가 플랜트 파라미터 변동에 강인(robust)한 근본 이유는?",
  [
    "적분기가 노이즈를 필터링해서",
    "정상상태($\\dot{}=0$)가 되려면 적분기 입력 $e=r-y$가 반드시 0이어야 하므로",
    "DC gain을 크게 만들어서",
    "극을 RHP로 옮겨서"
  ],
  1,
  "적분기 출력이 일정해지려면 그 입력(오차)이 0이어야만 함. 이 조건은 플랜트의 정확한 값을 몰라도 성립하므로 파라미터가 변해도 오차가 0으로 유지됨."
)}

${note(`<strong>정리:</strong> 극배치 + 레퍼런스/외란의 unstable mode $\\phi(s)$를 제어기 분모에 = robust tracking. step이면 $\\phi=s$(적분제어, PI), $\\sin\\omega t$면 $\\phi=s^2+\\omega^2$. 조건은 Corollary 9.3(약분 금지 + coprime). 그런데 지금까진 극(+추종)만 봤지 — 전달함수 전체(영점까지)를 목표모델과 맞추려면? 다음은 ${term("model-matching", "Model Matching")}과 ${term("total-stability", "Total Stability")}!`, "tip")}
`);
