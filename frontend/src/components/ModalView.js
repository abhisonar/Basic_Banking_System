import React, { Component } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import config from "../config"

export class ModalView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender_data: [],
      receiver_data: [],
      transaction: {
        sender: "",
        receiver: "",
        amount: "",
      },
      success: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { sender_data: props.sender_data };
  }

  handleSender = (event) => {
    this.setState((prevState) => ({
      transaction: {
        ...prevState.transaction,
        sender: event.target.value,
      },
    }));
    axios
      .get(`${config.apiUrl}/select_cust.php?cust_id=${event.target.value}`)
      .then(
        (res) => {
          this.setState({ receiver_data: res.data });
          // console.log(this.state.receiver_data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
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
  handleReload = () => {
    this.setState({ isShow: false });
    window.location.reload();
  };
  transferMoney = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${config.apiUrl}/transferMoney.php`,
      headers: { "content-type": "application/json" },
      data: this.state.transaction,
    })
      .then((out) => {
        this.setState({ success: out.data });
      })
      .catch((er) => {
        this.setState({ error: er.message });
      });
  };
  render() {
    const isShow = this.props.show;
    const isHide = this.props.hideClose;
    return (
      <div>
        {/* Modal Code */}
        <Modal show={isShow} onHide={isHide}>
          <Modal.Header>
            <Modal.Title>Transfer Money</Modal.Title>
            <button
              type="button"
              class="btn-close"
              onClick={isHide}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Sender</Form.Label>
                <Form.Control
                  as="select"
                  name="sender"
                  onChange={this.handleSender.bind(this)}
                >
                  <option>--Select Sender--</option>
                  {this.state.sender_data.map((sd) => {
                    return (
                      <option key={sd.cust_id} value={sd.cust_id}>
                        {sd.cust_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Receiver</Form.Label>
                <Form.Control
                  as="select"
                  name="receiver"
                  onChange={this.handleReceiver.bind(this)}
                >
                  <option>--Select Receiver--</option>
                  {this.state.receiver_data.map((rd) => {
                    return (
                      <option key={rd.cust_id} value={rd.cust_id}>
                        {rd.cust_name}
                      </option>
                    );
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
                <Button variant="danger" onClick={isHide}>
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

export default ModalView;
