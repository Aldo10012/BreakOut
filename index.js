// Index.js
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';

// **********************************************************************
// DOM Reference
// **********************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **********************************************************************
// Properties
// **********************************************************************

// for ball
let ball = new Ball(canvas.width / 2, canvas.height - 30);

// for paddle
let paddle = new Paddle(canvas);

// for bricks
let bricks = new Bricks();
bricks.initializedBricks();

// for scores
let score = 0;

// for lives
let lives = 3;

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

// collision detection
function collisionDetection() {
  for (let c = 0; c < bricks.brickColumnCount; c += 1) {
    for (let r = 0; r < bricks.brickRowCount; r += 1) {
      const b = bricks.bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + b.brickWidth && ball.y > b.y && ball.y < b.y + b.brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score += 1;

          if (score === bricks.brickRowCount * bricks.brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// **********************************************************************
// UI Setup
// **********************************************************************

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bricks.drawBricks(ctx);
  ball.drawBall(ctx);
  paddle.drawPaddle(ctx, canvas);

  drawScore();
  drawLives();
  collisionDetection();

  // ball hit left or right side
  if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
    ball.dx = -ball.dx;
  }

  // ball hit top
  if (ball.y + ball.dy < ball.ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
    if (ball.x > paddle.paddleX && ball.x < paddle.paddleX + paddle.paddleWidth) { // ball hit paddle
      ball.dy = -ball.dy;
    } else { // ball hit bottom
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = ball.ballSpeed;
        ball.dy = -ball.ballSpeed;
        paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
      }
    }
  }

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

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

draw();
