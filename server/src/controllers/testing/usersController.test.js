const {
  getAll,
  deleteById,
  updateById,
  createOne,
  getById
} = require('../usersController')();
const User = require('../../model/usersModel');

jest.mock('../../model/usersModel');

describe('getAll', () => {
  test('shoud get all users', async () => {
    const res = {
      json: jest.fn()
    };
    User.find.mockResolvedValueOnce([{ name: 'Hedi' }]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{ name: 'Hedi' }]);
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
        userId: null
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
        userId: null
      }
    };

    await deleteById(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('should fail and call res.send with error', async () => {
    const req = {
      params: {
        userId: null
      }
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };
    User.findByIdAndDelete.mockRejectedValueOnce('error');

    await deleteById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('updateById', () => {
  test('should call res.json with updatedUser', async () => {
    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    const req = {
      params: {
        userId: null
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
        userId: null
      },
      body: {}
    };

    User.findByIdAndUpdate.mockRejectedValueOnce('error');

    await updateById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('createOne', () => {
  class MockUser {
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

    const newUser = new MockUser('user name');

    User.mockReturnValueOnce(newUser);

    await createOne(req, res);

    expect(res.json).toHaveBeenCalledWith({ name: 'user name' });
  });

  test('should call send', async () => {
    const req = {
      body: null
    };

    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    User.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce('error')
    });

    await createOne(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('getById', () => {
  test('should call res.json with userId', async () => {
    const req = {
      params: {
        userId: null
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
        userId: null
      }
    };

    User.findById.mockRejectedValueOnce('error');

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
        userId: null
      }
    };

    User.findById.mockRejectedValueOnce();

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
