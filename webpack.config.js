const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',

  entry: ['babel-polyfill', './src/jsx/app.jsx'],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    watchContentBase: true,
    writeToDisk: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },

  output: {
    filename: 'app.bundle.js',
    publicPath: path.resolve(__dirname, 'dist'),
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: {
    minimize: true,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './index.html',
      to: '.',
    }])
  ],
};
