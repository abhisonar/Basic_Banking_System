import config from "../../config";
import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import "./ViewTransactions.css";
import "bootstrap/dist/css/bootstrap.css";

export class ViewTransations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tnx_data: [],
    };
  }

  componentDidMount() {
    //get request
    axios.get(`${config.apiUrl}/get_transactions.php`).then(
      (res) => {
        this.setState({ tnx_data: res.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div className="container">
        <h2 className="text-center my-3">All Transactions Details</h2>
        <hr />
        <Table responsive="sm" striped className="container my-5">
          <thead>
            <tr>
              <th>Tnx id</th>
              <th>Sender Name</th>
              <th>Receiver Email</th>
              <th>Tnx Amount</th>
              <th>Tnx Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tnx_data.map((tnx) => {
              return (
                <tr key={tnx.tnx_id}>
                  <td>{tnx.tnx_id}</td>
                  <td>{tnx.sender_name}</td>
                  <td>{tnx.receiver_name}</td>
                  <td>Rs.{tnx.tnx_amount}</td>
                  <td>{tnx.tnx_timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ViewTransations;
