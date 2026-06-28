registerPage("intro", "시작하기", () => `
<h1>📐 선형시스템론 중간고사 대비</h1>
<p class="lead">강태삼 교수님 / Chen 교재 1~5장 / 1주일 안에 끝낸다.</p>

${profMemo(`
<ul style="margin:4px 0 0; padding-left:18px;">
  <li><strong>시험 범위: 5장까지.</strong> 1·2장은 별로 안 나옴 → <a onclick="window.go('ch3-eigen')" style="cursor:pointer;color:var(--accent);text-decoration:underline;">Ch3 고유값</a> / <a onclick="window.go('ch4-realization')" style="cursor:pointer;color:var(--accent);text-decoration:underline;">Ch4 상태공간</a> / <a onclick="window.go('ch5-bibo')" style="cursor:pointer;color:var(--accent);text-decoration:underline;">Ch5 안정도</a>에 올인.</li>
  <li><strong>HW에서 1문제 이상은 그대로.</strong> 과제 5개 + 책 예제 꼭 다시 풀 것.</li>
  <li><strong>개념 이해 + 응용</strong>이 출제 기준. 문제는 별로 안 꼬고 거의 그대로 나옴.</li>
  <li><strong>계산 난이도 상한: 3×3 역행렬</strong> 정도까지. 그 이상 복잡한 산수는 나오지 않음.</li>
  <li><strong>증명 문제 없음.</strong> 개념 설명 + 직접 계산 위주.</li>
  <li><strong>계산기 필요 없음.</strong> 손으로 풀 수 있는 수준으로만 출제.</li>
</ul>
`)}

<h2>이 사이트 사용법</h2>
<ul>
  <li>왼쪽 메뉴 순서대로 진행하면 돼.</li>
  <li>각 페이지 끝에 <strong>"학습 완료" 버튼</strong> — 진도 자동 저장 (브라우저 localStorage).</li>
  <li>퀴즈는 즉시 채점. 워크스루는 <em>"다음 단계 ↓"</em>를 누를 때마다 아래로 단계가 <strong>쌓여</strong>가니까 이전 풀이도 그대로 보면서 따라갈 수 있어.</li>
  <li>수식은 KaTeX로 렌더링됨 — 천천히 읽고 손으로도 한 번씩 써봐.</li>
  <li><strong>밑줄 친 용어</strong>를 누르면 <strong>우측 패널</strong>에서 설명이 펼쳐져 — 페이지 이동 없이 바로 확인하고 닫으면 원래 자리 그대로. 🌱 초록 토글은 선행 선형대수, 🔷 파랑 토글은 개념 심화야 — 아는 내용은 건너뛰면 돼.</li>
</ul>

<h2>강태삼 교수님 출제 패턴 (2013, 2015 족보 기준)</h2>
<table>
  <tr><th>유형</th><th>챕터</th><th>배점</th><th>출제 빈도</th></tr>
  <tr><td>Convolution $y = x * h$</td><td>Ch 2</td><td>15~20</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>Eigenvalue/vector + Diagonalization</td><td>Ch 3</td><td>20</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>Cayley-Hamilton으로 $e^{At}$</td><td>Ch 3</td><td>10~15</td><td>${tag("매년", "must")}</td></tr>
  <tr><td>Linear eq 일반해 (rank/null)</td><td>Ch 3</td><td>15</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>State-space realization</td><td>Ch 4</td><td>10~20</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>State equation 풀이 + steady-state</td><td>Ch 4~5</td><td>15~25</td><td>${tag("자주", "exam")}</td></tr>
  <tr><td>BIBO / Lyapunov stability</td><td>Ch 5</td><td>10~15</td><td>${tag("가끔", "concept")}</td></tr>
</table>

${note(`<strong>핵심 통찰:</strong> 시험은 <em>매번 거의 같은 유형</em>이야. Cayley-Hamilton으로 $e^{At}$를 자유자재로 계산하고, 합성곱을 그래프 그려가면서 풀고, 전달함수 → 상태공간 변환을 외우다시피 하면 절반 이상 먹고 들어가.`, "tip")}

<h2>1주일 학습 플랜</h2>
<table>
  <tr><th>Day</th><th>내용</th><th>시간</th></tr>
  <tr><td>1</td><td>Ch 3 선형대수 기초 (vector space ~ rank)</td><td>2~3h</td></tr>
  <tr><td>2</td><td>Ch 3 Eigenvalue, Diagonalization, <strong>Cayley-Hamilton</strong></td><td>3h</td></tr>
  <tr><td>3</td><td>Ch 2 Convolution + Ch 4 Realization</td><td>2~3h</td></tr>
  <tr><td>4</td><td>Ch 4 상태방정식 풀이 + Ch 5 BIBO</td><td>2~3h</td></tr>
  <tr><td>5</td><td>Ch 5 Internal/Lyapunov + 과제 문제 다시 풀기</td><td>2h</td></tr>
  <tr><td>6</td><td>모의고사 1회 → 채점 → 약점 보강</td><td>3h</td></tr>
  <tr><td>7</td><td>모의고사 2회 + 족보 다시 풀기</td><td>2~3h</td></tr>
</table>

${note(`Cayley-Hamilton 으로 $e^{At}$ 계산은 <strong>거의 무조건</strong> 나와. 막히면 다른 거 다 제쳐놓고 이거부터 마스터.`, "warn")}

<h2>참고 자료</h2>
<ul>
  <li>📕 교재: Chi-Tsong Chen, <em>Linear System Theory and Design</em> (Oxford)</li>
  <li>📁 강의자료: <code>~/Documents/선형시스템론/강의자료/</code></li>
  <li>📁 과제 (문제 + 제출본): <code>~/Documents/선형시스템론/과제/</code></li>
  <li>📄 족보 (2013, 2015): <code>~/Documents/선형시스템론/선시 중간.pdf</code></li>
</ul>
`);
