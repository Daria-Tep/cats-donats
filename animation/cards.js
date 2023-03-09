let cardsBlock = document.querySelector(".cardsBlock");
let cards = document.querySelectorAll(".cardsBlock__card");
let body = document.querySelector("body");
let light = document.querySelector(".light");

let light1 = document.getElementById("light1");

cards.forEach((card, index) => {
  let currentLight = document.getElementById(`light${index + 1}`);

  card.addEventListener("mousemove", (e) => {
    currentLight.style.opacity = "0.5";
    let cardCoordinats = card.getBoundingClientRect();

    let _x = e.pageX - cardCoordinats.x > 0 ? e.pageX - cardCoordinats.x : 0;

    currentLight.style.top =
      e.clientY - currentLight.offsetHeight / 2 - cardCoordinats.y + "px";
    currentLight.style.left = _x - currentLight.offsetWidth / 2 + "px";
  });

  card.addEventListener("mouseleave", (e) => {
    currentLight.style.opacity = "0";
  });
});
