document.addEventListener("DOMContentLoaded", function () {
  const year = new Date().getFullYear();
  const footer = document.getElementById("year");
  if (footer) footer.textContent = year;
});
