import LineChart from './lineChart';
export function processMemory(logData) {
  const { canvas, tag } = createCanvas('hashmemory', 'hashedHeap');
  const chart = new LineChart();
  const oneBlock = groupPid(logData)[0];
  chart.setLabels(oneBlock.map(() => ''));
  function processMemoryDiv(log) {
    return Number(log['processMemCurrnet/MB']) / Number(log['processMemMax/MB']);
  }
  groupPid(logData).forEach(logArray => {
    const processMemory = logArray.map(processMemoryDiv);
    chart.setData({ data: processMemory, label: `pid:${logArray[0].pid}`});
  });
  chart.draw(canvas);
}


export function globalMemory(logData) {
  const chart = new LineChart();
  function globalMemoryDiv(log) {
    return Number(log.pcMemoryCur) / Number(log.pcMemoryMax);
  }
  chart.setLabels(logData.map((log, key) => ""));
  const globalMemory = logData.map(globalMemoryDiv);
  chart.setData({ data: globalMemory, label: "globalMemory"});
  chart.draw(canvas);
}

function loadAverage(n, logData) {
  const { canvas, tag } = createCanvas(n, n);
  const chart = new LineChart();
  const oneBlock = groupPid(logData)[0];
  chart.setLabels(oneBlock.map(() => ''));

  groupPid(logData).forEach(logArray => {
    const data = logArray.map(log => log[n]);
    chart.setData({ data , label: `pid:${logArray[0].pid}` });
  });
  const drawedChart = chart.draw(canvas);
  return drawedChart;
}

function loadAverage1(logData) {
  return loadAverage('la/1min', logData);
}
function loadAverage5(logData) {
  return loadAverage('la/5min', logData);
}
function loadAverage15(logData) {
  return loadAverage('la/15min', logData);
}
export function loadAverages(logData) {
  loadAverage1(logData);
  loadAverage5(logData);
  loadAverage15(logData);
}

export function rss(logData) {
  const { canvas, tag } = createCanvas('rss', 'rss');
  const slider = document.createElement('input');
  const chart = new LineChart();
  const sliderVal = document.createElement('span');
  const maxRss = Math.floor(Math.max.apply(null, logData.map(log => log.rss)) / 1048 / 1048 + 10);
  sliderVal.innerHTML = maxRss;
  slider.setAttribute('type', 'range');
  slider.setAttribute('value', maxRss);
  slider.setAttribute('max', maxRss);
  slider.setAttribute('min', '30');
  slider.addEventListener('change', (ev) => {
    const v = Number(ev.target.value);
    chart.setMaxValue(v);
    chart.update();
    sliderVal.innerHTML = v;
  });
  
  tag.appendChild(slider);
  tag.appendChild(sliderVal);
  const oneBlock = groupPid(logData)[0];
  chart.setLabels(oneBlock.map(() => ''));
  chart.setScale({
    yAxes: [{
      ticks: {
        min: 30,
        max: maxRss
      }
    }]
  });
  groupPid(logData).forEach(logArray => {
    const rss = logArray.map(log => log.rss / 1048 / 1048);
    chart.setData({ data: rss, label: `pid:${logArray[0].pid}` });
  });
  const drawedChart = chart.draw(canvas);
  return drawedChart;
}

function createCanvas(tagName, canvasName) {
  const canvas = document.createElement("canvas");
  const title = document.createElement('h1');
  title.innerHTML = canvasName || 'noName';
  const tag = document.getElementById(tagName);
  tag.appendChild(title);
  tag.appendChild(canvas);
  return { canvas, tag }
}

function groupPid(logData) {
  const pids = logData.map(i => i.pid).filter((x, i, self) => self.indexOf(x) === i);
  return pids.map(pid => logData.filter(log => log.pid === pid));
}