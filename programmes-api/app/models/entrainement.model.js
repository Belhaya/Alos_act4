module.exports = (sequelize, Sequelize) => {
    const alimentaire = sequelize.define("entrainement", {
      type_entrainement: {
        type: Sequelize.STRING
      },
      exercices_populaires: {
        type: Sequelize.STRING
      },
     
    });
  
    return entrainement;
  };
  