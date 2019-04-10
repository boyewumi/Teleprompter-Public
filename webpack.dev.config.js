const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        './src/index.js',
    ],
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    publicPath: 'http://localhost:9000/',
    historyApiFallback: true,
    port: 9000,
    proxy: {
      "/api": "http://localhost:8080"
    },
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }],
    },
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:9000/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],

}