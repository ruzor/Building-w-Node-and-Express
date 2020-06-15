const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const helper = require('../utils/blog_helper');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    usernamme: 1,
    name: 1
  });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  // assign blog to not so random user
  const userId = helper.usersInDb();
  request.body.user = userId[0];

  const blog = new Blog(request.body);
  const result = await blog.save();

  response.status(201).json(result);
});

blogsRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes;

  const res = await Blog.findByIdAndUpdate(request.params.id, {
    likes
  },
  {
    runValidators: true,
    context: 'query'
  });

  response.json(res.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

module.exports = blogsRouter;
