// this module supplies ../tests/blog_api.test.js with functions and objects for testing purposes

const Blog = require('../models/blog');

const blogs = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
];

const listWithOneBlog = {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
};

const listWithNoBlog = [];

const blogWithNoLikes = {
  _id: '5a422aa71b54a676234d17fd',
  title: 'Who These Niggaz',
  author: 'Sunny Jones',
  url: 'http://www.u.havard.edu/~rubinson/copyright_violations/Who_These_Niggaz.html',
  __v: 0
};

const badBlogFormat = {
  _id: '5a422aa71b54a676234d17fd',
  author: 'Sunny Jones',
  __v: 0
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const totalLikes = blogs => {
  if (!blogs.length) return 0;

  let total = blogs.reduce((acc, init) => acc + init.likes, 0);
  return total;
};

const favoriteBlog = blogs => {
  if (!blogs.length) return {};

  let title, author, likes, rest;
  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  const maxLikesBlog = blogs.find(blog => blog.likes === maxLikes);

  // eslint-disable-next-line no-unused-vars
  ({ title, author, likes, ...rest } = maxLikesBlog);

  // return max blog w/ needed properties
  return { title, author, likes };
};

const mostBlogs = blogs => {
  if (!blogs.length) return {};

  // sort blogs clone according to author alphabetically, then reverse
  let count = 1, temp = [...blogs].sort((a, b) => a.author.localeCompare(b.author)).reverse();

  // get author, count of author with most blogs
  return temp.reduce((acc, blog) => {
    if (acc.author !== blog.author)
      return {
        author: acc.author,
        blogs: count
      };

    count += 1;
    return { ...blog };
  });
};

const mostLikes = blogs => {
  if (!blogs.length) return {};

  let authors = {};
  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] += blog.likes;
    } else {
      authors[blog.author] = blog.likes;
    }
  });

  // convert authors object containing name, likes as key, value pairs to 2D array and sort by authors' likes then return last array as object
  authors = Object.entries(authors).sort((a, b) => a[1] - b[1]);
  const [ author, likes ] = authors[authors.length - 1];
  return { author, likes };
};

module.exports = {
  badBlogFormat,
  blogs,
  blogsInDb,
  blogWithNoLikes,
  favoriteBlog,
  listWithNoBlog,
  listWithOneBlog,
  mostBlogs,
  mostLikes,
  totalLikes
};