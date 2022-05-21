import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addalimentaire from "./components/add-alimentaire.component";
import alimentaire from "./components/alimentaire.component";
import alimentairesList from "./components/alimentaires-list.component";

import Addentrainement from "./components/add-entrainement.component";
import entrainement from "./components/entrainement.component";
import entrainementsList from "./components/entrainements-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            programmes alimentaires
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/programmes_alimentaires"} className="nav-link">
                Alimentaire
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addalimentaire"} className="nav-link">
                Add alimentaire
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/programmes_entrainementss"} className="nav-link">
                Entrainement
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addentrainement"} className="nav-link">
                Add entrainement
              </Link>
            </li>
          </div>
          
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/programmes_alimentaires"]} component={alimentairesList} />
            <Route exact path="/addalimentaire" component={Addalimentaire} />
            <Route path="/programmes_alimentaires/:id" component={alimentaire} />
            <Route exact path={["/", "/programmes_entrainements"]} component={entrainementsList} />
            <Route exact path="/addentrainement" component={Addentrainement} />
            <Route path="/programmes_entrainement/:id" component={entrainement} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
