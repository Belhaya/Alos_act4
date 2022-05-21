import React, { Component } from "react";
import alimentaireDataService from "../services/entrainement.service";

export default class Addentrainement extends Component {
  constructor(props) {
    super(props);
    this.onChangetype_entrainement = this.onChangetype_entrainement.bind(this);
    this.onChangeexercices_populaires = this.onChangeexercices_populaires.bind(this);

    this.saveentrainement= this.savealimentaire.bind(this);
    this.newentrainement= this.newalimentaire.bind(this);

    this.state = {
      id: null,
      type_entrainement: "",
      exercices_populaires: "", 
    
  
    };
  }

  onChangetype_entrainement(e) {
    this.setState({
        type_entrainement: e.target.value
    });
  }

  onChangeexercices_populaires(e) {
    this.setState({
        exercices_populaires: e.target.value
    });
  }
 
  
  
  saveentrainement() {
    var data = {
      type_entrainement: this.state.type_entrainement,
      exercices_populaires: this.state.exercices_populaires,
  
    };

    entrainementDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          type_entrainement: response.data.type_entrainement,
          exercices_populaires: response.data.exercices_populaires,
       

         // submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newentrainement() {
    this.setState({
      id: null,
      type_entrainement: "",
      exercices_populaires: "",
    

    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newentrainement}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="type_entrainement">type entrainement</label>
              <input
                type="text"
                className="form-control"
                id="type_entrainement"
                required
                value={this.state.type_entrainement}
                onChange={this.onChangetype_entrainement}
                name="type_entrainement"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="exercices_populaires">exercices_populaires</label>
              <input
                type="text"
                className="form-control"
                id="exercices_populaires"
                required
                value={this.state.exercices_populaires}
                onChange={this.onChangeexercices_populaires}
                name="exercices_populaires"
              />
            </div>
           

            <button onClick={this.saveentrainement} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
