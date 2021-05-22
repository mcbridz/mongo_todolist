const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: String,
    done: Boolean,
    date: String,
    id: Number,
    username: String
})

const Todo = mongoose.model('Todo', todoSchema)

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todos: []
})

userSchema.statics.signup = async function (username, plainTextPassword) {
    const user = new this()
    user.username = username
    await user.hashPassword(plainTextPassword)
    await user.save()
    return user
}

userSchema.methods.sanitize = function () {
    return {
        ...this._doc,
        password: undefined
    }
}

userSchema.methods.hashPassword = function (plainTextPassword) {
    const user = this
    let randomSalt = Math.floor(Math.random() * 4 + 2)
    return bcrypt.hash(plainTextPassword, randomSalt).then(hash => {
        user.password = hash
    })
}

userSchema.methods.comparePassword = function (plainTextPassword) {
    const user = this
    return bcrypt.compare(plainTextPassword, user.password)
}

userSchema.methods.getTodos = function () {
    return Todo.find({ username: this.username })
}

userSchema.methods.markDone = async function (id) {
    let output = false
    await Todo.findOneAndUpdate({ username: this.username, id: id }, { "$set": { done: true } }, { returnNewDocument: true })
        .then(updatedTodo => {
            if (updatedTodo) {
                console.log('todo updated successfully')
            } else {
                console.log('no todo found')
                output = false
            }
        })
        .catch(err => console.log(`Failed to find and update todo: ${err}`))
    return output
}

userSchema.methods.addTodo = function (newTodo) {
    this.todos.push(newTodo)
}

const User = mongoose.model('User', userSchema)

module.exports = { Todo, User }