const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('res-body', (request, response) => response.body);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'));

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
