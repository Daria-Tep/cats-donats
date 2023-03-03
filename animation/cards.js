let cardsBlock = document.querySelector(".cardsBlock");
let cards = document.querySelectorAll(".cardsBlock__card");
let body = document.querySelector("body");
let light = document.querySelector(".light");



cardsBlock.addEventListener('mousemove', (e) => {
    light.style.display = "block";
    let indent = (window.innerWidth - cardsBlock.offsetWidth) / 2;
  
    light.style.top = e.pageY - light.offsetHeight/2 + "px";
    light.style.left  = e.pageX - indent - light.offsetWidth/2  + "px";
});

