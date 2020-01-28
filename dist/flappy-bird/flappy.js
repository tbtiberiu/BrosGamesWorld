const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreLabel = document.querySelector("#score");

// load images

const bird = new Image();
const bg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

const fly = new Audio();
const scor = new Audio();

bird.src = "images/bird.png";
bg.src = "images/bg_night.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

let gap = 90;
let constant;
let bX = 10;
let bY = 150;
let gravity = 1.25;
let jump = 30;
let score = 0;
let highscore = localStorage.getItem("flappy-bird-highscore");

function moveUp() {
  bY -= jump;
  fly.play();
}

let pipe = [
  {
    x: canvas.width,
    y: 0
  }
];

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= canvas.height
    ) {
      if (score > highscore) {
        highscore = score;
        localStorage.setItem("flappy-bird-highscore", highscore);
      }

      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  scoreLabel.innerHTML = score;

  requestAnimationFrame(draw);
}

draw();

document.addEventListener("keydown", moveUp);
