const fs = require('fs');
const webpack = require('./webpackStart');
const concatHTML = () => fs.readFile(__dirname + '/temp.html',(err, fileBuff) => {
  const htmlFile = fileBuff.toString();
  fs.readFile(__dirname + '/dist/out.js', (err, fileBuff) => {
    const jsFile = fileBuff.toString();
    const outHTML = htmlFile.replace('/*sutytemp*/', "<script>"+jsFile+"</script>");
    fs.writeFile(__dirname + '/dist/index.html', outHTML, (err) => console.log(err));
  });
});

webpack(concatHTML);
