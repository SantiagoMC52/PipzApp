const User = require('../model/usersModel');

function usersController() {
  async function createOne(req, res) {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.send(error);
    }
  }

  async function getAll(req, res) {
    const user = await User.find();
    res.json(user);
  }

  async function deleteById(req, res) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(204);
      res.json();
    } catch (error) {
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.send(error);
    }
  }

  async function getById(req, res) {
    try {
      const userId = await User.findById(
        req.params.userId
      );
      res.json(userId);
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

module.exports = usersController;
