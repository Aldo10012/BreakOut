// Ball.js
import Sprite from './Sprite.js';

class Ball {
  constructor(x, y, ballSpeed = 5, ballRadius = 10) {
    this.x = x;
    this.y = y;
    this.ballSpeed = ballSpeed;
    this.dx = ballSpeed;
    this.dy = -ballSpeed;
    this.ballRadius = ballRadius;
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
