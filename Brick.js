// Brick.js

class Brick {
  constructor(x, y, width = 75, height = 20) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
  }

  draw(ctx, r, c) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);

    // adding checkers pattern
    if (((r % 2 === 0) && (c % 2 === 0)) || ((r % 2 === 1) && (c % 2 === 1))) {
      ctx.fillStyle = '#000000';
    } else {
      ctx.fillStyle = '#0095DD';
    }
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
