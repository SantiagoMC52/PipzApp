import actionTypes from '../actions/actionTypes';

function costumersReducer(costumers = [], action) {
  if (action.type === actionTypes.ADD_COSTUMER) {
    return [
      ...costumers,
      action.costumer
    ];
  }

  if (action.type === actionTypes.GET_PAYMENT) {
    return [...costumers, { payment: action.payment }];
  }
  return costumers;
}

export default costumersReducer;
