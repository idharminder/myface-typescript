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

function goPartyMode(){
  const posts = document.getElementsByClassName("post");
  for(let post of posts){
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    post.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    if (red+green+blue> 384){
      post.style.color = "black";
    } else {
      post.style.color = "white";
    }
    // post.style.color = `rgb(${Math.abs(384-red)}, ${Math.abs(256-green)}, ${Math.abs(256-blue)})`;
    // post.style.color = `rgb(${green}, ${blue},${red},)`;
  }
}