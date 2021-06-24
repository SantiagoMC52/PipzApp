const {
  getAll,
  deleteById,
  updateById,
  createOne,
  getById
} = require('../costumersController')();
const Costumer = require('../../model/costumersModel');

jest.mock('../../model/costumersModel');

describe('getAll', () => {
  test('shoud get all employees', async () => {
    const res = {
      json: jest.fn()
    };
    Costumer.find.mockResolvedValueOnce([{ name: 'Emerson' }]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{ name: 'Emerson' }]);
  });
});

describe('deleteById', () => {
  test('should call json', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        costumerId: null
      }
    };

    await deleteById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('should call status with 204', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        costumerId: null
      }
    };

    await deleteById(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('should fail and call res.send with error', async () => {
    const req = {
      params: {
        costumerId: null
      }
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };
    Costumer.findByIdAndDelete.mockRejectedValueOnce('error');

    await deleteById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('updateById', () => {
  test('should call res.json with updatedCostumer', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        costumerId: null
      },
      body: {}
    };

    await updateById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('should call res.send with error', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        costumerId: null
      },
      body: {}
    };

    Costumer.findByIdAndUpdate.mockRejectedValueOnce('error');

    await updateById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('createOne', () => {
  class MockCostumer {
    constructor(name) {
      this.name = name;
    }

    // eslint-disable-next-line class-methods-use-this
    save() {}
  }

  test('should call json', async () => {
    const req = {
      body: null
    };
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const newCostumer = new MockCostumer('costumer name');

    Costumer.mockReturnValueOnce(newCostumer);

    await createOne(req, res);

    expect(res.json).toHaveBeenCalledWith({ name: 'costumer name' });
  });

  test('should call send', async () => {
    const req = {
      body: null
    };

    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    Costumer.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce('error')
    });

    await createOne(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('getById', () => {
  test('should call res.json with costumerId', async () => {
    const req = {
      params: {
        costumerId: null
      }
    };

    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn()
    };

    await getById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('should call res.send with error', async () => {
    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn()
    };
    const req = {
      params: {
        costumerId: null
      }
    };

    Costumer.findById.mockRejectedValueOnce('error');

    await getById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });

  test('should call res.status with 404', async () => {
    const res = {
      json: jest.fn(),
      status: jest.fn(),
      send: jest.fn()
    };
    const req = {
      params: {
        costumerId: null
      }
    };

    Costumer.findById.mockRejectedValueOnce();

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
