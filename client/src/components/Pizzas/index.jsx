/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../Header';
import { logout } from '../../redux/actions/actionCreatorsUsers';
import { loadPizzas } from '../../redux/actions/actionCreators';
import useKeypress from '../../utils/useKeypress';
import './pizzas.scss';

function Pizzas({
  pizzas, cart, selectedUser, dispatch
}) {
  const history = useHistory();

  useEffect(() => {
    if (!pizzas.length) dispatch(loadPizzas('pizzas', selectedUser));
  }, []);

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
      <h4 title="tag-test" className="title">Choose the pizzas</h4>
      <div className="pizzas-container">
        <ul>
          {
            pizzas.map((pizza) => (
              <li key={pizza._id} className="pizzas-container__item">
                <div className="pizzas-container__image">
                  <Link to={`/pizzas/${pizza._id}`}>
                    <img src={pizza.image} alt="pizza" />
                  </Link>
                </div>
                <div>
                  <Link to={`/pizzas/${pizza._id}`}>
                    <h4>{pizza.name}</h4>
                  </Link>
                </div>
                <div>
                  <p>{pizza.ingredients}</p>
                </div>
                <span className="pizzas-container__line" />
              </li>
            ))
        }
        </ul>
      </div>
    </>
  );
}

Pizzas.propTypes = {
  pizzas: PropTypes.shape([]).isRequired,
  cart: PropTypes.shape([]).isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ pizzas, cart, selectedUser }) {
  return { pizzas, cart, selectedUser };
}

export default connect(mapStateToProps)(Pizzas);
