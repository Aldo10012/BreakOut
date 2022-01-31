// Game.js
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';

class Game {
  constructor(canvas) {
    this.ball = new Ball(canvas.width / 2, canvas.height - 30);
    this.paddle = new Paddle(canvas);
    this.bricks = new Bricks();
    // bricks.initializedBricks();
    this.scoreLabel = new GameLabel('Score', 0, 8, 20);
    this.livesLabel = new GameLabel('Lives', 3, canvas.width - 65, 20)

    this.rightPressed = false;
    this.leftPressed = false;
  }

  setup() {
      
  }
}


export default Game;
