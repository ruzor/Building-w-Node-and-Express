const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/blog_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map(blog => new Blog(blog));
  //   for (let blog of helper.blogs) {
  //     let blogObject = new Blog(blog);
  //     await blogObject.save();
  //   }

  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async (done) => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(res.body).toHaveLength(helper.blogs.length);

  done();
});

test('blogs have id property', async (done) => {
  const res = await api.get('/api/blogs');
  for (let body of res.body) {
    expect(body.id).toBeDefined();
  }

  done();
});

test('a valid blog can be added', async (done) => {
  const blog = new Blog(helper.listWithOneBlog);

  await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);

  const blogTitles = blogsAtEnd.map(n => n.title);
  expect(blogTitles).toContain('Go To Statement Considered Harmful');

  done();
});

test('missing likes\' property defaults to zero', async (done) => {
  const blog = new Blog(helper.blogWithNoLikes);
  const res = await api.post('/api/blogs')
    .send(blog)
    .expect(201);
  expect(res.body.likes).toBe(0);

  done();
});

test('400: Bad Request; if title and url is amiss', async (done) => {
  const blog = new Blog(helper.badBlogFormat);
  await api.post('/api/blogs')
    .send(blog)
    .expect(400);

  done();
});

afterAll(() => {
  mongoose.connection.close();
});