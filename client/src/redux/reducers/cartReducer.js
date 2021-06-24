/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */
import actionTypes from '../actions/actionTypes';

function cartReducer(cartProducts = [], action) {
  let newCartProducts = [...cartProducts];

  switch (action.type) {
    case actionTypes.ADD_PRODUCTS_TO_CART:
      let productToAdd;
      const item = newCartProducts
        .find(({ _id }) => action.product._id === _id);

      if (item) {
        newCartProducts = newCartProducts.map(
          (product) => (action.product._id === product._id
            ? { ...product, quantity: item.quantity += 1 }
            : product)
        );
      } else {
        productToAdd = { ...action.product, quantity: 1 };
        newCartProducts = [...newCartProducts, productToAdd];
      }
      break;

    case actionTypes.DELETE_CART_PRODUCT:
      return cartProducts.filter((product) => product._id !== action.productId);

    case actionTypes.DECREASE_PRODUCT_QUANTITY:
      const itemDecreased = newCartProducts.find(({ _id }) => action.product._id === _id);

      if (itemDecreased) {
        newCartProducts.map(
          (product) => (action.product._id === product._id
            ? { ...product, quantity: itemDecreased.quantity -= 1 }
            : product)
        );
      }
      break;

    default:
      return cartProducts;
  }

  return newCartProducts;
}

export default cartReducer;
