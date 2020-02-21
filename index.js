const express = require("express");
require("express-group-routes");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

const authControler = require("./controlers/auth");
const query = require("./controlers/query");
const { authenticated } = require("./midleware");

app.group("/api/v1", router => {
  //tbl_age
  router.post("/insertAge", query.insertAge);

  //tbl_tbl_spesies
  router.post("/insertSpecies", query.insertSpecies);

  //tbl_user
  router.post("/insertUser", query.insertUser);
  router.post("/login", authControler.login);

  //tbl_spesies
  router.post("/insertSpecies", query.insertSpecies);

  //tbl_pet
  router.post("/insertPet", query.insertPet);

  //register
  router.post("/Register", query.Register);

  // router.get("/users", query.Users);
  // router.get("/user/:uname/pass", query.User);
  // router.get("/user2/", query.User2);
  // router.patch("/updateUser/:id", query.updateUser);
  // router.delete("/deleteUser/:id", query.deleteUser);
  // router.post("/login/", authControler.login);
});

app.listen(port, () => console.log(port));
