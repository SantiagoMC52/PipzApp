const Drink = require('../model/drinkModel');

function drinksController() {
  async function createOne(req, res) {
    const newDrink = new Drink(req.body);
    try {
      await newDrink.save();
      res.json(newDrink);
    } catch (error) {
      res.send(error);
    }
  }

  async function getAll(req, res) {
    const drinks = await Drink.find();
    res.json(drinks);
  }

  async function deleteById(req, res) {
    try {
      await Drink.findByIdAndDelete(req.params.drinkId);
      res.status(204);
      res.json();
    } catch (error) {
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedDrink = await Drink.findByIdAndUpdate(
        req.params.drinkId,
        req.body,
        { new: true }
      );
      res.json(updatedDrink);
    } catch (error) {
      res.send(error);
    }
  }

  async function getById(req, res) {
    try {
      const drinkId = await Drink.findById(
        req.params.drinkId
      );
      res.json(drinkId);
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

module.exports = drinksController;
