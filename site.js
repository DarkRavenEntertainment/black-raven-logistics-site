(function(){

  // Active nav
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".menu a").forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if(href === path) a.classList.add("active");
  });

  // Year
  const y = document.getElementById("year");
  if(y) y.textContent = String(new Date().getFullYear());

  // Optional Trucky stats (only updates if elements exist)
  async function loadStats(){
    const membersEl = document.getElementById("statMembers");
    const jobsEl = document.getElementById("statJobs");
    const updatedEl = document.getElementById("statUpdated");

    if(!membersEl && !jobsEl && !updatedEl) return;

    try{
      const res = await fetch("trucky.json?cache=" + Date.now());
      const data = await res.json();

      if(membersEl) membersEl.textContent = data.members ?? "—";
      if(jobsEl) jobsEl.textContent = data.jobs ?? "—";
      if(updatedEl && data.updated_utc){
        updatedEl.textContent = "Updated: " + data.updated_utc + " UTC";
      }
    }catch(e){
      console.error("Failed loading stats:", e);
    }
  }

  loadStats();

})();