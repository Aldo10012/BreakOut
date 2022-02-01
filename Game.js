// Game.js
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';
// import EventListener from './EventListener.js';

class Game {
  constructor(canvas) {
    this.canvas = canvas;

    this.ball = new Ball(canvas.width / 2, canvas.height - 30);
    this.paddle = new Paddle(canvas);
    this.bricks = new Bricks();
    // bricks.initializedBricks();
    this.scoreLabel = new GameLabel('Score', 0, 8, 20);
    this.livesLabel = new GameLabel('Lives', 3, canvas.width - 65, 20);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();
    this.draw();
  }

  setup() {
    this.resetBallAndPaddle();

    // TODO: Fix
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
    document.addEventListener('mousemove', this.mouseMoveHandler, false);
  }

  // **********************************************************************
  // Game Mechanics
  // **********************************************************************

  // view resets
  resetBallAndPaddle() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = this.ball.ballSpeed;
    this.ball.dy = -this.ball.ballSpeed;
    this.paddle.paddleX = (this.canvas.width - this.paddle.paddleWidth) / 2;
  }

  // collision detection
  collisionDetection() {
    for (let c = 0; c < this.bricks.brickColumnCount; c += 1) {
      for (let r = 0; r < this.bricks.brickRowCount; r += 1) {
        const b = this.bricks.bricks[c][r];
        if (b.status === 1) {
          if (this.ball.x > b.x
            && this.ball.x < b.x + b.brickWidth
            && this.ball.y > b.y
            && this.ball.y < b.y + b.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            b.status = 0;
            this.scoreLabel.value += 1;

            if (this.scoreLabel.value === this.bricks.brickRowCount * this.bricks.brickColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  checkIfBallHitSide() {
    // ball hit left or right side
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.ballRadius
      || this.ball.x + this.ball.dx < this.ball.ballRadius
    ) {
      this.ball.dx = -this.ball.dx;
    }

    // ball hit top
    if (this.ball.y + this.ball.dy < this.ball.ballRadius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.ballRadius) {
      // ball hit paddle
      if (this.ball.x > this.paddle.paddleX
        && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth
      ) {
        this.ball.dy = -this.ball.dy;
      } else { // ball hit bottom
        this.livesLabel.value -= 1;
        if (!this.livesLabel.value) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.resetBallAndPaddle();
        }
      }
    }
  }

  checkIfKeyWasPressed() {
    if (this.rightPressed) {
      this.paddle.paddleX += 7;
      if (this.paddle.paddleX + this.paddle.paddleWidth > this.canvas.width) {
        this.paddle.paddleX = this.canvas.width - this.paddle.paddleWidth;
      }
    } else if (this.leftPressed) {
      this.paddle.paddleX -= 7;
      if (this.paddle.paddleX < 0) {
        this.paddle.paddleX = 0;
      }
    }
  }

  // **********************************************************************
  // Event Listeners
  // **********************************************************************

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.paddleX = relativeX - this.paddle.paddleWidth / 2;
    }
  }

  // **********************************************************************
  // UI Setup
  // **********************************************************************

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.drawBricks(ctx);
    this.ball.drawBall(ctx);
    this.paddle.drawPaddle(ctx, this.canvas);
    this.scoreLabel.draw(ctx);
    this.livesLabel.draw(ctx);

    this.collisionDetection();
    this.checkIfBallHitSide();
    this.checkIfKeyWasPressed();

    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    requestAnimationFrame(this.draw); // TODO: fix
  }
}

export default Game;
