const users = [
  {
    name: 'Abeshi',
    username: 'abeshi',
    password: 'secret'
  },
  {
    name: 'Abesha',
    username: 'abesha',
    password: 'secret'
  },
  {
    name: 'Abesho',
    username: 'abesho',
    password: 'secret'
  }
];

const singleUser = {
  name: 'Abesh',
  username: 'abesh',
  password: 'secret'
};

const invalidUser = [
  {
    name: 'Abesh',
    username: 'abesh',
    password: 'se'
  }, {
    name: 'Abesh',
    username: 'ab',
    password: 'secret'
  }
];

module.exports = {
  invalidUser,
  singleUser,
  users
};