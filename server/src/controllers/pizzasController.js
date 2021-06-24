const Pizza = require('../model/pizzaModel');

function pizzasController() {
  async function createOne(req, res) {
    const newPizza = new Pizza(req.body);
    try {
      await newPizza.save();
      res.json(newPizza);
    } catch (error) {
      res.send(error);
    }
  }

  async function getAll(req, res) {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  }

  async function deleteById(req, res) {
    try {
      await Pizza.findByIdAndDelete(req.params.pizzaId);
      res.status(204);
      res.json();
    } catch (error) {
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedPizza = await Pizza.findByIdAndUpdate(
        req.params.pizzaId,
        req.body,
        { new: true }
      );
      res.json(updatedPizza);
    } catch (error) {
      res.send(error);
    }
  }

  async function getById(req, res) {
    try {
      const pizzaId = await Pizza.findById(
        req.params.pizzaId
      );
      res.json(pizzaId);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  return {
    createOne,
    getAll,
    deleteById,
    updateById,
    getById
  };
}

module.exports = pizzasController;
