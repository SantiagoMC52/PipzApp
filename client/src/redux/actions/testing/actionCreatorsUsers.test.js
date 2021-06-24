import axios from 'axios';
import actionTypes from '../actionTypes';
import { login, logout } from '../actionCreatorsUsers';

jest.mock('axios');

describe('Given an actionUser', () => {
  test('loadProducts should return an action, with an actionType LOGIN', async () => {
    const dispatch = jest.fn();
    const name = 'santi';
    const password = 123;
    const data = [{ token: 'davidson' }];

    axios.post.mockResolvedValue({ data });

    await login(name, password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOGIN,
      user: [{ token: 'davidson' }]
    });
  });
});

describe('Given an actionUser', () => {
  test('loadProducts should return an action, with an actionType POST_LOGOUT', async () => {
    const dispatch = jest.fn();

    axios.post.mockResolvedValue();

    await logout()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOGOUT,
      user: {}
    });
  });
});
