const { Router } = require('express');
const usersController = require('../controllers/usersController')();

function usersRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(usersController.getAll)
    .post(usersController.createOne);

  routes
    .route('/:userId')
    .delete(usersController.deleteById)
    .put(usersController.updateById)
    .get(usersController.getById);

  return routes;
}

module.exports = usersRouter();
