import axios from 'axios';
import React, { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Link, Redirect } from 'react-router-dom';

export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.onClickDelete = this.onClickDelete.bind(this);

    this.state = {
      customer_name: '',
      customer_surname: '',
      customer_email: '',
      customer_city: '',
      customer_dob: '',
      customer_insurance: '',
      customer_insurance_calculated: false,
      is_deleted: false
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get('http://localhost:4000/customers/'+id)
      .then(response => {
        let date = format(parseISO(response.data.customer_dob), "dd/MM/yyyy")
        this.setState({
          customer_name: response.data.customer_name,
          customer_surname: response.data.customer_surname,
          customer_email: response.data.customer_email,
          customer_city: response.data.customer_city,
          customer_dob: date
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // onClickCalculateInsurance(e) {
  // }

  onClickDelete() {
    let id = this.props.match.params.id;
    axios.delete('http://localhost:4000/customers/delete/'+id)
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
          this.setState({ is_deleted: true });
        }
      })
  }

  render() {
    if (this.state.is_deleted) {
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      return (
        <div className="container" style={{ width: "60%"}}>
          <h3 className="text-center">Customer Details</h3>
          <br/>
          <h4>Name: {this.state.customer_name}</h4>
          <h4>Surname: {this.state.customer_surname}</h4>
          <h4>Email: {this.state.customer_email}</h4>
          <h4>City: {this.state.customer_city}</h4>
          <h4>Birthdate: {this.state.customer_dob}</h4>
          <div className="d-flex">
            <h4>Insurance price:</h4>
              {this.state.customer_insurance_calculated ? (
                <h4>{this.state.customer_insurance}</h4>
              ) : (
                <button onClick={this.onClickCalculateInsurance} className="btn text-light ms-3" style={{ backgroundColor: "#6A0098" }}>
                  Calculate Insurance
                </button>
              )}
          </div>
          <div className="p-0 mt-2">
            <Link to={"/edit/"+this.props.match.params.id}>
              <button className="btn text-light" style={{ backgroundColor: "#6A0098" }}>
                Edit
              </button>
            </Link>
            <button onClick={this.onClickDelete} className="btn text-light ms-5" style={{ backgroundColor: "#6A0098" }}>
              Delete
            </button>
          </div>
        </div>
      )
    }
  }
}