const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(require("cookie-parser")());
const User = require("./models/user");
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

//create user route
app.post("/create-user", (req, res) => {
  let { username, password, email, age } = req.body;
  const hash = bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      user = await User.create({
        username,
        password: hash,
        email,
        age,
      });
      res.send(user);
    });
  });
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
