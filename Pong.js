// Select the canvas and its context
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Create the Pong game elements

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: 4,
  color: 'white'
};

// Paddle object
const paddleWidth = 10;
const paddleHeight = 100;
const leftPaddle = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: 'white',
  dy: 4 // Paddle speed
};
const rightPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: 'white',
  dy: 4 // Paddle speed
};

// Controls for the paddles
const upArrow = 38;
const downArrow = 40;
const wKey = 87;
const sKey = 83;

// Initialize the game variables
let upPressed = false;
let downPressed = false;
let wPressed = false;
let sPressed = false;

// Draw the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

// Draw the paddles
function drawPaddle(x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// Move the paddles
function movePaddles() {
  if (upPressed && rightPaddle.y > 0) {
    rightPaddle.y -= rightPaddle.dy;
  } else if (downPressed && rightPaddle.y + rightPaddle.height < canvas.height) {
    rightPaddle.y += rightPaddle.dy;
  }

  if (wPressed && leftPaddle.y > 0) {
    leftPaddle.y -= leftPaddle.dy;
  } else if (sPressed && leftPaddle.y + leftPaddle.height < canvas.height) {
    leftPaddle.y += leftPaddle.dy;
  }
}

// Update the ball's position
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off top and bottom walls
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  // Ball collision with paddles
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + leftPaddle.height) {
    ball.dx = -ball.dx;
  }
  if (ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + rightPaddle.height) {
    ball.dx = -ball.dx;
  }

  // Ball out of bounds (left or right side)
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    resetBall();
  }
}

// Reset the ball to the center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = 4;
}

// Draw everything on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the ball and paddles
  drawBall();
  drawPaddle(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, leftPaddle.color);
  drawPaddle(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, rightPaddle.color);

  // Move the paddles
  movePaddles();

  // Update the ball's position
  updateBall();
}

// Set up the keyboard controls
function keyDownHandler(e) {
  if (e.keyCode === upArrow) {
    downPressed = false;
    upPressed = true;
  }
  if (e.keyCode === downArrow) {
    upPressed = false;
    downPressed = true;
  }
  if (e.keyCode === wKey) {
    sPressed = false;
    wPressed = true;
  }
  if (e.keyCode === sKey) {
    wPressed = false;
    sPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === upArrow) {
    upPressed = false;
  }
  if (e.keyCode === downArrow) {
    downPressed = false;
  }
  if (e.keyCode === wKey) {
    wPressed = false;
  }
  if (e.keyCode === sKey) {
    sPressed = false;
  }
}

// Set event listeners for key press events
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Start the game loop
function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

// Begin the game
gameLoop();
