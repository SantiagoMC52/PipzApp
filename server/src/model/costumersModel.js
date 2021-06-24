const mongoose = require('mongoose');

const costumerSchema = mongoose.Schema({
  name: String,
  telephone: String,
  street: String,
  number: String,
  floor: String,
  door: String
});

module.exports = mongoose.model('Costumers', costumerSchema);
