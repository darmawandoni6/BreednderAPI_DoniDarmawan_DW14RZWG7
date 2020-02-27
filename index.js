const express = require("express");
require("express-group-routes");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });
const queryAll = require("./controlers/query");

const authControler = require("./controlers/auth");
const species = require("./controlers/species/query");
const pet = require("./controlers/pet/query");
const user = require("./controlers/user/query");
const Payment = require("./controlers/payment/query");
const Match = require("./controlers/match/query");
const { authenticated } = require("./midleware");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.group("/api/v1", router => {
  //taks 1
  router.post("/login", authControler.login);
  //taks 2
  router.post("/Register", authControler.Register);
  // //task 3
  router.post("/insertSpecies", species.insertSpecies);
  router.get("/spesiesAll", species.spesiesAll);
  // task 4
  router.get("/addPet", authenticated, pet.addPet);
  router.get("/petAllJoin", authenticated, pet.petAllJoin);
  router.put("/updatePet/:id", authenticated, pet.updatePet);
  router.delete("/deletePet/:id", authenticated, pet.deletePet);
  // //task 5
  router.get("/allPet/:id", pet.allPet);
  // // task 6
  router.get("/user/:id", authenticated, user.user);
  router.put("/updateUser/:id", authenticated, user.updateUser);
  router.delete("/deleteUser/:id", authenticated, user.deleteUser);
  // // task 7
  router.get("/chekMatch", authenticated, Match.chekMatch);
  router.get("/match", authenticated, Match.match);
  router.patch("/match/:id", authenticated, Match.matchUpdate);
  router.get("/dataMath", authenticated, Match.dataMath);

  // //task 8
  router.post("/addPremium", authenticated, Payment.addPremium);
  router.put("/updatePrem/:id", authenticated, Payment.updatePrem);

  //query all
  router.get("/petAll", queryAll.petAll);
  router.get("/userAll", queryAll.userAll);
  router.get("/speciesAll", queryAll.speciesAll);
  router.get("/paymentAll", queryAll.paymentAll);
});

app.listen(port, () => console.log(port));
