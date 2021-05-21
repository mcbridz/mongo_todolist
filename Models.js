const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: String,
    done: Boolean,
    date: String,
    id: Number
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
    return bcrypt.hash(plainTextPassword, 4).then(hash => {
        user.password = hash
    })
}

userSchema.methods.comparePassword = function (plainTextPassword) {
    const user = this
    return bcrypt.compare(plainTextPassword, user.password)
}

const User = mongoose.model('User', userSchema)

module.exports = { Todo, User }