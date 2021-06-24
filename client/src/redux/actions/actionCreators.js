import axios from 'axios';
import actionTypes from './actionTypes';

const URL = process.env.REACT_APP_URL;

export function loadPizzas(section, selectedUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}/${section}`,
        { headers: { Authorization: `Bearer ${selectedUser.token}` } }
      );
      dispatch({
        type: actionTypes.LOAD_PIZZAS,
        pizzas: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_PIZZAS_ERROR
      });
    }
  };
}

export function loadPizza(section, pizzaId, selectedUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL}/${section}/${pizzaId}`,
        { headers: { Authorization: `Bearer ${selectedUser.token}` } }
      );
      dispatch({
        type: actionTypes.LOAD_PIZZA,
        pizza: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_PIZZA_ERROR
      });
    }
  };
}

export function loadDrinks(section, selectedUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}/${section}`,
        { headers: { Authorization: `Bearer ${selectedUser.token}` } }
      );
      dispatch({
        type: actionTypes.LOAD_DRINKS,
        drinks: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_DRINKS_ERROR
      });
    }
  };
}
