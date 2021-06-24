const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  password: String
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return password === this.password;
};

module.exports = mongoose.model('Users', userSchema);
