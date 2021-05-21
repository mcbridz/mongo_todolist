import React from 'react'


const Todo = (props) => {
    let text = props.text
    let date = props.date
    // console.log(date)
    let id = props.id
    let markDone = props.markDone
    // console.log('todos')
    // console.log(todos)
    // let setTodos = props.setTodos
    // let todos = props.todos
    // console.log('displayTodos')
    // console.log(displayTodos)
    // let sendTodos = props.sendTodos
    return (
        <li>
            <div>{text}{(props.done) ? '' : <button onClick={markDone(id)}>Done</button>}</div>
            <div>{date.toString()}</div>
        </li>
    )
}

export default Todo
