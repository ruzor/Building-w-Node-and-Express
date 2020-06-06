const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number }
});

// blogSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

blogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnedObject) => {
    delete returnedObject._id;
  }
});

module.exports = mongoose.model('Blog', blogSchema);