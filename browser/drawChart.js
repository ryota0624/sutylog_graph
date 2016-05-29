import LineChart from './lineChart';
export function processMemory(logData) {
  const { canvas, tag } = createCanvas('hashmemory', 'hashedHeap');
  const chart = new LineChart();
  chart.setLabels(logData.map((log, key) => ''));
  function processMemoryDiv(log) {
    return Number(log.processMemoryCur) / Number(log.processMemoryMax);
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

export function rss(logData) {
  const { canvas, tag } = createCanvas('rss', 'rss');
  const slider = document.createElement('input');
  const chart = new LineChart();
  const sliderVal = document.createElement('span');
  sliderVal.innerHTML = 100;
  slider.setAttribute('type', 'range');
  slider.setAttribute('value', '100');
  slider.setAttribute('max', '300');
  slider.setAttribute('min', '30');
  slider.addEventListener('change', (ev) => {
    const v = Number(ev.target.value);
    chart.setMaxValue(v);
    chart.update();
    sliderVal.innerHTML = v;
  });
  
  tag.appendChild(slider);
  tag.appendChild(sliderVal);
  
  chart.setLabels(logData.map(() => ''));
  chart.setScale({
    yAxes: [{
      ticks: {
        min: 30,
        max: 70
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