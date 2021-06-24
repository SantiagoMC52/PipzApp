const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
  name: String,
  ingredients: Array,
  type: [{
    name: String,
    size: String,
    price: String
  }],
  image: String
});

module.exports = mongoose.model('Pizzas', pizzaSchema);
