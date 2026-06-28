// Central glossary for Linear Systems.
// Keys are kebab-case. Entries have { term, ko, short, definition, related, cat }.
// cat: "prereq" (선행 선형대수) | "core" (선형시스템론 핵심)
// `short` is the hover/preview; `definition` is HTML+KaTeX in the right panel.

window.GLOSSARY = {
  // ================= 선행 — 벡터공간 =================
  "field": {
    term: "Field", ko: "체", cat: "prereq",
    short: "덧셈·곱셈·역원이 갖춰진 수 체계. $\\mathbb{R}, \\mathbb{C}, \\mathbb{Q}$ 등.",
    definition: `
      <p>두 연산(덧셈·곱셈)이 <strong>교환·결합·분배</strong>를 만족하고, 덧셈 역원과 (0을 제외한) 곱셈 역원이 존재하는 집합.</p>
      <p>선형시스템론에서는 스칼라 = field의 원소 = 실수 or 복소수.</p>
    `,
    related: ["vector-space", "scalar"]
  },
  "scalar": {
    term: "Scalar", ko: "스칼라", cat: "prereq",
    short: "벡터와 달리 크기만 있는 수. 보통 실수/복소수.",
    definition: `<p>벡터공간 위에 정의된 field에서 온 원소. 벡터를 늘이거나 줄이거나 방향을 뒤집는 역할.</p>`,
    related: ["field", "vector-space"]
  },
  "vector-space": {
    term: "Vector Space", ko: "벡터공간", cat: "prereq",
    short: "벡터 덧셈과 스칼라 곱이 정의된 집합 $(V, F)$.",
    definition: `
      <p>field $F$ 위의 집합 $V$로, 벡터 덧셈과 스칼라 곱이 결합·교환·분배·영원소·역원소를 만족.</p>
      <h4>대표 예시</h4>
      <ul>
        <li>$\\mathbb{R}^n$: $n$개의 실수 튜플</li>
        <li>$\\mathbb{C}^n$: $n$개의 복소수 튜플</li>
        <li>함수공간: 실변수 실함수의 집합</li>
      </ul>
    `,
    related: ["field", "basis", "dimension"]
  },
  "linear-combination": {
    term: "Linear Combination", ko: "선형결합", cat: "prereq",
    short: "$\\alpha_1 v_1 + \\alpha_2 v_2 + \\cdots + \\alpha_k v_k$ 꼴.",
    definition: `
      <p>벡터들에 스칼라를 곱해 합친 형태. <strong>Range space</strong>는 행렬의 열들의 모든 선형결합 집합.</p>
    `,
    related: ["span", "range-space"]
  },
  "linear-independence": {
    term: "Linear Independence", ko: "선형독립", cat: "prereq",
    short: "$\\sum \\alpha_i v_i = 0$의 유일한 해가 모두 $\\alpha_i = 0$.",
    definition: `
      <p>벡터 집합 $\\{v_1, \\ldots, v_k\\}$가 <strong>선형독립</strong>: $\\sum \\alpha_i v_i = 0$의 해가 $\\alpha_i = 0$뿐.</p>
      <p>그렇지 않으면 (= 0이 아닌 $\\alpha_i$가 있으면) 하나의 벡터를 나머지의 선형결합으로 쓸 수 있다 → <strong>선형종속</strong>.</p>
      <h4>왜 중요?</h4>
      <p>$\\mathbb{R}^n$에는 선형독립 벡터를 최대 $n$개까지만 가질 수 있음. 그 최댓값이 <strong>차원(dimension)</strong>. rank도 이 개념으로 정의됨.</p>
    `,
    related: ["basis", "rank", "dimension"]
  },
  "span": {
    term: "Span", ko: "생성공간", cat: "prereq",
    short: "주어진 벡터들의 모든 선형결합 집합.",
    definition: `<p>$\\text{span}\\{v_1, \\ldots, v_k\\} = \\{\\sum \\alpha_i v_i : \\alpha_i \\in F\\}$. 벡터공간의 부분공간을 만드는 방법.</p>`,
    related: ["linear-combination", "basis"]
  },
  "basis": {
    term: "Basis", ko: "기저", cat: "prereq",
    short: "선형독립이면서 공간 전체를 span하는 벡터 집합.",
    definition: `
      <p>벡터공간 $V$의 basis $\\{q_1, \\ldots, q_n\\}$: (1) 선형독립, (2) span이 $V$ 전체.</p>
      <p>그러면 모든 $x \\in V$가 <strong>유일한 방식</strong>으로 $x = \\sum \\alpha_i q_i$로 표현됨. 이때 $(\\alpha_1, \\ldots, \\alpha_n)$이 $x$의 <strong>representation</strong>.</p>
    `,
    related: ["dimension", "representation", "orthonormal"]
  },
  "dimension": {
    term: "Dimension", ko: "차원", cat: "prereq",
    short: "선형독립 벡터의 최댓값 = basis 원소 개수.",
    definition: `<p>$\\mathbb{R}^n$의 차원은 $n$. 벡터공간의 크기를 재는 지표.</p>`,
    related: ["basis", "rank"]
  },
  "representation": {
    term: "Representation", ko: "표현 (좌표)", cat: "prereq",
    short: "basis에 대한 벡터의 좌표 $\\bar x = [\\alpha_1, \\ldots, \\alpha_n]^T$.",
    definition: `
      <p>벡터 $x = \\alpha_1 q_1 + \\cdots + \\alpha_n q_n$일 때, $\\bar x = [\\alpha_i]$가 basis $\\{q_i\\}$에 대한 표현.</p>
      <p>$Q = [q_1 \\, \\cdots \\, q_n]$로 놓으면 $x = Q\\bar x$. basis가 바뀌면 표현도 바뀜 → <strong>similarity transformation</strong>.</p>
    `,
    related: ["basis", "similarity"]
  },

  // ================= 선행 — 노름·내적 =================
  "norm": {
    term: "Norm", ko: "노름", cat: "prereq",
    short: "벡터/행렬의 '크기'를 재는 함수.",
    definition: `
      <p>$\\|x\\| \\geq 0$, $\\|\\alpha x\\| = |\\alpha|\\|x\\|$, 삼각부등식 $\\|x_1+x_2\\| \\leq \\|x_1\\|+\\|x_2\\|$를 만족하는 실함수.</p>
      <h4>대표 3가지 (시험 자주 등장)</h4>
      <ul>
        <li>$L_1$: $\\|x\\|_1 = \\sum |x_i|$ (절댓값 합)</li>
        <li>$L_2$: $\\|x\\|_2 = \\sqrt{\\sum x_i^2}$ (유클리드 길이)</li>
        <li>$L_\\infty$: $\\|x\\|_\\infty = \\max_i |x_i|$ (최대 성분)</li>
      </ul>
      <p>행렬은 <strong>induced norm</strong>: $\\|A\\| = \\sup_{x \\neq 0} \\|Ax\\|/\\|x\\|$.</p>
    `,
    related: ["inner-product", "singular-value"]
  },
  "inner-product": {
    term: "Inner Product", ko: "내적", cat: "prereq",
    short: "$\\langle x, y\\rangle = x^* y$. 노름과 각도의 원천.",
    definition: `
      <p>실벡터: $\\langle x, y\\rangle = x^T y = \\sum x_i y_i$.</p>
      <p>유클리드 노름은 $\\|x\\|_2 = \\sqrt{\\langle x, x\\rangle}$.</p>
      <p><strong>Schwarz 부등식</strong>: $|\\langle x, y\\rangle| \\leq \\|x\\|\\|y\\|$.</p>
    `,
    related: ["norm", "orthogonal"]
  },
  "orthogonal": {
    term: "Orthogonal", ko: "직교", cat: "prereq",
    short: "두 벡터의 내적이 0.",
    definition: `<p>$x_1^T x_2 = 0$. 집합의 원소가 모두 쌍으로 직교하면 orthogonal set.</p>`,
    related: ["orthonormal", "inner-product"]
  },
  "orthonormal": {
    term: "Orthonormal", ko: "정규직교", cat: "prereq",
    short: "단위벡터이면서 서로 직교. $x_i^T x_j = \\delta_{ij}$.",
    definition: `
      <p>길이 1이면서 서로 직교. 행렬 $Q$의 열이 orthonormal이면 $Q^T Q = I$.</p>
      <p>정사각행렬이면 $Q^{-1} = Q^T$ (orthogonal matrix).</p>
    `,
    related: ["orthogonal", "orthogonal-matrix", "schmidt"]
  },
  "schmidt": {
    term: "Schmidt Process", ko: "슈미트 정규직교화", cat: "prereq",
    short: "선형독립 벡터를 orthonormal basis로 바꾸는 절차.",
    definition: `
      <p>$u_1 := e_1$, $u_k := e_k - \\sum_{i<k} (q_i^T e_k) q_i$, $q_k := u_k / \\|u_k\\|$.</p>
      <p>결과 $\\{q_i\\}$가 정규직교 집합.</p>
    `,
    related: ["orthonormal", "basis"]
  },

  // ================= 선행 — 행렬·행렬식 =================
  "transpose": {
    term: "Transpose", ko: "전치", cat: "prereq",
    short: "행과 열을 바꾼 행렬 $A^T$.",
    definition: `
      <p>$(A^T)_{ij} = A_{ji}$.</p>
      <p>성질: $(AB)^T = B^T A^T$, $(A^T)^{-1} = (A^{-1})^T$.</p>
    `,
    related: ["symmetric"]
  },
  "symmetric": {
    term: "Symmetric Matrix", ko: "대칭행렬", cat: "prereq",
    short: "$A = A^T$. 모든 고유값이 실수.",
    definition: `
      <p>$M = M^T$인 실행렬.</p>
      <h4>중요 성질</h4>
      <ul>
        <li>모든 eigenvalue가 실수</li>
        <li>직교행렬 $Q$로 $M = Q D Q^T$ 대각화 가능</li>
        <li>서로 다른 eigenvalue의 eigenvector는 직교</li>
        <li>일반화 eigenvector 체인 없음 (index = 1)</li>
      </ul>
      <p>이차형식, 에너지 함수, Lyapunov에서 핵심 역할.</p>
    `,
    related: ["quadratic", "orthogonal-matrix", "positive-definite"]
  },
  "orthogonal-matrix": {
    term: "Orthogonal Matrix", ko: "직교행렬", cat: "prereq",
    short: "$Q^T Q = Q Q^T = I$, 즉 $Q^{-1} = Q^T$.",
    definition: `
      <p>열(과 행)이 모두 정규직교인 정사각행렬.</p>
      <p>선형변환으로서는 <strong>회전·반사</strong>(길이와 각도 보존).</p>
    `,
    related: ["orthonormal", "symmetric"]
  },
  "determinant": {
    term: "Determinant", ko: "행렬식", cat: "prereq",
    short: "정사각행렬에 배정되는 스칼라. Laplace 전개로 계산.",
    definition: `
      <p>$\\det A = \\sum_j a_{ij} c_{ij}$ (임의의 행 $i$). $c_{ij}$는 cofactor.</p>
      <h4>자주 쓰는 성질</h4>
      <ul>
        <li>$\\det(AB) = \\det A \\cdot \\det B$</li>
        <li>$\\det A^{-1} = 1/\\det A$</li>
        <li>$\\det A = \\prod \\lambda_i$ (eigenvalue의 곱)</li>
        <li>대각/삼각행렬: 대각원소의 곱</li>
        <li>$\\det A = 0$ ⇔ singular ⇔ 역행렬 없음</li>
      </ul>
    `,
    related: ["cofactor", "inverse", "nonsingular"]
  },
  "cofactor": {
    term: "Cofactor", ko: "여인수", cat: "prereq",
    short: "$c_{ij} = (-1)^{i+j} \\det(M_{ij})$.",
    definition: `
      <p>$M_{ij}$는 $i$행 $j$열을 삭제한 $(n-1) \\times (n-1)$ 부분행렬 (= minor).</p>
      <p>역행렬 공식: $A^{-1} = \\frac{1}{\\det A} \\text{adj}(A)$ where $\\text{adj}(A)_{ij} = c_{ji}$.</p>
    `,
    related: ["determinant", "minor"]
  },
  "minor": {
    term: "Minor", ko: "소행렬식", cat: "prereq",
    short: "$r \\times r$ 부분행렬의 determinant.",
    definition: `
      <p>행렬 $A$에서 행과 열을 선택해 만든 부분행렬의 determinant.</p>
      <p><strong>Rank = 0이 아닌 minor 중 최대 차수</strong>. 이 정의가 가장 계산 친화적.</p>
    `,
    related: ["cofactor", "rank"]
  },
  "inverse": {
    term: "Inverse", ko: "역행렬", cat: "prereq",
    short: "$A A^{-1} = A^{-1} A = I$. $\\det A \\neq 0$이어야 존재.",
    definition: `
      <p>$A^{-1} = \\frac{1}{\\det A} \\text{adj}(A)$.</p>
      <p><strong>2×2 공식</strong>: $\\begin{bmatrix}a & b\\\\ c & d\\end{bmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix}d & -b\\\\ -c & a\\end{bmatrix}$.</p>
      <p>3×3까지는 시험에 나올 수 있음 (교수님 명시). 그 이상은 안 나옴.</p>
    `,
    related: ["determinant", "nonsingular"]
  },
  "nonsingular": {
    term: "Nonsingular", ko: "정칙행렬", cat: "prereq",
    short: "$\\det A \\neq 0$ ⇔ 역행렬 존재 ⇔ full rank ⇔ 0이 eigenvalue 아님.",
    definition: `
      <p>정사각행렬에서 다음은 모두 동치:</p>
      <ul>
        <li>$\\det A \\neq 0$</li>
        <li>$A^{-1}$ 존재</li>
        <li>$Ax = 0 \\Rightarrow x = 0$</li>
        <li>Full rank</li>
        <li>0이 eigenvalue가 아님</li>
      </ul>
    `,
    related: ["determinant", "rank", "eigenvalue"]
  },
  "trace": {
    term: "Trace", ko: "대각합", cat: "prereq",
    short: "$\\text{tr}(A) = \\sum a_{ii} = \\sum \\lambda_i$.",
    definition: `
      <p>대각원소의 합. <strong>모든 eigenvalue의 합과 같음</strong>.</p>
      <p>성질: $\\text{tr}(AB) = \\text{tr}(BA)$, 닮은 행렬 사이에서 보존.</p>
      <p>2×2 특성다항식: $\\lambda^2 - \\text{tr}(A)\\lambda + \\det(A) = 0$.</p>
    `,
    related: ["eigenvalue", "similarity"]
  },

  // ================= 핵심 — 선형방정식 =================
  "range-space": {
    term: "Range Space", ko: "치역공간 (열공간)", cat: "core",
    short: "$R(A) = \\{Ax : x \\in \\mathbb{R}^n\\}$ = $A$의 열들의 span.",
    definition: `
      <p>$A$의 <strong>열벡터</strong>들의 모든 선형결합 집합.</p>
      <h4>시험 포인트</h4>
      <p>$Ax = y$의 해 존재 조건: $y \\in R(A)$ ⇔ $\\rho(A) = \\rho([A \\, y])$ (augmented matrix의 rank가 같음).</p>
    `,
    related: ["null-space", "rank"]
  },
  "null-space": {
    term: "Null Space", ko: "영공간 (핵)", cat: "core",
    short: "$N(A) = \\{x : Ax = 0\\}$.",
    definition: `
      <p>$Ax = 0$의 모든 해 집합. <strong>Nullity</strong> = $\\dim N(A)$.</p>
      <p><strong>Rank-Nullity 정리</strong>: $\\rho(A) + \\text{nullity}(A) = n$ (열 개수).</p>
    `,
    related: ["nullity", "rank", "range-space"]
  },
  "rank": {
    term: "Rank", ko: "계수", cat: "core",
    short: "선형독립 열(행)의 최대 개수 = range space의 차원.",
    definition: `
      <p>$\\rho(A)$. 다음 모두 같은 값:</p>
      <ul>
        <li>선형독립 열의 최대 개수</li>
        <li>선형독립 행의 최대 개수</li>
        <li>Range space의 차원</li>
        <li>0이 아닌 minor의 최대 차수</li>
      </ul>
      <h4>자주 쓰는 성질</h4>
      <ul>
        <li>$\\rho(A) \\leq \\min(m, n)$</li>
        <li>$\\rho(AB) \\leq \\min(\\rho A, \\rho B)$</li>
        <li>$C, D$가 nonsingular이면 $\\rho(CA) = \\rho(A) = \\rho(AD)$</li>
      </ul>
    `,
    related: ["nullity", "null-space", "range-space", "nonsingular"]
  },
  "nullity": {
    term: "Nullity", ko: "영공간 차원", cat: "core",
    short: "$\\text{nullity}(A) = n - \\rho(A)$ (열 수 − rank).",
    definition: `
      <p>$N(A)$의 차원 = $Ax = 0$의 선형독립 해의 개수 = 일반해의 <strong>자유도</strong>.</p>
    `,
    related: ["null-space", "rank"]
  },
  "general-solution": {
    term: "General Solution", ko: "일반해", cat: "core",
    short: "$x = x_p + \\alpha_1 n_1 + \\cdots + \\alpha_k n_k$.",
    definition: `
      <p>$Ax = y$의 모든 해는 특수해 $x_p$ + null space basis의 선형결합.</p>
      <p>자유도 $k$ = nullity. Full column rank면 해가 유일 (nullity = 0).</p>
    `,
    related: ["null-space", "nullity"]
  },

  // ================= 핵심 — 고유값/대각화 =================
  "eigenvalue": {
    term: "Eigenvalue", ko: "고유값", cat: "core",
    short: "$Av = \\lambda v$ ($v \\neq 0$)를 만족하는 $\\lambda$.",
    definition: `
      <p>$\\det(\\lambda I - A) = 0$의 근.</p>
      <h4>왜 중요한가?</h4>
      <p>$\\dot x = Ax$의 모드를 결정 — eigenvalue가 $\\lambda$이면 그 방향 성분은 $e^{\\lambda t}$로 진화.</p>
      <ul>
        <li>$\\text{Re}(\\lambda) < 0$: 감쇠 (안정)</li>
        <li>$\\text{Re}(\\lambda) > 0$: 발산</li>
        <li>$\\text{Re}(\\lambda) = 0$: 유지 (marginal)</li>
      </ul>
    `,
    related: ["eigenvector", "characteristic-poly", "diagonalization", "internal-stability"]
  },
  "eigenvector": {
    term: "Eigenvector", ko: "고유벡터", cat: "core",
    short: "$Av = \\lambda v$를 만족하는 영이 아닌 벡터.",
    definition: `
      <p>$(\\lambda I - A) v = 0$의 영이 아닌 해. 스칼라 배도 여전히 eigenvector (방향만 의미 있음).</p>
      <p>"행렬을 곱해도 방향이 바뀌지 않는 특별한 방향".</p>
    `,
    related: ["eigenvalue", "gen-eigenvec"]
  },
  "characteristic-poly": {
    term: "Characteristic Polynomial", ko: "특성다항식", cat: "core",
    short: "$\\Delta(\\lambda) = \\det(\\lambda I - A)$. 근이 eigenvalue.",
    definition: `
      <p>$n \\times n$ 행렬의 차수 $n$ 다항식.</p>
      <p>$\\Delta(\\lambda) = \\prod_i (\\lambda - \\lambda_i)^{m_i}$, $m_i$는 algebraic multiplicity.</p>
      <p><strong>2×2 단축</strong>: $\\lambda^2 - \\text{tr}(A)\\lambda + \\det(A)$.</p>
    `,
    related: ["eigenvalue", "minimal-poly", "cayley-hamilton"]
  },
  "minimal-poly": {
    term: "Minimal Polynomial", ko: "최소다항식", cat: "core",
    short: "$\\psi(A) = 0$을 만족하는 monic 최소 차수 다항식.",
    definition: `
      <p>$\\psi(\\lambda) = \\prod (\\lambda - \\lambda_i)^{n_i}$. $n_i$ = $\\lambda_i$의 최대 Jordan block 크기 (index).</p>
      <p>항상 characteristic polynomial의 약수.</p>
    `,
    related: ["characteristic-poly", "cayley-hamilton", "jordan"]
  },
  "alg-mult": {
    term: "Algebraic Multiplicity", ko: "대수적 중복도", cat: "core",
    short: "특성다항식에서 $\\lambda_i$의 중복 차수 $m_i$.",
    definition: `<p>$(\\lambda - \\lambda_i)^{m_i}$ 꼴에서의 지수. <strong>Geometric multiplicity $\\leq m_i$</strong>가 핵심 부등식.</p>`,
    related: ["geom-mult", "characteristic-poly"]
  },
  "geom-mult": {
    term: "Geometric Multiplicity", ko: "기하적 중복도", cat: "core",
    short: "$\\dim N(\\lambda_i I - A)$ — 선형독립 eigenvector 수.",
    definition: `
      <p>$\\lambda_i$에 대응하는 eigenspace의 차원.</p>
      <p><strong>Alg mult > Geom mult</strong>이면 행렬이 defective — 대각화 불가 → Jordan form 필요.</p>
    `,
    related: ["alg-mult", "gen-eigenvec", "jordan"]
  },
  "diagonalization": {
    term: "Diagonalization", ko: "대각화", cat: "core",
    short: "$A = QDQ^{-1}$, $D$는 고유값 대각행렬.",
    definition: `
      <p>선형독립 eigenvector가 $n$개 있으면 $Q = [v_1 \\, \\cdots \\, v_n]$로 $Q^{-1} A Q = \\text{diag}(\\lambda_i)$.</p>
      <p><strong>distinct eigenvalue 행렬은 항상 대각화 가능</strong>. 중복이 있어도 eigenvector가 $n$개 선형독립이면 OK.</p>
      <p>$e^{At} = Q e^{Dt} Q^{-1}$로 $e^{At}$ 계산이 쉬워짐.</p>
    `,
    related: ["eigenvalue", "similarity", "jordan", "matrix-exp"]
  },
  "similarity": {
    term: "Similarity Transformation", ko: "닮음변환", cat: "core",
    short: "$\\bar A = Q^{-1} A Q$. 같은 선형변환의 다른 basis 표현.",
    definition: `
      <p>두 행렬이 similar ⇔ basis만 바꿨을 뿐 같은 선형변환.</p>
      <h4>보존되는 양</h4>
      <ul>
        <li>Eigenvalue 전부</li>
        <li>Determinant, Trace</li>
        <li>Rank</li>
        <li>특성다항식, 최소다항식</li>
      </ul>
    `,
    related: ["representation", "diagonalization", "jordan"]
  },
  "jordan": {
    term: "Jordan Form", ko: "조르당 표준형", cat: "core",
    short: "대각화 불가능할 때 쓰는 블록 대각 표준형.",
    definition: `
      <p>각 Jordan block $J_k(\\lambda)$: 대각에 $\\lambda$, 대각 바로 위에 1, 나머지는 0.</p>
      <p>$$J_3(\\lambda) = \\begin{bmatrix}\\lambda & 1 & 0\\\\ 0 & \\lambda & 1\\\\ 0 & 0 & \\lambda\\end{bmatrix}$$</p>
      <p>defective matrix의 canonical form. 일반화 eigenvector로 basis 구성.</p>
    `,
    related: ["diagonalization", "gen-eigenvec", "minimal-poly"]
  },
  "gen-eigenvec": {
    term: "Generalized Eigenvector", ko: "일반화 고유벡터", cat: "core",
    short: "$(A - \\lambda I)^n v = 0$, $(A - \\lambda I)^{n-1} v \\neq 0$.",
    definition: `
      <p>grade $n$의 일반화 eigenvector. $n = 1$이면 보통 eigenvector.</p>
      <p><strong>Jordan chain</strong>: $v_n \\to (A - \\lambda I) v_n \\to \\cdots \\to (A - \\lambda I)^{n-1} v_n$ 순으로 내려오며 basis를 이룸.</p>
    `,
    related: ["jordan", "eigenvector"]
  },
  "nilpotent": {
    term: "Nilpotent", ko: "멱영", cat: "core",
    short: "$N^k = 0$인 $k$가 존재.",
    definition: `
      <p>Jordan block에서 $(J - \\lambda I)^k = 0$ (block 크기 $k$).</p>
      <p>$e^{Nt} = I + Nt + \\frac{(Nt)^2}{2!} + \\cdots$가 <strong>유한 합</strong>으로 끊김 → 계산이 쉬움.</p>
    `,
    related: ["jordan", "matrix-exp"]
  },

  // ================= 핵심 — Cayley-Hamilton / e^At =================
  "cayley-hamilton": {
    term: "Cayley-Hamilton Theorem", ko: "케일리-해밀턴 정리", cat: "core",
    short: "모든 행렬은 자신의 특성다항식을 만족. $\\Delta(A) = 0$.",
    definition: `
      <p>$n \\times n$ 행렬 $A$의 $\\Delta(\\lambda) = \\lambda^n + \\alpha_1 \\lambda^{n-1} + \\cdots + \\alpha_n$에 대해</p>
      <p>$$\\Delta(A) = A^n + \\alpha_1 A^{n-1} + \\cdots + \\alpha_n I = 0$$</p>
      <h4>활용</h4>
      <p>$A^n$ 이상의 거듭제곱을 <strong>$A^0, A^1, \\ldots, A^{n-1}$의 선형결합</strong>으로 쓸 수 있음 → $f(A)$ 계산이 $n-1$차 이하 다항식으로 축소. 특히 $e^{At}$ 계산의 핵심.</p>
    `,
    related: ["characteristic-poly", "matrix-exp", "minimal-poly"]
  },
  "matrix-exp": {
    term: "Matrix Exponential", ko: "행렬 지수 $e^{At}$", cat: "core",
    short: "$e^{At} = I + At + (At)^2/2! + \\cdots$",
    definition: `
      <p>$\\dot x = Ax$의 해 $x(t) = e^{At} x(0)$.</p>
      <h4>계산법 3가지</h4>
      <ol>
        <li><strong>대각화</strong>: $A = QDQ^{-1} \\Rightarrow e^{At} = Q e^{Dt} Q^{-1}$</li>
        <li><strong>Cayley-Hamilton</strong>: $e^{At} = \\sum_{k=0}^{n-1} \\beta_k(t) A^k$ — $n$개의 $\\beta_k$를 eigenvalue로 결정</li>
        <li><strong>Laplace</strong>: $e^{At} = \\mathcal{L}^{-1}\\{(sI - A)^{-1}\\}$</li>
      </ol>
      <p>시험에는 주로 (1)·(2) 방법이 나옴.</p>
    `,
    related: ["cayley-hamilton", "eigenvalue", "diagonalization"]
  },

  // ================= 핵심 — 이차형식 / SVD =================
  "quadratic": {
    term: "Quadratic Form", ko: "이차형식", cat: "core",
    short: "$x^T M x$ ($M = M^T$). 스칼라 값.",
    definition: `
      <p>대칭행렬 $M$에 대한 스칼라 함수. eigenvalue 부호로 분류:</p>
      <ul>
        <li>모두 > 0: positive definite</li>
        <li>모두 ≥ 0: positive semidefinite</li>
        <li>부호 섞임: indefinite</li>
      </ul>
      <p>Lyapunov 안정성에서 <strong>에너지 함수</strong> 역할.</p>
    `,
    related: ["symmetric", "positive-definite", "lyapunov"]
  },
  "positive-definite": {
    term: "Positive Definite", ko: "양의 정부호", cat: "core",
    short: "$x^T M x > 0$ for all $x \\neq 0$ ⇔ 모든 eigenvalue > 0.",
    definition: `
      <p>$M \\succ 0$. 다음 모두 동치:</p>
      <ul>
        <li>모든 eigenvalue > 0</li>
        <li>모든 leading principal minor > 0 (Sylvester)</li>
        <li>$M = L L^T$ ($L$이 nonsingular, Cholesky)</li>
      </ul>
    `,
    related: ["quadratic", "symmetric", "lyapunov"]
  },
  "singular-value": {
    term: "Singular Value", ko: "특이값", cat: "core",
    short: "$H^T H$의 eigenvalue의 양의 제곱근.",
    definition: `
      <p>$H = U \\Sigma V^T$ (SVD). $\\Sigma$의 대각원소가 singular value.</p>
      <p>Induced $L_2$-norm $\\|A\\|_2$ = 최대 singular value.</p>
    `,
    related: ["norm", "symmetric"]
  },

  // ================= 핵심 — 신호/시스템 (Ch2) =================
  "convolution": {
    term: "Convolution", ko: "합성곱", cat: "core",
    short: "$y(t) = \\int_0^t g(t-\\tau) u(\\tau) d\\tau$. LTI의 입출력 관계.",
    definition: `
      <p>임펄스 응답 $g$와 입력 $u$로 출력 계산.</p>
      <p>이산: $y[n] = \\sum_k g[n-k] u[k]$.</p>
      <p><strong>그래프로 풀 때</strong>: $g$를 $\\tau$축에 대해 뒤집고 ($g(t-\\tau)$) $t$만큼 이동, $u$와 곱해서 적분.</p>
    `,
    related: ["impulse-response", "transfer-function"]
  },
  "impulse-response": {
    term: "Impulse Response", ko: "임펄스 응답", cat: "core",
    short: "$\\delta(t)$ 입력에 대한 출력 $g(t)$.",
    definition: `
      <p>LTI 시스템 전체를 특징짓는 함수.</p>
      <p>상태공간 표현: $g(t) = C e^{At} B + D \\delta(t)$.</p>
    `,
    related: ["convolution", "transfer-function", "state-space"]
  },
  "transfer-function": {
    term: "Transfer Function", ko: "전달함수", cat: "core",
    short: "$G(s) = C(sI - A)^{-1} B + D$.",
    definition: `
      <p>Laplace 변환한 입출력 비.</p>
      <p><strong>극점(pole)</strong> = $\\det(sI - A)$의 근 ⊆ $A$의 eigenvalue (같지 않을 수도 — cancellation).</p>
      <p>Proper: 분모차수 ≥ 분자차수. Strictly proper: 분모 > 분자.</p>
    `,
    related: ["state-space", "bibo"]
  },

  // ================= 핵심 — 상태공간 (Ch4) =================
  "state-space": {
    term: "State-Space Realization", ko: "상태공간 실현", cat: "core",
    short: "$G(s) \\to (A, B, C, D)$로 변환.",
    definition: `
      <p>$$\\dot x = Ax + Bu, \\quad y = Cx + Du$$</p>
      <p>같은 $G(s)$에 대해 무한히 많은 realization 존재.</p>
      <p>최소 차수 realization을 <strong>minimal realization</strong> (McMillan degree).</p>
    `,
    related: ["transfer-function", "companion"]
  },
  "companion": {
    term: "Companion Form", ko: "동반 행렬 형태", cat: "core",
    short: "전달함수 계수를 바로 담은 표준 realization.",
    definition: `
      <p>$$A = \\begin{bmatrix}-\\alpha_1 & -\\alpha_2 & \\cdots & -\\alpha_n\\\\ 1 & 0 & & 0\\\\ & \\ddots & & \\\\ 0 & & 1 & 0\\end{bmatrix}$$</p>
      <p>특성다항식이 바로 $\\lambda^n + \\alpha_1 \\lambda^{n-1} + \\cdots + \\alpha_n$.</p>
      <p>Eigenvector는 $[\\lambda^{n-1}, \\lambda^{n-2}, \\ldots, 1]^T$.</p>
    `,
    related: ["state-space", "characteristic-poly"]
  },

  // ================= 핵심 — 안정도 (Ch5) =================
  "bibo": {
    term: "BIBO Stability", ko: "BIBO 안정도", cat: "core",
    short: "유계 입력 → 유계 출력.",
    definition: `
      <p>모든 bounded $u$에 대해 $y$가 bounded. 동치 조건:</p>
      <ul>
        <li>$\\int_0^\\infty |g(t)| dt < \\infty$ (임펄스 응답이 절대적분 가능)</li>
        <li>모든 transfer function pole이 좌반평면 ($\\text{Re}(s) < 0$)</li>
      </ul>
      <p>입출력만 본다는 점에서 internal stability보다 <strong>약한</strong> 조건.</p>
    `,
    related: ["transfer-function", "internal-stability"]
  },
  "internal-stability": {
    term: "Internal Stability", ko: "내부 안정도", cat: "core",
    short: "$\\dot x = Ax$가 $x \\to 0$(asymptotic) 또는 유계(marginal).",
    definition: `
      <ul>
        <li><strong>Asymptotic</strong>: 모든 eigenvalue $\\text{Re}(\\lambda) < 0$</li>
        <li><strong>Marginal</strong>: $\\text{Re}(\\lambda) \\leq 0$ 이면서 허축 eigenvalue는 index 1 (defective 아님)</li>
        <li><strong>Unstable</strong>: 하나라도 $\\text{Re}(\\lambda) > 0$이거나, 허축 eigenvalue가 defective</li>
      </ul>
      <p>BIBO보다 <strong>엄격</strong>한 조건.</p>
    `,
    related: ["eigenvalue", "bibo", "lyapunov"]
  },
  "lyapunov": {
    term: "Lyapunov Equation", ko: "리아푸노프 방정식", cat: "core",
    short: "$A^T P + PA = -Q$. $P \\succ 0$이면 안정.",
    definition: `
      <p>$Q \\succ 0$를 주고 $A^T P + PA = -Q$를 풀어 $P$를 구함.</p>
      <p>$P \\succ 0$인 해가 존재 ⇔ $A$가 asymptotically stable.</p>
      <p>에너지 함수: $V(x) = x^T P x \\succ 0$, $\\dot V = -x^T Q x < 0$ → 0으로 수렴.</p>
    `,
    related: ["positive-definite", "internal-stability"]
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
        placeholder="검색 — 영어·한글·설명 어디든 (예: rank, 계수, null, eigen, 대각화)"
        oninput="window.glFilter()" />
      <div class="glossary-categories">
        <button class="active" data-gl-cat="all" onclick="window.glCat('all')">전체 (${entries.length})</button>
        <button data-gl-cat="core" onclick="window.glCat('core')">🔷 선형시스템론 (${coreCount})</button>
        <button data-gl-cat="prereq" onclick="window.glCat('prereq')">🌱 선행 선형대수 (${prereqCount})</button>
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
