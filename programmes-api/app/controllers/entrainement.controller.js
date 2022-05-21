const db = require("../models/index2");
const entrainement = db.entrainement;
const Op = db.Sequelize.Op;

// Create and Save a new alimentaire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type_entrainement) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a alimentaire
  const entrainement = {
    type_entrainement: req.body.type_entrainement,
    exercices_populaires: req.body.exercices_populaires,
   
  };

  // Save alimentaire in the database
  entrainement.create(entrainement)
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
  const type_entrainement = req.query.type_entrainement;
  var condition = type_entrainement ? { type_entrainement: { [Op.type_entrainement]: `%${type_entrainement}%` } } : null;

  alimentaire.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving entrainement."
      });
    });
};

// Find a single alimentaire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  entrainement.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving entrainement with id=" + id
      });
    });
};

// Update a alimentaire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  entrainement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "entrainement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update entrainement with id=${id}. Maybe entrainement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating entrainement with id=" + id
      });
    });
};

// Delete a alimentaire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  entrainement.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "entrainement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete entrainement with id=${id}. Maybe alimentaire was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete entrainement with id=" + id
      });
    });
};

// Delete all alimentaires from the database.
exports.deleteAll = (req, res) => {
    entrainement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} entrainement were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all entrainements."
      });
    });
};

