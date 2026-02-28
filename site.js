(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a=>{
    if(a.getAttribute("href") === path){
      a.classList.add("active");
    }
  });

  const year = new Date().getFullYear();
  const y = document.getElementById("year");
  if(y) y.textContent = year;
})();