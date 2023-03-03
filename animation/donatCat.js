//------------planet example
let canvasPlanet = document.getElementById("planetCanvas");

const fish = new Image();
const cat = new Image();
fish.src = "./assets/img/fish.png";
cat.src = "./assets/img/cat.png";

function init() {
  window.requestAnimationFrame(draw);
}

const ctx = canvasPlanet.getContext("2d");
let animID = null;

let isShowStars = false;

function draw() {
  if (ctx) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 700, 700);
    ctx.save();
    ctx.translate(350, 350);

    // cat
    let time = new Date();
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    );

    ctx.translate(230, 0);

    ctx.drawImage(cat, -12, -12, 80, 90);

    // fish
    ctx.save();
    ctx.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    ctx.translate(70, 0);
    ctx.drawImage(fish, 5, 5, 25, 25);

    // star
    ctx.beginPath();
    ctx.arc(20, 15, 20, 0, Math.PI * 2, true);
    ctx.moveTo(110, 75);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fill();
    ctx.strokeStyle = "rgba(14, 51, 143, 1);";
    ctx.stroke();

    ctx.restore();

    ctx.restore();

    animID = window.requestAnimationFrame(draw);
  }
}

init();

canvasPlanet.addEventListener("click", () => {
  if (animID) {
    window.cancelAnimationFrame(animID);
    animID = null;
  } else {
    window.requestAnimationFrame(draw);
  }
});