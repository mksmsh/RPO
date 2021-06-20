import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import BackendService from "../services/BackendService";
import { alertActions } from "../utils/Rdx";
import Utils from "../utils/Utils";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      login: "",
      email: "",
      pwd: "",
      pwd2: "",
      show_pwd: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onSetPasswordClick = this.onSetPasswordClick.bind(this);
  }
  componentDidMount() {
    let uid = Utils.getUser().id;
    BackendService.retrieveUser(uid)
      .then((res) => {
        this.setState({
          id: uid,
          login: res.data.login,
          email: res.data.email,
        });
      })
      .catch(() => {});
  }
  onSetPasswordClick() {
    this.setState({ show_pwd: true, pwd: "" });
  }
  onSubmit(values) {
    let user = {
      id: this.state.id,
      login: values.login,
      email: values.email,
      password: values.pwd,
      np: values.pwd,
    };
    BackendService.updateUser(user)
      .then(() => {
        this.props.history.push("users/");
      })
      .catch(() => {});
  }
  validate(values) {
    let e = null;
    let errors = {};
    if (values.pwd.length > 0) {
      if (values.pwd2.length < 8) e = "Password length should be 8 or greater";
      else if (!values.pwd2) e = "Please repeat password";
      else if (values.pwd !== values.pwd2) e = "Passwords do not match";
    } else if (this.state.show_pwd) e = "Password is required";
    if (e != null) {
      errors.error = "error";
      this.props.dispatch(alertActions.error(e));
    }
    return errors;
  }
  render() {
    let { id, login, email, pwd, pwd2, admin } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row my-2 mr-0">
            <h3>My account</h3>
            <button
              className="btn btn-outline-secondary ml-auto"
              onClick={() => this.props.history.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              &nbsp;Back
            </button>
          </div>
          <Formik
            initialValues={{ id, login, email, pwd, pwd2, admin }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <fieldset className="form-group" disabled>
                  <label>Login</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="login"
                    disabled
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Email</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="email"
                    validate="validateEmail"
                  />
                </fieldset>
                {this.state.show_pwd ? (
                  <>
                    <fieldset className="form-group">
                      <label>Enter new password</label>
                      <Field
                        className="form-control"
                        type="password"
                        name="pwd"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Repeat password</label>
                      <Field
                        className="form-control"
                        type="password"
                        name="pwd2"
                      />
                    </fieldset>
                  </>
                ) : (
                  <fieldset className="form-group">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={this.onSetPasswordClick}
                    >
                      Change Password
                    </button>
                  </fieldset>
                )}
                <button className="btn btn-outline-secondary" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default connect()(Account);
