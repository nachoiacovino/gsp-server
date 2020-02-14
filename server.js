const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const contacts = require('./contacts.json')

const PORT = 3001

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/contacts", (req, res) => res.send(contacts))

app.listen(PORT, () => console.log("App listening on port: " + PORT))