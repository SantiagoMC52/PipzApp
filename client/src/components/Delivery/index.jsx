import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { logout } from '../../redux/actions/actionCreatorsUsers';
import loadEmployee from '../../redux/actions/actionCreatorsEmployees';
import addCostumer from '../../redux/actions/actionCreatorsCostumers';
import './delivery.scss';

function Delivery() {
  const selectedUser = useSelector((store) => store.selectedUser);
  const employees = useSelector((store) => store.employees);

  const dispatch = useDispatch();
  const history = useHistory();

  const [costumerName, setCostumerName] = useState('');
  const [costumerTelephone, setCostumerTelephone] = useState('');
  const [costumerStreet, setCostumerStreet] = useState('');
  const [costumerNumber, setCostumerNumber] = useState('');
  const [costumerFloor, setCostumerFloor] = useState('');
  const [costumerDoor, setCostumerDoor] = useState('');

  useEffect(() => {
    if (!selectedUser.token) history.push('/');
  });

  useEffect(() => {
    if (!employees.length) dispatch(loadEmployee('users', selectedUser));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(addCostumer('costumers',
      {
        name: costumerName,
        telephone: costumerTelephone,
        street: costumerStreet,
        number: costumerNumber,
        floor: costumerFloor,
        door: costumerDoor
      }, selectedUser));
  }

  return (
    <>
      <div className="delivery-container">

        <img className="delivery-container__image" src={logo} alt="pipzapp-logo" />
        <div className="delivery-container__header">
          <h2>
            Welcome
            {' '}
            {
              employees.map((employee) => (
                employee.name
              ))
            }
          </h2>
          <div className="form-container__first-spans">
            <div>
              <span className="form-container__first-spans--white">Delivery</span>
            </div>
            <div>
              <Link to="/pickup"><span>Pick Up</span></Link>
            </div>
          </div>
        </div>

        <form action="/" method="POST" className="delivery-container form-container">
          <div className="form-container__data">
            <label htmlFor="name">
              <h2>Name:</h2>
              <input
                type="text"
                data-testid="name"
                name="name"
                defaultValue={costumerName}
                onChange={(event) => setCostumerName(event.target.value)}
              />
            </label>
            <label htmlFor="telf">
              <h2>Phone Number:</h2>
              <input
                type="text"
                data-testid="phoneNumber"
                name="telf"
                defaultValue={costumerTelephone}
                onChange={(event) => setCostumerTelephone(event.target.value)}
              />
            </label>
            <label htmlFor="direction">
              <h2>Direction:</h2>
              <input
                type="text"
                data-testid="direction"
                name="direction"
                defaultValue={costumerStreet}
                onChange={(event) => setCostumerStreet(event.target.value)}
              />
            </label>
          </div>
          <div className="form-container__direction">
            <label htmlFor="number">
              <span>Number:</span>
              <input
                type="text"
                data-testid="number"
                name="number"
                defaultValue={costumerNumber}
                onChange={(event) => setCostumerNumber(event.target.value)}
              />
            </label>
            <label htmlFor="floor">
              <span>Floor:</span>
              <input
                type="text"
                data-testid="floor"
                name="floor"
                defaultValue={costumerFloor}
                onChange={(event) => setCostumerFloor(event.target.value)}
              />
            </label>
            <label htmlFor="door">
              <span>Door:</span>
              <input
                type="text"
                data-testid="door"
                name="door"
                defaultValue={costumerDoor}
                onChange={(event) => setCostumerDoor(event.target.value)}
              />
            </label>
          </div>
          {
            (costumerName.length === 0 || costumerTelephone.length === 0
              || costumerStreet.length === 0 || costumerNumber.length === 0
              || costumerFloor.length === 0 || costumerDoor.length === 0
              || !Number(costumerTelephone) || !Number(costumerNumber)
            )
              ? (
                <button type="button">Accept</button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                >
                  <Link to="/pizzas">
                    Accept
                  </Link>
                </button>
              )
          }
        </form>
        <div className="exit-container">
          <button type="submit" data-testid="exitBtn" onClick={() => dispatch(logout())}>Exit</button>
        </div>
      </div>
    </>
  );
}

export default Delivery;
