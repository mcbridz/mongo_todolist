const User = require('../Models').User
const express = require('express')
const jwt = require('jsonwebtoken')
const key = require('../secrets').key

const router = express.Router()

const Todo = require('../Models').Todo

router.get('/todos_data', (req, res) => {
    const authorization = req.header('Authorization') || ''
    const [type, token] = authorization.split(' ')
    if (type === 'Bearer' && jwt.verify(token, key)) {
        const payload = jwt.decode(token, key)
        User.findOne({ _id: payload.id }, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(400).send('not a valid user')
            res.json(user.getTodos())
        })
    } else {
        return res.status(400).send('unauthorized')
    }
    // Todo.find({}, (err, data) => {
    //     if (err) console.log(err)
    //     console.log(data)
    //     res.json(data)
    // })
})

router.post('/mark_done', (req, res) => {
    const authorization = req.header('Authorization') || ''
    const [type, token] = authorization.split(' ')
    if (type === 'Bearer' && jwt.verify(token, key)) {
        const payload = jwt.decode(token, key)
        User.findOne({ _id: payload.id }, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(400).send('not a valid user')
            user.markDone(req.body.id)
        })
    } else {
        return res.status(400).send('unauthorized')
    }

    // const id = req.body.id
    // Todo.find({ id: id }, (err, todo) => {
    //     if (err) console.log(err)
    //     todo.done = true
    //     todo.save((err, data) => {
    //         res.end('Todo updated')
    //     })
    // })
})

router.post('/new_todo', (req, res) => {
    const authorization = req.header('Authorization') || ''
    const [type, token] = authorization.split(' ')
    if (type === 'Bearer' && jwt.verify(token, key)) {
        const payload = jwt.decode(token, key)
        User.findOne({ _id: payload.id }, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(400).send('not a valid user')
            let newTodo = req.body
            newTodo = new Todo(newTodo)
            newTodo.save((err, data) => {
                if (err) return res.status(500).send(err)
                console.log('New todo saved.')
            })
            user.addTodo(newTodo)
            res.end('New todo stored successfully.')
        })
    } else {
        return res.status(400).send('unauthorized')
    }



    // let newTodo = req.body
    // newTodo = new Todo(newTodo)
    // newTodo.save((err, data) => {
    //     console.log('New todo saved.')
    // })
    // res.end('New todo stored successfully.')
})

module.exports = router