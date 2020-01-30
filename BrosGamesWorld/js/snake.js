function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 2;
  this.tail = [];

  this.draw = function() {
    ctx.fillStyle = "lime";
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      gameOver();
    }

    if (this.y > canvas.height) {
      gameOver();
    }

    if (this.x < 0) {
      gameOver();
    }

    if (this.y < 0) {
      gameOver();
    }
  };

  this.changeDirection = function(direction) {
    switch (direction) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case "Left":
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  };

  this.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }

    return false;
  };

  this.checkCollision = function() {
    for (var i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        gameOver();
      }
    }
  };
}
function Fruit() {
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
  };

  this.draw = function() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let highscore = localStorage.getItem("snake-highscore");
let scoreOverTen, allTimeApplesEaten;
if (localStorage.hasOwnProperty("snake-score-over-ten")) {
  scoreOverTen = localStorage.getItem("snake-score-over-ten");
} else {
  scoreOverTen = 0;
}
if (localStorage.hasOwnProperty("snake-all-time-apples-eaten")) {
  allTimeApplesEaten = JSON.parse(
    localStorage.getItem("snake-all-time-apples-eaten")
  );
} else {
  allTimeApplesEaten = 0;
}
let score;
var snake;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();
    score = snake.total - 2;
    document.querySelector(".score").innerText = score;

    if (score > highscore) {
      highscore = score;
      localStorage.setItem("snake-highscore", score);
    }
  }, 250);
})();

function gameOver() {
  allTimeApplesEaten += score;
  localStorage.setItem("snake-all-time-apples-eaten", allTimeApplesEaten);
  if (score > 10) {
    scoreOverTen++;
    localStorage.setItem("snake-score-over-ten", scoreOverTen);
  }
  window.location.replace("./pages/games.html");
}

window.addEventListener("keydown", evt => {
  const direction = evt.key.replace("Arrow", "");
  snake.changeDirection(direction);
});
