const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    uniqueCaseInsensitive: true
  },
  username: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
    uniqueCaseInsensitive: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  password: String,
  passwordHash: String
});

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model('User', userSchema);