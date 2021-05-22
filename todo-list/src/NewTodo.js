import React, { useState } from 'react'

const NewTodo = (props) => {
    let todos = props.todos
    let setTodos = props.setTodos
    let newKey = todos.length
    let sendNewTodo = props.sendNewTodo
    let token = props.token
    const [newTodo, setNewTodo] = useState({
        text: '',
        date: new Date(),
        done: false,
        id: newKey,
        username: props.username
    })
    const handleSubmit = (evt) => {
        evt.preventDefault()
        // console.log('new TODO')
        // console.log(newTodo)
        setTodos([...todos, newTodo])
        newKey++
        sendNewTodo(newTodo, token)
        setNewTodo({
            text: '',
            date: new Date(),
            done: false,
            id: newKey,
            username: props.username
        })
    }
    const handleChange = (evt) => {
        const value = evt.target.value
        setNewTodo({
            text: value,
            date: new Date(),
            done: false,
            id: newKey,
            username: props.username
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter new todo"
                    value={newTodo.text}
                    name="newTodo"
                    id="newTodoInput"
                />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default NewTodo
