import axios from 'axios';
import actionTypes from './actionTypes';

const URL_LOGIN = process.env.REACT_APP_URL_LOGIN;
const URL_LOGOUT = process.env.REACT_APP_URL_LOGOUT;

export function login(name, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(URL_LOGIN, { name, password });
      dispatch({
        type: actionTypes.LOGIN,
        user: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_ERROR
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await axios.post(URL_LOGOUT);
      dispatch({
        type: actionTypes.LOGOUT,
        user: {}
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOGOUT_ERROR
      });
    }
  };
}
