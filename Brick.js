// Brick.js
import Sprite from './Sprite.js';

class Brick extends Sprite{
  constructor(x, y, width = 75, height = 20) {
    super(x, y, width, height);
    // this.x = x;
    // this.y = y;
    this.status = 1;
    // this.width = width;
    // this.height = height;
  }

  draw(ctx, r, c) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);

    // adding checkers pattern
    if (((r % 2 === 0) && (c % 2 === 0)) || ((r % 2 === 1) && (c % 2 === 1))) {
      this.color = '#000000'
      ctx.fillStyle = this.color;
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
