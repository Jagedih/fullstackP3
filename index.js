const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', function getBody(req){
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - \
:response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

let numbers = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123123123"
    },
    {
        id: 2,
        name: "Jazon Barbababa",
        number: "040-123123123"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "040-345345345345"
    },
    {
        id: 4,                                                                                                                                                                                                                                                                                                                                                                                                       
        name: "Arto Hellas",
        number: "040-56734456"
    }
]
app.get('/api/persons', (req,res) => {
    res.json(numbers)
    
})
app.get('/info', (req,res) => {
    const date = new Date()
    msg = `Phonebook has info on ${numbers.length} people.\n${date}`
    res.send(msg)
})
app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const number = numbers.find(number => number.id === id )

    if(number){
        res.json(number)
    }else{
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    numbers = numbers.filter(number => number.id !== id )
    res.status(204).end()
})
app.post('/api/persons', (req,res) => {
    const body= req.body
    const newId = Math.floor(Math.random()*1000000)
    const personInList = numbers.find(p => p.name === body.name)

    if(!body.name){
        res.status(400).json({error: 'name missing.'})
    }
    else if(!body.number){
        res.status(400).json({error: 'number missing.'})
    }
    else if(personInList){
        res.status(400).json({error: 'person already in the list.'})
    }else{
        const person = {
            id: newId,
            name: body.name,
            number: body.number
        }
        numbers = numbers.concat(person)
        res.json(person)
    }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

