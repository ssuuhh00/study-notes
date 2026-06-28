registerPage("greek", "그리스 문자 읽는 법", () => `
<h1>🔤 그리스 문자 읽는 법</h1>
<p class="lead">이 노트(Ch6~9)에 <strong>실제로 나오는 그리스 문자</strong> + "C·O처럼 생긴" 헷갈리는 특수 기호를 정리 — 읽는 법 + 이 과목에서 뭘 가리키는지. 수식을 소리 내어 읽을 수 있으면 암기가 훨씬 쉬움.</p>

${note(`표기 팁: 소문자($\\lambda,\\ \\rho,\\ \\mu\\ \\cdots$)와 대문자($\\Delta,\\ \\Phi\\ \\cdots$)는 보통 <strong>다른 뜻</strong>임. 예로 $\\delta$(델타, 작은 변화)와 $\\Delta$(델타, 특성다항식)는 읽기는 같아도 역할이 다름.`, "tip")}

<h2>1. 이 노트에 나오는 문자</h2>
<table>
  <tr><th>기호</th><th>이름 (영어)</th><th>읽기</th><th>이 과목에서 주로 가리키는 것</th></tr>
  <tr><td style="font-size:22px">$\\lambda$</td><td>lambda</td><td><strong>람다</strong></td><td><strong>고유값(eigenvalue) = 극(pole).</strong> $\\det(\\lambda I-A)=0$의 근. 안정성($\\operatorname{Re}\\lambda<0$)·PBH 판정의 주인공. (Ch6·8·9 전반)</td></tr>
  <tr><td style="font-size:22px">$\\rho$</td><td>rho</td><td><strong>로</strong> (로우)</td><td><strong>rank(계수).</strong> $\\rho(\\mathcal C)=n$이면 controllable, $\\rho(\\mathcal O)=n$이면 observable, $\\rho(B)=p$. (판정 전반)</td></tr>
  <tr><td style="font-size:22px">$\\mu$</td><td>mu</td><td><strong>뮤</strong></td><td><strong>controllability index(가제어성 지수).</strong> $[\\,B\\ AB\\cdots A^{\\mu-1}B\\,]$가 처음 full rank 되는 최소 차수. (Ch6)</td></tr>
  <tr><td style="font-size:22px">$\\tau$</td><td>tau</td><td><strong>타우</strong></td><td><strong>적분 더미변수(시간).</strong> Gramian $W_c=\\int_0^t e^{A\\tau}BB^Te^{A^T\\tau}\\,d\\tau$의 $\\tau$. (Ch6 Gramian)</td></tr>
  <tr><td style="font-size:22px">$\\phi$</td><td>phi</td><td><strong>파이</strong> (피)</td><td><strong>internal model 다항식 $\\phi(s)$.</strong> 레퍼런스·외란의 unstable pole들의 LCM. step→$\\phi=s$, $\\sin\\omega t$→$\\phi=s^2+\\omega^2$. 제어기 분모에 박음. (Ch9)</td></tr>
  <tr><td style="font-size:22px">$\\omega$</td><td>omega (소문자)</td><td><strong>오메가</strong></td><td><strong>(각)주파수.</strong> $\\sin\\omega t$, $s^2+\\omega^2$. (Ch9 internal model)</td></tr>
  <tr><td style="font-size:22px">$\\Delta$</td><td>Delta (대문자)</td><td><strong>델타</strong></td><td>① 원하는 <strong>특성다항식</strong> $\\Delta_d(s)$ (Ch8 극배치 계수비교) ② <strong>Mason 공식</strong>의 분모 $\\Delta$ (Ch9). 둘 다 "기준이 되는 다항식".</td></tr>
</table>

<h2>2. 헷갈리기 쉬운 짝 — 그리스 vs 알파벳</h2>
${defCard("모양·소리가 비슷한 것들", `
시험에서 자주 섞이는 짝들. <strong>둘 다 같은 식에 나오기도</strong> 하니 구분 필수.
<table>
<tr><th>그리스</th><th>닮은 알파벳</th><th>구분</th></tr>
<tr><td>$\\rho$ (로, rank)</td><td>$p$ (피, 입력 개수)</td><td>$\\rho(B)=p$ — <strong>$\\rho$는 "rank 함수", $p$는 그 값(입력 수)</strong>. 손글씨에서 특히 주의.</td></tr>
<tr><td>$\\mu$ (뮤, 지수)</td><td>$u$ (유, 입력신호)</td><td>$\\mu$는 controllability index(숫자), $u$는 입력 $u(t)$. 꼬리 방향이 반대.</td></tr>
<tr><td>$\\omega$ (오메가, 주파수)</td><td>$w$ (더블유, 외란)</td><td>$\\omega$는 주파수, $w$는 disturbance(외란). robust tracking에서 <strong>둘 다 등장</strong>.</td></tr>
<tr><td>$\\phi$ (파이, internal model)</td><td>$\\Phi$ (대문자 파이)</td><td>이 노트의 $\\phi(s)$는 internal model 다항식. (대문자 $\\Phi$=상태천이행렬은 중간 범위라 기말엔 거의 안 씀.)</td></tr>
<tr><td>$\\Delta$ (델타, 다항식)</td><td>$\\delta$ / $d$</td><td>대문자 $\\Delta$=특성다항식·Mason. 소문자 $\\delta$=작은 변화량·임펄스, $d$=직달항($D$)·차수.</td></tr>
</table>
`)}

<h2>3. 그 외 자주 보는 그리스 문자 (참고)</h2>
<p>이 노트엔 거의 안 나오지만 제어·수학에서 흔함 — 눈에 익혀두면 좋음.</p>
<table>
  <tr><th>기호</th><th>읽기</th><th>흔한 의미</th></tr>
  <tr><td>$\\alpha,\\ \\beta$</td><td>알파, 베타</td><td>계수·각도 등 일반 상수</td></tr>
  <tr><td>$\\gamma,\\ \\Gamma$</td><td>감마</td><td>이득·곡선; 대문자 $\\Gamma$는 행렬</td></tr>
  <tr><td>$\\delta$</td><td>델타(소문자)</td><td>미소 변화, 임펄스 $\\delta(t)$</td></tr>
  <tr><td>$\\theta$</td><td>세타</td><td>각도·파라미터</td></tr>
  <tr><td>$\\sigma$</td><td>시그마(소문자)</td><td>특이값(singular value)·표준편차</td></tr>
  <tr><td>$\\textstyle\\sum$ / $\\Sigma$</td><td>시그마(대문자)</td><td>합(summation). Mason 공식의 $\\textstyle\\sum$이 이것.</td></tr>
  <tr><td>$\\pi,\\ \\Pi$</td><td>파이</td><td>$\\pi=3.14\\ldots$; 대문자 $\\Pi$는 곱(product)</td></tr>
  <tr><td>$\\int$</td><td>인테그랄</td><td>적분 (그리스문자가 아니라 길게 늘인 S)</td></tr>
</table>

<h2>4. ✋ 그리스는 아니지만 자주 헷갈리는 기호</h2>
${defCard("필기체·특수 기호 (C·O처럼 생긴 것들)", `
"$\\mathcal C$·$\\mathcal O$처럼 생긴" 멋부린 글자는 <strong>그리스가 아니라 라틴 문자의 필기체(calligraphic)</strong>임. 평범한 글자가 이미 다른 뜻이라, 구분하려고 모양만 바꾼 것.
<table>
<tr><th>기호</th><th>정체 / 읽기</th><th>뜻</th></tr>
<tr><td style="font-size:20px">$\\mathcal C$</td><td>필기체 C</td><td><strong>가제어성 행렬</strong> $[B\\ AB\\ A^2B\\cdots]$. 평범한 $C$(출력행렬 $y=Cx$)와 <strong>구분</strong>하려고 꼬부랑체.</td></tr>
<tr><td style="font-size:20px">$\\mathcal O$</td><td>필기체 O</td><td><strong>가관측성 행렬</strong> ($C,\\ CA,\\ CA^2\\cdots$ 세로로 쌓음). 숫자 $0$과 안 헷갈리게 꼬부랑체.</td></tr>
<tr><td style="font-size:20px">$\\mathbb R$</td><td>블랙보드볼드 R</td><td><strong>실수 집합.</strong> $A\\in\\mathbb R^{n\\times n}$ = "$A$는 $n\\times n$ 실수행렬".</td></tr>
<tr><td style="font-size:20px">$\\hat x$</td><td>엑스 햇 (hat·모자)</td><td><strong>추정값.</strong> observer가 추정한 상태 $\\hat x$ (진짜 $x$의 추정치).</td></tr>
<tr><td style="font-size:20px">$\\bar A,\\ \\bar K$</td><td>에이 바 (bar)</td><td><strong>변환된 것.</strong> 닮음변환 후 $\\bar A=PAP^{-1}$, Lyapunov법의 $\\bar K$ 등.</td></tr>
<tr><td style="font-size:20px">$\\dot x$</td><td>엑스 닷 (dot·점)</td><td><strong>시간 미분</strong> $dx/dt$. 상태방정식 $\\dot x=Ax+Bu$의 그 점.</td></tr>
<tr><td style="font-size:20px">$W_c,\\ W_o$</td><td>더블유 c / o</td><td><strong>Gramian</strong>(제어 $W_c$, 관측 $W_o$). 아래첨자 c·o가 controllability·observability.</td></tr>
<tr><td style="font-size:20px">$\\succ 0$</td><td>"양정부호"</td><td><strong>positive definite.</strong> $W_c\\succ0$ = "$W_c$는 양정부호(고유값 다 양수)".</td></tr>
</table>
`)}

${note(`읽기 요령: $\\rho(\\mathcal C)=n$은 "로 C는 n"이 아니라 "<strong>C의 랭크가 n</strong>", $\\Delta_d(s)$는 "<strong>델타 d of s</strong>(원하는 특성다항식)"로 읽으면 뜻이 바로 붙음.`, "tip")}
`);
