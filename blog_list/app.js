const express = require('express');
const app = express();
require('express-async-errors');
// const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./controller/users');
const blogsRouter = require('./controller/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message);
  });

mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// morgan.token('res-body', (request, response) => response.body);

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'));

app.use(middleware.requestLogger);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
