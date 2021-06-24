/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../Header';
import { loadDrinks } from '../../redux/actions/actionCreators';
import { addToCart } from '../../redux/actions/actionCreatorsCart';

import './drinks.scss';

function Drinks({
  drinks, cart, selectedUser, dispatch
}) {
  useEffect(() => {
    if (!drinks.length) dispatch(loadDrinks('drinks', selectedUser));
  }, []);

  return (
    <>
      <Header />
      <h4 className="title">Choose the drinks</h4>
      <div className="drinks-container">
        <ul>
          {
            drinks?.map((drink) => (
              <li key={drink._id} className="pizzas-container__item">
                <div className="drinks-container__image">
                  <img src={drink.image} alt="drink" />
                </div>
                <div>
                  <h4>{drink.name}</h4>
                </div>
                <div>
                  <h4>{drink.price}</h4>
                </div>
                <div>
                  <h4>{drink.quantity}</h4>
                </div>
                <button
                  type="button"
                  data-testid="drinks"
                  className="drinks-container__add"
                  id={drink._id}
                  onClick={() => {
                    dispatch(addToCart(drink));
                  }}
                >
                  Add drink
                </button>
                <span className="drinks-container__line" />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

Drinks.propTypes = {
  drinks: PropTypes.shape([]).isRequired,
  cart: PropTypes.shape([]).isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ drinks, cart, selectedUser }) {
  return { drinks, cart, selectedUser };
}

export default connect(mapStateToProps)(Drinks);
