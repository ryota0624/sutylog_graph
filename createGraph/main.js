// import Chart from 'chart.js';
import csv from '../log.csv';

const init = () => {
  const processCanvas = document.createElement("canvas");
  const globalCanvas = document.createElement("canvas");
  document.body.appendChild(processCanvas);
  document.body.appendChild(globalCanvas);
  const logData = csvToArray(csv);
  processMemory(logData, processCanvas);
  globalMemory(logData, globalCanvas);
};

function processMemory(logData, canvas) {
  const chart = new LineChart();
  chart.setLabels(logData.map((log, key) => ""));
  /* 
  *fix typo
  **/
  function processMemoryDiv(log) {
    return Number(log.processMemoryCur) / Number(log.processMemoryMax);
  }
  const processMemory = logData.map(processMemoryDiv);
  chart.setData({ data: processMemory, label: "processMemory"});
  chart.draw(canvas);
}

function globalMemory(logData, canvas) {
  const chart = new LineChart();
  function globalMemoryDiv(log) {
    return Number(log.pcMemoryCur) / Number(log.pcMemoryMax);
  }
  chart.setLabels(logData.map((log, key) => ""));
  const globalMemory = logData.map(globalMemoryDiv);
  chart.setData({ data: globalMemory, label: "globalMemory"});
  chart.draw(canvas);
}

class LineChart {
  constructor(labels) {
    this.labels = labels;
    this.datasets = [];
  }
  setLabels(labels) {
    this.labels = labels;
  }
  setData(dataset) {
    this.datasets = [].concat(this.datasets, dataset);
  }
  dist() {
    return {
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
    }
  }
  draw(canvas) {
    return new Chart.Line(canvas, this.dist())
  }
}

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
