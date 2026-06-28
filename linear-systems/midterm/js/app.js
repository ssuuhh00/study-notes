// App boot

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  document.querySelectorAll("#theme-toggle .seg").forEach(b => {
    b.classList.toggle("active", b.dataset.themeSet === theme);
  });
  localStorage.setItem("ls-theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  // Theme: load from storage (default: dark)
  const savedTheme = localStorage.getItem("ls-theme") || "dark";
  applyTheme(savedTheme);

  document.querySelectorAll("#theme-toggle .seg").forEach(b => {
    b.addEventListener("click", () => applyTheme(b.dataset.themeSet));
  });

  // Sidebar nav clicks
  document.querySelectorAll("#chapter-nav a[data-page]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      window.go(a.dataset.page);
    });
  });

  // Reset progress
  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("진도/완료 표시를 모두 초기화할까요?")) {
      localStorage.removeItem("ls-progress");
      window.refreshNav();
      const id = parseHashId(location.hash.replace("#", "") || "intro");
      renderPage(id);
    }
  });

  // Wire up right-side term panel (drag-to-resize)
  if (window.tpSetupResize) window.tpSetupResize();
  // Close panel on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && window.closeTerm) window.closeTerm();
  });

  // Initial route
  const initialRaw = location.hash.replace("#", "") || "intro";
  const initial = parseHashId(initialRaw);
  renderPage(PAGES[initial] ? initial : "intro");
  window.refreshNav();

  // Hash change
  window.addEventListener("hashchange", () => {
    const idRaw = location.hash.replace("#", "") || "intro";
    const id = parseHashId(idRaw);
    renderPage(PAGES[id] ? id : "intro");
  });
});
