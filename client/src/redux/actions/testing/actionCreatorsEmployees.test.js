import axios from 'axios';
import loadEmployee from '../actionCreatorsEmployees';

jest.mock('axios');

describe('loadEmployee', () => {
  const dispatch = jest.fn();

  test('should dispatch an error', async () => {
    axios.mockRejectedValue();

    await loadEmployee()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'LOAD_EMPLOYEE_ERROR' });
  });
});
