const exec = require('child_process').exec;

const copyLogCSV = (path, cb) => {
  return new Promise((res, rej) => {
    exec(`cp ${path} ${__dirname + '/../log.csv'}`, (err, data) => {
      if(err) rej(err);
      res(path);
    });
  })
}

module.exports = copyLogCSV;