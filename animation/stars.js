let block = document.querySelector(".firstBlock");

let starsItems = [
  { type: "big", x: "10%", y: "15%" },
  { type: "small", x: "30%", y: "9%" },
  { type: "big", x: "40%", y: "5%" },
  { type: "small", x: "16%", y: "10%" },
  { type: "small", x: "60%", y: "27%" },
  { type: "small", x: "47%", y: "14%" },
  { type: "small", x: "61%", y: "9%" },
  { type: "small", x: "33%", y: "21%" },
  { type: "small", x: "15%", y: "34%" },
  { type: "small", x: "15%", y: "34%" },
  { type: "big", x: "93%", y: "30%" },
];

class Stars {
  constructor() {}

  init() {
    if (block) {
      starsItems.forEach((item) => {
        let star = this.createStar(item.x, item.y, item.type);
        block.appendChild(star);
      });
    }
  }

  createStar(marginX, marginY, type) {
    let starItem = document.createElement("span");
    starItem.classList.add(
      type === "big" ? "animateBigStar" : "animateSmallStar"
    );
    starItem.style.width = type === "big" ? "10px" : "5px";
    starItem.style.height = type === "big" ? "10px" : "5px";
    starItem.style.background = `radial-gradient(
            circle,
            rgba(208, 168, 233, 1) 3%,
            rgba(141, 44, 218, 1) 46%,
            rgba(87, 20, 138, 1) 100%
          )`;

    starItem.style.position = "absolute";
    starItem.style.zIndex = "10";
    starItem.style.borderRadius = "50%";
    starItem.style.top = marginY;
    starItem.style.left = marginX;

    return starItem;
  }
}

const stars = new Stars();

stars.init();
