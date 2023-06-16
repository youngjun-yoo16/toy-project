// Importing dotenv before the db model is imported to ensure that the environment variables from the .env file 
// are available globally before the code from the other modules is imported.
require("dotenv").config()
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./queries')
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/users', db.getUsers)
app.get('/hobbies', db.getHobbies)
app.get('/users/hobbies', db.getHobbiesWithUserName)
app.get('/users/:id', db.getUserById)
app.get('/hobbies/:id', db.getHobbiesById)
app.get('/users/hobbies/:id', db.getHobbiesByUserId)

app.post('/users', db.createUser)
app.post('/hobbies', db.createHobby)

app.put('/users/:id', db.updateUser)

app.delete('/users/:id', db.deleteUser)
app.delete('/hobbies/:id', db.deleteHobby)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})