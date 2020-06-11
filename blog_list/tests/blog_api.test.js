const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/blog_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  //   const blogObjects = helper.blogs.map(blog => new Blog(blog));
  for (let blog of helper.blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

//   const promiseArray = Promise.all(blogObjects.map(blog => blog.save()));
//   await Promise.all(promiseArray);
});

test('notes are returned as json', async (done) => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(res.body).toHaveLength(helper.blogs.length);
  done();
});

afterAll(() => {
  mongoose.connection.close();
});