const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const contacts = require('./contacts.json')

const PORT = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/contacts", (req, res) => res.send(contacts))

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    if (email && password) {
        if (email === "contacts@app.com" && password === "password") res.send("success")
        else res.send("error")
        res.end()
    }
    else {
        res.send("Plese enter email and password")
        res.end()
    }
})

app.listen(PORT, () => console.log("App listening on port: " + PORT))