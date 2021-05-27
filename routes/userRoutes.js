const User = require('../Models').User
const express = require('express')
const jwt = require('jsonwebtoken')
const key = process.env.KEY || require('../secrets').key
const path = require('path')

const router = express.Router()

router.post('/register', (req, res) => {
    console.log(`Looking for user ${req.body.username}`)
    User.findOne({ username: req.body.username }, async (err, userExists) => {
        if (err) return res.status(500).send(err)
        if (userExists) return res.status(400).send('username already exists')

        const user = await User.signup(req.body.username, req.body.password)
        res.status(201).send(user.sanitize())
    })
})

router.post('/login', (req, res) => {
    // console.log(`Looking for user ${req.body.username}`)
    User.findOne({ username: req.body.username }, async (err, user) => {
        // console.log(`Found user: ${user.username}`)
        if (err) return res.status(500).send(err)
        if (!user) return res.status(400).send('Invalid login ingo')
        // console.log(`User is valid`)
        const matchingPassword = await user.comparePassword(req.body.password)
        // console.log(`password verified as : ${matchingPassword}`)
        if (!matchingPassword) return res.status(400).send('Invalid login ingo')
        // console.log(`Signing token with key: ${key}`)
        jwt.sign({ _id: user._id }, key, (err, token) => {
            if (err) return res.status(500).send(err)
            res.send({ token })
        })
    })
})

router.get('*', (req, res) => {
    res.sendFile(path.join('../todo-list/build/index.html'))
})

module.exports = router
