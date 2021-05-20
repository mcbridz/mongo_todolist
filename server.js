const express = require('express')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

module.exports = function (deps) {
    const message_path = deps.MessagePath
    const port = deps.port
    const dbname = 'todo_data'
    const url = 'mongodb://localhost/' + dbname

    const client = new MongoClient(url)

    client.connect((err) => {
        assert.equal(null, err)
        console.log('Connected successfully to database.')

        const db = client.db(dbname)

        client.close()
    })

    app.get('/todos_data', (req, res) => {

    })

    app.post('/todos_data', (req, res) => {

    })

    app.post('/new_todo', (req, res) => {
        const newTodo = JSON.parse(req.body)
        client.connect((err) => {


            client.close()
        })
        res.end('New todo stored successfully.')
    })

    const server = require('http').createServer(app)

    return server
}