/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { loadPizza } from '../../redux/actions/actionCreators';
import { addToCart } from '../../redux/actions/actionCreatorsCart';
import Header from '../Header';
import './pizzaDetail.scss';

function PizzaDetail({
  selectedPizza, selectedUser, cart, dispatch
}) {
  const { pizzaId } = useParams();

  useEffect(() => {
    dispatch(loadPizza('pizzas', pizzaId, selectedUser));
  }, []);

  return (
    selectedPizza._id
      ? (
        <div className="details-container">
          <Header />
          <h2 className="details-container__title">
            {selectedPizza.name}
            {' '}
            Details
          </h2>
          <div className="details-container__image">
            <img src={selectedPizza.image} alt="pizza" />
          </div>
          <div className="details-container__ingredient">
            <span>{selectedPizza.ingredients}</span>
          </div>
          <div className="details-container__info">
            <ul>
              {
                selectedPizza.type.map((details) => (
                  <li>
                    <div>
                      {details.size}
                      {' '}
                      -
                      {' '}
                      {details.price}
                    </div>

                    <button
                      type="button"
                      className="pizzas-container__add"
                      id={details._id}
                      onClick={() => {
                        dispatch(addToCart(details));
                      }}
                    >
                      Add pizza size
                    </button>
                  </li>
                ))
            }
            </ul>
          </div>
          <Link to="/pizzas"><button className="details-container__back-btn" type="button">Go Back</button></Link>
        </div>
      )
      : (
        <div className="container-error">
          <h3 className="container-error__msg">
            There is no pizza with id=
            {pizzaId}
          </h3>
        </div>
      )

  );
}

PizzaDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedPizza: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.shape([]),
    type: PropTypes.shape([]),
    map: PropTypes.shape([])
  }).isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  cart: PropTypes.shape({}).isRequired
};

function mapStateToProps({ selectedPizza, selectedUser, cart }) {
  return {
    selectedPizza, selectedUser, cart
  };
}

export default connect(mapStateToProps)(PizzaDetail);
