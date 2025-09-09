const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let snack = [];
//snack object
snack[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
//food object
let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
let d = "right";
document.onkeydown = direction;
function direction(event) {
  //eventu senenkaw new miwsdew
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

//let playGame = setInterval(draw, 100);
let playGame;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snack.length; i++) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "pink";
    ctx.fillRect(snack[i].x, snack[i].y, scale, scale);
    ctx.strokeRect(snack[i].x, snack[i].y, scale, scale);
  }
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "red";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);
  let snackeX = snack[0].x;
  let snackeY = snack[0].y;
  console.log(snackeX);
  if (d == "left") snackeX -= scale;
  if (d == "up") snackeY -= scale;
  if (d == "right") snackeX += scale;
  if (d == "down") snackeY += scale;
  if (snackeX > canvas.width) {
    snackeX = 0;
  }
  if (snackeY > canvas.height) {
    snackeY = 0;
  }
  if (snackeX < 0) {
    snackeX = canvas.width;
  }
  if (snackeY < 0) {
    snackeY = canvas.height;
  }
  if (snackeX == food.x && snackeY == food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
    addPoint();
  } else {
    snack.pop();
  }
  let newHead = {
    x: snackeX,
    y: snackeY,
  };
  if (eatSelf(newHead, snack)) {
    clearInterval(playGame);
    alert("game over");
  }

  snack.unshift(newHead);
}
function eatSelf(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
// =================== EXTRA FUNCTIONS ===================

// Keep track of score
let score = 0;
const scoreElement = document.getElementById("score");

// Update score display
function updateScore() {
  scoreElement.textContent = score;
}

// Start game
function startGame() {
  clearInterval(playGame); // stop if already running
  playGame = setInterval(draw, 100);
}

// Reset game
function resetGame() {
  clearInterval(playGame);
  snack = [
    {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    },
  ];
  food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
  };
  d = "right";
  score = 0;
  updateScore();
}

function addPoint() {
  score++;
  updateScore();
}

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);

addPoint();
