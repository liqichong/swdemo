const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/index.js',
      'normalize.css',
    ],
    vendor: [
      '98k', 'axios',
    ],
  },
  output: {
    path          : path.resolve(__dirname, 'dist'),
    filename      : 'js/[name].js',
    publicPath    : '/',
    chunkFilename : 'js/[name].js',
  },
  module: {
    rules: [
      {
        use     : ['babel-loader'],
        test    : /\.js$/,
        exclude : /node_modules/,
        include : path.resolve(__dirname, 'src'),
      },
      {
        use  : ['style-loader', 'css-loader?importLoaders=1&modules', 'sass-loader'],
        test : /\.s?css$/,
      },
    ],
  },
  devtool : 'source-map',
  plugins : [
    new HtmlWebpackPlugin({
      template : './src/views/index.html',
      inject   : true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
