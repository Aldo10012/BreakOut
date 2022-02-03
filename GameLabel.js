// GameLabel.js
import Sprite from './Sprite.js';

class GameLabel extends Sprite {
  constructor(text, value, x, y, color = '#0095DD', font = '16px Arial') {
    super(x, y, 0, 0, color)
    this.text = text
    this.value = value;
    // this.x = x;
    // this.y = y;
    // this.color = color;
    this.font = font
  }
  
  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
