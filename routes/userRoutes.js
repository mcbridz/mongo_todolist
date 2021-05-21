const User = require('../Models').User
const express = require('express')
const jwt = require('jsonwebtoken')
const key = require('../secrets').key

const router = express.Router()

router.post('/signup', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, userExists) => {
        if (err) return res.status(500).send(err)
        if (userExists) return res.status(400).send('username already exists')

        const user = await User.signup(req.body.username, req.body.password)
        res.status(201).send(user.sanitize())
    })
})

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, user) => {
        if (err) return res.status(500).send(err)
        if (!user) return res.status(400).send('Invalid login ingo')

        const matchingPassword = await user.comparePassword(req.body.password)

        if (!matchingPassword) return res.status(400).send('Invalid login ingo')

        jwt.sign({ _id: user._id }, key, (err, token) => {
            if (err) return res.status(500).send(err)
            res.send({ token })
        })
    })
})

module.exports = router
