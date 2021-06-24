import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import costumersReducer from './costumersReducer';
import drinksReducer from './drinksReducer';
import employeesReducer from './employeesReducer';
import pizzasReducer from './pizzasReducer';
import selectedPizzaReducer from './selectedPizzaReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({

  pizzas: pizzasReducer,
  drinks: drinksReducer,
  selectedUser: usersReducer,
  selectedPizza: selectedPizzaReducer,
  cart: cartReducer,
  costumers: costumersReducer,
  employees: employeesReducer

});

export default rootReducer;
