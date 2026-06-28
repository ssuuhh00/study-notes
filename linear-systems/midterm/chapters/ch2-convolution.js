registerPage("ch2-convolution", "합성곱(Convolution)", () => `
<h1>Ch 2 — Convolution 합성곱</h1>
<p class="lead">${tag("매년출제", "must")} 족보 2013 #1, 2015 #1, 과제 2.9 — 매번 비슷한 형태. Unit step 함수 다루는 법만 익히면 끝.</p>

${profMemo(`<strong>1·2장은 별로 안 나온다고 하시긴 했지만</strong> 합성곱 형태는 HW에서 1문제 이상 튀어나올 수 있음. 그래프 그리고 케이스 분기만 잘 하면 됨. 증명 X, 계산기 없이 가능한 수준.`)}

<h2>1. 정의</h2>
${defCard("Convolution", `
LTI 시스템의 출력 = 입력 $*$ 임펄스응답 → ${term("convolution")}:
$$\\boxed{y(t) = (x * h)(t) = \\int_{-\\infty}^{\\infty} x(\\tau) h(t - \\tau) d\\tau}$$
${term("impulse-response", "임펄스응답")} $h$는 LTI 시스템 전체를 특징짓는 함수.<br>
인과 + 입력이 $t < 0$에서 0이면:
$$y(t) = \\int_0^t x(\\tau) h(t - \\tau) d\\tau$$
`)}

${note(`<strong>직관:</strong> $\\tau$ 시점 입력 $x(\\tau)$가 $t-\\tau$ 시간 후에 $h(t-\\tau)$만큼 영향을 주고, 이걸 모든 과거에 대해 적분.`)}

${concept("실생활 비유 — 콘서트홀 잔향", `
손뼉 한 번 (= 임펄스 $\\delta(t)$) 치면 → 메아리가 점점 줄며 들림. 이게 임펄스응답 $h(t)$.<br><br>
가수가 노래 (= 입력 $x(t)$). 각 순간의 소리가 잔향과 합쳐져 청중에게 도달 (= 출력 $y(t) = x*h$).<br><br>
<strong>요약:</strong> 입력의 매 순간이 시스템에 "복사된 임펄스응답"을 만들고 다 더해진 게 출력. 적분이 정확히 이 "다 더하기".
`)}

${concept("실생활 비유 2 — 사진 흐림(blur)", `
원본 픽셀이 주변 픽셀에 블러 ($h$)를 만들어 퍼짐. 픽셀별 블러를 합한 게 흐려진 사진.<br>
이미지 처리에선 <strong>2D convolution</strong>. CNN의 핵심 연산도 이것의 일반화.
`)}

${concept("왜 $h(t-\\tau)$인가? — 인과성과 시간 시프트", `
$\\tau$ 시점 입력이면, 영향은 $\\tau$부터 시작. $\\tau$ 후 $\\Delta t$ 시간 지나면 → $h(\\Delta t)$만큼 작용.<br>
$t$ 시점 영향은 $\\Delta t = t - \\tau$ → $h(t - \\tau)$.<br><br>
인과적 시스템: 현재 출력 = 과거 입력만 → $\\tau \\le t$ → 적분 상한 $t$.
`)}

<h2>2. Unit Step Function</h2>
${defCard("$u_s(t)$", `
$$u_s(t) = \\begin{cases} 1, & t \\ge 0 \\\\ 0, & t < 0 \\end{cases}$$
시프트: $u_s(t - a)$는 $t = a$부터 켜짐.
`)}

${note(`<strong>시험에서 자주 나오는 형태:</strong><br>
$x(t) = u_s(t) - 2u_s(t-1) + u_s(t-3)$ → "0~1: 1, 1~3: −1, 3 이후: 0"의 사각파.<br>
$h(t) = u_s(t) - u_s(t-2)$ → "0~2까지만 1인 펄스".`)}

${prereq("적분의 기본 복습", `
$\\int_a^b f(t) dt$ = "함수 그래프 아래 넓이". 합성곱에선:<br>
<ul>
  <li>겹치는 구간이 없으면 적분값 0</li>
  <li>겹치는 구간에서 $x \\cdot h$의 평균 × 구간 길이 (간단한 경우)</li>
  <li>일반적으론 구간을 여러 조각으로 나눠 각각 적분 후 합</li>
</ul>
합성곱 풀 때는 "두 그래프가 겹치는 구간"을 $t$에 따라 분기 처리하는 게 전부.
`)}

<h2>3. 풀이 핵심 — 그래픽 방법</h2>
${note(`<strong>전략:</strong><br>
1. $x(\\tau)$와 $h(t-\\tau)$를 $\\tau$축에 그려<br>
2. $h(t-\\tau)$ = $h(\\tau)$를 <strong>뒤집고 ($\\tau \\to -\\tau$) $t$만큼 시프트</strong><br>
3. $t$를 0부터 키우면서 두 그래프가 겹치는 구간을 찾고 그 구간에서 적분<br>
4. 겹침이 바뀌는 모든 $t$에서 케이스 나누기`, "tip")}

<h2>4. 워크스루 — 족보 2013 #1</h2>

${walkthrough("$x(t) = u_s(t) - 2u_s(t-1) + u_s(t-3)$, $h(t) = u_s(t) - u_s(t-2)$", [
  {
    title: "$x(t)$ 그리기",
    body: `$x(t) = \\begin{cases} 1, & 0 \\le t < 1 \\\\ -1, & 1 \\le t < 3 \\\\ 0, & \\text{else} \\end{cases}$<br><br>
    체크: $u_s(t)=1, u_s(t-1)=1$이면 $1 - 2 = -1$ ✓ ($t \\in [1,3)$). $u_s(t-3)$이 켜지면 $1 - 2 + 1 = 0$ ✓.`
  },
  {
    title: "$h(t)$ 그리기",
    body: `$h(t) = \\begin{cases} 1, & 0 \\le t < 2 \\\\ 0, & \\text{else} \\end{cases}$<br>
    너비 2의 사각 펄스.`
  },
  {
    title: "케이스 분석",
    body: `$h(t-\\tau)$는 $\\tau \\in [t-2, t]$에서 1.<br>
    $x(\\tau)$는 $[0,1)$에서 1, $[1,3)$에서 −1.<br>
    겹침이 바뀌는 경계: $t = 0, 1, 2, 3, 4, 5$.<br><br>
    분기:<br>
    • $t < 0$: 안 겹침 → $y = 0$<br>
    • $0 \\le t < 1$: 겹침 $[0, t]$, 모두 $x=1$ → $y = t$<br>
    • $1 \\le t < 2$: 겹침 $[0, t]$. $[0,1)$에서 1, $[1,t]$에서 −1 → $y = 1 - (t-1) = 2 - t$<br>
    • $2 \\le t < 3$: 겹침 $[t-2, t]$. $[t-2, 1)$에서 1, $[1, t]$에서 −1 → $y = (3-t) - (t-1) = 4 - 2t$<br>
    • $3 \\le t < 5$: 겹침 $[t-2, 3)$ 부분만 −1 → $y = -(3-(t-2)) = t - 5$<br>
    • $t \\ge 5$: 안 겹침 → $y = 0$`
  },
  {
    title: "최종 답",
    body: `$$y(t) = \\begin{cases} t, & 0 \\le t < 1 \\\\ 2 - t, & 1 \\le t < 2 \\\\ 4 - 2t, & 2 \\le t < 3 \\\\ t - 5, & 3 \\le t < 5 \\\\ 0, & \\text{else} \\end{cases}$$<br>
    경계 연속성 검증: $t=1$: $1, 1$ ✓. $t=2$: $0, 0$ ✓. $t=3$: $-2, -2$ ✓. $t=5$: $0, 0$ ✓.`
  }
])}

<h2>5. 자주 쓰는 공식 (외워!)</h2>
<table>
  <tr><th>입력</th><th>임펄스응답</th><th>출력</th></tr>
  <tr><td>$u_s(t)$</td><td>$h(t)$</td><td>$\\int_0^t h(\\tau) d\\tau$ (step response)</td></tr>
  <tr><td>$\\delta(t)$</td><td>$h(t)$</td><td>$h(t)$</td></tr>
  <tr><td>$e^{-at}u_s(t)$</td><td>$e^{-bt}u_s(t)$</td><td>$\\frac{1}{b-a}(e^{-at} - e^{-bt})u_s(t)$ ($a \\neq b$)</td></tr>
  <tr><td>$u_s(t)$</td><td>$e^{-at}u_s(t)$</td><td>$\\frac{1}{a}(1 - e^{-at})u_s(t)$</td></tr>
</table>

<h2>6. 워크스루 #2 — 족보 2015 #1</h2>

${walkthrough("$u(t) = u_s(t) - u_s(t-2)$, $h(t) = e^{-2t} u_s(t)$", [
  {
    title: "분석 (선형성 이용)",
    body: `입력 = "0~2에서 1인 사각 펄스" = $u_s(t) - u_s(t-2)$.<br>
    출력도 시프트 성질 이용:<br>
    $y(t) = (h * u_s)(t) - (h * u_s)(t-2)$`
  },
  {
    title: "Step response 먼저",
    body: `$s(t) = (h * u_s)(t) = \\int_0^t e^{-2\\tau} d\\tau = \\frac{1}{2}(1 - e^{-2t})$ ($t \\ge 0$)`
  },
  {
    title: "조립",
    body: `$y(t) = s(t) - s(t-2)$:<br>
    • $0 \\le t < 2$: $s(t-2) = 0$ → $y(t) = \\frac{1}{2}(1 - e^{-2t})$<br>
    • $t \\ge 2$: $y(t) = \\frac{1}{2}(1 - e^{-2t}) - \\frac{1}{2}(1 - e^{-2(t-2)}) = \\frac{1}{2}(e^{-2(t-2)} - e^{-2t}) = \\frac{1}{2}e^{-2t}(e^4 - 1)$`
  }
])}

<h2>체크</h2>

${mcQuiz(
  "임펄스응답 $h(t)$가 $0 \\le t < 1$에서 1, 그 외 0인 시스템에 $\\delta(t)$를 가하면 출력은?",
  ["$\\delta(t)$", "$h(t)$ 그 자체", "$u_s(t)$"],
  1,
  "임펄스응답 정의: $\\delta(t)$ 입력 → 출력 $= h(t)$. $\\delta * h = h$."
)}

${mcQuiz(
  "$x(t) = u_s(t)$와 $h(t) = u_s(t)$의 합성곱은?",
  ["$u_s(t)$", "$t \\cdot u_s(t)$ (램프)", "$\\delta(t)$", "$2u_s(t)$"],
  1,
  "$\\int_0^t 1 \\cdot 1 \\, d\\tau = t$ ($t \\ge 0$). unit ramp."
)}

${note(`<strong>시험장 팁:</strong> 케이스 분기 경계를 잘 적어두면 부분점수 만점. 그래프 그리는 데 5분 투자해. 머릿속으로 풀려고 하면 거의 무조건 틀림.`, "tip")}
`);
