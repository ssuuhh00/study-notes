registerPage("ch9-model-matching", "Model Matching · Total Stability", () => `
<h1>Ch 9 — Model Matching · Implementable · Total Stability</h1>
<p class="lead">${tag("개념 정의 출제 유력", "exam")} ${tag("Ch9 개념", "concept")} 0528 강의에서 정의를 꼼꼼히 설명한 부분. <strong>단답·정의 문제로 나오기 좋음</strong>. 비유까지 같이 외워두면 헷갈릴 일 없음.</p>

${profMemo(`이 페이지는 계산보다 <strong>정의를 정확히 쓰는 게</strong> 점수. well-posed / total stability / implementable 3조건 — 이 셋의 정의와 차이를 구분해 쓸 수 있어야 함. 교수님 비유("조종간 착하면 비행기 착", "군대 안 왔는데 보고만 한 격")가 그대로 정답 키워드라 같이 기억할 것.`)}

${recall("이 페이지에 필요한 선행 개념", "total stability는 중간의 <strong>BIBO 안정 · 내부안정</strong>을 모든 입출력 쌍으로 확장한 것. 뿌리 개념이 흐릿하면 복습.", [["ch5-bibo", "BIBO 안정 복습"], ["ch5-internal", "내부안정 복습"]])}

<h2>1. Model Matching이란</h2>
${defCard("Model Matching", `
${term("pole-placement", "극배치")}는 <strong>극(pole)만</strong> 원하는 데로 옮겼음. ${term("model-matching", "Model Matching")}은 한 발 더 나가 $r\\to y$ 전달함수의 <strong>극과 영점(zero) 둘 다</strong>를 목표모델 $G_o(s)$와 똑같게 만드는 것:
$$\\frac{y(s)}{r(s)}=G_o(s).$$
가장 이상적인 목표는 $G_o(s)=1$ — <strong>"조종간 착하면 비행기 착"</strong>, 명령 $r$을 출력 $y$가 시간지연·왜곡 없이 그대로 따라가는 best possible 응답임. (물론 $r$과 $y$는 단위·power level이 다를 수 있음 — 조종간 각도 vs 비행기 자세.)
`)}

<h2>2. Implementable Transfer Function — 3조건</h2>
${defCard("Implementable 3조건", `
아무 $G_o(s)$나 실제로 만들 수 있는 건 아님 — ${term("implementable", "구현가능")}하려면 셋 다 만족해야 함.
<br><br>
<strong>① Proper.</strong> $G_o$가 ${term("proper", "proper")}여야 함(분모차수 ≥ 분자차수). improper(분자&gt;분모)면 미분기가 필요한데, 미분은 고주파 noise를 증폭해 현실에서 못 씀.
<br><br>
<strong>② No leakage — 반드시 플랜트를 통과.</strong> $r\\to y$ 신호는 반드시 플랜트 $G$를 거쳐 나와야 함. 제어기가 출력을 직접 만들듯 옆으로 새면(leakage) 안 됨 → $G_o$는 <strong>플랜트의 zero를 물려받아야</strong> 함($G$의 zero는 제어기가 못 없앰). <strong>"군대 안 왔는데 보고만 한 격 / 눈 가리고 아웅"</strong> — 플랜트(군대)를 안 거치고 출력만 그럴싸하게 만든 가짜 응답은 종이 위에선 멀쩡해도 물리적으로 구현 불가.
<br><br>
<strong>③ Total Stability.</strong> 모든 입출력쌍 전달함수가 안정해야 함(아래 §4 상세). $r\\to y$만 안정해 보이는 걸로는 부족.
`)}

<h2>3. Well-posedness</h2>
${defCard("Well-posed", `
폐루프의 <strong>모든 input-output pair 전달함수가 proper</strong>일 것 — ${term("well-posed", "Well-posedness")}.
$$1+G(\\infty)C(\\infty)\\ne0,\\quad\\text{즉}\\quad G(\\infty)C(\\infty)\\ne-1.$$
왜 $G(\\infty)C(\\infty)=-1$이면 안 되나: 폐루프 분모가 $1+GC$인데 $s\\to\\infty$에서 $1+G(\\infty)C(\\infty)=0$이면, 어떤 입출력 전달함수의 분모 최고차항이 사라져 분자 차수가 분모를 넘어 <strong>improper(미분기 필요)</strong>가 됨. $G(s)$가 strictly proper면 $G(\\infty)=0$이라 $1+0=1\\ne0$ → <strong>자동 만족</strong>(현실 플랜트는 대부분 strictly proper라 거의 신경 안 써도 됨).
`)}

<h2>4. Total Stability</h2>
${defCard("Total Stability", `
${term("total-stability", "Total Stability")}: $r\\to y$뿐 아니라 <strong>모든 입력(noise·외란 포함)에서 모든 출력까지 전부 ${term("bibo-stability", "BIBO stable")}</strong>. 핵심 판정은 제어기·플랜트 사이에 <strong>unstable한 ${term("pole-zero-cancellation", "pole-zero cancellation")}이 없을 것</strong>.
<br><br>
왜 unstable 약분이 치명적인가: 플랜트에 unstable pole $s=2$가 있다고 하자($G=\\dfrac1{s-2}$). 제어기에서 $s-2$를 zero로 만들어 약분하면 $r\\to y$에선 $s-2$가 사라져 <strong>안정해 보임</strong>. 그런데 그 mode $e^{2t}$는 내부에 여전히 살아있어, noise→$y$ 경로엔 $s-2$가 그대로 남아 발산함:
$$\\frac{y}{r}\\ \\text{안정해 보임}\\quad\\text{but}\\quad \\frac{y}{n_{noise}}\\ \\text{에 }(s-2)\\text{ 살아있음}\\Rightarrow\\text{발산.}$$
→ unstable mode는 절대 약분으로 숨기면 안 됨. stable한($\\text{Re}<0$) 약분은 mode가 알아서 감쇠하니 OK.
<br><br>
구분: <strong>well-posed</strong>는 "모든 입출력쌍 proper(미분기 없음)" — $s\\to\\infty$(고주파) 얘기. <strong>total stability</strong>는 "모든 입출력쌍 BIBO + unstable 약분 없음" — 극 위치($s$-평면) 얘기.
`)}

<h2>5. Implementable 판정 연습</h2>
${tryIt("", `플랜트 $G(s)=\\dfrac{s-2}{(s+1)(s+3)}$ (RHP zero $s=2$, non-minimum phase). 아래 목표모델 셋이 implementable한지 따져보라.`, [
  {
    title: "$G_o=\\dfrac{1}{s+2}$ ?",
    body: `플랜트의 RHP zero $s=2$를 $G_o$가 안 물려받음 → 그 zero를 제어기가 약분해야 하는데 그건 <strong>unstable 약분</strong> → total stability 위반. <strong>불가 ✗</strong>`
  },
  {
    title: "$G_o=\\dfrac{s-2}{(s+4)^2}$ ?",
    body: `플랜트의 $s-2$ zero를 그대로 보유(no leakage), proper, 약분 불필요. <strong>가능 ✓</strong>`
  },
  {
    title: "$G_o=\\dfrac{(s-2)(s+5)}{s+4}$ ?",
    body: `분자차수 $2 >$ 분모차수 $1$ → <strong>improper</strong>(미분기 필요) → proper 조건 위반. <strong>불가 ✗</strong>`
  },
  {
    title: "철칙",
    body: `플랜트의 <strong>RHP zero는 목표모델이 반드시 그대로 가져가야</strong> 함. 없애려 약분하면 unstable pole-zero cancellation이라 total stability가 깨짐. ($G_o=1$이 항상 가능한 건 minimum phase 플랜트일 때 얘기.)`
  },
])}

<h2>6. 한눈에 비교</h2>
${defCard("극배치 vs Model Matching", `
<table>
<tr><th></th><th>극배치 (Pole Placement)</th><th>Model Matching</th></tr>
<tr><td>맞추는 것</td><td>극(pole)만</td><td>극 + 영점 (전달함수 전체 $G_o$)</td></tr>
<tr><td>자유도</td><td>극 위치 선택</td><td>$G_o$ 전체 형상 선택</td></tr>
<tr><td>추종</td><td>DC gain 따로 보정 필요</td><td>$G_o=1$이면 완벽 추종</td></tr>
<tr><td>제약</td><td>$N,D$ coprime, $m\\ge n-1$</td><td>+ implementable 3조건</td></tr>
</table>
`)}

<h2>7. Two-parameter 제어기 구현 (A·L·M)</h2>
${defCard("Two-parameter configuration", `
Model matching을 실제로 구현하는 구조 — 입력을 <strong>레퍼런스 $r$ 경로</strong>와 <strong>출력 $y$ 궤환 경로</strong> 두 곳에서 따로 잡음(${term("two-parameter-controller", "two-parameter 제어기")}):
$$u=\\frac1{A(s)}\\big[L(s)\\,r-M(s)\\,y\\big],\\qquad C_1=\\frac{L}{A},\\quad C_2=\\frac{M}{A}.$$
닫으면 $r\\to y$ 전달함수는
$$\\hat g_o=\\frac{N\\,L}{A\\,D+M\\,N}=\\frac{E}{F}.$$
<strong>분모 $AD+MN=F$</strong>는 극(원하는 폐루프 극) — ${term("coprime-fraction", "극배치")}와 똑같이 $A,M$으로 맞춤. <strong>분자 $NL=E$</strong>는 영점 — $L$로 따로 맞춤. 분자·분모를 <strong>독립으로</strong> 잡을 수 있어 전달함수 전체($G_o$)를 목표모델에 맞추는 게 가능함(one-parameter $B/A$는 분자 $NB$가 분모와 엮여 자유도가 부족).
<br><br>
<strong>절차(교수님: "일단 $N$으로 나눠"):</strong> ① 목표 $\\hat g_o=\\dfrac{E}{F}$에서 <strong>$L=E/N$</strong>(implementable이면 $N$이 $E$를 나눠떨어뜨림) → ② Diophantine <strong>$AD+MN=F$</strong>를 $A,M$에 대해 풀이(계수 비교).
`)}

${tryIt("", `플랜트 $G(s)=\\dfrac{1}{s-1}$ (불안정 극 $s=1$)을 목표모델 $G_o(s)=\\dfrac{6}{(s+2)(s+3)}$ (step DC gain 1)에 맞추는 two-parameter 제어기 $A,L,M$을 구하라.`, [
  {
    title: "$N,D$와 목표 $E,F$ 분리",
    body: `$N=1,\\ D=s-1$ ($n=1$). 목표 $G_o=\\dfrac{E}{F}$에서 $E=6,\\ F=(s+2)(s+3)=s^2+5s+6$.<br>
    implementable 확인: proper ✓, 플랜트 zero 없음($N=1$)이라 물려받을 RHP zero도 없음 ✓.`
  },
  {
    title: "① $L=E/N$",
    body: `$$L=\\frac{E}{N}=\\frac{6}{1}=6.$$
    $N=1$이라 그대로 떨어짐. (플랜트에 zero가 있으면 그 인수가 $E$에 들어있어 약분돼 $L$이 다항식이 됨 — 그게 implementable의 'no leakage'.)`
  },
  {
    title: "② Diophantine $AD+MN=F$ 세우기",
    body: `제어기 차수 $\\deg A=1$로 잡음(monic $A=s+a_0$, $M=m_1s+m_0$). well-posed 위해 $\\deg M\\le\\deg A$.
    $$\\underbrace{(s+a_0)(s-1)}_{AD}+\\underbrace{(m_1s+m_0)}_{MN}=s^2+(a_0-1+m_1)s+(m_0-a_0).$$`
  },
  {
    title: "계수 비교 → $A,M$",
    body: `$F=s^2+5s+6$과 비교:<br>
    • $s^1$: $a_0-1+m_1=5$<br>
    • $s^0$: $m_0-a_0=6$<br>
    미지수 3개($a_0,m_1,m_0$)·식 2개 → <strong>$a_0$가 자유</strong>(=제어기 자체 극, stable·빠르게 자유선택). $a_0=4$로 잡으면 $m_1=2,\\ m_0=10$.
    $$\\boxed{A=s+4,\\quad L=6,\\quad M=2s+10}$$`
  },
  {
    title: "제어기 + 검산",
    body: `$$u=\\frac{1}{s+4}\\big[\\,6\\,r-(2s+10)\\,y\\,\\big],\\quad C_1=\\frac{6}{s+4},\\ C_2=\\frac{2s+10}{s+4}.$$
    검산: $\\hat g_o=\\dfrac{NL}{AD+MN}=\\dfrac{1\\cdot6}{s^2+5s+6}=\\dfrac{6}{(s+2)(s+3)}=G_o$ ✓. DC gain $=6/6=1$ → step 완벽 추종. 극배치(one-parameter)는 극만 맞추고 DC gain은 따로 보정해야 했지만, two-parameter는 <strong>분자까지 한 번에</strong> 목표모델과 일치.`
  }
])}

<h2>8. 시험 직전 체크</h2>
${mcQuiz(
  "다음 중 implementable transfer function의 3조건이 아닌 것은?",
  [
    "proper (분모차수 ≥ 분자차수)",
    "$r\\to y$가 플랜트를 통과 (no leakage)",
    "total stability (모든 입출력쌍 BIBO + unstable 약분 없음)",
    "플랜트가 minimum phase (RHP zero 없음)일 것"
  ],
  3,
  "3조건은 ① proper ② no leakage(플랜트 통과) ③ total stability. minimum phase는 조건이 아님 — non-minimum phase여도 그 RHP zero를 $G_o$가 물려받기만 하면 구현 가능."
)}

${mcQuiz(
  "$G(s)=\\dfrac1{s-2}$를 제어기에서 $s-2$ zero로 약분해 폐루프 $r\\to y$를 안정하게 만들었다. 이 설계의 문제는?",
  [
    "well-posed가 깨진다",
    "unstable pole-zero cancellation → total stability가 깨져 noise/외란에 발산",
    "proper 조건 위반",
    "문제 없음 — $r\\to y$가 안정하므로 OK"
  ],
  1,
  "약분된 $s=2$ mode($e^{2t}$)가 내부에 살아있어 noise→$y$ 경로로 발산함. $r\\to y$만 안정해 보이는 건 함정. unstable mode는 약분으로 숨기면 안 됨."
)}

${mcQuiz(
  "플랜트 $G(s)$가 strictly proper일 때 well-posedness는?",
  [
    "절대 만족 안 됨",
    "$G(\\infty)=0$이라 $1+G(\\infty)C(\\infty)=1\\ne0$ → 자동 만족",
    "$C(s)$도 strictly proper여야만 만족",
    "total stability와 동일한 조건"
  ],
  1,
  "strictly proper면 $G(\\infty)=0$. 그러면 $1+G(\\infty)C(\\infty)=1\\ne0$이라 well-posed 조건이 무조건 성립함."
)}

${note(`<strong>정리:</strong> Model Matching은 극+영점 전체($G_o$)를 맞춤. 구현하려면 implementable 3조건(proper · no leakage · total stability) + well-posed. 모든 판정의 핵심은 <strong>unstable pole-zero 약분 금지</strong>, 플랜트의 RHP zero는 $G_o$가 물려받기. 이걸로 Ch6~9 개념을 완주했음 — 이제 <strong>모의고사</strong>로 손계산을 실전 점검할 차례!`, "tip")}
`);
