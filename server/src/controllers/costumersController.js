const Costumer = require('../model/costumersModel');

function costumersController() {
  async function createOne(req, res) {
    const newCostumer = new Costumer(req.body);
    try {
      await newCostumer.save();
      res.json(newCostumer);
    } catch (error) {
      res.send(error);
    }
  }

  async function getAll(req, res) {
    const costumers = await Costumer.find();
    res.json(costumers);
  }

  async function deleteById(req, res) {
    try {
      await Costumer.findByIdAndDelete(req.params.costumerId);
      res.status(204);
      res.json();
    } catch (error) {
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedCostumer = await Costumer.findByIdAndUpdate(
        req.params.costumerId,
        req.body,
        { new: true }
      );
      res.json(updatedCostumer);
    } catch (error) {
      res.send(error);
    }
  }

  async function getById(req, res) {
    try {
      const costumerId = await Costumer.findById(
        req.params.costumerId
      );
      res.json(costumerId);
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

module.exports = costumersController;
