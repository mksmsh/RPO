import {
  faBuilding,
  faFileImage,
  faGlobe,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        {this.props.expanded && (
          <Nav className={"flex-column my-sidebar my-sidebar-expanded"}>
            <Nav.Item>
              <Nav.Link as={Link} to="/countries">
                <FontAwesomeIcon icon={faGlobe} />
                &nbsp;Countries
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/artists">
                <FontAwesomeIcon icon={faUserTie} />
                &nbsp;Artists
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/museums">
                <FontAwesomeIcon icon={faBuilding} />
                &nbsp;Museums
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/paintings">
                <FontAwesomeIcon icon={faFileImage} />
                &nbsp;Paintings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/users">
                <FontAwesomeIcon icon={faUser} />
                &nbsp;Users
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        {!this.props.expanded && (
          <Nav className={"flex-column my-sidebar my-sidebar-collapsed"}>
            <Nav.Item>
              <Nav.Link as={Link} to="/countries">
                <FontAwesomeIcon icon={faGlobe} size="2x" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/artists">
                <FontAwesomeIcon icon={faUserTie} size="2x" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/museums">
                <FontAwesomeIcon icon={faBuilding} size="2x" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/paintings">
                <FontAwesomeIcon icon={faFileImage} size="2x" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/users">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </>
    );
  }
}

export default SideBar;
