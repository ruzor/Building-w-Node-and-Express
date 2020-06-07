const totalLikes = (blogs) => {
  if (blogs.length===0) return 0;

  let total = blogs.reduce((acc, init) => acc + init.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length===0) return {};

  let title, author, likes, rest;
  const maxLikes = Math.max(blogs.map(blog => blog.likes));
  console.log(maxLikes);
  const maxLikesBlog = blogs.find(blog => blog.likes === maxLikes);

  // eslint-disable-next-line no-unused-vars
  ({ title, author, likes, ...rest } = maxLikesBlog);

  // return max blog w/ needed properties
  return { title, author, likes };
};

module.exports = {
  totalLikes,
  favoriteBlog
};