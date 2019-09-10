import React from 'react';
import '../../styles/canvas.css';
import PropTypes from 'prop-types';
import { deepCopyObj } from '../../js/utils.js';


class Field extends React.Component {
  constructor(props) {
    super(props);

    this._ctx;
    this._views = deepCopyObj(this.props.views) || [];
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

  shouldComponentUpdate(newProps) {
    this._clearOldViews();
    this._views = deepCopyObj(newProps.views);
    this._renderViews();
    return true;
  }

  _clearOldViews() {
    const that = this;
    this._views.forEach((view) => {
      that._ctx.clearRect(
        view.x,
        view.y,
        view.width,
        view.height
      );
    });
  }

  render() {
    return <canvas
            className="canvas"
            ref="cnv"
            width={this.props.width}
            height={this.props.height}></canvas>;
  }
}

Field.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  views: PropTypes.array,
};


export default Field;
