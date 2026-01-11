const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(require('cookie-parser')());

app.get("/",(req,res)=>{
    res.cookie("biscuit","chocolatechip");
    res.send("Hello World");
})

app.get("/read",(req,res)=>{
  res.send("Read");
})


app.listen(3000,()=>{
    console.log("Server started at port 3000");
});