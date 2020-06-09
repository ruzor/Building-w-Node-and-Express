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
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
};