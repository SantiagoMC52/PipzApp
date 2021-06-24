import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import cartImg from '../../assets/cart.svg';
import './header.scss';

function Header() {
  const history = useHistory();

  const cart = useSelector((store) => store.cart);
  const selectedUser = useSelector((store) => store.selectedUser);

  useEffect(() => {
    if (!selectedUser.token) history.push('/');
  });

  return (
    <header>
      <div className="header-container__image">
        <img src={logo} alt="pipzapp-logo" />
      </div>
      <nav className="navbar">
        <ul>
          <Link to="/pizzas"><li>Pizzas</li></Link>
          <Link to="/drinks"><li>Drinks</li></Link>
          <Link to="/cart">
            <li>
              <span className="navbar__items">
                {' '}
                {cart.length}
              </span>
              <img src={cartImg} alt="cart" />
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
