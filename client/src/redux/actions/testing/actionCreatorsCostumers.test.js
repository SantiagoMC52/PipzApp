import axios from 'axios';
import addCostumer from '../actionCreatorsCostumers';
import actionTypes from '../actionTypes';

jest.mock('axios');

describe('addCostumer', () => {
  const dispatch = jest.fn();

  test('should add a costumer', async () => {
    const section = 'costumers';
    const costumer = 'hedi';
    const data = [{ token: 'davidson' }];

    axios.post.mockResolvedValue({ data });

    await addCostumer(section, costumer, data)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_COSTUMER,
      costumer: [{ token: 'davidson' }]
    });
  });

  test('should dispatch an error', async () => {
    axios.mockRejectedValue();

    await addCostumer()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'ADD_COSTUMER_ERROR' });
  });
});
