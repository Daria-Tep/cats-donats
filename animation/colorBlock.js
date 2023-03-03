//-----------color circles
const colorCanvas = document.getElementById("colorCanvas");
const body = document.querySelector("body");
let isAnimationPlay = false;

class ColorCanvas {
  canvas;
  ctx;
  colors = ["#FFDEAD", "#DDA0DD", "#87CEEB", "#c281c7", "#CD5C5C"];
  texts = [
    "Fact №1",
    "Fact №2",
    "Fact №3",
    "Fact №4",
    "Fact №5",
  ];
  bigTexts = [
    "Cats can jump up to six times their length.",
    "Some cats can swim.",
    "Some cats love the smell of chlorine.",
    "A group of kittens is called a “kindle.”",
    "Cat breeders are called “catteries.”",
  ];
  currentColor = null;
  currentText = "touch for fact";
  currentBigText = null;
  timePrev;

  heightCanvas = 700;
  widthCanvas = body.offsetWidth;

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

      this.ctx.font = "48px sans-serif";
      this.ctx.fillStyle = "#ffffff";
      this.ctx.fillText(
        this.currentText,
        600,
        350
      );
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

  drawBigText(countMove) {
    this.ctx.font = "68px sans-serif";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText(
      this.currentText,
      this.widthCanvas - (countMove - this.widthCanvas / 2) - 300,
      250
    );
  }

  drawText(countMove) {
    this.ctx.font = "48px sans-serif";
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
    let indent = (window.innerWidth - canvasColor.canvas.width) / 2;
    let x = e.pageX - canvasColor.canvas.offsetLeft - indent;
    let y = e.pageY - canvasColor.canvas.offsetTop;
    canvasColor.onClick(x, y);
  }
});
