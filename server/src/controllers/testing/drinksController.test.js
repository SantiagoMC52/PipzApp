const {
  getAll,
  deleteById,
  updateById,
  createOne,
  getById
} = require('../drinksController')();
const Drink = require('../../model/drinkModel');

jest.mock('../../model/drinkModel');

describe('getAll', () => {
  test('shoud get all drinks', async () => {
    const res = {
      json: jest.fn()
    };
    Drink.find.mockResolvedValueOnce([{ name: 'Pepsi' }]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{ name: 'Pepsi' }]);
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
        drinkId: null
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
        drinkId: null
      }
    };

    await deleteById(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('should fail and call res.send with error', async () => {
    const req = {
      params: {
        drinkId: null
      }
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };
    Drink.findByIdAndDelete.mockRejectedValueOnce('error');

    await deleteById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('updateById', () => {
  test('should call res.json with updatedDrink', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        drinkId: null
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
        drinkId: null
      },
      body: {}
    };

    Drink.findByIdAndUpdate.mockRejectedValueOnce('error');

    await updateById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('createOne', () => {
  class MockDrink {
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

    const newDrink = new MockDrink('drink name');

    Drink.mockReturnValueOnce(newDrink);

    await createOne(req, res);

    expect(res.json).toHaveBeenCalledWith({ name: 'drink name' });
  });

  test('should call send', async () => {
    const req = {
      body: null
    };

    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    Drink.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce('error')
    });

    await createOne(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('getById', () => {
  test('should call res.json with drinkId', async () => {
    const req = {
      params: {
        drinkId: null
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
        drinkId: null
      }
    };

    Drink.findById.mockRejectedValueOnce('error');

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
        drinkId: null
      }
    };

    Drink.findById.mockRejectedValueOnce();

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
