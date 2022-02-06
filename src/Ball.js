// Ball.js
import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(x, y, speed = 5, radius = 10) {
    super(x, y, radius / 2, radius / 2);
    this.speed = speed;
    this.dx = speed;
    this.dy = -speed;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
