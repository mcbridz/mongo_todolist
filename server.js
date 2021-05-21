const express = require('express')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
const protectedRoutes = require('./routes/protectedRoutes.js')
app.use('/', protectedRoutes)
const userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes)


module.exports = function (deps) {
    const message_path = deps.MessagePath
    const port = deps.port
    const dbname = 'todo_data'
    const url = 'mongodb://localhost/' + dbname

    // const client = new MongoClient(url)
    const mongoose = require('mongoose')
    mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })


    const server = require('http').createServer(app)

    return server
}