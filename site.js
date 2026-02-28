(function () {
  // Active nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Only run Trucky logic on pages that have the elements
  const hasStats =
    document.getElementById("statMembers") &&
    document.getElementById("statJobs") &&
    document.getElementById("statDistance") &&
    document.getElementById("statRating");

  if (!hasStats) return;

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val ?? "—");
  };

  const fmtNumber = (n) => {
    const num = Number(n);
    if (Number.isFinite(num)) return num.toLocaleString();
    return "—";
  };

  // Read local generated file (same-origin -> works on GitHub Pages)
  fetch("trucky.json", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("trucky.json missing"))))
    .then((data) => {
      setText("statMembers", fmtNumber(data.members));
      setText("statJobs", fmtNumber(data.jobs));
      setText("statDistance", data.distance_text ?? "—");
      setText("statRating", data.rating ?? "—");

      const updated = document.getElementById("truckyUpdated");
      if (updated && data.updated_utc) {
        updated.textContent = `Updated: ${data.updated_utc} UTC`;
      }
    })
    .catch(() => {
      // If action hasn't run yet, show a clean fallback
      setText("statMembers", "—");
      setText("statJobs", "—");
      setText("statDistance", "—");
      setText("statRating", "—");
    });
})();