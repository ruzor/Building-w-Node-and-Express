const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  let total = blogs.reduce((acc, init) => acc + init.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  let title, author, likes, rest;
  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  const maxLikesBlog = blogs.find(blog => blog.likes === maxLikes);

  // eslint-disable-next-line no-unused-vars
  ({ title, author, likes, ...rest } = maxLikesBlog);

  // return max blog w/ needed properties
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return 0;

  // sort blogs clone according to author alphabetically, then reverse
  let count = 1, temp = [...blogs].sort((a, b) => a.author - b.author).reverse();
  // console.log(temp);
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

module.exports = {
  mostBlogs,
  favoriteBlog,
  totalLikes
};