//------------planet example
let canvasPlanet = document.getElementById("planetCanvas");
let toggleBtn = document.getElementById("togglePlanet");

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

    ctx.translate(170, 0);

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

toggleBtn.addEventListener("click", () => {
  if (animID) {
    window.cancelAnimationFrame(animID);
    animID = null;
  } else {
    window.requestAnimationFrame(draw);
  }
});

//-----------color circles
const colorCanvas = document.getElementById("colorCanvas");
let isAnimationPlay = false;

class ColorCanvas {
  canvas;
  ctx;
  colors = ["#f0a40c", "#0c82f0", "#0ba313", "#c281c7", "#337a50"];
  texts = [
    "SunYellow world",
    "Blue world",
    "Green world",
    "Lilac world",
    "SeaGreen world",
  ];
  bigTexts = ["It's fine", "It's cool", "It's super", "It's magic", "It's travel"]
  currentColor = null;
  currentText = null;
  currentBigText = null;
  timePrev;

  heightCanvas = 700;
  widthCanvas = window.innerWidth;

  constructor(canvas) {
    this.canvas = canvas;
  }

  init() {
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = this.widthCanvas;
      this.canvas.height = this.heightCanvas;
      this.ctx.clearRect(0, 0, this.widthCanvas, this.heightCanvas);
      this.canvas.style.background = "grey";
      this.ctx.fill();
      this.ctx.save();
    }
  }

  onClick(x, y) {
    this.getNextColor();
    this.getNextText();
    this.getNextBigText();
    this.drawCircle(x, y);
  }

  drawCircle(x, y) {
    let date = new Date();

    if (!this.timePrev) {
      this.timePrev = date.getTime();
    }

    let now = date.getTime();
      let countMove = now - this.timePrev;

    if (countMove < this.canvas.width * 1.4) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 10 + countMove, 0, Math.PI * 2, true);
      this.ctx.moveTo(110, 75);
      this.ctx.fillStyle = this.currentColor;
      this.ctx.fill();
      this.ctx.save();

      this.drawText(countMove);
      this.drawBigText(countMove / 1.2);

      this.ctx.restore();

      window.requestAnimationFrame(() =>
        this.drawCircle(x, y, this.currentColor)
      );
      isAnimationPlay = true;
    } else {
      this.timePrev = null;
      isAnimationPlay = false;
    }
  }

  drawText(countMove) {
    this.ctx.font = "48px sans-serif";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText(
      this.currentText,
      this.widthCanvas - (countMove - this.widthCanvas / 2),
      250
    );
  }

  drawBigText(countMove) {
    this.ctx.font = "68px sans-serif";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fontWeight = 800;
    this.ctx.fillText(
      this.currentBigText,
      this.widthCanvas - (countMove - this.widthCanvas / 2) - 100,
      400
    );
  }

  getNextColor() {
    this.currentColor = this.currentColor
      ? this.nextItem(this.colors, this.currentColor)
      : this.colors[0];
  }

  getNextText() {
    this.currentText = this.currentText
      ? this.nextItem(this.texts, this.currentText)
      : this.texts[0];
  }

  getNextBigText() {
    this.currentBigText = this.currentBigText
      ? this.nextItem(this.bigTexts, this.currentBigText)
      : this.bigTexts[0];
  }

  nextItem(arr, current) {
    let ind = arr.indexOf(current);

    if (ind < arr.length - 1) {
      return arr[ind + 1];
    }

    if (ind === arr.length - 1) {
      return arr[0];
    }
  }
}

let canvasColor = new ColorCanvas(colorCanvas);

canvasColor.init();

colorCanvas.addEventListener("click", (e) => {
  if (!isAnimationPlay) {
    let x = e.pageX - canvasColor.canvas.offsetLeft;
    let y = e.pageY - canvasColor.canvas.offsetTop;
    canvasColor.onClick(x, y);
  }
});
