'use strict';
const webpack = require('webpack');

const ROOT = './app/src';

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    `${ROOT}/app`
  ],
  output: {
    path: '/',
    publicPath: 'http://localhost:3001/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?cacheDirectory'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css?sourceMap']
    }, {
      test: /\.html/,
      loaders: ['raw-loader']
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=fonts/[name].[ext]'
    }]
  },
  devServer: {
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    contentBase: ROOT,
    proxy: {
      '**': 'http://localhost:3000/'
    }
  }
};
