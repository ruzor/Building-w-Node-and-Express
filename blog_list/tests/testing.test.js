const helper = require('../utils/blog_helper');

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = helper.totalLikes(helper.listWithNoBlog);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that blog', () => {
    const result = helper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = helper.totalLikes(helper.blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is empty', () => {
    const result = helper.favoriteBlog(helper.listWithNoBlog);
    expect(result).toEqual({});
  });

  test('should have title, author, and likes property of argument blog', () => {
    const result = helper.favoriteBlog(helper.listWithOneBlog);
    expect(result).toEqual({ title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('should have title, author, and likes property of most liked blog', () => {
    const result = helper.favoriteBlog(helper.blogs);
    expect(result).toEqual({ title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 });
  });
});

describe('highest blog count', () => {
  test('of empty blog list is empty', () => {
    const result = helper.mostBlogs(helper.listWithNoBlog);
    expect(result).toEqual({});
  });

  test('of a list of blogs is calculated right', () => {
    const result = helper.mostBlogs(helper.blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most liked blog', () => {
  test('of empty blog list is empty', () => {
    const result = helper.mostLikes(helper.listWithNoBlog);
    expect(result).toEqual({});
  });

  test('of single blog is same blog', () => {
    const result = helper.mostLikes(helper.listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('of a list of blogs is calculated right', () => {
    const result = helper.mostLikes(helper.blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});