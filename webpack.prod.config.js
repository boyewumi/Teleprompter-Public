const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
        './src/index.js',
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.s?css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
        },
      }],
    },
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  target: 'electron-renderer',
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new MinifyPlugin()
  ],
}