// Bricks.js
import Brick from './Brick.js';

class Bricks {
  constructor() {
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
  }

  initializedBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brickWidth = 75;
        const brickHeight = 20;
        const brickX = (c * (brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }

  drawBricks(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.drawBrick(ctx, r, c);
        }
      }
    }
  }
}

export default Bricks;
