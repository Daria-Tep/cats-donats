let cardsBlock = document.querySelector(".cardsBlock");
let cards = document.querySelectorAll(".cardsBlock__card");
let body = document.querySelector("body");
let light = document.querySelector(".light");

/* cardsBlock.addEventListener("mousemove", (e) => {
  light.style.display = "block";
  let indent = (window.innerWidth - cardsBlock.offsetWidth) / 2;

  light.style.top = e.pageY - light.offsetHeight / 2 + "px";
  light.style.left = e.pageX - indent - light.offsetWidth / 2 + "px";
}); */

/* cards.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    light.style.display = "block";
    let indent = (window.innerWidth - item.offsetWidth) / 2;


    light.style.top = e.pageY - light.offsetHeight / 2 + "px";
    light.style.left = e.pageX - light.offsetWidth / 2 - item.offsetWidth/4 + "px";
  });

  item.addEventListener("mouseleave", (e) => {
    light.style.display = "none";
    
  });
}); */

let light1 = document.getElementById("light1");

cards[0].addEventListener("mousemove", (e) => {
  light1.style.display = "block";

  let indent = (window.innerWidth - body.offsetWidth) / 2;
  let coordinats = cards[0].getBoundingClientRect();

  light1.style.top = e.clientY - light1.offsetHeight / 2 - coordinats.y + "px";
  light1.style.left = e.pageX - light1.offsetWidth / 2 - indent + "px";
});

cards[0].addEventListener("mouseleave", (e) => {
  light1.style.display = "none";
});
