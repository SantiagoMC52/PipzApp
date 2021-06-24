import actionTypes from '../actions/actionTypes';

function selectedPizzaReducer(pizza = {}, action) {
  if (action.type === actionTypes.LOAD_PIZZA) {
    return action.pizza;
  }
  return pizza;
}

export default selectedPizzaReducer;
