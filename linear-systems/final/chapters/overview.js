registerPage("overview", "전체 흐름 한눈에", () => `
<h1>🗺️ 전체 흐름 — 큰 그림 한 장</h1>
<p class="lead">개별 정리를 외우기 전에 <strong>"이 과목이 결국 뭘 하려는 건가"</strong>를 먼저 잡자. 기말 범위(Ch6~9)는 사실 <strong>딱 하나의 이야기</strong>야 — <em>"주어진 시스템을 원하는 대로 움직이는 제어기를 어떻게 설계하나?"</em></p>

${profMemo(`시험은 챕터별로 나오지만, 머릿속엔 <strong>이 한 줄</strong>로 꿰어 둬:
<br><strong>Ch6 "할 수 있나?" → Ch7 "표현을 깔끔히" → Ch8 "상태공간으로 설계" → Ch9 "전달함수로 설계".</strong>
<br>Ch8과 Ch9는 <u>같은 목표(극배치)를 다른 언어로</u> 푸는 거야. 이걸 알면 헷갈리는 게 절반으로 줄어.`)}

<h2>1. 로드맵 (노드를 클릭하면 해당 챕터로 이동)</h2>
<div class="roadmap">
<svg viewBox="0 0 880 400" role="img" aria-label="Ch6에서 Ch9까지의 학습 흐름도">
  <defs>
    <marker id="rm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L7,3 L0,6 Z" class="rm-arrowhead"/>
    </marker>
  </defs>

  <!-- band labels -->
  <text x="120" y="118" text-anchor="middle" class="rm-band">① 진단 — 할 수 있나?</text>
  <text x="370" y="118" text-anchor="middle" class="rm-band">② 표현 정리</text>
  <text x="640" y="22" text-anchor="middle" class="rm-band">③ 제어기 설계 — 어떻게?</text>

  <!-- edges -->
  <line x1="222" y1="186" x2="266" y2="186" class="rm-edge" marker-end="url(#rm-arrow)" style="color:var(--text-dim)"/>
  <path d="M472,160 C510,140 510,108 536,100" class="rm-edge" marker-end="url(#rm-arrow)" style="color:var(--text-dim)"/>
  <path d="M472,212 C510,232 510,272 536,280" class="rm-edge" marker-end="url(#rm-arrow)" style="color:var(--text-dim)"/>
  <!-- Ch8<->Ch9: same goal, different language -->
  <path d="M640,148 L640,228" class="rm-edge" style="stroke-dasharray:5 4; color:var(--text-dim)"/>
  <text x="654" y="192" class="rm-edge-label">같은 극배치 ·</text>
  <text x="654" y="205" class="rm-edge-label">다른 언어</text>

  <!-- Ch6 node -->
  <g class="rm-node" onclick="window.go('ch6-controllability')">
    <rect x="22" y="138" width="200" height="96" rx="10"/>
    <text x="122" y="166" text-anchor="middle" class="rm-ch">Ch 6</text>
    <text x="122" y="190" text-anchor="middle" class="rm-title">가제어성 · 가관측성</text>
    <text x="122" y="210" text-anchor="middle" class="rm-sub">제어/관측이 가능한가?</text>
    <text x="122" y="225" text-anchor="middle" class="rm-sub">(C·O 행렬, PBH)</text>
  </g>

  <!-- Ch7 node -->
  <g class="rm-node" onclick="window.go('ch7-coprime')">
    <rect x="270" y="138" width="200" height="96" rx="10"/>
    <text x="370" y="166" text-anchor="middle" class="rm-ch">Ch 7</text>
    <text x="370" y="190" text-anchor="middle" class="rm-title">최소실현 · 서로소분수</text>
    <text x="370" y="210" text-anchor="middle" class="rm-sub">군더더기 없는 표현</text>
    <text x="370" y="225" text-anchor="middle" class="rm-sub">(coprime, 약분 금지)</text>
  </g>

  <!-- Ch8 node -->
  <g class="rm-node" onclick="window.go('ch8-feedback')">
    <rect x="540" y="52" width="200" height="96" rx="10"/>
    <text x="640" y="80" text-anchor="middle" class="rm-ch">Ch 8 · 상태공간</text>
    <text x="640" y="104" text-anchor="middle" class="rm-title">상태궤환 + 관측기</text>
    <text x="640" y="124" text-anchor="middle" class="rm-sub">u = −Kx · 극배치 · observer</text>
    <text x="640" y="139" text-anchor="middle" class="rm-sub">separation principle</text>
  </g>

  <!-- Ch9 node -->
  <g class="rm-node" onclick="window.go('ch9-poleplacement')">
    <rect x="540" y="232" width="200" height="96" rx="10"/>
    <text x="640" y="260" text-anchor="middle" class="rm-ch">Ch 9 · 전달함수</text>
    <text x="640" y="284" text-anchor="middle" class="rm-title">극배치 · 모델매칭</text>
    <text x="640" y="304" text-anchor="middle" class="rm-sub">C = B/A · Sylvester 행렬</text>
    <text x="640" y="319" text-anchor="middle" class="rm-sub">internal model</text>
  </g>

  <text x="440" y="372" class="rm-hint">진단이 끝나야(가능해야) 설계로 넘어갈 수 있다. Ch7은 두 설계 언어를 잇는 다리.</text>
</svg>
</div>

${note(`로드맵의 <code>u = −Kx</code>, <code>C = B/A</code> 같은 표기는 챕터에서 차근차근 풀어줄 거야 — 지금은 "아, 이런 게 있구나" 정도만 잡고 넘어가도 돼.`, "info")}

<h2>2. 챕터별 — 무엇을 배우고(IN), 그걸로 뭘 하나(OUT)</h2>
<p>각 챕터를 <strong>"입력 → 출력"</strong>으로 보면 흐름이 보여. <span style="color:var(--text-dim)">아래 카드의 "→ 바로가기"로 점프.</span></p>

<div class="flow-grid">

  <div class="flow-card c6">
    <h3><span class="fc-ch">Ch 6</span>가제어성 · 가관측성 <span style="font-size:13px;color:var(--text-dim)">— 가능성 진단</span></h3>
    <div class="fc-row">
      <div class="fc-k">큰 질문</div><div>이 시스템, 입력으로 원하는 상태까지 <strong>몰고 갈 수 있나?</strong>(controllable) / 출력만 보고 <strong>속을 알아낼 수 있나?</strong>(observable)</div>
      <div class="fc-k">배우는 것</div><div>판정법 3종 — 가제어성/가관측성 <strong>행렬 rank</strong>, <strong>Gramian</strong>, <strong>PBH test</strong>. 닮음변환 불변성, stabilizable/detectable.</div>
      <div class="fc-k">그걸로 뭘</div><div>Ch8·Ch9에서 "극을 <strong>아무 데나</strong> 놓을 수 있다"의 <strong>전제조건</strong>. controllable이라야 state feedback이, observable이라야 observer가 동작.</div>
    </div>
    <a class="fc-jump" onclick="window.go('ch6-controllability')">→ Ch6 바로가기</a>
  </div>

  <div class="flow-card c7">
    <h3><span class="fc-ch">Ch 7</span>최소실현 · 서로소분수 <span style="font-size:13px;color:var(--text-dim)">— 표현 정리</span></h3>
    <div class="fc-row">
      <div class="fc-k">큰 질문</div><div>같은 시스템도 표현이 여럿인데, <strong>군더더기 없는(최소) 표현</strong>은 뭐고 왜 중요한가?</div>
      <div class="fc-k">배우는 것</div><div><strong>최소실현</strong> = controllable & observable. <strong>coprime(서로소)</strong> = 분자·분모에 <strong>약분되는 공통근이 없음</strong>. Sylvester resultant / Bezout로 판정.</div>
      <div class="fc-k">그걸로 뭘</div><div>Ch9 극배치의 <strong>해 존재 조건</strong>이 바로 "$N,D$ coprime". 약분(특히 unstable)이 있으면 설계가 깨지고 total stability도 무너짐.</div>
    </div>
    <a class="fc-jump" onclick="window.go('ch7-coprime')">→ Ch7 바로가기</a>
  </div>

  <div class="flow-card c8">
    <h3><span class="fc-ch">Ch 8</span>상태궤환 · 상태추정기 <span style="font-size:13px;color:var(--text-dim)">— 상태공간(시간영역) 설계</span></h3>
    <div class="fc-row">
      <div class="fc-k">큰 질문</div><div>상태 $x$를 직접 만질 수 있다면, 폐루프 극을 <strong>원하는 위치로</strong> 어떻게 옮기나? 못 재는 상태는?</div>
      <div class="fc-k">배우는 것</div><div><strong>State feedback</strong> $u=r-Kx$ → $A-BK$ 극배치(계수비교 / Lyapunov). <strong>Observer</strong> $A-LC$로 상태 추정. <strong>Separation</strong>: $K$와 $L$ 따로 설계.</div>
      <div class="fc-k">그걸로 뭘</div><div>실제 제어기의 골격. tracking(전향이득·적분제어)까지. <strong>Ch6의 controllable/observable이 여기서 직접 쓰임.</strong></div>
    </div>
    <a class="fc-jump" onclick="window.go('ch8-feedback')">→ Ch8 바로가기</a>
  </div>

  <div class="flow-card c9">
    <h3><span class="fc-ch">Ch 9</span>극배치 · 모델매칭 <span style="font-size:13px;color:var(--text-dim)">— 전달함수(입출력) 설계</span></h3>
    <div class="fc-row">
      <div class="fc-k">큰 질문</div><div>상태를 못 만지고 <strong>입출력 전달함수만</strong> 있을 때, 제어기 $C(s)=B/A$를 어떻게 설계하나?</div>
      <div class="fc-k">배우는 것</div><div>폐루프 특성식 $F=DA+NB$ → <strong>Sylvester 행렬로 연립</strong> 풀이(★최우선 출제). <strong>Internal model</strong>(적분기)로 robust tracking, model matching, total stability.</div>
      <div class="fc-k">그걸로 뭘</div><div>Ch8과 <strong>같은 극배치를 전달함수 언어로</strong>. 출력궤환이라 더 현실적. 개념(well-posed·implementable)도 함께.</div>
    </div>
    <a class="fc-jump" onclick="window.go('ch9-poleplacement')">→ Ch9 바로가기</a>
  </div>

</div>

<h2>3. 두 개의 설계 언어 — Ch8 vs Ch9</h2>
<p>가장 헷갈리는 포인트. 둘 다 <strong>"극을 원하는 곳에 놓는다"</strong>는 같은 목표인데, 쓰는 도구가 달라.</p>
<table>
  <tr><th></th><th>Ch 8 (상태공간)</th><th>Ch 9 (전달함수)</th></tr>
  <tr><td><strong>표현</strong></td><td>$\\dot x=Ax+Bu,\\ y=Cx$</td><td>$G(s)=N(s)/D(s)$</td></tr>
  <tr><td><strong>제어기</strong></td><td>$u=r-Kx$ (상태궤환)</td><td>$C(s)=B(s)/A(s)$ (출력궤환)</td></tr>
  <tr><td><strong>설계 대상</strong></td><td>gain 행렬 $K$ (그리고 $L$)</td><td>제어기 다항식 $A(s),B(s)$ 계수</td></tr>
  <tr><td><strong>극배치 식</strong></td><td>$\\det(sI-(A-BK))=\\Delta_d(s)$</td><td>$D A+N B=F(s)$</td></tr>
  <tr><td><strong>푸는 법</strong></td><td>계수 비교 연립 / Lyapunov</td><td>Sylvester 행렬 연립</td></tr>
  <tr><td><strong>전제</strong></td><td>$\\{A,B\\}$ controllable</td><td>$N,D$ coprime</td></tr>
  <tr><td><strong>상태 측정</strong></td><td>필요 (없으면 observer)</td><td>불필요 (입출력만)</td></tr>
</table>
${note(`핵심: <strong>둘은 경쟁이 아니라 같은 동전의 양면</strong>이야. "controllable ↔ coprime", "$K$ ↔ $A,B$ 계수", "계수비교 ↔ Sylvester"로 1:1 대응시켜 외우면 두 챕터가 하나로 합쳐져.`, "tip")}

<h2>4. 선행(중간고사) 개념이 어디서 쓰이나</h2>
<p>기말은 중간 내용을 <strong>도구로 가져다 써</strong>. 가물가물하면 아래 링크로 바로 복습 (새 탭에서 열림).</p>
${recall(
  "고유값 · 특성다항식 — 극(pole)의 정체",
  `극배치의 '극'이 바로 $A$의 <strong>고유값</strong>이자 $\\det(sI-A)=0$의 근이야. 안정성($\\text{Re}\\,\\lambda<0$) 판단의 기본.`,
  "ch3-eigen", "고유값/고유벡터 복습"
)}
${recall(
  "대각화 · 닮음변환 — 모드 분리",
  `PBH가 "모드별로" 가제어성을 보는 것, 닮음변환해도 가제어성이 안 변하는 것 모두 <strong>대각화/닮음</strong> 직관에서 나와.`,
  "ch3-diagonal", "대각화 복습"
)}
${recall(
  "전달함수 ↔ 상태공간 · 실현(realization)",
  `Ch7 최소실현, Ch9의 $G(s)=N/D$가 전부 이 변환 위에 서 있어. $G(s)=C(sI-A)^{-1}B+D$.`,
  [["ch4-realization", "전달함수 · 실현 복습"], ["ch4-solution", "상태방정식 풀이 복습"]]
)}
${recall(
  "BIBO 안정 · 내부안정 — total stability의 뿌리",
  `Ch9 total stability·well-posed는 중간의 <strong>BIBO/내부안정</strong>을 입출력 쌍 전체로 확장한 거야.`,
  [["ch5-bibo", "BIBO 안정 복습"], ["ch5-internal", "내부안정 복습"]]
)}

<h2>5. 한 문장 요약</h2>
${defCard("기말 한 문장", `
<strong>"먼저 <span style="color:var(--accent)">제어·관측이 가능한지 진단(Ch6)</span>하고, <span style="color:var(--accent-2)">표현을 군더더기 없이 정리(Ch7)</span>한 뒤, 같은 극배치를 <span style="color:var(--warn)">상태공간(Ch8)</span>과 <span style="color:var(--danger)">전달함수(Ch9)</span> 두 언어로 설계한다."</strong>
<br><br>이 문장이 머리에 박히면, 각 페이지의 정리들이 "이 흐름의 어디쯤"인지 자리를 찾아가.`)}
`);
