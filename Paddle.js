// Paddle.js

class Paddle {
  constructor(canvas, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.paddleX = (canvas.width - width) / 2;
  }

draw(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
