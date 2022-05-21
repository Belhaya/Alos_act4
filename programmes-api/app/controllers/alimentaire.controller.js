const db = require("../models/index1");
const alimentaire = db.alimentaire;
const Op = db.Sequelize.Op;

// Create and Save a new alimentaire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_regime) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a alimentaire
  const alimentaire = {
    type_regime: req.body.type_regime,
    periode: req.body.periode,
    menu1: req.body.menu1,
    menu2: req.body.menu2,
    menu3: req.body.menu3,
    menu4: req.body.menu4
  };

  // Save alimentaire in the database
  alimentaire.create(alimentaire)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the alimentaire."
      });
    });
};

// Retrieve all alimentaires from the database.
exports.findAll = (req, res) => {
  const type_regime = req.query.type_regime;
  var condition = type_regime ? { type_regime: { [Op.type_regime]: `%${type_regime}%` } } : null;

  alimentaire.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving alimentaires."
      });
    });
};

// Find a single alimentaire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  alimentaire.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving alimentaire with id=" + id
      });
    });
};

// Update a alimentaire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  alimentaire.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "alimentaire was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update alimentaire with id=${id}. Maybe alimentaire was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating alimentaire with id=" + id
      });
    });
};

// Delete a alimentaire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  alimentaire.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "alimentaire was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete alimentaire with id=${id}. Maybe alimentaire was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete alimentaire with id=" + id
      });
    });
};

// Delete all alimentaires from the database.
exports.deleteAll = (req, res) => {
  alimentaire.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} alimentaires were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all alimentaires."
      });
    });
};

