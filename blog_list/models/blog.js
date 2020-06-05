require('dotenv').config();

const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

mongoose.set('useFindAndModify', false);

// blogSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    url: {type: String, required: true},
    likes: {type: Number}
});

blogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document, returnedObject) => {
        delete returnedObject._id;
    }
});

module.exports = mongoose.model('Blog', blogSchema);