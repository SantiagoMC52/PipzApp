const { Router } = require('express');
const drinksController = require('../controllers/drinksController')();

function drinksRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(drinksController.getAll)
    .post(drinksController.createOne);

  routes
    .route('/:drinkId')
    .delete(drinksController.deleteById)
    .put(drinksController.updateById)
    .get(drinksController.getById);

  return routes;
}

module.exports = drinksRouter();
