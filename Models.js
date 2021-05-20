const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: String,
    done: Boolean,
    date: String,
    id: Number
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { Todo }