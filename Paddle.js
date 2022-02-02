// Paddle.js
import Sprite from './Sprite.js';


class Paddle extends Sprite {
  constructor(canvas, height = 10, width = 75) {
    super(0, 0, width, height);
    // this.height = height;
    // this.width = width;
    this.paddleX = (canvas.width - width) / 2;
    this.paddleY = canvas.height - this.height
  }

draw(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.paddleX, this.paddleY, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
