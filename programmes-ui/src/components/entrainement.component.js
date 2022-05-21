import React, { Component } from "react";
import alimentaireDataService from "../services/entrainement.service";

export default class entrainement extends Component {
  constructor(props) {
    super(props);
   
    this.onChangetype_entrainement = this.onChangetype_entrainement.bind(this);
    this.onChangeexercices_populaires = this.onChangeexercices_populaires.bind(this);

    
    this.getentrainement = this.getentrainement.bind(this);
    
    this.updateentrainement = this.updateentrainement.bind(this);
    this.deleteentrainement = this.deleteentrainement.bind(this);

    this.state = {
      currententrainement: {
        id: null,
        type_entrainement: "",
        exercices_populaires: "",
       
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getentrainement(this.props.match.params.id);
  }

  onChangetype_regime(e) {
    const type_entrainement = e.target.value;

    this.setState(function(prevState) {
      return {
        currententrainement: {
          ...prevState.currententrainement,
          type_entrainement: type_entrainement
        }
      };
    });
  }

  onChangeexercices_populaires(e) {
    const exercices_populaires = e.target.value;
    
    this.setState(prevState => ({
      currententrainement: {
        ...prevState.currententrainement,
        exercices_populaires: exercices_populaires
      }
    }));
  }
  
  getentrainement(id) {
    entrainementDataService.get(id)
      .then(response => {
        this.setState({
          currententrainement: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateentrainement() {
    entrainementDataService.update(
      this.state.currententrainement.id,
      this.state.currententrainement
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The entrainment was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteentrainement() {    
   entrainementDataService.delete(this.state.currententrainement.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/programmes_entrainements')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currententrainement} = this.state;

    return (
      <div>
        {currententrainement? (
          <div className="edit-form">
            <h4>entrainement</h4>
            <form>
              <div className="form-group">
                <label htmlFor=" type_entrainement">type entrainement</label>
                <input
                  type="text"
                  className="form-control"
                  id=" type_entrainement"
                  value={currententrainement.entrainement}
                  onChange={this.onChangeentrainement}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exercices_populaires">exercices populaires</label>
                <input
                  type="text"
                  className="form-control"
                  id="exercices_populaires"
                  value={currententrainement.exercices_populaires}
                  onChange={this.onChangeexercices_populaires}
                />
              </div>
              
             
            </form>

           

            <button
              className="badge badge-danger mr-5"
              onClick={this.deleteentrainement}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateentrainement}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a entrainement...</p>
          </div>
        )}
      </div>
    );
  }
}
