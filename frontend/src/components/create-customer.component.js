import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class CreateCustomer extends Component {
  constructor(props) {
    super(props);

    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
    this.onChangeCustomerSurname = this.onChangeCustomerSurname.bind(this);
    this.onChangeCustomerEmail = this.onChangeCustomerEmail.bind(this);
    this.onChangeCustomerCity = this.onChangeCustomerCity.bind(this);
    this.onChangeCustomerDob = this.onChangeCustomerDob.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customer_name: '',
      customer_surname: '',
      customer_email: '',
      customer_city: '',
      customer_dob: '',
      is_submited: false
    }
  }

  onChangeCustomerName(e) {
    this.setState({
      customer_name: e.target.value
    });
  }

  onChangeCustomerSurname(e) {
    this.setState({
      customer_surname: e.target.value
    });
  }

  onChangeCustomerEmail(e) {
    this.setState({
      customer_email: e.target.value
    })
  }

  onChangeCustomerCity(e) {
    this.setState({
      customer_city: e.target.value
    })
  }

  onChangeCustomerDob(e) {
    this.setState({
      customer_dob: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Customer Name: ${this.state.customer_name} ${this.state.customer_surname}`);
    console.log(`Customer Email: ${this.state.customer_email}`);
    console.log(`Customer City: ${this.state.customer_city}`);
    console.log(`Customer DOB: ${this.state.customer_dob}`);

    const newCustomer = {
      customer_name: this.state.customer_name,
      customer_surname: this.state.customer_surname,
      customer_email: this.state.customer_email,
      customer_city: this.state.customer_city,
      customer_dob: this.state.customer_dob
    }

    axios.post('http://localhost:4000/customers/add', newCustomer)
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          this.setState({ is_submited: true });
        }
      });

    // this.setState({
    //   customer_name: '',
    //   customer_surname: '',
    //   customer_email: '',
    //   customer_city: '',
    //   customer_dob: ''
    // })

  }

  render() {
    if (this.state.is_submited) {
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      return (
        <div className="m-auto" style={{ width: "60%"}}>
          <h3 className="text-center">Create New Customer</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group m-3">
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Name: </label>
                  <input  type="text"
                          className="form-control"
                          value={this.state.customer_name}
                          onChange={this.onChangeCustomerName}
                          />
                </div>
                <div className="form-group col-md-6">
                  <label>Surname: </label>
                  <input  type="text"
                          className="form-control"
                          value={this.state.customer_surname}
                          onChange={this.onChangeCustomerSurname}
                          />
                </div>
              </div>
            </div>
            <div className="form-group m-3">
              <label>Email: </label>
              <input  type="text"
                      className="form-control"
                      value={this.state.customer_email}
                      onChange={this.onChangeCustomerEmail}
                      />
            </div>
            <div className="form-group m-3">
              <label>City: </label>
              <input  type="text"
                      className="form-control"
                      value={this.state.customer_city}
                      onChange={this.onChangeCustomerCity}
                      />
            </div>
            <div className="form-group m-3">
              <label>Date of birth: </label>
              <input  type="date"
                      className="form-control"
                      value={this.state.customer_dob}
                      onChange={this.onChangeCustomerDob}
                      />
            </div>
            <div className="form-group m-3 text-center">
              <input type="submit" value="Create Customer" className="btn text-light" style={{ backgroundColor: "#6A0098" }}/>
            </div>
          </form>
        </div>
      )
    }
  }
}