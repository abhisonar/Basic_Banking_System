import React, { Component } from "react";
import axios from "axios";
import config from "../../config";
import { Card, Button,Modal, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./ViewCust.css"

export class ViewCust extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cust_id: this.props.match.params.cust_id,
      data: [],
      receiver_data: [],
      isShow: false,
      transaction: {
        sender: this.props.match.params.cust_id,
        receiver: "",
        amount: "",
      },
      success: false,
      error: null,
    };
  }
  handleReceiver = (event) => {
    this.setState((prevState) => ({
      transaction: {
        ...prevState.transaction,
        receiver: event.target.value,
      },
    }));
  };

  handleAmount = (event) => {
    this.setState((prevState) => ({
      transaction: {
        ...prevState.transaction,
        amount: event.target.value,
      },
    }));
  };
  handleClose = () => {
    this.setState({ isShow: false });
  };
  handleReload = () => {
    this.setState({ isShow: false });
    window.location.reload()
  }
  show = () => {
    this.setState({ isShow: true });
    axios
      .get(`${config.apiUrl}/select_cust.php?cust_id=${this.state.cust_id}`)
      .then(
        (res) => {
          this.setState({ receiver_data: res.data });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  transferMoney = (e) => {
    console.log(this.state);
    e.preventDefault()
    axios({
      method: "post",
      url: `${config.apiUrl}/transferMoney.php`,
      headers: { "content-type": "application/json" },
      data: this.state.transaction,
    })
      .then((out) => {
        this.setState({ success: out.data });
        console.log(out.data);
      })
      .catch((er) => {
        this.setState({ error: er.message });
      });
  };
  componentDidMount() {
    axios
      .get(`${config.apiUrl}/get_cust.php?cust_id=${this.state.cust_id}`)
      .then(
        (res) => {
          this.setState({ data: res.data });
        },
        (error) => {
          console.log(error);
        }
      );
    // this.show()
  }
  render() {
    return (
      <div className="container my-4">
        <Card>
          <Card.Header>Customer Detail</Card.Header>
          <Card.Body>
            <Card.Text key={this.state.data.cust_id}>
              <div className="row">
                <div className="col-sm-4">Customer ID:</div>
                <div className="col-sm-8">{this.state.data.cust_id}</div>
              </div>
              <div className="row">
                <div className="col-sm-4">Name:</div>
                <div className="col-sm-8">{this.state.data.cust_name}</div>
              </div>
              <div className="row">
                <div className="col-sm-4">Email:</div>
                <div className="col-sm-8">{this.state.data.cust_email}</div>
              </div>
              <div className="row">
                <div className="col-sm-4">Current Balance:</div>
                <div className="col-sm-8">
                  Rs. {this.state.data.cust_curr_bal}
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="outline-warning mx-3" onClick={this.show}>
              Transfer Money
            </Button>
            <Button variant="outline-warning mx-3">Back</Button>
          </Card.Footer>
        </Card>

        {/* Modal Code */}
        <Modal show={this.state.isShow} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Transfer Money</Modal.Title>
            <button type="button" class="btn-close" onClick={this.handleClose}></button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Sender</Form.Label>
                <Form.Control as="select" name="sender" disabled>
                  <option value={this.state.data.cust_id}>
                    {this.state.data.cust_name}
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Sender Current Balance</Form.Label>
                <Form.Control as="select" name="sender" disabled>
                  <option>{this.state.data.cust_curr_bal}</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Receiver</Form.Label>
                <Form.Control
                  as="select"
                  name="receiver"
                  onChange={this.handleReceiver.bind(this)}
                >
                  <option value>--Select Receiver--</option>
                  {this.state.receiver_data.map((rd) => {
                    return <option value={rd.cust_id}>{rd.cust_name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="amount">
                <Form.Label>Transfer Amount</Form.Label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter Amount"
                  className="form-control"
                  onChange={this.handleAmount.bind(this)}
                  required
                />
              </Form.Group>
            </Form>
            {this.state.success ? (
              <>
                <Alert variant="success">
                  <p>Transaction Successfull.</p>
                  <p>Transaction details recorded successfully. </p>
                </Alert>
              </>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            {!this.state.success ? (
              <>
                <Button variant="danger" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="warning" onClick={this.transferMoney}>
                  Tranfer Money
                </Button>
              </>
            ) : (
              <Button variant="warning" onClick={this.handleReload}>
                OK
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ViewCust;
