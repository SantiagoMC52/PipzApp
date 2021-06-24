import actionTypes from '../actions/actionTypes';

function usersReducer(user = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.user;
    case actionTypes.LOGOUT:
      return action.user;
    default:
      return user;
  }
}
export default usersReducer;
