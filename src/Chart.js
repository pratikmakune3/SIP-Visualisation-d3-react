import React, { Component } from 'react';
import * as d3 from 'd3';

class Chart extends Component {

  componentDidMount() {
    d3.select(this.node).append('svg').attr('height', 400).attr('width', 600);
    var svg = d3.select(this.node).select('svg');

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(100, 50)');
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(100, 250)');
  }

  componentDidUpdate() {
    this.renderChart(this.props.data);
  }

  renderChart(data) {

    var dataArray = data;

    console.log('dataArray length ',dataArray.length);

    var dataArray_min = d3.min(dataArray);
    var dataArray_max = d3.max(dataArray);

    var width = 440;

    var scaleHeight = d3.scaleLinear()
      .domain([dataArray_min, dataArray_max])
      .range([1, 200]);

    var scaleWidth = d3.scaleBand()
      .domain(dataArray.map(function (d, i) { return i; }))
      .rangeRound([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.5);

    var yAxisScale = d3.scaleLinear()
      .domain([dataArray_min, dataArray_max])
      .range([200, 0]);

    var xAxisScale = d3.scaleLinear()
      .domain([0, dataArray.length])
      .range([0, width]);

    var yAxis = d3.axisLeft(yAxisScale);
    var xAxis = d3.axisBottom(xAxisScale).ticks(dataArray.length);

    const svg = d3.select(this.node).select('svg');

    svg.select('.y-axis').call(yAxis);
    svg.select('.x-axis').call(xAxis);

    const rects = svg.selectAll('rect')
      .data(dataArray, function(d, i) { return `rect1-${i}`; });

    rects.exit().remove();

    rects.enter()
      .append('rect')
        .attr('class', 'chart_rect')
      .merge(rects)
        .attr('x', function(d, i) { return scaleWidth(i)+100; })
        .attr('y', function(d) { return (250-scaleHeight(d)) })
        .attr('height', function(d) { return scaleHeight(d); })
        .attr('width', function () { return scaleWidth.bandwidth(); });
  }

  render() {
    return (
      <div ref={node => this.node = node} className={this.props.uid}></div>
    );
  }
}

export default Chart;
