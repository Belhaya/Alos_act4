import React, { Component } from "react";
import alimentaireDataService from "../services/alimentaire.service";

export default class alimentaire extends Component {
  constructor(props) {
    super(props);
   
    this.onChangetype_regime = this.onChangetype_regime.bind(this);
    this.onChangeperiode = this.onChangeperiode.bind(this);
    this.onChangemenu1 = this.onChangemenu1.bind(this);
    this.onChangemenu2 = this.onChangemenu2.bind(this);
    this.onChangemenu3 = this.onChangemenu3.bind(this);
    this.onChangemenu4 = this.onChangemenu4.bind(this);
    
    this.getalimentaire = this.getalimentaire.bind(this);
    
    this.updatealimentaire = this.updatealimentaire.bind(this);
    this.deletealimentaire = this.deletealimentaire.bind(this);

    this.state = {
      currentalimentaire: {
        id: null,
        type_regime: "",
        periode: "", 
        menu1: "",
        menu2: "",
        menu3: "",
        menu4: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getalimentaire(this.props.match.params.id);
  }

  onChangetype_regime(e) {
    const type_regime = e.target.value;

    this.setState(function(prevState) {
      return {
        currentalimentaire: {
          ...prevState.currentalimentaire,
          type_regime: type_regime
        }
      };
    });
  }

  onChangeperiode(e) {
    const periode = e.target.value;
    
    this.setState(prevState => ({
      currentalimentaire: {
        ...prevState.currentalimentaire,
        periode: periode
      }
    }));
  }
  onChangemenu1(e) {
    const menu1 = e.target.value;
    
    this.setState(prevState => ({
      currentalimentaire: {
        ...prevState.currentalimentaire,
        menu1: menu1
      }
    }));
  }
  onChangemenu2(e) {
    const menu2 = e.target.value;
    
    this.setState(prevState => ({
      currentalimentaire: {
        ...prevState.currentalimentaire,
        menu2: menu2
      }
    }));
  }
  onChangemenu3(e) {
    const menu3 = e.target.value;
    
    this.setState(prevState => ({
      currentalimentaire: {
        ...prevState.currentalimentaire,
        menu3: menu3
      }
    }));
  }
  onChangemenu4(e) {
    const menu4 = e.target.value;
    
    this.setState(prevState => ({
      currentalimentaire: {
        ...prevState.currentalimentaire,
        menu4: menu4
      }
    }));
  }


  getalimentaire(id) {
    alimentaireDataService.get(id)
      .then(response => {
        this.setState({
          currentalimentaire: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentalimentaire.id,
      type_regime: this.state.currentalimentaire.type_regime,
      periode: this.state.currentalimentaire.periode,
      menu1:this.state.currentalimentaire.menu1,
      menu2:this.state.currentalimentaire.menu2,
      menu3:this.state.currentalimentaire.menu3,
      menu4:this.state.currentalimentaire.menu4,
      
    };

    alimentaireDataService.update(this.state.currentalimentaire.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentalimentaire: {
            ...prevState.currentalimentaire,
            
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatealimentaire() {
    alimentaireDataService.update(
      this.state.currentalimentaire.id,
      this.state.currentalimentaire
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The alimentaire was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletealimentaire() {    
    alimentaireDataService.delete(this.state.currentalimentaire.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/programmes_alimentaires')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentalimentaire } = this.state;

    return (
      <div>
        {currentalimentaire ? (
          <div className="edit-form">
            <h4>alimentaire</h4>
            <form>
              <div className="form-group">
                <label htmlFor=" type_regime">type regime</label>
                <input
                  type="text"
                  className="form-control"
                  id=" type_regime"
                  value={currentalimentaire.type_regime}
                  onChange={this.onChangetype_regime}
                />
              </div>
              <div className="form-group">
                <label htmlFor="periode">periode</label>
                <input
                  type="text"
                  className="form-control"
                  id="periode"
                  value={currentalimentaire.periode}
                  onChange={this.onChangeperiode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu1">menu1</label>
                <input
                  type="text"
                  className="form-control"
                  id="menu1"
                  value={currentalimentaire.menu1}
                  onChange={this.onChangemenu1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu2">menu2</label>
                <input
                  type="text"
                  className="form-control"
                  id="menu2"
                  value={currentalimentaire.menu2}
                  onChange={this.onChangemenu2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu3">menu3</label>
                <input
                  type="text"
                  className="form-control"
                  id="menu3"
                  value={currentalimentaire.menu3}
                  onChange={this.onChangemenu3}
                />
              </div>
              <div className="form-group">
                <label htmlFor="menu4">menu4</label>
                <input
                  type="text"
                  className="form-control"
                  id="menu4"
                  value={currentalimentaire.menu4}
                  onChange={this.onChangemenu4}
                />
              </div>

             
            </form>

           

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletealimentaire}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatealimentaire}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a alimentaire...</p>
          </div>
        )}
      </div>
    );
  }
}
