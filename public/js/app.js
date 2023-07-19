document.addEventListener("DOMContentLoaded", function () {
  // Add your JavaScript here.
});

function onHamburgerClicked(){
  const navbar = document.getElementById("navbar");
  if(navbar.style.display === "flex"){
    navbar.style.display = "none";
  } else{
    navbar.style.display = "flex";
  }
}