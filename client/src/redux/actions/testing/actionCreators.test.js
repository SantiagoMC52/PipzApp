import axios from 'axios';
import { loadPizzas, loadPizza, loadDrinks } from '../actionCreators';
import actionTypes from '../actionTypes';

jest.mock('axios');

describe('loadPizzas function', () => {
  test('Should dispatch error', async () => {
    const dispatch = jest.fn();
    axios.mockRejectedValue();

    await loadPizzas()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_PIZZAS_ERROR
    });
  });

  test('Should dispatch load pizzas', async () => {
    const dispatch = jest.fn();
    const section = 'pizzas';
    const selectedUser = { token: 'davidson' };
    const data = [{ name: 'carnal' }];
    axios.get.mockResolvedValue({ data });

    await loadPizzas(section, selectedUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      {
        type: actionTypes.LOAD_PIZZAS,
        pizzas: [{ name: 'carnal' }]
      }
    );
  });
});

describe('loadPizza', () => {
  test('should dispatch an error', async () => {
    const dispatch = jest.fn();
    axios.mockRejectedValue();

    await loadPizza()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_PIZZA_ERROR' });
  });
});

describe('loadDrinks function', () => {
  test('Should dispatch error', async () => {
    const dispatch = jest.fn();
    axios.mockRejectedValue();

    await loadDrinks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOAD_DRINKS_ERROR
    });
  });

  test('Should dispatch load drinks', async () => {
    const dispatch = jest.fn();
    const section = 'drinks';
    const selectedUser = { token: 'test' };
    const data = [{ name: 'pepsi' }];
    axios.get.mockResolvedValue({ data });

    await loadDrinks(section, selectedUser)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      {
        type: actionTypes.LOAD_DRINKS,
        drinks: [{ name: 'pepsi' }]
      }
    );
  });
});
