class Platform {
  constructor(settings) {
    this._leftWall = 0;
    this._rightWall = settings.edge;
    this._stepSize = settings.shift;
    this._emitMove = settings.onMove;
    this._length = settings.length;
    this._pos = settings.pos;

    this._codesToDirection = {
      37: 'left',
      39: 'right',
    };
    this._setupMoveBehavior();
  }

  _setupMoveBehavior() {
    const codes = Object.keys(this._codesToDirection);
    const that = this;
    window.addEventListener('keydown', (ev) => {
      const pressedCode = '' + ev.keyCode;
      if (codes.includes(pressedCode)) {
        const direction = that._codesToDirection[pressedCode];
        that._move(direction);
      }
    });
  }

  getPos() {
    return this._pos;
  }

  _move(direction) {
    direction === 'left' ? this._moveLeft()
                         : this._moveRight();
    this._emitMove();
  }

  _moveLeft() {
    if (this._pos - this._stepSize >= this._leftWall) {
      this._pos -= this._stepSize;
    }
  }

  _moveRight() {
    const rightCorner = this._pos + this._length;
    if (rightCorner + this._stepSize <= this._rightWall) {
      this._pos += this._stepSize;
    }
  }
}


export default Platform;
