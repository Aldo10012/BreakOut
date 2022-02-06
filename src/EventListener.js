// EventListener.js

class EventListener {
  constructor(canvas, paddle) {
    this.rightPressed = false;
    this.leftPressed = false;

    this.canvas = canvas;
    this.paddle = paddle;
  }

  // **********************************************************************
  // Private Mehtods
  // **********************************************************************

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  // **********************************************************************
  // Public Methods
  // **********************************************************************

  setupEventListeners() {
    this.keyDown();
    this.keyUp();
    this.mouseMove();
  }

  keyDown() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
  }

  keyUp() {
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
  }

  mouseMove() {
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }
}

export default EventListener;
