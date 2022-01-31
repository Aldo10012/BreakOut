// GameLabel.js

class GameLabel {
  constructor(text, value, x, y, color = '#0095DD', font = '16px Arial') {
    this.text = text
    this.value = value;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font
  }
  
  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
