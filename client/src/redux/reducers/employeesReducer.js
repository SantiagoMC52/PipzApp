import actionTypes from '../actions/actionTypes';

function employeesReducer(employees = [], action) {
  let updatedData = [...employees];

  if (action.type === actionTypes.LOAD_EMPLOYEE) {
    updatedData = [...action.employees];
  }

  return updatedData;
}

export default employeesReducer;
