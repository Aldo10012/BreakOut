// Ball.js
import Sprite from './Sprite.js';

class Ball {
  constructor(x, y, speed = 5, radius = 10) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.dx = speed;
    this.dy = -speed;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
