const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  user: String,
  username: String,
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