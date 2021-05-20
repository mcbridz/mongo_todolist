import React, { useState } from 'react'

const NewTodo = (props) => {
    let todos = props.todos
    let setTodos = props.setTodos
    let newKey = todos.length
    let sendNewTodo = props.sendNewTodo
    const [newTodo, setNewTodo] = useState({
        text: '',
        date: new Date(),
        done: false,
        id: newKey
    })
    const handleSubmit = (evt) => {
        evt.preventDefault()
        // console.log('new TODO')
        // console.log(newTodo)
        //function for sending todo data
        //TO-CODE
        //
        setTodos([...todos, newTodo])
        newKey++
        sendNewTodo(newTodo)
        setNewTodo({
            text: '',
            date: new Date(),
            done: false,
            id: newKey
        })
    }
    const handleChange = (evt) => {
        const value = evt.target.value
        setNewTodo({
            text: value,
            date: new Date(),
            done: false,
            id: newKey
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
