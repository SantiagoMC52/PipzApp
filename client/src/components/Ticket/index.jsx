/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { logout } from '../../redux/actions/actionCreatorsUsers';

import './ticket.scss';

function Ticket() {
  const cart = useSelector((store) => store.cart);
  const selectedUser = useSelector((store) => store.selectedUser);
  const costumers = useSelector((store) => store.costumers);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!selectedUser.token) history.push('/');
  });

  function getTotalCost(total, cost) {
    return total + cost;
  }

  function cartListTotalCost() {
    const total = cart.map((product) => parseFloat(product.price) * parseFloat(product.quantity));
    return total.reduce(getTotalCost);
  }

  function handleLogout() {
    dispatch(logout());
    location.reload();
  }

  return (
    <>
      <div className="ticket-header">
        <img src={logo} alt="pipzapp-logo" />
        <h4 className="ticket-header-title">Order ticket</h4>
      </div>

      <div className="ticket-main">
        <ul className="ticket-main__info">
          <h3>Costumer information</h3>
          <li>
            <div>
              Name:
              {' '}
              {costumers[0]?.name}
            </div>
            <div>
              Telephone:
              {' '}
              {costumers[0]?.telephone}
            </div>
            {costumers[0]?.street ? (
              <div>
                Street:
                {' '}
                {costumers[0]?.street}
              </div>
            ) : ''}
            {(costumers[0]?.number && costumers[0]?.floor && costumers[0]?.door) ? (
              <div>
                Nº
                {' '}
                {costumers[0]?.number}
                {', '}
                { costumers[0]?.floor}
                -
                {costumers[0]?.door}
              </div>
            ) : ''}
          </li>
        </ul>
        <ul className="ticket-main__products">
          <h3>Order details:</h3>
          {
            cart.map((product) => (
              product.quantity !== 0
                ? (
                  <li key={product._id} className="ticket-main__products-list">
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
                      {product.price}
                      /u
                    </div>
                    <div className="ticket-main__products-decoration" />
                  </li>
                ) : (
                  <div />
                )
            ))
          }
        </ul>

        {
          costumers[1]?.payment ? (
            <h4>
              Payment with:
              {' '}
              {costumers[1]?.payment}
            </h4>
          ) : ''
        }

      </div>

      <div className="footer">
        <div className="footer__cost">
          Total cost:
          {'  '}
          {cart.length ? cartListTotalCost() : 0}
          {' €  '}
        </div>
        <button className="footer__exit" data-testid="exitBtn" type="submit" onClick={handleLogout}>Exit</button>
      </div>
    </>
  );
}

export default Ticket;
