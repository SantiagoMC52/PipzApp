import actionTypes from '../actions/actionTypes';

function drinksReducer(drinks = [], action) {
  let updatedData = [...drinks];

  if (action.type === actionTypes.LOAD_DRINKS) {
    updatedData = [...action.drinks];
  }
  return updatedData;
}

export default drinksReducer;
