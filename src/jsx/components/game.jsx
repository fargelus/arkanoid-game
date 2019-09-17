import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.jsx';
import Platform from '../../js/views/platform.js';
import { deepCopyObj } from '../../js/utils.js';
import { FIGURE_TYPES } from '../../js/figure_types.js';


class Game extends React.Component {
  constructor(props) {
    super(props);

    this._width = +this.props.w || 800;
    this._height = +this.props.h || 600;

    this._platformRenderInfo = this._getPlatformRenderInfo();
    this._onPlatformMove = this._onPlatformMove.bind(this);
    const platformSettings = {
      edge: this._width,
      shift: 10,
      length: this._platformRenderInfo.width,
      onMove: this._onPlatformMove,
      pos: this._platformRenderInfo.x,
    };
    this._platform = new Platform(platformSettings);

    this._viewsMap = {};
    this._initViews();

    this.state = {
      render_views: Object.values(deepCopyObj(this._viewsMap)),
    };
  }

  _initViews() {
    this._initPlatformView();
  }

  _initPlatformView() {
    const platformView = {
      ...this._platformRenderInfo,
      color: '#5677d1',
      type: FIGURE_TYPES.RECT,
    };

    this._viewsMap['platform'] = platformView;
  }

  _onPlatformMove() {
    this._viewsMap['platform'].x = this._platform.getPos();
    this.setState({
      render_views: Object.values(deepCopyObj(this._viewsMap)),
    });
  }

  _getPlatformRenderInfo() {
    const WIDTH = 120;
    const HEIGHT = 20;
    const x = this._width / 2 - WIDTH / 2;
    const y = this._height * 0.85;

    return {
      x: x,
      y: y,
      width: WIDTH,
      height: HEIGHT,
    };
  }

  render() {
    return (
            <div>
              <Field
                views={this.state.render_views}
                width={this._width}
                height={this._height} />
            </div>
          );
  }
}

Game.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
};


export default Game;
