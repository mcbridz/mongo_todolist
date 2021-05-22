import React from 'react'


const Todo = (props) => {
    let text = props.text
    let date = props.date
    let id = props.id
    let markDone = props.markDone
    let token = props.token
    return (
        <li>
            <div>{text}{(props.done) ? '' : <button onClick={markDone(id, token)}>Done</button>}</div>
            <div>{date.toString()}</div>
        </li>
    )
}

export default Todo
