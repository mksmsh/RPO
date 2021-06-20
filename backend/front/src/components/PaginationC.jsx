import {
  faBackward,
  faCaretLeft,
  faCaretRight,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { connect } from "react-redux";

class PaginationC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLimit: this.props.pageLimit,
      pageNeighbours: this.props.pageNeighbours,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.goToPage(0);
  }

  goToPage = (page) => {
    const { onPageChange = (f) => f } = this.props;
    this.setState({ currentPage: page }, () => onPageChange(page));
  };
  changePageLimit = (value) => {
    const { setPageLimit = (f) => f } = this.props;
    this.setState({ pageLimit: value }, () => setPageLimit(value));
  };
  render() {
    const totalPage = Math.ceil(this.props.totalRecords / this.props.pageLimit);
    return (
      <nav aria-label="Page navigation example ">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => this.goToPage(0)}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
          </li>
          <li className="page-item">
            <button
              disabled={this.state.currentPage === 0}
              className="page-link"
              onClick={() => this.goToPage(this.state.currentPage - 1)}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
          </li>
          <li className="page-item active">
            <button className="page-link">{this.state.currentPage + 1}</button>
          </li>
          <li className="page-item">
            <button
              disabled={this.state.currentPage >= totalPage - 1}
              className="page-link"
              onClick={() => this.goToPage(this.state.currentPage + 1)}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => this.goToPage(totalPage - 1)}
            >
              <FontAwesomeIcon icon={faForward} />
            </button>
          </li>
          &nbsp;
          <DropdownButton
            id="dropdown-basic-button"
            title={this.state.pageLimit + " items/page"}
            variant="secondary"
          >
            {[2, 5, 10].map((item) => (
              <DropdownItem
                onClick={() => {
                  this.changePageLimit(item);
                }}
              >
                {item}
              </DropdownItem>
            ))}
          </DropdownButton>
        </ul>
      </nav>
    );
  }
}

export default connect()(PaginationC);
