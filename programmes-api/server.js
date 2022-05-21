require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
//const { body, validationResult } = require('express-validator');
const totoro =require('totoro-node')
const alimentaires = require("./app/controllers/alimentaire.controller.js");
const entrainements = require("./app/controllers/entrainement.controller.js");


const app = express();
//const db1 = require("./app/models/index1");
//const db2 = require("./app/models/index2");
//const alimentaire = db1.alimentaire;
//const Op = db1.Sequelize.Op;
//const entrainement = dbé.entrainement;
//const Opp = db2.Sequelize.Op;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const d = require("./app/models/index1");
const dd = require("./app/models/index2");

d.sequelize.sync();

dd.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to programmes application." });
});


app.use('/',totoro.rain({
  // defition de version 
  v1:{
      // pramater optimale par defaut 
      active: true,
      deprecated: false,

      endpoints: [
          {
            route: "/programmes_alimentaires",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation:alimentaires.findAll

            
          },
          {
            route: "/programmes_alimentaires/:id",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: alimentaires.findOne

          },{

            route: "/programmes_alimentaires/:id",
            method: "PUT",
            active: true, 
            deprecated: false, 
            implementation:alimentaires.update
          },
        {
          route: "/programmes_alimentaires/:id",
          method: "DELETE",
          active: true, 
          deprecated: false, 
          implementation: alimentaires.delete
        },{



          route: "/programmes_alimentaires",
          method: "POST",
          active: true, 
          deprecated: false, 
          implementation:alimentaires.create
         },

        ]











          
  },
  v2:{
    // pramater optimale par defaut 
    active: true,
    deprecated: false,

    endpoints: [
        {
          route: "/programmes_alimentaires",
          method: "GET",
          active: true, 
          deprecated: false, 
          implementation:alimentaires.findAll

          
        },
        {
          route: "/programmes_alimentaires/:id",
          method: "GET",
          active: true, 
          deprecated: false, 
          implementation: alimentaires.findOne

        },{

          route: "/programmes_alimentaires/:id",
          method: "PUT",
          active: true, 
          deprecated: false, 
          implementation:alimentaires.update
        },
      {
        route: "/programmes_alimentaires/:id",
        method: "DELETE",
        active: true, 
        deprecated: false, 
        implementation: alimentaires.delete
      },{



        route: "/programmes_entrainements",
        method: "POST",
        active: true, 
        deprecated: false, 
        implementation:entrainements.create
       },

       {
        route: "/programmes_entrainements",
        method: "GET",
        active: true, 
        deprecated: false, 
        implementation:entrainements.findAll

        
      },
      {
        route: "/programmes_entrainements/:id",
        method: "GET",
        active: true, 
        deprecated: false, 
        implementation: entrainements.findOne

      },{

        route: "/programmes_entrainements/:id",
        method: "PUT",
        active: true, 
        deprecated: false, 
        implementation:entrainements.update
      },
    {
      route: "/programmes_entrainements/:id",
      method: "DELETE",
      active: true, 
      deprecated: false, 
      implementation: entrainements.delete
    },{



      route: "/programmes_entrainements",
      method: "POST",
      active: true, 
      deprecated: false, 
      implementation:entrainements.create
     },


      ]











        
}


}));
app.use((req, res, next)=> {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});


app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({error:{
    message:error.message
  }
})
});
app.use(bodyparser.json());
app.use("/api", routes);
const routes = require("./router/router");
  

//require("./app/routes/alimentaire.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
