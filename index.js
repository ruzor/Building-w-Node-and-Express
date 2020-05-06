const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001;

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "Uzor",
        "number": "091",
        "id": 5
    }
]

app.use(express.json());

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
    const name = body.content.name;
    const number = body.content.number;
    const nameMatch = persons.filter(person => person.name === name);

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    } else if (!name || !number) {
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
        name: body.content.name,
        number: body.content.number,
        id: generateId(),
    }

    persons = persons.concat(person);
    response.body = JSON.stringify(person);
    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})