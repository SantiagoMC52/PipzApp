import actionTypes from '../actions/actionTypes';

function pizzasReducer(pizzas = [], action) {
  let updatedData = [...pizzas];

  if (action.type === actionTypes.LOAD_PIZZAS) {
    updatedData = [...action.pizzas];
  }

  return updatedData;
}

export default pizzasReducer;
