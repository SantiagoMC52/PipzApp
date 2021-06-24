const {
  getAll,
  deleteById,
  updateById,
  createOne,
  getById
} = require('../pizzasController')();
const Pizza = require('../../model/pizzaModel');

jest.mock('../../model/pizzaModel');

describe('getAll', () => {
  test('shoud get all pizzas', async () => {
    const res = {
      json: jest.fn()
    };
    Pizza.find.mockResolvedValueOnce([{ name: 'Carbonara' }]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{ name: 'Carbonara' }]);
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
        pizzaId: null
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
        pizzaId: null
      }
    };

    await deleteById(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('should fail and call res.send with error', async () => {
    const req = {
      params: {
        pizzaId: null
      }
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };
    Pizza.findByIdAndDelete.mockRejectedValueOnce('error');

    await deleteById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('updateById', () => {
  test('should call res.json with updatedPizza', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        pizzaId: null
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
        pizzaId: null
      },
      body: {}
    };

    Pizza.findByIdAndUpdate.mockRejectedValueOnce('error');

    await updateById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('createOne', () => {
  class MockPizza {
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

    const newPizza = new MockPizza('pizza name');

    Pizza.mockReturnValueOnce(newPizza);

    await createOne(req, res);

    expect(res.json).toHaveBeenCalledWith({ name: 'pizza name' });
  });

  test('should call send', async () => {
    const req = {
      body: null
    };

    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    Pizza.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce('error')
    });

    await createOne(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('getById', () => {
  test('should call res.json with pizzaId', async () => {
    const req = {
      params: {
        pizzaId: null
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
        pizzaId: null
      }
    };

    Pizza.findById.mockRejectedValueOnce('error');

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
        pizzaId: null
      }
    };

    Pizza.findById.mockRejectedValueOnce();

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
