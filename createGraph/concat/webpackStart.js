const webpack = require("webpack");
var webpackConfig = require("../webpack.config.js");
webpackConfig.devtool = null;
const compiler = webpack(webpackConfig);

const webpackStart = (cb) => compiler.run((err, stats) => cb());

module.exports = webpackStart;