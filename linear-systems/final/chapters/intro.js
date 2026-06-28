registerPage("intro", "시작하기", () => `
<h1>📐 선형시스템론 기말고사 대비</h1>
<p class="lead">강태삼 교수님 / Chen 교재 6~9장 / 손계산으로 끝낸다.</p>

${profMemo(`
<ul style="margin:4px 0 0; padding-left:18px;">
  <li><strong>시험일: 6월 11일(목).</strong> 평소보다 <strong>1시간 앞당겨</strong> 시작 (0528 강의 공지).</li>
  <li><strong>범위: 중간 이후 전부</strong> — <a onclick="window.go('ch6-controllability')" style="cursor:pointer;color:var(--accent);text-decoration:underline;">Ch6 가제어/가관측</a> · <a onclick="window.go('ch8-feedback')" style="cursor:pointer;color:var(--accent);text-decoration:underline;">Ch8 상태궤환·관측기</a> · <a onclick="window.go('ch9-poleplacement')" style="cursor:pointer;color:var(--accent);text-decoration:underline;">Ch9 극배치·모델매칭</a>.</li>
  <li><strong>"계산하고 풀 수 있는 문제 낼 거니까."</strong> 개념 이해 + 간단한 적용. 문제 안 꼬음.</li>
  <li><strong>"버리는 건 안 돼."</strong> 한 단원도 통째로 포기 금지 — 골고루 출제.</li>
  <li><strong>계산기 없이</strong> 손으로 풀 수 있는 수준. 행렬은 대부분 <strong>2×2, 많아야 3×3</strong>.</li>
  <li><strong>증명 노가다 없음.</strong> 표준 절차를 정확히 적용하는 게 핵심.</li>
</ul>
`)}

<h2>이 사이트 사용법</h2>
<ul>
  <li>왼쪽 메뉴 순서대로(Ch6→7→8→9) 진행하면 돼.</li>
  <li>각 페이지 끝의 <strong>"학습 완료" 버튼</strong> — 진도 자동 저장 (localStorage).</li>
  <li>퀴즈는 즉시 채점. 워크스루는 <em>"다음 단계 ↓"</em>를 누를 때마다 풀이가 <strong>아래로 쌓여</strong> — 이전 단계 보면서 따라가기.</li>
  <li>수식은 KaTeX 렌더링 — 천천히 읽고 손으로도 한 번씩 써봐.</li>
  <li><strong>밑줄 친 용어</strong>를 누르면 <strong>우측 패널</strong>에 설명이 떠 — 페이지 이동 없이 확인. 🌱 초록=선행 복습, 🔷 파랑=개념 심화.</li>
</ul>

<h2>기말 출제 예측 (강의 녹취 + 족보 기준)</h2>
<table>
  <tr><th>유형</th><th>챕터</th><th>난이도</th><th>출제 예측</th></tr>
  <tr><td><strong>Coprime fraction 제어기 풀이</strong> (Sylvester 행렬)</td><td>Ch 9</td><td>중</td><td>${tag("매우 유력", "must")}</td></tr>
  <tr><td>Controllability / Observability 판정</td><td>Ch 6</td><td>하~중</td><td>${tag("매우 유력", "must")}</td></tr>
  <tr><td>State feedback $K$로 극배치</td><td>Ch 8</td><td>중</td><td>${tag("유력", "exam")}</td></tr>
  <tr><td>Stabilizable / Detectable 설명+판정</td><td>Ch 6</td><td>중</td><td>${tag("시험 제외", "concept")}</td></tr>
  <tr><td>Observer gain $L$ 설계</td><td>Ch 8</td><td>중</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>Robust tracking / Internal model 설계</td><td>Ch 9</td><td>중</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>개념 정의 (well-posed / total stability / implementable)</td><td>Ch 9</td><td>하</td><td>${tag("가끔", "concept")}</td></tr>
  <tr><td>Coprimeness 판정</td><td>Ch 7</td><td>하</td><td>${tag("가끔", "concept")}</td></tr>
</table>

${note(`<strong>핵심 통찰:</strong> 교수님이 0526·0528 강의에서 <em>같은 예제 $G(s)=\\frac{s-2}{s^2-1}$의 coprime fraction 극배치를 두 번</em> 풀었어. "손으로 풀 수 있다"고 반복 — <strong>Sylvester 행렬로 제어기 계수 푸는 문제는 거의 확정</strong>이라고 보고 마스터하자.`, "tip")}

<h2>1주일 학습 플랜</h2>
<table>
  <tr><th>Day</th><th>내용</th><th>시간</th></tr>
  <tr><td>1</td><td>Ch 6 Controllability / Observability — 판정법 3종(행렬·Gramian·PBH)</td><td>2~3h</td></tr>
  <tr><td>2</td><td>Ch 6 Stabilizable·Detectable·index + Ch 7 Coprime / Minimal realization</td><td>2~3h</td></tr>
  <tr><td>3</td><td>Ch 8 State feedback 극배치 (계수비교 + Lyapunov 방법)</td><td>2~3h</td></tr>
  <tr><td>4</td><td>Ch 8 Robust tracking·적분제어 + State estimator·separation</td><td>2~3h</td></tr>
  <tr><td>5</td><td><strong>Ch 9 Coprime fraction 극배치 (Sylvester) — 집중</strong></td><td>3h</td></tr>
  <tr><td>6</td><td>Ch 9 Internal model·model matching·total stability + 모의고사 1</td><td>3h</td></tr>
  <tr><td>7</td><td>모의고사 2 + 약점 보강 + 족보 p3 다시 풀기</td><td>2~3h</td></tr>
</table>

${note(`Coprime fraction 극배치(Sylvester)와 controllability/observability 판정은 <strong>거의 무조건</strong> 나와. 막히면 이거부터.`, "warn")}

<h2>참고 자료</h2>
<ul>
  <li>📕 교재: Chi-Tsong Chen, <em>Linear System Theory and Design</em> (Oxford) — Ch 6~9</li>
  <li>📁 강의 녹취: <code>~/Documents/선형시스템론/음성/</code> (0428·0512·0519·0526·0528)</li>
  <li>📄 족보: <code>~/Documents/선형시스템론/선시 중간 족보.pdf</code> (기말 관련: 2017 p3 — controllability/feedback/coprimeness)</li>
  <li>📁 중간 노트: <code>~/Documents/선형시스템론/midterm/</code></li>
</ul>
`);
