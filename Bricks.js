// Bricks.js
import Brick from './Brick.js';

class Bricks {
  constructor() {
    this.rowCount = 3;
    this.columnCount = 5;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.bricks = [];
  }

  initializedBricks() {
    for (let c = 0; c < this.columnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rowCount; r += 1) {
        const width = 75;
        const height = 20;
        const brickX = (c * (width + this.padding)) + this.offsetLeft;
        const brickY = (r * (height + this.padding)) + this.offsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, width, height);
      }
    }
  }

  draw(ctx) {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.draw(ctx, r, c);
        }
      }
    }
  }
}

export default Bricks;
