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
  setScale(scale) {
    this.scale = scale;
  }
  setMaxValue(value) {
    this.chart.options.scales.yAxes[0].ticks.max = value;
  }
  update() {
    this.chart.update();
  }
  dist() {
    return {
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        xAxes: [{
          display: false
        }],
        scales: this.scale
      }
    }
  }
  draw(canvas) {
    this.chart = new Chart.Line(canvas, this.dist())
    return this.chart;
  }
}

export default LineChart;