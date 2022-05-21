import React, { Component } from "react";
import alimentaireDataService from "../services/entrainement.service";
import { Link } from "react-router-dom";

export default class entrainementsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchtype_entrainement = this.onChangeSearchtype_entrainement.bind(this);
    this.retrieveentrainements = this.retrieveentrainements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveentrainement = this.setActiveentrainement.bind(this);
    this.removeAllentrainements = this.removeAllentrainements.bind(this);
    this.searchtype_entrainement = this.searchtype_entrainement.bind(this);

    this.state = {
        entrainements: [],
      currententrainemente: null,
      currentIndex: -1,
      searchtype_entrainement: ""
    };
  }

  componentDidMount() {
    this.retrieveentrainements();
  }

  onChangeSearchtype_entrainement(e) {
    const searchtype_entrainement = e.target.value;

    this.setState({
      searchtype_entrainement: searchtype_entrainement
    });
  }

  retrieveentrainements() {
    entrainementDataService.getAll()
      .then(response => {
        this.setState({
            entrainements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveentrainements();
    this.setState({
      currententrainement: null,
      currentIndex: -1
    });
  }

  setActiveentrainement(entrainement, index) {
    this.setState({
      currententrainement: entrainement,
      currentIndex: index
    });
  }

  removeAllentrainements() {
    entrainementDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchtype_entrainement() {
    this.setState({
      currententrainement: null,
      currentIndex: -1
    });

    entrainementDataService.findByentrainement(this.state.searchtype_entrainement)
      .then(response => {
        this.setState({
            entrainements: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchtype_entrainement, entrainements, currententrainement, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by type entrainement"
              value={searchtype_entrainement}
              onChange={this.onChangeSearchtype_entrainement}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchtype_entrainement}
              >
                Searche
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>entrainements List</h4>

          <ul className="list-group">
            {entrainements &&
              entrainements.map((entrainement, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveentrainement(entrainement, index)}
                  key={index}
                >
                  {entrainement.type_entrainement}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllentrainements}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currententrainement ? (
            <div>
              <h4>entrainement</h4>
              <div>
                <label>
                  <strong>type entrainement:</strong>
                </label>{" "}
                {currententrainement.type_entrainement}
              </div>
              <div>
                <label>
                  <strong>exercices_populaires:</strong>
                </label>{" "}
                {currententrainement.exercices_populaires}
              </div>
            

              <Link
                to={"/programmes_entrainements/" + currententrainement.id}
                className="badge badge-warning"
              >
                
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a alimentaire...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
