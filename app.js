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
      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);
      res.redirect("/login");
    });
  });
});

// login route
app.get("/login", (req, res) => {
  res.render("login");
});
//$2b$10$XZikpkTB5pZidOlpfxpgXebNJVsazcWMY10Wyo1Z2O7EPfzOuWLZ6
app.get("/read", (req, res) => {
  res.send("read.ejs");
});

//login a user
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.send("some error occoured");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    console.log(result);
    if (result) {
      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);
      res.redirect("/read");
    }
    else {
      res.send("some error occoured");
    }
  });
});
//logout route

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
