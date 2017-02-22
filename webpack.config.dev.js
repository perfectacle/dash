'use strict';
var path = require('path');
var webpack = require('webpack');

var HOST  = 'http://localhost';
var PORT  = 8080;
var URL   = HOST + ':' + PORT + '/';
var _PATH = path.resolve(__dirname, 'app/src');

module.exports = {
  HOST: HOST,
  PORT: PORT,
  URL: URL,
  devtool: 'cheap-module-eval-source-map',
  context: _PATH,
  entry: {
    index: [
      'webpack-dev-server/client?' + HOST + ':' + PORT,
      'webpack/hot/only-dev-server',
      path.resolve(_PATH, 'app')
    ]
  },
  output: {
    path: _PATH,
    filename: 'bundle.js',
    publicPath: URL
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      include: [_PATH],
      exclude: [/node_modules/],
      loader: 'babel?cacheDirectory'
    }]
  },
  resolve: {
    root: [ _PATH ],
    extensions: [ '', '.js' ]
  },
  node: { fs: 'empty' },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
