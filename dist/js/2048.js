const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scoreLabel = document.querySelector("#score");

let score = 0;
let highscore = localStorage.getItem("2048-highscore");
let size = 4;
let width = canvas.width / size - 6;

let cells = [];
let fontSize;
let loss = false;

startGame();

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
}

function finishGame() {
  loss = true;
  for (let i = 0; i < size; i++) {
    cells[0][i].value = "";
    cells[3][i].value = "";
  }
  cells[1][0].value = "G";
  cells[1][1].value = "A";
  cells[1][2].value = "M";
  cells[1][3].value = "E";
  cells[2][0].value = "O";
  cells[2][1].value = "V";
  cells[2][2].value = "E";
  cells[2][3].value = "R";
  drawAllCells();
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("2048-highscore", score);
  }
}

function cell(row, col) {
  this.value = 0;
  this.x = col * width + 5 * (col + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  for (let i = 0; i < size; i++) {
    cells[i] = [];
    for (let j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);

  switch (cell.value) {
    case 0:
      ctx.fillStyle = "#61C8E8";
      break;
    case 2:
      ctx.fillStyle = "#78BBFF";
      break;
    case 4:
      ctx.fillStyle = "#6181E8";
      break;
    case 8:
      ctx.fillStyle = "#6F6BFF";
      break;
    case 16:
      ctx.fillStyle = "#8356E8";
      break;
    case 32:
      ctx.fillStyle = "#BB5EFF";
      break;
    case 64:
      ctx.fillStyle = "#7B4AE8";
      break;
    case 128:
      ctx.fillStyle = "#5752FF";
      break;
    case 256:
      ctx.fillStyle = "#3F66E8";
      break;
    case 512:
      ctx.fillStyle = "#45A2FF";
      break;
    case 1024:
      ctx.fillStyle = "#33BEE8";
      break;
    case 2048:
      ctx.fillStyle = "#27E8AB";
      break;
    case 4096:
      ctx.fillStyle = "#2BFF7F";
      break;
    case "":
      ctx.fillStyle = "#333333";
      break;
    default:
      ctx.fillStyle = "#7B4AE8";
  }

  ctx.fill();
  if (cell.value) {
    fontSize = width / 2;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(
      cell.value,
      cell.x + width / 2,
      cell.y + width / 2 + width / 7
    );
  }
}

function drawAllCells() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  let freeSpaces = 0;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        freeSpaces++;
      }
    }
  }

  if (!freeSpaces) {
    finishGame();
    return;
  }

  while (true) {
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    if (!cells[row][col].value) {
      cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      break;
    }
  }
}

document.onkeydown = e => {
  if (!loss) {
    if (e.keyCode === 38 || e.keyCode === 87) moveUp();
    else if (e.keyCode === 39 || e.keyCode === 68) moveRight();
    else if (e.keyCode === 40 || e.keyCode === 83) moveDown();
    else if (e.keyCode === 37 || e.keyCode === 65) moveLeft();
    scoreLabel.innerHTML = score;
  }
};

function moveUp() {
  for (let j = 0; j < size; j++) {
    for (let i = 0; i < size; i++) {
      if (cells[i][j].value) {
        let row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row - 1][j].value === cells[row][j].value) {
            cells[row - 1][j].value *= 2;
            score += cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveRight() {
  for (let i = 0; i < size; i++) {
    for (let j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        let col = j;
        while (col + 1 < size) {
          if (!cells[i][col + 1].value) {
            cells[i][col + 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col++;
          } else if (cells[i][col].value === cells[i][col + 1].value) {
            cells[i][col + 1].value *= 2;
            score += cells[i][col + 1].value;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveDown() {
  for (let j = 0; j < size; j++) {
    for (let i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        let row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row + 1][j].value === cells[row][j].value) {
            cells[row + 1][j].value *= 2;
            score += cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveLeft() {
  for (let i = 0; i < size; i++) {
    for (let j = 1; j < size; j++) {
      if (cells[i][j].value) {
        let col = j;
        while (col - 1 >= 0) {
          if (!cells[i][col - 1].value) {
            cells[i][col - 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col--;
          } else if (cells[i][col].value === cells[i][col - 1].value) {
            cells[i][col - 1].value *= 2;
            score += cells[i][col - 1].value;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}
