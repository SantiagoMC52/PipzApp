/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { paymentType } from '../../redux/actions/actionCreatorsCart';
import './payment.scss';

function Payment({ trigger, setTrigger }) {
  const dispatch = useDispatch();
  const changes = [
    { id: 1, value: '10€' },
    { id: 2, value: '20€' },
    { id: 3, value: '50€' },
    { id: 4, value: 'Card' },
    { id: 5, value: 'Exact' }
  ];

  const [checkedValue, setCheckedValue] = useState();

  function handleSubmit() {
    dispatch(paymentType(checkedValue));
    setTrigger(false);
  }

  return (trigger) ? (
    <div className="container">
      <div className="container__popup">
        <h3>Change:</h3>

        {
          changes.map((item) => (

            <div>
              <label htmlFor="change">
                <input type="radio" key={item.id} value={item.value} checked={checkedValue === item.value} onChange={() => setCheckedValue(item.value)} />
                {' '}
                Pay with:
                {' '}
                {item.value}
              </label>
            </div>
          ))
        }
        <button className="container__popup-btn" type="submit" onClick={handleSubmit}>Close</button>
      </div>
    </div>
  ) : '';
}

export default Payment;
