const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
  name: String,
  price: String,
  quant: String,
  image: String
});

module.exports = mongoose.model('Drinks', pizzaSchema);
