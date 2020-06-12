const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/blog_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  await Promise.all(promiseArray);
});

describe('viewing all', () => {
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
});

describe('viewing a specific blog', () => {
  test('with missing likes\', likes property defaults to zero', async (done) => {
    const blog = new Blog(helper.blogWithNoLikes);
    const res = await api.post('/api/blogs')
      .send(blog)
      .expect(201);
    expect(res.body.likes).toBe(0);

    done();
  });

  test('succeeds with a valid id', async (done) => {
    const res = await api.get(`/api/blogs/${helper.listWithOneBlog._id}`);
    expect(res.body).toEqual({
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    });

    done();
  });
});

describe('addition of a new blog', () => {
  test('is valid', async (done) => {
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

  test('by making a bad Request: if title and url is amiss return 400', async (done) => {
    const blog = new Blog(helper.badBlogFormat);
    await api.post('/api/blogs')
      .send(blog)
      .expect(400);

    done();
  });
});

describe('making changes by', () => {
  test('updating likes of individual blog post', async (done) => {
    await api.put(`/api/blogs/${helper.listWithOneBlog._id}`)
      .send({ likes: 6 });

    const res = await api.get(`/api/blogs/${helper.listWithOneBlog._id}`);
    expect(res.body.likes).toEqual(6);

    done();
  });

  test('deleting a single resource', async(done) => {
    await api.delete(`/api/blogs/${helper.listWithOneBlog._id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);

    done();
  });
});

afterAll(() => {
  mongoose.connection.close();
});