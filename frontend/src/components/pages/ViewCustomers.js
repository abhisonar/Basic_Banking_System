import config from '../../config'
import React, { Component } from 'react';
import { Table,Button } from "reactstrap";
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./ViewCustomers.css";
import "bootstrap/dist/css/bootstrap.css";
// import ViewCust from "./ViewCust"
import ModalView from '../ModalView';


export class ViewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cust_data: [],
      isShow:false,
    };
  }
  show = () => {
    this.setState({
      isShow: true
    })
  }
  hideClose = () => {
    this.setState({
      isShow: false
    })
  }
  componentDidMount() {
    //get request
    axios.get(`${config.apiUrl}/get_cust_data.php`).then(
      (res) => {
        this.setState({ cust_data: res.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-md-10">
            <h2 className="text-center">All Customer List</h2>
          </div>
          <div className="col-md-2">
            <ModalView show={this.state.isShow} hideClose={this.hideClose} sender_data = {this.state.cust_data} />
            <Button className="btn btn-warning" onClick={this.show}>
              <i className="fas fa-rupee-sign"></i> Quick Transfer
            </Button>
          </div>
        </div>
        <hr />
        <Table responsive striped className="container my-5">
          <thead>
            <tr>
              <th>#id</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Current Balance</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cust_data.map((cust) => {
              return (
                <tr key={cust.cust_id}>
                  <td>{cust.cust_id}</td>
                  <td>{cust.cust_name}</td>
                  <td>{cust.cust_email}</td>
                  <td>Rs. {cust.cust_curr_bal}</td>
                  <td>
                    <Link
                      to={{ pathname: `/view_cust/${cust.cust_id}` }}
                      className="btn btn-warning"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewCustomer
