import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Todos from './Todos'
import Login from './Login'
const sendTodos = (todosArr) => {
  axios.post(`http://localhost:8000/todos_data`, todosArr)
    .then(res => {
      console.log(res)
    })
}
const sendNewTodo = (todo) => {
  console.log('Sending New Todo')
  console.log(todo)
  axios.post(`http://localhost:8000/new_todo`, todo)
    .then(res => {
      console.log(res)
    })
}
function App() {
  const [todos, setTodos] = useState([])
  const [token, setToken] = useState({ token: '' })

  const markDone = (id) => {
    return () => {
      console.log(id)
      axios.post(`http://localhost:8000/mark_done`, { id: id })
        .then(res => {
          console.log(res)
          todos[id].done = true
          let newTodos = [...todos]
          setTodos(newTodos)
        })
    }
  }
  useEffect(() => {
    axios.get(`http://localhost:8000/todos_data`)
      .then(res => {
        const todo_data = res.data
        // console.log(todo_data)
        setTodos(todo_data)
      })
  }, [])
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/todos'>Todos</Link>
            </li>
            <li>
              <Link to='/done'>Done</Link>
            </li>
            <li>
              <Link to='/all'>All</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/todos'>
            <Todos type='Not Done' sendNewTodo={sendNewTodo} sendTodos={sendTodos} todos={todos} setTodos={setTodos} markDone={markDone} />
          </Route>
          <Route path='/done'>
            <Todos type='Done' sendNewTodo={sendNewTodo} sendTodos={sendTodos} todos={todos} setTodos={setTodos} markDone={markDone} />
          </Route>
          <Route path='/all'>
            <Todos type='' sendNewTodo={sendNewTodo} sendTodos={sendTodos} todos={todos} setTodos={setTodos} markDone={markDone} />
          </Route>
          <Route path='/login'>
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
