import React, { Component } from "react";
import alimentaireDataService from "../services/alimentaire.service";
import { Link } from "react-router-dom";

export default class alimentairesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchtype_regime = this.onChangeSearchtype_regime.bind(this);
    this.retrievealimentaires = this.retrievealimentaires.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivealimentaire = this.setActivealimentaire.bind(this);
    this.removeAllalimentaires = this.removeAllalimentaires.bind(this);
    this.searchtype_regime = this.searchtype_regime.bind(this);

    this.state = {
      alimentaires: [],
      currentalimentaire: null,
      currentIndex: -1,
      searchtype_regime: ""
    };
  }

  componentDidMount() {
    this.retrievealimentaires();
  }

  onChangeSearchtype_regime(e) {
    const searchtype_regime = e.target.value;

    this.setState({
      searchtype_regime: searchtype_regime
    });
  }

  retrievealimentaires() {
    alimentaireDataService.getAll()
      .then(response => {
        this.setState({
          alimentaires: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievealimentaires();
    this.setState({
      currentalimentaire: null,
      currentIndex: -1
    });
  }

  setActivealimentaire(alimentaire, index) {
    this.setState({
      currentalimentaire: alimentaire,
      currentIndex: index
    });
  }

  removeAllalimentaires() {
    alimentaireDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchtype_regime() {
    this.setState({
      currentalimentaire: null,
      currentIndex: -1
    });

    alimentaireDataService.findBytype_regime(this.state.searchtype_regime)
      .then(response => {
        this.setState({
          alimentaires: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchtype_regime, alimentaires, currentalimentaire, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by type regime"
              value={searchtype_regime}
              onChange={this.onChangeSearchtype_regime}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchtype_regime}
              >
                Searche
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>alimentaires List</h4>

          <ul className="list-group">
            {alimentaires &&
              alimentaires.map((alimentaire, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivealimentaire(alimentaire, index)}
                  key={index}
                >
                  {alimentaire.type_regime}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllalimentaires}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentalimentaire ? (
            <div>
              <h4>alimentaire</h4>
              <div>
                <label>
                  <strong>type regime:</strong>
                </label>{" "}
                {currentalimentaire.type_regime}
              </div>
              <div>
                <label>
                  <strong>periode:</strong>
                </label>{" "}
                {currentalimentaire.periode}
              </div>
            

              <Link
                to={"/programmes_alimentaires/" + currentalimentaire.id}
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
