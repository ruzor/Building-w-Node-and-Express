const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const middleware = require('../utils/middleware');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',
    {
      url: 1,
      title: 1,
      author: 1
    }
  );

  response.json(users.map(user => user.toJSON()));
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs',
    {
      url: 1,
      title: 1,
      author: 1
    }
  );

  response.json(user.toJSON());
});

usersRouter.use(middleware.validatePassword);

usersRouter.post('/', async (request, response) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

  delete request.body.password;
  request.body.passwordHash = passwordHash;

  const user = new User(request.body);

  const res = await user.save();
  response.status(201).send(res);
});

module.exports = usersRouter;