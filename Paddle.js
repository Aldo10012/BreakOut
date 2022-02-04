// Paddle.js
import Sprite from './Sprite.js';


class Paddle extends Sprite {
  constructor(canvas, height = 10, width = 75) {
    super((canvas.width - width) / 2, canvas.height - height, width, height);
    this.starterX = this.x
  }
}

export default Paddle;
