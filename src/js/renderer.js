import { FIGURE_TYPES } from './figure_types.js';


class Renderer {
  constructor(context) {
    this._ctx = context;
  }

  render(views) {
    const that = this;
    views.forEach((view) => {
      that._ctx.fillStyle = view.color;
      that._renderViewConsiderType(view);
    });
  }

  _renderViewConsiderType(view) {
    const { RECT } = FIGURE_TYPES;
    switch (view.type) {
      case RECT:
        this._renderRectView(view);
        break;
      default:
        break;
    }
  }

  _renderRectView(view) {
    this._ctx.fillRect(
      view.x,
      view.y,
      view.width,
      view.height
    );
  }

  clear(views) {
    // TODO
    const that = this;
    views.forEach((view) => {
      that._ctx.clearRect(
        view.x,
        view.y,
        view.width,
        view.height
      );
    });
  }
}


export default Renderer;
