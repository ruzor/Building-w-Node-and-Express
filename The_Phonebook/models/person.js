require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });

mongoose.set('useFindAndModify', false)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
});

personSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (document, returnedObject) => {
        // returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        // delete returnedObject.__v
    }
});

module.exports = mongoose.model('Person', personSchema);