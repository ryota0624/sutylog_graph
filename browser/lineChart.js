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

export default LineChart;