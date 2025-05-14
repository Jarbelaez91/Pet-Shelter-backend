const express = require("express")

const app = express ()

const cors = require ("cors")

const morgan = require ("morgan")

const helmet = require ("helmet")

const path = require ("node:path")

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8080

app.use (cors())
app.use (morgan("combined"))
app.use (helmet())

app.get ("/", (request, response, next) => {
    response.status (200).json ({
        success: {message: "this is the main page"},
        statusCode: 200
    })
})

app.get ("/api/pets", (request, response, next) => {
    response.status (200).json ({
        success: {message: "this will send all of the pets data"},
        statusCode: 200
    })
})

app.get ("/api/pets/:id", (request, response, next) => {
    response.status (200).json ({
        success: {message: "this will send a single pet by its id"},
        statusCode: 200
    })
})


app.get ("/api/pets/create/new", (request, response, next) => {
    response.status (200).json ({
        success: {message: "this will create a new pet for adoption"},
        statusCode: 200
    })
})

app.get ("/api/pets/update/:id", (request, response, next) => {
    response.status (200).json ({
        success: {message: "this will update pet"},
        statusCode: 200
    })
})

app.get ("/api/pets/delete/:id", (request, response, next) => {
    response.status (200).json ({
        success: {message: "This will delete a book by its id"},
        statusCode: 200
    })
})

app.listen (PORT, () => {
    console.log (`this server is listening on port ${PORT}`)
    console.log (`Open in browser: http://localhost:${PORT}/`)
})

module.exports = app