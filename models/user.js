const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt-authog');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
});
module.exports = mongoose.model('User', userSchema);