const webpack = require('webpack');
const ExternalsPlugin = webpack.ExternalsPlugin;

module.exports = {
  entry: __dirname + "/../browser/index.js",
  output: {
    path: __dirname + "/dist",
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
      {
        test: /\.json$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
    ]
  }
}