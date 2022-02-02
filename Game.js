// Game.js
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';
import EventListener from './EventListener.js';

class Game {
  constructor(canvas, ctx) {
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
    this.draw(ctx);
  }

  setup() {
    this.resetBallAndPaddle();
    this.bricks.initializedBricks();

    const event = new EventListener(this.canvas, this.paddle)
    event.setupEventListeners()
  }

  // **********************************************************************
  // Game Mechanics
  // **********************************************************************

  // view resets
  resetBallAndPaddle() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = this.ball.speed;
    this.ball.dy = -this.ball.speed;
    this.paddle.paddleX = (this.canvas.width - this.paddle.width) / 2;
  }

  // collision detection
  collisionDetection() {
    for (let c = 0; c < this.bricks.columnCount; c += 1) {
      for (let r = 0; r < this.bricks.rowCount; r += 1) {
        const b = this.bricks.bricks[c][r];
        if (b.status === 1) {
          if (this.ball.x > b.x
            && this.ball.x < b.x + b.width
            && this.ball.y > b.y
            && this.ball.y < b.y + b.height
          ) {
            this.ball.dy = -this.ball.dy;
            b.status = 0;
            this.scoreLabel.value += 1;

            if (this.scoreLabel.value === this.bricks.rowCount * this.bricks.columnCount) {
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
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius
    ) {
      this.ball.dx = -this.ball.dx;
    }

    // ball hit top
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      // ball hit paddle
      if (this.ball.x > this.paddle.paddleX
        && this.ball.x < this.paddle.paddleX + this.paddle.width
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
      if (this.paddle.paddleX + this.paddle.width > this.canvas.width) {
        this.paddle.paddleX = this.canvas.width - this.paddle.width;
      }
    } else if (this.leftPressed) {
      this.paddle.paddleX -= 7;
      if (this.paddle.paddleX < 0) {
        this.paddle.paddleX = 0;
      }
    }
  }

  // **********************************************************************
  // UI Setup
  // **********************************************************************

  draw(ctx) {
    console.log('-- draw() --')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.draw(ctx);
    this.ball.draw(ctx);
    this.paddle.draw(ctx);
    this.scoreLabel.draw(ctx);
    this.livesLabel.draw(ctx);

    this.collisionDetection();
    this.checkIfBallHitSide();
    this.checkIfKeyWasPressed();

    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    // TODO: fix
    // requestAnimationFrame(this.draw.bind(this));   // this is solution A: Binding
    requestAnimationFrame(() => {
      this.draw(ctx)
    });
  }
}

export default Game;
