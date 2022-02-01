// EventListener.js

// TODO: Fix this
class EventListener {
  constructor(canvas, paddle) {
    this.rightPressed = false;
    this.leftPressed = false;

    // creating event listeners
    this.keyDown()
    this.keyUp()
    this.mouseMove(canvas, paddle)
  }
 
  // **********************************************************************
  // Private Mehtods
  // **********************************************************************  

  #keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.leftPressed = true;
    }
  }
  
  #keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.leftPressed = false;
    }
  }
  
  #mouseMoveHandler(e, canvas, paddle) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    }
  }
  
  // **********************************************************************
  // Public Methods
  // **********************************************************************

  keyDown() {
    document.addEventListener('keydown', (e) => {
      this.#keyDownHandler.bind(this)
    }, false);
  }

  keyUp() {
    document.addEventListener('keyup', (e) => {
      this.#keyUpHandler(e)
    }, false);
  }

  mouseMove(canvas, paddle) {
    document.addEventListener('mousemove', this.#mouseMoveHandler(canvas, paddle), false);
  }
}

export default EventListener;
