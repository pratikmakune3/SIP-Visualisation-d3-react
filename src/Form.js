import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount_per_month: 0,
      interest_rate: 0,
      years: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var years = this.state.years;
    var amount = 12*(this.state.amount_per_month);
    var return_amount = amount;
    var rate = this.state.interest_rate;
    var returns_arr = [];

    returns_arr.push(amount + amount*(rate/100));

    for(var i=2;i<=years;i++) {
      return_amount = (amount + return_amount) + (amount + return_amount)*(rate/100);
      returns_arr.push(return_amount);
    }
    console.log(returns_arr);
    this.props.setData_chart(returns_arr);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Monthly Investment Amount (Rs.):
            <input type="text" name='amount_per_month' onChange={this.handleInputChange} />
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;

          <label>
            Investment Period :
            <input type="text" name='years' onChange={this.handleInputChange} />
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;

          <label>
            Expected Annual Returns (%)
            <input type="text" name='interest_rate' onChange={this.handleInputChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
