import { faBars, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import BackendService from "../services/BackendService";
import { userActions } from "../utils/Rdx";
import Utils from "../utils/Utils";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.logout = this.logout.bind(this);
  }
  goHome() {
    this.props.history.push("/home");
  }
  goToLogin() {
    this.props.history.push("/login");
  }
  logout() {
    BackendService.logout().finally(() => {
      //Utils.removeUser();
      this.props.dispatch(userActions.logout());
      this.goToLogin();
    });
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <button
          type="button"
          className="btn btn-outline-secondary mr-2"
          onClick={this.props.toggleSideBar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/home">
            <FontAwesomeIcon icon={faHome} />
            &nbsp;My RPO
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => this.props.history.push("/account")}>
              My account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Text className="ml-auto">
          {this.props.user && this.props.user.name}
        </Navbar.Text>
        {this.props.user && (
          <Nav.Link onClick={this.logout}>
            <FontAwesomeIcon icon={faUser} fixedWidth />
            &nbsp;Logout
          </Nav.Link>
        )}
        {!this.props.user && (
          <Nav.Link as={Link} to="login">
            <FontAwesomeIcon icon={faUser} fixedWidth />
            &nbsp;Login
          </Nav.Link>
        )}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return { user };
}
export default connect(mapStateToProps)(withRouter(NavigationBar));
