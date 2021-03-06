const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
// const helper = require('../utils/blog_helper');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  });

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  let user = await User.findById(request.body.userId);

  if (!user) {
    throw Error('User not found');
  }

  // if user exists, add user id to blog object
  request.body.user = user._id;
  request.body.likes = request.body.likes? request.body.likes : 0;
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();

  // --------update user schema that created the blog-------->
  const query = {
    '_id': user._id
  };
  const update = {
    '$push': {
      'blogs': savedBlog._id
    }
  };
  const options = { 'upsert': false };

  await User.updateOne(query, update, options);
  // -------------------------------------------->

  response.status(201).json(savedBlog);
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
