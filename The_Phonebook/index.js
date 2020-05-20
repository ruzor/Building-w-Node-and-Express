require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('res-body', (request, response) => response.body);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'));

app.get('/api/persons',
    (request, response, next) => {
        Person.find({})
            .then(persons => response.send(persons.map(person => person.toJSON())))
            .catch(error => next(error))
    }
);

app.get('/api/persons/:id',
    (request, response, next) => {
        Person.findById(request.params.id)
            .then(person => {
                if (person) {
                    response.send(person);
                } else {
                    response.status(404).end();
                }
            })
            .catch(error => next(error))
    }
);

app.get('/info',
    (request, response, next) => {
        Person.countDocuments()
            .then(total => {
                response.send(`<div>
                    <p>Phonebook has info for ${total} people</p>
                    <p>${new Date}</p>
                </div>`)
            })
            .catch(error => next(error))
    }
);

const addPerson = (request, response, next) => {
    const body = request.body;
    const name = body.name;
    const number = body.number;

    if (!name || !number) {
        return response.status(400).send({ error: 'missing either name or number' })
    }

    const person = new Person({
        name,
        number
    });

    person.save()
        .then(result => {
            response.json(result);
        })
        .catch(error => next(error))
}

app.post('/api/persons', addPerson);

const updateNumber = (request, response, next) => {

    // updating person number in database

    const body = request.body;
    const name = body.name;
    const number = body.number;

    if (!name || !number) {
        return response.status(400).send({ error: 'missing either name or number' })
    }

    const person = {
        name,
        number
    }

    Person.findByIdAndUpdate(request.params.id, { number })
        .then(result => {
            let { id, name } = result.toJSON();
            response.json({ id, name, number });
        })
        .catch(error => next(error))
}

app.put('/api/persons/:id', updateNumber);

const deletePerson = (request, response, next) => {

    // deleting person from database

    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
}

app.delete('/api/persons/:id', deletePerson);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error);
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// fix response.body for morgan