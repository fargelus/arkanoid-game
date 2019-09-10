import React from 'react';
import '../../styles/canvas.css';


class Field extends React.Component {
  constructor(props) {
    super(props);

    this._ctx;
    this._views = this.props.views || [];
  }

  componentDidMount() {
    this._setupContext();
    this._renderViews();
  }

  _setupContext() {
    const cnv = this.refs.cnv;
    this._ctx = cnv.getContext('2d');
  }

  _renderViews() {
    const that = this;
    this._views.forEach((view) => {
      that._ctx.fillStyle = view.color;
      that._ctx.fillRect(
        view.x,
        view.y,
        view.width,
        view.height
      );
    });
  }

  shouldComponentUpdate() {
    this._clearOldViews();
    return true;
  }

  _clearOldViews() {
    console.log('old views: ', this._views);
  }

  render() {
    return <canvas
            className="canvas"
            ref="cnv"
            width={this.props.width}
            height={this.props.height}></canvas>;
  }
}


export default Field;
