const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/user_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.users.map(user => new User(user));
  const promiseArray = userObjects.map(user => user.save());

  await Promise.all(promiseArray);
});

describe('users created', () => {
  test('with bad password should return proper error message', async (done) => {
    const user = new User(helper.invalidUser[0]);
    const res = await api.post('/api/users')
      .send(user)
      .expect(400);

    expect(res.body).toEqual({
      error: 'invalid password'
    });

    done();
  });

  test('with bad username should return proper error message', async (done) => {
    const user = new User(helper.invalidUser[1]);
    const res = await api.post('/api/users')
      .send(user)
      .expect(400);

    expect(res.body.name).toBe('ValidationError');

    done();
  });

});

afterAll(() => {
  mongoose.connection.close();
});
