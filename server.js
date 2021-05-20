const express = require('express')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const Todo = require('./Models').Todo

module.exports = function (deps) {
    const message_path = deps.MessagePath
    const port = deps.port
    const dbname = 'todo_data'
    const url = 'mongodb://localhost/' + dbname

    // const client = new MongoClient(url)
    const mongoose = require('mongoose')
    mongoose.connect(url)


    // client.connect((err) => {
    //     assert.equal(null, err)
    //     console.log('Connected successfully to database.')

    //     const db = client.db(dbname)

    // })

    app.get('/todos_data', (req, res) => {
        // client.connect((err) => {
        //     const db = client.db(dbname)
        //     const collection = db.collection('todos')
        //     collection.find({}).toArray((err, data) => {
        //         console.log('Todos retrieved')
        //         res.json(data)
        //     })
        // })
        Todo.find({}, (err, data) => {
            if (err) console.log(err)
            console.log(data)
            res.json(data)
        })
    })

    app.post('/mark_done', (req, res) => {
        const id = req.body.id
        // console.log('/////////////////id//////////////////')
        // console.log(id)
        // console.log('/////////////////id//////////////////')
        // client.connect((err) => {
        //     const db = client.db(dbname)
        //     const collection = db.collection('todos')
        //     collection.updateOne({ 'id': id }, { $set: { 'done': true } }, (err, results) => {
        //         // console.log(err)
        //         // console.log(results)
        //         console.log('Todo updated')
        //         res.end('Todo updated')
        //     })
        // })
        Todo.find({ id: id }, (err, todo) => {
            if (err) console.log(err)
            todo.done = true
            todo.save((err, data) => {
                res.end('Todo updated')
            })
        })
    })

    app.post('/new_todo', (req, res) => {
        let newTodo = req.body
        // client.connect((err) => {
        //     // const db = client.db(dbname)
        //     // const collection = db.collection('todos')
        //     // collection.insertOne(newTodo, (err, result) => {
        //     //     if (err) console.log(err)
        //     //     // console.log(result)
        //     // })
        // })
        newTodo = new Todo(newTodo)
        newTodo.save((err, data) => {
            console.log('New todo saved.')
        })
        res.end('New todo stored successfully.')
    })

    const server = require('http').createServer(app)

    return server
}