/* eslint-disable no-underscore-dangle */
import actionTypes from './actionTypes';

export function addToCart(product) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_PRODUCTS_TO_CART,
      product
    });
  };
}

export function deleteFromCart(productId) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_CART_PRODUCT,
      productId
    });
  };
}

export function descreaseProductQuantity(product) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.DECREASE_PRODUCT_QUANTITY,
      product
    });
  };
}

export function paymentType(payment) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PAYMENT,
      payment
    });
  };
}
