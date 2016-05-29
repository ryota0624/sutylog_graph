// import Chart from 'chart.js';
import csv from '../log.csv';
import rawinfo from '../loginfo.json';
import { processMemory, rss } from './drawChart.js';

const info = JSON.parse(rawinfo);

const init = () => {
  document.write('<h1>' + info.name + '</h1>');
  const logData = csvToArray(csv);
  processMemory(logData);
  rss(logData);
};

export default {
  init
}

function arrayToDataset(arr, label) {
  return { label, data: arr }
}

function csvToArray(csv) {
  const lineToObj = (header) => (line) => line.split(',')
  .reduce((prev, curr, i) => Object.assign({}, prev, { [header[i]]:curr }), {})
  let dataArray = csv.split('\n').filter(i => i);
  const header = dataArray.shift().split(',');
  return dataArray.map(lineToObj(header));
}
