const fs = require('fs');
const concatHTML = () => {
  return new Promise((res, rej) => {
    fs.readFile(__dirname + '/temp.html', (err, fileBuff) => {
      if(err) rej(err);
      const htmlFile = fileBuff.toString();
      fs.readFile(__dirname + '/dist/out.js', (err, fileBuff) => {
        if(err) rej(err);
        const jsFile = fileBuff.toString();
        const outHTML = htmlFile.replace('/*sutytemp*/', "<script>"+jsFile+"</script>");
        fs.writeFile(__dirname + '/dist/index.html', outHTML, (err) => res(err));
      });
    })
  }) 
};

module.exports = concatHTML;
