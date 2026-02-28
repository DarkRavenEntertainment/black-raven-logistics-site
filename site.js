(function(){

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });

  const y = document.getElementById("year");
  if(y) y.textContent = String(new Date().getFullYear());

  async function loadStats(){
    try{
      const res = await fetch("trucky.json?cache=" + Date.now());
      const data = await res.json();

      document.getElementById("statMembers").textContent =
        data.members ?? "—";

      document.getElementById("statJobs").textContent =
        data.jobs ?? "—";

      const updated = document.getElementById("statUpdated");
      if(updated && data.updated_utc){
        updated.textContent = "Updated: " + data.updated_utc + " UTC";
      }

    }catch(e){
      console.error("Failed loading stats:", e);
    }
  }

  loadStats();

})();
