// Ball.js
import Sprite from './Sprite.js'

class Ball extends Sprite {

  constructor(canvas) {
    super()

    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.ballRadius = 10;
    this.ballSpeed = 5;
    this.dx = ballSpeed;
    this.dy = -ballSpeed;
  }

  drawBall(ctx) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

}

export default Ball


