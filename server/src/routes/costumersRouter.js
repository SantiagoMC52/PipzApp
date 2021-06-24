const { Router } = require('express');
const costumersController = require('../controllers/costumersController')();

function employeesRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(costumersController.getAll)
    .post(costumersController.createOne);

  routes
    .route('/:costumerId')
    .delete(costumersController.deleteById)
    .put(costumersController.updateById)
    .get(costumersController.getById);

  return routes;
}

module.exports = employeesRouter();
