import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import BackendService from "../services/BackendService";
import { alertActions } from "../utils/Rdx";

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
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
    if (!this.state.name) {
      err = "Name of country is required";
    }
    if (err) {
      this.props.dispatch(alertActions.error(err));
    }
    let country = { id: this.state.id, name: this.state.name };
    if (parseInt(country.id) === -1) {
      BackendService.createCountry(country)
        .then(() => this.props.history.push("/countries"))
        .catch(() => {});
    } else {
      BackendService.updateCountry(country)
        .then(() => this.props.history.push("/countries"))
        .catch(() => {});
    }
  }
  componentDidMount() {
    if (parseInt(this.state.id) !== -1) {
      BackendService.retrieveCountry(this.state.id)
        .then((res) => {
          this.setState({ name: res.data.name });
        })
        .catch(() => this.setState({ hidden: true }));
    }
  }
  render() {
    if (this.state.hidden) return null;
    return (
      <div className="m-4">
        <div className="row my-2 mr-0">
          <h3>Country</h3>
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country name"
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
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

export default connect()(Country);
