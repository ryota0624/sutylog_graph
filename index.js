const createGraphHTML = require('./createHTML/concatFiles');
const copyLogCSV = require('./createHTML/cpFile');
const createInfo = require('./createHTML/createInfo');
const webpack = require('./createHTML/webpack');

//ロググラフにつける名前と元になるログのパスを引き数にとり、graphの描画できるhtmlを出力するモジュール

const start = (info, cb) => {
  return new Promise((res, rej) => {
    createInfo(info)
      .then(() => copyLogCSV(info.path))
      .then(() => webpack())
      .then(() => createGraphHTML())
      .then(() => res())
      .catch(err => rej(err));
  });
}

start({ path: '/Users/ryota/js/movieList/movieList/server/logs/log.csv', name: 'unko' })
.then(() => console.log('done')).catch(err => console.log(err));

module.exports = start;