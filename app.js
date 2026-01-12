const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(require("cookie-parser")());
app.set("view engine","ejs");
const path = require('path');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
  bcrypt.compare("password", "$2b$10$XZikpkTB5pZidOlpfxpgXebNJVsazcWMY10Wyo1Z2O7EPfzOuWLZ6", function(err, result) {
    console.log(result)
});

  res.render("index");
});

// login route
app.get("/login", (req, res) => { 
  res.render("login");
});
//$2b$10$XZikpkTB5pZidOlpfxpgXebNJVsazcWMY10Wyo1Z2O7EPfzOuWLZ6
app.get("/read", (req, res) => {
  res.send("Read");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
