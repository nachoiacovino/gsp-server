const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
const contacts = require('./contacts.json')

const PORT = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const token = jwt.sign({ email }, "supersecret", { expiresIn: 300 })
    
    if (email && password) {
        if (email === "contacts@app.com" && password === "password") res.send({ status: "success", token })
        else res.send({ status: "error" })
        res.end()
    }
    else {
        res.send({ status: "empty" })
        res.end()
    }
})

const checkToken = (req, res, next) => {
    const header = req.headers['authorization']
    if (typeof header !== 'undefined') {
        const bearer = header.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    } else res.sendStatus(403)
}

app.get("/contacts", checkToken, (req, res) => {
    jwt.verify(req.token, "supersecret", (err, decoded) => {
        if (!err) res.send(contacts)
        else res.send(err)
    })
})

app.listen(PORT, () => console.log("App listening on port: " + PORT))