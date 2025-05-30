const express = require("express");

const app = express()

const cors = require ("cors")

const morgan = require ("morgan")

const helmet = require ("helmet")

const path = require ("node:path")

const petRoutes = require ("./routes/petRoutes")

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



app.use("/api/pets", petRoutes);


app.listen (PORT, () => {
    console.log (`this server is listening on port ${PORT}`)
    console.log (`Open in browser: http://localhost:${PORT}/`)
})

module.exports = app