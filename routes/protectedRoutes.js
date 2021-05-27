const User = require('../Models').User
const express = require('express')
const jwt = require('jsonwebtoken')
const key = process.env.KEY || require('../secrets').key

const router = express.Router()

const Todo = require('../Models').Todo

router.get('/todos_data', (req, res) => {
    const authorization = req.header('Authorization') || ''
    console.log('Getting auth from :')
    const [type, token] = authorization.split(' ')
    console.log(token)
    if (!token) {
        return
    }
    if (type === 'Bearer' && jwt.verify(token, key)) {
        console.log('Verified token')
        const payload = jwt.decode(token, key)
        console.log('User id: ' + payload._id)
        User.findOne({ _id: payload._id }, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(400).send('not a valid user')
            Todo.find({ username: user.username }, (err, todos) => {
                console.log('User\'s todos: ' + todos.length)
                res.json(todos)
            })
        })
    } else {
        return res.status(400).send('unauthorized')
    }
})

router.get('/user_id', (req, res) => {
    const authorization = req.header('Authorization') || ''
    // console.log('Getting auth from :')
    // console.log(authorization)
    const [type, token] = authorization.split(' ')
    if (type === 'Bearer' && jwt.verify(token, key)) {
        // console.log('Verified token')
        const payload = jwt.decode(token, key)
        // console.log('User id: ' + payload._id)
        res.status(200).send(payload._id)
    } else {
        return res.status(400).send('unauthorized')
    }
})

router.post('/mark_done', (req, res) => {
    const authorization = req.header('Authorization') || ''
    const [type, token] = authorization.split(' ')
    if (type === 'Bearer' && jwt.verify(token, key)) {
        const payload = jwt.decode(token, key)
        User.findOne({ _id: payload._id }, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(400).send('not a valid user')
            user.markDone(req.body.id)
            res.status(202).send('Todo Updated')
        })
    } else {
        return res.status(400).send('unauthorized')
    }
})

router.post('/new_todo', (req, res) => {
    console.log('Post request received')
    const authorization = req.header('Authorization') || ''
    const [type, token] = authorization.split(' ')
    if (type === 'Bearer' && jwt.verify(token, key)) {
        console.log('Verified token')
        const payload = jwt.decode(token, key)
        User.findOne({ _id: payload._id }, (err, user) => {
            if (err) return res.status(500).send(err)
            if (!user) return res.status(400).send('not a valid user')
            let newTodo = req.body
            console.log('Adding new todo')
            console.log(newTodo)
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

})

module.exports = router