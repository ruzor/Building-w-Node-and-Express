require('dotenv').config();

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

mongoose.set('useFindAndModify', false);

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, minlength: 3, required: true, uniqueCaseInsensitive: true },
  number: {
    type: Number, required: true, validate: {
      validator: (val) => val.toString().length >= 8,
      message: () => 'phone number must be at least 8 digits'
    }
  }
});

personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

personSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnedObject) => {
    delete returnedObject._id;
  }
});

module.exports = mongoose.model('Person', personSchema);