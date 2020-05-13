const db = require('./db.json')
let persons = db.persons;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id - 1;

    if (!persons[id]) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    response.json(persons[id]);
});

app.get('/info', (request, response) => {
    response.send(`<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date}</p>
    </div>`)
});

morgan.token('res-body', (request, response) => response.body);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'));

app.post('/api/persons', (request, response) => {
    const body = request.body;
    const name = body.name;
    const number = body.number;
    const nameMatch = persons.filter(person => person.name === name);

    if (!name || !number) {
        return response.status(422).json({
            error: 'missing either name or number'
        })
    } else if (nameMatch.length !== 0) {
        return response.status(403).json({
            error: 'name has been taken'
        })
    }

    const generateId = () => Math.floor((Math.random() * 10000) + 1);

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    // updating database w/ person info
    persons.concat(person);

    response.body = JSON.stringify(person);
    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    // deleting person from database
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})