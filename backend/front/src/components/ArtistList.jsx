import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import BackendService from "../services/BackendService";
import Alert from "./Alert";
import PaginationC from "./PaginationC";
class ArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: undefined,
      artists: [],
      selected_artists: [],
      show_alert: false,
      checkedItems: [],
      hidden: false,
      page: 1,
      limit: 2,
      totalCount: 0,
    };
    this.refreshArtist = this.refreshArtist.bind(this);
    this.updateArtistClicked = this.updateArtistClicked.bind(this);
    this.addArtistClicked = this.addArtistClicked.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleGroupCheckChange = this.handleGroupCheckChange.bind(this);
    this.setChecked = this.setChecked.bind(this);
    this.deleteArtistsClicked = this.deleteArtistsClicked.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }
  onPageChange(cp) {
    this.refreshArtists(cp);
  }

  setChecked(v) {
    let checkedCopy = Array(this.state.artists.length).fill(v);
    this.setState({ checkedItems: checkedCopy });
  }
  handleCheckChange(e) {
    const idx = e.target.name;
    const isChecked = e.target.checked;
    let checkedCopy = [...this.state.checkedItems];
    checkedCopy[idx] = isChecked;
    this.setState({ checkedItems: checkedCopy });
  }
  handleGroupCheckChange(e) {
    const isChecked = e.target.checked;
    this.setChecked(isChecked);
  }

  deleteArtistsClicked() {
    let x = [];
    this.state.artists.map((t, idx) => {
      if (this.state.checkedItems[idx]) {
        x.push(t);
      }
      return 0;
    });
    if (x.length > 0) {
      var msg;
      if (x.length > 1) msg = `Are you want to delete ${x.length} artists?`;
      else msg = "Are you want to delete all artists?";
      this.setState({ show_alert: true, selected_artists: x, message: msg });
    }
  }
  onDelete() {
    BackendService.deleteArtists(this.state.selected_artists)
      .then(() => this.refreshArtists(this.state.page))
      .catch(() => {});
  }
  closeAlert() {
    this.setState({ show_alert: false });
  }
  refreshArtist() {
    BackendService.retrieveAllArtists()
      .then((res) => {
        this.setState({ artists: res.data, hidden: false });
      })
      .catch(() => {
        this.setState({ hidden: true });
      })
      .finally(() => this.setChecked(false));
  }
  refreshArtists(cp) {
    BackendService.retrieveAllArtists(cp, this.state.limit)
      .then((res) => {
        this.setState({
          artists: res.data.content,
          totalCount: res.data.totalElements,
          page: cp,
          hidden: false,
        });
      })
      .catch(() => {
        this.setState({ totalCount: 0, hidden: true });
      })
      .finally(() => this.setChecked(false));
  }
  componentDidMount() {
    this.refreshArtists(0);
  }
  updateArtistClicked(id) {
    this.props.history.push(`/artists/${id}`);
  }
  addArtistClicked() {
    this.props.history.push(`/artists/-1`);
  }
  render() {
    if (this.state.hidden) return null;
    return (
      <div className="m-4">
        <div className="row my-2 mr-0">
          <h3>artists</h3>

          <button
            className="btn btn-outLine-secondary ml-auto"
            onClick={this.addArtistClicked}
          >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Add
          </button>
          <button
            className="btn btn-outLine-secondary ml-2"
            onClick={this.deleteArtistsClicked}
          >
            <FontAwesomeIcon icon={faTrash} />
            &nbsp;Delete
          </button>
        </div>
        {this.state.artists?.length > 0 && (
          <PaginationC
            totalRecords={this.state.totalCount}
            pageLimit={this.state.limit}
            pageNeighbours={1}
            onPageChange={this.onPageChange}
          />
        )}
        <div className="row my-2 mr-0">
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>
                  <div className="btn-toolbar pb-1">
                    <div className="btn-group ml-auto">
                      <input
                        type="checkbox"
                        onChange={this.handleGroupCheckChange}
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.artists &&
                this.state.artists.map((artist, index) => (
                  <tr key={artist.id}>
                    <td>{artist.name}</td>
                    <td>
                      <div className="btn-toolbar">
                        <div className="btn-group ml-auto">
                          <button
                            className="btn btn-outLine-secondary btn-sm btn-toolbar"
                            onClick={() => this.updateArtistClicked(artist.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} fixedWidth />
                          </button>
                        </div>
                        <div className="btn-group ml-2 mt-1">
                          <input
                            type="checkbox"
                            name={index}
                            checked={
                              this.state.checkedItems.length > index
                                ? this.state.checkedItems[index]
                                : false
                            }
                            onChange={this.handleCheckChange}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Alert
          title="Delete"
          message={this.state.message}
          ok={this.onDelete}
          close={this.closeAlert}
          modal={this.state.show_alert}
          cancelButton={true}
        />
      </div>
    );
  }
}

export default ArtistList;
