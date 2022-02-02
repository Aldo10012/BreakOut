// Paddle.js
import Sprite from './Sprite.js';


class Paddle extends Sprite {
  constructor(canvas, height = 10, width = 75) {
    super((canvas.width - width) / 2, canvas.height - height, width, height);
    // this.height = height;
    // this.width = width;
    // this.x = (canvas.width - width) / 2;
    // this.y = canvas.height - this.height
    this.starterX = this.x
  }

  // draw(ctx) {
  //   ctx.beginPath();
  //   ctx.rect(this.x, this.y, this.width, this.height);
  //   ctx.fillStyle = this.color;
  //   ctx.fill();
  //   ctx.closePath();
  // }
}

export default Paddle;
