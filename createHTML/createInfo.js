const fs = require('fs');

const createInfo = (info) => {
  return new Promise((res, rej) => {
    const logPath = info.path;
    const graphName = info.name;
    const file = fs.writeFile(__dirname + '/../loginfo.json', JSON.stringify({ name: graphName }), (data, err) => {
      if (err) rej(err);
      res(info)
    });
  })
}

module.exports = createInfo;