const webpack = require('webpack');
const ExternalsPlugin = webpack.ExternalsPlugin;

module.exports = {
  entry: __dirname + "/index.js",
  output: {
    path: __dirname + "/concat/dist",
    filename: 'out.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.csv$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
    ]
  }
}