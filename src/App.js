import React, { Component } from 'react';
import Form from './Form';
import Chart from './Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart_data: [],
    };
    this.setData_chart = this.setData_chart.bind(this);
  }

  setData_chart(data) {
    this.setState({chart_data: data});
  }

  render() {
    return (
      <div>
        <Form setData_chart={this.setData_chart} />
        <Chart data={this.state.chart_data} />
      </div>
    );
  }
}

export default App;
