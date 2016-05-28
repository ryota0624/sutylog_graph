const webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
webpackConfig.devtool = null;
const compiler = webpack(webpackConfig);
const webpackStart = () => new Promise((res,rej) => {
  compiler.run((err, stats) => {
    const statsJson = stats.toJson();
    if(statsJson.errors.length > 0) rej(statsJson.errors);
    res(statsJson);
  });
});

module.exports = webpackStart;