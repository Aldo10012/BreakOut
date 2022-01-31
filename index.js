// Index.js
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';

// **********************************************************************
// DOM Reference
// **********************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **********************************************************************
// Properties
// **********************************************************************

const ball = new Ball(canvas.width / 2, canvas.height - 30);
const paddle = new Paddle(canvas);
const bricks = new Bricks();
bricks.initializedBricks();
const scoreLabel = new GameLabel('Score', 0, 8, 20);
const livesLabel = new GameLabel('Lives', 3, canvas.width - 65, 20);

// for button on keyboard
let rightPressed = false;
let leftPressed = false;

// **********************************************************************
// Event Listeners
// **********************************************************************

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.paddleX = relativeX - paddle.paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// **********************************************************************
// Game Mechanics
// **********************************************************************

// view resets
function resetBallAndPaddle() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = ball.ballSpeed;
  ball.dy = -ball.ballSpeed;
  paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
}

// collision detection
function collisionDetection() {
  for (let c = 0; c < bricks.brickColumnCount; c += 1) {
    for (let r = 0; r < bricks.brickRowCount; r += 1) {
      const b = bricks.bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + b.brickWidth && ball.y > b.y && ball.y < b.y + b.brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          scoreLabel.value += 1;

          if (scoreLabel.value === bricks.brickRowCount * bricks.brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function checkIfBallHitSide() {
  // ball hit left or right side
  if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
    ball.dx = -ball.dx;
  }

  // ball hit top
  if (ball.y + ball.dy < ball.ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
    // ball hit paddle
    if (ball.x > paddle.paddleX && ball.x < paddle.paddleX + paddle.paddleWidth) {
      ball.dy = -ball.dy;
    } else { // ball hit bottom
      livesLabel.value -= 1;
      if (!livesLabel.value) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        resetBallAndPaddle();
      }
    }
  }
}

function checkIfKeyWasPressed() {
  if (rightPressed) {
    paddle.paddleX += 7;
    if (paddle.paddleX + paddle.paddleWidth > canvas.width) {
      paddle.paddleX = canvas.width - paddle.paddleWidth;
    }
  } else if (leftPressed) {
    paddle.paddleX -= 7;
    if (paddle.paddleX < 0) {
      paddle.paddleX = 0;
    }
  }
}

// **********************************************************************
// UI Setup
// **********************************************************************

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bricks.drawBricks(ctx);
  ball.drawBall(ctx);
  paddle.drawPaddle(ctx, canvas);
  scoreLabel.draw(ctx);
  livesLabel.draw(ctx);

  collisionDetection();
  checkIfBallHitSide();
  checkIfKeyWasPressed()

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

draw();
