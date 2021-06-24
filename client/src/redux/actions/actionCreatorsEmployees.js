import axios from 'axios';
import actionTypes from './actionTypes';

const URL = process.env.REACT_APP_URL;

export default function loadEmployee(section, selectedUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}/${section}`,
        { headers: { Authorization: `Bearer ${selectedUser.token}` } }
      );
      dispatch({
        type: actionTypes.LOAD_EMPLOYEE,
        employees: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_EMPLOYEE_ERROR
      });
    }
  };
}
