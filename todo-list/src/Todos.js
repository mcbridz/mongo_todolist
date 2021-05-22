import React from 'react'
import Todo from './Todo'
import NewTodo from './NewTodo'


const Todos = (props) => {
    let todos = props.todos
    let setTodos = props.setTodos
    let type = props.type
    let sendTodos = props.sendTodos
    let sendNewTodo = props.sendNewTodo
    let markDone = props.markDone
    let token = props.token
    if (type === 'Not Done') {
        todos = todos.filter((todo) => !todo.done)
    } else if (type === 'Done') {
        todos = todos.filter((todo) => todo.done)
    }
    // console.log('TODOS COMPONENT')
    // console.log(todosCopy)
    return (
        <div>
            <h1>{(type) ? type : 'All'}</h1>
            <ul>
                {todos.map((todo, index) => {
                    return (<Todo
                        text={todo.text}
                        date={todo.date}
                        key={index}
                        id={todo.id}
                        markDone={markDone}
                        sendTodos={sendTodos}
                        setTodos={setTodos}
                        todos={props.todos}
                        done={todo.done}
                        token={token}
                    />)
                })}
            </ul>
            {(type === 'Not Done') ? <NewTodo
                todos={props.todos}
                setTodos={setTodos}
                sendNewTodo={sendNewTodo}
                token={token}
                username={props.username}
            /> : ''}
        </div>
    )
}

export default Todos
