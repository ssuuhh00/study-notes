registerPage("ch8-tracking", "Robust Tracking & 적분제어", () => `
<h1>Ch 8 — Robust Tracking & Disturbance Rejection</h1>
<p class="lead">${tag("개념+계산", "exam")} regulation/tracking/servo 구분 + 적분제어로 augment + Theorem 8.5.</p>

${profMemo(`<strong>외울 키 포인트 하나.</strong> 적분제어로 augment한 시스템의 특성방정식은 $s\\bar D(s)+K_a\\bar N(s)$ 꼴임 — 교수님이 "이거 기억해야 된다"고 콕 집은 부분. 그리고 ${term("robust-tracking", "robust")}가 "강인"인 이유: 플랜트 파라미터가 변해도 추종이 유지된다는 것, 그걸 적분기가 보장함.`)}

${recall("이 페이지에 필요한 선행 개념", "적분제어가 정상상태 오차를 0으로 만드는지는 <strong>최종값 정리</strong>로 확인함($y(\\infty)$). 라플라스·최종값 정리가 흐릿하면 복습.", [["ch4-solution", "라플라스 · 최종값 정리 복습"]])}

<h2>1. Regulation vs Tracking vs Servomechanism</h2>
<p>셋의 차이는 "<strong>주인이 몇인가</strong>"로 기억하면 쉬움 — Regulation은 주인이 $0$ 하나(흔들려도 제자리로), Tracking은 주인 한 명(step 같은 한 종류), Servomechanism은 주인이 여럿(step·ramp·sin 뭐가 와도)이라 그 신호들을 만들어내는 ${term("internal-model-principle", "internal model")}을 제어기에 심어야 함. 종류가 많을수록 제어기가 그만큼 똑똑해야 함.</p>
<table>
  <tr><th>종류</th><th>목표</th><th>레퍼런스</th></tr>
  <tr><td>${term("regulation", "Regulation")}</td><td>상태/에러를 0으로 유지</td><td>$r=0$ (외란·초기치를 0으로)</td></tr>
  <tr><td>${term("tracking", "Tracking")}</td><td>특정 신호 따라가기</td><td>step 같은 한 종류</td></tr>
  <tr><td>${term("servomechanism", "Servomechanism")}</td><td>여러 종류 신호 추종</td><td>step·ramp·sinusoid 등</td></tr>
</table>

<h2>2. 외란 + 적분제어로 augment</h2>
${defCard("적분제어 — 에러를 상태로 augment", `
플랜트 입력단에 외란 $w$가 들어온다고 하자:
$$\\dot{\\mathbf x}=A\\mathbf x+B\\mathbf u+Bw,\\qquad y=C\\mathbf x.$$
그냥 state feedback만 쓰면 $w$ 때문에 정상상태 에러가 남음. ${term("disturbance-rejection", "외란을 제거")}하고 추종까지 하려면 에러 $r-y$의 <strong>적분을 새 상태 $x_a$로 추가</strong>:
$$\\dot x_a=r-y=r-C\\mathbf x,\\qquad \\mathbf u=-K\\mathbf x+K_a x_a.$$
이게 ${term("integral-control", "적분제어")}이고, 적분기 $1/s$가 ${term("internal-model-principle", "internal model")}의 가장 단순한 형태(step용)임.
<br><br>
<strong>왜 에러가 0이 되나:</strong> 정상상태($\\dot x_a=0$)에선 $r-y=0$, 즉 $y=r$이 <strong>강제</strong>됨. 적분기는 에러가 조금이라도 남으면 $x_a$를 계속 키워 입력을 밀어붙이니 에러가 0이 될 때까지 안 멈춤. 외란 $w$도 마찬가지 — 그만큼 $u$를 보정해 상쇄하므로, step 외란이면 정상상태에서 완전히 제거됨.
`)}

<h2>3. 증강 플랜트와 Theorem 8.5</h2>
${defCard("증강 시스템 & Theorem 8.5", `
에러 상태를 합치면 $n$차 플랜트가 $(n{+}1)$차 증강 시스템이 됨:
$$\\begin{bmatrix}\\dot{\\mathbf x}\\\\\\dot x_a\\end{bmatrix}=\\begin{bmatrix}A & 0\\\\-C & 0\\end{bmatrix}\\begin{bmatrix}\\mathbf x\\\\x_a\\end{bmatrix}+\\begin{bmatrix}B\\\\0\\end{bmatrix}\\mathbf u+\\begin{bmatrix}0\\\\1\\end{bmatrix}r.$$
이를 $\\{A_a,B_a\\}$로 보고 $\\bar K=[-K\\ \\ K_a]$로 ${term("pole-placement", "극배치")}하면 됨. 단 극을 임의 배치하려면 증강 플랜트가 controllable이어야 함.
<br><br>
<strong>Theorem 8.5:</strong> 원 플랜트 $\\{A,B\\}$가 ${term("controllability", "controllable")}이고 <strong>플랜트가 $s=0$에 zero가 없으면</strong>($G=C(sI-A)^{-1}B$의 분자 $N(0)\\ne0$), 증강 플랜트 $\\{A_a,B_a\\}$도 controllable → 극 임의배치 가능.
<br><br>
<strong>왜 "no zero at $s=0$"가 붙나:</strong> 플랜트가 $s=0$에 zero를 가지면 그 zero가 적분기 극 $s=0$과 ${term("pole-zero-cancellation", "약분")}돼 적분기 mode가 uncontrollable이 됨 → 적분제어가 작동을 안 해 추종 실패. 그래서 "원 플랜트 controllable + $s=0$에 zero 없음" 이 두 조건이 세트 — 시험에 둘 다 쓰는 걸 잊지 말 것.
<br><br>
계수 비교용 형태: $G=\\bar N/\\bar D$일 때 증강 폐루프 특성방정식은 $s\\,\\bar D(s)+K_a\\,\\bar N(s)\\,(\\cdots)=\\Delta_d(s)$ 꼴로 나옴(적분기의 $s$가 $\\bar D$에 곱해짐). 원하는 극의 $\\Delta_d$와 계수 비교해 $K,K_a$를 구함.
`)}

<h2>4. 왜 "robust(강인)"인가</h2>
${defCard("강인성의 정체", `
자동차 크루즈 컨트롤을 생각해보자. 연료가 줄거나 탑승 인원이 바뀌면 질량·관성이 변함 → 플랜트 $A,B$가 슬금슬금 변하는 것. 순수 ${term("feedforward-gain", "feedforward gain")} $p=1/G_{cl}(0)$만 쓰면, $G_{cl}(0)$이 변하는 순간 추종이 틀어짐(정상상태 에러 발생).
<br><br>
<strong>적분기는 다름.</strong> "에러가 0이 될 때까지 민다"는 원리는 파라미터가 변해도 안 변하니, 정확한 $p$를 몰라도/모델이 좀 틀려도 $y\\to r$이 유지됨. 이게 ${term("robust-tracking", "robust tracking")} — 모델 오차에 강인하다는 뜻. 그래서 실무 표준이 적분제어(PID의 I항)임. 정리하면 <strong>$p$는 모델을 정확히 알아야</strong> 맞고, <strong>적분제어는 모델이 틀려도</strong> 정상상태 추종/외란제거가 유지됨.
`)}

${tryIt("족보 2013 Q3-b", `Q3-a의 $A=\\begin{bmatrix}-1&1\\\\0&1\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\1\\end{bmatrix},\\ C=[1\\ 0]$에서 구한 $K=[2\\ 5]$($A-BK$ 극 $-2,-3$)에, <strong>feedforward gain</strong>을 붙여 step을 추종하게 하라. $u=pr-Kx$의 $p$는?`, [
  {
    title: "폐루프 DC gain $G_{cl}(0)$",
    body: `$A-BK=\\begin{bmatrix}-1&1\\\\-2&-4\\end{bmatrix}$ ($\\det=6$). DC gain $G_{cl}(0)=-C(A-BK)^{-1}B$.<br>
    $(A-BK)^{-1}=\\tfrac16\\begin{bmatrix}-4&-1\\\\2&-1\\end{bmatrix}$ → $(A-BK)^{-1}B=\\tfrac16\\begin{bmatrix}-1\\\\-1\\end{bmatrix}$ → $C\\cdot=-\\tfrac16$.<br>
    $G_{cl}(0)=-(-\\tfrac16)=\\tfrac16$.`
  },
  {
    title: "feedforward gain $p$",
    body: `$$p=\\frac{1}{G_{cl}(0)}=\\frac{1}{1/6}=6.\\qquad u=6r-[\\,2\\ 5\\,]x.$$
    ${term("final-value-theorem", "최종값 정리")}로 step $r=1/s$에 $y(\\infty)=p\\,G_{cl}(0)=1$ → 정확 추종 ✓.`
  },
  {
    title: "단, robust는 아님",
    body: `이 $p=6$은 <strong>플랜트 값을 정확히 알 때만</strong> 맞음. $A,B$가 변하면 $G_{cl}(0)$이 바뀌어 다시 어긋남(정상상태 오차 발생). 모델 변동에도 추종하려면 §2의 <strong>적분제어(internal model)</strong>를 써야 함 — 그게 robust tracking.`
  }
])}

${note(`<strong>📝 족보 2015 Q6 (서술형):</strong> "disturbance가 있는 robust tracking 시스템을 얻는 방법을 설명하라." → ① 에러 적분 상태 $x_a=\\int(r-y)$ augment(=internal model $1/s$) → ② 증강 플랜트 극배치(Thm 8.5: controllable & $s=0$ zero 없음) → ③ 적분기라 파라미터 변동·step 외란에도 $y\\to r$ 유지. (전달함수 관점은 Ch9 internal model — 제어기 분모에 $\\phi(s)$.)`, "tip")}

<h2>5. 체크</h2>
${mcQuiz(
  "step뿐 아니라 ramp·sinusoid 등 여러 종류 레퍼런스를 추종하는 제어는?",
  ["Regulation", "Tracking", "Servomechanism", "Stabilization"],
  2,
  "여러 신호 추종 = servomechanism (주인이 여럿). 각 신호의 mode를 internal model로 제어기에 심음."
)}

${mcQuiz(
  "적분제어로 augment한 시스템에서 극을 임의 배치하려면 (Theorem 8.5) 필요한 조건은?",
  ["플랜트가 observable", "원 플랜트 controllable & 플랜트가 $s=0$에 zero가 없음", "플랜트가 stable", "$C=I$"],
  1,
  "controllable이어야 배치 가능하고, $s=0$에 zero가 있으면 적분기 극과 약분돼 적분제어가 무력화됨."
)}

${note(`<strong>정리:</strong> 추종할 신호 종류(regulation/tracking/servo)를 보고, 에러 적분을 상태로 augment → controllable & $s=0$ zero 없음(Thm 8.5)이면 $s\\bar D+K_a\\bar N$ 형태로 극배치. 적분기라 모델이 틀려도 강인. 그런데 state feedback도 적분제어도 <strong>상태 $\\mathbf x$를 다 안다</strong>고 가정했음 — 못 볼 땐? 다음은 출력만으로 상태를 추정하는 ${term("state-estimator", "State Estimator & Separation")}!`, "tip")}
`);
