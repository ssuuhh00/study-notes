// Central glossary for Linear Systems — 기말 (Ch6~9).
// Keys are kebab-case. Entries: { term, ko, short, definition, related, cat }.
// cat: "prereq" (선행 복습) | "core" (기말 핵심)
// `short` is hover/preview; `definition` is HTML+KaTeX in the right panel.

window.GLOSSARY = {
  // ================= 선행 복습 =================
  "eigenvalue": {
    term: "Eigenvalue", ko: "고유값", cat: "prereq",
    short: "$A\\mathbf v=\\lambda\\mathbf v$를 만족하는 $\\lambda$. $\\det(\\lambda I-A)=0$의 근.",
    definition: `<p><strong>정의.</strong> $A\\mathbf v=\\lambda\\mathbf v$ ($\\mathbf v\\ne0$)를 만족하는 스칼라 $\\lambda$. 곧 특성방정식 $\\det(\\lambda I - A)=0$의 근이야.</p>
      <p><strong>왜 중요?</strong> 시스템의 <strong>mode</strong>를 결정해. 해가 $\\mathbf x(t)=\\sum c_i e^{\\lambda_i t}\\mathbf v_i$ 꼴이라, $\\lambda$가 그 모드의 지수 $e^{\\lambda t}$를 정해.
      <ul><li>$\\text{Re}(\\lambda)<0$ → 그 모드는 감쇠(안정)</li>
      <li>$\\text{Re}(\\lambda)>0$ → 발산(불안정)</li>
      <li>허수부 있으면 진동 포함</li></ul></p>
      <p><strong>제어에서.</strong> "극(pole)"이 바로 이 eigenvalue야. <strong>극배치 = 폐루프의 eigenvalue를 원하는 위치로 옮기는 것.</strong></p>
      <p><strong>미니 예.</strong> $A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}$ → $\\det(\\lambda I-A)=\\lambda^2+3\\lambda+2=(\\lambda+1)(\\lambda+2)$ → $\\lambda=-1,-2$ (둘 다 안정).</p>`,
    related: ["characteristic-polynomial", "rank", "similarity-transform"],
    midterm: "ch3-eigen"
  },
  "rank": {
    term: "Rank", ko: "계수", cat: "prereq",
    short: "행렬의 독립인 열(또는 행)의 개수.",
    definition: `<p><strong>정의.</strong> 행렬에서 1차독립인 열(=행)의 최대 개수. "정보가 몇 차원을 채우나"의 척도.</p>
      <p><strong>핵심 동치.</strong> $n\\times n$ 행렬에서 <strong>full rank $n$</strong> ⟺ nonsingular ⟺ $\\det\\ne0$ ⟺ 역행렬 존재 ⟺ 열들이 전체 공간 span.</p>
      <p><strong>왜 중요?</strong> 가제어성·가관측성 판정이 전부 "판정행렬이 full rank냐"로 귀결돼. $\\rho(\\mathcal C)=n$이면 controllable, $\\rho(\\mathcal O)=n$이면 observable.</p>
      <p><strong>손계산 팁.</strong> 정방행렬이면 $\\det\\ne0$만 보면 되고, 비정방이면 행연산(REF)으로 0 아닌 행 수를 세.</p>`,
    related: ["nullspace", "eigenvalue"],
    midterm: [["ch3-rank", "Rank · 행연산 복습"]]
  },
  "nullspace": {
    term: "Null Space", ko: "영공간", cat: "prereq",
    short: "$A\\mathbf x=\\mathbf 0$의 해 집합. $\\dim N(A)=n-\\rho(A)$.",
    definition: `<p><strong>정의.</strong> $A\\mathbf x=\\mathbf 0$을 만족하는 모든 $\\mathbf x$의 집합. "$A$가 0으로 짓뭉개는 방향들".</p>
      <p><strong>rank–nullity.</strong> $\\dim N(A)=n-\\rho(A)$. → rank가 부족($<n$)하면 영공간이 비지 않아(0 아닌 해 존재). 이게 가제어/가관측이 깨지는 모드와 직결.</p>`,
    related: ["rank"],
    midterm: "ch3-rank"
  },
  "similarity-transform": {
    term: "Similarity Transform", ko: "닮음변환", cat: "prereq",
    short: "$\\bar A=PAP^{-1}$. 상태변수 $\\bar{\\mathbf x}=P\\mathbf x$로 좌표를 바꾸는 것.",
    definition: `<p><strong>정의.</strong> nonsingular $P$로 좌표를 바꿈: $\\bar{\\mathbf x}=P\\mathbf x$ → $\\bar A=PAP^{-1},\\ \\bar B=PB,\\ \\bar C=CP^{-1}$.</p>
      <p><strong>직관.</strong> "같은 시스템을 다른 상태변수(좌표축)로 적은 것"일 뿐, 물리적 시스템은 그대로야.</p>
      <p><strong>불변량(외워둘 것).</strong> eigenvalue, 특성다항식, 전달함수, <strong>가제어성·가관측성</strong>이 모두 보존돼. (Ch6 정리 6.2·6.3) → 그래서 판정 전에 보기 편한 좌표로 바꿔도 결론은 안 바뀜.</p>
      <p><strong>쓰임.</strong> 대각화·Jordan형·companion형 변환이 전부 이것. Ch8 Lyapunov 극배치의 $A-BK=TFT^{-1}$도 닮음.</p>`,
    related: ["eigenvalue", "controllability"],
    midterm: [["ch3-diagonal", "대각화 · 닮음 복습"]]
  },
  "characteristic-polynomial": {
    term: "Characteristic Polynomial", ko: "특성다항식", cat: "prereq",
    short: "$\\Delta(s)=\\det(sI-A)$. 근이 eigenvalue.",
    definition: `<p><strong>정의.</strong> $\\Delta(s)=\\det(sI-A)$, $n$차 monic 다항식. 그 근이 $A$의 eigenvalue이자 시스템의 pole.</p>
      <p><strong>왜 핵심?</strong> 극배치는 결국 "이 다항식을 내가 원하는 다항식 $\\Delta_d(s)$로 만들기"야. 그래서 $\\det(sI-(A-BK))=\\Delta_d(s)$의 <strong>계수를 비교</strong>해 $K$를 구해.</p>
      <p><strong>미니 예.</strong> 원하는 극 $\\{-1,-2,-3\\}$ → $\\Delta_d(s)=(s+1)(s+2)(s+3)=s^3+6s^2+11s+6$.</p>`,
    related: ["eigenvalue", "pole-placement"],
    midterm: "ch3-eigen"
  },
  "transfer-function": {
    term: "Transfer Function", ko: "전달함수", cat: "prereq",
    short: "$G(s)=C(sI-A)^{-1}B+D=\\dfrac{N(s)}{D(s)}$.",
    definition: `<p><strong>정의.</strong> 초기조건 0에서 입력→출력의 라플라스 비 $G(s)=Y(s)/U(s)$.</p>
      <p><strong>상태공간과의 다리.</strong> $G(s)=C(sI-A)^{-1}B+D$. 분모 $D(s)=\\det(sI-A)$의 근=<strong>pole</strong>, 분자 $N(s)$의 근=<strong>zero</strong>.</p>
      <p><strong>두 세계.</strong> Ch8은 $(A,B,C,D)$로, Ch9는 $G(s)=N/D$로 같은 시스템을 다룬다. 이 변환이 그 둘을 잇는 다리.</p>
      <p><strong>주의.</strong> pole–zero가 약분되면 전달함수는 짧아지지만 상태공간엔 그 모드가 살아있어(가제어/가관측 상실). → 최소실현·total stability 이슈로 연결.</p>`,
    related: ["pole-zero-cancellation", "coprime", "bibo-stability"],
    midterm: [["ch4-realization", "실현(realization) 복습"]]
  },
  "final-value-theorem": {
    term: "Final Value Theorem", ko: "최종값 정리", cat: "prereq",
    short: "$x(\\infty)=\\lim_{s\\to0}sX(s)$ (극이 LHP일 때).",
    definition: `<p><strong>정리.</strong> $\\displaystyle\\lim_{t\\to\\infty}x(t)=\\lim_{s\\to0}sX(s)$ — 단, $sX(s)$의 극이 모두 좌반면일 때만 유효(아니면 극한이 발산/진동).</p>
      <p><strong>짝꿍(초기값 정리).</strong> $x(0^+)=\\lim_{s\\to\\infty}sX(s)$.</p>
      <p><strong>쓰임.</strong> step 입력 $r=a/s$를 줬을 때 정상상태 출력 $y(\\infty)$을 구해 <strong>추종 여부(DC gain=1?)</strong>를 확인. 예: 폐루프 $T(s)$에서 $y(\\infty)=\\lim_{s\\to0}s\\cdot T(s)\\cdot\\frac{a}{s}=a\\,T(0)$ → $T(0)=1$이라야 정확 추종.</p>`,
    related: ["tracking", "feedforward-gain"],
    midterm: [["ch4-solution", "상태방정식 해 · 라플라스 복습"]]
  },
  "bibo-stability": {
    term: "BIBO Stability", ko: "유계입력-유계출력 안정", cat: "prereq",
    short: "유계 입력 → 유계 출력. 전달함수 모든 pole이 LHP.",
    definition: `<p><strong>정의.</strong> Bounded Input → Bounded Output. 모든 유계 입력에 대해 출력이 유계로 유지.</p>
      <p><strong>판정.</strong> 전달함수(기약분수)의 <strong>모든 pole이 좌반면</strong>($\\text{Re}<0$). RHP나 허수축 위 pole이 하나라도 있으면 BIBO 불안정.</p>
      <p><strong>내부안정과의 차이.</strong> BIBO는 입출력만 보는 안정. 약분된 unstable 모드는 입출력엔 안 보여도 내부에선 발산 → Ch9 <strong>total stability</strong>가 이걸 모든 입출력 쌍으로 확장해 막는다.</p>`,
    related: ["transfer-function", "total-stability"],
    midterm: [["ch5-bibo", "BIBO 안정 복습"], ["ch5-internal", "내부안정 복습"]]
  },

  "state-space": {
    term: "State-Space Model", ko: "상태공간 모델", cat: "prereq",
    short: "$\\dot{\\mathbf x}=A\\mathbf x+B\\mathbf u,\\ \\mathbf y=C\\mathbf x+D\\mathbf u$.",
    definition: `<p><strong>정의.</strong> 시스템을 1차 미분방정식 묶음으로: $$\\dot{\\mathbf x}=A\\mathbf x+B\\mathbf u,\\qquad \\mathbf y=C\\mathbf x+D\\mathbf u.$$ $\\mathbf x$=상태(내부 메모리), $\\mathbf u$=입력, $\\mathbf y$=출력.</p>
      <p><strong>왜?</strong> 전달함수는 입출력만 보지만 상태공간은 <strong>내부 상태</strong>까지 본다. 그래서 Ch6 가제어/가관측, Ch8 상태궤환·관측기가 전부 이 표현 위에서 일어나.</p>
      <p><strong>전달함수로.</strong> $G(s)=C(sI-A)^{-1}B+D$.</p>`,
    related: ["transfer-function", "controllability", "companion-form"],
    midterm: [["ch4-realization", "상태공간 · 실현 복습"]]
  },
  "matrix-exponential": {
    term: "Matrix Exponential", ko: "행렬지수", cat: "prereq",
    short: "$e^{At}=\\sum_k \\frac{(At)^k}{k!}$. $\\dot x=Ax$의 해는 $x(t)=e^{At}x_0$.",
    definition: `<p><strong>정의.</strong> $e^{At}=I+At+\\frac{(At)^2}{2!}+\\cdots$. 무입력 시스템 $\\dot{\\mathbf x}=A\\mathbf x$의 해가 $\\mathbf x(t)=e^{At}\\mathbf x_0$ (state transition matrix).</p>
      <p><strong>계산.</strong> 대각화 $A=V\\Lambda V^{-1}$이면 $e^{At}=V\\,\\mathrm{diag}(e^{\\lambda_i t})\\,V^{-1}$. 또는 Cayley–Hamilton / 라플라스 $e^{At}=\\mathcal L^{-1}\\{(sI-A)^{-1}\\}$.</p>
      <p><strong>어디서.</strong> 가제어성 Gramian $W_c=\\int e^{A\\tau}BB^Te^{A^T\\tau}d\\tau$, 관측기 오차 $\\dot e=(A-LC)e$의 수렴 $e(t)=e^{(A-LC)t}e_0$ 모두 여기서 나와.</p>`,
    related: ["eigenvalue", "controllability-gramian", "state-space"],
    midterm: [["ch3-cayley", "Cayley–Hamilton · 행렬지수 복습"], ["ch4-solution", "상태방정식 해 복습"]]
  },
  "companion-form": {
    term: "Companion Form", ko: "동반형", cat: "prereq",
    short: "특성다항식 계수를 마지막 행에 늘어놓은 표준형.",
    definition: `<p><strong>정의.</strong> 특성다항식 $s^n+a_{n-1}s^{n-1}+\\cdots+a_0$의 계수를 한 행(또는 열)에 그대로 박은 표준 행렬형. 예: $$A_c=\\begin{bmatrix}0&1&0\\\\0&0&1\\\\-a_0&-a_1&-a_2\\end{bmatrix}.$$</p>
      <p><strong>왜 편한가?</strong> 마지막 행만 바꾸면 특성다항식이 바로 바뀌어 → <strong>단일입력 극배치</strong>가 계수 한 줄 맞추기로 끝나. 실현(realization)·극배치의 단골 표준형.</p>`,
    related: ["characteristic-polynomial", "pole-placement", "state-space"],
    midterm: [["ch4-realization", "동반형 · 실현 복습"]]
  },
  "positive-definite": {
    term: "Positive Definite", ko: "양정치", cat: "prereq",
    short: "모든 $\\mathbf x\\ne0$에서 $\\mathbf x^TM\\mathbf x>0$. ($M\\succ0$)",
    definition: `<p><strong>정의.</strong> 대칭행렬 $M$이 모든 $\\mathbf x\\ne0$에서 $\\mathbf x^TM\\mathbf x>0$이면 $M\\succ0$. 동치: 모든 eigenvalue $>0$ (또는 모든 leading principal minor $>0$).</p>
      <p><strong>어디서.</strong> 가제어성 Gramian이 <strong>nonsingular ⟺ $W_c\\succ0$</strong>. $\\succ0$이면 역행렬이 있어 상태를 옮기는 입력을 구성할 수 있어. Lyapunov 안정성에서도 등장.</p>`,
    related: ["controllability-gramian", "lyapunov-equation"]
  },
  "lcm": {
    term: "Least Common Multiple (poly)", ko: "최소공배수(다항식)", cat: "prereq",
    short: "여러 다항식을 모두 나누는 최소 차수 다항식. internal model $\\phi(s)$ 구성.",
    definition: `<p><strong>정의.</strong> 여러 다항식이 공통으로 가져야 할 인수를 모은, 가장 낮은 차수의 다항식.</p>
      <p><strong>어디서.</strong> Ch9 internal model에서 레퍼런스 $r$과 외란 $w$의 <strong>unstable pole들의 LCM</strong> $\\phi(s)$를 제어기 분모에 넣어. step($1/s$) 둘이면 $\\phi=s$, step과 $\\sin\\omega t$면 $\\phi=s(s^2+\\omega^2)$.</p>`,
    related: ["internal-model-principle", "robust-tracking"]
  },

  // ================= Ch6 핵심 =================
  "controllability": {
    term: "Controllability", ko: "가제어성", cat: "core",
    short: "입력 $u$로 상태를 임의의 곳으로 유한시간에 옮길 수 있나?",
    definition: `<p>임의의 초기상태 $\\mathbf x_0$를 임의의 목표상태 $\\mathbf x_1$으로 <strong>유한시간 안에</strong> 옮기는 입력 $\\mathbf u$가 존재하면 그 상태(시스템)는 controllable.</p>
      <p>판정: ① 가제어성 행렬 $\\mathcal C=[B\\ AB\\cdots A^{n-1}B]$가 rank $n$, ② Gramian $W_c\\succ0$, ③ PBH: 모든 $\\lambda$에서 $\\rho([A-\\lambda I\\ B])=n$.</p>
      <p>입력 크기 제한 없음, 경로 무관 — 유한시간에 갈 수만 있으면 됨.</p>`,
    related: ["controllability-matrix", "controllability-gramian", "pbh-test", "observability", "stabilizable"]
  },
  "controllability-matrix": {
    term: "Controllability Matrix", ko: "가제어성 행렬", cat: "core",
    short: "$\\mathcal C=[\\,B\\ AB\\ A^2B\\ \\cdots\\ A^{n-1}B\\,]$.",
    definition: `<p>$$\\mathcal C=[\\,B\\ \\ AB\\ \\ A^2B\\ \\cdots\\ A^{n-1}B\\,]$$</p>
      <p><strong>판정.</strong> $\\rho(\\mathcal C)=n$ ⟺ controllable. 단일입력이면 $\\mathcal C$가 $n\\times n$ 정방이라 <strong>$\\det\\ne0$만</strong> 확인하면 끝.</p>
      <p><strong>왜 $A^{n-1}$까지만?</strong> Cayley–Hamilton 때문에 $A^n$ 이상은 $I,A,\\dots,A^{n-1}$의 1차결합이라 새 방향을 안 줘. 그래서 $n$개 블록이면 충분.</p>
      <p><strong>미니 예.</strong> $A=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix},\\ B=\\begin{bmatrix}1\\\\0\\end{bmatrix}$ → $AB=\\begin{bmatrix}0\\\\0\\end{bmatrix}$ → $\\mathcal C=\\begin{bmatrix}1&0\\\\0&0\\end{bmatrix}$, $\\det=0$ → <strong>uncontrollable</strong>. (둘째 상태가 입력에 안 닿음.)</p>`,
    related: ["controllability", "controllability-index"],
    midterm: [["ch3-cayley", "Cayley–Hamilton 복습"], ["ch3-rank", "Rank · det 복습"]]
  },
  "controllability-gramian": {
    term: "Controllability Gramian", ko: "가제어성 그래미안", cat: "core",
    short: "$W_c(t)=\\int_0^t e^{A\\tau}BB^Te^{A^T\\tau}d\\tau$. nonsingular ⟺ controllable.",
    definition: `<p>$$W_c(t)=\\int_0^t e^{A\\tau}BB^Te^{A^T\\tau}\\,d\\tau$$</p>
      <p><strong>판정.</strong> 어떤 $t>0$에서 $W_c(t)\\succ0$(<span title="positive definite">양정치</span>=nonsingular)이면 controllable.</p>
      <p><strong>직관.</strong> $\\mathbf x_0\\to\\mathbf x_1$로 보내는 최소에너지 입력이 $\\mathbf u(\\tau)=B^Te^{A^T(t_1-\\tau)}W_c^{-1}(\\cdots)$ — 여기 <strong>$W_c^{-1}$가 필요</strong>해서 $W_c\\succ0$이 곧 "이동 가능". 못 옮기는 방향이 있으면 $W_c$가 그 방향으로 0이 돼 singular.</p>
      <p><strong>Lyapunov 형.</strong> $A$가 stable이면 $W_c=\\int_0^\\infty\\!\\cdots$가 $AW_c+W_cA^T=-BB^T$의 해.</p>`,
    related: ["controllability", "lyapunov-equation", "positive-definite", "matrix-exponential"]
  },
  "pbh-test": {
    term: "PBH Test", ko: "PBH 판정법", cat: "core",
    short: "모든 eigenvalue $\\lambda$에서 $\\rho([A-\\lambda I\\ B])=n$ ⟺ controllable.",
    definition: `<p>Popov–Belevitch–Hautus. 각 eigenvalue $\\lambda$마다 $$\\rho([\\,A-\\lambda I\\ \\ B\\,])=n$$ 이면 controllable. ($\\lambda$가 eigenvalue가 아니면 $A-\\lambda I$가 이미 full rank라 자동 통과 → <strong>eigenvalue에서만</strong> 확인하면 됨.)</p>
      <p><strong>장점.</strong> 행렬 rank 판정과 결론은 같지만, <strong>어떤 모드(어느 $\\lambda$)가 uncontrollable한지 콕 집어내</strong>. stabilizable 판정(unstable $\\lambda$만 검사)에 딱.</p>
      <p><strong>미니 예.</strong> 위 $A=\\begin{bmatrix}0&1\\\\0&-3\\end{bmatrix},B=\\begin{bmatrix}1\\\\0\\end{bmatrix}$. $\\lambda=-3$에서 $[A+3I\\ B]=\\begin{bmatrix}3&1&1\\\\0&0&0\\end{bmatrix}$ → rank $1<2$ → <strong>$\\lambda=-3$ 모드가 uncontrollable</strong>. (단 이 모드는 안정이라 stabilizable는 OK.)</p>
      <p><strong>가관측성 판정.</strong> $\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$.</p>`,
    related: ["controllability", "observability", "stabilizable"]
  },
  "controllability-index": {
    term: "Controllability Index", ko: "가제어성 지수", cat: "core",
    short: "$[B\\ AB\\cdots A^{\\mu-1}B]$가 rank $n$ 되는 최소 $\\mu$.",
    definition: `<p>$[\\,B\\ AB\\cdots A^{\\mu-1}B\\,]$가 처음으로 rank $n$이 되는 최소 차수 $\\mu$. 다입력이면 $A^{n-1}B$까지 안 가도 됨.</p>
      <p>$\\mu\\le n-p+1$ ($p=\\rho(B)$). 닮음변환·열 순서 바꿔도 불변.</p>`,
    related: ["controllability-matrix", "controllability"]
  },
  "observability": {
    term: "Observability", ko: "가관측성", cat: "core",
    short: "출력 $y$만 보고 초기상태 $\\mathbf x_0$를 알아낼 수 있나?",
    definition: `<p>유한시간 동안의 입력 $u$와 출력 $y$만으로 초기상태 $\\mathbf x_0$를 <strong>유일하게</strong> 결정할 수 있으면 observable. (초기치 알면 입력으로 전구간 상태 결정.)</p>
      <p>판정: 가관측성 행렬 $\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}$가 rank $n$. PBH: 모든 $\\lambda$에서 $\\rho\\begin{bmatrix}A-\\lambda I\\\\C\\end{bmatrix}=n$.</p>`,
    related: ["observability-matrix", "duality", "controllability", "detectable", "state-estimator"]
  },
  "observability-matrix": {
    term: "Observability Matrix", ko: "가관측성 행렬", cat: "core",
    short: "$\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix}$ (세로로 쌓음).",
    definition: `<p>$$\\mathcal O=\\begin{bmatrix}C\\\\CA\\\\CA^2\\\\\\vdots\\\\CA^{n-1}\\end{bmatrix},\\qquad \\rho(\\mathcal O)=n\\ \\Leftrightarrow\\ \\text{observable}$$</p>`,
    related: ["observability", "duality"]
  },
  "duality": {
    term: "Duality", ko: "쌍대성", cat: "core",
    short: "$\\{A,B\\}$ controllable ⟺ $\\{A^T,B^T\\}$ observable.",
    definition: `<p>$\\{A,B\\}$가 controllable ⟺ $\\{A^T,B^T\\}$가 observable. 마찬가지로 $\\{A,C\\}$ observable ⟺ $\\{A^T,C^T\\}$ controllable.</p>
      <p>→ 가관측성 문제를 전치해서 가제어성 결과로 그대로 푼다. Observer 설계 = 전치한 state feedback.</p>`,
    related: ["controllability", "observability", "state-estimator"]
  },
  "stabilizable": {
    term: "Stabilizable", ko: "안정화가능", cat: "core",
    short: "unstable mode가 모두 controllable (안정화만 가능하면 OK).",
    definition: `<p>controllable이 아니어도, <strong>unstable한 mode(eigenvalue가 RHP)들이 전부 controllable</strong>이면 stabilizable. state feedback으로 그 mode들을 LHP로 옮겨 안정화 가능.</p>
      <p>PBH: $\\text{Re}(\\lambda)\\ge0$인 $\\lambda$에 대해서만 $\\rho([A-\\lambda I\\ B])=n$이면 됨.</p>`,
    related: ["controllability", "detectable", "state-feedback", "pbh-test"]
  },
  "detectable": {
    term: "Detectable", ko: "검출가능", cat: "core",
    short: "unstable mode가 모두 observable.",
    definition: `<p>observable이 아니어도, <strong>unstable한 mode들이 전부 observable</strong>이면 detectable. observer로 그 상태를 추정해 안정한 추정오차를 만들 수 있음.</p>
      <p>stabilizable의 쌍대 개념.</p>`,
    related: ["observability", "stabilizable", "state-estimator"]
  },

  // ================= Ch7 핵심 =================
  "minimal-realization": {
    term: "Minimal Realization", ko: "최소실현", cat: "core",
    short: "$G(s)$를 실현하는 최소 차수 $(A,B,C,D)$. ⟺ controllable & observable.",
    definition: `<p>전달함수 $G(s)$를 실현하는 상태공간 중 <strong>차수가 가장 작은</strong> 것. $(A,B,C,D)$가 minimal ⟺ $\\{A,B\\}$ controllable <strong>그리고</strong> $\\{A,C\\}$ observable.</p>
      <p>최소 차수 = $G(s)$를 기약분수로 줄였을 때 분모 차수.</p>`,
    related: ["coprime", "controllability", "observability", "pole-zero-cancellation", "kalman-decomposition"]
  },
  "kalman-decomposition": {
    term: "Kalman Decomposition", ko: "칼만 분해", cat: "core",
    short: "닮음변환으로 상태를 co / cō / c̄o / c̄ō 4부분으로 분해. $G(s)$엔 co만 나타남.",
    definition: `<p><strong>정의.</strong> 시스템을 가제어/가관측 조합에 따라 네 부분으로 쪼갬:</p>
      <ul>
      <li><strong>co</strong> (ctrb &amp; obsv): $u$·$y$ 둘 다 연결 — 전달함수에 나타나는 유일한 부분.</li>
      <li><strong>cō</strong> (ctrb, unobsv): $u$엔 연결, $y$엔 안 나타남.</li>
      <li><strong>c̄o</strong> (unctrb, obsv): $u$로 못 움직임, $y$엔 나타남.</li>
      <li><strong>c̄ō</strong>: $u$·$y$ 둘 다 단절(완전히 숨음).</li>
      </ul>
      <p><strong>핵심.</strong> $G(s)=C(sI-A)^{-1}B$는 <strong>co 부분만</strong> 반영(나머지는 약분). 그래서 <strong>minimal realization = co 부분</strong> ⟺ controllable &amp; observable.</p>`,
    related: ["minimal-realization", "controllability", "observability", "pole-zero-cancellation"]
  },
  "jordan-form-test": {
    term: "Jordan-form c/o Test", ko: "조던형 가제어·가관측 판정", cat: "core",
    short: "같은 λ의 Jordan block별로 (B 마지막 행 / C 첫 열)의 independence로 c/o 판정.",
    definition: `<p><strong>아이디어.</strong> Jordan형에서 c/o를 eigenvalue별로 읽음. 같은 $\\lambda$의 Jordan block 수 $=n-\\rho(A-\\lambda I)$(기하적 중복도).</p>
      <ul>
      <li><strong>Controllable</strong> ⟺ 각 block <strong>마지막 행</strong>에 대응하는 $B$ 행들이 independent.</li>
      <li><strong>Observable</strong> ⟺ 각 block <strong>첫 열</strong>에 대응하는 $C$ 열들이 independent.</li>
      </ul>
      <p>한 $\\lambda$에 block이 $k$개면 그 $\\lambda$를 다 제어/관측하려면 입력/출력 채널이 ≥$k$개. block 1개면 해당 행/열이 0만 아니면 OK. PBH가 각 $\\lambda$에서 rank 보는 것과 동치.</p>`,
    related: ["controllability", "observability", "pbh-test", "kalman-decomposition"]
  },
  "two-parameter-controller": {
    term: "Two-parameter Controller", ko: "2-파라미터 제어기", cat: "core",
    short: "$u=\\frac1A(Lr-My)$. 분모 $AD+MN=F$(극), 분자 $NL=E$(영점)를 독립으로 맞춤.",
    definition: `<p><strong>구조.</strong> 레퍼런스 경로 $C_1=L/A$, 출력 궤환 경로 $C_2=M/A$로 따로:
      $$u=\\frac1{A(s)}[L(s)r-M(s)y],\\quad \\hat g_o=\\frac{NL}{AD+MN}=\\frac{E}{F}.$$</p>
      <p><strong>왜 쓰나.</strong> 분모 $AD+MN=F$(극)와 분자 $NL=E$(영점)를 <strong>독립으로</strong> 잡아 전달함수 전체를 목표모델 $G_o$에 맞춤(model matching). one-parameter $B/A$는 분자 $NB$가 분모와 엮여 자유도 부족.</p>
      <p><strong>절차.</strong> ① $L=E/N$ → ② Diophantine $AD+MN=F$를 $A,M$에 대해 계수비교로 풀이.</p>`,
    related: ["model-matching", "coprime-fraction", "pole-placement", "implementable"]
  },
  "coprime": {
    term: "Coprime", ko: "서로소", cat: "core",
    short: "두 다항식 $N(s),D(s)$가 공통근이 없음.",
    definition: `<p><strong>정의.</strong> $N(s)$와 $D(s)$가 <strong>공통근(common root)이 없음</strong> = 약분되는 pole–zero가 없음.</p>
      <p><strong>판정 3가지(동치).</strong> 공통인수 없음 ⟺ Sylvester resultant $\\ne0$ ⟺ <strong>Bezout 항등식</strong> $A(s)N(s)+B(s)D(s)=1$을 만족하는 다항식 $A,B$가 존재.</p>
      <p><strong>손으로.</strong> $D=0$의 근과 $N=0$의 근을 구해 겹치는 게 있나 보면 끝.</p>
      <p><strong>미니 예.</strong> $G=\\frac{s-2}{s^2-1}$: $D=0$ → $s=\\pm1$, $N=0$ → $s=2$. 겹침 없음 → <strong>coprime ✓</strong>. 반면 $\\frac{s-1}{s^2-1}$은 $s=1$ 공통 → 약분 → coprime 아님(최소실현 아님).</p>`,
    related: ["minimal-realization", "sylvester-resultant", "bezout", "pole-zero-cancellation"]
  },
  "bezout": {
    term: "Bezout Identity", ko: "베주 항등식", cat: "core",
    short: "$A(s)N(s)+B(s)D(s)=1$ 해 존재 ⟺ $N,D$ coprime.",
    definition: `<p>$A(s)N(s)+B(s)D(s)=1$을 만족하는 다항식 $A(s),B(s)$가 존재 ⟺ $N(s),D(s)$가 coprime. 극배치 제어기 존재성의 근거.</p>`,
    related: ["coprime", "sylvester-resultant", "pole-placement"]
  },
  "sylvester-resultant": {
    term: "Sylvester Resultant Matrix", ko: "실베스터 종결식 행렬", cat: "core",
    short: "$D,N$ 계수를 한 칸씩 shift해 쌓은 행렬. 제어기 계수 연립방정식의 계수행렬.",
    definition: `<p><strong>아이디어.</strong> $DA+NB=F$는 다항식 항등식. 양변의 $s$ 차수별 계수를 맞추면 제어기 계수 $(a_i,b_i)$에 대한 <strong>1차 연립방정식</strong>이 되고, 그 계수행렬이 $S_m$.</p>
      <p>$$S_m\\,[\\text{제어기 계수}]=[F\\text{ 계수}].$$ $D,N$ 계수를 한 칸씩 아래로 shift하며 번갈아 쌓아 만든다.</p>
      <p><strong>해 존재.</strong> $S_m$ full column rank ⟺ 해 존재 ⟺ 제어기 차수 $m\\ge n-1$. $D,N$ coprime이면 $m=n-1$에서 $S_m$이 정방·nonsingular라 <strong>유일해</strong>.</p>
      <p><strong>왜 $m\\ge n-1$?</strong> $F$ 계수는 $n+m+1$개(식), 미지수는 $2(m+1)$개. 미지수 ≥ 식 → $m\\ge n-1$. "원하는 극을 다 박으려면 제어기 다이얼이 충분해야".</p>`,
    related: ["coprime", "pole-placement", "coprime-fraction"]
  },

  // ================= Ch8 핵심 =================
  "state-feedback": {
    term: "State Feedback", ko: "상태궤환", cat: "core",
    short: "$\\mathbf u=r-K\\mathbf x$. 상태를 측정해 입력으로 되먹임.",
    definition: `<p>$\\mathbf u=r-K\\mathbf x$ → 폐루프 $\\dot{\\mathbf x}=(A-BK)\\mathbf x+Br$. $\\{A,B\\}$ controllable이면 $A-BK$의 eigenvalue를 <strong>임의로 배치</strong> 가능.</p>`,
    related: ["pole-placement", "feedforward-gain", "lyapunov-equation", "state-estimator", "stabilizable"]
  },
  "pole-placement": {
    term: "Pole Placement", ko: "극배치", cat: "core",
    short: "feedback gain으로 폐루프 eigenvalue를 원하는 위치로.",
    definition: `<p>$\\det(sI-(A-BK))$를 원하는 특성다항식 $\\Delta_d(s)$와 같게 만드는 $K$를 구함. 계수 비교로 연립, 또는 Lyapunov 방정식 / coprime fraction(Ch9) 방법.</p>`,
    related: ["state-feedback", "characteristic-polynomial", "lyapunov-equation", "coprime-fraction"]
  },
  "feedforward-gain": {
    term: "Feedforward Gain", ko: "전향이득", cat: "core",
    short: "$u=pr-Kx$의 $p$. 폐루프 DC gain을 1로 맞춤.",
    definition: `<p>$u=pr-Kx$에서 $p=1/G_{cl}(0)$로 잡아 $y(\\infty)=r$ (정상상태 추종) 만족. $G_{cl}(0)$은 최종값 정리로 계산.</p>`,
    related: ["tracking", "final-value-theorem", "state-feedback"]
  },
  "regulation": {
    term: "Regulation", ko: "레귤레이션", cat: "core",
    short: "명령 $r=0$. 상태/에러를 0으로 유지.",
    definition: `<p>레퍼런스가 0인 경우. 외란·초기치를 0으로 되돌리는 것이 목표.</p>`,
    related: ["tracking", "servomechanism", "state-feedback"]
  },
  "tracking": {
    term: "Tracking", ko: "추종", cat: "core",
    short: "특정 입력(step 등)을 출력이 따라가게.",
    definition: `<p>$y(t)\\to r(t)$가 되도록. 보통 step 같은 특정 신호 추종. 임의의 여러 신호 추종은 <strong>servomechanism</strong>.</p>`,
    related: ["regulation", "servomechanism", "robust-tracking", "feedforward-gain"]
  },
  "servomechanism": {
    term: "Servomechanism", ko: "서보메커니즘", cat: "core",
    short: "임의의 여러 종류 입력을 추종 (주인이 여럿).",
    definition: `<p>step뿐 아니라 ramp·sinusoid 등 여러 종류의 레퍼런스를 추종하는 제어. internal model을 통해 구현.</p>`,
    related: ["tracking", "internal-model-principle"]
  },
  "robust-tracking": {
    term: "Robust Tracking", ko: "강인 추종", cat: "core",
    short: "플랜트 파라미터가 변해도 추종 유지. 적분제어/internal model.",
    definition: `<p>플랜트 파라미터가 변동돼도 정상상태 추종오차가 0이 되도록. 핵심은 레퍼런스/외란의 unstable mode를 제어기 안에 넣는 것(internal model). step이면 적분기 $1/s$.</p>`,
    related: ["tracking", "disturbance-rejection", "integral-control", "internal-model-principle"]
  },
  "disturbance-rejection": {
    term: "Disturbance Rejection", ko: "외란 제거", cat: "core",
    short: "외란 $w$의 영향을 출력에서 제거.",
    definition: `<p>플랜트에 들어오는 외란 $w$가 출력에 미치는 영향을 정상상태에서 0으로. 외란의 unstable mode를 제어기 분모에 포함시켜 제거(internal model).</p>`,
    related: ["robust-tracking", "internal-model-principle", "integral-control"]
  },
  "integral-control": {
    term: "Integral Control", ko: "적분 제어", cat: "core",
    short: "에러를 적분해 더함. augmented state $\\dot x_a=r-y$.",
    definition: `<p>에러의 적분 $x_a=\\int(r-y)\\,dt$를 상태로 추가($\\dot x_a=r-Cx$). $u=Kx+K_ax_a$. step 추종·외란제거의 표준 도구 (internal model의 가장 단순한 형태 $1/s$).</p>`,
    related: ["robust-tracking", "internal-model-principle", "state-feedback"]
  },
  "lyapunov-equation": {
    term: "Lyapunov / Sylvester Equation", ko: "리아프노프·실베스터 방정식", cat: "core",
    short: "$AT-TF=B\\bar K$. 풀어서 $K=\\bar K T^{-1}$로 극배치.",
    definition: `<p>극배치의 또 다른 방법. 원하는 eigenvalue를 가진 $F$를 정하고 $AT-TF=B\\bar K$ (Sylvester 방정식)를 풀어 $T$ → $K=\\bar K T^{-1}$. 그러면 $A-BK=TFT^{-1}$.</p>
      <p>조건: $F$의 eigenvalue가 $A$와 겹치면 안 됨. $\\{A,B\\}$ ctrb & $\\{F,\\bar K\\}$ obsv는 $T$ nonsingular의 <strong>necessary</strong> 조건(sufficient 아님).</p>`,
    related: ["pole-placement", "state-feedback", "controllability-gramian"]
  },
  "state-estimator": {
    term: "State Estimator (Observer)", ko: "상태추정기(관측기)", cat: "core",
    short: "$\\dot{\\hat x}=(A-LC)\\hat x+Bu+Ly$. 출력으로 상태 추정.",
    definition: `<p>$\\dot{\\hat{\\mathbf x}}=(A-LC)\\hat{\\mathbf x}+Bu+Ly$. 추정오차 $e=x-\\hat x$는 $\\dot e=(A-LC)e$ — <strong>입력·상태와 무관</strong>. $\\{A,C\\}$ observable이면 $A-LC$ eigenvalue 임의배치 → $e\\to0$.</p>
      <p>estimator pole은 제어 pole보다 훨씬 왼쪽에(빨리 수렴). $L$ 크게 잡아도 비용 없음(소프트웨어).</p>`,
    related: ["observability", "duality", "separation-principle", "reduced-order-estimator", "detectable"]
  },
  "reduced-order-estimator": {
    term: "Reduced-order Estimator", ko: "축소차수 추정기", cat: "core",
    short: "출력 $q$개면 차원 $n-q$만 추정.",
    definition: `<p>출력 $y$로 이미 알 수 있는 $q$개 상태를 빼고 나머지 $n-q$개만 추정. $F$는 $(n-q)$차 stable, eigenvalue가 $A$와 안 겹쳐야 함.</p>`,
    related: ["state-estimator", "observability"]
  },
  "separation-principle": {
    term: "Separation Principle", ko: "분리 원리", cat: "core",
    short: "추정상태로 궤환해도 제어 pole과 estimator pole이 분리.",
    definition: `<p>$\\hat{\\mathbf x}$로 state feedback해도 폐루프 eigenvalue = <strong>{제어용 $A-BK$ pole} ∪ {estimator $A-LC$ pole}</strong>. 둘을 독립적으로 설계 가능. $r\\to y$ 전달함수는 estimator가 없는 것과 동일.</p>`,
    related: ["state-estimator", "state-feedback", "pole-placement"]
  },

  // ================= Ch9 핵심 =================
  "coprime-fraction": {
    term: "Coprime Fraction Design", ko: "서로소분수 설계", cat: "core",
    short: "$G=\\frac{N}{D},\\ C=\\frac{B}{A}$로 폐루프 특성식 $DA+NB=F$.",
    definition: `<p>플랜트 $G=\\frac{N(s)}{D(s)}$, 제어기 $C=\\frac{B(s)}{A(s)}$. 폐루프 특성다항식 $$F(s)=D(s)A(s)+N(s)B(s)$$ 를 원하는 극의 다항식과 같게. Sylvester 행렬로 $A,B$ 계수 풀이.</p>`,
    related: ["sylvester-resultant", "coprime", "pole-placement", "internal-model-principle"]
  },
  "internal-model-principle": {
    term: "Internal Model Principle", ko: "내부모델 원리", cat: "core",
    short: "레퍼런스/외란의 unstable mode를 제어기 안에 포함시켜라.",
    definition: `<p><strong>원리.</strong> 레퍼런스 $r$·외란 $w$의 <strong>unstable pole들의 LCM</strong> $\\phi(s)$를 <strong>제어기 분모</strong>에 넣으면 그 신호를 정상상태 오차 0으로 추종/제거할 수 있다. → $C(s)=\\dfrac{B(s)}{A(s)\\phi(s)}$.</p>
      <p><strong>예.</strong> step $\\to \\phi=s$(적분기 $1/s$), ramp $\\to \\phi=s^2$, $\\sin\\omega t\\to\\phi=s^2+\\omega^2$.</p>
      <p><strong>왜 되나(직관).</strong> 분모에 $\\phi$가 있으면 그 주파수에서 제어기 이득이 $\\infty$ → 그 성분의 오차를 0으로 짓눌러. PID의 적분기가 바로 이 원리($\\phi=s$).</p>
      <p><strong>조건(Corollary 9.3).</strong> $\\phi(s)$의 근이 $N(s)$의 zero가 <strong>아닐 것</strong>(겹치면 약분돼 추종 실패) + $N,D$ coprime.</p>`,
    related: ["robust-tracking", "integral-control", "coprime-fraction", "servomechanism", "lcm"]
  },
  "model-matching": {
    term: "Model Matching", ko: "모델 매칭", cat: "core",
    short: "$r\\to y$ 전달함수를 원하는 모델 $G_o(s)$와 같게 (pole+zero 모두).",
    definition: `<p>극배치가 pole만 맞춘다면, model matching은 <strong>pole과 zero 모두</strong>를 목표모델 $G_o(s)$에 맞춤. $G_o=1$이면 best possible(명령 그대로 추종).</p>`,
    related: ["pole-placement", "implementable", "coprime-fraction"]
  },
  "implementable": {
    term: "Implementable Transfer Function", ko: "구현가능 전달함수", cat: "core",
    short: "proper + 플랜트 통과 + total stable. 3조건.",
    definition: `<p>목표 전달함수 $G_o(s)$가 실제 구현 가능하려면: ① <strong>proper</strong>(분모차수≥분자차수), ② $r\\to y$가 반드시 <strong>플랜트를 통과</strong>(옆으로 새지 않음), ③ <strong>total stability</strong>.</p>`,
    related: ["model-matching", "well-posed", "total-stability", "proper"]
  },
  "well-posed": {
    term: "Well-posedness", ko: "적절성", cat: "core",
    short: "모든 input-output pair 전달함수가 proper. 조건 $G(\\infty)C(\\infty)\\ne-1$.",
    definition: `<p>폐루프의 모든 입력→출력 전달함수가 proper. 조건: $1+G(\\infty)C(\\infty)\\ne0$. $G$가 strictly proper면 $G(\\infty)=0$이라 무조건 well-posed.</p>`,
    related: ["proper", "total-stability", "implementable"]
  },
  "total-stability": {
    term: "Total Stability", ko: "전체 안정성", cat: "core",
    short: "모든 입출력쌍 BIBO + unstable pole-zero cancellation 없음.",
    definition: `<p><strong>정의.</strong> $r\\to y$뿐 아니라 <strong>모든 입력(noise·외란 포함)→모든 출력</strong> 전달함수가 BIBO stable.</p>
      <p><strong>핵심 조건.</strong> 제어기와 플랜트 사이에 <strong>unstable pole–zero cancellation이 없을 것</strong>. 약분된 unstable 모드는 $r\\to y$엔 안 보여도 다른 경로(noise→y)에 살아남아 발산.</p>
      <p><strong>위험 예(Fig 9.3).</strong> 플랜트의 unstable pole $s=2$를 제어기 zero $s-2$로 약분하면 $r\\to y$는 안정해 <em>보이지만</em>, noise→$y$ 전달함수엔 $\\frac{1}{s-2}$가 남아 <strong>출력 발산</strong>. → 겉보기 안정에 속지 말 것.</p>`,
    related: ["bibo-stability", "pole-zero-cancellation", "well-posed", "implementable"]
  },
  "pole-zero-cancellation": {
    term: "Pole-Zero Cancellation", ko: "극-영점 상쇄", cat: "core",
    short: "분모 pole과 분자 zero가 약분. unstable한 게 약분되면 위험.",
    definition: `<p>전달함수에서 같은 위치의 pole과 zero가 약분. <strong>unstable한($\\text{Re}\\ge0$) pole-zero가 약분</strong>되면 겉보기엔 안정해도 내부적으로 그 mode가 살아 있어 noise/외란에 발산 → total stability 깨짐.</p>`,
    related: ["total-stability", "minimal-realization", "coprime"]
  },
  "mason-gain": {
    term: "Mason's Gain Rule", ko: "메이슨 이득 공식", cat: "core",
    short: "$T=\\frac{\\sum P_k\\Delta_k}{\\Delta}$. 블록선도 전달함수.",
    definition: `<p>$$T=\\frac{\\sum_k P_k\\Delta_k}{\\Delta},\\quad \\Delta=1-\\sum L_i+\\sum L_iL_j-\\cdots$$ $P_k$=forward path 이득, $L$=loop 이득, $\\Delta_k$=$P_k$에 안 닿는 loop만 남긴 $\\Delta$.</p>`,
    related: ["transfer-function"]
  },
  "proper": {
    term: "Proper", ko: "프로퍼", cat: "core",
    short: "분모차수 ≥ 분자차수. strictly proper면 >.",
    definition: `<p>전달함수의 분모 차수 ≥ 분자 차수면 proper(현실적 — 미분기 불필요). 분모 > 분자면 strictly proper. 분자 > 분모(improper)는 미분이 필요해 noise에 취약.</p>`,
    related: ["well-posed", "implementable"]
  },
};

