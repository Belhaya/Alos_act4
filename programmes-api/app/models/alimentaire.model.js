module.exports = (sequelize, Sequelize) => {
  const alimentaire = sequelize.define("alimentaire", {
    type_regime: {
      type: Sequelize.STRING
    },
    periode: {
      type: Sequelize.STRING
    },
    pmenu1: {
      type: Sequelize.STRING
    },
    pmenu2: {
      type: Sequelize.STRING
    },
    pmenu3: {
      type: Sequelize.STRING
    },
    pmenu4: {
      type: Sequelize.STRING
    }
  });

  return alimentaire;
};
