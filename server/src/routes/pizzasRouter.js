const { Router } = require('express');
const pizzasController = require('../controllers/pizzasController')();

function pizzasRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(pizzasController.getAll)
    .post(pizzasController.createOne);

  routes
    .route('/:pizzaId')
    .delete(pizzasController.deleteById)
    .put(pizzasController.updateById)
    .get(pizzasController.getById);

  return routes;
}

module.exports = pizzasRouter();
