// Paddle.js

class Paddle {
  constructor(canvas, height = 10, width = 75) {
    this.paddleHeight = height;
    this.paddleWidth = width;
    this.paddleX = (canvas.width - width) / 2;
  }

drawPaddle(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
