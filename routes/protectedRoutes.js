const User = require('../Models').User
const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const Todo = require('../Models').Todo

router.get('/todos_data', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) console.log(err)
        console.log(data)
        res.json(data)
    })
})

router.post('/mark_done', (req, res) => {
    const id = req.body.id
    Todo.find({ id: id }, (err, todo) => {
        if (err) console.log(err)
        todo.done = true
        todo.save((err, data) => {
            res.end('Todo updated')
        })
    })
})

router.post('/new_todo', (req, res) => {
    let newTodo = req.body
    newTodo = new Todo(newTodo)
    newTodo.save((err, data) => {
        console.log('New todo saved.')
    })
    res.end('New todo stored successfully.')
})

module.exports = router