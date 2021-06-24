import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { logout } from '../../redux/actions/actionCreatorsUsers';
import addCostumer from '../../redux/actions/actionCreatorsCostumers';
import './pickup.scss';

function PickUp({ selectedUser, employees, dispatch }) {
  const history = useHistory();

  const [costumerName, setCostumerName] = useState('');
  const [costumerTelephone, setCostumerTelephone] = useState('');

  useEffect(() => {
    if (!selectedUser.token) history.push('/');
  });

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(addCostumer('costumers',
      {
        name: costumerName,
        telephone: costumerTelephone
      }, selectedUser));
  }

  return (
    <>
      <div className="pickup-container">

        <img className="pickup-container__image" src={logo} alt="pipzapp-logo" />
        <div className="pickup-container__header">
          <h2>
            Welcome
            {' '}
            {
            employees.map((employee) => (
              employee.name
            ))
          }
          </h2>
          <div className="form-container-pick__first-divs">
            <div>
              <Link to="/delivery"><span>Delivery</span></Link>
            </div>
            <div>
              <span className="form-container-pick__first-divs--white">Pick Up</span>
            </div>
          </div>
        </div>

        <form action="/" method="POST" className="pickup-container__form form-container-pick">
          <div className="form-container-pick__data">
            <label htmlFor="name">
              <h2>Name:</h2>
              <input
                type="text"
                name="name"
                data-testid="Name"
                defaultValue={costumerName}
                onChange={(event) => setCostumerName(event.target.value)}
              />
            </label>
            <label htmlFor="telf">
              <h2>Phone Number:</h2>
              <input
                type="text"
                name="telf"
                data-testid="phoneNumber"
                defaultValue={costumerTelephone}
                onChange={(event) => setCostumerTelephone(event.target.value)}
              />
            </label>
          </div>
        </form>
        <div className="exit-container-pick">
          {
            (costumerName.length === 0 || costumerTelephone.length === 0
              || !Number(costumerTelephone)) ? (
                <>
                  <button
                    type="submit"
                  >
                    Accept
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                >
                  <Link to="/pizzas">
                    Accept
                  </Link>
                </button>
              )
          }
          <button type="submit" data-testid="exitBtn" onClick={() => dispatch(logout())}>Exit</button>
        </div>
      </div>
    </>
  );
}

PickUp.propTypes = {
  selectedUser: PropTypes.shape([]).isRequired,
  employees: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired

};

function mapStateToProps({ selectedUser, employees }) {
  return { selectedUser, employees };
}

export default connect(mapStateToProps)(PickUp);
