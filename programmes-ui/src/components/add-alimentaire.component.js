import React, { Component } from "react";
import alimentaireDataService from "../services/alimentaire.service";

export default class Addalimentaire extends Component {
  constructor(props) {
    super(props);
    this.onChangetype_regime = this.onChangetype_regime.bind(this);
    this.onChangeperiode = this.onChangeperiode.bind(this);
    this.onChangemenu1 = this.onChangemenu1.bind(this);
    this.onChangemenu2 = this.onChangemenu2.bind(this);
    this.onChangemenu3 = this.onChangemenu3.bind(this);
    this.onChangemenu4 = this.onChangemenu4.bind(this);
    this.savealimentaire = this.savealimentaire.bind(this);
    this.newalimentaire = this.newalimentaire.bind(this);

    this.state = {
      id: null,
      type_regime: "",
      periode: "", 
      menu1: "",
      menu2: "",
      menu3: "",
      menu4: "",
  
    };
  }

  onChangetype_regime(e) {
    this.setState({
      type_regime: e.target.value
    });
  }

  onChangeperiode(e) {
    this.setState({
      periode: e.target.value
    });
  }
  onChangemenu1(e) {
    this.setState({
      menu1: e.target.value
    });
  }
  onChangemenu2(e) {
    this.setState({
      menu2: e.target.value
    });
  }
  onChangemenu3(e) {
    this.setState({
      menu3: e.target.value
    });
  }
  onChangemenu4(e) {
    this.setState({
      menu4: e.target.value
    });
  }
  
  
  savealimentaire() {
    var data = {
      type_regime: this.state.type_regime,
      periode: this.state.periode,
      menu1:this.state.menu1,
      menu2:this.state.menu2,
      menu3:this.state.menu3,
      menu4:this.state.menu4,
    };

    alimentaireDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          type_regime: response.data.type_regime,
          periode: response.data.periode,
          menu1: response.data.menu1,
          menu2: response.data.menu2,
          menu3: response.data.menu3,
          menu4: response.data.menu4,

         // submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newalimentaire() {
    this.setState({
      id: null,
      type_regime: "",
      periode: "",
      menu1: "",
      menu2: "",
      menu3: "",
      menu4: "",

    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newalimentaire}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="type_regime">type regime</label>
              <input
                type="text"
                className="form-control"
                id="type_regime"
                required
                value={this.state.type_regime}
                onChange={this.onChangetype_regime}
                name="type_regime"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="periode">periode</label>
              <input
                type="text"
                className="form-control"
                id="periode"
                required
                value={this.state.periode}
                onChange={this.onChangeperiode}
                name="periode"
              />
            </div>
            <div className="form-group">
              <label htmlFor="menu1">menu1</label>
              <input
                type="text"
                className="form-control"
                id="menu1"
                required
                value={this.state.menu1}
                onChange={this.onChangemenu1}
                name="menu1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menu2">menu2</label>
              <input
                type="text"
                className="form-control"
                id="menu2"
                required
                value={this.state.menu2}
                onChange={this.onChangemenu2}
                name="menu2"
              />
            </div>
            <div className="form-group">
              <label htmlFor="menu3">menu3</label>
              <input
                type="text"
                className="form-control"
                id="menu3"
                required
                value={this.state.menu3}
                onChange={this.onChangemenu3}
                name="menu3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="menu4">menu4</label>
              <input
                type="text"
                className="form-control"
                id="menu4"
                required
                value={this.state.menu4}
                onChange={this.onChangemenu4}
                name="menu4"
              />
            </div>

            <button onClick={this.savealimentaire} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
