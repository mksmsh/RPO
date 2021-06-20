import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import BackendService from "../services/BackendService";
import { alertActions } from "../utils/Rdx";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      login: "",
      hidden: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    let err = null;
    if (!this.state.login) {
      err = "login of user is required";
    }
    if (err) {
      this.props.dispatch(alertActions.error(err));
    }
    let user = { id: this.state.id, login: this.state.login };
    if (parseInt(user.id) === -1) {
      BackendService.createuser(user)
        .then(() => this.props.history.push("/users"))
        .catch(() => {});
    } else {
      BackendService.updateuser(user)
        .then(() => this.props.history.push("/users"))
        .catch(() => {});
    }
  }
  componentDidMount() {
    if (parseInt(this.state.id) !== -1) {
      BackendService.retrieveUser(this.state.id)
        .then((res) => {
          this.setState({ login: res.data.login });
        })
        .catch(() => this.setState({ hidden: true }));
    }
  }
  render() {
    if (this.state.hidden) return null;
    return (
      <div className="m-4">
        <div className="row my-2 mr-0">
          <h3>user</h3>
          <button
            className="btn btn-outline-secondary ml-auto"
            onClick={() => this.props.history.goBack()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            &nbsp;Back
          </button>
        </div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user login"
              onChange={this.handleChange}
              value={this.state.login}
              login="login"
              autoComplete="off"
            />
          </Form.Group>
          <button className="btn btn-outline-secondary" type="submit">
            <FontAwesomeIcon icon={faSave} />
            &nbsp;Save
          </button>
        </Form>
      </div>
    );
  }
}

export default connect()(User);
