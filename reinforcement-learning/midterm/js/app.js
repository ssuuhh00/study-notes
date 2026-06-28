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
  localStorage.setItem("rl-theme", theme);
}

document.addEventListener("DOMContentLoaded", () => {
  // Theme: load from storage (default: dark)
  const savedTheme = localStorage.getItem("rl-theme") || "dark";
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
      localStorage.removeItem("rl-progress");
      window.refreshNav();
      const id = location.hash.replace("#", "") || "intro";
      renderPage(id);
    }
  });

  // Term panel resize drag handle
  if (window.tpSetupResize) window.tpSetupResize();

  // Initial route
  const initial = location.hash.replace("#", "") || "intro";
  if (PAGES[initial]) {
    renderPage(initial);
  } else {
    renderPage("intro");
  }
  window.refreshNav();

  // Hash change
  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "") || "intro";
    renderPage(id);
  });
});
