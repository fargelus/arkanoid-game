import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/canvas.css';


class Field extends React.Component {
  constructor(props) {
    super(props);

    this._ref = React.createRef();
    this._ctx;
    this._baseViews = this.props.views || [];
  }

  componentDidMount() {
    this._setupContext();
    this._renderViews(this._baseViews);
  }

  _setupContext() {
    const cnv = this._ref.current;
    this._ctx = cnv.getContext('2d');
  }

  _renderViews(views) {
    const that = this;
    views.forEach((view) => {
      that._ctx.fillStyle = view.color;
      that._ctx.fillRect(
        view.x,
        view.y,
        view.width,
        view.height
      );
    });
  }

  componentDidUpdate(prevProps) {
    this._clearOldViews(prevProps.views);
    this._renderViews(this.props.views);
  }

  _clearOldViews(oldViews) {
    const that = this;
    oldViews.forEach((view) => {
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
            ref={this._ref}
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
