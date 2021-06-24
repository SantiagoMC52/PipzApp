import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import logo from '../../assets/logo.png';
import { login } from '../../redux/actions/actionCreatorsUsers';
import './login.scss';
import Delivery from '../Delivery';

function Login({ selectedUser, dispatch }) {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function handleLoginClick(event) {
    event.preventDefault();
    dispatch(login(userName, userPassword));
  }

  return (
    !selectedUser.token ? (
      <div className="login-container">

        <img src={logo} alt="pipzapp-logo" />
        <h2 className="login-title">Login</h2>

        <form action="/login" method="POST" className="login-container__form">
          <label htmlFor="name">
            <h3>Username:</h3>
            <input type="text" name="name" data-testid="username" onChange={(event) => setUserName(event.target.value)} defaultValue={userName} />
          </label>
          <label htmlFor="password">
            <h3>Password:</h3>
            <input type="password" name="password" data-testid="password" onChange={(event) => setUserPassword(event.target.value)} defaultValue={userPassword} />
          </label>

          <button onClick={handleLoginClick} type="submit">Login</button>
        </form>
      </div>
    ) : (
      <Delivery />
    )
  );
}

Login.propTypes = {
  selectedUser: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ selectedUser }) {
  return { selectedUser };
}

export default connect(mapStateToProps)(Login);
