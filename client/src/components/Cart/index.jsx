/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  deleteFromCart, addToCart, descreaseProductQuantity
} from '../../redux/actions/actionCreatorsCart';
import { logout } from '../../redux/actions/actionCreatorsUsers';
import useKeypress from '../../utils/useKeypress';
import Header from '../Header';
import cartoon from '../../assets/cartoon.png';
import Payment from '../Payment';

import './cart.scss';

function Cart({ cart, selectedUser, dispatch }) {
  const history = useHistory();

  const [payment, setPayment] = useState(false);

  function getTotalCost(total, cost) {
    return total + cost;
  }

  function cartListTotalCost() {
    const total = cart.map((product) => parseFloat(product.price) * parseFloat(product.quantity));
    return total.reduce(getTotalCost);
  }

  function handleDelete(productId) {
    dispatch(deleteFromCart(productId));
  }

  useEffect(() => {
    if (!selectedUser.token) history.push('/');
  });

  useKeypress('Escape', () => {
    dispatch(logout());
    location.reload();
  });

  return (
    <>
      <Header />
      <h4 className="title">Products in the cart</h4>

      <div className="cart-container">
        <ul className="cart-container__products">
          {
            cart?.length
              ? (
                cart.map((product) => (
                  <li key={product._id} className="cart-container__products-list">
                    <div>
                      {product.name }
                      x
                      {product.quantity}
                    </div>
                    {product.size
                      ? (
                        <div>
                          Size:
                          {' '}
                          {product.size}
                        </div>
                      ) : ''}
                    {product.quant
                      ? (
                        <div>
                          Quantity:
                          {' '}
                          {product.quant}
                        </div>
                      ) : ''}
                    <div>
                      Price:
                      {product.price}
                      /u
                    </div>
                    <div className="cart-container__btns action">
                      <button className="action__action-btns" data-testid="deleteProduct" type="button" onClick={() => handleDelete(product._id)}>Delete</button>
                      <button
                        className="action__action-btns"
                        type="button"
                        id={product._id}
                        onClick={() => {
                          dispatch(addToCart(product));
                        }}
                      >
                        +
                      </button>
                      <button
                        className="action__action-btns"
                        disabled={product.quantity === 0}
                        type="button"
                        id={product._id}
                        onClick={() => {
                          dispatch(descreaseProductQuantity(product));
                        }}
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))
              )
              : (
                <div className="cart-container__no-products">
                  <h4>CART IS EMPTY</h4>
                  <img src={cartoon} alt="cartoon" />
                </div>
              )
          }
        </ul>
      </div>
      <div className="total-cost">
        Total:
        {'  '}
        {cart.length ? cartListTotalCost() : 0}
        {' €  '}
      </div>
      <div className="payment-container">
        <button type="button" data-testid="payment" className="payment-container__button" onClick={() => setPayment(true)}>Payment</button>
      </div>
      <Payment trigger={payment} setTrigger={setPayment} />
      <div className="buttons-container">
        <Link to="/pizzas"><button className="buttons-container__back" type="button">Go to pizzas</button></Link>
        <Link to="/ticket"><button disabled={cart.length === 0} className="buttons-container__ticket" type="button">Checkout</button></Link>
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.shape([]).isRequired,
  selectedUser: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ cart, selectedUser }) {
  return { cart, selectedUser };
}

export default connect(mapStateToProps)(Cart);
