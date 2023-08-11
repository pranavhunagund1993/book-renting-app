const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const connect = require('./db/connect')
const cors = require('cors')
const PORT = process.env.PORT

const app = express()

// body parser setting
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middlewares
app.use(cors()) // Cross Origin Resource Sharing to allow incoming requests
app.use(cookieParser(process.env.SECRET_TOKEN)) // configure secured cookies

// index route
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/category', require('./routes/categoryRoute'))
app.use('/api/book', require('./routes/bookRoute'))
app.use('/api/rent', require('./routes/rentRoute'))

// default route
app.all('**', async (req,res) => {
    return res.status(404).json({ msg: 'Requested Path Not Found..404 Error'})
})

// to start the server
app.listen(PORT, async () => {
    console.log(`server is up and running @ http://localhost:${PORT}`)
    await connect()
})