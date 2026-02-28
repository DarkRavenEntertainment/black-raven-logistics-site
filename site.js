(function(){

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });

  const y = document.getElementById("year");
  if(y) y.textContent = String(new Date().getFullYear());

  const VTC_ID = 43152;
  const API_URL = `https://hub.truckyapp.com/api/vtc/${VTC_ID}`;

  async function loadTruckyStats(){
    try{
      const res = await fetch(API_URL);
      if(!res.ok) throw new Error("API error");
      const data = await res.json();

      // Adjust keys if needed based on API response
      document.getElementById("statMembers").textContent =
        data.members?.count ?? "—";

      document.getElementById("statJobs").textContent =
        data.stats?.jobs ?? "—";

      document.getElementById("statDistance").textContent =
        data.stats?.distance
          ? `${Number(data.stats.distance).toLocaleString()} km`
          : "—";

      document.getElementById("statRating").textContent =
        data.rating ?? "—";

    }catch(e){
      console.error("Trucky API failed:", e);
    }
  }

  loadTruckyStats();

})();