'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ROOT = './app/src';
const DIST = './app/dist';

module.exports = {
  entry: `${ROOT}/app`,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: `${ROOT}/index.html`,
      inject: false,
      assets: {
        style: 'style.css'
      },
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new ExtractTextPlugin('bundle.min.css')
  ],
  output: {
    path: DIST,
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', '> 10%', 'ie 9']
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel?cacheDirectory', 'webpack-strip?strip[]=debug,strip[]=console.log,strip[]=console.dir'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss-loader', {publicPath: './'})
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.(jp(e)g|gif|png)?$/,
      loader: 'file?name=img/[name].[ext]'
    }]
  }
};