// ============================================================
// Glossary index page — simple browser for all terms.
// ============================================================
registerPage("glossary-index", "용어 사전 전체", () => {
  const entries = Object.entries(window.GLOSSARY);
  const coreCount = entries.filter(([, v]) => v.cat === "core").length;
  const prereqCount = entries.filter(([, v]) => v.cat === "prereq").length;

  const renderEntry = ([key, v]) => `
    <div class="glossary-entry ${v.cat === "prereq" ? "prereq" : ""}"
         data-key="${key}" data-cat="${v.cat}"
         data-searchable="${(key + " " + (v.term || "") + " " + (v.ko || "") + " " + (v.short || "")).toLowerCase()}"
         onclick="window.openTerm('${key}')">
      <span class="glossary-term">${v.term}</span><span class="glossary-ko">${v.ko || ""}</span>
      <div class="glossary-def">${v.short || ""}</div>
    </div>`;

  return `
    <div class="glossary-wrap">
      <h1>📚 용어 사전 전체</h1>
      <p class="lead">항목을 클릭하면 <strong>우측 패널</strong>에서 자세한 설명이 열려.
      본문의 밑줄 친 용어도 마찬가지 — 페이지 이동 없이 바로 확인 가능.</p>
      <input class="glossary-search" id="gl-search" type="text"
        placeholder="검색 — 영어·한글·설명 어디든 (예: controllable, 가관측, PBH, coprime, observer)"
        oninput="window.glFilter()" />
      <div class="glossary-categories">
        <button class="active" data-gl-cat="all" onclick="window.glCat('all')">전체 (${entries.length})</button>
        <button data-gl-cat="core" onclick="window.glCat('core')">🔷 기말 핵심 (${coreCount})</button>
        <button data-gl-cat="prereq" onclick="window.glCat('prereq')">🌱 선행 복습 (${prereqCount})</button>
      </div>
      <div id="glossary-list">${entries.map(renderEntry).join("")}</div>
    </div>
  `;
});

window.glFilter = function () {
  const q = (document.getElementById("gl-search")?.value || "").trim().toLowerCase();
  const activeCat = document.querySelector(".glossary-categories button.active")?.dataset.glCat || "all";
  document.querySelectorAll(".glossary-entry").forEach(el => {
    const matchCat = activeCat === "all" || el.dataset.cat === activeCat;
    const matchQ = !q || el.dataset.searchable.includes(q);
    el.style.display = matchCat && matchQ ? "" : "none";
  });
};

window.glCat = function (cat) {
  document.querySelectorAll(".glossary-categories button").forEach(b =>
    b.classList.toggle("active", b.dataset.glCat === cat));
  window.glFilter();
};
