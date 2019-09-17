import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/canvas.css';
import Renderer from '../../js/renderer.js';


class Field extends React.Component {
  constructor(props) {
    super(props);

    this._ref = React.createRef();
    this._ctx;
    this._baseViews = this.props.views || [];
    this._renderer;
  }

  componentDidMount() {
    this._setupContext();
    this._renderer = new Renderer(this._ctx);
    this._renderer.render(this._baseViews);
  }

  _setupContext() {
    const cnv = this._ref.current;
    this._ctx = cnv.getContext('2d');
  }

  componentDidUpdate(prevProps) {
    this._renderer.clear(prevProps.views);
    this._renderer.render(this.props.views);
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
