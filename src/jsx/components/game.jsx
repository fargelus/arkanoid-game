import React from 'react';
import Field from './field.jsx';
import Platform from '../../js/views/platform.js';
import PropTypes from 'prop-types';


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

    this._views = {};
    this._initViews();

    this.state = {
      views: this._views,
    };
  }

  _initViews() {
    this._initPlatformView();
  }

  _initPlatformView() {
    const platformView = {
      ...this._platformRenderInfo,
      color: '#5677d1',
    };

    this._views['platform'] = platformView;
  }

  _onPlatformMove() {
    const views = this.state.views;
    views['platform'].x = this._platform.getPos();
    this.setState({
      views: views,
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
    const viewsToRender = Object.values(this.state.views);

    return (
            <div>
              <Field
                views={viewsToRender}
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
