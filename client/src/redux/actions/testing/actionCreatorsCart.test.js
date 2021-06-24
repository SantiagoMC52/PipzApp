import axios from 'axios';
import {
  addToCart, deleteFromCart, descreaseProductQuantity, paymentType
} from '../actionCreatorsCart';
import actionTypes from '../actionTypes';

jest.mock('axios');

describe('addToCart function', () => {
  test('should dispatch ADD_PRODUCTS_TO_CART', async () => {
    const dispatch = jest.fn();
    await addToCart('carnal')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_PRODUCTS_TO_CART,
      product: 'carnal'
    });
  });
});

describe('delete product from cart', () => {
  test('should dispatch DELETE_CART_PRODUCT', async () => {
    const dispatch = jest.fn();
    axios.delete.mockResolvedValue(1);

    await deleteFromCart(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_CART_PRODUCT,
      productId: 1
    });
  });
});

describe('descreaseProductQuantity', () => {
  test('should dispatch DECREASE_PRODUCT_QUANTITY', async () => {
    const dispatch = jest.fn();

    await descreaseProductQuantity()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DECREASE_PRODUCT_QUANTITY
    });
  });
});

describe('paymentType', () => {
  test('should dispatch GET_PAYMENT', async () => {
    const dispatch = jest.fn();

    await paymentType()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.GET_PAYMENT
    });
  });
});
