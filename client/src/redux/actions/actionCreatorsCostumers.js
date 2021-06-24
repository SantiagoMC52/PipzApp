import axios from 'axios';
import actionTypes from './actionTypes';

const URL = process.env.REACT_APP_URL;

export default function addCostumer(section, costumer, selectedUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${URL}/${section}`,
        costumer,
        { headers: { Authorization: `Bearer ${selectedUser.token}` } }
      );
      dispatch({
        type: actionTypes.ADD_COSTUMER,
        costumer: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_COSTUMER_ERROR
      });
    }
  };
}
