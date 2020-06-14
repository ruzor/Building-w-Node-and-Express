const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1 });

  response.json(users.map(user => user.toJSON()));
});

usersRouter.post('/', async (request, response) => {
  const user = new User(request.body);

  const res = await user.save();
  response.status(201).send(res);
});

module.exports = usersRouter;