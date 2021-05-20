import React from 'react'
import Todo from './Todo'
import NewTodo from './NewTodo'

const markDone = (index, todoArr, setTodos, callback) => {
    // console.log('DING')
    todoArr[index].done = true
    let output = [...todoArr]
    // console.log(todoArr)
    setTodos(output)
    callback(output)
}


const Todos = (props) => {
    let todos = props.todos
    let setTodos = props.setTodos
    let type = props.type
    let sendTodos = props.sendTodos
    let sendNewTodo = props.sendNewTodo
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
                        done={todo.done} />)
                })}
            </ul>
            {(type === 'Not Done') ? <NewTodo
                todos={props.todos}
                setTodos={setTodos}
                sendNewTodo={sendNewTodo}
            /> : ''}
        </div>
    )
}

export default Todos
