import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import CustomerList from './components/customer-list.component';
import CustomerDetails from './components/customer-details.component';
import CreateCustomer from './components/create-customer.component';
import EditCustomer from './components/edit-customer.component';

import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light rounded" style={{ backgroundColor: "#6A0098" }}>
            <a className="navbar-brand ms-3" href="https://kompare.hr/">
              <img src={logo} width="auto" height="20" alt="kompare.hr"/>
            </a>
            <Link to="/" className="navbar-brand text-light">Customer app</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link text-light">Customers</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link text-light">Create Customer</Link>
                </li>
              </ul>
            </div>
          </nav>

          <br/>

          <Route path="/" exact component={CustomerList} />
          <Route path="/details/:id" component={CustomerDetails} />
          <Route path="/create" component={CreateCustomer} />
          <Route path="/edit/:id" component={EditCustomer} />
        </div>
      </Router>
    );
  }
}

export default App;
