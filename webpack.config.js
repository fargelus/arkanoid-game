const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  target: 'node',

  entry: ['babel-polyfill', './src/jsx/app.jsx'],

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.bundle.js',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    watchContentBase: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    symlinks: false,
  },

  optimization: {
    minimize: true,
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'src/jsx'),
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
