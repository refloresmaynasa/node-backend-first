let notes = [
  {
    id: 1,
    content: 'Tengo que practicar aun mas !!! ',
    date: '2021-01-01T13:30:00.000Z',
    important: true
  },
  {
    id: 2,
    content: 'Estudiar Fullstack',
    date: '2021-01-01T17:35:00.098Z',
    important: false
  },
  {
    id: 3,
    content: 'Tengo que estudiar ingles',
    date: '2021-07-01T21:25:00.895Z',
    important: false
  }
]
// const http = require('http')
const express = require('express')
const cors = require('cors')

const app = express()

const logger = require('./logger')

app.use(logger)

app.use(cors())
app.use(express.json())

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-type': 'application/json' });
//     // response.end('Hello World from Server RIC');
//     response.end(JSON.stringify(notes));
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello world from server RIC</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  // notes.concat(newNote)
  notes = [...notes, newNote]

  response.json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// console.log(`Server running on port ${PORT}`)