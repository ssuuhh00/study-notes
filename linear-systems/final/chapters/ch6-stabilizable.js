registerPage("ch6-stabilizable", "Stabilizable · Detectable · Index", () => `
<h1>Ch 6 — Stabilizable · Detectable · Controllability Index</h1>
${note(`<strong>⚠️ 이 페이지는 시험범위가 섞여 있음</strong> (0609 복습 기준) — <strong>6~8절 Kalman 분해·가제어성 지수는 시험범위</strong>(교수님이 0609 복습에서 직접 짚음). 반면 <strong>1~5절·9절 Stabilizable·Detectable(안정화)는 시험 제외</strong>(0609에서 언급 없고 출제 안 된다고 전달받음). 아래에서 <strong>흐리게 처리된 절이 시험 제외</strong>이며, 안정화는 controllable/observable의 약화판이라 Ch8 설계 직관용으로만 참고.`, "warn")}
<p class="lead">${tag("일부 시험범위", "exam")} 안정화(Stabilizable·Detectable)는 시험 제외(흐림), 같은 페이지의 <strong>Kalman 분해·가제어성 지수는 시험범위</strong>. 절별 표시를 확인할 것.</p>

<div class="excluded-block">
<p class="excl-block-label">⬇️ 안정화 (Stabilizable · Detectable) — 1~5절 · 시험 제외 (개념 참고용)</p>
${profMemo(`<strong>참고 (시험 제외).</strong> 2017 p3-1은 (1) stabilizable/detectable <em>개념 설명</em> (2) stabilizable 판정 (3) detectable 판정 (4) $u=Fx$로 안정화하는 $F$ 구하기 — 4단 구성임. 아래 tryIt가 그 문제 그대로니 손으로 한 번 따라 풀어볼 것. 판정의 핵심은 <strong>${term("pbh-test", "PBH")}로 unstable한 $\\lambda$만 골라 체크</strong>하는 것!`)}

${recall("이 페이지에 필요한 선행 개념", "stabilizable/detectable은 <strong>unstable한 eigenvalue($\\text{Re}\\ge0$)만</strong> 골라 PBH(rank)로 보는 것. 고유값 부호와 rank가 흐릿하면 복습.", [["ch3-eigen", "고유값 복습"], ["ch3-rank", "Rank 복습"]])}

<h2>1. Stabilizable (안정화가능)</h2>
${defCard("Stabilizable", `
controllable이 아니어도, <strong>unstable한 mode($\\text{Re}(\\lambda)\\ge0$)들이 전부 controllable</strong>이면 ${term("stabilizable", "stabilizable")}임. → ${term("state-feedback", "state feedback")} $u=Fx$로 그 unstable mode들을 LHP로 옮겨 안정화할 수 있음(이미 stable한 mode는 건드릴 필요 없음).
<br><br>
직관: controllable은 "모든 mode를 마음대로 움직임"이라 너무 강한 요구임. 실제 제어 목표는 보통 "안정화"뿐이니, <strong>이미 안정한 mode는 놔두고 위험한(unstable) mode만 잡을 수 있으면</strong> 충분 — 그게 stabilizable.
`)}

<h2>2. Detectable (검출가능)</h2>
${defCard("Detectable", `
observable이 아니어도, <strong>unstable한 mode들이 전부 observable</strong>이면 ${term("detectable", "detectable")}임. → observer로 그 위험한 상태를 추정해 안정한 추정오차를 만들 수 있음. ${term("stabilizable", "stabilizable")}의 <strong>쌍대 개념</strong>.
<br><br>
직관도 같음: 안정해서 알아서 사라질 mode는 굳이 관측 안 해도 되고, <strong>발산할 mode만 출력으로 볼 수 있으면</strong> 추정기로 잡아내니 충분.
`)}

<h2>3. PBH 판정 — unstable한 $\\lambda$만 본다</h2>
${defCard("Stabilizable / Detectable PBH", `
<strong>Stabilizable:</strong> $\\text{Re}(\\lambda)\\ge0$인 $\\lambda$에 대해서만 $\\rho([\\,A-\\lambda I\\ \\ B\\,])=n$.<br>
<strong>Detectable:</strong> $\\text{Re}(\\lambda)\\ge0$인 $\\lambda$에 대해서만 $\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$.
<br><br>
controllable의 PBH는 <strong>모든</strong> $\\lambda$를 봤지만, stabilizable은 <strong>위험한($\\text{Re}\\ge0$) $\\lambda$만</strong> 보면 됨. LHP mode는 rank가 떨어져도(uncontrollable) 어차피 안정하니 OK. 그래서 controllable ⟹ stabilizable이지만 역은 아님.
`)}

<h2>4. 포함 관계</h2>
<table>
  <tr><th>강함 → 약함</th><th>의미</th></tr>
  <tr><td>Controllable</td><td>모든 mode를 임의 배치 가능</td></tr>
  <tr><td>⟹ Stabilizable</td><td>unstable mode만 controllable이면 충분 (안정화 OK)</td></tr>
</table>
<p>Observable ⟹ Detectable도 똑같은 포함 관계임. controllable/observable이 안 돼도 stabilizable/detectable이면 제어·추정 설계는 가능함.</p>

<h2>5. ⭐ 족보 2017 p3-1</h2>
${tryIt("", `$$\\dot{\\mathbf x}=\\begin{bmatrix}0 & 1\\\\ 0 & -3\\end{bmatrix}\\mathbf x+\\begin{bmatrix}1\\\\ 0\\end{bmatrix}u,\\qquad y=[\\,0\\ \\ 1\\,]\\mathbf x$$ (1) stabilizable·detectable 개념 설명 (2) stabilizable? (3) detectable? (4) $u=Fx$로 안정화하는 $F$.`, [
  {
    title: "(0) 먼저 eigenvalue (mode 파악)",
    body: `$A=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix}$는 상삼각 → $\\lambda=0,\\ -3$.<br>
    <strong>$\\lambda=-3$은 안정(LHP), $\\lambda=0$은 unstable</strong>($\\text{Re}=0\\ge0$). 그래서 판정에서 신경 쓸 mode는 $\\lambda=0$ 하나임.`
  },
  {
    title: "(1) 개념 설명",
    body: `<strong>Stabilizable</strong>: 모든 unstable mode가 controllable이라 state feedback으로 LHP로 옮겨 안정화 가능한 시스템.<br>
    <strong>Detectable</strong>: 모든 unstable mode가 observable이라 observer로 그 상태를 추정해 안정한 오차 동역학을 만들 수 있는 시스템. (둘은 쌍대)`
  },
  {
    title: "(2) Stabilizable 판정 — $\\lambda=0$만 PBH",
    body: `$[\\,A-0\\cdot I\\ \\ B\\,]=\\begin{bmatrix}0 & 1 & 1\\\\ 0 & -3 & 0\\end{bmatrix}$. 2열 $\\begin{bmatrix}1\\\\-3\\end{bmatrix}$, 3열 $\\begin{bmatrix}1\\\\0\\end{bmatrix}$이 독립 → rank 2 $=n$ ✓<br>
    unstable mode $\\lambda=0$이 controllable → <strong>stabilizable</strong>. (전체 controllable은 아님: $AB=\\begin{bmatrix}0\\\\0\\end{bmatrix}$라 $\\mathcal C=\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$ rank 1. 하지만 안 움직이는 건 안정한 $\\lambda=-3$ mode라 상관없음.)`
  },
  {
    title: "(3) Detectable 판정 — $\\lambda=0$만 PBH",
    body: `$\\begin{bmatrix}A-0\\cdot I\\\\ C\\end{bmatrix}=\\begin{bmatrix}0 & 1\\\\ 0 & -3\\\\ 0 & 1\\end{bmatrix}$. 1열이 전부 0 → rank $=1<2=n$ ✗<br>
    unstable mode $\\lambda=0$이 <strong>unobservable</strong> → <strong>NOT detectable</strong>. (출력 $y=x_2$인데 $\\lambda=0$ mode는 $x_1$ 방향이라 $y$에 안 잡힘.)`
  },
  {
    title: "(4) 안정화 $F$ — 극배치",
    body: `$u=Fx,\\ F=[\\,f_1\\ \\ f_2\\,]$이면
    $$A+BF=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix}+\\begin{bmatrix}1\\\\0\\end{bmatrix}[f_1\\ f_2]=\\begin{bmatrix}f_1 & 1+f_2\\\\ 0 & -3\\end{bmatrix}$$
    여전히 상삼각 → eigenvalue $=f_1,\\ -3$. $f_1$은 자유롭게 옮기지만 $-3$은 고정($\\lambda=-3$이 uncontrollable). 다행히 $-3$은 이미 stable! $f_1<0$이면 둘 다 LHP — 예: $F=[\\,-1\\ \\ 0\\,]$ → eigenvalue $-1,\\ -3$ → <strong>안정화 완료</strong>.`
  },
  {
    title: "(정리) 이 문제의 교훈",
    body: `stabilizable인데 detectable은 아닐 수 있음(이 예가 그럼). controllable과 observable은 <strong>독립</strong> 성질이라 따로따로 판정해야 함. 그리고 극배치 시 uncontrollable mode($-3$)는 못 옮긴다는 걸 $A+BF$가 상삼각으로 유지되는 데서 확인했음 — 못 움직이는 mode가 stable했기에 stabilizable이 가능했던 것.`
  }
])}

</div>
${note(`<strong>✅ 여기서부터 시험범위</strong> — 아래 <strong>Kalman 분해 · 가제어성 지수</strong>는 0609 복습에서 교수님이 직접 짚어준 내용.`, "tip")}
<h2>6. Kalman 분해 — c/o에 따라 u·y에 어떻게 붙나</h2>
${defCard("Kalman 분해 (c/o ↔ u·y 연결)", `
닮음변환으로 상태를 <strong>가제어/가관측 조합 4부분</strong>으로 쪼갤 수 있음(${term("kalman-decomposition", "Kalman 분해")}). 핵심은 <strong>각 부분이 입력 $u$·출력 $y$ 중 어디에 연결되는가</strong>임:
<table>
<tr><th>부분</th><th>$u$와 연결?</th><th>$y$와 연결?</th><th>의미</th></tr>
<tr><td><strong>co</strong> (ctrb &amp; obsv)</td><td>✓</td><td>✓</td><td>$u$로 움직이고 $y$로 보임 — <strong>전달함수에 나타나는 유일한 부분</strong></td></tr>
<tr><td><strong>cō</strong> (ctrb, unobsv)</td><td>✓</td><td>✗</td><td>$u$로 움직이지만 $y$엔 안 잡힘</td></tr>
<tr><td><strong>c̄o</strong> (unctrb, obsv)</td><td>✗</td><td>✓</td><td>$u$로 못 움직이지만 $y$로 보임</td></tr>
<tr><td><strong>c̄ō</strong> (둘 다 ✗)</td><td>✗</td><td>✗</td><td>$u$·$y$ 둘 다 단절 — 완전히 숨은 mode</td></tr>
</table>
교수님 표기 그대로: <code>cō: u연결 y연결X</code>, <code>c̄o: u연결X y연결</code>, <code>co: ○○</code>, <code>c̄ō: ××</code>.
<br><br>
<strong>왜 중요?</strong> 전달함수 $G(s)=C(sI-A)^{-1}B$는 <strong>co 부분만</strong> 반영함. 나머지 셋(uncontrollable이거나 unobservable)은 입출력 관계에서 <strong>약분돼 사라짐</strong>. 그래서 ${term("minimal-realization", "최소실현")} = co 부분만 남긴 것 ⟺ <strong>controllable 그리고 observable</strong>. "전달함수만 보면 멀쩡한데 내부에 숨은 (특히 unstable) mode가 있을 수 있다"는 경고가 여기서 나옴(→ Ch9 total stability).
`)}

<h2>7. ⭐ 족보 — 가제어 부분으로 축소 후 가관측?</h2>
${tryIt("", `$$\\dot{\\mathbf x}=\\begin{bmatrix}-1 & 3\\\\ 3 & -1\\end{bmatrix}\\mathbf x+\\begin{bmatrix}1\\\\ 1\\end{bmatrix}u,\\qquad y=[\\,1\\ \\ 1\\,]\\mathbf x$$ (족보 2013) 가제어 부분만 남기게 축소하라. 축소된 식은 observable인가?`, [
  {
    title: "controllable 판정 — 안 됨",
    body: `$AB=\\begin{bmatrix}-1&3\\\\3&-1\\end{bmatrix}\\begin{bmatrix}1\\\\1\\end{bmatrix}=\\begin{bmatrix}2\\\\2\\end{bmatrix}$ → $\\mathcal C=\\begin{bmatrix}1&2\\\\1&2\\end{bmatrix}$, $\\det=0$ → $\\rho=1<2$ → <strong>NOT controllable</strong>.`
  },
  {
    title: "mode 분리 — eigenvector로 좌표 잡기",
    body: `$A$의 eigenvalue: $(\\lambda+1)^2-9=0\\Rightarrow\\lambda=2,\\ -4$. eigenvector는 $\\lambda{=}2$일 때 $[1\\ 1]^T$, $\\lambda{=}{-4}$일 때 $[1\\ {-1}]^T$.<br>
    그런데 <strong>$B=[1\\ 1]^T$가 정확히 $\\lambda{=}2$의 eigenvector</strong> → 입력은 $\\lambda{=}2$ mode만 흔듦. $\\lambda{=}{-4}$ 방향($[1\\ {-1}]^T$)은 uncontrollable.`
  },
  {
    title: "변환 $Q=[\\,v_2\\ v_{-4}\\,]$로 분해",
    body: `$Q=\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$, $Q^{-1}=\\tfrac12\\begin{bmatrix}1&1\\\\1&-1\\end{bmatrix}$. 그러면
    $$\\bar A=Q^{-1}AQ=\\begin{bmatrix}2&0\\\\0&-4\\end{bmatrix},\\quad \\bar B=Q^{-1}B=\\begin{bmatrix}1\\\\0\\end{bmatrix},\\quad \\bar C=CQ=[\\,2\\ \\ 0\\,].$$
    $\\bar B,\\bar C$의 둘째 성분이 0 → $z_2$(=$\\lambda{=}{-4}$ mode)는 $u$·$y$ <strong>둘 다 단절(c̄ō)</strong>.`
  },
  {
    title: "가제어 부분으로 축소",
    body: `controllable인 $z_1$만 남기면
    $$\\dot z_1 = 2z_1 + u,\\qquad y = 2z_1.$$
    1차 시스템임(원래 unstable mode $\\lambda{=}2$만 살아남음).`
  },
  {
    title: "축소된 식은 observable? — Yes",
    body: `1차에서 $\\bar C=2\\ne0$ → <strong>observable ✓</strong>. (원래 full 시스템은 $\\mathcal O=\\begin{bmatrix}1&1\\\\2&2\\end{bmatrix}$, $\\det=0$이라 unobservable이었음.) 축소로 c̄ō였던 $\\lambda{=}{-4}$ mode를 떼어내니 남은 co 부분은 당연히 controllable &amp; observable — 이게 바로 ${term("minimal-realization", "최소실현")}.`
  }
])}

<h2>8. Controllability Index $\\mu$</h2>
${defCard("Controllability Index", `
$[\\,B\\ AB\\cdots A^{\\mu-1}B\\,]$가 처음으로 rank $n$이 되는 <strong>최소 차수 $\\mu$</strong>(${term("controllability-index", "가제어성 지수")}). $\\mu\\le n-p+1,\\ p=\\rho(B)$.
<br><br>
다입력이면 $B$의 열이 여러 개라 $A^{n-1}B$까지 안 가도 일찍 full rank가 됨 — 그 "언제 full rank 되나"가 $\\mu$. 닮음변환·열 순서를 바꿔도 $\\mu$는 불변이고, $p=\\rho(B)$가 클수록(입력이 많을수록) 상한이 작아짐(입력이 많으면 더 빨리 전 상태에 도달).
<br><br>
예: $A=\\begin{bmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{bmatrix},\\ B=\\begin{bmatrix}0\\\\0\\\\1\\end{bmatrix}$ ($p=1,\\ n=3$). $[B]$ rank 1, $[B\\ AB]=\\begin{bmatrix}0&0\\\\0&1\\\\1&0\\end{bmatrix}$ rank 2, $[B\\ AB\\ A^2B]$ rank 3 → 처음 full rank가 $A^2B$까지 → <strong>$\\mu=3$</strong>. 상한 $n-p+1=3$과 일치(단일입력은 항상 $\\mu=n$).
`)}

<div class="excluded-block">
<p class="excl-block-label">⬇️ 9절 체크 (안정화 퀴즈) — 시험 제외</p>
<h2>9. 체크</h2>
${mcQuiz(
  "stabilizable의 PBH 판정에서 체크하는 $\\lambda$는?",
  ["모든 eigenvalue $\\lambda$", "$\\text{Re}(\\lambda)<0$인 $\\lambda$만", "$\\text{Re}(\\lambda)\\ge0$인 $\\lambda$만", "$\\lambda=0$만"],
  2,
  "이미 안정한($\\text{Re}<0$) mode는 놔둬도 되니, unstable한($\\text{Re}\\ge0$) $\\lambda$에 대해서만 $\\rho([A-\\lambda I\\ B])=n$이면 stabilizable."
)}

${mcQuiz(
  "족보 2017 p3-1 시스템($\\lambda=0,-3$)에서 $u=Fx$로 옮길 수 없는 eigenvalue는?",
  ["$\\lambda=0$ (controllable이라 옮김 가능)", "$\\lambda=-3$ (uncontrollable이라 고정)", "둘 다 옮길 수 있다", "둘 다 못 옮긴다"],
  1,
  "$A+BF$가 상삼각으로 유지돼 eigenvalue가 $f_1,\\ -3$. $\\lambda=-3$ mode는 uncontrollable이라 고정되지만, 이미 stable이라 stabilizable엔 문제없음."
)}

</div>
${note(`<strong>Ch6 마무리:</strong> controllable/observable(강) ⊃ stabilizable/detectable(약). 판정은 PBH로 위험한 mode만 골라 보거나, Jordan block 독립성·Kalman 분해로 구조를 봄. co 부분만 남기면 ${term("minimal-realization", "최소실현")}(Ch7 개념 — <strong>이번 시험범위 아님</strong>이지만 Ch9에서 다시 씀). 다음은 Ch8 상태궤환·관측기 — controllable이면 극 임의배치, stabilizable이면 최소한 안정화 보장!`, "tip")}
`);
