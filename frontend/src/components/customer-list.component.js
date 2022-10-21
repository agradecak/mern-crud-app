import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const Customer = props => (
  <tr>
    <td>{props.customer.customer_name} {props.customer.customer_surname}</td>
    <td>{props.customer.customer_email}</td>
    <td>{props.customer.customer_city}</td>
    <td>{props.customer.customer_dob}</td>
    <td>
      <Link to={"/details/"+props.customer._id}>Details</Link>
    </td>

  </tr>
)

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {customers: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/customers/')
      .then(res => {
        let data = res.data
        data.forEach(function(cust) {
          if (cust.customer_dob)
            cust.customer_dob = format(parseISO(cust.customer_dob), "dd/MM/yyyy") 
      })
        this.setState({ customers: data })
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  customerList() {
    return this.state.customers.map(function(currentCustomer, i) {
      return <Customer customer={currentCustomer} key={i} />;
    })
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Customer List</h3>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Name and lastname</th>
              <th>E-mail</th>
              <th>City</th>
              <th>Birthdate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.customerList() }
          </tbody>
        </table>
      </div>
    )
  }
}